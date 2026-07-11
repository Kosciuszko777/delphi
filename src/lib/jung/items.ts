/**
 * Open Jungian Type Questionnaire — 32 items
 *
 * Items are original, inspired by the OEJTS public-domain item pool and
 * classic Jungian personality research. They measure four dichotomies:
 *
 *   E–I  (Extraversion – Introversion)    — energy orientation
 *   S–N  (Sensing – Intuition)            — information gathering
 *   T–F  (Thinking – Feeling)             — decision making
 *   J–P  (Judging – Perceiving)           — outer-world orientation
 *
 * Each dimension has 8 items. Items are scored on a 5-point Likert scale:
 *   1 = Strongly disagree … 5 = Strongly agree
 *
 * `pole` indicates which end of the dichotomy the item measures:
 *   - positive pole (E, S, T, J): agreement = score toward that pole
 *   - negative pole (I, N, F, P): agreement = score toward that pole
 *
 * Items are presented in shuffled order (see `getShuffledItems`).
 *
 * ⚠ These items do NOT reproduce any proprietary MBTI® content.
 *   The four-letter type codes are generic Jungian designations.
 */

export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';
export type Pole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface JungItem {
  id: number;
  text: string;
  dimension: Dimension;
  /** Which pole agreement with this item scores toward */
  pole: Pole;
}

const items: JungItem[] = [
  // ─── E–I dimension (8 items) ───────────────────────────────────
  { id: 1,  text: 'I feel energized after spending time with a group of people.',              dimension: 'EI', pole: 'E' },
  { id: 2,  text: 'I prefer to think things through before speaking up in a conversation.',    dimension: 'EI', pole: 'I' },
  { id: 3,  text: 'I enjoy being at the center of social activity.',                           dimension: 'EI', pole: 'E' },
  { id: 4,  text: 'I need quiet time alone to recharge after a busy day.',                     dimension: 'EI', pole: 'I' },
  { id: 5,  text: 'I find it easy to strike up conversations with strangers.',                 dimension: 'EI', pole: 'E' },
  { id: 6,  text: 'I tend to have a few close friends rather than many acquaintances.',        dimension: 'EI', pole: 'I' },
  { id: 7,  text: 'I process my thoughts best by talking them through with others.',           dimension: 'EI', pole: 'E' },
  { id: 8,  text: 'I prefer working on my own rather than in a team setting.',                 dimension: 'EI', pole: 'I' },

  // ─── S–N dimension (8 items) ───────────────────────────────────
  { id: 9,  text: 'I pay close attention to the specific details of my surroundings.',         dimension: 'SN', pole: 'S' },
  { id: 10, text: 'I am drawn more to abstract ideas and theories than to concrete facts.',    dimension: 'SN', pole: 'N' },
  { id: 11, text: 'I trust information that comes from direct, hands-on experience.',          dimension: 'SN', pole: 'S' },
  { id: 12, text: 'I often notice patterns and connections that others seem to miss.',         dimension: 'SN', pole: 'N' },
  { id: 13, text: 'I prefer instructions that are step-by-step and practical.',                dimension: 'SN', pole: 'S' },
  { id: 14, text: 'I enjoy imagining possibilities for the future more than reviewing the past.', dimension: 'SN', pole: 'N' },
  { id: 15, text: 'I value proven methods over untested new approaches.',                      dimension: 'SN', pole: 'S' },
  { id: 16, text: 'I get bored quickly with routine tasks and seek variety.',                  dimension: 'SN', pole: 'N' },

  // ─── T–F dimension (8 items) ───────────────────────────────────
  { id: 17, text: 'When making decisions, I rely primarily on logical analysis.',               dimension: 'TF', pole: 'T' },
  { id: 18, text: 'I consider how a decision will affect other people\'s feelings before acting.', dimension: 'TF', pole: 'F' },
  { id: 19, text: 'I value fairness and consistency over making exceptions for individuals.',   dimension: 'TF', pole: 'T' },
  { id: 20, text: 'Maintaining harmony in relationships is one of my highest priorities.',      dimension: 'TF', pole: 'F' },
  { id: 21, text: 'I prefer to give honest, direct feedback even if it may be uncomfortable.',  dimension: 'TF', pole: 'T' },
  { id: 22, text: 'I can easily sense the emotional atmosphere when I enter a room.',           dimension: 'TF', pole: 'F' },
  { id: 23, text: 'I am more convinced by a well-reasoned argument than an emotional appeal.',  dimension: 'TF', pole: 'T' },
  { id: 24, text: 'I find it difficult to disagree with someone if it might hurt their feelings.', dimension: 'TF', pole: 'F' },

  // ─── J–P dimension (8 items) ───────────────────────────────────
  { id: 25, text: 'I like to have a clear plan before starting any project.',                  dimension: 'JP', pole: 'J' },
  { id: 26, text: 'I prefer to keep my options open rather than commit to a fixed schedule.',   dimension: 'JP', pole: 'P' },
  { id: 27, text: 'I feel satisfied when I can check tasks off a list.',                       dimension: 'JP', pole: 'J' },
  { id: 28, text: 'I work best when I can respond spontaneously to whatever comes up.',        dimension: 'JP', pole: 'P' },
  { id: 29, text: 'I prefer decisions to be settled as soon as possible.',                     dimension: 'JP', pole: 'J' },
  { id: 30, text: 'I often delay final decisions because new information might change things.', dimension: 'JP', pole: 'P' },
  { id: 31, text: 'I am most comfortable when my life is organized and predictable.',          dimension: 'JP', pole: 'J' },
  { id: 32, text: 'I enjoy adapting to unexpected changes and surprises.',                     dimension: 'JP', pole: 'P' },
];

export default items;

/** Total number of items in the questionnaire. */
export const TOTAL_ITEMS = items.length;

/**
 * Return a deterministically shuffled copy of items.
 * Uses a seeded Fisher-Yates shuffle so the order is consistent per session
 * but interleaves dimensions to reduce response bias.
 */
export function getShuffledItems(seed = 42): JungItem[] {
  const arr = [...items];
  let s = seed;
  const rand = () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
