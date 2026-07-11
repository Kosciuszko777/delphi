/**
 * Original interpretive texts for all 16 Jungian types.
 *
 * These are original compositions. They do NOT reproduce any
 * proprietary MBTI® content. The four-letter type codes are
 * generic Jungian designations in public use.
 */

export interface JungInterpretation {
  type: string;
  title: string;
  subtitle: string;
  description: string;
  strengths: string[];
  blindSpots: string[];
  /** How this type typically shows up in teams */
  teamRole: string;
  /** One-line essence */
  essence: string;
}

export const jungInterpretations: Record<string, JungInterpretation> = {
  ISTJ: {
    type: 'ISTJ',
    title: 'The Responsible Realist',
    subtitle: 'Duty, detail, and quiet dependability',
    description: `You approach life with a deep sense of responsibility and an unwavering commitment to doing things correctly. Where others might improvise, you prepare. Where others might cut corners, you follow through. Your strength lies in your ability to take complex, messy situations and impose reliable order on them — not through charisma or inspiration, but through sheer thoroughness and consistency.

Your inner world is structured around a rich archive of personal experience. You remember what has worked, what has failed, and why. This makes you an exceptionally reliable decision-maker in familiar domains — you don't reinvent the wheel when the existing wheel works perfectly well. You trust proven methods because you have seen them prove themselves.

The challenge for your type is rigidity. Your respect for established ways can become resistance to necessary change. You may struggle when the old rules genuinely no longer apply, or when a situation demands a creative leap beyond past experience. Learning to distinguish between valuable tradition and mere habit is a lifelong growth edge.

At your best, you are the person everyone trusts to handle what matters. You are the backbone of any organization lucky enough to have you — not the most visible person, but often the most essential one.`,
    strengths: ['Exceptional reliability', 'Methodical thoroughness', 'Strong sense of duty', 'Practical problem-solving', 'Organizational memory'],
    blindSpots: ['Resistance to untested approaches', 'Difficulty expressing emotions', 'Over-reliance on precedent', 'May dismiss unconventional ideas'],
    teamRole: 'The anchor — ensures quality, tracks details, and follows through on commitments others forget.',
    essence: 'Quiet strength expressed through unwavering dependability.',
  },

  ISFJ: {
    type: 'ISFJ',
    title: 'The Devoted Guardian',
    subtitle: 'Caring through practical service',
    description: `You notice what people need before they ask. Your attention is tuned to the practical details of human wellbeing — not in an abstract, philosophical way, but in the way of someone who remembers that their colleague doesn't drink coffee after noon, or that their friend has been quieter than usual this week. Your care is expressed through action, not words.

Your memory for personal detail is remarkable. You build an internal library of what matters to the people around you, and you draw on it constantly to make their lives smoother. This isn't calculation — it's a genuine orientation toward service that runs so deep it often goes unrecognized, even by you.

The shadow side of your devotion is self-neglect. You may give so consistently that you forget to ask what you need. Resentment can build silently because you expected others to notice your efforts the way you notice theirs — but they often don't. Learning to voice your own needs directly, rather than hoping they'll be intuited, is essential work for your type.

When you honor your own needs alongside others', you become a source of extraordinary stability. You are the person who holds communities together through a thousand small acts of thoughtful care.`,
    strengths: ['Attentive to others\' needs', 'Reliable and consistent', 'Strong memory for personal detail', 'Patient and supportive', 'Quietly hardworking'],
    blindSpots: ['Difficulty setting boundaries', 'Suppressing own needs', 'Conflict avoidance', 'Over-identifying with the caretaker role'],
    teamRole: 'The supporter — ensures everyone has what they need, remembers commitments, and maintains group cohesion.',
    essence: 'Love made visible through a thousand practical kindnesses.',
  },

  INFJ: {
    type: 'INFJ',
    title: 'The Visionary Counselor',
    subtitle: 'Insight in service of human understanding',
    description: `You see through surfaces. Where others encounter a person, you encounter a pattern — the hidden motivations, the unspoken tensions, the trajectory of where this situation is heading. Your intuition operates like sonar: you send out attention and receive back a detailed map of what lies beneath the visible.

This perceptual depth gives you a remarkable capacity for understanding people. You often know what someone is feeling or thinking before they've articulated it themselves. In your best moments, this makes you an extraordinary counselor, writer, or guide — someone who can name what others experience but cannot express.

The burden of your type is the intensity of your inner world. You absorb emotional information constantly, and without deliberate boundaries, you can become overwhelmed by input that isn't even yours. You may also struggle with the gap between your vision of how things could be and the imperfect reality of how things are. Perfectionism and idealistic disappointment are recurring themes.

Your path to wholeness involves learning that you don't have to understand everything. Some things are meant to remain mysterious. And your vision of the ideal, while beautiful, must be held lightly enough that the imperfect present can still be enjoyed.`,
    strengths: ['Deep intuitive insight', 'Empathic understanding', 'Long-range vision', 'Commitment to meaning', 'Creative expression'],
    blindSpots: ['Emotional overwhelm', 'Perfectionism', 'Difficulty with mundane details', 'Can seem private to the point of secrecy'],
    teamRole: 'The advisor — provides insight into group dynamics, advocates for the unheard perspective, and holds the long-term vision.',
    essence: 'Depth of understanding channeled into compassionate guidance.',
  },

  INTJ: {
    type: 'INTJ',
    title: 'The Strategic Architect',
    subtitle: 'Systems thinking in pursuit of mastery',
    description: `You think in systems. Where others see isolated events, you see interconnected structures — leverage points, feedback loops, the architecture beneath the surface of things. Your mind naturally builds models of how things work, and then optimizes those models relentlessly. Efficiency isn't just a preference for you; it's an aesthetic.

Your confidence comes from competence. You don't seek approval — you seek understanding. You'd rather be right than popular, and you'd rather master a subject deeply than skim across many. This makes you exceptionally effective in any domain you choose to invest in, because you bring a strategic intensity that most people reserve for emergencies.

The challenge for your type is the human element. Your systems-thinking can make you impatient with inefficiency in others, and your directness can feel cold to people who need emotional acknowledgment before they can hear logical analysis. You may also over-rely on your internal models and resist updating them when reality presents contradictory evidence.

At your best, you combine strategic vision with enough interpersonal awareness to bring others along. You are the architect of things that work — the person who sees not just what is, but what the optimal configuration could be, and who has the determination to build it.`,
    strengths: ['Strategic long-range thinking', 'Independent judgment', 'Deep analytical ability', 'High standards', 'Determined follow-through'],
    blindSpots: ['Impatience with inefficiency in others', 'Emotional blind spots', 'Can seem arrogant', 'Resistance to updating mental models'],
    teamRole: 'The strategist — designs the system, identifies the critical path, and drives toward the most effective solution.',
    essence: 'The relentless pursuit of understanding how things work — and making them work better.',
  },

  ISTP: {
    type: 'ISTP',
    title: 'The Practical Analyst',
    subtitle: 'Quiet competence under pressure',
    description: `You understand things by taking them apart. Whether it's a mechanical system, a logical problem, or a tense situation, your instinct is to observe, analyze the components, and figure out how they interact. You are at your best when there's a real problem to solve — preferably one that requires both thinking and doing.

Your calm under pressure is remarkable. While others panic, you get quieter, more focused, and more effective. This isn't because you don't feel the pressure — it's because your mind naturally shifts into analytical mode when stakes are high. You trust your ability to respond to whatever arises, which gives you a kind of relaxed confidence that others find reassuring.

The challenge for your type is sustained engagement with things that don't interest you. You are driven by curiosity and competence, and when a task becomes routine or a relationship becomes predictable, your attention drifts. Long-term planning and emotional follow-through can feel like foreign languages. You may leave a trail of unfinished projects and puzzled people who thought they were closer to you than they were.

When you commit your analytical intelligence to something that genuinely matters to you, you become remarkably effective. Your combination of clear thinking and practical skill makes you the person everyone wants around when things go wrong.`,
    strengths: ['Cool-headed problem solving', 'Mechanical and logical aptitude', 'Adaptable in crises', 'Efficient and practical', 'Independent'],
    blindSpots: ['Difficulty with emotional expression', 'May seem detached', 'Can lose interest in long-term commitments', 'Understates the importance of feelings'],
    teamRole: 'The troubleshooter — stays calm when things break, diagnoses the real problem, and fixes it efficiently.',
    essence: 'The quiet competence that emerges precisely when it matters most.',
  },

  ISFP: {
    type: 'ISFP',
    title: 'The Gentle Artisan',
    subtitle: 'Living with quiet authenticity',
    description: `You experience the world through a finely tuned aesthetic sense. Colors, textures, sounds, atmospheres — you notice the sensory qualities of life that others walk past without registering. This isn't mere sensitivity; it's a form of intelligence. You understand things through how they feel, and this understanding often reaches deeper than analytical thought.

Your values run deep and quiet. You don't announce your principles — you live them. When something matters to you, your commitment is fierce, even though your expression of it may be gentle. You'd rather demonstrate who you are through your actions and your creations than through arguments or declarations.

The challenge for your type is visibility. You may struggle to assert yourself in a world that rewards loudness. Your preference for harmony can lead you to suppress your own needs until they erupt in uncharacteristic ways. And your discomfort with conflict may cause you to avoid necessary confrontations that would ultimately serve your relationships.

At your best, you bring a rare quality of authentic presence to everything you do. You create beauty not as decoration but as an expression of genuine feeling. In a world that often prizes efficiency over meaning, you remind people that how something is experienced matters as much as whether it works.`,
    strengths: ['Aesthetic sensitivity', 'Authentic self-expression', 'Loyal to deep values', 'Gentle with others', 'Present-moment awareness'],
    blindSpots: ['Conflict avoidance', 'Difficulty with self-advocacy', 'May undervalue own contributions', 'Can be overly sensitive to criticism'],
    teamRole: 'The harmonizer — brings aesthetic awareness, keeps the team grounded in values, and notices when the human element is being neglected.',
    essence: 'Authenticity expressed through beauty, action, and quiet devotion.',
  },

  INFP: {
    type: 'INFP',
    title: 'The Reflective Idealist',
    subtitle: 'Inner depth in search of meaning',
    description: `You carry an inner world of extraordinary richness — a landscape of values, feelings, ideals, and imaginative possibilities that is far more vivid and complex than most people suspect. Outwardly you may appear quiet or even reserved, but beneath the surface, you are constantly processing, feeling, and creating meaning from your experience.

Your deepest motivation is authenticity. You need to live in alignment with your values, and you can detect inauthenticity — in yourself and others — with almost painful precision. This makes you a natural advocate for the marginalized, the misunderstood, and the overlooked. You see the humanity in people that others write off.

The challenge for your type is the gap between your ideal inner world and the messy outer one. You may struggle with procrastination, not from laziness but from the paralysis of wanting everything you do to be perfect and meaningful. You can also become so absorbed in your inner landscape that you neglect the practical demands of daily life.

When you learn to express your inner depth through sustained creative or relational effort — accepting imperfection as part of the process — you become a source of genuine inspiration. Your gift is the ability to see beauty and meaning where others see only the ordinary.`,
    strengths: ['Deep emotional intelligence', 'Creative imagination', 'Strong personal values', 'Empathy for the underdog', 'Capacity for meaningful connection'],
    blindSpots: ['Perfectionist paralysis', 'Avoidance of practical demands', 'Over-idealization', 'Difficulty with criticism and conflict'],
    teamRole: 'The conscience — ensures the team stays true to its values and doesn\'t lose sight of the human impact of its decisions.',
    essence: 'The search for meaning expressed through creative depth and gentle conviction.',
  },

  INTP: {
    type: 'INTP',
    title: 'The Logical Explorer',
    subtitle: 'Precision thinking across open frontiers',
    description: `Your mind is a laboratory. You take ideas apart, examine their components, test their internal consistency, and reassemble them into more precise and elegant forms. You are less interested in what is accepted than in what is actually true — and you're willing to follow a line of reasoning wherever it leads, even if the destination is uncomfortable or unpopular.

Your intellectual honesty is your greatest asset. You don't adopt positions because they're convenient; you adopt them because you've stress-tested them against every objection you can generate. This makes your conclusions unusually reliable — when you say you believe something, it's because you've genuinely thought it through.

The challenge for your type is translating your inner precision into outer action. You may accumulate vast understanding without producing tangible output. Analysis can become an end in itself, and the gap between knowing and doing can widen until it becomes a source of frustration. You may also struggle to communicate your ideas to people who don't share your appetite for abstraction.

When you discipline yourself to express your thinking — through writing, building, teaching, or creating — you discover that your ideas have far more impact than you expected. Your precision of thought, when applied to real problems, is genuinely rare and valuable.`,
    strengths: ['Rigorous logical thinking', 'Intellectual honesty', 'Pattern recognition', 'Capacity for deep analysis', 'Independent thought'],
    blindSpots: ['Analysis paralysis', 'Difficulty with emotional situations', 'Can seem absent-minded', 'May undervalue practical execution'],
    teamRole: 'The analyst — questions assumptions, finds logical flaws, and provides the intellectual framework others build on.',
    essence: 'The relentless pursuit of logical truth, regardless of where it leads.',
  },

  ESTP: {
    type: 'ESTP',
    title: 'The Dynamic Realist',
    subtitle: 'Action and adaptability in the present moment',
    description: `You are built for the moment. While others deliberate, you act. While others theorize, you test. Your intelligence is kinetic — it comes alive in direct engagement with the real world, not in abstract reflection about it. You read situations with remarkable speed and respond with an instinctive pragmatism that others find both impressive and slightly unnerving.

Your social energy is magnetic. You bring a vitality to any room you enter — not through performance, but through genuine engagement. You notice what's actually happening (not what people say is happening), and you respond to reality as it is, without the filters of wishful thinking or anxious projection.

The challenge for your type is depth. Your orientation toward action and the present moment can make it difficult to invest in long-term plans or to sit with emotional complexity. You may avoid introspection because it feels unproductive, or because what you find when you slow down is less comfortable than the momentum of doing. Relationships may suffer when partners need sustained emotional attention that doesn't come naturally to you.

When you bring your natural vitality and directness into genuine self-awareness, you become a force of nature — someone who combines the ability to see reality clearly with the courage to act on what they see.`,
    strengths: ['Quick situational assessment', 'Adaptable and resourceful', 'Direct communication', 'Energetic presence', 'Pragmatic problem-solving'],
    blindSpots: ['Impatience with theory', 'Avoidance of emotional depth', 'Risk of impulsiveness', 'May neglect long-term consequences'],
    teamRole: 'The catalyst — gets things moving, negotiates in real-time, and brings energy when the group stalls.',
    essence: 'The courage to act on what is real, right now.',
  },

  ESFP: {
    type: 'ESFP',
    title: 'The Vivid Performer',
    subtitle: 'Joyful presence and spontaneous warmth',
    description: `You bring life into focus. Where others get lost in their heads, you remain grounded in sensory experience — the warmth of a conversation, the energy of a crowd, the texture of a shared moment. You have a gift for making people feel included, noticed, and alive. Your enthusiasm is not performance; it's an authentic expression of your orientation toward the good in life.

Your social intelligence is intuitive and practical. You read people through their body language, tone, and energy rather than through analysis of their words. This gives you a kind of interpersonal fluency that more cerebral types can only envy. You know how to make people comfortable, how to lighten a mood, and how to find the fun in almost any situation.

The challenge for your type is staying with difficulty. Your orientation toward positive experience can become avoidance of painful but necessary truths. You may flee from conflict, from boredom, from emotional intensity — not because you're shallow, but because negativity feels genuinely toxic to your system. Learning to sit with discomfort without immediately seeking relief is an important growth edge.

When you bring your warmth and presence into the full range of human experience — including the difficult parts — you become someone who doesn't just entertain but genuinely heals. Your gift is reminding people that life, at its core, is worth enjoying.`,
    strengths: ['Infectious enthusiasm', 'Social warmth', 'Present-moment awareness', 'Practical generosity', 'Adaptable and spontaneous'],
    blindSpots: ['Avoidance of negative emotions', 'Difficulty with long-term planning', 'May prioritize fun over responsibility', 'Can feel restless with routine'],
    teamRole: 'The energizer — maintains morale, celebrates wins, and keeps the human connection alive within the group.',
    essence: 'The gift of making others feel truly alive and welcome.',
  },

  ENFP: {
    type: 'ENFP',
    title: 'The Enthusiastic Visionary',
    subtitle: 'Possibility, connection, and infectious passion',
    description: `You see potential everywhere. Every person you meet is a story waiting to unfold; every situation contains hidden possibilities; every idea connects to five other ideas in ways that energize your imagination. Your mind moves in expansive spirals rather than straight lines, and your enthusiasm for what could be is so genuine that it pulls others into your orbit.

Your gift for connection is rooted in authentic curiosity about people. You don't just make small talk — you find the real conversation. You have an instinct for asking the question that opens someone up, for finding the common ground that makes a stranger feel understood. This makes you a natural catalyst for new relationships, new projects, and new movements.

The challenge for your type is follow-through. The very quality that makes you brilliant at beginnings — your attraction to novelty and possibility — makes you vulnerable to abandoning things once the initial excitement fades. You may accumulate a trail of started-but-not-finished projects, each one begun with genuine passion and left behind when something newer appeared on the horizon.

When you develop the discipline to stay with your vision through the boring middle — when you learn that depth requires the same commitment as breadth — you become someone who doesn't just inspire possibilities but actually brings them into being.`,
    strengths: ['Inspiring enthusiasm', 'Creative ideation', 'Deep interpersonal connection', 'Adaptability', 'Championing others\' potential'],
    blindSpots: ['Follow-through on commitments', 'Scattered focus', 'Difficulty with routine tasks', 'May over-promise'],
    teamRole: 'The spark — generates ideas, builds connections between people, and maintains the team\'s sense of purpose and excitement.',
    essence: 'The infectious belief that more is possible — for you, for others, for the world.',
  },

  ENTP: {
    type: 'ENTP',
    title: 'The Inventive Challenger',
    subtitle: 'Ideas tested through debate and experiment',
    description: `You think by arguing. Not from aggression, but from a genuine need to test ideas against opposition. A thought doesn't feel real to you until it's been challenged, defended, revised, and sharpened through intellectual combat. You are the natural devil's advocate — not because you enjoy being contrary, but because you believe that truth emerges from the collision of perspectives.

Your mental agility is remarkable. You can hold multiple viewpoints simultaneously, switch between them fluently, and spot the weakness in any argument — including your own. This makes you a formidable debater and an invaluable innovator, because you can see around corners that others don't even know exist.

The challenge for your type is the gap between ideation and execution. You generate ideas at a pace that no single lifetime could implement, and you may mistake the intellectual thrill of solving a problem in your head for the much harder work of solving it in reality. You can also wound people unintentionally — your playful challenging of ideas can feel like personal attack to types who don't separate their identity from their opinions.

When you channel your intellectual energy into sustained creative or entrepreneurial effort — and when you learn to challenge ideas without challenging the person holding them — you become a genuine force for innovation. Your mind is a tool capable of extraordinary things, if you choose to aim it.`,
    strengths: ['Rapid ideation', 'Intellectual versatility', 'Persuasive communication', 'Pattern disruption', 'Strategic creativity'],
    blindSpots: ['Difficulty with follow-through', 'Can be argumentative', 'May neglect emotional impact', 'Easily bored by implementation'],
    teamRole: 'The innovator — challenges assumptions, generates unconventional solutions, and keeps the team from settling for the obvious answer.',
    essence: 'The conviction that every idea should be tested — and the agility to test it.',
  },

  ESTJ: {
    type: 'ESTJ',
    title: 'The Decisive Organizer',
    subtitle: 'Order, accountability, and practical leadership',
    description: `You lead by organizing. Your mind naturally identifies what needs to happen, in what order, and who should do it. You don't just see the goal — you see the operational steps required to reach it, and you have the directness and drive to make sure those steps actually get taken. Where others talk about plans, you execute them.

Your strength is your ability to create and maintain structure. Meetings have agendas, projects have timelines, and people have clear expectations — because you make it so. This isn't bureaucratic impulse; it's a genuine understanding that complex things only get done when someone imposes reliable order on them.

The challenge for your type is flexibility. Your confidence in your own judgment can become rigidity when circumstances change. You may push through with the original plan even when the situation calls for adaptation. You can also be perceived as domineering — your directness, while efficient, can steamroll over quieter voices that have important things to contribute.

When you combine your organizational strength with genuine openness to other perspectives — when you use your authority to empower rather than control — you become the kind of leader that people are grateful to follow. Not because you're charming, but because things actually work when you're in charge.`,
    strengths: ['Organizational efficiency', 'Clear decision-making', 'Accountability', 'Direct communication', 'Practical leadership'],
    blindSpots: ['Rigidity under changing conditions', 'Can dismiss emotional concerns', 'May be perceived as domineering', 'Difficulty with ambiguity'],
    teamRole: 'The organizer — creates structure, holds people accountable, and ensures the plan gets executed on time.',
    essence: 'The determination to make things work through clear-headed, practical leadership.',
  },

  ESFJ: {
    type: 'ESFJ',
    title: 'The Supportive Host',
    subtitle: 'Community built through active care',
    description: `You build community wherever you go. Your instinct is to create environments where people feel welcome, valued, and connected — and you do this not through abstract principles but through concrete acts of hospitality, recognition, and care. You remember birthdays, anticipate needs, and create the social glue that holds groups together.

Your social awareness is highly developed. You read group dynamics with precision — who feels included, who's being overlooked, where tension is building. And you act on what you read, often before anyone else has even noticed the problem. This makes you an invaluable presence in any community, organization, or family.

The challenge for your type is over-dependence on external validation. Your sense of self may be too closely tied to whether others appreciate your efforts. When your care isn't acknowledged — or worse, is taken for granted — you can experience disproportionate hurt. You may also struggle with people who don't follow social conventions, perceiving their nonconformity as a personal slight rather than a difference in style.

When you ground your natural warmth in a secure sense of your own worth — when you care because it's who you are rather than because you need the response — you become a genuinely transformative community builder. People don't just enjoy being around you; they become better versions of themselves.`,
    strengths: ['Community building', 'Social awareness', 'Practical care for others', 'Organizational follow-through', 'Loyal and dependable'],
    blindSpots: ['Need for external validation', 'Difficulty with nonconformists', 'May suppress own dissatisfaction', 'Can be overly conventional'],
    teamRole: 'The host — builds group cohesion, ensures everyone feels included, and manages the social and emotional logistics of collaboration.',
    essence: 'The art of making people feel that they belong.',
  },

  ENFJ: {
    type: 'ENFJ',
    title: 'The Charismatic Mentor',
    subtitle: 'Drawing out the best in others',
    description: `You see people's potential — and you feel compelled to help them reach it. Your natural orientation is toward growth: your own, certainly, but more characteristically, the growth of the people around you. You have an intuitive sense of what someone could become, and you possess the warmth, communication skill, and persistence to help them get there.

Your influence is personal rather than positional. People follow you not because of your title but because of your genuine investment in their development. You listen with an intensity that makes people feel truly heard, and you speak with a conviction that makes your encouragement feel credible rather than generic. This combination of empathy and vision makes you a natural mentor, teacher, and leader.

The challenge for your type is the boundary between helping and controlling. Your vision of someone's potential can become an expectation they didn't ask for. You may push people toward growth they aren't ready for, or take their resistance personally. You can also neglect your own development while pouring energy into others — a form of avoidance that looks like generosity.

When you learn to offer your insight without attachment to whether it's accepted — when you hold your vision for others lightly — you become the kind of mentor that people remember for the rest of their lives. Not the one who told them who to be, but the one who helped them discover it themselves.`,
    strengths: ['Inspiring communication', 'Intuitive empathy', 'Developmental focus', 'Charismatic leadership', 'Genuine warmth'],
    blindSpots: ['Can be overly involved in others\' lives', 'May neglect own needs', 'Difficulty accepting others\' choices', 'Can take disagreement personally'],
    teamRole: 'The mentor — develops team members, articulates shared vision, and ensures the group\'s efforts serve a meaningful purpose.',
    essence: 'The ability to see who someone could become — and the warmth to help them believe it.',
  },

  ENTJ: {
    type: 'ENTJ',
    title: 'The Commanding Strategist',
    subtitle: 'Vision executed through decisive leadership',
    description: `You lead from the front. Your mind naturally operates at the strategic level — you see the big picture, identify the most efficient path to the goal, and mobilize resources to get there. You don't just have opinions; you have plans. And you have the drive, confidence, and communication skill to turn those plans into reality.

Your decisiveness is one of your defining qualities. While others debate, you decide. While others worry about consensus, you take responsibility for the direction and invite others to contribute within that framework. This isn't arrogance — it's a genuine confidence in your ability to assess situations accurately and act effectively.

The challenge for your type is the authoritarian shadow. Your confidence can shade into dismissiveness when others move too slowly or think too differently. You may undervalue perspectives that don't immediately register as useful, especially emotional or intuitive input that doesn't fit your logical framework. You can also burn out — not from lack of energy, but from the relentless self-imposed pressure to achieve.

When you temper your strategic drive with genuine curiosity about perspectives unlike your own — when you lead through empowerment rather than direction — you become the kind of leader who doesn't just achieve goals but builds lasting institutions. Your vision, combined with your executive ability, is genuinely rare.`,
    strengths: ['Strategic vision', 'Decisive action', 'Efficient resource management', 'Confident communication', 'Long-term planning'],
    blindSpots: ['Can be dismissive of emotional input', 'May micromanage', 'Difficulty delegating', 'Can prioritize achievement over relationships'],
    teamRole: 'The commander — sets the direction, makes the tough calls, and drives the team toward ambitious goals.',
    essence: 'The fusion of vision and execution — the will to build something that matters.',
  },
};
