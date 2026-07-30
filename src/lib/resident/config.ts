/**
 * Resident Oracle configuration — the on-device model.
 *
 * The model loads ONLY behind entitlement: the loader function throws
 * if entitlement === 'free' (defense in depth; UI never offers it either).
 */

/** The MLC-packaged model served by WebLLM's CDN. */
export const RESIDENT_MODEL_ID = 'Qwen2.5-1.5B-Instruct-q4f16_1-MLC';

/** Approximate download size in GB — shown in the consent UI. */
export const RESIDENT_MODEL_SIZE_GB = 0.9;

/** Master kill switch. Set to false to hide the resident path entirely. */
export const RESIDENT_ENABLED = true;

/** localStorage key for the installed flag. */
export const RESIDENT_INSTALLED_KEY = 'delphi:resident-installed';

/** localStorage key for mode preference (resident vs hosted). */
export const RESIDENT_MODE_PREF_KEY = 'delphi:oracle-mode-pref';
