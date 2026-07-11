/**
 * Trait definitions for self-attestation.
 *
 * Each system's result is decomposed into 5–8 named traits.
 * The user confirms, denies, or weights each one.
 */

import type { Wire } from '@/lib/wire';

export interface Trait {
  id: string;
  system: 'jung' | 'enneagram' | 'millman' | 'hd';
  label: string;
  description: string;
}

export interface TraitAttestation {
  traitId: string;
  verb: 'confirm' | 'deny' | 'partial';
  weight: number; // 0.0–1.0
}

/** Generate the relevant traits based on the user's Wire. */
export function getTraitsForWire(wire: Wire): Trait[] {
  const traits: Trait[] = [];

  if (wire.jung) {
    traits.push(...getJungTraits(wire.jung.type));
  }
  if (wire.enneagram) {
    traits.push(...getEnneagramTraits(wire.enneagram.core, wire.enneagram.wing));
  }
  if (wire.millman) {
    traits.push(...getMillmanTraits(wire.millman.number));
  }
  if (wire.humanDesign) {
    traits.push(...getHDTraits(wire.humanDesign.type, wire.humanDesign.authority));
  }

  return traits;
}

function getJungTraits(type: string): Trait[] {
  const letters = type.split('');
  const traits: Trait[] = [];

  const ei = letters[0];
  traits.push({
    id: `jung:${ei === 'E' ? 'extraversion' : 'introversion'}`,
    system: 'jung',
    label: ei === 'E' ? 'Extraverted energy' : 'Introverted energy',
    description: ei === 'E'
      ? 'Energized by external interaction and social engagement'
      : 'Energized by inner reflection and solitary focus',
  });

  const sn = letters[1];
  traits.push({
    id: `jung:${sn === 'S' ? 'sensing' : 'intuition'}`,
    system: 'jung',
    label: sn === 'S' ? 'Sensing perception' : 'Intuitive perception',
    description: sn === 'S'
      ? 'Attentive to concrete details and direct experience'
      : 'Drawn to patterns, possibilities, and abstract connections',
  });

  const tf = letters[2];
  traits.push({
    id: `jung:${tf === 'T' ? 'thinking' : 'feeling'}`,
    system: 'jung',
    label: tf === 'T' ? 'Thinking judgment' : 'Feeling judgment',
    description: tf === 'T'
      ? 'Decisions guided by logical analysis and consistency'
      : 'Decisions guided by values and impact on people',
  });

  const jp = letters[3];
  traits.push({
    id: `jung:${jp === 'J' ? 'judging' : 'perceiving'}`,
    system: 'jung',
    label: jp === 'J' ? 'Structured lifestyle' : 'Flexible lifestyle',
    description: jp === 'J'
      ? 'Preference for planning, closure, and decided outcomes'
      : 'Preference for spontaneity, openness, and adapting',
  });

  traits.push({
    id: `jung:${type.toLowerCase()}-strategic`,
    system: 'jung',
    label: `${type} strategic pattern`,
    description: `The characteristic decision-making and problem-solving approach of the ${type} type`,
  });

  return traits;
}

