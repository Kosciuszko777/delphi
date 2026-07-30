/** Resident Oracle — on-device inference via WebLLM. */

export { RESIDENT_MODEL_ID, RESIDENT_MODEL_SIZE_GB, RESIDENT_ENABLED, RESIDENT_INSTALLED_KEY, RESIDENT_MODE_PREF_KEY } from './config';
export { detectResidentSupport, type ResidentRuntime } from './capability';
export { loadResidentModel, isResidentInstalled, removeResidentModel, type LoadProgress, type ProgressCallback } from './loader';
export { buildResidentContext, RESIDENT_SYSTEM_PROMPT, type ResidentContext } from './grounding';
