import { describe, it, expect } from 'vitest';
import {
  buildWireTags,
  buildAttestationTags,
  buildWireDeletionTags,
  buildAttestationDeletionTags,
  buildEncryptedRawTags,
  WIRE_KIND,
  ATTESTATION_KIND,
  ENCRYPTED_RAW_KIND,
} from './wireEvent';
import type { Wire } from '@/lib/wire';

const PUBKEY = 'e88a691e98d9987c964521dff60025f60700378a4879180dcbbb4a5027850411';

const fullWire = {
  jung: { type: 'INTJ' },
  humanDesign: { type: 'Generator', profile: '3/5', authority: 'Sacral' },
  millman: { number: '29/11' },
  enneagram: { core: 8, wing: 7 },
} as unknown as Wire;

function tag(tags: string[][], name: string): string[] | undefined {
  return tags.find(([n]) => n === name);
}

describe('event kind constants (frozen schema)', () => {
  it('match the canonical Delphi spec', () => {
    expect(WIRE_KIND).toBe(31400);
    expect(ATTESTATION_KIND).toBe(31401);
    expect(ENCRYPTED_RAW_KIND).toBe(31402);
  });
});

describe('buildWireTags', () => {
  it('emits the full frozen tag structure', () => {
    const tags = buildWireTags(fullWire);
    expect(tag(tags, 'd')).toEqual(['d', 'wire']);
    expect(tag(tags, 'jung')).toEqual(['jung', 'INTJ']);
    expect(tag(tags, 'hd_type')).toEqual(['hd_type', 'Generator']);
    expect(tag(tags, 'hd_profile')).toEqual(['hd_profile', '3/5']);
    expect(tag(tags, 'hd_authority')).toEqual(['hd_authority', 'Sacral']);
    expect(tag(tags, 'millman')).toEqual(['millman', '29/11']);
    expect(tag(tags, 'enneagram')).toEqual(['enneagram', '8', '7']);
    expect(tag(tags, 'wire')?.[1]).toBe('INTJ · Generator 3/5 · Millman 29/11 · Enneagram 8w7');
    expect(tag(tags, 'client')).toEqual(['client', 'delphi']);
    expect(tag(tags, 'alt')?.[1]).toContain('Delphi Wire');
    expect(Number(tag(tags, 'published_at')?.[1])).toBeGreaterThan(1_700_000_000);
  });

  it('omits system tags for empty chambers (wire grows with completion)', () => {
    const tags = buildWireTags({ millman: { number: '4' } } as Wire);
    expect(tag(tags, 'millman')).toEqual(['millman', '4']);
    expect(tag(tags, 'jung')).toBeUndefined();
    expect(tag(tags, 'hd_type')).toBeUndefined();
    expect(tag(tags, 'enneagram')).toBeUndefined();
    expect(tag(tags, 'd')).toEqual(['d', 'wire']);
  });
});

describe('buildAttestationTags', () => {
  it('emits d, wire address, and one trait tag per attestation', () => {
    const tags = buildAttestationTags(PUBKEY, {
      a: { traitId: 'jung:Ni-dominant', verb: 'confirm', weight: 0.9 },
      b: { traitId: 'enneagram:8:conflict-seeking', verb: 'deny', weight: 0 },
    });
    expect(tag(tags, 'd')).toEqual(['d', 'self-attestations']);
    expect(tag(tags, 'a')).toEqual(['a', `31400:${PUBKEY}:wire`]);
    const traits = tags.filter(([n]) => n === 'trait');
    expect(traits).toContainEqual(['trait', 'jung:Ni-dominant', 'confirm', '0.9']);
    expect(traits).toContainEqual(['trait', 'enneagram:8:conflict-seeking', 'deny', '0.0']);
  });
});

describe('deletion builders (NIP-09)', () => {
  it('address the correct replaceable coordinates', () => {
    expect(buildWireDeletionTags(PUBKEY)).toEqual([
      ['a', `31400:${PUBKEY}:wire`],
      ['k', '31400'],
    ]);
    expect(buildAttestationDeletionTags(PUBKEY)).toEqual([
      ['a', `31401:${PUBKEY}:self-attestations`],
      ['k', '31401'],
    ]);
  });
});

describe('buildEncryptedRawTags', () => {
  it('namespaces each test backup under raw:<slug>', () => {
    const tags = buildEncryptedRawTags('jung');
    expect(tag(tags, 'd')).toEqual(['d', 'raw:jung']);
    expect(tag(tags, 'client')).toEqual(['client', 'delphi']);
  });
});
