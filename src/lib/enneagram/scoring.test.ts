import { describe, it, expect } from 'vitest';
import items from './items';
import { scoreEnneagram, isComplete, type EnneagramAnswers } from './scoring';

/**
 * Build answers with a clear core and a chosen adjacent wing:
 * core items score 5, wing items 4, everything else 1.
 */
function answersFor(core: number, wing: number): EnneagramAnswers {
  const answers: EnneagramAnswers = {};
  for (const item of items) {
    if (item.type === core) answers[item.id] = 5;
    else if (item.type === wing) answers[item.id] = 4;
    else answers[item.id] = 1;
  }
  return answers;
}

describe('scoreEnneagram', () => {
  it('identifies core 8 with wing 7 → "8w7"', () => {
    const result = scoreEnneagram(answersFor(8, 7));
    expect(result.coreType).toBe(8);
    expect(result.wing).toBe(7);
    expect(result.label).toBe('8w7');
  });

  it('identifies core 4 with wing 5 → "4w5"', () => {
    const result = scoreEnneagram(answersFor(4, 5));
    expect(result.coreType).toBe(4);
    expect(result.wing).toBe(5);
    expect(result.label).toBe('4w5');
  });

  it('wings wrap around the circle: core 9 can wing 1', () => {
    const result = scoreEnneagram(answersFor(9, 1));
    expect(result.coreType).toBe(9);
    expect(result.wing).toBe(1);
    expect(result.label).toBe('9w1');
  });

  it('wings wrap around the circle: core 1 can wing 9', () => {
    const result = scoreEnneagram(answersFor(1, 9));
    expect(result.coreType).toBe(1);
    expect(result.wing).toBe(9);
  });

  it('the wing is always adjacent to the core', () => {
    for (let core = 1; core <= 9; core++) {
      const wing = core === 9 ? 1 : core + 1;
      const result = scoreEnneagram(answersFor(core, wing));
      const left = core === 1 ? 9 : core - 1;
      const right = core === 9 ? 1 : core + 1;
      expect([left, right]).toContain(result.wing);
    }
  });

  it('returns all nine type scores with sane percentages', () => {
    const result = scoreEnneagram(answersFor(5, 4));
    expect(result.scores).toHaveLength(9);
    for (const s of result.scores) {
      expect(s.percent).toBeGreaterThanOrEqual(0);
      expect(s.percent).toBeLessThanOrEqual(100);
      expect(s.maxScore).toBeGreaterThan(0);
    }
    expect(result.rawScores).toHaveLength(9);
  });
});

describe('isComplete', () => {
  it('requires every item answered', () => {
    const answers = answersFor(8, 7);
    expect(isComplete(answers)).toBe(true);
    delete answers[items[0].id];
    expect(isComplete(answers)).toBe(false);
  });
});