function getEnneagramTraits(core: number, wing: number): Trait[] {
  const coreTraits: Record<number, Array<{ id: string; label: string; desc: string }>> = {
    1: [
      { id: 'reformer-standards', label: 'High personal standards', desc: 'Holding yourself and your work to exacting criteria' },
      { id: 'reformer-critic', label: 'Inner critic voice', desc: 'A persistent internal evaluator that drives improvement' },
      { id: 'reformer-integrity', label: 'Integrity-driven', desc: 'Strong moral compass guiding decisions and behavior' },
    ],
    2: [
      { id: 'helper-attunement', label: 'Emotional attunement', desc: 'Intuitively sensing what others need before they ask' },
      { id: 'helper-giving', label: 'Compulsive giving', desc: 'Tendency to prioritize others\' needs over your own' },
      { id: 'helper-warmth', label: 'Interpersonal warmth', desc: 'Natural ability to make people feel cared for' },
    ],
    3: [
      { id: 'achiever-drive', label: 'Achievement drive', desc: 'Relentless orientation toward goals and success' },
      { id: 'achiever-adapt', label: 'Social adaptability', desc: 'Ability to read and match expectations in any context' },
      { id: 'achiever-image', label: 'Image awareness', desc: 'Sensitivity to how you are perceived by others' },
    ],
    4: [
      { id: 'individualist-depth', label: 'Emotional depth', desc: 'Experiencing feelings with unusual intensity and richness' },
      { id: 'individualist-unique', label: 'Need for uniqueness', desc: 'Drive to be authentically different from the norm' },
      { id: 'individualist-longing', label: 'Melancholic longing', desc: 'Feeling that something essential is missing or distant' },
    ],
    5: [
      { id: 'investigator-detach', label: 'Observational detachment', desc: 'Tendency to watch and analyze before engaging' },
      { id: 'investigator-conserve', label: 'Energy conservation', desc: 'Protecting time and energy from excessive demands' },
      { id: 'investigator-expertise', label: 'Depth of knowledge', desc: 'Compulsion to thoroughly understand before acting' },
    ],
    6: [
      { id: 'loyalist-vigilance', label: 'Threat vigilance', desc: 'Scanning for potential dangers and worst-case scenarios' },
      { id: 'loyalist-loyalty', label: 'Deep loyalty', desc: 'Unwavering commitment once trust is established' },
      { id: 'loyalist-questioning', label: 'Authority questioning', desc: 'Testing and probing before accepting claims or leaders' },
    ],
    7: [
      { id: 'enthusiast-optimism', label: 'Reframing optimism', desc: 'Finding the positive angle in almost any situation' },
      { id: 'enthusiast-variety', label: 'Variety seeking', desc: 'Craving new experiences, ideas, and stimulation' },
      { id: 'enthusiast-avoidance', label: 'Pain avoidance', desc: 'Tendency to escape discomfort through activity or distraction' },
    ],
    8: [
      { id: 'challenger-directness', label: 'Forceful directness', desc: 'Speaking and acting without softening or hedging' },
      { id: 'challenger-control', label: 'Autonomy need', desc: 'Strong resistance to being controlled or limited by others' },
      { id: 'challenger-protection', label: 'Protective instinct', desc: 'Using strength to shield the vulnerable and oppose injustice' },
    ],
    9: [
      { id: 'peacemaker-harmony', label: 'Harmony seeking', desc: 'Deep drive to maintain peace and avoid conflict' },
      { id: 'peacemaker-merging', label: 'Perspective merging', desc: 'Ability to see and hold multiple viewpoints simultaneously' },
      { id: 'peacemaker-numbing', label: 'Self-forgetting', desc: 'Losing track of your own priorities and desires' },
    ],
  };

  const traits: Trait[] = (coreTraits[core] ?? []).map(t => ({
    id: `enneagram:${t.id}`,
    system: 'enneagram' as const,
    label: t.label,
    description: t.desc,
  }));

  traits.push({
    id: `enneagram:wing-${wing}`,
    system: 'enneagram',
    label: `Wing ${wing} influence`,
    description: `The modifying influence of the ${wing}-wing on your core ${core} pattern`,
  });

  return traits;
}

