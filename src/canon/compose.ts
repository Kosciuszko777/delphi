/**
 * Canon composition engine — deterministic, offline, no AI.
 *
 * composeAnswer(wire, selfAttestations, domain) → ComposedAnswer
 *
 * Determinism is an acceptance criterion: identical inputs → byte-identical output.
 */

import type { Wire } from '@/lib/wire';
import type { TraitAttestation } from '@/lib/publish/traits';
import type { Domain, ComposedAnswer, ComposedSection, FrictionRule, CanonFragment } from './types';
import { getFragment } from './corpus';
import { FRICTION_RULES } from './frictions';
import { getFinalDigit } from '@/lib/millman';

// ────────────────────────────────────────────
// Deterministic hash (djb2) for template rotation
// ────────────────────────────────────────────

function djb2(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// ────────────────────────────────────────────
// Connective templates — house register, 12 phrases
// ────────────────────────────────────────────

const CONNECTIVES: string[] = [
  'From another angle:',
  'Your numerology adds a further dimension:',
  'Seen through a different lens:',
  'Your design contributes another layer:',
  'Looking at the same question through your core pattern:',
  'A complementary read from another system:',
  'This is also shaped by:',
  'Another chamber of your Wire speaks to this:',
  'Your type configuration adds:',
  'The next layer of the reading:',
  'There is more to this picture:',
  'Your pattern also says:',
];

function pickConnective(seed: number, index: number): string {
  return CONNECTIVES[(seed + index) % CONNECTIVES.length];
}

// ────────────────────────────────────────────
// Attestation contract
// ────────────────────────────────────────────

interface AttestationCheck {
  excluded: boolean;
  weight: number; // 0.0–1.0, default 0.5 (unattested)
}

/**
 * Check whether a fragment should be included based on self-attestations.
 * A fragment is excluded if the user DENIED any of its traitIds.
 * Returns a weight (average of matched attestation weights, or 0.5 if unattested).
 */
function checkAttestation(
  fragment: CanonFragment,
  attestations: Record<string, TraitAttestation>,
): AttestationCheck {
  if (!fragment.traitIds || fragment.traitIds.length === 0) {
    return { excluded: false, weight: 0.5 };
  }

  let weightSum = 0;
  let weightCount = 0;

  for (const tid of fragment.traitIds) {
    const att = attestations[tid];
    if (att) {
      if (att.verb === 'deny') {
        return { excluded: true, weight: 0 };
      }
      weightSum += att.weight;
      weightCount++;
    }
  }

  const avgWeight = weightCount > 0 ? weightSum / weightCount : 0.5;
  return { excluded: false, weight: avgWeight };
}

// ────────────────────────────────────────────
// Friction matching
// ────────────────────────────────────────────

function matchesFriction(rule: FrictionRule, wire: Wire): boolean {
  if (rule.when.jung) {
    if (!wire.jung || !rule.when.jung.includes(wire.jung.type)) return false;
  }
  if (rule.when.enneaCore) {
    if (!wire.enneagram || !rule.when.enneaCore.includes(wire.enneagram.core)) return false;
  }
  if (rule.when.enneaWing) {
    if (!wire.enneagram || !rule.when.enneaWing.includes(wire.enneagram.wing)) return false;
  }
  if (rule.when.hdType) {
    if (!wire.humanDesign) return false;
    const normalized = normalizeHDType(wire.humanDesign.type);
    if (!normalized || !rule.when.hdType.includes(normalized)) return false;
  }
  if (rule.when.hdAuthority) {
    if (!wire.humanDesign || !rule.when.hdAuthority.includes(wire.humanDesign.authority)) return false;
  }
  if (rule.when.millmanFinal) {
    if (!wire.millman) return false;
    const final = getFinalDigit(wire.millman.number);
    if (!rule.when.millmanFinal.includes(final)) return false;
  }
  return true;
}

function getMatchingFrictions(wire: Wire, domain: Domain): FrictionRule[] {
  return FRICTION_RULES
    .filter((r) => r.domains.includes(domain) && matchesFriction(r, wire))
    .sort((a, b) => b.weight - a.weight); // highest weight first
}

// ────────────────────────────────────────────
// HD key normalization
// ────────────────────────────────────────────

const HD_CANONICAL_TYPES = [
  'Generator', 'Manifesting Generator', 'Projector', 'Manifestor', 'Reflector',
] as const;

/**
 * Normalize an HD type string: exact-match first, then trim + case-insensitive fallback.
 * Returns the canonical form or undefined if no match.
 */
export function normalizeHDType(raw: string): string | undefined {
  // Exact match
  if (HD_CANONICAL_TYPES.includes(raw as typeof HD_CANONICAL_TYPES[number])) return raw;
  // Trim + case-insensitive fallback
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase();
  return HD_CANONICAL_TYPES.find((t) => t.toLowerCase() === lower);
}

// ────────────────────────────────────────────
// Extract Wire keys for fragment lookup
// ────────────────────────────────────────────

interface WireKeys {
  jung?: string;       // "INTJ"
  ennea?: string;      // "8"
  hd?: string;         // "Projector"
  millman?: string;    // "11"
}

function extractKeys(wire: Wire): WireKeys {
  const keys: WireKeys = {};
  if (wire.jung) keys.jung = wire.jung.type;
  if (wire.enneagram) keys.ennea = String(wire.enneagram.core);
  if (wire.humanDesign) keys.hd = normalizeHDType(wire.humanDesign.type);
  if (wire.millman) keys.millman = String(getFinalDigit(wire.millman.number));
  return keys;
}

// ────────────────────────────────────────────
// The composition function
// ────────────────────────────────────────────

const SOURCE_MAP: Record<string, ComposedSection['source']> = {
  jung: 'JUNG',
  ennea: 'ENNEA',
  hd: 'HD',
  millman: 'NUM',
};

interface ScoredFragment {
  fragment: CanonFragment;
  source: ComposedSection['source'];
  weight: number;
}

export function composeAnswer(
  wire: Wire,
  selfAttestations: Record<string, TraitAttestation>,
  domain: Domain,
): ComposedAnswer {
  const keys = extractKeys(wire);

  // 1. Select fragments for each filled chamber
  const scored: ScoredFragment[] = [];

  const systemKeys: Array<{ system: CanonFragment['system']; key: string | undefined }> = [
    { system: 'jung', key: keys.jung },
    { system: 'ennea', key: keys.ennea },
    { system: 'hd', key: keys.hd },
    { system: 'millman', key: keys.millman },
  ];

  for (const { system, key } of systemKeys) {
    if (!key) continue;
    const frag = getFragment(system, key, domain);
    if (!frag) continue;

    const check = checkAttestation(frag, selfAttestations);
    if (check.excluded) continue;

    scored.push({
      fragment: frag,
      source: SOURCE_MAP[system],
      weight: check.weight,
    });
  }

  // 2. Sort: confirmed (weight ≥ 0.7) first, denied-adjacent (≤ 0.3) last
  scored.sort((a, b) => b.weight - a.weight);

  // 3. Frictions
  const allFrictions = getMatchingFrictions(wire, domain);
  const frictions = allFrictions.slice(0, 2); // max 2

  // 4. Assemble with connective templates
  // Seed is deterministic: hash of wire keys + domain
  const seedStr = JSON.stringify(keys) + ':' + domain;
  const seed = djb2(seedStr);

  const sections: ComposedSection[] = [];
  let composedParts: string[] = [];

  scored.forEach((s, i) => {
    if (i > 0) {
      const conn = pickConnective(seed, i);
      composedParts.push(conn);
    }
    sections.push({ source: s.source, text: s.fragment.text });
    composedParts.push(s.fragment.text);
  });

  // 5. Append frictions
  for (const fr of frictions) {
    sections.push({ source: 'FRICTION', text: fr.text });
    composedParts.push(fr.text);
  }

  return {
    domain,
    sections,
    frictions,
    composedText: composedParts.join('\n\n'),
  };
}
