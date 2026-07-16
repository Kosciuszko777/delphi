import { useState, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useShakespeare } from '@/hooks/useShakespeare';
import { useWire } from '@/hooks/useWire';
import { useAttestations } from '@/hooks/useAttestations';
import { useOracleEntitlement } from '@/hooks/useOracleEntitlement';
import { buildMirrorMessages } from '@/lib/mirror/prompt';
import { parseMirror, type MirrorReading } from '@/lib/mirror/schema';
import type { Entitlement } from '@/lib/oracle/meter';

const STORAGE_KEY = 'delphi:mirror';

interface StoredMirror {
  hash: string;
  reading: MirrorReading;
  generatedAt: number;
  model: string;
}

/** Stable content hash over the inputs that shape the reading. */
function inputHash(input: unknown): string {
  const s = JSON.stringify(input);
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return h.toString(16);
}

/** The cheapest model on Shakespeare AI — used for free-tier to conserve credits. */
const CHEAP_MODEL = 'glm-4.5';

/** Pick a model based on entitlement: free users get the cheapest model, paid users get premium. */
function pickModel(
  models: { id: string; pricing: { prompt: string; completion: string } }[],
  entitlement: Entitlement,
): string {
  if (entitlement === 'free') return CHEAP_MODEL;
  const preferred = models.find((m) => /sonnet/i.test(m.id))
    ?? models.find((m) => /claude/i.test(m.id));
  if (preferred) return preferred.id;
  const byCost = [...models].sort(
    (a, b) =>
      parseFloat(a.pricing.prompt) + parseFloat(a.pricing.completion)
      - (parseFloat(b.pricing.prompt) + parseFloat(b.pricing.completion)),
  );
  if (!byCost[0]) throw new Error('No models available');
  return byCost[0].id;
}

/**
 * The Mirror — one-shot four-chamber synthesis, cached locally.
 * Regeneration is explicit; a reading goes stale when the Wire or the
 * self-attestations change.
 */
export function useMirror() {
  const { wire } = useWire();
  const { attestations } = useAttestations();
  const { entitlement } = useOracleEntitlement();
  const { sendChatMessage, getAvailableModels, isAuthenticated } = useShakespeare();
  const [stored, setStored] = useLocalStorage<StoredMirror | null>(STORAGE_KEY, null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hash = inputHash({ wire, attestations });
  const reading = stored?.reading ?? null;
  const isStale = !!stored && stored.hash !== hash;

  const generate = useCallback(async () => {
    setIsGenerating(true);
    setError(null);
    try {
      let model: string;
      if (entitlement === 'free') {
        model = CHEAP_MODEL;
      } else {
        const models = await getAvailableModels();
        model = pickModel(models.data, entitlement);
      }
      const messages = buildMirrorMessages(wire, attestations);
      const response = await sendChatMessage(messages, model, {
        temperature: 0.7,
        max_tokens: 2000,
      });
      const content = response.choices[0]?.message?.content;
      if (typeof content !== 'string') throw new Error('Empty response');
      const parsed = parseMirror(content);
      setStored({ hash, reading: parsed, generatedAt: Date.now(), model });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsGenerating(false);
    }
  }, [wire, attestations, hash, entitlement, getAvailableModels, sendChatMessage, setStored]);

  return { reading, isStale, isGenerating, error, generate, isAuthenticated };
}
