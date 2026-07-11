/**
 * Open Enneagram Questionnaire — 36 items
 *
 * 4 items per Enneagram type (9 types × 4 = 36 items).
 * Each item scores toward a specific type (1–9).
 *
 * Scored on a 5-point Likert scale:
 *   1 = Strongly disagree … 5 = Strongly agree
 *
 * Items are original and based on openly available Enneagram
 * theory (Riso-Hudson tradition, open-access descriptions).
 * No proprietary content is reproduced.
 */

export interface EnneagramItem {
  id: number;
  text: string;
  /** Which Enneagram type (1–9) this item scores toward */
  type: number;
}

const items: EnneagramItem[] = [
  // ─── Type 1: The Reformer ──────────────────────────────────────
  { id: 1,  text: 'I hold myself to very high standards and feel frustrated when I fall short.',                     type: 1 },
  { id: 2,  text: 'I have a strong inner sense of right and wrong that guides most of my decisions.',                type: 1 },
  { id: 3,  text: 'I notice mistakes and imperfections that others seem to overlook.',                               type: 1 },
  { id: 4,  text: 'I often feel a sense of responsibility to improve things around me.',                             type: 1 },

  // ─── Type 2: The Helper ────────────────────────────────────────
  { id: 5,  text: 'I instinctively focus on what other people need, sometimes before they realize it themselves.',    type: 2 },
  { id: 6,  text: 'I feel most fulfilled when I know I have made a real difference in someone\'s life.',             type: 2 },
  { id: 7,  text: 'I tend to put others\' needs ahead of my own, even when it costs me.',                            type: 2 },
  { id: 8,  text: 'I find it easier to express warmth and care for others than to ask for help myself.',             type: 2 },

  // ─── Type 3: The Achiever ──────────────────────────────────────
  { id: 9,  text: 'I am strongly driven to succeed and be recognized for my accomplishments.',                       type: 3 },
  { id: 10, text: 'I naturally adapt my presentation to make the best impression in different situations.',           type: 3 },
  { id: 11, text: 'I measure my self-worth partly by what I have achieved and how others perceive me.',              type: 3 },
  { id: 12, text: 'I become restless and uncomfortable when I am not being productive.',                             type: 3 },

  // ─── Type 4: The Individualist ─────────────────────────────────
  { id: 13, text: 'I often feel fundamentally different from the people around me.',                                  type: 4 },
  { id: 14, text: 'I am drawn to what is deep, authentic, and emotionally meaningful — the ordinary bores me.',      type: 4 },
  { id: 15, text: 'I experience my emotions more intensely than most people seem to.',                                type: 4 },
  { id: 16, text: 'I sometimes feel that something essential is missing from my life that others seem to have.',      type: 4 },

  // ─── Type 5: The Investigator ──────────────────────────────────
  { id: 17, text: 'I need a lot of time alone to recharge and to think things through.',                              type: 5 },
  { id: 18, text: 'I tend to observe situations from the sidelines before participating.',                            type: 5 },
  { id: 19, text: 'I protect my time and energy carefully and feel drained by too many social demands.',              type: 5 },
  { id: 20, text: 'I feel most confident when I have thoroughly researched and understood a subject.',                type: 5 },

  // ─── Type 6: The Loyalist ──────────────────────────────────────
  { id: 21, text: 'I often anticipate what could go wrong and prepare for worst-case scenarios.',                     type: 6 },
  { id: 22, text: 'Trust is extremely important to me — I need to know who I can rely on.',                           type: 6 },
  { id: 23, text: 'I tend to question authority and look for hidden motives behind what people say.',                 type: 6 },
  { id: 24, text: 'I feel more secure when I have a clear structure, group, or belief system to rely on.',            type: 6 },

  // ─── Type 7: The Enthusiast ────────────────────────────────────
  { id: 25, text: 'I like to keep my options open and resist being pinned down to one path.',                         type: 7 },
  { id: 26, text: 'I naturally focus on the positive side of situations and find ways to reframe problems.',          type: 7 },
  { id: 27, text: 'I get excited by new experiences, ideas, and plans — variety keeps me energized.',                 type: 7 },
  { id: 28, text: 'I tend to avoid pain, discomfort, and negative emotions by staying busy or moving on to something new.', type: 7 },

  // ─── Type 8: The Challenger ────────────────────────────────────
  { id: 29, text: 'I speak my mind directly, even when I know it may provoke a reaction.',                            type: 8 },
  { id: 30, text: 'I feel a strong need to be in control of my own life and resist being controlled by others.',      type: 8 },
  { id: 31, text: 'I instinctively protect the people I care about and stand up against injustice.',                  type: 8 },
  { id: 32, text: 'I respect strength and directness and have little patience for weakness or indecision.',           type: 8 },

  // ─── Type 9: The Peacemaker ────────────────────────────────────
  { id: 33, text: 'I tend to go along with what others want to avoid conflict or tension.',                            type: 9 },
  { id: 34, text: 'I find it easy to see all sides of a situation, which sometimes makes it hard to take a position.', type: 9 },
  { id: 35, text: 'I value inner peace and stability above almost everything else.',                                   type: 9 },
  { id: 36, text: 'I sometimes lose track of my own priorities because I merge with what others need.',                type: 9 },
];

export default items;

/** Total number of items in the questionnaire. */
export const TOTAL_ITEMS = items.length;

/**
 * Return a deterministically shuffled copy of items so that types
 * are interleaved, reducing sequential bias.
 */
export function getShuffledItems(seed = 73): EnneagramItem[] {
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
