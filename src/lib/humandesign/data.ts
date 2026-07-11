/**
 * Human Design reference data — types, profiles, and authorities.
 *
 * Phase 4 is manual entry: the user computes their chart externally
 * and enters the key parameters here. No ephemeris calculation.
 *
 * All descriptive texts are original.
 */

// ─── Types ───────────────────────────────────────────────────────

export interface HDType {
  value: string;
  label: string;
  /** Percentage of the population (~) */
  frequency: string;
  strategy: string;
  description: string;
}

export const HD_TYPES: HDType[] = [
  {
    value: 'Generator',
    label: 'Generator',
    frequency: '~37%',
    strategy: 'Wait to respond',
    description: 'Generators are the life force of the planet — the builders, the doers, the ones with sustained energy to work. Your strategy is to wait for something in your environment to respond to rather than initiating from the mind. When you respond to what lights you up, your sacral energy is inexhaustible. When you initiate from obligation or mental pressure, you hit frustration — the signature of a Generator living out of alignment.',
  },
  {
    value: 'Manifesting Generator',
    label: 'Manifesting Generator',
    frequency: '~33%',
    strategy: 'Wait to respond, then inform',
    description: 'Manifesting Generators carry the sustained sacral energy of the Generator with the initiating capacity of the Manifestor. You are multi-passionate, fast-moving, and designed to skip steps — your efficiency comes from finding shortcuts that others miss. Your strategy is still to respond (not initiate from the mind), but once you respond, you move quickly and must inform others of your direction. Frustration and anger are both possible not-self themes.',
  },
  {
    value: 'Projector',
    label: 'Projector',
    frequency: '~20%',
    strategy: 'Wait for the invitation',
    description: 'Projectors are the guides of humanity — designed to see into systems, organizations, and other people with unusual clarity. You do not have sustainable work energy and are not designed to work in the traditional sense. Your strategy is to wait for recognition and invitation before sharing your gifts. When you push your guidance on others without invitation, you experience bitterness. When recognized, you become a profoundly effective leader, advisor, and organizer.',
  },
  {
    value: 'Manifestor',
    label: 'Manifestor',
    frequency: '~8%',
    strategy: 'Inform before acting',
    description: 'Manifestors are the initiators — the only type designed to act without waiting. You carry a powerful, repelling aura that clears the path ahead of you. Your strategy is to inform the people your actions will impact before you act. This is not asking permission — it is a courtesy that reduces the resistance you encounter. When you don\'t inform, you meet anger. When you do, you experience the peace that is your signature theme.',
  },
  {
    value: 'Reflector',
    label: 'Reflector',
    frequency: '~1%',
    strategy: 'Wait a full lunar cycle',
    description: 'Reflectors are the rarest type — completely open, with no defined centers. You are a mirror of the community and environment you inhabit. Your health, mood, and clarity are direct reflections of the people around you. Your strategy is to wait a full lunar cycle (approximately 28 days) before making major decisions, allowing the moon to transit all 64 gates. When in the right environment, you experience the surprise and wonder that is your signature theme.',
  },
];

// ─── Profiles ────────────────────────────────────────────────────

export interface HDProfile {
  value: string;
  label: string;
  description: string;
}

