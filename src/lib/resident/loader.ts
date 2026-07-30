/**
 * Resident Oracle loader — downloads and initializes the on-device model.
 *
 * Two runtimes:
 * - 'webgpu': WebLLM (Qwen2.5-1.5B, WebGPU compute shaders)
 * - 'wllama': Wllama (Qwen2.5-0.5B GGUF, WebAssembly SIMD, CPU)
 *
 * Defense in depth: the loader throws if entitlement === 'free'.
 * The UI never offers the resident path to free users either,
 * but this guard ensures code-level enforcement.
 */

import type { Entitlement } from '@/lib/oracle/meter';
import type { ResidentRuntime } from './capability';
import {
  RESIDENT_MODEL_ID,
  RESIDENT_CPU_MODEL_HF,
  RESIDENT_INSTALLED_KEY,
  RESIDENT_RUNTIME_KEY,
} from './config';

export type LoadProgress = {
  text: string;
  progress: number; // 0–1
};

export type ProgressCallback = (progress: LoadProgress) => void;

// Wllama v3 instance type (loose typing to avoid importing the heavy module at rest).
export interface WllamaLike {
  loadModelFromHF: (
    model: { repo: string; file: string },
    opts?: { progressCallback?: (p: { loaded: number; total: number }) => void },
  ) => Promise<void>;
  createChatCompletion: (opts: {
    messages: Array<{ role: string; content: string }>;
    max_tokens?: number;
    temperature?: number;
    stream?: boolean;
    onNewToken?: (token: number, piece: Uint8Array, currentText: string) => void;
  }) => Promise<string | { choices: Array<{ message: { content: string } }> }>;
  exit?: () => Promise<void>;
}

/**
 * Module-level singleton for the Wllama instance. Because the CPU model
 * lives entirely in the WASM heap (not a browser cache we can lazily
 * re-open like WebLLM), we keep the loaded instance alive across the
 * consent → chat transition within a single session.
 */
let wllamaInstance: WllamaLike | null = null;

/** Retrieve the live Wllama instance, if one has been loaded this session. */
export function getWllamaInstance(): WllamaLike | null {
  return wllamaInstance;
}

/**
 * Initialize the resident model for the given runtime. Returns when the
 * model is ready.
 *
 * @throws if entitlement is 'free' (defense in depth)
 * @throws if the runtime is 'none'
 * @throws on download/init failure
 */
export async function loadResidentModel(
  entitlement: Entitlement,
  runtime: ResidentRuntime,
  onProgress?: ProgressCallback,
): Promise<void> {
  if (entitlement === 'free') {
    throw new Error('Resident Oracle requires an Initiate or Council entitlement.');
  }
  if (runtime === 'none') {
    throw new Error('This device has no on-device runtime for the Resident Oracle.');
  }

  if (runtime === 'webgpu') {
    await loadWebGpuModel(onProgress);
  } else {
    await loadWllamaModel(onProgress);
  }

  // Mark as installed + record which runtime
  localStorage.setItem(RESIDENT_INSTALLED_KEY, 'true');
  localStorage.setItem(RESIDENT_RUNTIME_KEY, runtime);
}

/** WebGPU path — WebLLM. */
async function loadWebGpuModel(onProgress?: ProgressCallback): Promise<void> {
  // Dynamic import — web-llm is large; only load when actually needed
  const { CreateMLCEngine } = await import('@mlc-ai/web-llm');

  await CreateMLCEngine(RESIDENT_MODEL_ID, {
    initProgressCallback: (report) => {
      onProgress?.({ text: report.text, progress: report.progress });
    },
  });
}

/**
 * WASM binary paths for Wllama, served from jsDelivr's copy of the
 * package. We pin these explicitly instead of importing the package's
 * `wasm-from-cdn.js` helper, because that subpath is not resolvable
 * through the ESM CDN used by the build.
 */
const WLLAMA_WASM_VERSION = '3.5.1';
const WLLAMA_WASM_BASE = `https://cdn.jsdelivr.net/npm/@wllama/wllama@${WLLAMA_WASM_VERSION}/esm/wasm`;
const WLLAMA_CONFIG_PATHS = {
  'single-thread/wllama.wasm': `${WLLAMA_WASM_BASE}/single-thread/wllama.wasm`,
  'multi-thread/wllama.wasm': `${WLLAMA_WASM_BASE}/multi-thread/wllama.wasm`,
};

/** CPU path — Wllama (WASM SIMD). */
async function loadWllamaModel(onProgress?: ProgressCallback): Promise<void> {
  // Dynamic import — wllama's WASM binding is large; load on demand.
  // The package's root export does not resolve through the ESM CDN,
  // so we import the explicit ESM entry point. The .wasm binaries are
  // served from the package CDN so we do not bundle or self-host them.
  const { Wllama } = await import('@wllama/wllama/esm/index.js');

  const instance = new Wllama(WLLAMA_CONFIG_PATHS as never) as unknown as WllamaLike;

  await instance.loadModelFromHF(RESIDENT_CPU_MODEL_HF, {
    progressCallback: ({ loaded, total }) => {
      onProgress?.({
        text: 'Loading the Oracle onto your device',
        progress: total > 0 ? loaded / total : 0,
      });
    },
  });

  wllamaInstance = instance;
}

/**
 * The runtime the installed model uses ('webgpu' | 'wllama'), or null
 * if nothing is installed.
 */
export function installedRuntime(): ResidentRuntime | null {
  try {
    const value = localStorage.getItem(RESIDENT_RUNTIME_KEY);
    if (value === 'webgpu' || value === 'wllama') return value;
    // Legacy: installed before runtime tracking → assume webgpu
    if (localStorage.getItem(RESIDENT_INSTALLED_KEY) === 'true') return 'webgpu';
    return null;
  } catch {
    return null;
  }
}

/**
 * Check if the resident model is installed (localStorage flag).
 * The actual model lives in the browser's Cache Storage / OPFS
 * (WebGPU) or the WASM heap (CPU).
 */
export function isResidentInstalled(): boolean {
  try {
    return localStorage.getItem(RESIDENT_INSTALLED_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Remove the resident model — clears caches, the WASM instance, and the
 * install flags.
 */
export async function removeResidentModel(): Promise<void> {
  // Clear the localStorage flags first
  localStorage.removeItem(RESIDENT_INSTALLED_KEY);
  localStorage.removeItem(RESIDENT_RUNTIME_KEY);

  // Tear down the live Wllama instance, if any
  if (wllamaInstance) {
    try {
      await wllamaInstance.exit?.();
    } catch {
      // best effort
    }
    wllamaInstance = null;
  }

  // Clear WebLLM's cache (Cache API entries) and any Wllama-cached model
  try {
    if (typeof caches !== 'undefined') {
      const keys = await caches.keys();
      for (const key of keys) {
        if (
          key.includes('webllm') ||
          key.includes('mlc') ||
          key.includes('wllama')
        ) {
          await caches.delete(key);
        }
      }
    }
  } catch {
    // Cache API may not be available — flags are already cleared
  }
}
