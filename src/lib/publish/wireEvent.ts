/**
 * Build a kind 31400 Wire event from local Wire data.
 * This is the canonical public psychometric profile.
 */

import type { Wire } from '@/lib/wire';
import { formatWire } from '@/lib/wire';

/** The Wire event kind — addressable, d-tag: "wire" */
export const WIRE_KIND = 31400;
/** The self-attestation event kind */
export const ATTESTATION_KIND = 31401;

/**
 * Build the tags array for a kind 31400 Wire event.
 */
export function buildWireTags(wire: Wire, referrerPubkey?: string | null): string[][] {
  const tags: string[][] = [
    ['d', 'wire'],
  ];

  if (wire.jung) {
    tags.push(['jung', wire.jung.type]);
  }

  if (wire.humanDesign) {
    tags.push(['hd_type', wire.humanDesign.type]);
    tags.push(['hd_profile', wire.humanDesign.profile]);
    tags.push(['hd_authority', wire.humanDesign.authority]);
  }

  if (wire.millman) {
    tags.push(['millman', wire.millman.number]);
  }

  if (wire.enneagram) {
    tags.push(['enneagram', wire.enneagram.core.toString(), wire.enneagram.wing.toString()]);
  }

  // The canonical wire string
  const wireStr = formatWire(wire);
  if (wireStr) {
    tags.push(['wire', wireStr]);
  }

  // Builders' Credit: the referrer who brought this person, publicly
  // verifiable on the Wire itself (shown in the consent preview).
  if (referrerPubkey) {
    tags.push(['ref', referrerPubkey]);
  }

  tags.push(['published_at', Math.floor(Date.now() / 1000).toString()]);
  tags.push(['alt', 'Delphi Wire: psychometric identity signature']);
  tags.push(['client', 'delphi']);

  return tags;
}

/**
 * Build a kind 5 deletion request for a Wire event.
 */
export function buildWireDeletionTags(pubkey: string): string[][] {
  return [
    ['a', `${WIRE_KIND}:${pubkey}:wire`],
    ['k', WIRE_KIND.toString()],
  ];
}

/**
 * Build a kind 5 deletion request for self-attestations.
 */
export function buildAttestationDeletionTags(pubkey: string): string[][] {
  return [
    ['a', `${ATTESTATION_KIND}:${pubkey}:self-attestations`],
    ['k', ATTESTATION_KIND.toString()],
  ];
}

/** The encrypted raw results event kind */
export const ENCRYPTED_RAW_KIND = 31402;

/**
 * Build the tags array for a kind 31401 Self-Attestation event.
 */
export function buildAttestationTags(
  pubkey: string,
  attestations: Record<string, { traitId: string; verb: string; weight: number }>,
): string[][] {
  const tags: string[][] = [
    ['d', 'self-attestations'],
    ['a', `${WIRE_KIND}:${pubkey}:wire`],
  ];

  for (const att of Object.values(attestations)) {
    tags.push(['trait', att.traitId, att.verb, att.weight.toFixed(1)]);
  }

  tags.push(['alt', 'Delphi self-attestation: trait weightings']);
  tags.push(['client', 'delphi']);

  return tags;
}

/**
 * Build the tags array for a kind 31402 Encrypted Raw Results event.
 */
export function buildEncryptedRawTags(testSlug: string): string[][] {
  return [
    ['d', `raw:${testSlug}`],
    ['alt', 'Delphi encrypted raw assessment data'],
    ['client', 'delphi'],
  ];
}
