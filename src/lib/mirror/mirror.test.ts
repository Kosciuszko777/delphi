import { describe, it, expect } from 'vitest';
import { parseMirror } from './schema';
import { buildMirrorMessages } from './prompt';
import type { Wire } from '@/lib/wire';
import type { TraitAttestation } from '@/lib/publish/traits';

const fullWire = {
  jung: { type: 'INTJ', ei: 80, sn: 75, tf: 30, jp: 20 },
  humanDesign: { type: 'Generator', profile: '3/5', authority: 'Sacral' },
  millman: { number: '29/11' },
  enneagram: { core: 8, wing: 7 },
} as unknown as Wire;

const validReading = {
  purpose: 'A sentence long enough to pass the minimum length validation gate.',
  happiness: 'A sentence long enough to pass the minimum length validation gate.',
  work: 'A sentence long enough to pass the minimum length validation gate.',
  relationships: 'A sentence long enough to pass the minimum length validation gate.',
  team: 'A sentence long enough to pass the minimum length validation gate.',
  enjoys: 'A sentence long enough to pass the minimum length validation gate.',
  hates: 'A sentence long enough to pass the minimum length validation gate.',
  positiveTraits: ['one', 'two', 'three', 'four', 'five'],
  negativeTraits: ['one', 'two', 'three'],
  superpowers: ['one', 'two', 'three', 'four', 'five'],
  improvements: ['one', 'two', 'three', 'four', 'five'],
};

describe('parseMirror', () => {
  it('parses a clean JSON response', () => {
    const reading = parseMirror(JSON.stringify(validReading));
    expect(reading.positiveTraits).toHaveLength(5);
  });

  it('tolerates markdown fences and surrounding prose', () => {
    expect(() => parseMirror('```json\n' + JSON.stringify(validReading) + '\n```')).not.toThrow();
    expect(() =>
      parseMirror('Here is your reading:\n' + JSON.stringify(validReading) + '\nI hope it resonates.'),
    ).not.toThrow();
  });

  it('rejects wrong list lengths — the fives must be five', () => {
    const bad = { ...validReading, superpowers: ['only', 'four', 'items', 'here'] };
    expect(() => parseMirror(JSON.stringify(bad))).toThrow();
  });

  it('rejects responses with no JSON at all', () => {
    expect(() => parseMirror('I cannot produce that.')).toThrow();
  });
});

describe('buildMirrorMessages', () => {
  it('references all four chambers in the user message', () => {
    const [, user] = buildMirrorMessages(fullWire, {});
    const text = user.content as string;
    expect(text).toContain('INTJ');
    expect(text).toContain('Generator');
    expect(text).toContain('29/11');
    expect(text).toContain('core 8');
  });

  it('lists denied traits under exclusion, never as applicable', () => {
    const attestations: Record<string, TraitAttestation> = {
      a: { traitId: 'enneagram:8:conflict-seeking', verb: 'deny', weight: 0 },
      b: { traitId: 'jung:Ni-dominant', verb: 'confirm', weight: 0.9 },
    };
    const [, user] = buildMirrorMessages(fullWire, attestations);
    const text = user.content as string;
    const deniedIdx = text.indexOf('TRAITS THE PERSON HAS DENIED');
    expect(deniedIdx).toBeGreaterThan(-1);
    expect(text.indexOf('enneagram:8:conflict-seeking')).toBeGreaterThan(deniedIdx);
    // Confirmed trait sits in the weights section, before the denial block
    expect(text.indexOf('jung:Ni-dominant')).toBeLessThan(deniedIdx);
    expect(text).toContain('confirm (0.9)');
  });

  it('instructs second-person honest register and JSON-only output', () => {
    const [system] = buildMirrorMessages(fullWire, {});
    const text = system.content as string;
    expect(text).toContain('second person');
    expect(text).toContain('ONLY a JSON object');
    expect(text).toContain('name the friction');
  });
});
