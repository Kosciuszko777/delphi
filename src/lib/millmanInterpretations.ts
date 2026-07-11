/**
 * Original interpretive texts for Millman Life-Purpose numbers.
 *
 * These are original compositions inspired by the life-purpose framework.
 * They do NOT reproduce any copyrighted material.
 *
 * Indexed by the final single digit (1–9).
 */

export interface MillmanInterpretation {
  title: string;
  subtitle: string;
  description: string;
  strengths: string[];
  challenges: string[];
  keywords: string[];
}

export const millmanInterpretations: Record<number, MillmanInterpretation> = {
  1: {
    title: 'The Creative Individual',
    subtitle: 'Channeling original energy into form',
    description: `Your life purpose centers on the theme of creativity and individuality — learning to stand on your own two feet and express your unique vision with confidence. This path asks you to develop creative energy not as an occasional hobby but as a fundamental orientation toward life. You are here to birth something original into the world, whether through art, enterprise, ideas, or the way you live.

The challenge embedded in this path is that the same creative force that makes you original can turn inward as insecurity or blocked self-expression. You may oscillate between bursts of creative confidence and periods of self-doubt where you question whether your ideas are worth sharing at all. The work is to move through that doubt — not to wait until it disappears, but to create despite it.

At your best, you bring a fresh perspective to everything you touch. You see angles others miss. You may need to learn that independence doesn't mean isolation — that you can be radically yourself and still deeply connected to others. The people who resonate most with your path will recognize the courage it takes to be genuinely original in a world that rewards conformity.

Your gift, fully expressed, is the capacity to inspire others by example. When you commit to your own creative truth without apology, you give silent permission to everyone around you to do the same.`,
    strengths: ['Original thinking', 'Creative vision', 'Self-reliance', 'Innovative spirit', 'Courage of conviction'],
    challenges: ['Self-doubt', 'Insecurity about expression', 'Isolation tendencies', 'Blocked creativity', 'Addictive patterns'],
    keywords: ['Creativity', 'Independence', 'Expression', 'Originality'],
  },
  2: {
    title: 'The Cooperative Diplomat',
    subtitle: 'Finding strength through service and balance',
    description: `Your life purpose revolves around cooperation, balance, and responsible service. You are here to learn how to support and be supported, how to set healthy boundaries while remaining genuinely available to others. This is the path of the diplomat, the mediator, the one who sees both sides and creates bridges between opposing forces.

The central tension of your path is the difference between healthy cooperation and over-giving. You may have an instinct to serve that, left unchecked, becomes self-sacrifice. You absorb the emotional atmosphere around you with unusual sensitivity, and without clear boundaries, you can lose yourself in other people's needs. The work is to learn that saying no is sometimes the most generous thing you can do — for yourself and for the people who depend on you.

Your natural gift is an intuitive understanding of relationship dynamics. You sense what others need, often before they know it themselves. In your highest expression, this becomes a profound capacity for creating harmony — in partnerships, teams, families, and communities. You are the connective tissue that holds groups together.

When you honor your own needs with the same attentiveness you bring to others, you become a living example of balanced partnership. Your path teaches that the strongest form of service flows from a full cup, not an empty one.`,
    strengths: ['Empathy', 'Diplomacy', 'Cooperation', 'Intuitive sensitivity', 'Supportive nature'],
    challenges: ['Over-responsibility', 'People-pleasing', 'Boundary issues', 'Emotional absorption', 'Resentment from over-giving'],
    keywords: ['Cooperation', 'Balance', 'Service', 'Diplomacy'],
  },
  3: {
    title: 'The Expressive Communicator',
    subtitle: 'Giving voice to inner vision',
    description: `Your life purpose centers on expression, emotional sensitivity, and the courage to share your inner world. You are here to develop the ability to communicate what you feel and perceive with clarity, beauty, and impact. Whether through words, art, music, teaching, or simply the way you engage in conversation, your path is about making the invisible visible.

The core challenge of this path is the gap between what you feel and what you manage to express. You may experience a rich, vivid interior life that feels impossible to articulate. This can lead to frustration, emotional withdrawal, or the temptation to keep everything bottled up behind a cheerful surface. Self-doubt about your expressive abilities — "Who am I to say this?" — is a recurring obstacle that must be faced directly.

When you move through the fear of expression, something remarkable happens: people respond. You have a natural gift for articulating emotional truths that others feel but cannot name. Your words, images, or presence can open doors in people's minds and hearts. You don't just communicate information — you transmit feeling.

Your path asks you to treat emotional honesty as a discipline, not a luxury. The world needs people who can name what is real. In a culture that rewards surface performances, your willingness to speak from genuine feeling is both your gift and your act of quiet rebellion.`,
    strengths: ['Emotional intelligence', 'Artistic sensitivity', 'Communication gifts', 'Joyful enthusiasm', 'Inspiring presence'],
    challenges: ['Self-doubt about expression', 'Emotional suppression', 'Scattered energy', 'Mood swings', 'Fear of vulnerability'],
    keywords: ['Expression', 'Communication', 'Sensitivity', 'Joy'],
  },
  4: {
    title: 'The Grounded Builder',
    subtitle: 'Creating stability through patient process',
    description: `Your life purpose is oriented toward stability, process, and building things that endure. You are here to learn the power of patience, step-by-step effort, and commitment to a solid foundation. This is not the flashiest path, but it may be one of the most essential — you are the one who turns vision into reality through sustained, methodical effort.

The central challenge of your path is the tension between wanting results immediately and the slower pace that genuine building requires. You may feel frustrated by how long things take, or you may skip foundational steps in your eagerness to reach the end point. The lesson returns again and again: there are no shortcuts to what matters. The foundation determines what the structure can hold.

Your gift is the capacity for extraordinary follow-through. When you commit to the step-by-step process instead of fighting it, you can accomplish things that dazzle people who work in bursts. You bring order to chaos. You see what needs to happen next, and you do it — not because it's exciting, but because it's necessary.

At your highest expression, you model a kind of strength that our culture desperately needs: the strength of reliability, of showing up, of building something real with your hands and your persistence. Your path teaches that freedom isn't the absence of structure — it's the product of structure well-built.`,
    strengths: ['Reliability', 'Analytical thinking', 'Determination', 'Practical wisdom', 'Organizational skill'],
    challenges: ['Impatience with process', 'Rigidity', 'Overwork', 'Skipping steps', 'Resistance to limitation'],
    keywords: ['Stability', 'Process', 'Foundation', 'Persistence'],
  },
  5: {
    title: 'The Freedom Seeker',
    subtitle: 'Embracing discipline as the path to liberation',
    description: `Your life purpose revolves around freedom, discipline, and the adventurous exploration of life's full range of experience. You are here to discover that true freedom is not the absence of structure but the product of focused discipline. This paradox is the central teaching of your path: the more disciplined you become, the freer you are.

The challenge embedded in this path is the temptation to pursue freedom through escape rather than mastery. You may scatter your energy across too many interests, flee from commitments when they become uncomfortable, or mistake chaos for liberation. The pattern of starting strong and abandoning ship when boredom strikes is a recurring lesson that your path asks you to examine.

Your natural gift is versatility. You learn quickly, adapt to new situations with ease, and bring a sense of adventure to everything you undertake. People are drawn to your energy because you remind them that life is meant to be experienced fully. You are a natural explorer — of ideas, places, relationships, and inner landscapes.

When you channel your versatile energy through discipline rather than against it, you become unstoppable. The deepest freedom on your path comes not from keeping all options open but from choosing one thing and going deep enough to break through to mastery. Your life teaches that the people who are truly free are the ones who have mastered something — and that mastery requires the focused commitment you are learning to sustain.`,
    strengths: ['Versatility', 'Quick learning', 'Adventurous spirit', 'Sensory awareness', 'Charisma'],
    challenges: ['Scattered focus', 'Commitment avoidance', 'Excess and addiction', 'Impatience with depth', 'Drama-seeking'],
    keywords: ['Freedom', 'Discipline', 'Adventure', 'Experience'],
  },
  6: {
    title: 'The Visionary Idealist',
    subtitle: 'Accepting the world while holding the vision',
    description: `Your life purpose centers on vision, acceptance, and the bridge between ideals and reality. You are here to develop the ability to hold a high vision of what is possible while simultaneously accepting the imperfect world as it is. This is the path of the idealist who must learn to be practical — the perfectionist who must learn to be compassionate, starting with themselves.

The core challenge of your path is perfectionism that becomes paralysis. You see how things could be — in relationships, in work, in yourself — and the gap between the ideal and the actual can cause deep frustration. You may judge yourself and others harshly, not from cruelty but from a sincere belief that more is possible. The work is to learn that "good enough" is not a compromise but a form of wisdom.

Your natural gift is the capacity to envision excellence and to inspire others toward it. You have high standards because you genuinely see the potential in people and situations. When tempered by compassion, this becomes a remarkable ability to uplift — to help others see what they could become without making them feel inadequate for where they are now.

At your highest expression, you embody the integration of vision and acceptance. You hold the ideal as a guiding star while embracing the messy, beautiful, imperfect process of getting there. Your path teaches that the highest form of idealism is not demanding perfection but loving what is while working toward what could be.`,
    strengths: ['High vision', 'Sense of justice', 'Natural teaching ability', 'Aesthetic refinement', 'Devotion to excellence'],
    challenges: ['Perfectionism', 'Self-judgment', 'Judging others', 'Disappointment in reality', 'Difficulty accepting imperfection'],
    keywords: ['Vision', 'Acceptance', 'Idealism', 'Refinement'],
  },
  7: {
    title: 'The Trusting Seeker',
    subtitle: 'Finding wisdom through inner trust',
    description: `Your life purpose revolves around trust, openness, and the deep inner work of learning to rely on your own wisdom. You are here to develop a relationship with the invisible — with intuition, with the spiritual dimensions of experience, with the quiet knowing that exists beneath the surface of rational thought. This is the path of the seeker who must eventually find what they're looking for inside themselves.

The central challenge of your path is the difficulty of trusting — trusting others, trusting life, trusting yourself. You may have learned early that the world is not entirely safe, and this can lead to emotional guardedness, intellectualization of feelings, or a tendency to hide your vulnerability behind competence. The work is to soften the armor without losing the discernment.

Your natural gift is depth. You don't skim surfaces — you dive. Whether through study, meditation, nature, or solitary reflection, you have the capacity to access insights that most people never reach. Your mind is sharp and your intuition is powerful, though you may not always trust the latter over the former.

When you learn to trust your own deep knowing — when you stop waiting for external proof before acting on inner guidance — you become a source of wisdom for others. Your path teaches that the most important truths cannot be proven, only known. And that the courage to act on inner knowing, even without guarantees, is the very definition of faith in its most grounded, adult form.`,
    strengths: ['Analytical depth', 'Intuitive wisdom', 'Introspective clarity', 'Spiritual openness', 'Natural refinement'],
    challenges: ['Trust issues', 'Emotional guardedness', 'Over-intellectualizing', 'Fear of betrayal', 'Isolation from vulnerability'],
    keywords: ['Trust', 'Wisdom', 'Depth', 'Inner knowing'],
  },
  8: {
    title: 'The Abundant Leader',
    subtitle: 'Wielding power with integrity',
    description: `Your life purpose centers on abundance, power, and the responsible use of influence in the material world. You are here to learn how to manifest your vision in tangible form — to build, earn, lead, and exercise authority in ways that benefit not only yourself but the broader community. This is the path of the natural leader who must learn that true power serves.

The core challenge of your path is your relationship with power and money. You may swing between passive avoidance of material concerns and aggressive pursuit of control. You might give your power away to others, or you might wield it clumsily in ways that create conflict. The work is to find the middle path: claiming your natural authority without dominating, building wealth without letting it define your worth.

Your natural gift is executive energy — the ability to see a goal and marshal resources to achieve it. You have a commanding presence that others naturally respond to. When you lead from integrity rather than ego, people don't just follow you — they feel empowered by your leadership. You have a remarkable capacity to create abundance and to help others do the same.

At your highest expression, you demonstrate that power and generosity are not opposites but allies. Your path teaches that the most sustainable form of success is the kind that elevates everyone it touches. You are here to prove that abundance is not a zero-sum game — that it is possible to do well and do good simultaneously.`,
    strengths: ['Natural authority', 'Manifesting ability', 'Strategic vision', 'Generosity', 'Executive presence'],
    challenges: ['Power struggles', 'Money fears or obsession', 'Control issues', 'Self-sabotage of success', 'Passive-aggressive patterns'],
    keywords: ['Abundance', 'Power', 'Leadership', 'Influence'],
  },
  9: {
    title: 'The Wise Exemplar',
    subtitle: 'Leading by the integrity of lived example',
    description: `Your life purpose centers on integrity, wisdom, and the power of leading by example. You are here to develop a life of such alignment between your values and your actions that your very existence becomes a teaching. This is the path of the sage — not the one who lectures from above, but the one whose life itself is the lesson.

The central challenge of your path is the gap between your high ideals and your actual behavior. You hold yourself to exacting standards, and when you fall short — as all humans do — you may experience disproportionate shame or disillusionment. You might also project your ideals onto others and feel betrayed when they don't live up to your expectations. The work is to close the integrity gap gradually, with compassion, and to accept that wisdom is a lifetime process, not a destination.

Your natural gift is a deep, almost instinctive understanding of universal principles. You grasp the larger patterns of life — justice, karma, natural law — in a way that goes beyond intellectual understanding. When you speak from this knowing, others listen, because your words carry the weight of genuine conviction.

When you commit to living your principles rather than merely professing them, you become a magnetic force for change. Your path teaches that the most powerful leadership is not charismatic persuasion but consistent example. People don't need another person telling them how to live — they need someone showing them that living with integrity is possible. That is your purpose.`,
    strengths: ['Moral clarity', 'Charismatic wisdom', 'Natural leadership', 'Deep integrity', 'Inspirational presence'],
    challenges: ['Integrity gaps', 'Hypocrisy fear', 'Judgmental tendencies', 'Difficulty with imperfection', 'Living in the head'],
    keywords: ['Integrity', 'Wisdom', 'Example', 'Higher purpose'],
  },
};

/**
 * Get the working-sum description — what the digits in the sum mean.
 * The working sum digits represent the energies and challenges to work through.
 */
export function getWorkingSumDescription(workingSum: number): string {
  const digits = workingSum.toString().split('').map(Number);
  if (digits.length === 1) {
    return 'A pure single-digit path — the energy of your purpose is direct and unmediated.';
  }

  const digitMeanings: Record<number, string> = {
    0: 'inner gifts awaiting activation',
    1: 'creative individuality',
    2: 'cooperative sensitivity',
    3: 'expressive communication',
    4: 'grounded stability',
    5: 'freedom and discipline',
    6: 'visionary idealism',
    7: 'trust and inner wisdom',
    8: 'abundant leadership',
    9: 'wise integrity',
  };

  const descriptions = digits.map(d => digitMeanings[d] || '');
  return `Your path works through the energies of ${descriptions.join(', ')} to arrive at your core purpose.`;
}
