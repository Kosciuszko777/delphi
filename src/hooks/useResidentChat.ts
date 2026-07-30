/**
 * useResidentChat — on-device inference.
 *
 * Two runtimes, one surface:
 * - 'webgpu': WebLLM (Qwen2.5-1.5B, WebGPU)
 * - 'wllama': Wllama (Qwen2.5-0.5B GGUF, WASM SIMD, CPU)
 *
 * Mirrors useOracleChat's surface (turns, send, isThinking, error)
 * but: no meter, no network, streaming from the on-device engine.
 *
 * CRITICAL: resident inference is UNMETERED — it costs nothing.
 * The code must never meter it.
 */

import { useCallback, useRef, useState } from 'react';
import { useWire } from '@/hooks/useWire';
import { useAttestations } from '@/hooks/useAttestations';
import { buildResidentContext } from '@/lib/resident/grounding';
import { RESIDENT_MODEL_ID } from '@/lib/resident/config';
import { installedRuntime, getWllamaInstance, type WllamaLike } from '@/lib/resident/loader';
import type { ResidentRuntime } from '@/lib/resident/capability';
import type { MLCEngine } from '@mlc-ai/web-llm';

export interface ResidentTurn {
  role: 'user' | 'assistant';
  content: string;
}

const HISTORY_WINDOW = 6; // Smaller window for the smaller model
const MAX_TOKENS = 400;
const TEMPERATURE = 0.7;

type ChatMessages = Array<{ role: 'system' | 'user' | 'assistant'; content: string }>;

export function useResidentChat() {
  const { wire } = useWire();
  const { attestations } = useAttestations();

  const [turns, setTurns] = useState<ResidentTurn[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const engineRef = useRef<MLCEngine | null>(null);
  const wllamaRef = useRef<WllamaLike | null>(null);
  const initializingRef = useRef(false);

  /**
   * Lazily get the WebLLM engine — it was already downloaded via the
   * consent flow, so this just re-opens from the browser cache (fast).
   */
  const getWebGpuEngine = useCallback(async (): Promise<MLCEngine> => {
    if (engineRef.current) return engineRef.current;

    if (initializingRef.current) {
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

  /**
   * Get the live Wllama instance. Unlike WebLLM, the CPU model lives in
   * the WASM heap and must have been loaded in this session (the consent
   * flow does this). If it isn't present, we surface a clear error so the
   * UI can offer a reload/hosted fallback.
   */
  const getWllamaEngine = useCallback((): WllamaLike => {
    if (wllamaRef.current) return wllamaRef.current;
    const instance = getWllamaInstance();
    if (!instance) {
      throw new Error('WLLAMA_NOT_LOADED');
    }
    wllamaRef.current = instance;
    return instance;
  }, []);

  const runWebGpu = useCallback(
    async (messages: ChatMessages, onDelta: (s: string) => void): Promise<string> => {
      const engine = await getWebGpuEngine();
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
          onDelta(assembled);
        }
      }
      return assembled;
    },
    [getWebGpuEngine],
  );

  const runWllama = useCallback(
    async (messages: ChatMessages, onDelta: (s: string) => void): Promise<string> => {
      const instance = getWllamaEngine();
      let assembled = '';
      const result = await instance.createChatCompletion({
        messages,
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
        stream: true,
        onNewToken: (_token, _piece, currentText) => {
          assembled = currentText;
          onDelta(assembled);
        },
      });
      // If the build ignored streaming, fall back to the returned value.
      if (!assembled) {
        if (typeof result === 'string') {
          assembled = result;
        } else if (result?.choices?.[0]?.message?.content) {
          assembled = result.choices[0].message.content;
        }
        onDelta(assembled);
      }
      return assembled;
    },
    [getWllamaEngine],
  );

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || isThinking) return;

      setError(null);
      setIsThinking(true);
      const userTurn: ResidentTurn = { role: 'user', content: question };
      setTurns((prev) => [...prev, userTurn, { role: 'assistant', content: '' }]);

      try {
        const runtime: ResidentRuntime = installedRuntime() ?? 'webgpu';

        // Build grounding context from the Canon
        const { system } = buildResidentContext(wire, attestations, question);

        // Build message history
        const history = [...turns, userTurn]
          .slice(-HISTORY_WINDOW)
          .map((t) => ({ role: t.role as 'user' | 'assistant', content: t.content }));

        const messages: ChatMessages = [{ role: 'system', content: system }, ...history];

        const onDelta = (assembled: string) => {
          setTurns((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: 'assistant', content: assembled };
            return next;
          });
        };

        const assembled =
          runtime === 'wllama'
            ? await runWllama(messages, onDelta)
            : await runWebGpu(messages, onDelta);

        if (!assembled.trim()) {
          throw new Error('The Oracle returned silence. Try again.');
        }

        // NO METERING — resident inference is free. This is by design.
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        // Drop the empty assistant placeholder on failure
        setTurns((prev) => (prev[prev.length - 1]?.content === '' ? prev.slice(0, -2) : prev));
      } finally {
        setIsThinking(false);
      }
    },
    [turns, isThinking, wire, attestations, runWebGpu, runWllama],
  );

  /** Reset the engines — called when removing the model. */
  const resetEngine = useCallback(() => {
    engineRef.current = null;
    wllamaRef.current = null;
  }, []);

  return {
    turns,
    send,
    isThinking,
    error,
    resetEngine,
  };
}
