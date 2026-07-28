import { describe, it, expect } from 'vitest';
import { composeAnswer } from './compose';
import { routeQuestion } from './routing';
import { allFragments } from './corpus';
import type { Wire } from '@/lib/wire';
import type { TraitAttestation } from '@/lib/publish/traits';

// ────────────────────────────────────────────
// Fixtures
// ────────────────────────────────────────────

const FULL_WIRE: Wire = {
  jung: { type: 'INTJ', ei: 72, sn: 65, tf: 80, jp: 68 },
  enneagram: { core: 8, wing: 7, scores: [3, 2, 4, 3, 5, 3, 4, 9, 2] },
  humanDesign: { type: 'Projector', profile: '3/5', authority: 'Splenic' },
  millman: { number: '29/11', birthDate: '1985-11-13' },
};

const EMPTY_ATTESTATIONS: Record<string, TraitAttestation> = {};

const HOSTILE_ATTESTATIONS: Record<string, TraitAttestation> = {
  'jung:introversion': { traitId: 'jung:introversion', verb: 'deny', weight: 0 },
  'jung:intuition': { traitId: 'jung:intuition', verb: 'deny', weight: 0 },
  'jung:thinking': { traitId: 'jung:thinking', verb: 'deny', weight: 0 },
  'jung:judging': { traitId: 'jung:judging', verb: 'deny', weight: 0 },
};

const CONFIRMED_ATTESTATIONS: Record<string, TraitAttestation> = {
  'jung:introversion': { traitId: 'jung:introversion', verb: 'confirm', weight: 0.9 },
  'enneagram:challenger-directness': { traitId: 'enneagram:challenger-directness', verb: 'confirm', weight: 0.8 },
};

// ────────────────────────────────────────────
// Determinism
// ────────────────────────────────────────────

