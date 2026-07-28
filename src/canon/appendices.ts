/**
 * Canon appendices — wing modifiers, authority fragments, and profile fragments.
 *
 * These are shorter (30–60 words) supplementary texts that can be appended
 * to a reading when the Wire carries the relevant detail. They follow the
 * same register: second person, no exclamation marks, concrete final sentence.
 */

// ═══════════════════════════════════════════════════════════════
// Wing modifiers (18) — one per valid core-wing combination
// ═══════════════════════════════════════════════════════════════

export interface WingModifier {
  id: string;
  core: number;
  wing: number;
  text: string;
}

export const WING_MODIFIERS: WingModifier[] = [
  {
    id: 'wing:1w9',
    core: 1, wing: 9,
    text: 'Your Nine wing softens the One\'s critical edge with patience and receptivity. Where the pure One insists, you consider. The risk: you delay correction until the moment passes. Notice when patience becomes avoidance and speak before the standard erodes.',
  },
  {
    id: 'wing:1w2',
    core: 1, wing: 2,
    text: 'Your Two wing bends the One\'s standards toward people. You correct because you care, and the caring is genuine — but the correction still lands as judgment. Lead with the care before the standard. Say what you want for the person before you say what you want from them.',
  },
  {
    id: 'wing:2w1',
    core: 2, wing: 1,
    text: 'Your One wing adds ethical rigor to the Two\'s generosity. You give with standards attached — the help must be right, not just warm. Watch for the moment when the standard becomes a condition on your love. Generosity with strings is a contract, not a gift.',
  },
  {
    id: 'wing:2w3',
    core: 2, wing: 3,
    text: 'Your Three wing adds ambition to the Two\'s attunement. You help strategically — drawn to the people whose success reflects well on you. This is not cynicism; it is wiring. Notice who you help when there is no audience and invest there deliberately.',
  },
  {
    id: 'wing:3w2',
    core: 3, wing: 2,
    text: 'Your Two wing softens the Three\'s competitive edge with genuine warmth. You achieve through people and for people, and the relational investment is real. Watch for the moment when the warmth becomes a tactic. Track one relationship this week where your care has no professional payoff.',
  },
  {
    id: 'wing:3w4',
    core: 3, wing: 4,
    text: 'Your Four wing adds depth to the Three\'s polish. You achieve, but you also need the achievement to mean something personal. The friction: the market rewards the polished version while the Four insists on the authentic one. Find one project where both standards can coexist.',
  },
  {
    id: 'wing:4w3',
    core: 4, wing: 3,
    text: 'Your Three wing gives the Four\'s intensity a stage. You feel deeply and present beautifully, and the presentation sometimes replaces the feeling. After your next public expression, sit quietly and ask what you actually felt, not what you showed.',
  },
  {
    id: 'wing:4w5',
    core: 4, wing: 5,
    text: 'Your Five wing deepens the Four\'s already considerable depth with analytical distance. You observe your own emotions with precision, which can become a way of experiencing them at a remove. Let one feeling this week arrive without narrating it.',
  },
  {
    id: 'wing:5w4',
    core: 5, wing: 4,
    text: 'Your Four wing colors the Five\'s analysis with aesthetic and emotional sensitivity. You are not just a researcher — you are a researcher who feels. The data includes beauty and pain alongside facts. Let that breadth of input shape your conclusions, not just your footnotes.',
  },
  {
    id: 'wing:5w6',
    core: 5, wing: 6,
    text: 'Your Six wing adds loyalty and practical concern to the Five\'s detachment. You research not only to know but to protect. Your analysis serves the group, even when the group does not know it. Share one finding this week with someone it would help.',
  },
  {
    id: 'wing:6w5',
    core: 6, wing: 5,
    text: 'Your Five wing turns the Six\'s vigilance into private analysis. You research threats instead of voicing them, which prevents panic but also prevents help. Before the third hour of private investigation, ask one person whether the concern is real.',
  },
  {
    id: 'wing:6w7',
    core: 6, wing: 7,
    text: 'Your Seven wing lightens the Six\'s heaviness with humor and possibility-seeking. You scan for danger and immediately look for the escape route, which makes you both anxious and resourceful. Channel the optimism into contingency planning — your best plans include both the risk and the way out.',
  },
  {
    id: 'wing:7w6',
    core: 7, wing: 6,
    text: 'Your Six wing anchors the Seven\'s flight with a thread of responsibility. You seek adventure but check the safety rating first. This is a strength: you are not reckless. Trust the responsible voice without letting it cancel the adventure entirely.',
  },
  {
    id: 'wing:7w8',
    core: 7, wing: 8,
    text: 'Your Eight wing gives the Seven\'s enthusiasm a forceful engine. You pursue pleasure and freedom with intensity, and when the world obstructs either, you push through rather than around. Check whether the force is advancing toward something or fleeing from something before you apply it.',
  },
  {
    id: 'wing:8w7',
    core: 8, wing: 7,
    text: 'Your Seven wing adds appetite and charm to the Eight\'s force. You command rooms and entertain them simultaneously. The risk: the entertainment becomes a softer form of control. Notice when your humor is a tool for keeping the room aligned with your agenda.',
  },
  {
    id: 'wing:8w9',
    core: 8, wing: 9,
    text: 'Your Nine wing gives the Eight\'s intensity a slower, more contained delivery. You lead with quiet authority rather than volume — until the line is crossed, and then the force arrives without warning. Practice graduated responses so the shift from calm to full power does not blindside the room.',
  },
  {
    id: 'wing:9w8',
    core: 9, wing: 8,
    text: 'Your Eight wing holds the anger the Nine surface conceals. The peace is genuine; so is the volcanic force beneath it. Small frictions handled daily prevent the eruption. Voice one preference today before the preference becomes a grievance.',
  },
  {
    id: 'wing:9w1',
    core: 9, wing: 1,
    text: 'Your One wing adds quiet principle to the Nine\'s accommodation. You keep the peace, but you keep it to a standard — and the standard can become rigid under the surface. Ask whether your commitment to harmony is genuine or a principled stubbornness wearing peace\'s face.',
  },
];

