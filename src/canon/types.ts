/**
 * Canon — the Delphi written corpus.
 *
 * Every type in this file is FROZEN per WP-6: changing a type signature
 * means every existing fragment, friction rule, and the composition
 * engine must be reviewed.
 */

export type Domain =
  | 'purpose' | 'happiness' | 'work' | 'team'
  | 'relationships' | 'conflict' | 'energy' | 'growth';

export const DOMAINS: readonly Domain[] = [
  'purpose', 'happiness', 'work', 'team',
  'relationships', 'conflict', 'energy', 'growth',
] as const;

export type System = 'jung' | 'ennea' | 'hd' | 'millman';

export interface CanonFragment {
  /** e.g. "jung:INTJ:team" | "ennea:8:conflict" | "hd:projector:energy" | "millman:11:purpose" */
  id: string;
  system: System;
  /** e.g. "INTJ" | "8" | "projector" | "11" */
  key: string;
  domain: Domain;
  /** 60–120 words, house register, second person. */
  text: string;
  /**
   * Self-attestation trait ids this fragment depends on.
   * If the user DENIED any of them, the fragment is excluded.
   */
  traitIds?: string[];
}

export interface FrictionRule {
  /** e.g. "fr:ennea8-projector" */
  id: string;
  /** ALL listed conditions must match the Wire. */
  when: Partial<{
    jung: string[];
    enneaCore: number[];
    enneaWing: number[];
    hdType: string[];
    hdAuthority: string[];
    millmanFinal: number[];
  }>;
  /** Domains where this friction is worth surfacing. */
  domains: Domain[];
  /** 50–100 words naming the tension AND what to do with it. */
  text: string;
  /** 1–3; higher = surfaced earlier. */
  weight: number;
}

export interface DomainRoute {
  domain: Domain;
  /** Lowercase stems, EN + DE. */
  keywords: string[];
}

/** A section in a composed answer with its provenance. */
export interface ComposedSection {
  source: 'JUNG' | 'ENNEA' | 'HD' | 'NUM' | 'FRICTION';
  text: string;
}

/** The full output of the composition engine. */
export interface ComposedAnswer {
  domain: Domain;
  sections: ComposedSection[];
  frictions: FrictionRule[];
  composedText: string;
}
