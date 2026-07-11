import { z } from 'zod';

/**
 * The Mirror — a one-shot synthesis of all four chambers.
 * "Do you recognize yourself?"
 */

const five = z.array(z.string().min(2)).length(5);

export const mirrorReadingSchema = z.object({
  purpose: z.string().min(20),
  happiness: z.string().min(20),
  work: z.string().min(20),
  relationships: z.string().min(20),
  team: z.string().min(20),
  enjoys: z.string().min(20),
  hates: z.string().min(20),
  positiveTraits: five,
  negativeTraits: z.array(z.string().min(2)).min(3).max(5),
  superpowers: five,
  improvements: five,
});

export type MirrorReading = z.infer<typeof mirrorReadingSchema>;

/**
 * Parse a model response into a MirrorReading.
 * Tolerates markdown fences and leading/trailing prose around the JSON.
 */
export function parseMirror(raw: string): MirrorReading {
  let text = raw.trim();
  // Strip code fences
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  // Fall back to the outermost JSON object if prose surrounds it
  if (!text.startsWith('{')) {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('No JSON object in response');
    text = text.slice(start, end + 1);
  }
  return mirrorReadingSchema.parse(JSON.parse(text));
}
