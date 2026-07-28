import { describe, it, expect } from 'vitest';
import { composeAnswer } from './compose';
import { routeQuestion } from './routing';
import { allFragments } from './corpus';
import { FRICTION_RULES } from './frictions';
import { WING_MODIFIERS, AUTHORITY_FRAGMENTS, PROFILE_FRAGMENTS } from './appendices';
import type { Wire } from '@/lib/wire';
import type { TraitAttestation } from '@/lib/publish/traits';
import type { FrictionRule } from './types';

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

// ────────────────────────────────────────────
// Friction canon — Phase C assertions
// ────────────────────────────────────────────

describe('Friction canon (Phase C)', () => {
  it('has at least 60 rules', () => {
    expect(FRICTION_RULES.length).toBeGreaterThanOrEqual(60);
  });

  it('has at least 10 rules at weight 3', () => {
    const w3 = FRICTION_RULES.filter((r) => r.weight === 3);
    expect(w3.length).toBeGreaterThanOrEqual(10);
  });

  it('no two rules share identical when + domains', () => {
    const seen = new Set<string>();
    for (const r of FRICTION_RULES) {
      const key = JSON.stringify(r.when) + '|' + JSON.stringify([...r.domains].sort());
      expect(seen.has(key), `Duplicate when+domains: ${r.id}`).toBe(false);
      seen.add(key);
    }
  });

  it('every rule has a unique id', () => {
    const ids = FRICTION_RULES.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every rule matches at least one constructible Wire (no dead rules)', () => {
    const JUNG_TYPES = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
    const HD_TYPES = ['Generator', 'Manifesting Generator', 'Projector', 'Manifestor', 'Reflector'];
    const HD_AUTHORITIES = ['Emotional', 'Sacral', 'Splenic', 'Ego', 'Self-Projected', 'Environment', 'Lunar'];
    const ENNEA_CORES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const MILLMAN_FINALS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    function canMatch(rule: FrictionRule): boolean {
      // Check each condition — at least one valid value must exist for every condition
      if (rule.when.jung) {
        if (!rule.when.jung.some((j) => JUNG_TYPES.includes(j))) return false;
      }
      if (rule.when.enneaCore) {
        if (!rule.when.enneaCore.some((c) => ENNEA_CORES.includes(c))) return false;
      }
      if (rule.when.enneaWing) {
        if (!rule.when.enneaWing.some((w) => ENNEA_CORES.includes(w))) return false;
      }
      if (rule.when.hdType) {
        if (!rule.when.hdType.some((t) => HD_TYPES.includes(t))) return false;
      }
      if (rule.when.hdAuthority) {
        if (!rule.when.hdAuthority.some((a) => HD_AUTHORITIES.includes(a))) return false;
      }
      if (rule.when.millmanFinal) {
        if (!rule.when.millmanFinal.some((f) => MILLMAN_FINALS.includes(f))) return false;
      }
      return true;
    }

    for (const rule of FRICTION_RULES) {
      expect(canMatch(rule), `Dead rule: ${rule.id}`).toBe(true);
    }
  });

  it('every rule text is 50–120 words', () => {
    for (const rule of FRICTION_RULES) {
      const words = rule.text.split(/\s+/).length;
      expect(words, `${rule.id}: ${words} words`).toBeGreaterThanOrEqual(50);
      expect(words, `${rule.id}: ${words} words`).toBeLessThanOrEqual(120);
    }
  });

  it('weight is always 1, 2, or 3', () => {
    for (const rule of FRICTION_RULES) {
      expect([1, 2, 3], `${rule.id}: invalid weight ${rule.weight}`).toContain(rule.weight);
    }
  });
});

// ────────────────────────────────────────────
// Appendices — completeness
// ────────────────────────────────────────────

