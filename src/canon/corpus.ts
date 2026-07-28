/**
 * Central corpus registry — imports all fragment files and provides
 * lookup functions.
 */

import type { CanonFragment } from './types';
import { TEAM_FRAGMENTS } from './fragments-team';
import { WORK_FRAGMENTS } from './fragments-work';
import { PURPOSE_FRAGMENTS } from './fragments-purpose';
import { HAPPINESS_FRAGMENTS } from './fragments-happiness';
import { RELATIONSHIPS_FRAGMENTS } from './fragments-relationships';
import { CONFLICT_FRAGMENTS } from './fragments-conflict';
import { ENERGY_FRAGMENTS } from './fragments-energy';
import { GROWTH_FRAGMENTS } from './fragments-growth';

/** All fragments, combined. */
const ALL_FRAGMENTS: CanonFragment[] = [
  ...TEAM_FRAGMENTS,
  ...WORK_FRAGMENTS,
  ...PURPOSE_FRAGMENTS,
  ...HAPPINESS_FRAGMENTS,
  ...RELATIONSHIPS_FRAGMENTS,
  ...CONFLICT_FRAGMENTS,
  ...ENERGY_FRAGMENTS,
  ...GROWTH_FRAGMENTS,
];

/** Index: "system:key:domain" → fragment. */
const FRAGMENT_INDEX = new Map<string, CanonFragment>();
for (const f of ALL_FRAGMENTS) {
  FRAGMENT_INDEX.set(f.id, f);
}

/**
 * Look up a fragment by system, key, and domain.
 * Returns undefined if the cell is not yet in the corpus.
 */
export function getFragment(
  system: CanonFragment['system'],
  key: string,
  domain: CanonFragment['domain'],
): CanonFragment | undefined {
  return FRAGMENT_INDEX.get(`${system}:${key}:${domain}`);
}

/** Expose all fragments for testing / linting. */
export function allFragments(): readonly CanonFragment[] {
  return ALL_FRAGMENTS;
}
