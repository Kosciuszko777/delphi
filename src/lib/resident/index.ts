/** Resident Oracle — on-device inference via WebLLM (WebGPU) or Wllama (CPU). */

export {
  RESIDENT_MODEL_ID,
  RESIDENT_MODEL_SIZE_GB,
  RESIDENT_CPU_MODEL_HF,
  RESIDENT_CPU_MODEL_SIZE_GB,
  RESIDENT_ENABLED,
  RESIDENT_INSTALLED_KEY,
  RESIDENT_RUNTIME_KEY,
  RESIDENT_MODE_PREF_KEY,
} from './config';
export { detectResidentSupport, hasWasmSimd, type ResidentRuntime } from './capability';
export {
  loadResidentModel,
  isResidentInstalled,
  installedRuntime,
  getWllamaInstance,
  removeResidentModel,
  type LoadProgress,
  type ProgressCallback,
  type WllamaLike,
} from './loader';
export { buildResidentContext, RESIDENT_SYSTEM_PROMPT, type ResidentContext } from './grounding';
