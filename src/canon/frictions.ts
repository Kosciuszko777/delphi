import type { FrictionRule } from './types';

/**
 * Friction rules — the soul of the Canon engine.
 *
 * Each rule fires when ALL listed conditions match the Wire.
 * Frictions name the tension between systems and give the person
 * something concrete to do with it.
 *
 * Phase A: 15 rules (1–15).
 * Phase C: 45+ rules (16–65), grouped by tension family.
 */
export const FRICTION_RULES: FrictionRule[] = [
  // ═══════════════════════════════════════════════════════════════
  // PHASE A — original 15 rules (unchanged)
  // ═══════════════════════════════════════════════════════════════

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

  // ═══════════════════════════════════════════════════════════════
  // PHASE C — 50 new rules
  // ═══════════════════════════════════════════════════════════════

  // ────────────────────────────────────────────
  // GROUP 1 — Assertive cores in waiting designs (weight 3)
  // ────────────────────────────────────────────

  // ennea 7 × Projector (options-hunger vs. focused mastery)
  {
    id: 'fr:ennea7-projector',
    when: { enneaCore: [7], hdType: ['Projector'] },
    domains: ['work', 'energy', 'growth'],
    weight: 3,
    text: 'Your Seven craves every open door; your Projector design thrives through focused mastery of one system at a time. The scatter that energizes your core exhausts a body that has no sacral motor to sustain it. The practice: keep a running list of interests, but commit publicly to only one per quarter. Let the Projector deepen while the Seven collects options for later. Depth first, breadth with whatever energy remains.',
  },
  // ennea 1 × Generator (perfection standard vs. gut response)
  {
    id: 'fr:ennea1-generator',
    when: { enneaCore: [1], hdType: ['Generator', 'Manifesting Generator'] },
    domains: ['work', 'energy', 'growth'],
    weight: 3,
    text: 'Your sacral says yes to what lights up; your inner critic has not approved it yet. The One standard and the Generator gut operate on different clocks — the gut is instant, the critic needs a review cycle. When you override the yes to run a quality check, the window often closes. The practice: follow the sacral response first, then let the critic refine what you committed to. Correct in motion, not before it. Your standards improve the work; they should not prevent its start.',
  },

  // ────────────────────────────────────────────
  // GROUP 2 — Withdrawn cores in initiating designs (weight 3)
  // ────────────────────────────────────────────

  // ennea 5 × Manifestor (hoarding energy vs. built to launch)
  {
    id: 'fr:ennea5-manifestor',
    when: { enneaCore: [5], hdType: ['Manifestor'] },
    domains: ['work', 'energy', 'team'],
    weight: 3,
    text: 'Your Five hoards energy for safety; your Manifestor design spends it in surges to start things the world has not asked for. The collision: you have the initiating impulse and then talk yourself out of spending the reserves. Projects live as private notes instead of public launches. The practice: set an energy budget per initiative — time-box the surge to three days, then rest. Your Five can tolerate expenditure when the scope is defined and the recovery is guaranteed.',
  },
  // ennea 4 × Manifestor (mood-gating the initiation engine)
  {
    id: 'fr:ennea4-manifestor',
    when: { enneaCore: [4], hdType: ['Manifestor'] },
    domains: ['work', 'purpose', 'energy'],
    weight: 3,
    text: 'Your Four gates every creative impulse through mood: the launch must feel authentic, the timing emotionally correct, the work resonant. Your Manifestor design does not care about resonance — it cares about impact. Waiting for the mood to align with the impulse means most impulses expire in the waiting room. The practice: separate the aesthetic from the initiation. Launch first in rough form; refine into beauty afterward. Your Manifestor starts; your Four polishes. The sequence matters.',
  },
  // ennea 9 × Manifestor (peace-seeking with impact-making design — anger that leaks)
  // Already exists as fr:ennea9-manifestor above.
  // ennea 6 × Manifestor (permission-seeking core, permission-free design)
  {
    id: 'fr:ennea6-manifestor',
    when: { enneaCore: [6], hdType: ['Manifestor'] },
    domains: ['work', 'team', 'conflict'],
    weight: 3,
    text: 'Your Six scans for authority to check with before acting; your Manifestor is designed to act without checking. The friction: you have the creative force to begin anything, and a vigilance loop that demands permission from a structure that your design is meant to bypass. The practice: write down the worst case before you launch, acknowledge it, and launch anyway. Your Six needs to see the danger named; your Manifestor needs the launch not to wait for approval. Name it, then move.',
  },
  // ennea 5 × Generator (conserving a renewable battery)
  // Already exists as fr:generator-ennea5 above.

  // ────────────────────────────────────────────
  // GROUP 3 — Head cores vs. body/emotional authorities (weight 2–3)
  // ────────────────────────────────────────────

  // ennea 5 × Sacral authority (analysis vs. gut) — covered by fr:ennea5-sacral
  // ennea 6 × Sacral authority
  {
    id: 'fr:ennea6-sacral',
    when: { enneaCore: [6], hdType: ['Generator', 'Manifesting Generator'] },
    domains: ['work', 'growth', 'energy'],
    weight: 2,
    text: 'Your Six wants certainty before committing; your sacral responds before certainty is possible. The gut says yes or no in the moment, and your vigilance immediately demands to know what could go wrong with that answer. The practice: let the sacral speak first, then give the Six exactly one hour to run its scenarios. If no disqualifying risk surfaces, hold the yes. Your gut is not naive — it reads signals your mind has not yet named.',
  },
  // ennea 7 × Sacral authority
  {
    id: 'fr:ennea7-sacral',
    when: { enneaCore: [7], hdType: ['Generator', 'Manifesting Generator'] },
    domains: ['work', 'energy', 'purpose'],
    weight: 2,
    text: 'Your Seven says yes to everything exciting; your sacral says yes only to what genuinely pulls. The distinction is subtle and critical: enthusiasm is mental, the sacral response is physical. You pursue options because they look good; your design needs them to feel right in the body. The practice: when the Seven lights up, pause and check the gut. A genuine sacral yes has a pull below the navel; a Seven yes lives in the head. Learn the difference and your commitments will finally stick.',
  },
  // ennea 5 × Emotional authority
  {
    id: 'fr:ennea5-emotional',
    when: { enneaCore: [5], hdAuthority: ['Emotional'] },
    domains: ['work', 'relationships', 'growth'],
    weight: 3,
    text: 'Your Five wants the answer now, backed by analysis. Your emotional authority says the answer is not available yet — clarity arrives only after riding the full wave. This is excruciating for a mind that equates speed with competence. The practice: set a decision window of forty-eight hours for anything significant. Log your feeling at three different points across the wave. Decide at the point of least emotional charge. Your mind provides the data; the wave provides the timing.',
  },
  // ennea 6 × Emotional authority
  // Already addressed in fr:ennea6-emotional above with broader type scope
  // ennea 1 × Emotional authority (moral clarity vs. emotional weather)
  {
    id: 'fr:ennea1-emotional',
    when: { enneaCore: [1], hdAuthority: ['Emotional'] },
    domains: ['conflict', 'relationships', 'growth'],
    weight: 2,
    text: 'Your One sees right and wrong with morning clarity; your emotional authority blurs the line with afternoon weather. A decision that felt morally obvious at the wave\'s peak feels uncertain at its trough, and you cannot tell whether the doubt is growth or weakness. The practice: notice whether your moral clarity shifts across the wave. If it holds at every point, it is principle. If it wavers, the certainty was mood, not ethics. Wait for the principle that survives the full cycle before you act on it.',
  },
  // ennea 8 × Splenic authority (force vs. the whisper that speaks once)
  {
    id: 'fr:ennea8-splenic',
    when: { enneaCore: [8], hdAuthority: ['Splenic'] },
    domains: ['conflict', 'work', 'relationships'],
    weight: 3,
    text: 'Your Eight pushes through with force; your splenic authority whispers once and does not repeat. The whisper says "not here, not now" and your Eight overrides it because backing down feels like weakness. The cost is decisions your body knew were wrong before your will committed. The practice: treat the first flash of physical knowing — the chill, the recoil, the quiet no — as data of equal rank to your conviction. The spleen is not timid. It is fast, and it has no volume knob.',
  },

  // ────────────────────────────────────────────
  // GROUP 4 — Jung × Millman finals (weight 2)
  // ────────────────────────────────────────────

  // introverted types (I--) × final 3 — already covered by fr:introvert-millman3

  // INTJ/INTP × final 2 (systems-mind vs. service-through-relationship)
  {
    id: 'fr:intx-millman2',
    when: { jung: ['INTJ', 'INTP'], millmanFinal: [2] },
    domains: ['relationships', 'team', 'growth'],
    weight: 2,
    text: 'Your analytical introversion builds systems in solitude; your 2 path asks you to serve through relationship and cooperation. The tension: service feels like interruption to a mind that works best alone, and cooperation costs energy your wiring conserves by default. The practice: choose one form of service that uses your systems-thinking — mentoring, reviewing, structuring another person\'s problem. You serve best through competence, not warmth. Let the 2 path meet you where your gifts already are.',
  },
  // E--P types × final 4 (spontaneity vs. the 4's need for process and foundation)
  {
    id: 'fr:ep-millman4',
    when: { jung: ['ENTP', 'ENFP', 'ESTP', 'ESFP'], millmanFinal: [4] },
    domains: ['work', 'growth', 'purpose'],
    weight: 2,
    text: 'Your perceiving extraversion thrives on spontaneity and new starts; your 4 path demands that you build foundations stone by stone. The spontaneous leap and the patient step are in constant negotiation. You start ten projects and finish the interesting third of each. The practice: choose one of the ten and commit to its boring middle for thirty days. Your 4 path does not need fewer ideas — it needs one idea carried to structural completion. That finished thing teaches you more than the ten beginnings.',
  },
  // ISTJ/ESTJ × final 5 (order-keepers with a freedom number)
  {
    id: 'fr:stj-millman5',
    when: { jung: ['ISTJ', 'ESTJ'], millmanFinal: [5] },
    domains: ['work', 'growth', 'purpose'],
    weight: 2,
    text: 'Your SJ preference builds structure, process, and repeatable order; your 5 path drives toward freedom through discipline. The tension: you crave the structure but your purpose is liberation from it — not its abolition, but its mastery to the point where it no longer constrains you. The practice: identify one rule you follow by habit and test whether it still serves. Your 5 path grows when the structure-builder learns which structures to keep and which to release.',
  },
  // F-types × final 8 (harmony preference vs. power material)
  {
    id: 'fr:feeling-millman8',
    when: { jung: ['INFJ', 'INFP', 'ISFJ', 'ISFP', 'ENFJ', 'ENFP', 'ESFJ', 'ESFP'], millmanFinal: [8] },
    domains: ['work', 'conflict', 'purpose'],
    weight: 2,
    text: 'Your feeling preference seeks harmony and reads the room for emotional impact; your 8 path carries power material — abundance, leadership, the capacity to marshal resources. The friction: wielding power feels like it risks the harmony you need. You soften your directives, hedge your authority, and lead from behind when the path asks you to lead from the front. The practice: give one directive this week without qualifying it. Notice that the relationship survives the clarity.',
  },
  // final 11 × any I-type (doubled creative charge in a contained vessel)
  {
    id: 'fr:introvert-millman11',
    when: { jung: ['INTJ', 'INTP', 'INFJ', 'INFP', 'ISTJ', 'ISFJ', 'ISTP', 'ISFP'], millmanFinal: [11] },
    domains: ['purpose', 'energy', 'growth'],
    weight: 2,
    text: 'The doubled one energy generates creative voltage at twice the standard intensity; your introverted vessel contains it rather than broadcasting it. The charge builds until it either produces something remarkable or collapses into paralysis. There is no medium setting. The practice: establish a daily creative release — one sentence, one sketch, one recording — that lowers the pressure before it becomes unmanageable. Your 11 path needs output the way a boiler needs a valve.',
  },

  // ────────────────────────────────────────────
  // GROUP 5 — Jung × HD (weight 2)
  // ────────────────────────────────────────────

  // J-types × 3-line profiles — already exists as fr:judging-profile3

  // J-types × Reflector (planning vs. lunar sampling)
  {
    id: 'fr:judging-reflector',
    when: { jung: ['INTJ', 'ENTJ', 'INFJ', 'ENFJ', 'ISTJ', 'ESTJ', 'ISFJ', 'ESFJ'], hdType: ['Reflector'] },
    domains: ['work', 'purpose', 'growth'],
    weight: 2,
    text: 'Your judging preference decides early and holds the plan; your Reflector design needs a full lunar cycle to know what is actually yours. Committing on the first read means committing to the room\'s opinion, not your own. The practice: build a twenty-eight-day decision buffer into any plan that matters. Your J-preference can still structure the evaluation period — give it a calendar and checkpoints. Planning the wait is still planning.',
  },
  // P-types × Manifestor (open options vs. the design's need to inform before acting)
  {
    id: 'fr:perceiving-manifestor',
    when: { jung: ['INTP', 'ENTP', 'INFP', 'ENFP', 'ISTP', 'ESTP', 'ISFP', 'ESFP'], hdType: ['Manifestor'] },
    domains: ['work', 'team', 'relationships'],
    weight: 2,
    text: 'Your perceiving preference keeps options open and decisions reversible; your Manifestor design initiates with a force that closes options for everyone in the blast radius. You start things on impulse and forget to inform, because informing feels like a premature commitment to a mind that prefers to stay loose. The practice: inform without committing to the outcome. "I am exploring X" is enough. Your Manifestor needs the launch; your P-preference can keep the destination flexible.',
  },
  // E-types × Projector (social appetite vs. bitter-when-unseen mechanic)
  {
    id: 'fr:extrovert-projector',
    when: { jung: ['ENTJ', 'ENTP', 'ENFJ', 'ENFP', 'ESTJ', 'ESTP', 'ESFJ', 'ESFP'], hdType: ['Projector'] },
    domains: ['team', 'work', 'relationships'],
    weight: 2,
    text: 'Your extraverted nature moves toward people; your Projector design waits for people to move toward you. You enter rooms with energy, offer insight freely, and wonder why the reception is cool when the same observation from a Generator would have been welcomed. The practice: enter with presence instead of output. Let the room notice you before you contribute. Your extraversion provides the visibility your Projector needs — but visibility must precede the offering, not arrive stapled to it.',
  },
  // T-dominant × Emotional authority (logic now vs. wave later)
  {
    id: 'fr:thinking-emotional',
    when: { jung: ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'ISTJ', 'ISTP', 'ESTJ', 'ESTP'], hdAuthority: ['Emotional'] },
    domains: ['work', 'relationships', 'conflict'],
    weight: 2,
    text: 'Your thinking preference reaches conclusions through logic and wants the answer now. Your emotional authority says the answer will be clear only after the wave passes — hours or days later. Forcing the logical conclusion before the emotional clarity arrives produces decisions that are analytically sound and personally wrong. The practice: do the analysis immediately, then shelve the conclusion for twenty-four hours. If the feeling and the logic still agree, act. If they diverge, trust the wave over the spreadsheet.',
  },

  // ────────────────────────────────────────────
  // GROUP 6 — Wing and intra-system tensions (weight 1–2)
  // ────────────────────────────────────────────

  // 8w9 (the punch pulled at the last moment)
  {
    id: 'fr:wing-8w9',
    when: { enneaCore: [8], enneaWing: [9] },
    domains: ['conflict', 'relationships', 'team'],
    weight: 2,
    text: 'Your Eight charges toward confrontation; your Nine wing pulls the punch at the last moment. The result is intensity that arrives and then suddenly deflates, leaving the other person braced for impact that never lands. Over time you build a reputation for being formidable but unreliable in conflict. The practice: decide before the conversation whether this is a confrontation or a negotiation. Confront fully or negotiate openly — the half-swing serves neither the Eight\'s clarity nor the Nine\'s peace.',
  },
  // 1w2 (the critic who needs to be needed)
  {
    id: 'fr:wing-1w2',
    when: { enneaCore: [1], enneaWing: [2] },
    domains: ['relationships', 'team', 'work'],
    weight: 2,
    text: 'Your One holds every situation to a standard; your Two wing wants to be needed by the people in it. The friction: you correct people you love, and the correction costs you the closeness the Two craves. Your help arrives as criticism, and the warmth behind it is invisible. The practice: lead with the caring before the correction. "I am saying this because I want this to work for you" spoken first turns the critique from judgment into investment.',
  },
  // 4w3 (authenticity vs. audience)
  {
    id: 'fr:wing-4w3',
    when: { enneaCore: [4], enneaWing: [3] },
    domains: ['purpose', 'work', 'relationships'],
    weight: 2,
    text: 'Your Four demands authenticity; your Three wing wants the audience to see it. The tension: you create from a genuine place and then shape the presentation to land well, and afterward you cannot tell whether the work was honest or performed. This doubt is the friction itself, and it does not resolve. The practice: create first for the Four — raw, private, true. Then let the Three polish it for the world. Separate the drafts. The authentic version exists even after the performance version ships.',
  },
  // 7w8 (escape armed with force)
  {
    id: 'fr:wing-7w8',
    when: { enneaCore: [7], enneaWing: [8] },
    domains: ['conflict', 'energy', 'work'],
    weight: 1,
    text: 'Your Seven escapes discomfort; your Eight wing does so with force. Where a core Seven changes the subject, you change the room — bulldozing past the uncomfortable topic rather than simply reframing it. Others experience this as aggression when it is actually avoidance at high velocity. The practice: when the impulse to power through arrives, check whether you are advancing or fleeing. If fleeing, stop for five minutes and name what you are avoiding.',
  },
  // 5w4 (the analyst flooded by the aesthete)
  {
    id: 'fr:wing-5w4',
    when: { enneaCore: [5], enneaWing: [4] },
    domains: ['energy', 'purpose', 'relationships'],
    weight: 2,
    text: 'Your Five observes from a safe distance; your Four wing floods the observation deck with feeling. The tension: you want detached clarity and receive emotional intensity you did not invite. The analysis breaks down when the aesthete takes over, and you retreat further to regain control — which cuts you off from the very data the Four was providing. The practice: let the emotion arrive without labelling it a malfunction. Note it alongside the analysis. Your deepest insights will come from the moments when both systems speak at once.',
  },
  // 3w2 (achievement wearing service's face)
  {
    id: 'fr:wing-3w2',
    when: { enneaCore: [3], enneaWing: [2] },
    domains: ['team', 'relationships', 'work'],
    weight: 1,
    text: 'Your Three drives for recognition; your Two wing frames the drive as service. You help people — genuinely — but the help is also a performance metric, and when it goes unacknowledged the resentment reveals the scorecard underneath. The practice: track one act of service this week and ask honestly whether you would have done it if no one would ever know. The answer is not an indictment — it is information about where your service ends and your ambition begins.',
  },
  // 9w8 (the volcano under the meadow)
  {
    id: 'fr:wing-9w8',
    when: { enneaCore: [9], enneaWing: [8] },
    domains: ['conflict', 'relationships', 'energy'],
    weight: 2,
    text: 'Your Nine maintains the meadow — calm, accommodating, easy. Your Eight wing holds the volcano underneath. The anger is real and proportional; its expression is delayed until the Nine can no longer contain it, at which point it arrives with a force that shocks everyone, including you. The practice: express one small friction per day before it becomes a large one. The Eight\'s fire, vented in measured amounts, prevents the eruption that costs the Nine its peace.',
  },
  // 6w5 (doubt that isolates instead of asking)
  {
    id: 'fr:wing-6w5',
    when: { enneaCore: [6], enneaWing: [5] },
    domains: ['relationships', 'team', 'work'],
    weight: 1,
    text: 'Your Six doubts; your Five wing withdraws to research the doubt alone. Instead of asking the person whether the threat is real, you analyse privately until the conclusion hardens into certainty — often a certainty that was never checked against reality. The practice: before the third hour of private analysis, ask one clarifying question of the person involved. "Did you mean X?" takes ten seconds and prevents the spiral that your Six-Five combination can sustain for days.',
  },

  // ────────────────────────────────────────────
  // GROUP 7 — Millman × HD (weight 1–2)
  // ────────────────────────────────────────────

  // final 1 × Projector (creative urgency vs. waiting)
  {
    id: 'fr:millman1-projector',
    when: { millmanFinal: [1], hdType: ['Projector'] },
    domains: ['purpose', 'work', 'energy'],
    weight: 2,
    text: 'Your 1 path burns with creative urgency — the idea must exist now and it must bear your signature. Your Projector design says wait for the invitation. The urgency and the wait occupy the same moment, and the result is creative frustration that feels personal but is structural. The practice: create the work in private on your own clock, then let it be discovered on the Projector\'s clock. The 1 creates; the Projector distributes through recognition. Separate the making from the showing.',
  },
  // final 8 × Generator (power goals vs. response-led work)
  {
    id: 'fr:millman8-generator',
    when: { millmanFinal: [8], hdType: ['Generator', 'Manifesting Generator'] },
    domains: ['work', 'purpose', 'team'],
    weight: 2,
    text: 'Your 8 path sees empires; your Generator design builds only what the sacral responds to. The empire must be responded to, not decreed — and that means the grand plan must arrive in pieces, each validated by a gut yes. When you force the vision without sacral buy-in, the energy disappears midway and the project stalls with infrastructure but no life. The practice: present each phase to your gut as a fresh question. The empire that survives the sacral filter is the one you will actually finish.',
  },
  // final 6 × Manifestor (the visionary's disappointment with the real)
  {
    id: 'fr:millman6-manifestor',
    when: { millmanFinal: [6], hdType: ['Manifestor'] },
    domains: ['work', 'purpose', 'conflict'],
    weight: 2,
    text: 'Your 6 path holds a vision of how things should be; your Manifestor launches things into how things are. The gap between the ideal you envisioned and the imperfect thing you launched triggers the 6\'s disappointment reflex — and since you launched it, the disappointment is with yourself. The practice: set two standards, one for launch and one for the finished product. Your Manifestor initiates at good enough; your 6 polishes toward the ideal over time. Perfection is a direction, not a prerequisite.',
  },
  // final 9 × Reflector (integrity questions in a mirroring design)
  {
    id: 'fr:millman9-reflector',
    when: { millmanFinal: [9], hdType: ['Reflector'] },
    domains: ['purpose', 'relationships', 'growth'],
    weight: 2,
    text: 'Your 9 path teaches through example and demands alignment between values and action. Your Reflector design mirrors whatever environment it enters, making it genuinely difficult to distinguish your own integrity from the group\'s norms. You may live by standards you sampled rather than chose. The practice: spend one day per month in complete solitude and ask what standards remain when no group is present. The values that survive the isolation are yours. Build your exemplar path from those.',
  },

  // ────────────────────────────────────────────
  // ADDITIONAL SHARP COMBINATIONS
  // ────────────────────────────────────────────

  // ennea 7 × Reflector (sampling excitement vs. sampling everything)
  {
    id: 'fr:ennea7-reflector',
    when: { enneaCore: [7], hdType: ['Reflector'] },
    domains: ['energy', 'purpose', 'growth'],
    weight: 2,
    text: 'Your Seven craves new experiences; your Reflector design samples every experience the environment offers, with no filter for what is yours. The result: you feel enthusiastic about everything and certain about nothing, because the enthusiasm might be borrowed from whoever stood beside you. The practice: wait twenty-eight days before committing to any enthusiasm. The ones that survive a full lunar cycle without refreshment from the source are genuinely yours. The rest were field readings.',
  },
  // ennea 1 × Projector (standards without invitation)
  {
    id: 'fr:ennea1-projector',
    when: { enneaCore: [1], hdType: ['Projector'] },
    domains: ['team', 'work', 'conflict'],
    weight: 2,
    text: 'Your One sees what needs correcting; your Projector must wait to be asked before correcting it. The standard is visible to you and invisible to the room, and the gap produces an irritation that builds daily. When you finally speak uninvited, the correction lands as criticism from someone without standing. The practice: make the standard visible in your own work first. When others see the result and ask how, you are invited. Your standards enter the room through demonstration, not inspection.',
  },
  // ennea 2 × Projector (giving vs. waiting for recognition)
  {
    id: 'fr:ennea2-projector',
    when: { enneaCore: [2], hdType: ['Projector'] },
    domains: ['relationships', 'team', 'energy'],
    weight: 2,
    text: 'Your Two gives before being asked; your Projector is designed to be asked before giving. The result: you offer help that arrives uninvited, the other person feels managed rather than supported, and you feel unrecognised despite your effort. The friction is in the sequence, not the generosity. The practice: state what you can offer, then wait. "I see something that might help — would you like to hear it?" transforms unsolicited aid into an invitation your Projector can correctly accept.',
  },
  // ennea 3 × Generator (image-crafting vs. sacral honesty)
  {
    id: 'fr:ennea3-generator',
    when: { enneaCore: [3], hdType: ['Generator', 'Manifesting Generator'] },
    domains: ['work', 'purpose', 'energy'],
    weight: 2,
    text: 'Your Three adapts to what the room rewards; your Generator sacral responds to what is genuinely alive. These are different signals. The Three commits to the impressive project; the sacral commits to the one that lights up. When they diverge, you work hard on something that earns applause but drains the body. The practice: before your next commitment, check both systems. Does the room want it? Does the gut want it? Pursue only the projects where both answers are yes.',
  },
  // ennea 4 × Projector (identity-crisis in the wait)
  {
    id: 'fr:ennea4-projector',
    when: { enneaCore: [4], hdType: ['Projector'] },
    domains: ['purpose', 'work', 'relationships'],
    weight: 2,
    text: 'Your Four seeks identity through expression; your Projector receives identity through recognition. The wait for the invitation feels to the Four like being unseen — the core wound — and the pain of that reinforces the belief that you are fundamentally different from everyone who seems to belong. The practice: create during the wait, not about the wait. Your art does not need to be about longing; it can be about mastery. What you build in the waiting becomes the credential for the invitation.',
  },
  // ennea 9 × Generator (inertia in a responsive engine)
  {
    id: 'fr:ennea9-generator',
    when: { enneaCore: [9], hdType: ['Generator', 'Manifesting Generator'] },
    domains: ['energy', 'work', 'purpose'],
    weight: 2,
    text: 'Your Generator sacral has enormous energy available; your Nine default is to let it idle. The sacral responds yes, and then the Nine comfortable numbness absorbs the signal before it reaches action. You know what you want to do and do not do it, and the gap fills with low-grade frustration that looks like contentment. The practice: pair the sacral yes with immediate physical movement — stand up, open the document, dial the number. Your Nine stalls in deliberation; the body, once moving, carries the Nine past the threshold.',
  },
  // ENTP/ENFP × Manifestor (the idea fountain meets the force launcher)
  {
    id: 'fr:enp-manifestor',
    when: { jung: ['ENTP', 'ENFP'], hdType: ['Manifestor'] },
    domains: ['work', 'team', 'energy'],
    weight: 1,
    text: 'Your ENP generates ideas at a rate that delights everyone; your Manifestor launches them with a force that commits everyone. The combination means you start things at industrial scale before the idea has been tested, and the people caught in the wake bear the cost of your pivots. The practice: impose a forty-eight-hour hold between idea and launch. If the excitement survives two sleeps, it has earned your Manifestor\'s force. Your ideas deserve selection, not just expression.',
  },
  // INTJ × Projector (the architect who must wait for the client)
  {
    id: 'fr:intj-projector',
    when: { jung: ['INTJ'], hdType: ['Projector'] },
    domains: ['work', 'team', 'purpose'],
    weight: 2,
    text: 'Your INTJ designs systems in solitude and knows they are correct. Your Projector must wait for someone to ask for the design. The friction is not competence — it is distribution. Brilliant work offered uninvited becomes unwanted advice, and the INTJ concludes the world is too foolish to recognise it. The practice: make the work visible in a form that attracts inquiry — a document, a prototype, a result someone else can see. The Projector is not passive; it is strategic about when to reveal.',
  },
  // Feeling types × Splenic authority (warmth vs. the cold instant no)
  {
    id: 'fr:feeling-splenic',
    when: { jung: ['INFJ', 'INFP', 'ISFJ', 'ISFP', 'ENFJ', 'ENFP', 'ESFJ', 'ESFP'], hdAuthority: ['Splenic'] },
    domains: ['relationships', 'conflict', 'growth'],
    weight: 2,
    text: 'Your feeling preference navigates by empathy and relational impact; your splenic authority delivers a split-second survival read that cares about neither. The spleen says "leave now" and the feeler says "but they need me." The practice: honor the splenic flash first — it does not repeat and it is never wrong about safety. You can return to tend the relationship after you have followed the body\'s instruction. The spleen protects you; the feeling function protects the relationship. Protection of self must precede the other.',
  },
  // ENTJ × Generator (commander in a responsive body)
  {
    id: 'fr:entj-generator',
    when: { jung: ['ENTJ'], hdType: ['Generator', 'Manifesting Generator'] },
    domains: ['work', 'team', 'purpose'],
    weight: 2,
    text: 'Your ENTJ decides and commands; your Generator design responds and follows what lights up. The tension: you know what should happen, but your body will only power what it chose to respond to. When you override the sacral to execute the strategic plan, the energy runs out before the plan does. The practice: present your strategic options to the gut as questions. "This project?" Yes or no. The ENTJ selects the portfolio; the sacral funds the individual positions. Lead your energy instead of conscripting it.',
  },
  // INFJ × Manifestor (the counselor who must initiate instead of guide)
  {
    id: 'fr:infj-manifestor',
    when: { jung: ['INFJ'], hdType: ['Manifestor'] },
    domains: ['purpose', 'relationships', 'team'],
    weight: 2,
    text: 'Your INFJ sees what people could become and waits to be trusted with the vision. Your Manifestor design does not wait — it launches the vision into the world and deals with the reactions afterward. The counselor who initiates startles people who expected gentleness, and the anger that Manifestors naturally carry unsettles an INFJ who identifies with harmony. The practice: inform with warmth. "I am going to do X because I see Y" uses the INFJ insight to soften the Manifestor launch. Both gifts land when deployed together.',
  },
  // ennea 5 × Projector (double waiting — hoarding + invitation)
  {
    id: 'fr:ennea5-projector',
    when: { enneaCore: [5], hdType: ['Projector'] },
    domains: ['work', 'team', 'energy'],
    weight: 2,
    text: 'Your Five conserves by withdrawing; your Projector waits for the invitation. Together, they produce a person who has extraordinary insight and almost never shares it — because the Five withholds and the Projector waits, and neither system initiates the disclosure. The practice: make your expertise discoverable. A written body of work, a public profile, a visible portfolio — something that works while you rest. Your knowledge cannot help anyone from inside your head, and the invitation cannot arrive if no one knows you have it.',
  },
  // ennea 7 × Generator (scattering the sacral across too many yeses)
  {
    id: 'fr:ennea7-generator',
    when: { enneaCore: [7], hdType: ['Generator', 'Manifesting Generator'] },
    domains: ['energy', 'work', 'growth'],
    weight: 2,
    text: 'Your Seven says yes to everything bright and new; your Generator sacral says yes to everything alive. Together, you are the person with twenty-seven active projects and no finish line in sight, genuinely energised by all of them and completing none. The practice: rank your sacral yeses by body intensity. The three strongest get your weekdays; the rest go on a waiting list reviewed monthly. Your Generator energy is vast but not infinite, and even a renewable battery drains when split twenty-seven ways.',
  },
  // ennea 6 × Projector (vigilance without standing)
  {
    id: 'fr:ennea6-projector',
    when: { enneaCore: [6], hdType: ['Projector'] },
    domains: ['team', 'work', 'conflict'],
    weight: 2,
    text: 'Your Six spots the risk before anyone else in the room; your Projector must wait to be asked before naming it. The worst case is visible to you and invisible to everyone else, and you are not allowed to shout fire until invited. The frustration is real, and it can curdle into the bitter energy that erodes Projector recognition. The practice: frame the warning as a question. "Has anyone considered what happens if X?" invites rather than declares, and lets your vigilance contribute without overstepping.',
  },
  // ennea 8 × Generator (dominance in a responsive design)
  {
    id: 'fr:ennea8-generator',
    when: { enneaCore: [8], hdType: ['Generator', 'Manifesting Generator'] },
    domains: ['work', 'team', 'conflict'],
    weight: 2,
    text: 'Your Eight takes command; your Generator design responds to what the gut selects. The friction: you want to direct the room but your body only powers what it genuinely responded to, which may not be the thing you decided to pursue. Forcing the sacral to fund the Eight\'s ambition produces work that looks powerful and feels hollow. The practice: let the gut lead the strategy. Where the sacral responds with genuine energy, your Eight\'s force becomes unstoppable. Where it does not, no amount of will fills the deficit.',
  },
  // ennea 4 × Reflector (depth-seeking in a mirroring vessel)
  {
    id: 'fr:ennea4-reflector',
    when: { enneaCore: [4], hdType: ['Reflector'] },
    domains: ['purpose', 'relationships', 'energy'],
    weight: 2,
    text: 'Your Four searches for a stable, unique identity; your Reflector mirrors the identity of whatever group it inhabits. The result: you feel deeply but cannot tell which feelings are yours, and the Four\'s signature question — "Who am I?" — receives a different answer depending on the room. The practice: track your emotional state across a full month and mark which feelings persist in solitude. Those are yours. The Reflector samples the world; the Four keeps what resonates as self.',
  },
  // final 11 × Manifestor (doubled creative charge with initiating force)
  {
    id: 'fr:millman11-manifestor',
    when: { millmanFinal: [11], hdType: ['Manifestor'] },
    domains: ['purpose', 'work', 'energy'],
    weight: 2,
    text: 'Your 11 path generates creative voltage at double intensity; your Manifestor launches with force. The combination produces explosive creative output — and explosive creative doubt immediately afterward. You initiate brilliantly and then second-guess whether the brilliance was real, potentially dismantling what you launched before anyone has time to receive it. The practice: impose a seventy-two-hour moratorium on reversals after any launch. Let the work exist in the world long enough for feedback that is not your own doubt.',
  },
  // ennea 3 × Manifestor (performing while initiating — the overbuilt launch)
  {
    id: 'fr:ennea3-manifestor',
    when: { enneaCore: [3], hdType: ['Manifestor'] },
    domains: ['work', 'team', 'purpose'],
    weight: 2,
    text: 'Your Three optimises for audience; your Manifestor just needs to start. The tension: you over-build the launch to ensure it impresses, which delays the initiation your design needs. What should have been a quick start becomes a production, and the energy window closes before opening night. The practice: launch ugly and polish live. Your Manifestor starts things; your Three makes them shine — but the shine comes second, or the thing never starts at all.',
  },
  // final 2 × Manifestor (service path with an autonomy engine)
  {
    id: 'fr:millman2-manifestor',
    when: { millmanFinal: [2], hdType: ['Manifestor'] },
    domains: ['relationships', 'team', 'purpose'],
    weight: 1,
    text: 'Your 2 path learns cooperation; your Manifestor design operates alone and informs afterward. The tension: your purpose asks you to build with others, but your design acts first and asks later, which undermines the cooperation before it begins. The practice: inform one partner before each initiative — not for approval, but as the cooperative gesture your path is developing. Your Manifestor does not need permission; your 2 path needs the practice of including others in the journey.',
  },
  // final 5 × Projector (freedom path in a waiting design)
  {
    id: 'fr:millman5-projector',
    when: { millmanFinal: [5], hdType: ['Projector'] },
    domains: ['work', 'purpose', 'energy'],
    weight: 1,
    text: 'Your 5 path craves freedom through mastered discipline; your Projector waits for recognition before the discipline finds its stage. You may master a craft in private and feel imprisoned by the obscurity — the freedom you sought is real, but invisible. The practice: document the mastery publicly as you build it. A public log, a portfolio, a teaching record. The Projector\'s invitation follows visibility, and the 5 path\'s freedom arrives when mastery is both deep and seen.',
  },
  // ISFP × Generator (quiet artist with a workhorse engine)
  {
    id: 'fr:isfp-generator',
    when: { jung: ['ISFP'], hdType: ['Generator', 'Manifesting Generator'] },
    domains: ['purpose', 'work', 'energy'],
    weight: 1,
    text: 'Your ISFP creates quietly, privately, in the margins of the day. Your Generator sacral has the energy of a workhorse and wants to be used fully. The tension: the art wants discretion and the body wants committed output, and you default to the discretion, leaving the sacral chronically under-employed on creative work. The practice: give the sacral one creative project that demands sustained effort. Commit the workhorse to the art. Your body will thank you with energy you did not know it had.',
  },
  // final 3 × Reflector (expression needs an audience; the audience shifts monthly)
  {
    id: 'fr:millman3-reflector',
    when: { millmanFinal: [3], hdType: ['Reflector'] },
    domains: ['purpose', 'work', 'growth'],
    weight: 1,
    text: 'Your 3 path requires expressive output; your Reflector shifts with the lunar cycle, meaning the voice you express with changes shape every few weeks. What felt true to say at the new moon feels foreign at the full. The practice: write or record regularly across the full cycle, and publish only the themes that recur across multiple cycles. Your 3 path needs expression; your Reflector needs the expression to survive the rotation before it is declared authentic.',
  },
  // ennea 2 × Generator (giving the sacral's energy away)
  {
    id: 'fr:ennea2-generator',
    when: { enneaCore: [2], hdType: ['Generator', 'Manifesting Generator'] },
    domains: ['energy', 'relationships', 'work'],
    weight: 1,
    text: 'Your Generator has abundant sacral energy; your Two gives it away before checking whether the expenditure was genuine or reflexive. The sacral said yes to the work, and the Two redirected the energy to someone else\'s need. You end each day exhausted not from your own pursuits but from others\'. The practice: complete your own sacral-responded task before responding to the next request. Your generosity lands better when it runs on surplus, not on capital meant for your own work.',
  },
  // final 7 × Manifestor (inner trust meets outer launch)
  {
    id: 'fr:millman7-manifestor',
    when: { millmanFinal: [7], hdType: ['Manifestor'] },
    domains: ['purpose', 'work', 'growth'],
    weight: 1,
    text: 'Your 7 path learns to trust inner knowing that cannot be proven; your Manifestor launches into the world where proof is demanded. The tension: you initiate based on intuition and then face external challenge you cannot logically defend. The practice: trust the intuition for the launch decision, and let the results build the evidence. Your Manifestor does not need to explain why it started; it needs to show what it started. The intuition is validated by the outcome, not by the argument.',
  },
];
