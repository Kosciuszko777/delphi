import type { CanonFragment } from './types';

/** Canon fragments — domain: purpose. */
export const PURPOSE_FRAGMENTS: CanonFragment[] = [
  // ═══════════════════════════════════════════
  // JUNG — 16 types × purpose
  // ═══════════════════════════════════════════
  {
    id: 'jung:INTJ:purpose', system: 'jung', key: 'INTJ', domain: 'purpose',
    traitIds: ['jung:introversion', 'jung:intuition', 'jung:thinking', 'jung:judging'],
    text: 'Your purpose lives in mastering complex systems and shaping them into better structures. You are oriented toward understanding how things work and redesigning the ones that do not. Meaning arrives not through belonging but through competence applied to a problem worth solving. The risk: you pursue mastery for its own sake and forget to connect the result to something that matters to another person. The practice: once per quarter, ask who benefits from what you built. If the answer is only yourself, widen the scope.',
  },
  {
    id: 'jung:INTP:purpose', system: 'jung', key: 'INTP', domain: 'purpose',
    traitIds: ['jung:introversion', 'jung:intuition', 'jung:thinking', 'jung:perceiving'],
    text: 'Your purpose is to understand. Not to explain, not to teach, not to apply — though those may follow — but to reach the layer of reality where the model finally clicks. You are most alive when a new framework resolves a confusion you have carried for months. The risk: understanding without output becomes private satisfaction. The practice: give your understanding a form others can encounter — a diagram, a paragraph, a tool. Your purpose completes not when you grasp the idea but when the idea leaves your mind and enters the world.',
  },
  {
    id: 'jung:ENTJ:purpose', system: 'jung', key: 'ENTJ', domain: 'purpose',
    traitIds: ['jung:extraversion', 'jung:intuition', 'jung:thinking', 'jung:judging'],
    text: 'Your purpose is to build something that outlasts you. Organizations, systems, institutions — you are wired to create lasting structures and lead them toward a defined objective. Meaning comes from impact at scale, and you measure it honestly. The risk: you confuse scale with significance and build something large that is not actually important. The practice: define the change your work creates in one sentence. If the sentence sounds impressive but empty, the purpose needs refining before the strategy does.',
  },
  {
    id: 'jung:ENTP:purpose', system: 'jung', key: 'ENTP', domain: 'purpose',
    traitIds: ['jung:extraversion', 'jung:intuition', 'jung:thinking', 'jung:perceiving'],
    text: 'Your purpose is to connect ideas that no one else sees as connected and to make the resulting insight available. You are a translator between domains, a bridge-builder between disciplines. Meaning arrives when someone looks at your synthesis and says "I never thought of it that way." The risk: you collect connections without committing to any one long enough to develop it fully. The practice: choose one synthesis per year and bring it to completion. A finished bridge is worth more than twenty half-drawn blueprints.',
  },
  {
    id: 'jung:INFJ:purpose', system: 'jung', key: 'INFJ', domain: 'purpose',
    traitIds: ['jung:introversion', 'jung:intuition', 'jung:feeling', 'jung:judging'],
    text: 'Your purpose is to see what people could become and to create the conditions where that becoming is possible. You are oriented toward potential — in individuals, in communities, in ideas. Meaning comes from witnessing growth you helped catalyze, even when your role was invisible. The risk: you carry a vision of the ideal so strongly that the imperfect present feels intolerable. The practice: honour what is, not only what could be. Purpose is not a destination to reach but a direction to face while doing the day\'s work.',
  },
  {
    id: 'jung:INFP:purpose', system: 'jung', key: 'INFP', domain: 'purpose',
    traitIds: ['jung:introversion', 'jung:intuition', 'jung:feeling', 'jung:perceiving'],
    text: 'Your purpose is to live authentically and to give that authenticity a voice. You are here to show that depth, feeling, and meaning are not weaknesses in a world that rewards speed and surface. Meaning arrives when something you created — a piece of writing, a conversation, a way of being — helps someone feel less alone. The risk: you wait for the perfect expression and produce nothing. The practice: share the imperfect version. Authenticity does not require polish; it requires presence.',
  },
  {
    id: 'jung:ENFJ:purpose', system: 'jung', key: 'ENFJ', domain: 'purpose',
    traitIds: ['jung:extraversion', 'jung:intuition', 'jung:feeling', 'jung:judging'],
    text: 'Your purpose is to develop people. You see untapped capacity in others and feel compelled to help them access it. Teaching, mentoring, facilitating, organizing — any role where your influence helps someone grow. Meaning arrives through others\' breakthroughs, which you feel as deeply as your own. The risk: you define yourself entirely through others\' success and lose track of your own growth. The practice: apply the same developmental attention to yourself that you instinctively give others. Your purpose includes your own becoming.',
  },
  {
    id: 'jung:ENFP:purpose', system: 'jung', key: 'ENFP', domain: 'purpose',
    traitIds: ['jung:extraversion', 'jung:intuition', 'jung:feeling', 'jung:perceiving'],
    text: 'Your purpose is to inspire possibility. You see potential everywhere — in people, in ideas, in situations others have given up on — and your energy awakens it. Meaning arrives in the moment when someone moves from "I can\'t" to "maybe I can," and you were the catalyst. The risk: you scatter your inspiration so widely that none of it takes root. The practice: choose three people or projects this year and stay with them through the difficult middle. Inspiration that endures is your purpose fulfilled.',
  },
  {
    id: 'jung:ISTJ:purpose', system: 'jung', key: 'ISTJ', domain: 'purpose',
    traitIds: ['jung:introversion', 'jung:sensing', 'jung:thinking', 'jung:judging'],
    text: 'Your purpose is to maintain and protect what works. In a world obsessed with innovation, the person who preserves the systems that actually function is quietly indispensable. You serve truth through accuracy, community through reliability, and progress through conservation of what should not change. The risk: you define purpose so narrowly as duty that there is no room for desire. The practice: ask what you would build if duty were fulfilled. Your purpose has a dimension beyond obligation, and it is waiting to be named.',
  },
  {
    id: 'jung:ISFJ:purpose', system: 'jung', key: 'ISFJ', domain: 'purpose',
    traitIds: ['jung:introversion', 'jung:sensing', 'jung:feeling', 'jung:judging'],
    text: 'Your purpose is to care for the continuity of the people and traditions that matter to you. You are the keeper of what should not be forgotten — histories, rituals, relationships, the small things that hold a community together. Meaning comes from being relied upon and from the quiet knowledge that things are better because you tended them. The risk: you define purpose only through service and never ask what your own soul needs. The practice: tend one thing this month that is only for you.',
  },
  {
    id: 'jung:ESTJ:purpose', system: 'jung', key: 'ESTJ', domain: 'purpose',
    traitIds: ['jung:extraversion', 'jung:sensing', 'jung:thinking', 'jung:judging'],
    text: 'Your purpose is to organize the world around you into something functional, fair, and efficient. You bring order where there is chaos and accountability where there is drift. Meaning comes from seeing the system you built or maintained running well and serving the people inside it. The risk: you reduce purpose to productivity and miss the human dimension. The practice: once per month, ask someone you lead what they need from you beyond the process. The answer will show you the layer of purpose your efficiency alone does not reach.',
  },
  {
    id: 'jung:ESFJ:purpose', system: 'jung', key: 'ESFJ', domain: 'purpose',
    traitIds: ['jung:extraversion', 'jung:sensing', 'jung:feeling', 'jung:judging'],
    text: 'Your purpose is to create belonging. You build the social infrastructure — the gatherings, the check-ins, the traditions — that make people feel part of something. Meaning arrives when the community you nurtured holds someone through a hard time without being asked. The risk: you measure your worth by how much you are needed and never discover what you want. The practice: notice what you would choose if no one needed you to choose anything. That answer is not selfish — it is the part of your purpose you have not yet explored.',
  },
  {
    id: 'jung:ISTP:purpose', system: 'jung', key: 'ISTP', domain: 'purpose',
    traitIds: ['jung:introversion', 'jung:sensing', 'jung:thinking', 'jung:perceiving'],
    text: 'Your purpose is competence in action. You are here to master something tangible — a craft, a tool, a discipline — and to demonstrate that mastery solves real problems. Meaning comes from the moment the broken thing works again, the stuck system moves, the impossible task becomes routine through skill. The risk: you equate purpose with utility and reject anything that cannot be immediately applied. The practice: let one pursuit exist without justification. Not everything that matters to you needs to be useful to someone else.',
  },
  {
    id: 'jung:ISFP:purpose', system: 'jung', key: 'ISFP', domain: 'purpose',
    traitIds: ['jung:introversion', 'jung:sensing', 'jung:feeling', 'jung:perceiving'],
    text: 'Your purpose is to bring beauty and care to the present moment. You notice what others rush past — the quality of light, the texture of a material, the feeling in a room — and your attention to these things creates value that is felt but rarely named. Meaning arrives through craft, through sensory experience, through the quiet act of making something better than it was. The risk: you wait for external validation of a purpose you already embody. The practice: name it yourself. Your purpose does not require anyone else\'s permission to exist.',
  },
  {
    id: 'jung:ESTP:purpose', system: 'jung', key: 'ESTP', domain: 'purpose',
    traitIds: ['jung:extraversion', 'jung:sensing', 'jung:thinking', 'jung:perceiving'],
    text: 'Your purpose is to act when others hesitate. You are built for the decisive moment — the crisis, the opportunity, the negotiation that turns on nerve and timing. Meaning comes from testing yourself against real stakes and discovering that you can perform. The risk: you chase intensity and mistake adrenaline for purpose. The practice: after the peak experience, sit quietly and ask what it served. Purpose and thrill sometimes overlap, but they are not the same. The moments that fulfil you most will involve both courage and consequence.',
  },
  {
    id: 'jung:ESFP:purpose', system: 'jung', key: 'ESFP', domain: 'purpose',
    traitIds: ['jung:extraversion', 'jung:sensing', 'jung:feeling', 'jung:perceiving'],
    text: 'Your purpose is to bring people into the present. In a world of anxiety about the future and regret about the past, you are the one who says "we are here, now, and this is good." Meaning comes through shared experience, celebration, and the simple act of making people feel alive. The risk: you avoid the depths that give the surface its meaning. The practice: once per month, sit with something uncomfortable instead of brightening it. The purpose you find in that depth will give your joy a foundation it cannot have without it.',
  },

  // ═══════════════════════════════════════════
  // ENNEAGRAM — 9 cores × purpose
  // ═══════════════════════════════════════════
  {
    id: 'ennea:1:purpose', system: 'ennea', key: '1', domain: 'purpose',
    traitIds: ['enneagram:reformer-standards', 'enneagram:reformer-integrity'],
    text: 'Your core motivation is integrity — to be good, to do right, to improve what is broken. Purpose for you is inseparable from ethics: you feel most alive when your actions align with your standards and most distressed when they do not. The risk: you narrow purpose to moral performance and lose the joy that purpose is also meant to carry. The practice: find one thing this week that you do for delight, not for improvement. Your purpose includes more than correction — it includes the capacity to be satisfied with what is already whole.',
  },
  {
    id: 'ennea:2:purpose', system: 'ennea', key: '2', domain: 'purpose',
    traitIds: ['enneagram:helper-attunement', 'enneagram:helper-giving'],
    text: 'Your core purpose is to love and to be essential to the people you love. You find meaning in connection, in being needed, in the knowledge that your presence makes someone\'s life better. The risk: you define purpose entirely through others and have no answer when asked what you want for yourself. The practice: complete this sentence without naming another person: "I exist to ____." If the sentence is difficult, it is the right exercise. Your purpose has a first-person chapter that you have not yet written.',
  },
  {
    id: 'ennea:3:purpose', system: 'ennea', key: '3', domain: 'purpose',
    traitIds: ['enneagram:achiever-drive', 'enneagram:achiever-adapt'],
    text: 'Your core purpose is to become the best version of yourself and to make that achievement visible. You are driven to excel, and the visible evidence of excellence — the recognition, the result, the record — is how you know you are on path. The risk: you achieve everything the world measures and feel empty at the summit. The practice: define one form of success that has no audience. Something you would pursue if no one would ever know. That pursuit is closer to your actual purpose than the scoreboard.',
  },
  {
    id: 'ennea:4:purpose', system: 'ennea', key: '4', domain: 'purpose',
    traitIds: ['enneagram:individualist-depth', 'enneagram:individualist-unique'],
    text: 'Your core purpose is to be authentically yourself and to express that authenticity in a form others can encounter. You are here to prove that depth and beauty coexist, that suffering has meaning, and that the individual voice matters. The risk: you romanticize purpose and mistake longing for direction. The practice: stop waiting for purpose to feel transcendent. Purpose is also in the ordinary — the daily creation, the consistent practice, the small offering that accumulates into a body of work. Show up today; meaning arrives through repetition, not revelation.',
  },
  {
    id: 'ennea:5:purpose', system: 'ennea', key: '5', domain: 'purpose',
    traitIds: ['enneagram:investigator-detach', 'enneagram:investigator-expertise'],
    text: 'Your core purpose is to understand the world deeply enough to navigate it without dependence. Knowledge is your currency, and the acquisition of it is not a hobby but a survival strategy elevated to a life orientation. You feel most purposeful when you know something no one else around you knows. The risk: understanding becomes a substitute for living. The practice: take one piece of knowledge you hold and act on it. Purpose for you completes not in the knowing but in the demonstration that what you know changes something real.',
  },
  {
    id: 'ennea:6:purpose', system: 'ennea', key: '6', domain: 'purpose',
    traitIds: ['enneagram:loyalist-vigilance', 'enneagram:loyalist-loyalty'],
    text: 'Your core purpose is to create safety — for yourself, for your people, for the institutions you trust. You are the guardian who scans the perimeter so others can sleep. Meaning comes from the knowledge that your vigilance prevented harm, even when no one noticed. The risk: you define purpose through fear and never arrive at the trust that would let you rest. The practice: notice one moment today when you are safe. Not intellectually — physically. Let the body register it. Your purpose includes the capacity to receive the safety you build for others.',
  },
  {
    id: 'ennea:7:purpose', system: 'ennea', key: '7', domain: 'purpose',
    traitIds: ['enneagram:enthusiast-optimism', 'enneagram:enthusiast-variety'],
    text: 'Your core purpose is to discover what is possible and to share that discovery with contagious energy. You expand horizons — your own and everyone else\'s. Meaning arrives in the moment of opening: the new idea, the unexpected connection, the plan that changes everything. The risk: you chase possibility so relentlessly that you never inhabit any one possibility deeply enough to know it. The practice: stay with one pursuit long enough to encounter its difficulty. Purpose that survives the boring middle is the real kind.',
  },
  {
    id: 'ennea:8:purpose', system: 'ennea', key: '8', domain: 'purpose',
    traitIds: ['enneagram:challenger-directness', 'enneagram:challenger-protection'],
    text: 'Your core purpose is to protect, and to hand strength onward. You are built for situations where someone needs to stand up, speak directly, and absorb the consequences. Meaning comes from knowing that your strength served someone who did not have enough of their own. The risk: you define purpose through opposition and need an enemy to feel alive. The practice: build something this month that has nothing to do with fighting. A garden, a meal, a quiet conversation. Your purpose includes creation, not only confrontation.',
  },
  {
    id: 'ennea:9:purpose', system: 'ennea', key: '9', domain: 'purpose',
    traitIds: ['enneagram:peacemaker-harmony', 'enneagram:peacemaker-numbing'],
    text: 'Your core purpose is to hold the whole. You see the unity beneath the conflict, the common ground beneath the argument, the peace that exists before the disruption. Meaning comes from creating spaces where opposing forces coexist without destruction. The risk: you merge so completely with the whole that your own purpose dissolves into everyone else\'s. The practice: state one thing you want, not one thing you want for someone else. Your purpose requires your presence — not just your accommodation.',
  },

  // ═══════════════════════════════════════════
  // HUMAN DESIGN — 5 types × purpose
  // ═══════════════════════════════════════════
  {
    id: 'hd:Generator:purpose', system: 'hd', key: 'Generator', domain: 'purpose',
    traitIds: ['hd:sacral-energy'],
    text: 'Your purpose reveals itself through response. You are not here to figure out your path in advance — you are here to encounter life and notice what your sacral responds to with genuine energy. The career, the relationship, the creative project that lights you up is the one you are meant to pursue. The practice: stop trying to engineer purpose from your mind. Instead, expose yourself to a wider range of experiences and trust the gut response that says yes. Purpose is not a concept for you — it is a physical sensation.',
  },
  {
    id: 'hd:Manifesting Generator:purpose', system: 'hd', key: 'Manifesting Generator', domain: 'purpose',
    traitIds: ['hd:multi-passionate'],
    text: 'Your purpose is plural. You are not designed for one calling — you are designed for several, sometimes running in parallel, sometimes in sequence. The culture says "find your one thing." Ignore it. Your design says "respond to what pulls you and move fast." The practice: give yourself permission to have a purpose that looks like a portfolio, not a thesis. The thread that connects your many pursuits is you — your energy, your speed, your capacity to find the shortcut that works. That thread is the purpose.',
  },
  {
    id: 'hd:Projector:purpose', system: 'hd', key: 'Projector', domain: 'purpose',
    traitIds: ['hd:seeing-gift'],
    text: 'Your purpose is to guide. Not to do the work yourself — though you can — but to see how the work should be done and to direct the energy of others toward that vision. You are the coach, the advisor, the systems architect. Purpose arrives through recognition: when someone sees your gift and invites you to use it. The practice: make your gift visible. Write, speak, demonstrate. The invitation comes to those who are seen, and being seen requires that you show what you know before you are asked.',
  },
  {
    id: 'hd:Manifestor:purpose', system: 'hd', key: 'Manifestor', domain: 'purpose',
    traitIds: ['hd:initiating-force'],
    text: 'Your purpose is to initiate. You bring into existence what did not exist before — the company, the movement, the work of art, the conversation that changes everything. You do not need permission, and you do not need consensus. You need clarity about what you are here to start. The practice: write a list of things you have initiated in your life. The pattern will show you your purpose more accurately than any personality test. Your purpose is already in your history, visible in the trail of things you began.',
  },
  {
    id: 'hd:Reflector:purpose', system: 'hd', key: 'Reflector', domain: 'purpose',
    traitIds: ['hd:mirror-quality'],
    text: 'Your purpose is to reflect the health of the community you inhabit. You are the canary and the mirror: when the environment is right, you thrive; when it is wrong, you suffer, and that suffering is information for everyone. Your well-being is not personal indulgence — it is communal diagnostic. The practice: choose your environment as carefully as others choose their career. Your purpose cannot be fulfilled in the wrong place. The right community will feel like coming home, and your flourishing there will be your gift to it.',
  },

  // ═══════════════════════════════════════════
  // MILLMAN — finals 1–12 × purpose
  // ═══════════════════════════════════════════
  {
    id: 'millman:1:purpose', system: 'millman', key: '1', domain: 'purpose',
    traitIds: ['millman:creative-independence'],
    text: 'Your life-purpose is creative independence. You are here to bring something original into the world and to stand behind it without borrowing confidence from the crowd. The central challenge: self-doubt. Not occasional insecurity but a recurring pattern where the creative impulse is followed immediately by the question "who am I to make this?" The practice: make it anyway. The doubt does not disappear through thinking; it dissolves through doing. Every act of creation despite doubt is the purpose being walked.',
  },
  {
    id: 'millman:2:purpose', system: 'millman', key: '2', domain: 'purpose',
    traitIds: ['millman:cooperative-sensitivity'],
    text: 'Your life-purpose is cooperation — learning where the boundary sits between service and self-sacrifice. You are here to support, to partner, to make something with others that neither of you could make alone. The central challenge: giving too much and then resenting the imbalance. The practice: before you help, check whether you were asked. Before you sacrifice, ask what you are preserving. Your purpose is cooperation, not martyrdom. The difference is a boundary, and the boundary is the lesson.',
  },
  {
    id: 'millman:3:purpose', system: 'millman', key: '3', domain: 'purpose',
    traitIds: ['millman:expressive-gift'],
    text: 'Your life-purpose is expression. You are here to put into words, images, sounds, or gestures the things that others feel but cannot articulate. The central challenge: performance. When expression becomes display — when you speak to impress rather than to communicate — the purpose loses its power. The practice: say one true thing today that you have been holding back. Not a polished thought, not a rehearsed line — a raw truth. Your purpose is fulfilled not by eloquence but by honesty that happens to be eloquent.',
  },
  {
    id: 'millman:4:purpose', system: 'millman', key: '4', domain: 'purpose',
    traitIds: ['millman:builder-persistence'],
    text: 'Your life-purpose is stability. You are here to build something that lasts — not by rushing but by laying each stone correctly. The central challenge: impatience with the process. You want the outcome now, but your path teaches that the process is the outcome. The practice: identify the step you are on, not the step you want to be on. Complete this one fully before looking at the next. Your purpose is not the finished building — it is the discipline of building itself.',
  },
  {
    id: 'millman:5:purpose', system: 'millman', key: '5', domain: 'purpose',
    traitIds: ['millman:freedom-discipline'],
    text: 'Your life-purpose is freedom — not the freedom of escape but the freedom that comes through mastery. You are here to learn that discipline is the door, not the cage. The central challenge: confusing freedom with the absence of constraint instead of the presence of competence. The practice: commit to one discipline for six months without negotiation. At the end, notice whether you feel more free or less. The answer will teach you more about your purpose than any theory of freedom.',
  },
  {
    id: 'millman:6:purpose', system: 'millman', key: '6', domain: 'purpose',
    traitIds: ['millman:visionary-standards'],
    text: 'Your life-purpose is vision — seeing what could be and accepting what is, simultaneously. You are here to hold a high standard without becoming imprisoned by it. The central challenge: idealism that rejects reality. When the gap between vision and actuality becomes unbearable, you either despair or withdraw. The practice: name one thing today that meets your standard, even partially. Your purpose includes recognition of progress, not only perception of the gap.',
  },
  {
    id: 'millman:7:purpose', system: 'millman', key: '7', domain: 'purpose',
    traitIds: ['millman:inner-trust'],
    text: 'Your life-purpose is trust — specifically, trust in yourself. You are here to learn that your inner knowing is a reliable instrument, even when it contradicts external evidence. The central challenge: seeking proof for things that cannot be proven. Intuition does not submit to verification; it asks for a different kind of faith. The practice: act on one intuition this week without external validation. Track the result. Your purpose is not to become credulous — it is to learn which voice inside you is worth following.',
  },
  {
    id: 'millman:8:purpose', system: 'millman', key: '8', domain: 'purpose',
    traitIds: ['millman:abundant-leadership'],
    text: 'Your life-purpose is abundance — creating, managing, and distributing resources in ways that serve both you and others. You are here to demonstrate that power and generosity coexist. The central challenge: using power only for yourself or giving it all away. The practice: identify one area where you have more than you need and one area where someone you know has less. Create a bridge between them. Your purpose is the flow, not the accumulation.',
  },
  {
    id: 'millman:9:purpose', system: 'millman', key: '9', domain: 'purpose',
    traitIds: ['millman:exemplar-integrity'],
    text: 'Your life-purpose is integrity expressed through example. You teach by living, not by lecturing. The central challenge: the weight of being watched. People calibrate their behaviour to yours whether you ask them to or not, and this responsibility never fully lifts. The practice: choose one value and live it visibly for thirty days. Not perfectly — consistently. Your purpose is not perfection; it is alignment between what you believe and what you do, observable by anyone who cares to look.',
  },
  {
    id: 'millman:10:purpose', system: 'millman', key: '10', domain: 'purpose',
    traitIds: ['millman:creative-independence'],
    text: 'Your double-digit path amplifies the creative-independence theme with a zero that adds a spiritual or whole-system dimension. You are here to create something that serves not just your individual expression but a larger pattern. The practice: ask what your creation contributes beyond yourself. The answer does not need to be grand — a well-made meal that nourishes a family fulfils this path as surely as a published book. Your purpose connects personal originality to something that outlasts the personal.',
  },
  {
    id: 'millman:11:purpose', system: 'millman', key: '11', domain: 'purpose',
    traitIds: ['millman:creative-independence'],
    text: 'The doubled one energy makes you the most creatively inspired and the most creatively blocked of all the Millman paths. Your purpose is to create despite the doubt, to express despite the fear. The 11 does not resolve the tension between inspiration and insecurity — it holds both at maximum volume. The practice: create something today, however small. A sentence, a sketch, a melody. The purpose of the 11 is walked not in large gestures but in daily small ones that refuse to surrender to the paralysis.',
  },
  {
    id: 'millman:12:purpose', system: 'millman', key: '12', domain: 'purpose',
    traitIds: ['millman:creative-independence', 'millman:cooperative-sensitivity'],
    text: 'Your path holds the creative visionary and the cooperative servant. Your purpose is to create something original and build it with others. Neither the solo genius nor the selfless helper captures it — you need both. The central challenge: knowing when to lead and when to serve within the same project. The practice: in your current creative work, identify one decision that should be yours alone and one that should belong to the group. Your purpose is the dance between authorship and collaboration.',
  },
];