// ═══════════════════════════════════════════════════════════════
// Authority fragments (7) — one per HD authority type
// ═══════════════════════════════════════════════════════════════

export interface AuthorityFragment {
  id: string;
  authority: string;
  text: string;
}

export const AUTHORITY_FRAGMENTS: AuthorityFragment[] = [
  {
    id: 'auth:Emotional',
    authority: 'Emotional',
    text: 'Your decisions arrive on a wave. Clarity is never in the peak and never in the trough — it is at the calm point between them. The practice: for any significant decision, check your answer at three different emotional moments across forty-eight hours. Decide only when the answer stabilizes.',
  },
  {
    id: 'auth:Sacral',
    authority: 'Sacral',
    text: 'Your authority speaks through the gut — a visceral yes or no that precedes thought. It does not explain; it responds. The practice: ask yourself yes-or-no questions and notice the body\'s first reaction before the mind constructs a rationale. That first pull is your authority.',
  },
  {
    id: 'auth:Splenic',
    authority: 'Splenic',
    text: 'Your authority is a single, instantaneous flash — a body-level knowing that speaks once and does not repeat. It arrives as a chill, a contraction, a wordless certainty. The practice: when the flash comes, follow it immediately. Deliberation does not improve splenic knowing; it erodes it.',
  },
  {
    id: 'auth:Ego',
    authority: 'Ego',
    text: 'Your authority sits in willpower and commitment. When you say "I will" and mean it in the body, the path is correct. When the will is absent, no amount of reasoning can substitute. The practice: before committing, ask "Do I have the will for this?" The heart answers honestly; notice whether the yes carries weight or is only words.',
  },
  {
    id: 'auth:Self-Projected',
    authority: 'Self-Projected',
    text: 'Your authority clarifies through speaking. You do not know what you think until you hear yourself say it. The practice: talk through important decisions with a trusted listener — not for their advice, but for the sound of your own voice finding direction. The clarity is in the speaking, not in the feedback.',
  },
  {
    id: 'auth:Environment',
    authority: 'Environment',
    text: 'Your authority reads the space around you. Certain places produce clarity; others produce fog. The practice: when facing a decision, change your physical environment and notice how the answer shifts. The place where the decision feels simplest is the environment your authority trusts.',
  },
  {
    id: 'auth:Lunar',
    authority: 'Lunar',
    text: 'Your authority operates on a twenty-eight-day cycle. Major decisions need a full rotation of the moon to reveal their shape. What feels certain on day three may reverse by day twenty. The practice: for anything significant, begin the deliberation and mark the calendar twenty-eight days out. Decide then.',
  },
];

