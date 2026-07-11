/**
 * Original interpretive texts for all 9 Enneagram types and their wings.
 * These are original compositions based on openly available Enneagram theory.
 */

export interface EnneagramInterpretation {
  type: number;
  name: string;
  title: string;
  subtitle: string;
  coreFear: string;
  coreDesire: string;
  description: string;
  strengths: string[];
  challenges: string[];
  wings: Record<number, WingDescription>;
}

export interface WingDescription {
  label: string;
  description: string;
}

export const enneagramInterpretations: Record<number, EnneagramInterpretation> = {
  1: {
    type: 1,
    name: 'The Reformer',
    title: 'The Principled Reformer',
    subtitle: 'Integrity, purpose, and the pursuit of what is right',
    coreFear: 'Being corrupt, defective, or morally wrong',
    coreDesire: 'To be good, ethical, and to have integrity',
    description: `You move through the world with an inner compass that is always on. You see how things are and simultaneously how they should be — and the distance between those two realities is where your energy lives. This gap between the real and the ideal is both your fuel and your torment.

Your standards are genuinely high, not performatively so. You hold yourself to them first and most harshly. The inner critic that other types might experience occasionally is, for you, a constant presence — a voice that evaluates, corrects, and demands better. You are often harder on yourself than on anyone else, though others may not realize this because what they see is your outward insistence on quality and correctness.

Your gift is moral clarity. You can see through rationalization and spin to the ethical core of a situation with a precision that others find either inspiring or uncomfortable. When you are healthy, this clarity becomes a force for genuine reform — not perfectionism, but a sustained, practical commitment to making things better.

The growth path for your type involves learning to hold your standards while releasing the tension. Not everything requires correction. Not every imperfection is a crisis. The deepest form of integrity is the one that includes compassion — for others and, crucially, for yourself.`,
    strengths: ['Moral clarity and ethical conviction', 'Disciplined follow-through', 'Eye for quality and detail', 'Principled leadership', 'Capacity for genuine reform'],
    challenges: ['Harsh inner critic', 'Rigidity and inflexibility', 'Resentment when standards aren\'t shared', 'Difficulty relaxing', 'Judgmental tendencies'],
    wings: {
      9: { label: '1w9 — The Idealist', description: 'The Nine wing softens your reforming energy with patience and equanimity. You pursue improvement through calm persuasion rather than forceful correction, and you are more tolerant of ambiguity. The risk is passivity — your desire for peace may mute the very principles you value.' },
      2: { label: '1w2 — The Advocate', description: 'The Two wing channels your principled energy toward helping others. You don\'t just see what\'s wrong — you feel compelled to fix it for people. More warm and interpersonally engaged than the 1w9, you can become the passionate advocate, though you risk becoming controlling in the name of care.' },
    },
  },

  2: {
    type: 2,
    name: 'The Helper',
    title: 'The Devoted Helper',
    subtitle: 'Generosity, connection, and the need to be needed',
    coreFear: 'Being unwanted, unloved, or dispensable',
    coreDesire: 'To be loved and appreciated for who they are',
    description: `You are oriented toward connection. Your attention flows naturally outward — toward what others feel, what they need, what would make them more comfortable. This isn't a strategy; it's how your perception works. You walk into a room and immediately read the emotional landscape: who's tense, who's lonely, who needs encouragement.

Your generosity is genuine, but it isn't free of need. Beneath the giving is a deep hunger to be valued — specifically, to be valued for your care. You may not always be conscious of this exchange, but it shapes your relationships: you give in order to become indispensable, and when your giving isn't reciprocated or acknowledged, you feel a hurt that seems disproportionate to the situation.

Your strength is your emotional intelligence. You understand people at a level that makes you an extraordinary friend, partner, mentor, and healer. When you are healthy, you give freely without keeping score, and you are as attentive to your own needs as you are to others'.

The growth edge for your type is learning to receive — not just compliments, but genuine care, attention, and help from others. Your deepest fear is that if you stop giving, you'll be abandoned. The paradox of your growth is discovering that you are loved for who you are, not for what you do.`,
    strengths: ['Deep emotional attunement', 'Generous and caring nature', 'Strong interpersonal bonds', 'Intuitive understanding of needs', 'Warmth that puts others at ease'],
    challenges: ['Difficulty receiving help', 'People-pleasing at the cost of self', 'Indirect about own needs', 'Can become possessive or martyrlike', 'Resentment from over-giving'],
    wings: {
      1: { label: '2w1 — The Servant', description: 'The One wing adds a principled, dutiful quality to your helping. You serve from a sense of moral obligation as much as emotional connection. More restrained and self-critical than the 2w3, you risk exhausting yourself through perfectionist caregiving.' },
      3: { label: '2w3 — The Host', description: 'The Three wing makes your helping more socially polished and image-conscious. You are charming, energetic, and know how to make people feel special. More outgoing and ambitious than the 2w1, you risk confusing genuine care with the performance of care.' },
    },
  },

  3: {
    type: 3,
    name: 'The Achiever',
    title: 'The Adaptive Achiever',
    subtitle: 'Success, image, and the drive to be valued',
    coreFear: 'Being worthless or without inherent value',
    coreDesire: 'To be valuable, successful, and admired',
    description: `You are wired for accomplishment. The world presents itself to you as a series of goals to be achieved, impressions to be made, and standards to be exceeded. You adapt to what each environment rewards and then you excel — often so naturally that you don't realize how much you are shape-shifting in the process.

Your gift is efficiency of execution. You see the shortest path to the goal, you trim the unnecessary, and you deliver. Others marvel at your productivity and polish. What they may not see is the cost: a growing uncertainty about who you are when you're not performing. Your identity can become so fused with your achievements that a failure doesn't just hurt — it threatens your sense of self.

The core tension of your type is the difference between being valued and being authentic. You learned early that the world rewards results, and you became extraordinarily good at producing them. But the person producing the results may have drifted far from the person you actually are, beneath all the adaptation.

Your growth path involves learning to be still — to sit with yourself without accomplishing, performing, or impressing. The discovery waiting for you is that you have inherent worth that exists entirely apart from what you achieve. You are not your resume. You are the person behind it.`,
    strengths: ['Goal-oriented drive', 'Adaptive social intelligence', 'Efficient execution', 'Inspiring motivation of others', 'Professional excellence'],
    challenges: ['Identity fused with achievement', 'Difficulty being vulnerable', 'Workaholism', 'Can become deceitful to maintain image', 'Emotional numbness under pressure'],
    wings: {
      2: { label: '3w2 — The Charmer', description: 'The Two wing adds warmth and interpersonal magnetism to your drive. You achieve through and for people — leadership comes naturally, and you genuinely want to help others succeed. The risk is that your charm becomes manipulative, and you lose track of where helpfulness ends and self-promotion begins.' },
      4: { label: '3w4 — The Professional', description: 'The Four wing adds emotional depth and creative ambition to your achievement orientation. You want your work to be not just successful but meaningful and aesthetically excellent. More introspective than the 3w2, you risk painful oscillation between confident productivity and artistic self-doubt.' },
    },
  },

  4: {
    type: 4,
    name: 'The Individualist',
    title: 'The Authentic Individualist',
    subtitle: 'Depth, identity, and the search for what is real',
    coreFear: 'Having no identity or personal significance',
    coreDesire: 'To be uniquely themselves and to find their significance',
    description: `You feel things that others walk past without noticing. Beauty, loss, longing, meaning — your emotional register is tuned to frequencies that most people don't access. This gives you an extraordinary capacity for depth, but it also means you often feel like an outsider: the one who sees what others don't, who feels what others won't, who experiences life at an intensity that is both gift and burden.

Your identity is built around authenticity. You refuse to be ordinary, and you have an almost allergic reaction to what feels generic or shallow. You need your life, your work, and your relationships to carry genuine emotional weight. The ordinary world — small talk, routine, cheerful surfaces — can feel suffocating.

The shadow of your type is the romanticization of suffering. You may come to believe that your pain is what makes you special — that without it, you'd be ordinary. This can create a paradoxical attachment to melancholy: you seek the very states you claim to want to escape, because they confirm your sense of being deeply, beautifully different.

Your growth involves discovering that depth doesn't require suffering. You can be both ordinary and extraordinary. The most profound authenticity isn't dramatic — it's the quiet willingness to show up as you are, in the full range of your feelings, without needing anyone to recognize how special that is.`,
    strengths: ['Emotional depth and sensitivity', 'Authentic self-expression', 'Creative originality', 'Capacity for deep connection', 'Aesthetic sensibility'],
    challenges: ['Romanticizing suffering', 'Envy and comparison', 'Mood volatility', 'Self-absorption', 'Difficulty with the ordinary'],
    wings: {
      3: { label: '4w3 — The Aristocrat', description: 'The Three wing adds ambition and social polish to your emotional depth. You want your uniqueness to be seen and celebrated — and you have the drive to create something the world will recognize. More outwardly expressive than the 4w5, you risk performing your authenticity rather than simply living it.' },
      5: { label: '4w5 — The Bohemian', description: 'The Five wing adds intellectual depth and a more withdrawn, cerebral quality. You are drawn to understanding your inner world through study, art, and solitary exploration. More private than the 4w3, you risk retreating so far inward that you become isolated from the very connections you crave.' },
    },
  },

  5: {
    type: 5,
    name: 'The Investigator',
    title: 'The Perceptive Investigator',
    subtitle: 'Knowledge, autonomy, and the conservation of energy',
    coreFear: 'Being overwhelmed, invaded, or incapable',
    coreDesire: 'To be competent and to understand the world',
    description: `You need to understand before you act. Where others plunge in, you observe. Where others trust their feelings, you trust your analysis. Your mind is your primary tool and your primary refuge — a space where you can take the world apart, examine its components, and reassemble it into frameworks that make sense.

Your relationship to energy is distinctive: you experience it as finite and precious. Social interaction, emotional demands, unexpected events — these all draw from a reservoir that refills slowly and only in solitude. This isn't antisocial; it's metabolic. You need space the way others need company.

Your gift is the capacity for genuine understanding. You don't skim surfaces — you dive until you reach the structure beneath. In any field you choose to invest in, you develop expertise that is both deep and original. Your insights often come from angles that nobody else considered because nobody else was willing to sit with the question that long.

The growth edge for your type is engagement. Knowledge that never touches the world is sterile. Your tendency to prepare endlessly — to gather one more piece of information before committing — can become a sophisticated form of avoidance. The world needs your understanding, but it needs it expressed, shared, and tested against reality, not hoarded in the safety of your inner fortress.`,
    strengths: ['Deep analytical capacity', 'Independence of thought', 'Calm under pressure', 'Expert knowledge', 'Ability to see what others miss'],
    challenges: ['Emotional detachment', 'Hoarding energy and knowledge', 'Difficulty with spontaneity', 'Can seem cold or unavailable', 'Over-reliance on thinking over feeling'],
    wings: {
      4: { label: '5w4 — The Iconoclast', description: 'The Four wing adds emotional depth and creative intensity to your intellectual nature. You are drawn to the unconventional, the dark, and the aesthetically profound. More emotionally aware than the 5w6, you risk becoming lost in a rich but isolating inner world of ideas and feelings.' },
      6: { label: '5w6 — The Problem Solver', description: 'The Six wing adds a more practical, security-oriented quality to your investigations. You apply your analytical skill to real-world problems and are more socially engaged than the 5w4. You seek reliable systems and trusted allies, though you risk becoming anxious and overly cautious.' },
    },
  },

  6: {
    type: 6,
    name: 'The Loyalist',
    title: 'The Committed Loyalist',
    subtitle: 'Loyalty, vigilance, and the search for solid ground',
    coreFear: 'Being without support, guidance, or security',
    coreDesire: 'To have security, support, and certainty',
    description: `You scan for danger. Not necessarily physical danger — though that too — but the subtler threats: betrayal, abandonment, systems failing, people not being who they claim to be. Your mind is a threat-detection system of remarkable sophistication. You see the cracks in foundations that others trust blindly.

This vigilance makes you an exceptionally loyal and prepared person. When you commit to something — a person, a cause, an organization — you commit fully, and you work harder than almost anyone to ensure it survives. You are the person who reads the fine print, who asks the uncomfortable question, who prepares for the scenario everyone else dismissed as unlikely.

The shadow of your vigilance is anxiety. Your mind generates worst-case scenarios with an ease that can be paralyzing. You may oscillate between seeking authority to follow and rebelling against it — between trusting and testing — because you can never be entirely sure where safety lies. This creates an inner turbulence that others may not see, because on the outside you often appear composed and competent.

Your growth involves learning to trust — not blindly, but with the earned confidence that you can handle whatever happens. The security you seek externally must ultimately be built internally. You don't need the world to be safe; you need to know that you are capable of navigating an unsafe world.`,
    strengths: ['Loyalty and commitment', 'Excellent risk assessment', 'Responsible and prepared', 'Courageous under pressure', 'Perceptive about hidden motives'],
    challenges: ['Chronic anxiety and worry', 'Difficulty trusting', 'Indecision from over-analysis', 'Projecting fears onto situations', 'Oscillation between compliance and rebellion'],
    wings: {
      5: { label: '6w5 — The Defender', description: 'The Five wing makes you more cerebral, independent, and reserved. You seek security through knowledge and competence rather than through social bonds. More self-sufficient than the 6w7, you risk becoming isolated and overly analytical about threats that exist primarily in your mind.' },
      7: { label: '6w7 — The Buddy', description: 'The Seven wing adds warmth, humor, and social energy to your vigilant nature. You seek security through community, fun, and optimistic engagement. More outgoing than the 6w5, you use humor and activity to manage anxiety — which works until the underlying fears demand direct attention.' },
    },
  },

  7: {
    type: 7,
    name: 'The Enthusiast',
    title: 'The Versatile Enthusiast',
    subtitle: 'Joy, possibility, and the flight from limitation',
    coreFear: 'Being deprived, trapped, or in pain',
    coreDesire: 'To be happy, satisfied, and to have their needs fulfilled',
    description: `Your mind moves toward possibility like water moves downhill — naturally, effortlessly, and with considerable force. You see options where others see walls. You find excitement where others find routine. Your natural orientation is toward the future, the novel, the untried. The present moment, unless it's stimulating, is mostly a launching pad for what comes next.

Your enthusiasm is genuine and generative. You don't just consume experience — you create it. Your ideas spark other ideas; your energy lifts the people around you; your refusal to accept limitation often leads to genuinely creative breakthroughs. You are the person who makes life feel more vivid.

But beneath the brightness is a flight from pain. Your type's core strategy is reframing: turning negatives into positives, finding the silver lining, moving on to the next thing before the difficult feeling arrives. This works remarkably well — until it doesn't. At some point, the avoided pain accumulates, and the constant forward movement begins to feel less like freedom and more like escape.

Your growth path involves staying. Staying with a commitment past the exciting phase. Staying with a feeling past the comfortable point. Staying with a single pursuit long enough to reach the depth that only sustained attention can access. The fullest joy — the kind you're actually seeking — exists not in breadth but in the willingness to be present to everything, including what hurts.`,
    strengths: ['Infectious optimism', 'Creative versatility', 'Quick mental agility', 'Resilience through reframing', 'Ability to see opportunity everywhere'],
    challenges: ['Avoidance of pain and discomfort', 'Scattered attention', 'Difficulty with commitment', 'Impulsive decision-making', 'Superficiality from constant motion'],
    wings: {
      6: { label: '7w6 — The Entertainer', description: 'The Six wing adds loyalty, warmth, and a grounding social awareness to your enthusiasm. You are more community-oriented and responsible than the 7w8, building fun into relationships rather than solo adventures. The risk is anxiety beneath the cheerfulness — a worried mind masked by a playful exterior.' },
      8: { label: '7w8 — The Realist', description: 'The Eight wing adds force, directness, and material ambition to your enthusiasm. You don\'t just imagine possibilities — you seize them. More assertive and competitive than the 7w6, you pursue pleasure and experience with a commanding intensity. The risk is excess and domination in the name of freedom.' },
    },
  },

  8: {
    type: 8,
    name: 'The Challenger',
    title: 'The Powerful Challenger',
    subtitle: 'Strength, justice, and the refusal to be controlled',
    coreFear: 'Being controlled, harmed, or violated by others',
    coreDesire: 'To protect themselves and to determine their own path',
    description: `You lead with intensity. Your energy enters a room before you do — a force of presence, directness, and unapologetic will. You don't ask for permission. You don't soften your edges to make others comfortable. You operate on the belief that the world is a place where strength is respected and weakness is exploited, and you have no intention of being on the wrong side of that equation.

Beneath your forcefulness is a fierce protectiveness. You extend your strength to shield the people and causes you care about. Children, underdogs, anyone who is being bullied or exploited — these trigger your deepest instincts. Your aggression is not random; it is almost always in service of justice, even when it's expressed clumsily.

The shadow of your type is the armor itself. You built your toughness as protection — probably early, probably out of real necessity — and it served you well. But armor that was once survival can become a prison. You may not know how to be vulnerable. You may have forgotten that the softness you associate with weakness is actually the doorway to intimacy.

Your growth involves discovering that true strength includes the capacity to be gentle. The most powerful thing you can do is not to dominate a room but to open yourself to someone within it. Vulnerability is not weakness — for your type, it may be the most courageous act available.`,
    strengths: ['Decisive leadership', 'Protective instinct', 'Direct communication', 'Resilience and willpower', 'Championing the underdog'],
    challenges: ['Difficulty with vulnerability', 'Domineering tendencies', 'Excessive intensity', 'Anger as default emotion', 'Resistance to being influenced'],
    wings: {
      7: { label: '8w7 — The Maverick', description: 'The Seven wing adds energy, optimism, and expansive appetite to your powerful nature. You are bold, enterprising, and larger-than-life — pursuing big goals with big energy. More extroverted than the 8w9, you risk excess and impulsivity in your drive for experience and control.' },
      9: { label: '8w9 — The Bear', description: 'The Nine wing adds a grounded, patient, and easygoing quality to your intensity. You are powerful but unhurried — a quiet force that prefers peace but will not tolerate injustice. More steady than the 8w7, you risk becoming stubborn and numbing yourself to avoid the vulnerability beneath your strength.' },
    },
  },

  9: {
    type: 9,
    name: 'The Peacemaker',
    title: 'The Receptive Peacemaker',
    subtitle: 'Harmony, acceptance, and the merging of perspectives',
    coreFear: 'Conflict, disconnection, and loss of inner peace',
    coreDesire: 'To have inner stability and peace of mind',
    description: `You are the mediator of the human condition. You can hold multiple perspectives simultaneously, seeing the validity in each, finding the common ground that others miss. Your presence is calming — not because you perform calmness, but because you genuinely experience the world as a place where most tensions are resolvable and most people are doing their best.

Your gift is radical acceptance. You can sit with people who disagree, who are angry, who are in pain, and your acceptance doesn't waver. You don't judge; you understand. This makes you a remarkable peacemaker, partner, and friend — someone who creates space where others can be themselves without fear of rejection.

The shadow of your peace is self-erasure. Your capacity for seeing all perspectives can become an inability to hold your own. You merge with others' agendas, suppress your own desires, and sleepwalk through your own life in the name of harmony. The anger you refuse to express doesn't disappear — it goes underground and manifests as passive resistance, stubbornness, or a quiet but devastating withdrawal.

Your growth path involves waking up to your own wants. You have preferences, opinions, ambitions, and passions — they just got buried under years of accommodation. The most radical act of peacemaking you can perform is to show up fully as yourself, risking the conflict that authenticity might create. The peace built on self-suppression isn't peace — it's numbness. The peace built on honest presence is the real thing.`,
    strengths: ['Natural mediation ability', 'Inclusive perspective', 'Calming presence', 'Patient and accepting', 'Ability to unify diverse groups'],
    challenges: ['Self-forgetting and merging', 'Passive resistance', 'Difficulty with self-assertion', 'Numbing out under stress', 'Procrastination and inertia'],
    wings: {
      8: { label: '9w8 — The Referee', description: 'The Eight wing adds a quiet but unmistakable force to your peacemaking. You are more assertive, territorial, and earthy than the 9w1. When pushed, you can surprise people with your strength. The risk is oscillating between stubborn withdrawal and explosive force when boundaries are finally crossed.' },
      1: { label: '9w1 — The Dreamer', description: 'The One wing adds a principled, idealistic quality to your peaceful nature. You have a quiet vision of how things should be and work toward it in measured, patient ways. More orderly and self-critical than the 9w8, you risk combining the Nine\'s inertia with the One\'s inner criticism into a paralyzing loop.' },
    },
  },
};
