import type { FrictionRule } from './types';

/**
 * Friction rules — the soul of the Canon engine.
 *
 * Each rule fires when ALL listed conditions match the Wire.
 * Frictions name the tension between systems and give the person
 * something concrete to do with it.
 *
 * Phase A: 15 rules covering the highest-tension combinations.
 */
export const FRICTION_RULES: FrictionRule[] = [
  // ─── Assertive core × waiting strategy ───
  {
    id: 'fr:ennea8-projector',
    when: { enneaCore: [8], hdType: ['Projector'] },
    domains: ['team', 'work', 'conflict', 'relationships'],
    weight: 3,
    text: 'Your core wants to seize the room; your design is built to be invited into it. Pushed uninvited, your insight — which is real — lands as pressure and gets resisted on principle. This is the central tension of your configuration, and it will not resolve by choosing a side. The practice: create the invitation instead of waiting for it — publish the insight, state your availability, then hold. What comes to you, you may command fully.',
  },
  {
    id: 'fr:ennea3-projector',
    when: { enneaCore: [3], hdType: ['Projector'] },
    domains: ['work', 'team', 'energy'],
    weight: 3,
    text: 'Your achiever drive pushes for output, but your Projector design is not built for sustained production. You try to keep pace with generators and burn out faster because your energy model is different. The tension: your ambition says go, your body says rest. The practice: measure your success in quality of insight delivered, not volume of hours worked. One strategic observation that redirects a project is worth more than a sixty-hour week of execution. Redefine winning to fit your actual wiring.',
  },
  {
    id: 'fr:ennea8-reflector',
    when: { enneaCore: [8], hdType: ['Reflector'] },
    domains: ['team', 'conflict', 'relationships'],
    weight: 3,
    text: 'You carry the force of the Challenger in a body designed to sample and mirror. Your intensity is real, but it is borrowed — it comes from the environment, not from a fixed center. This means your Eight energy peaks in certain company and vanishes in others, which can feel like inconsistency to you and unpredictability to those around you. The practice: before you act on strong conviction, ask whether it is yours or the room\'s. Wait twenty-four hours. What remains is you; what fades was the field.',
  },
  // ─── Harmony-seeking core × initiating type ───
  {
    id: 'fr:ennea9-manifestor',
    when: { enneaCore: [9], hdType: ['Manifestor'] },
    domains: ['work', 'team', 'relationships', 'conflict'],
    weight: 3,
    text: 'Your Manifestor design is built to initiate; your Nine core wants peace. The result is a person who starts things quietly, avoids the confrontation that starting things requires, and then wonders why the initiative stalled. Informing feels like asking permission, and asking permission feels like conflict. The practice: write the initiation as a statement of fact, not a request. "I am starting X on Monday" is not aggressive — it is your design operating correctly. The discomfort you feel is the Nine resisting; the action you take is the Manifestor fulfilling.',
  },
  {
    id: 'fr:ennea2-manifestor',
    when: { enneaCore: [2], hdType: ['Manifestor'] },
    domains: ['relationships', 'team', 'work'],
    weight: 2,
    text: 'Your Two wants to be needed; your Manifestor does not need anyone to begin. This creates a cycle: you initiate alone, then feel guilty about not including others, then over-give to compensate. The practice: inform before you initiate, not to ask permission but to share the gift of your direction. When others join, let them contribute on their terms instead of managing their experience. Your warmth is welcome; your caretaking of autonomous adults is not.',
  },
  // ─── Introverted Jung × expressive Millman ───
  {
    id: 'fr:introvert-millman3',
    when: { jung: ['INTJ', 'INTP', 'INFJ', 'INFP', 'ISTJ', 'ISFJ', 'ISTP', 'ISFP'], millmanFinal: [3] },
    domains: ['work', 'team', 'growth', 'purpose'],
    weight: 2,
    text: 'Your Millman path demands expression — putting your inner world into language that others can receive. Your introverted preference moves in the opposite direction: inward, private, considered. The tension is not a contradiction; it is a creative pressure. The practice: choose a medium that lets you express without performing. Writing, recording, composing — channels where you can craft the message without the energy cost of a live audience. Your expression does not need volume; it needs a channel that fits your wiring.',
  },
  {
    id: 'fr:introvert-millman12',
    when: { jung: ['INTJ', 'INTP', 'INFJ', 'INFP', 'ISTJ', 'ISFJ', 'ISTP', 'ISFP'], millmanFinal: [12] },
    domains: ['work', 'team', 'purpose'],
    weight: 2,
    text: 'Your 12 path asks for both creative expression and cooperative partnership. As an introvert, the cooperative side is the harder one — not because you lack skill, but because the energy cost of sustained collaboration is higher for you. The practice: choose one collaborator, not five. Deep partnership with a single complementary person serves your 12 path better than broad networking. Your creativity needs a witness; your introversion needs that witness to be someone who already knows you.',
  },
  // ─── Head types × Sacral/Emotional authority ───
  {
    id: 'fr:ennea5-sacral',
    when: { enneaCore: [5], hdType: ['Generator', 'Manifesting Generator'] },
    domains: ['work', 'energy', 'growth'],
    weight: 2,
    text: 'Your Five pattern says "think before you engage." Your sacral authority says "respond from the gut, now." These are opposite timing systems. When you override the gut to gather more data, you miss windows that were open for you. When you follow the gut without understanding, you feel out of control. The practice: let the sacral respond first — yes or no — then give your mind thirty minutes to understand why. The sequence matters: body first, analysis second. The gut opens doors; the mind furnishes the room.',
  },
  {
    id: 'fr:ennea6-emotional',
    when: { enneaCore: [6], hdType: ['Generator', 'Manifesting Generator', 'Manifestor', 'Projector'] },
    domains: ['work', 'relationships', 'conflict'],
    weight: 2,
    text: 'Your Six vigilance scans for danger; emotional authority asks you to wait through a full emotional wave before deciding. The problem: anxiety peaks at the low point of the wave, and at that moment your Six says "act now, the worst case is coming." The practice: name the wave. When anxiety surges, say to yourself — or out loud — "I am at the bottom of the wave." Do not decide at the bottom. Wait for clarity, which arrives at the neutral point. Your vigilance is an asset; it is just miscalibrated to the wave\'s timing.',
  },
  // ─── J-types × 3-line profiles ───
  {
    id: 'fr:judging-profile3',
    when: { jung: ['INTJ', 'ENTJ', 'INFJ', 'ENFJ', 'ISTJ', 'ESTJ', 'ISFJ', 'ESFJ'] },
    domains: ['work', 'growth', 'purpose'],
    weight: 2,
    text: 'Your Judging preference craves closure, plans, and decided outcomes. If your Human Design carries a 3-line profile, your design learns through trial and error — which looks like broken plans, failed experiments, and false starts. This is not dysfunction; it is curriculum. The practice: build a "failure budget" — a certain number of experiments per quarter that are expected to not work. When you frame trial-and-error as a planned process, your J-preference can accommodate it without the anxiety of a broken plan.',
  },
  // ─── Generator energy × Enneagram withdrawal types ───
  {
    id: 'fr:generator-ennea5',
    when: { hdType: ['Generator'], enneaCore: [5] },
    domains: ['energy', 'work', 'team'],
    weight: 2,
    text: 'Your Generator sacral offers inexhaustible energy for the right work. Your Five pattern withdraws to conserve. The result: you have far more energy available than you allow yourself to use, because the Five gatekeeps access. You say no to protect reserves that are, in fact, self-renewing. The practice: when the sacral responds yes, trust it even if the Five protests the expenditure. Track your energy after saying yes — you will find that responding to genuine pull replenishes rather than depletes. Your tank is larger than the Five believes.',
  },
  // ─── Achiever drive × reflective design ───
  {
    id: 'fr:ennea3-reflector',
    when: { enneaCore: [3], hdType: ['Reflector'] },
    domains: ['work', 'purpose', 'energy'],
    weight: 3,
    text: 'Your Three drives toward measurable achievement. Your Reflector design samples the field and needs a full lunar cycle to reach clarity. The collision: you move at achiever speed on decisions your body needs twenty-eight days to process. The results look successful but feel hollow because they were not aligned with your actual reflection. The practice: for major career decisions, start the reflection twenty-eight days before the deadline. Give your Reflector the time it needs, and your Three will have a genuinely aligned target to pursue.',
  },
  // ─── Introverted sensing × Manifestor ───
  {
    id: 'fr:istj-manifestor',
    when: { jung: ['ISTJ', 'ISFJ'], hdType: ['Manifestor'] },
    domains: ['work', 'team'],
    weight: 2,
    text: 'Your sensing-judging preference builds stability; your Manifestor design disrupts it. You initiate change and then feel uncomfortable with the instability you created. Others see a reliable person who suddenly does something unexpected, then immediately returns to routine. The practice: plan your initiations. You will never be a spontaneous Manifestor, and you do not need to be. Schedule the disruption: "I will launch X in March." This lets your IS-J prepare the ground, and your Manifestor deliver the impact. Controlled disruption is still disruption.',
  },
  // ─── Enneagram 4 × Generator ───
  {
    id: 'fr:ennea4-generator',
    when: { enneaCore: [4], hdType: ['Generator', 'Manifesting Generator'] },
    domains: ['work', 'purpose', 'energy'],
    weight: 2,
    text: 'Your Four waits for inspiration. Your Generator sacral responds to what is present. The tension: you want the work to feel meaningful before you begin, but your design finds meaning through the doing, not before it. Waiting for the right feeling is a Four habit; responding to what is here is a Generator practice. The practice: start the work even when the inspiration is absent. Notice whether the sacral responds once you are in motion. The feeling you are waiting for often arrives mid-process, not as a prerequisite.',
  },
  // ─── Thinking type × Feeling enneagram ───
  {
    id: 'fr:thinking-ennea2',
    when: { jung: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'ISTJ', 'ISTP', 'ESTJ', 'ESTP'], enneaCore: [2] },
    domains: ['relationships', 'team', 'conflict'],
    weight: 2,
    text: 'Your thinking preference makes decisions through logic. Your Two core makes decisions through relational attunement. When these two systems disagree — the analysis says one thing, the heart says another — you experience a split that others mistake for inconsistency. The practice: give each system its turn. Ask: "What does the logic say?" Then: "What does the relationship need?" When the answers diverge, the friction itself is the information. You are not confused; you are holding two valid reads. The mature move is to name both before choosing.',
  },
];
