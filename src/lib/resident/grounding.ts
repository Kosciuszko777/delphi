/**
 * Grounding bridge — connects the Resident Oracle to the Canon.
 *
 * buildResidentContext(soulgraph, attestations, question):
 * 1. Routes the question through the existing Canon routing.
 * 2. Runs the existing composeAnswer — the attestation contract
 *    (denied traits excluded) is enforced by construction, same
 *    code path as the Canon tab.
 * 3. Returns { system, canonContext } where system is the resident
 *    system prompt and canonContext is the composed sections +
 *    frictions, provenance-labeled.
 */

import type { Soulgraph } from '@/lib/wire';
import type { TraitAttestation } from '@/lib/publish/traits';
import { routeQuestion, composeAnswer } from '@/canon';
import type { ComposedAnswer } from '@/canon';

/**
 * The Resident Oracle system prompt — verbatim, single source of truth.
 * This prompt grounds the small model in Canon excerpts rather than
 * relying on its own parametric knowledge.
 */
export const RESIDENT_SYSTEM_PROMPT = `You are the Oracle of Delphi, resident on this person's device. You answer from the CANON EXCERPTS below — they are composed for this specific person from their Soulgraph. Synthesize them into a direct, second-person answer to the question. Where the excerpts name a friction, give it weight; frictions are where recognition lives. If the question reaches beyond the excerpts, say plainly that the Canon is silent there and answer briefly from general reason, marked as such. Style: calm, precise, honest. State, never sell. No exclamation marks, no flattery, no mysticism. End on something the person can do or watch for. Maximum ~350 words.`;

export interface ResidentContext {
  /** The full system prompt including canon context. */
  system: string;
  /** The composed canon excerpts, provenance-labeled. */
  canonContext: string;
  /** The composed answer object for reference. */
  composed: ComposedAnswer;
}

/**
 * Build the grounding context for a resident inference.
 * Uses the same Canon routing + composition as the Canon tab —
 * denied traits are excluded by construction.
 */
export function buildResidentContext(
  soulgraph: Soulgraph,
  attestations: Record<string, TraitAttestation>,
  question: string,
): ResidentContext {
  // 1. Route the question to a domain (fallback: purpose)
  const domain = routeQuestion(question) ?? 'purpose';

  // 2. Compose via the Canon engine — attestation contract is enforced
  const composed = composeAnswer(soulgraph, attestations, domain);

  // 3. Build provenance-labeled context
  const contextLines: string[] = [];

  for (const section of composed.sections) {
    const label = section.source === 'FRICTION'
      ? 'FRICTION (where your systems pull against each other)'
      : `[${section.source}]`;
    contextLines.push(`${label}\n${section.text}`);
  }

  const canonContext = contextLines.join('\n\n');

  // 4. Assemble the full system prompt
  const system = `${RESIDENT_SYSTEM_PROMPT}

CANON EXCERPTS (domain: ${domain}):
---
${canonContext}
---`;

  return { system, canonContext, composed };
}
