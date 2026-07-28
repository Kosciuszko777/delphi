import { useCallback, useRef, useState } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useShakespeare, type ChatMessage } from '@/hooks/useShakespeare';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useWire } from '@/hooks/useWire';
import { useAttestations } from '@/hooks/useAttestations';
import { useOracleEntitlement } from '@/hooks/useOracleEntitlement';
import { useOracleTrial } from '@/hooks/useOracleTrial';
import { buildOracleSystem } from '@/lib/oracle/prompt';
import {
  type MeterState,
  type Entitlement,
  normalize,
  remaining as meterRemaining,
  canSend as meterCanSend,
  consume as meterConsume,
  limitFor,
  INITIATE_MONTHLY_LIMIT,
} from '@/lib/oracle/meter';
import { FREE_TIER_MODEL } from '@/lib/ai/models';

const METER_KEY = 'delphi:oracle-meter';
const HISTORY_WINDOW = 12; // last N turns sent as context

export interface OracleTurn {
  role: 'user' | 'assistant';
  content: string;
}

/** Pick a model based on entitlement: free users get the cheapest model, paid users get premium. */
function pickModel(
  models: { id: string; pricing: { prompt: string; completion: string } }[],
  entitlement: Entitlement,
): string {
  if (entitlement === 'free') return FREE_TIER_MODEL;
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

export function useOracleChat() {
  const { user } = useCurrentUser();
  const { wire } = useWire();
  const { attestations } = useAttestations();
  const { entitlement } = useOracleEntitlement();
  const trial = useOracleTrial();
  const { sendStreamingMessage, getAvailableModels } = useShakespeare();

  const [turns, setTurns] = useState<OracleTurn[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // The meter now applies only to initiates (100/month). Council is unlimited.
  // Free tier uses the lifetime trial instead.
  const [meter, setMeter] = useLocalStorage<MeterState | null>(METER_KEY, null);
  const modelRef = useRef<string | null>(null);

  const isCouncillor = entitlement === 'council';
  const monthlyLimit = limitFor(entitlement);

  // Compute allowed + remaining per entitlement
  const freeRemaining =
    entitlement === 'free'
      ? trial.remaining
      : entitlement === 'initiate'
        ? meterRemaining(normalize(meter), undefined, INITIATE_MONTHLY_LIMIT)
        : Number.POSITIVE_INFINITY;

  const allowed =
    entitlement === 'council'
      ? true
      : entitlement === 'initiate'
        ? meterCanSend(meter, 'initiate')
        : trial.remaining > 0;

  const send = useCallback(async (text: string) => {
    const question = text.trim();
    if (!question || isThinking) return;

    // Gate check
    if (entitlement === 'free' && trial.remaining <= 0) {
      setError('Your introductory questions are spent. The Oracle asks for a seal.');
      return;
    }
    if (entitlement === 'initiate' && !meterCanSend(meter, 'initiate')) {
      setError('Your monthly questions are spent. They return with the new month.');
      return;
    }

    setError(null);
    setIsThinking(true);
    const userTurn: OracleTurn = { role: 'user', content: question };
    setTurns((prev) => [...prev, userTurn, { role: 'assistant', content: '' }]);

    try {
      if (!modelRef.current) {
        if (entitlement === 'free') {
          modelRef.current = FREE_TIER_MODEL;
        } else {
          const models = await getAvailableModels();
          modelRef.current = pickModel(models.data, entitlement);
        }
      }

      const system = buildOracleSystem(wire, attestations);
      const history: ChatMessage[] = [...turns, userTurn]
        .slice(-HISTORY_WINDOW)
        .map((t) => ({ role: t.role, content: t.content }));
      const messages: ChatMessage[] = [{ role: 'system', content: system }, ...history];

      let assembled = '';
      await sendStreamingMessage(
        messages,
        modelRef.current,
        (chunk) => {
          assembled += chunk;
          setTurns((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: 'assistant', content: assembled };
            return next;
          });
        },
        { temperature: 0.7, max_tokens: 1200 },
      );

      if (!assembled.trim()) throw new Error('The Oracle returned silence. Try again.');

      // Consume: free → trial, initiate → meter, council → nothing
      if (entitlement === 'free') {
        trial.consume();
      } else if (entitlement === 'initiate') {
        setMeter(meterConsume(meter));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      // Drop the empty assistant placeholder on failure
      setTurns((prev) => (prev[prev.length - 1]?.content === '' ? prev.slice(0, -2) : prev));
    } finally {
      setIsThinking(false);
    }
  }, [turns, isThinking, meter, entitlement, isCouncillor, wire, attestations, trial, getAvailableModels, sendStreamingMessage, setMeter]);

  return {
    turns,
    send,
    isThinking,
    error,
    entitlement,
    isCouncillor,
    monthlyLimit,
    freeRemaining,
    allowed,
    trialRemaining: trial.remaining,
    trialLimit: trial.limit,
    isAuthenticated: !!user,
  };
}
