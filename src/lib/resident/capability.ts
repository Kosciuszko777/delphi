/**
 * Device capability detection for the Resident Oracle.
 *
 * Returns the best available on-device runtime:
 * - 'webgpu': the fast path (WebLLM). WebGPU present + enough memory.
 * - 'wllama': the CPU fallback (Wllama / WASM SIMD). No WebGPU, but
 *   WebAssembly with SIMD is available. Slower, but everything still
 *   runs on-device.
 * - 'none': not even CPU inference is viable (no WASM SIMD, or too
 *   little memory). These devices hold at the Canon; the hosted
 *   Oracle remains available.
 *
 * Heuristic:
 * - WebGPU: navigator.gpu present + navigator.deviceMemory >= 4
 *   (undefined counts as capable — Safari does not expose it)
 * - Wllama: WebAssembly + SIMD support + navigator.deviceMemory >= 2
 * - none: everything else
 */

export type ResidentRuntime = 'webgpu' | 'wllama' | 'none';

/** Minimum device memory (GB) for each runtime. undefined memory = assume capable. */
const WEBGPU_MIN_MEMORY_GB = 4;
const WLLAMA_MIN_MEMORY_GB = 2;

/** Device memory in GB, or undefined if the browser does not expose it. */
function deviceMemoryGB(): number | undefined {
  if (typeof navigator === 'undefined') return undefined;
  return (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
}

/**
 * Detect WebAssembly SIMD support. Wllama's WASM build requires SIMD;
 * without it, CPU inference is not viable. We probe with the canonical
 * minimal SIMD module (a module using the v128 type).
 */
export function hasWasmSimd(): boolean {
  if (typeof WebAssembly === 'undefined') return false;
  try {
    // Minimal WASM module that uses a v128 (SIMD) local — validates only
    // on engines with SIMD support. Bytes from the wasm-feature-detect probe.
    const bytes = new Uint8Array([
      0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3,
      2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11,
    ]);
    return WebAssembly.validate(bytes);
  } catch {
    return false;
  }
}

/** True when the current context has WebGPU with sufficient memory. */
function supportsWebGPU(): boolean {
  if (typeof navigator === 'undefined') return false;
  if (!('gpu' in navigator)) return false;
  const mem = deviceMemoryGB();
  if (mem !== undefined && mem < WEBGPU_MIN_MEMORY_GB) return false;
  return true;
}

/** True when the current context can run CPU inference via Wllama. */
function supportsWllama(): boolean {
  if (!hasWasmSimd()) return false;
  const mem = deviceMemoryGB();
  if (mem !== undefined && mem < WLLAMA_MIN_MEMORY_GB) return false;
  return true;
}

export function detectResidentSupport(): ResidentRuntime {
  if (supportsWebGPU()) return 'webgpu';
  if (supportsWllama()) return 'wllama';
  return 'none';
}
