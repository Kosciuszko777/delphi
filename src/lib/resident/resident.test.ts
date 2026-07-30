/**
 * Resident Oracle tests — Phases 2, 3 (WebGPU) & WP-9 (CPU fallback).
 *
 * Coverage:
 * - Loader hard-throws for free entitlement (defense in depth)
 * - Loader throws for 'none' runtime
 * - Capability detection: webgpu / wllama / none (mocked navigator + WASM)
 * - Grounding contract: denied traits excluded, determinism
 * - Zero-network proof (flagship): context pipeline has no fetch
 * - Install-flag + runtime tracking lifecycle
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { detectResidentSupport, hasWasmSimd } from './capability';
import { buildResidentContext, RESIDENT_SYSTEM_PROMPT } from './grounding';
import { loadResidentModel } from './loader';
import { RESIDENT_INSTALLED_KEY, RESIDENT_RUNTIME_KEY } from './config';
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
// Loader entitlement + runtime guards
// ────────────────────────────────────────────

describe('Loader guards', () => {
  it('throws for free entitlement, regardless of runtime (defense in depth)', async () => {
    await expect(loadResidentModel('free', 'webgpu')).rejects.toThrow(
      /Resident Oracle requires an Initiate or Council entitlement/,
    );
    await expect(loadResidentModel('free', 'wllama')).rejects.toThrow(
      /Resident Oracle requires an Initiate or Council entitlement/,
    );
  });

  it('throws for the "none" runtime even when entitled', async () => {
    await expect(loadResidentModel('initiate', 'none')).rejects.toThrow(
      /no on-device runtime/i,
    );
  });

  // Note: we cannot test actual model loading in jsdom (no WebGPU / no
  // real WASM model), but the guards fire before any engine code runs.
});

// ────────────────────────────────────────────
// Capability detection
// ────────────────────────────────────────────

describe('detectResidentSupport', () => {
  const originalNavigator = globalThis.navigator;

  function setNavigator(props: Record<string, unknown>) {
    Object.defineProperty(globalThis, 'navigator', {
      value: { ...originalNavigator, ...props },
      writable: true,
      configurable: true,
    });
  }

  afterEach(() => {
    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  it('returns "webgpu" when navigator.gpu exists and deviceMemory >= 4', () => {
    setNavigator({ gpu: {}, deviceMemory: 8 });
    expect(detectResidentSupport()).toBe('webgpu');
  });

  it('returns "webgpu" when deviceMemory is undefined (Safari heuristic)', () => {
    setNavigator({ gpu: {}, deviceMemory: undefined });
    expect(detectResidentSupport()).toBe('webgpu');
  });

  it('returns "wllama" when no WebGPU but WASM SIMD is available and memory >= 2', () => {
    // No gpu; force SIMD available
    setNavigator({ deviceMemory: 4 });
    delete (globalThis.navigator as unknown as { gpu?: unknown }).gpu;
    vi.spyOn(WebAssembly, 'validate').mockReturnValue(true);
    expect(detectResidentSupport()).toBe('wllama');
  });

  it('falls back to "wllama" when WebGPU present but memory too low, if CPU viable', () => {
    // gpu present but only 2 GB → WebGPU rejected; CPU (>=2) still viable
    setNavigator({ gpu: {}, deviceMemory: 2 });
    vi.spyOn(WebAssembly, 'validate').mockReturnValue(true);
    expect(detectResidentSupport()).toBe('wllama');
  });

  it('returns "none" when no WebGPU and no WASM SIMD', () => {
    setNavigator({ deviceMemory: 8 });
    delete (globalThis.navigator as unknown as { gpu?: unknown }).gpu;
    vi.spyOn(WebAssembly, 'validate').mockReturnValue(false);
    expect(detectResidentSupport()).toBe('none');
  });

  it('returns "none" when device memory is below even the CPU floor', () => {
    setNavigator({ deviceMemory: 1 });
    delete (globalThis.navigator as unknown as { gpu?: unknown }).gpu;
    vi.spyOn(WebAssembly, 'validate').mockReturnValue(true);
    expect(detectResidentSupport()).toBe('none');
  });
});

describe('hasWasmSimd', () => {
  it('returns a boolean without throwing', () => {
    expect(typeof hasWasmSimd()).toBe('boolean');
  });
});

// ────────────────────────────────────────────
// Grounding contract (runtime-agnostic — same for CPU & GPU)
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
    expect(ctx.canonContext).toMatch(/\[(JUNG|ENNEA|HD|NUM)\]/);
  });

  // ─── Denied trait exclusion ───

  it('excludes denied-trait fragments from canonContext (hostile attestations)', () => {
    const ctx = buildResidentContext(FULL_WIRE, HOSTILE_ATTESTATIONS, 'How do I work best in a team?');
    expect(ctx.canonContext).not.toMatch(/\[JUNG\]/);
    expect(ctx.canonContext).toMatch(/\[ENNEA\]/);
    expect(ctx.canonContext).toMatch(/\[HD\]/);
    expect(ctx.canonContext).toMatch(/\[NUM\]/);
  });

  it('denied-trait fragment text never appears in the system prompt', () => {
    const ctx = buildResidentContext(FULL_WIRE, HOSTILE_ATTESTATIONS, 'How do I work best in a team?');
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
// Zero-network proof (flagship — applies to both runtimes)
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
    const ctx = buildResidentContext(FULL_WIRE, EMPTY_ATTESTATIONS, 'How do I work best in a team?');
    expect(ctx.canonContext.length).toBeGreaterThan(0);
    expect(ctx.system.length).toBeGreaterThan(0);
    expect(ctx.composed.sections.length).toBeGreaterThan(0);
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

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

// ────────────────────────────────────────────
// Install flag + runtime tracking
// ────────────────────────────────────────────

describe('Install flag + runtime tracking', () => {
  beforeEach(() => {
    localStorage.removeItem(RESIDENT_INSTALLED_KEY);
    localStorage.removeItem(RESIDENT_RUNTIME_KEY);
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

  it('installedRuntime reflects the recorded runtime', async () => {
    const { installedRuntime } = await import('./loader');
    expect(installedRuntime()).toBeNull();

    localStorage.setItem(RESIDENT_INSTALLED_KEY, 'true');
    localStorage.setItem(RESIDENT_RUNTIME_KEY, 'wllama');
    expect(installedRuntime()).toBe('wllama');

    localStorage.setItem(RESIDENT_RUNTIME_KEY, 'webgpu');
    expect(installedRuntime()).toBe('webgpu');
  });

  it('installedRuntime treats a legacy install (no runtime key) as webgpu', async () => {
    const { installedRuntime } = await import('./loader');
    localStorage.setItem(RESIDENT_INSTALLED_KEY, 'true');
    // no RESIDENT_RUNTIME_KEY set
    expect(installedRuntime()).toBe('webgpu');
  });

  it('removeResidentModel clears both the install flag and the runtime key', async () => {
    localStorage.setItem(RESIDENT_INSTALLED_KEY, 'true');
    localStorage.setItem(RESIDENT_RUNTIME_KEY, 'wllama');
    const { removeResidentModel, isResidentInstalled, installedRuntime } = await import('./loader');
    await removeResidentModel();
    expect(isResidentInstalled()).toBe(false);
    expect(installedRuntime()).toBeNull();
  });
});
