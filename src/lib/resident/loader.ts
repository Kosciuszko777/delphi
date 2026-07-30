/**
 * Resident Oracle loader — downloads and initializes the on-device model.
 *
 * Defense in depth: the loader throws if entitlement === 'free'.
 * The UI never offers the resident path to free users either,
 * but this guard ensures code-level enforcement.
 */

import type { Entitlement } from '@/lib/oracle/meter';
import { RESIDENT_MODEL_ID, RESIDENT_INSTALLED_KEY } from './config';

export type LoadProgress = {
  text: string;
  progress: number; // 0–1
};

export type ProgressCallback = (progress: LoadProgress) => void;

/**
 * Initialize the resident model. Returns when the model is ready.
 *
 * @throws if entitlement is 'free' (defense in depth)
 * @throws if WebGPU is not available
 * @throws on download/init failure
 */
export async function loadResidentModel(
  entitlement: Entitlement,
  onProgress?: ProgressCallback,
): Promise<void> {
  if (entitlement === 'free') {
    throw new Error('Resident Oracle requires an Initiate or Council entitlement.');
  }

  // Dynamic import — web-llm is large; only load when actually needed
  const { CreateMLCEngine } = await import('@mlc-ai/web-llm');

  await CreateMLCEngine(RESIDENT_MODEL_ID, {
    initProgressCallback: (report) => {
      onProgress?.({
        text: report.text,
        progress: report.progress,
      });
    },
  });

  // Mark as installed
  localStorage.setItem(RESIDENT_INSTALLED_KEY, 'true');
}

/**
 * Check if the resident model is installed (localStorage flag).
 * The actual model lives in the browser's Cache Storage / OPFS,
 * managed by WebLLM.
 */
export function isResidentInstalled(): boolean {
  try {
    return localStorage.getItem(RESIDENT_INSTALLED_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Remove the resident model — clears WebLLM cache and the installed flag.
 */
export async function removeResidentModel(): Promise<void> {
  // Clear the localStorage flag first
  localStorage.removeItem(RESIDENT_INSTALLED_KEY);

  // Clear WebLLM's cache (Service Worker / Cache API entries)
  try {
    if ('caches' in window) {
      const keys = await caches.keys();
      for (const key of keys) {
        if (key.includes('webllm') || key.includes('mlc')) {
          await caches.delete(key);
        }
      }
    }
  } catch {
    // Cache API may not be available — flag is already cleared
  }
}
