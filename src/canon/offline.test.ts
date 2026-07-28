import { describe, it, expect, vi } from 'vitest';
import { composeAnswer } from './compose';
import { routeQuestion } from './routing';
import type { Wire } from '@/lib/wire';
import type { TraitAttestation } from '@/lib/publish/traits';

/**
 * Offline assertion — proves that the Canon composition engine has
 * zero network dependency. Both fetch and XMLHttpRequest throw; if
 * composeAnswer still succeeds, it is fully offline.
 */
describe('Canon offline guarantee', () => {
  const FULL_WIRE: Wire = {
    jung: { type: 'ENFP', ei: 30, sn: 40, tf: 35, jp: 28 },
    enneagram: { core: 7, wing: 8, scores: [2, 3, 4, 5, 3, 4, 8, 3, 2] },
    humanDesign: { type: 'Generator', profile: '3/5', authority: 'Sacral' },
    millman: { number: '32/5', birthDate: '1990-06-15' },
  };

  const ATTESTATIONS: Record<string, TraitAttestation> = {};

  it('composes a full answer with fetch mocked to throw', () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(() => { throw new Error('Network disabled'); });

    try {
      const result = composeAnswer(FULL_WIRE, ATTESTATIONS, 'work');
      expect(result.composedText.length).toBeGreaterThan(0);
      expect(result.sections.length).toBeGreaterThanOrEqual(1);
      expect(globalThis.fetch).not.toHaveBeenCalled();
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it('composes across all 8 domains with XMLHttpRequest mocked to throw', () => {
    const OrigXHR = globalThis.XMLHttpRequest;
    // @ts-expect-error — mock throws on construction
    globalThis.XMLHttpRequest = vi.fn(() => { throw new Error('Network disabled'); });

    try {
      const domains = ['purpose', 'happiness', 'work', 'team', 'relationships', 'conflict', 'energy', 'growth'] as const;
      for (const domain of domains) {
        const result = composeAnswer(FULL_WIRE, ATTESTATIONS, domain);
        expect(result.composedText.length, `Empty for ${domain}`).toBeGreaterThan(0);
      }
    } finally {
      globalThis.XMLHttpRequest = OrigXHR;
    }
  });

  it('routes questions without network', () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(() => { throw new Error('Network disabled'); });

    try {
      expect(routeQuestion('How do I handle conflict?')).toBe('conflict');
      expect(routeQuestion('What drains my energy?')).toBe('energy');
      expect(globalThis.fetch).not.toHaveBeenCalled();
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
