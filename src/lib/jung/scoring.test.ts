import { describe, it, expect } from 'vitest';
import items from './items';
import { scoreJung, isComplete, answeredCount, type JungAnswers } from './scoring';

/** Build an answer set that pushes every dimension toward the given poles. */
function answersToward(poles: Set<string>): JungAnswers {
  const answers: JungAnswers = {};
  for (const item of items) {
    answers[item.id] = poles.has(item.pole) ? 5 : 1;
  }
  return answers;
}

/** Neutral middle answers everywhere. */
function neutralAnswers(): JungAnswers {
  const answers: JungAnswers = {};
  for (const item of items) answers[item.id] = 3;
  return answers;
}

describe('scoreJung', () => {
  it('derives ESTJ from maximal agreement with E/S/T/J-pole items', () => {
    const result = scoreJung(answersToward(new Set(['E', 'S', 'T', 'J'])));
    expect(result.type).toBe('ESTJ');
  });

  it('derives INFP from maximal agreement with I/N/F/P-pole items', () => {
    const result = scoreJung(answersToward(new Set(['I', 'N', 'F', 'P'])));
    expect(result.type).toBe('INFP');
  });

  it('reports four dimensions with percentages summing to 100 each', () => {
    const result = scoreJung(answersToward(new Set(['E', 'N', 'T', 'J'])));
    expect(result.dimensions).toHaveLength(4);
    for (const dim of result.dimensions) {
      expect(dim.leftPercent + dim.rightPercent).toBe(100);
      expect(dim.leftPercent).toBeGreaterThanOrEqual(0);
      expect(dim.leftPercent).toBeLessThanOrEqual(100);
    }
  });

  it('marks extreme preferences as strong', () => {
    const result = scoreJung(answersToward(new Set(['I', 'N', 'T', 'J'])));
    for (const dim of result.dimensions) {
      expect(dim.strength).toBe('strong');
    }
  });

  it('produces a valid 4-letter type even on fully neutral answers', () => {
    const result = scoreJung(neutralAnswers());
    expect(result.type).toMatch(/^[EI][SN][TF][JP]$/);
  });

  it('numeric wire percentages agree with the derived type letters', () => {
    const result = scoreJung(answersToward(new Set(['I', 'N', 'F', 'P'])));
    // 0 = left pole (E/S/T/J), 100 = right pole (I/N/F/P)
    expect(result.ei).toBeGreaterThan(50);
    expect(result.sn).toBeGreaterThan(50);
    expect(result.tf).toBeGreaterThan(50);
    expect(result.jp).toBeGreaterThan(50);
  });
});

describe('completeness helpers', () => {
  it('isComplete requires every item answered', () => {
    const answers = answersToward(new Set(['E', 'S', 'T', 'J']));
    expect(isComplete(answers)).toBe(true);
    delete answers[items[0].id];
    expect(isComplete(answers)).toBe(false);
  });

  it('answeredCount counts answered items', () => {
    expect(answeredCount({})).toBe(0);
    expect(answeredCount({ [items[0].id]: 3 })).toBe(1);
  });
});
