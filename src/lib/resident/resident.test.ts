/**
 * Resident Oracle tests — Phases 2 & 3.
 *
 * Coverage:
 * - Loader hard-throws for free entitlement (defense in depth)
 * - Capability detection (mocked navigator)
 * - Grounding contract: denied traits excluded, determinism
 * - Zero-network proof (Phase 3 flagship): context pipeline has no fetch
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { detectResidentSupport } from './capability';
import { buildResidentContext, RESIDENT_SYSTEM_PROMPT } from './grounding';
import { loadResidentModel } from './loader';
import { RESIDENT_INSTALLED_KEY } from './config';
import type { Wire } from '@/lib/wire';
import type { TraitAttestation } from '@/lib/publish/traits';

// ────────────────────────────────────────────
// Fixtures (reused from Mirror/Canon tests)
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

// ────────────────────────────────────────────
// Loader entitlement guard
// ────────────────────────────────────────────

describe('Loader entitlement guard', () => {
  it('throws for free entitlement (defense in depth)', async () => {
    await expect(loadResidentModel('free')).rejects.toThrow(
      /Resident Oracle requires an Initiate or Council entitlement/,
    );
  });

  // Note: we cannot test actual model loading in jsdom (no WebGPU),
  // but the entitlement guard fires before any WebLLM code runs.
});

// ────────────────────────────────────────────
// Capability detection
// ────────────────────────────────────────────

describe('detectResidentSupport', () => {
  const originalNavigator = globalThis.navigator;

  afterEach(() => {
    // Restore
    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it('returns "none" when navigator.gpu is absent', () => {
    // jsdom has no gpu by default
    expect(detectResidentSupport()).toBe('none');
  });

  it('returns "webgpu" when navigator.gpu exists and deviceMemory >= 4', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: { ...originalNavigator, gpu: {}, deviceMemory: 8 },
      writable: true,
      configurable: true,
    });
    expect(detectResidentSupport()).toBe('webgpu');
  });

  it('returns "webgpu" when deviceMemory is undefined (Safari heuristic)', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: { ...originalNavigator, gpu: {}, deviceMemory: undefined },
      writable: true,
      configurable: true,
    });
    expect(detectResidentSupport()).toBe('webgpu');
  });

  it('returns "none" when deviceMemory < 4', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: { ...originalNavigator, gpu: {}, deviceMemory: 2 },
      writable: true,
      configurable: true,
    });
    expect(detectResidentSupport()).toBe('none');
  });
});

// ────────────────────────────────────────────
// Grounding contract
// ────────────────────────────────────────────

describe('Grounding bridge', () => {
  it('routes a team question to the team domain', () => {
    const ctx = buildResidentContext(FULL_WIRE, EMPTY_ATTESTATIONS, 'How do I work best in a team?');
    expect(ctx.composed.domain).toBe('team');
  });

  it('falls back to purpose for unrecognized questions', () => {
    const ctx = buildResidentContext(FULL_WIRE, EMPTY_ATTESTATIONS, 'What is 2+2?');
    expect(ctx.composed.domain).toBe('purpose');
  });

  it('includes the resident system prompt', () => {
    const ctx = buildResidentContext(FULL_WIRE, EMPTY_ATTESTATIONS, 'Tell me about my path');
    expect(ctx.system).toContain(RESIDENT_SYSTEM_PROMPT);
  });

  it('includes CANON EXCERPTS header with domain label', () => {
    const ctx = buildResidentContext(FULL_WIRE, EMPTY_ATTESTATIONS, 'What drains my energy?');
    expect(ctx.system).toContain('CANON EXCERPTS (domain: energy)');
  });

  it('labels sections with provenance', () => {
    const ctx = buildResidentContext(FULL_WIRE, EMPTY_ATTESTATIONS, 'How should I work?');
    // Should contain at least one labeled section
    expect(ctx.canonContext).toMatch(/\[(JUNG|ENNEA|HD|NUM)\]/);
  });

  // ─── Denied trait exclusion ───

  it('excludes denied-trait fragments from canonContext (hostile attestations)', () => {
    const ctx = buildResidentContext(FULL_WIRE, HOSTILE_ATTESTATIONS, 'How do I work best in a team?');
    // With all jung traits denied, JUNG section should not appear
    expect(ctx.canonContext).not.toMatch(/\[JUNG\]/);
    // But ENNEA, HD, NUM should remain
    expect(ctx.canonContext).toMatch(/\[ENNEA\]/);
    expect(ctx.canonContext).toMatch(/\[HD\]/);
    expect(ctx.canonContext).toMatch(/\[NUM\]/);
  });

  it('denied-trait fragment text never appears in the system prompt', () => {
    const ctx = buildResidentContext(FULL_WIRE, HOSTILE_ATTESTATIONS, 'How do I work best in a team?');
    // The INTJ team fragment starts with "You contribute to a team the way an architect"
    expect(ctx.system).not.toContain('the way an architect');
  });

  // ─── Determinism ───

  it('produces byte-identical canonContext for identical inputs', () => {
    const a = buildResidentContext(FULL_WIRE, EMPTY_ATTESTATIONS, 'How do I work best in a team?');
    const b = buildResidentContext(FULL_WIRE, EMPTY_ATTESTATIONS, 'How do I work best in a team?');
    expect(a.canonContext).toBe(b.canonContext);
    expect(a.system).toBe(b.system);
  });

  it('produces byte-identical canonContext across 100 runs', () => {
    const baseline = buildResidentContext(FULL_WIRE, EMPTY_ATTESTATIONS, 'Where is my purpose?');
    for (let i = 0; i < 100; i++) {
      const run = buildResidentContext(FULL_WIRE, EMPTY_ATTESTATIONS, 'Where is my purpose?');
      expect(run.canonContext).toBe(baseline.canonContext);
    }
  });
});

// ────────────────────────────────────────────
// Zero-network proof (Phase 3 flagship)
// ────────────────────────────────────────────

describe('Zero-network proof', () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchSpy = vi.fn(() => { throw new Error('NETWORK CALL DETECTED — zero-network contract violated'); });
    vi.stubGlobal('fetch', fetchSpy);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('buildResidentContext succeeds with fetch stubbed to throw', () => {
    // This is the flagship: the entire context-building pipeline
    // must complete with zero network calls.
    const ctx = buildResidentContext(FULL_WIRE, EMPTY_ATTESTATIONS, 'How do I work best in a team?');
    expect(ctx.canonContext.length).toBeGreaterThan(0);
    expect(ctx.system.length).toBeGreaterThan(0);
    expect(ctx.composed.sections.length).toBeGreaterThan(0);

    // Assert that fetch was never called
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('deterministic context is fully offline across all domains', () => {
    const domains = ['team', 'work', 'purpose', 'relationships', 'conflict', 'energy', 'happiness', 'growth'];
    const questions: Record<string, string> = {
      team: 'How do I work in a team?',
      work: 'What career fits me?',
      purpose: 'What is my purpose?',
      relationships: 'How do I love?',
      conflict: 'How do I handle conflict?',
      energy: 'What drains me?',
      happiness: 'What makes me happy?',
      growth: 'How do I grow?',
    };

    for (const domain of domains) {
      const ctx = buildResidentContext(FULL_WIRE, EMPTY_ATTESTATIONS, questions[domain]);
      expect(ctx.composed.domain).toBe(domain);
      expect(ctx.canonContext.length).toBeGreaterThan(0);
    }

    // fetch was never called across all domain queries
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

// ────────────────────────────────────────────
// Install flag
// ────────────────────────────────────────────

describe('Install flag', () => {
  beforeEach(() => {
    localStorage.removeItem(RESIDENT_INSTALLED_KEY);
  });

  it('isResidentInstalled returns false when flag is not set', async () => {
    const { isResidentInstalled } = await import('./loader');
    expect(isResidentInstalled()).toBe(false);
  });

  it('isResidentInstalled returns true when flag is set', async () => {
    localStorage.setItem(RESIDENT_INSTALLED_KEY, 'true');
    const { isResidentInstalled } = await import('./loader');
    expect(isResidentInstalled()).toBe(true);
  });

  it('removeResidentModel clears the install flag', async () => {
    localStorage.setItem(RESIDENT_INSTALLED_KEY, 'true');
    const { removeResidentModel, isResidentInstalled } = await import('./loader');
    await removeResidentModel();
    expect(isResidentInstalled()).toBe(false);
  });
});