function getMillmanTraits(number: string): Trait[] {
  const finalDigit = parseInt(number.split('/').pop() ?? '0', 10);

  const digitTraits: Record<number, Array<{ id: string; label: string; desc: string }>> = {
    1: [
      { id: 'creative-independence', label: 'Creative independence', desc: 'Need to express original ideas on your own terms' },
      { id: 'self-doubt-pattern', label: 'Self-doubt pattern', desc: 'Recurring questioning of whether your ideas are worth sharing' },
    ],
    2: [
      { id: 'cooperative-sensitivity', label: 'Cooperative sensitivity', desc: 'Natural attunement to the needs of partners and groups' },
      { id: 'boundary-learning', label: 'Boundary learning', desc: 'The ongoing lesson of distinguishing service from self-sacrifice' },
    ],
    3: [
      { id: 'expressive-gift', label: 'Expressive gift', desc: 'Capacity to articulate emotional truths that others cannot name' },
      { id: 'emotional-honesty', label: 'Emotional honesty', desc: 'The discipline of speaking from genuine feeling' },
    ],
    4: [
      { id: 'builder-persistence', label: 'Builder persistence', desc: 'Capacity for sustained, step-by-step effort toward goals' },
      { id: 'process-trust', label: 'Process trust', desc: 'Learning that foundations determine what structures can hold' },
    ],
    5: [
      { id: 'freedom-discipline', label: 'Freedom through discipline', desc: 'Discovering that mastery, not escape, is true liberation' },
      { id: 'versatile-energy', label: 'Versatile energy', desc: 'Quick learning and adaptability across domains' },
    ],
    6: [
      { id: 'visionary-standards', label: 'Visionary standards', desc: 'Seeing the potential in people and situations' },
      { id: 'acceptance-practice', label: 'Acceptance practice', desc: 'Learning to hold ideals while embracing imperfection' },
    ],
    7: [
      { id: 'inner-trust', label: 'Inner trust', desc: 'Learning to rely on intuition and inner knowing' },
      { id: 'analytical-depth', label: 'Analytical depth', desc: 'Capacity to dive beneath surfaces to fundamental truths' },
    ],
    8: [
      { id: 'abundant-leadership', label: 'Abundant leadership', desc: 'Natural executive energy and resource-marshaling ability' },
      { id: 'power-integrity', label: 'Power with integrity', desc: 'Learning to wield influence in service of the greater good' },
    ],
    9: [
      { id: 'exemplar-integrity', label: 'Exemplar integrity', desc: 'Leading through the alignment of values and actions' },
      { id: 'wisdom-embodiment', label: 'Wisdom embodiment', desc: 'Teaching not by words but by consistent lived example' },
    ],
  };

  return (digitTraits[finalDigit] ?? []).map(t => ({
    id: `millman:${t.id}`,
    system: 'millman' as const,
    label: t.label,
    description: t.desc,
  }));
}

function getHDTraits(type: string, authority: string): Trait[] {
  const traits: Trait[] = [];

  const typeTraits: Record<string, { id: string; label: string; desc: string }> = {
    'Generator': { id: 'sacral-energy', label: 'Sustained sacral energy', desc: 'Inexhaustible work capacity when responding to what lights you up' },
    'Manifesting Generator': { id: 'multi-passionate', label: 'Multi-passionate speed', desc: 'Moving quickly across interests, finding efficient shortcuts' },
    'Projector': { id: 'seeing-gift', label: 'Seeing into systems', desc: 'Ability to perceive dynamics and guide with clarity' },
    'Manifestor': { id: 'initiating-force', label: 'Initiating force', desc: 'Capacity to start things without waiting for permission' },
    'Reflector': { id: 'mirror-quality', label: 'Community mirror', desc: 'Reflecting the health and dynamics of your environment' },
  };

  if (typeTraits[type]) {
    traits.push({
      id: `hd:${typeTraits[type].id}`,
      system: 'hd',
      label: typeTraits[type].label,
      description: typeTraits[type].desc,
    });
  }

  traits.push({
    id: `hd:strategy-${type.toLowerCase().replace(/\s+/g, '-')}`,
    system: 'hd',
    label: `${type} strategy alignment`,
    description: `Living according to the ${type} strategy in daily decision-making`,
  });

  traits.push({
    id: `hd:authority-${authority.toLowerCase().replace(/\s+/g, '-')}`,
    system: 'hd',
    label: `${authority} authority`,
    description: `Trusting your ${authority.toLowerCase()} authority for important decisions`,
  });

  return traits;
}