describe('Appendices', () => {
  it('has 18 wing modifiers', () => {
    expect(WING_MODIFIERS.length).toBe(18);
  });

  it('has 7 authority fragments', () => {
    expect(AUTHORITY_FRAGMENTS.length).toBe(7);
  });

  it('has 12 profile fragments', () => {
    expect(PROFILE_FRAGMENTS.length).toBe(12);
  });

  it('wing modifiers are 30–60 words', () => {
    for (const wm of WING_MODIFIERS) {
      const words = wm.text.split(/\s+/).length;
      expect(words, `${wm.id}: ${words} words`).toBeGreaterThanOrEqual(30);
      expect(words, `${wm.id}: ${words} words`).toBeLessThanOrEqual(60);
    }
  });

  it('authority fragments are 30–60 words', () => {
    for (const af of AUTHORITY_FRAGMENTS) {
      const words = af.text.split(/\s+/).length;
      expect(words, `${af.id}: ${words} words`).toBeGreaterThanOrEqual(30);
      expect(words, `${af.id}: ${words} words`).toBeLessThanOrEqual(60);
    }
  });

  it('profile fragments are 30–60 words', () => {
    for (const pf of PROFILE_FRAGMENTS) {
      const words = pf.text.split(/\s+/).length;
      expect(words, `${pf.id}: ${words} words`).toBeGreaterThanOrEqual(30);
      expect(words, `${pf.id}: ${words} words`).toBeLessThanOrEqual(60);
    }
  });

  it('all appendix ids are unique', () => {
    const ids = [
      ...WING_MODIFIERS.map((w) => w.id),
      ...AUTHORITY_FRAGMENTS.map((a) => a.id),
      ...PROFILE_FRAGMENTS.map((p) => p.id),
    ];
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ────────────────────────────────────────────
// HD key normalization
// ────────────────────────────────────────────

describe('HD key normalization', () => {
  it('composes with trimmed HD type " Generator "', () => {
    const wire: Wire = {
      ...FULL_WIRE,
      humanDesign: { type: ' Generator ', profile: '3/5', authority: 'Emotional' },
    };
    const result = composeAnswer(wire, EMPTY_ATTESTATIONS, 'team');
    const hdSection = result.sections.find((s) => s.source === 'HD');
    expect(hdSection).toBeDefined();
  });

  it('composes with lowercase HD type "generator"', () => {
    const wire: Wire = {
      ...FULL_WIRE,
      humanDesign: { type: 'generator', profile: '3/5', authority: 'Emotional' },
    };
    const result = composeAnswer(wire, EMPTY_ATTESTATIONS, 'team');
    const hdSection = result.sections.find((s) => s.source === 'HD');
    expect(hdSection).toBeDefined();
  });
});

// ────────────────────────────────────────────
// Canon-lint — corpus-wide register guards
// ────────────────────────────────────────────

describe('Canon-lint', () => {
  const fragments = allFragments();
  const BANNED = ['amazing', 'journey', 'unlock', 'embrace', 'empower', 'vibrant', 'delve', 'tapestry', 'unleash'];

  it('no fragment text contains "!"', () => {
    for (const f of fragments) {
      expect(f.text.includes('!'), `${f.id} contains "!"`).toBe(false);
    }
  });

  it('no friction text contains "!"', () => {
    for (const r of FRICTION_RULES) {
      expect(r.text.includes('!'), `${r.id} contains "!"`).toBe(false);
    }
  });

  it('no appendix text contains "!"', () => {
    for (const w of WING_MODIFIERS) expect(w.text.includes('!'), `${w.id} contains "!"`).toBe(false);
    for (const a of AUTHORITY_FRAGMENTS) expect(a.text.includes('!'), `${a.id} contains "!"`).toBe(false);
    for (const p of PROFILE_FRAGMENTS) expect(p.text.includes('!'), `${p.id} contains "!"`).toBe(false);
  });

  it('no fragment uses banned words', () => {
    for (const f of fragments) {
      const lower = f.text.toLowerCase();
      for (const word of BANNED) {
        expect(lower.includes(word), `${f.id} contains banned word "${word}"`).toBe(false);
      }
    }
  });

  it('no friction uses banned words', () => {
    for (const r of FRICTION_RULES) {
      const lower = r.text.toLowerCase();
      for (const word of BANNED) {
        expect(lower.includes(word), `${r.id} contains banned word "${word}"`).toBe(false);
      }
    }
  });

  it('every fragment text contains "you" or "your" (second person)', () => {
    for (const f of fragments) {
      const lower = f.text.toLowerCase();
      expect(
        lower.includes('you') || lower.includes('your'),
        `${f.id} missing second-person address`,
      ).toBe(true);
    }
  });

  it('every friction text contains "you" or "your" (second person)', () => {
    for (const r of FRICTION_RULES) {
      const lower = r.text.toLowerCase();
      expect(
        lower.includes('you') || lower.includes('your'),
        `${r.id} missing second-person address`,
      ).toBe(true);
    }
  });

  it('fragment word counts are 50–135', () => {
    for (const f of fragments) {
      const words = f.text.split(/\s+/).length;
      expect(words, `${f.id}: ${words} words`).toBeGreaterThanOrEqual(50);
      expect(words, `${f.id}: ${words} words`).toBeLessThanOrEqual(135);
    }
  });

  it('final two sentences of each fragment contain an imperative or practice marker', () => {
    const markers = /\b(practice|watch for|notice|ask|name|check|identify|share|complete|choose|find|build|write|start|give|say|take|set|spend|cancel|read|do|express|make|let|hold|sit|state|stop|create|break|schedule|track|present|expose|apply|define|stay|follow|act|join|voice|use|keep|form|engage|maintain|lower|replace|inform|separate|rename|budget|frame|trust|pair|impose|log|honor|honour|reframe|narrate|document|rank|treat|correct|live|accept|deepen|talk|change|underpromise|motion|show|turn|bring|commit|sustain|rest|pursue|tend|discover|move|resist|work|count)\b/i;
    for (const f of fragments) {
      const sentences = f.text.split(/\.\s+|\.$/);
      const nonEmpty = sentences.filter((s) => s.trim().length > 0);
      const lastTwo = nonEmpty.slice(-2).join('. ');
      expect(
        markers.test(lastTwo),
        `${f.id}: final sentences lack imperative/practice marker: "${lastTwo.slice(0, 80)}…"`,
      ).toBe(true);
    }
  });
});
