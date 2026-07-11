import type { Wire } from '@/lib/wire';
import { formatWire } from '@/lib/wire';
import type { TraitAttestation } from '@/lib/publish/traits';
import type { ChatMessage } from '@/hooks/useShakespeare';

/**
 * Build the Mirror prompt from the Wire and the user's own
 * self-attestations.
 *
 * Self-attestation contract (same one the Oracle inherits in WP-3):
 * - traits the person has DENIED are excluded outright — the model is
 *   never shown them, so it cannot leak them back
 * - confirmed/partial traits carry their weights so emphasis follows
 *   the person's own verification, not the raw type description
 */
export function buildMirrorMessages(
  wire: Wire,
  selfAttestations: Record<string, TraitAttestation>,
): ChatMessage[] {
  const lines: string[] = [`WIRE: ${formatWire(wire)}`];

  if (wire.jung) {
    lines.push(`JUNGIAN 16-TYPE: ${wire.jung.type} (E-I ${wire.jung.ei}, S-N ${wire.jung.sn}, T-F ${wire.jung.tf}, J-P ${wire.jung.jp}; 0 = first pole, 100 = second)`);
  }
  if (wire.humanDesign) {
    lines.push(`HUMAN DESIGN: ${wire.humanDesign.type}, profile ${wire.humanDesign.profile}, authority ${wire.humanDesign.authority}`);
  }
  if (wire.millman) {
    lines.push(`LIFE-PURPOSE NUMBER (Millman): ${wire.millman.number}`);
  }
  if (wire.enneagram) {
    lines.push(`ENNEAGRAM: core ${wire.enneagram.core}, wing ${wire.enneagram.wing}`);
  }

  const atts = Object.values(selfAttestations);
  const denied = atts.filter((a) => a.verb === 'deny');
  const weighted = atts.filter((a) => a.verb !== 'deny');
  if (weighted.length > 0) {
    lines.push('SELF-VERIFIED TRAIT WEIGHTS (the person has weighed these themselves; let emphasis follow the weights):');
    for (const a of weighted) {
      lines.push(`- ${a.traitId}: ${a.verb} (${a.weight.toFixed(1)})`);
    }
  }
  if (denied.length > 0) {
    lines.push('TRAITS THE PERSON HAS DENIED (these do NOT apply to them; never assert, imply, or hedge toward them):');
    for (const a of denied) {
      lines.push(`- ${a.traitId}`);
    }
  }

  const system = `You are the Mirror of Delphi. You synthesize a person's results across four self-knowledge systems — a Jungian 16-type profile, Human Design, the Millman life-purpose number, and the Enneagram — into one coherent portrait, written directly to the person in the second person.

Voice: calm, precise, honest. State, never sell. No exclamation marks, no flattery, no mysticism, no hedging filler. Where the four systems agree, say so plainly; where they pull against each other (for example an assertive Enneagram core inside a strategy of waiting, or an introverted type with a purpose number that demands expression), name the friction — the frictions are usually the most recognizable part of a person.

Ground every statement in the systems provided. Do not invent biography. Respect the self-verification data absolutely: denied traits do not exist for this person.

Respond with ONLY a JSON object, no markdown fences, no preamble, matching exactly:
{
  "purpose": "2-4 sentences — what this configuration is oriented toward",
  "happiness": "2-4 sentences — the conditions under which this person genuinely thrives",
  "work": "2-4 sentences — how they work best, what environments fit",
  "relationships": "2-4 sentences — how they love, attach, and where it strains",
  "team": "2-4 sentences — the role they naturally take in a team and what teams should know",
  "enjoys": "2-3 sentences — what reliably gives them energy and joy",
  "hates": "2-3 sentences — what reliably drains or repels them",
  "positiveTraits": ["exactly five short trait phrases — their brightest qualities"],
  "negativeTraits": ["three to five short trait phrases — real shadows, stated kindly but honestly"],
  "superpowers": ["exactly five short phrases — rare capabilities this specific combination produces"],
  "improvements": ["exactly five short phrases — the five most rewarding grounds for growth"]
}`;

  return [
    { role: 'system', content: system },
    { role: 'user', content: lines.join('\n') },
  ];
}