export const HD_PROFILES: HDProfile[] = [
  { value: '1/3', label: '1/3 — Investigator / Martyr', description: 'You build a deep foundation of knowledge through personal investigation, then learn what doesn\'t work through direct trial and error.' },
  { value: '1/4', label: '1/4 — Investigator / Opportunist', description: 'You need a solid foundation of knowledge and transmit what you discover through close personal networks and relationships.' },
  { value: '2/4', label: '2/4 — Hermit / Opportunist', description: 'You have natural gifts that need to be called out by others; your influence flows through personal connections and networks.' },
  { value: '2/5', label: '2/5 — Hermit / Heretic', description: 'You have innate talents that others project solutions onto; you need retreat to recharge but are called out to universalize practical answers.' },
  { value: '3/5', label: '3/5 — Martyr / Heretic', description: 'You learn through trial and error and are projected upon as someone who can offer practical, universalized solutions from your experience.' },
  { value: '3/6', label: '3/6 — Martyr / Role Model', description: 'You learn through bumps and bruises in the first half of life, then step into a role-model quality of lived wisdom in maturity.' },
  { value: '4/6', label: '4/6 — Opportunist / Role Model', description: 'You influence through your network and personal bonds, maturing into an authority whose life itself becomes the example.' },
  { value: '4/1', label: '4/1 — Opportunist / Investigator', description: 'You transmit through personal networks and stand on a deeply researched, unshakeable foundation of knowledge.' },
  { value: '5/1', label: '5/1 — Heretic / Investigator', description: 'Others project onto you as a problem-solver; your solutions are grounded in thorough investigation and deep expertise.' },
  { value: '5/2', label: '5/2 — Heretic / Hermit', description: 'You are projected upon as a practical savior with innate genius — but you need solitude and retreat to access your natural gifts.' },
  { value: '6/2', label: '6/2 — Role Model / Hermit', description: 'You move through three life phases — trial, retreat, and eventually embodied wisdom — with innate talents that are called out by others.' },
  { value: '6/3', label: '6/3 — Role Model / Martyr', description: 'You mature through life\'s trials into a role model, having learned what works and what doesn\'t through direct, personal experience.' },
];

// ─── Authorities ─────────────────────────────────────────────────

export interface HDAuthority {
  value: string;
  label: string;
  description: string;
}

export const HD_AUTHORITIES: HDAuthority[] = [
  { value: 'Emotional', label: 'Emotional (Solar Plexus)', description: 'Never make decisions in the emotional high or low. Wait for clarity — ride the full wave of your emotional cycle before committing.' },
  { value: 'Sacral', label: 'Sacral', description: 'Your gut response — the "uh-huh" or "uhn-uhn" — is your truth. Trust the visceral, immediate, in-the-body response to yes/no questions.' },
  { value: 'Splenic', label: 'Splenic', description: 'Your intuition speaks once, in the moment, and quietly. It is a survival instinct — subtle, instantaneous, and not repeatable. Trust the first hit.' },
  { value: 'Ego', label: 'Ego / Heart', description: 'Your willpower is your authority. If you can say "I want this" or "I will do this" and mean it from the heart center, that is your truth.' },
  { value: 'Self-Projected', label: 'Self-Projected', description: 'Hear yourself speak. Your truth emerges in the sound of your own voice — talk through decisions with trusted others and listen to what you say.' },
  { value: 'Mental', label: 'Outer Authority (Mental)', description: 'You have no inner authority in the traditional sense. Your clarity comes from your environment and from hearing yourself talk to different people over time.' },
  { value: 'Lunar', label: 'Lunar (Reflector)', description: 'Wait a full lunar cycle. Your openness means you sample all energies — only the full moon transit reveals what is consistently true for you.' },
];

// ─── External calculator links ───────────────────────────────────

export interface ExternalCalculator {
  name: string;
  url: string;
  description: string;
}

export const EXTERNAL_CALCULATORS: ExternalCalculator[] = [
  {
    name: 'Genetic Matrix',
    url: 'https://www.geneticmatrix.com/free-human-design-chart/',
    description: 'Detailed free chart with type, profile, authority, defined centers, and channel information.',
  },
  {
    name: 'Jovian Archive',
    url: 'https://www.jovianarchive.com/Get_Your_Chart',
    description: 'The original Human Design system resource — free bodygraph chart from Ra Uru Hu\'s organization.',
  },
  {
    name: 'myBodyGraph',
    url: 'https://www.mybodygraph.com/',
    description: 'Clean, interactive bodygraph with detailed gate and channel breakdowns.',
  },
];
