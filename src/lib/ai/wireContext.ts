import type { Wire } from '@/lib/wire';
import { formatWire } from '@/lib/wire';
import type { TraitAttestation } from '@/lib/publish/traits';

/**
 * Shared Wire → prompt-context serializer, used by the Mirror and the
 * Oracle. One contract, one implementation:
 *
 * - DENIED self-attestations are excluded from the model's view
 *   entirely and listed under an explicit never-assert block
 * - confirmed/partial traits carry their weights so emphasis follows
 *   the person's own verification
 * - all user-influenced strings are sanitized before insertion:
 *   control characters and newlines stripped, length-capped — Wire
 *   data is DATA, and it must not be able to open a new instruction
 *   line inside the prompt
 */

/** Sanitize a user-influenced value for single-line prompt insertion. */
export function promptSafe(value: string, maxLen = 64): string {
  return value
    .replace(/[\r\n\t\0]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, maxLen);
}

export function serializeWireContext(
  wire: Wire,
  selfAttestations: Record<string, TraitAttestation>,
): string {
  const lines: string[] = [`WIRE: ${promptSafe(formatWire(wire), 160)}`];

  if (wire.jung) {
    lines.push(
      `JUNGIAN 16-TYPE: ${promptSafe(wire.jung.type, 8)} (E-I ${wire.jung.ei}, S-N ${wire.jung.sn}, T-F ${wire.jung.tf}, J-P ${wire.jung.jp}; 0 = first pole, 100 = second)`,
    );
  }
  if (wire.humanDesign) {
    lines.push(
      `HUMAN DESIGN: ${promptSafe(wire.humanDesign.type)}, profile ${promptSafe(wire.humanDesign.profile, 8)}, authority ${promptSafe(wire.humanDesign.authority)}`,
    );
  }
  if (wire.millman) {
    lines.push(`LIFE-PURPOSE NUMBER (Millman): ${promptSafe(wire.millman.number, 12)}`);
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
      lines.push(`- ${promptSafe(a.traitId, 80)}: ${a.verb} (${a.weight.toFixed(1)})`);
    }
  }
  if (denied.length > 0) {
    lines.push('TRAITS THE PERSON HAS DENIED (these do NOT apply to them; never assert, imply, or hedge toward them):');
    for (const a of denied) {
      lines.push(`- ${promptSafe(a.traitId, 80)}`);
    }
  }

  return lines.join('\n');
}
