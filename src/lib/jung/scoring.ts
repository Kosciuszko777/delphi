/**
 * Jungian Type Scoring Engine
 *
 * Takes raw Likert answers (1–5 per item) and computes:
 *   - Per-dimension percentage scores (0–100 for each pole)
 *   - Derived four-letter type code
 *   - Dimension strength (how clear the preference is)
 */

import items, { type Dimension, type Pole, type JungItem } from './items';

/** Raw answers: item id → Likert value (1–5) */
export type JungAnswers = Record<number, number>;

/** Score for a single dimension */
export interface DimensionScore {
  dimension: Dimension;
  /** Label for the "left" pole (E, S, T, J) */
  leftPole: string;
  /** Label for the "right" pole (I, N, F, P) */
  rightPole: string;
  /** Left pole full name */
  leftName: string;
  /** Right pole full name */
  rightName: string;
  /** Percentage favoring left pole (0–100) */
  leftPercent: number;
  /** Percentage favoring right pole (0–100) */
  rightPercent: number;
  /** Which pole won */
  winner: Pole;
  /** Strength of preference: "slight" | "moderate" | "clear" | "strong" */
  strength: 'slight' | 'moderate' | 'clear' | 'strong';
}

export interface JungScoreResult {
  type: string; // e.g. "INTJ"
  dimensions: DimensionScore[];
  /** Numeric percentages for Wire storage: 0=left pole, 100=right pole */
  ei: number; // 0=E, 100=I
  sn: number; // 0=S, 100=N
  tf: number; // 0=T, 100=F
  jp: number; // 0=J, 100=P
}

const DIMENSION_META: Record<Dimension, {
  leftPole: Pole; rightPole: Pole;
  leftName: string; rightName: string;
}> = {
  EI: { leftPole: 'E', rightPole: 'I', leftName: 'Extraversion', rightName: 'Introversion' },
  SN: { leftPole: 'S', rightPole: 'N', leftName: 'Sensing', rightName: 'Intuition' },
  TF: { leftPole: 'T', rightPole: 'F', leftName: 'Thinking', rightName: 'Feeling' },
  JP: { leftPole: 'J', rightPole: 'P', leftName: 'Judging', rightName: 'Perceiving' },
};

/**
 * Score one dimension.
 *
 * For each item in the dimension:
 * - If the item measures the LEFT pole (E, S, T, J):
 *     leftScore += answer (1–5)
 * - If the item measures the RIGHT pole (I, N, F, P):
 *     rightScore += answer (1–5)
 *
 * Normalize to percentages.
 */
function scoreDimension(dimension: Dimension, answers: JungAnswers): DimensionScore {
  const meta = DIMENSION_META[dimension];
  const dimItems = items.filter(i => i.dimension === dimension);

  let leftTotal = 0;
  let rightTotal = 0;

  for (const item of dimItems) {
    const answer = answers[item.id];
    if (answer === undefined) continue;

    if (item.pole === meta.leftPole) {
      leftTotal += answer;
    } else {
      rightTotal += answer;
    }
  }

  const sum = leftTotal + rightTotal;
  if (sum === 0) {
    return {
      dimension,
      ...meta,
      leftPercent: 50,
      rightPercent: 50,
      winner: meta.leftPole,
      strength: 'slight',
    };
  }

  const leftPercent = Math.round((leftTotal / sum) * 100);
  const rightPercent = 100 - leftPercent;

  const diff = Math.abs(leftPercent - rightPercent);
  const strength: DimensionScore['strength'] =
    diff <= 10 ? 'slight' :
    diff <= 25 ? 'moderate' :
    diff <= 40 ? 'clear' : 'strong';

  return {
    dimension,
    ...meta,
    leftPercent,
    rightPercent,
    winner: leftPercent >= rightPercent ? meta.leftPole : meta.rightPole,
    strength,
  };
}

/**
 * Compute the full Jungian type from all answers.
 */
export function scoreJung(answers: JungAnswers): JungScoreResult {
  const dims: Dimension[] = ['EI', 'SN', 'TF', 'JP'];
  const dimensions = dims.map(d => scoreDimension(d, answers));

  const type = dimensions.map(d => d.winner).join('');

  // For Wire storage: rightPercent = percentage toward I, N, F, P
  const ei = dimensions[0].rightPercent;
  const sn = dimensions[1].rightPercent;
  const tf = dimensions[2].rightPercent;
  const jp = dimensions[3].rightPercent;

  return { type, dimensions, ei, sn, tf, jp };
}

/**
 * Check if all items have been answered.
 */
export function isComplete(answers: JungAnswers): boolean {
  return items.every(item => answers[item.id] !== undefined);
}

/**
 * Count how many items have been answered.
 */
export function answeredCount(answers: JungAnswers): number {
  return items.filter(item => answers[item.id] !== undefined).length;
}

/**
 * Get items grouped by dimension (for a structured view).
 */
export function getItemsByDimension(): Record<Dimension, JungItem[]> {
  return {
    EI: items.filter(i => i.dimension === 'EI'),
    SN: items.filter(i => i.dimension === 'SN'),
    TF: items.filter(i => i.dimension === 'TF'),
    JP: items.filter(i => i.dimension === 'JP'),
  };
}