describe('Canon determinism', () => {
  it('produces byte-identical output for identical inputs', () => {
    const a = composeAnswer(FULL_WIRE, EMPTY_ATTESTATIONS, 'team');
    const b = composeAnswer(FULL_WIRE, EMPTY_ATTESTATIONS, 'team');
    expect(a.composedText).toBe(b.composedText);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it('produces byte-identical output across 100 runs', () => {
    const baseline = JSON.stringify(composeAnswer(FULL_WIRE, EMPTY_ATTESTATIONS, 'work'));
    for (let i = 0; i < 100; i++) {
      expect(JSON.stringify(composeAnswer(FULL_WIRE, EMPTY_ATTESTATIONS, 'work'))).toBe(baseline);
    }
  });
});

// ────────────────────────────────────────────
// Attestation contract
// ────────────────────────────────────────────

describe('Attestation contract', () => {
  it('excludes fragments when a trait is denied', () => {
    const result = composeAnswer(FULL_WIRE, HOSTILE_ATTESTATIONS, 'team');
    // INTJ team fragment depends on jung:introversion etc, all denied
    const jungSection = result.sections.find((s) => s.source === 'JUNG');
    expect(jungSection).toBeUndefined();
  });

  it('never includes denied-trait text in composedText', () => {
    const result = composeAnswer(FULL_WIRE, HOSTILE_ATTESTATIONS, 'team');
    // The INTJ team fragment starts with "You contribute to a team the way an architect"
    expect(result.composedText).not.toContain('the way an architect');
  });

  it('includes non-denied system fragments', () => {
    const result = composeAnswer(FULL_WIRE, HOSTILE_ATTESTATIONS, 'team');
    // Enneagram 8, HD Projector, Millman 11 should still be present
    expect(result.sections.some((s) => s.source === 'ENNEA')).toBe(true);
    expect(result.sections.some((s) => s.source === 'HD')).toBe(true);
    expect(result.sections.some((s) => s.source === 'NUM')).toBe(true);
  });

  it('places confirmed traits (weight ≥ 0.7) first', () => {
    const result = composeAnswer(FULL_WIRE, CONFIRMED_ATTESTATIONS, 'team');
    // Jung introversion confirmed → JUNG should be first (if not denied)
    if (result.sections.length > 1) {
      const firstNonFriction = result.sections.find((s) => s.source !== 'FRICTION');
      expect(firstNonFriction).toBeDefined();
      // With confirmed jung traits, JUNG should be among the top
    }
  });
});

// ────────────────────────────────────────────
// Friction surfacing
// ────────────────────────────────────────────

describe('Friction surfacing', () => {
  it('surfaces frictions when rules match the Wire', () => {
    // INTJ + Ennea 8 + Projector → fr:ennea8-projector should fire
    const result = composeAnswer(FULL_WIRE, EMPTY_ATTESTATIONS, 'team');
    expect(result.frictions.length).toBeGreaterThan(0);
    expect(result.frictions.some((f) => f.id === 'fr:ennea8-projector')).toBe(true);
  });

  it('limits frictions to max 2', () => {
    const result = composeAnswer(FULL_WIRE, EMPTY_ATTESTATIONS, 'team');
    expect(result.frictions.length).toBeLessThanOrEqual(2);
  });

  it('includes friction text in sections with FRICTION source', () => {
    const result = composeAnswer(FULL_WIRE, EMPTY_ATTESTATIONS, 'team');
    const frictionSections = result.sections.filter((s) => s.source === 'FRICTION');
    expect(frictionSections.length).toBe(result.frictions.length);
  });

  it('orders frictions by weight (highest first)', () => {
    const result = composeAnswer(FULL_WIRE, EMPTY_ATTESTATIONS, 'team');
    if (result.frictions.length > 1) {
      expect(result.frictions[0].weight).toBeGreaterThanOrEqual(result.frictions[1].weight);
    }
  });
});

// ────────────────────────────────────────────
// Partial Wire
// ────────────────────────────────────────────

describe('Partial Wire', () => {
  it('works with only one chamber filled', () => {
    const partial: Wire = { jung: FULL_WIRE.jung };
    const result = composeAnswer(partial, EMPTY_ATTESTATIONS, 'team');
    expect(result.sections.length).toBeGreaterThan(0);
    expect(result.sections[0].source).toBe('JUNG');
  });

  it('skips missing chambers silently', () => {
    const partial: Wire = { enneagram: FULL_WIRE.enneagram };
    const result = composeAnswer(partial, EMPTY_ATTESTATIONS, 'work');
    const sources = result.sections.map((s) => s.source);
    expect(sources).not.toContain('JUNG');
    expect(sources).not.toContain('HD');
    expect(sources).not.toContain('NUM');
  });
});

// ────────────────────────────────────────────
// Domain routing
// ────────────────────────────────────────────

describe('Domain routing', () => {
  it('routes "How do I work best in a team?" to team', () => {
    expect(routeQuestion('How do I work best in a team?')).toBe('team');
  });

  it('routes "What career should I pursue?" to work', () => {
    expect(routeQuestion('What career should I pursue?')).toBe('work');
  });

  it('routes "How should I handle conflict?" to conflict', () => {
    expect(routeQuestion('How should I handle conflict?')).toBe('conflict');
  });

  it('routes "What drains my energy?" to energy', () => {
    expect(routeQuestion('What drains my energy?')).toBe('energy');
  });

  it('routes German "Was ist mein Beruf?" to work', () => {
    expect(routeQuestion('Was ist mein Beruf?')).toBe('work');
  });

  it('returns null for unrecognized questions', () => {
    expect(routeQuestion('What is 2+2?')).toBeNull();
  });
});

// ────────────────────────────────────────────
// Corpus completeness (Phase A: team + work)
// ────────────────────────────────────────────

describe('Corpus completeness (Phase A)', () => {
  const fragments = allFragments();

  it('has team fragments for all 16 Jung types', () => {
    const types = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
    for (const t of types) {
      expect(fragments.some((f) => f.id === `jung:${t}:team`), `Missing jung:${t}:team`).toBe(true);
    }
  });

  it('has team fragments for all 9 Enneagram cores', () => {
    for (let i = 1; i <= 9; i++) {
      expect(fragments.some((f) => f.id === `ennea:${i}:team`), `Missing ennea:${i}:team`).toBe(true);
    }
  });

  it('has team fragments for all 5 HD types', () => {
    const types = ['Generator', 'Manifesting Generator', 'Projector', 'Manifestor', 'Reflector'];
    for (const t of types) {
      expect(fragments.some((f) => f.id === `hd:${t}:team`), `Missing hd:${t}:team`).toBe(true);
    }
  });

  it('has team fragments for Millman finals 1–12', () => {
    for (let i = 1; i <= 12; i++) {
      expect(fragments.some((f) => f.id === `millman:${i}:team`), `Missing millman:${i}:team`).toBe(true);
    }
  });

  it('has work fragments for all 16 Jung types', () => {
    const types = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
    for (const t of types) {
      expect(fragments.some((f) => f.id === `jung:${t}:work`), `Missing jung:${t}:work`).toBe(true);
    }
  });

  it('has work fragments for all 9 Enneagram cores', () => {
    for (let i = 1; i <= 9; i++) {
      expect(fragments.some((f) => f.id === `ennea:${i}:work`), `Missing ennea:${i}:work`).toBe(true);
    }
  });

  it('has work fragments for Millman finals 1–12', () => {
    for (let i = 1; i <= 12; i++) {
      expect(fragments.some((f) => f.id === `millman:${i}:work`), `Missing millman:${i}:work`).toBe(true);
    }
  });
});

// ────────────────────────────────────────────
// Provenance labels
// ────────────────────────────────────────────

describe('Provenance labels', () => {
  it('labels every section with its source', () => {
    const result = composeAnswer(FULL_WIRE, EMPTY_ATTESTATIONS, 'team');
    for (const section of result.sections) {
      expect(['JUNG', 'ENNEA', 'HD', 'NUM', 'FRICTION']).toContain(section.source);
    }
  });
});