// ═══════════════════════════════════════════════════════════════
// Profile fragments (12) — one per HD profile line combination
// ═══════════════════════════════════════════════════════════════

export interface ProfileFragment {
  id: string;
  profile: string;
  text: string;
}

export const PROFILE_FRAGMENTS: ProfileFragment[] = [
  {
    id: 'profile:1/3',
    profile: '1/3',
    text: 'You investigate deeply before you act, then learn through breaking what you built. Your research phase is thorough; your trial-and-error phase is expensive. The practice: accept that the plan will change on contact with reality, and let the research serve as a safety net, not a guarantee.',
  },
  {
    id: 'profile:1/4',
    profile: '1/4',
    text: 'You need a solid foundation and an existing network to deliver it through. Your knowledge flows through relationships, not broadcasts. The practice: deepen three existing connections rather than building new ones — your influence moves through trust, not reach.',
  },
  {
    id: 'profile:2/4',
    profile: '2/4',
    text: 'You carry natural gifts you do not fully see, and they reach the world through your network. Others recognize your talent before you name it. The practice: when the same compliment arrives from three different people, treat it as data about a real strength, not as flattery.',
  },
  {
    id: 'profile:2/5',
    profile: '2/5',
    text: 'You have innate talents others project expectations onto. People see a savior before they see you, and the gap between their projection and your reality creates friction. The practice: correct the projection early. "I can help with X but not Y" protects both you and the person expecting rescue.',
  },
  {
    id: 'profile:3/5',
    profile: '3/5',
    text: 'You learn by trial and error, and others project practical wisdom onto your experiments. Your failures teach you; the world expects your conclusions to save them. The practice: share what worked only after the experiment is complete. Premature advice from an unfinished trial damages both your reputation and their trust.',
  },
  {
    id: 'profile:3/6',
    profile: '3/6',
    text: 'You spend the first phase of life learning through mistakes, then transition into a role-model phase where the lessons crystallize into wisdom. The practice: before forty, collect experiences without judging them. After forty, let the pattern emerge. Your authority comes from lived experiment, not from theory.',
  },
  {
    id: 'profile:4/6',
    profile: '4/6',
    text: 'You influence through your network and mature into a broad perspective that sees patterns others miss. Your connections are your platform; your wisdom is the message. The practice: invest in relationships during the first half; teach through them in the second.',
  },
  {
    id: 'profile:4/1',
    profile: '4/1',
    text: 'You transmit through relationships and need to feel secure in your foundation before you share. When the ground beneath you shifts, you retract entirely. The practice: maintain one stable relationship or community that does not depend on your current project. That anchor lets you extend further.',
  },
  {
    id: 'profile:5/1',
    profile: '5/1',
    text: 'Others project savior expectations onto you, and you meet them with deep research. The combination is powerful when accurate and devastating when the projection exceeds the preparation. The practice: underpromise by one degree. Let the delivery exceed the expectation rather than the reverse.',
  },
  {
    id: 'profile:5/2',
    profile: '5/2',
    text: 'You carry projected expectations and innate gifts you barely recognize. Others see a solution in you before you see it in yourself. The practice: when the call comes, check whether your natural talent matches the need. Say yes only when it does — the projection fades fast when the talent does not fit.',
  },
  {
    id: 'profile:6/2',
    profile: '6/2',
    text: 'You are a natural talent maturing into a role model. The first act of life is experimental; the second is exemplary. Others will look to you for how to live, whether you invite the attention or not. The practice: live the lesson before you teach it. Your authority is in your example, not your advice.',
  },
  {
    id: 'profile:6/3',
    profile: '6/3',
    text: 'You combine the role-model perspective with the trial-and-error method. Your wisdom is hard-won and experiment-tested, which makes it credible and sometimes bruising. The practice: let the early mistakes stay visible. Your authority comes not from a clean record but from honest recovery.',
  },
];
