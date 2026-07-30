/**
 * Resident Oracle configuration — the on-device model.
 *
 * The model loads ONLY behind entitlement: the loader function throws
 * if entitlement === 'free' (defense in depth; UI never offers it either).
 *
 * Two runtimes:
 * - WebGPU (WebLLM): the fast path, Qwen2.5-1.5B, ~0.9 GB.
 * - CPU (Wllama / WASM): the honest fallback for non-WebGPU devices,
 *   a smaller Qwen2.5-0.5B GGUF, ~0.4 GB. Slower, but everything still
 *   runs on-device — no question leaves the phone.
 */

// ─── WebGPU path (WebLLM) ───

/** The MLC-packaged model served by WebLLM's CDN. */
export const RESIDENT_MODEL_ID = 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC';

/** Approximate download size in GB — shown in the consent UI. */
export const RESIDENT_MODEL_SIZE_GB = 0.9;

// ─── CPU path (Wllama / WASM) ───

/**
 * The GGUF model for CPU inference, hosted on Hugging Face.
 * A smaller model than the WebGPU path — CPU inference of a 1.5B model
 * is impractically slow, so the honest CPU choice is 0.5B in Q4.
 */
export const RESIDENT_CPU_MODEL_HF = {
  repo: 'ggml-org/Qwen2.5-0.5B-Instruct-GGUF',
  file: 'qwen2.5-0.5b-instruct-q4_k_m.gguf',
} as const;

/** Approximate CPU model download size in GB — shown in the consent UI. */
export const RESIDENT_CPU_MODEL_SIZE_GB = 0.4;

// ─── Shared ───

/** Master kill switch. Set to false to hide the resident path entirely. */
export const RESIDENT_ENABLED = true;

/** localStorage key for the installed flag. */
export const RESIDENT_INSTALLED_KEY = 'delphi:resident-installed';

/** localStorage key recording which runtime was installed ('webgpu' | 'wllama'). */
export const RESIDENT_RUNTIME_KEY = 'delphi:resident-runtime';

/** localStorage key for mode preference (resident vs hosted). */
export const RESIDENT_MODE_PREF_KEY = 'delphi:oracle-mode-pref';
