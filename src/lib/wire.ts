/**
 * Soulgraph — the user's sovereign psychometric identity signature.
 *
 * A Soulgraph aggregates results from multiple typology systems into a single
 * compact fingerprint. Each "chamber" is optional — the Soulgraph grows as the
 * user completes assessments.
 *
 * NOTE: The Wire type alias is kept for backward compatibility with Nostr
 * event tags and localStorage keys. New code should use Soulgraph.
 */

/** Jungian 16-type result (Phase 2). */
export interface JungResult {
  type: string; // e.g. "INTJ"
  ei: number;   // 0–100 introversion
  sn: number;   // 0–100 intuition
  tf: number;   // 0–100 thinking
  jp: number;   // 0–100 judging
}

/** Human Design manual entry (Phase 4). */
export interface HumanDesignResult {
  type: string;      // Generator, Manifesting Generator, Projector, Manifestor, Reflector
  profile: string;   // e.g. "3/5"
  authority: string;  // e.g. "Sacral"
}

/** Enneagram result (Phase 3). */
export interface EnneagramResult {
  core: number;   // 1–9
  wing: number;   // 1–9
  scores: number[]; // all nine type scores
}

/** Millman Life-Purpose result. */
export interface MillmanResult {
  /** The full life-purpose number, e.g. "30/3" */
  number: string;
  /** The birth-date digits used, e.g. [3, 0, 3] for month=3 day=0 year summed */
  birthDate: string; // ISO date string YYYY-MM-DD
}

/** The complete Soulgraph — all chambers. */
export interface Soulgraph {
  millman?: MillmanResult;
  jung?: JungResult;
  enneagram?: EnneagramResult;
  humanDesign?: HumanDesignResult;
}

/** @deprecated Use Soulgraph instead. */
export type Wire = Soulgraph;

/** Format a Soulgraph into the canonical one-line string. */
export function formatSoulgraph(wire: Soulgraph): string {
  const parts: string[] = [];

  if (wire.jung) {
    parts.push(wire.jung.type);
  }

  if (wire.humanDesign) {
    parts.push(`${wire.humanDesign.type} ${wire.humanDesign.profile}`);
  }

  if (wire.millman) {
    parts.push(`Millman ${wire.millman.number}`);
  }

  if (wire.enneagram) {
    parts.push(`Enneagram ${wire.enneagram.core}w${wire.enneagram.wing}`);
  }

  return parts.join(' · ');
}

/** @deprecated Use formatSoulgraph instead. */
export const formatWire = formatSoulgraph;

/** Check if a Soulgraph has at least one chamber filled. */
export function isSoulgraphPopulated(wire: Soulgraph): boolean {
  return !!(wire.millman || wire.jung || wire.enneagram || wire.humanDesign);
}

/** @deprecated Use isSoulgraphPopulated instead. */
export const isWirePopulated = isSoulgraphPopulated;

/** Count how many chambers are filled. */
export function filledChamberCount(wire: Soulgraph): number {
  let count = 0;
  if (wire.millman) count++;
  if (wire.jung) count++;
  if (wire.enneagram) count++;
  if (wire.humanDesign) count++;
  return count;
}

/** Total number of chambers available. */
export const TOTAL_CHAMBERS = 4;
