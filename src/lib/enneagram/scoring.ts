/**
 * Enneagram Scoring Engine
 *
 * Takes raw Likert answers (1–5 per item) and computes:
 *   - Raw scores for all 9 types
 *   - Normalized percentages (0–100)
 *   - Core type (highest score)
 *   - Wing (highest-scoring adjacent type)
 */

import items from './items';

/** Raw answers: item id → Likert value (1–5) */
export type EnneagramAnswers = Record<number, number>;

/** Score for a single Enneagram type */
export interface TypeScore {
  type: number;
  name: string;
  rawScore: number;
  /** Max possible raw score for this type */
  maxScore: number;
  /** Normalized 0–100 */
  percent: number;
}

export interface EnneagramScoreResult {
  /** All nine type scores, ordered 1–9 */
  scores: TypeScore[];
  /** Core type number (1–9) */
  coreType: number;
  /** Wing type number (1–9) */
  wing: number;
  /** Formatted string, e.g. "4w5" */
  label: string;
  /** Raw score array for Wire storage (index 0 = type 1) */
  rawScores: number[];
}

const TYPE_NAMES: Record<number, string> = {
  1: 'The Reformer',
  2: 'The Helper',
  3: 'The Achiever',
  4: 'The Individualist',
  5: 'The Investigator',
  6: 'The Loyalist',
  7: 'The Enthusiast',
  8: 'The Challenger',
  9: 'The Peacemaker',
};

/**
 * Get the two adjacent types (wings) for a given core type.
 * The Enneagram is a circle: 9's neighbors are 8 and 1.
 */
function getAdjacentTypes(core: number): [number, number] {
  const left = core === 1 ? 9 : core - 1;
  const right = core === 9 ? 1 : core + 1;
  return [left, right];
}

/**
 * Score the Enneagram questionnaire from all answers.
 */
export function scoreEnneagram(answers: EnneagramAnswers): EnneagramScoreResult {
  // Count items per type for max score calculation
  const itemsByType = new Map<number, number>();
  for (const item of items) {
    itemsByType.set(item.type, (itemsByType.get(item.type) ?? 0) + 1);
  }

  // Sum raw scores per type
  const rawByType = new Map<number, number>();
  for (let t = 1; t <= 9; t++) rawByType.set(t, 0);

  for (const item of items) {
    const answer = answers[item.id];
    if (answer !== undefined) {
      rawByType.set(item.type, (rawByType.get(item.type) ?? 0) + answer);
    }
  }

  // Build scored array
  const scores: TypeScore[] = [];
  for (let t = 1; t <= 9; t++) {
    const raw = rawByType.get(t) ?? 0;
    const count = itemsByType.get(t) ?? 4;
    const maxScore = count * 5; // max is 5 per item
    const percent = maxScore > 0 ? Math.round((raw / maxScore) * 100) : 0;
    scores.push({
      type: t,
      name: TYPE_NAMES[t] ?? `Type ${t}`,
      rawScore: raw,
      maxScore,
      percent,
    });
  }

  // Core type = highest percent (ties broken by lower type number)
  const sorted = [...scores].sort((a, b) => b.percent - a.percent || a.type - b.type);
  const coreType = sorted[0].type;

  // Wing = highest-scoring adjacent type
  const [adjLeft, adjRight] = getAdjacentTypes(coreType);
  const leftScore = scores[adjLeft - 1].percent;
  const rightScore = scores[adjRight - 1].percent;
  const wing = leftScore >= rightScore ? adjLeft : adjRight;

  const rawScores = scores.map(s => s.rawScore);

  return {
    scores,
    coreType,
    wing,
    label: `${coreType}w${wing}`,
    rawScores,
  };
}

/**
 * Check if all items have been answered.
 */
export function isComplete(answers: EnneagramAnswers): boolean {
  return items.every(item => answers[item.id] !== undefined);
}

/**
 * Count how many items have been answered.
 */
export function answeredCount(answers: EnneagramAnswers): number {
  return items.filter(item => answers[item.id] !== undefined).length;
}

export { TYPE_NAMES };
