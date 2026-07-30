/**
 * Device capability detection for the Resident Oracle.
 *
 * Returns 'webgpu' if the device can run the on-device model,
 * 'none' otherwise. Non-WebGPU devices hold at the Canon —
 * the hosted Oracle remains available but the resident path
 * is not offered.
 *
 * Heuristic:
 * - WebGPU must be present (navigator.gpu)
 * - navigator.deviceMemory >= 4 if the API exists
 *   (undefined counts as capable — Safari does not expose it)
 */

// WP-9: Wllama CPU fallback for non-WebGPU devices is explicitly
// deferred to a future work package. When implemented, this function
// should return 'wllama' as a third variant for capable-but-no-GPU
// devices, and the consent + loader should handle the CPU path.

export type ResidentRuntime = 'webgpu' | 'none';

export function detectResidentSupport(): ResidentRuntime {
  // WebGPU check
  if (typeof navigator === 'undefined') return 'none';

  const hasWebGPU = 'gpu' in navigator;
  if (!hasWebGPU) return 'none';

  // Memory heuristic: deviceMemory is Chrome-only (undefined on Safari/Firefox).
  // Undefined = we can't tell, so we assume capable (Safari on modern devices).
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mem !== undefined && mem < 4) return 'none';

  return 'webgpu';
}
