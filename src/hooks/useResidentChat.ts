/**
 * useResidentChat — on-device inference via WebLLM.
 *
 * Mirrors useOracleChat's surface (turns, send, isThinking, error)
 * but: no meter, no network, streaming from the WebLLM engine.
 *
 * CRITICAL: resident inference is UNMETERED — it costs nothing.
 * The code must never meter it.
 */

import { useCallback, useRef, useState } from 'react';
import { useWire } from '@/hooks/useWire';
import { useAttestations } from '@/hooks/useAttestations';
import { buildResidentContext } from '@/lib/resident/grounding';
import { RESIDENT_MODEL_ID } from '@/lib/resident/config';
import type { MLCEngine } from '@mlc-ai/web-llm';

export interface ResidentTurn {
  role: 'user' | 'assistant';
  content: string;
}

const HISTORY_WINDOW = 6; // Smaller window for the smaller model
const MAX_TOKENS = 400;
const TEMPERATURE = 0.7;

export function useResidentChat() {
  const { wire } = useWire();
  const { attestations } = useAttestations();

  const [turns, setTurns] = useState<ResidentTurn[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const engineRef = useRef<MLCEngine | null>(null);
  const initializingRef = useRef(false);

  /**
   * Lazily initialize the engine — it was already downloaded via
   * the consent flow, so this just loads from cache (fast).
   */
  const getEngine = useCallback(async (): Promise<MLCEngine> => {
    if (engineRef.current) return engineRef.current;

    // Prevent concurrent initializations
    if (initializingRef.current) {
      // Wait for the other init to finish
      while (initializingRef.current) {
        await new Promise((r) => setTimeout(r, 100));
      }
      if (engineRef.current) return engineRef.current;
    }

    initializingRef.current = true;
    try {
      const { CreateMLCEngine } = await import('@mlc-ai/web-llm');
      const engine = await CreateMLCEngine(RESIDENT_MODEL_ID);
      engineRef.current = engine;
      return engine;
    } finally {
      initializingRef.current = false;
    }
  }, []);

  const send = useCallback(async (text: string) => {
    const question = text.trim();
    if (!question || isThinking) return;

    setError(null);
    setIsThinking(true);
    const userTurn: ResidentTurn = { role: 'user', content: question };
    setTurns((prev) => [...prev, userTurn, { role: 'assistant', content: '' }]);

    try {
      const engine = await getEngine();

      // Build grounding context from the Canon
      const { system } = buildResidentContext(wire, attestations, question);

      // Build message history
      const history = [...turns, userTurn]
        .slice(-HISTORY_WINDOW)
        .map((t) => ({ role: t.role as 'user' | 'assistant', content: t.content }));

      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        { role: 'system', content: system },
        ...history,
      ];

      // Stream from the engine
      let assembled = '';
      const asyncStream = await engine.chat.completions.create({
        messages,
        model: RESIDENT_MODEL_ID,
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
        stream: true,
      });

      for await (const chunk of asyncStream) {
        const delta = chunk.choices[0]?.delta?.content ?? '';
        if (delta) {
          assembled += delta;
          setTurns((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: 'assistant', content: assembled };
            return next;
          });
        }
      }

      if (!assembled.trim()) {
        throw new Error('The Oracle returned silence. Try again.');
      }

      // NO METERING — resident inference is free. This is by design.
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      // Drop the empty assistant placeholder on failure
      setTurns((prev) => (prev[prev.length - 1]?.content === '' ? prev.slice(0, -2) : prev));
    } finally {
      setIsThinking(false);
    }
  }, [turns, isThinking, wire, attestations, getEngine]);

  /** Reset the engine — called when removing the model. */
  const resetEngine = useCallback(() => {
    engineRef.current = null;
  }, []);

  return {
    turns,
    send,
    isThinking,
    error,
    resetEngine,
  };
}
