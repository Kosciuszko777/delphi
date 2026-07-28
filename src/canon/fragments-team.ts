import type { CanonFragment } from './types';

/** Canon fragments — domain: team. */
export const TEAM_FRAGMENTS: CanonFragment[] = [
  // ═══════════════════════════════════════════
  // JUNG — 16 types × team
  // ═══════════════════════════════════════════
  {
    id: 'jung:INTJ:team', system: 'jung', key: 'INTJ', domain: 'team',
    traitIds: ['jung:introversion', 'jung:intuition', 'jung:thinking', 'jung:judging'],
    text: 'You contribute to a team the way an architect contributes to a building site: the value arrives early, in the structure, and is invisible later. You see the failure mode of a plan before others see the plan. Say it once, clearly, in writing — then resist re-litigating; repetition reads as contempt to feeling types and costs you the influence your first statement earned. Watch for the moment you withdraw because the group chose the slower path: staying engaged through a suboptimal plan is, for you, the actual teamwork.',
  },
  {
    id: 'jung:INTP:team', system: 'jung', key: 'INTP', domain: 'team',
    traitIds: ['jung:introversion', 'jung:intuition', 'jung:thinking', 'jung:perceiving'],
    text: 'Your mind maps systems; the team needs the map but rarely the full derivation. You add the most value when you translate a complex problem into a framework the group can act on — then hand it over without attachment to whether they use every part. Your risk is silence: you refine internally until the window for input closes. The practice: speak at eighty percent certainty — share the rough draft on Monday rather than the perfect one after Friday\'s decision. The remaining twenty percent arrives in dialogue, not in solitude.',
  },
  {
    id: 'jung:ENTJ:team', system: 'jung', key: 'ENTJ', domain: 'team',
    traitIds: ['jung:extraversion', 'jung:intuition', 'jung:thinking', 'jung:judging'],
    text: 'You see hierarchy as a tool and expect to use it. In a team you naturally organize: assigning, sequencing, driving tempo. This is genuinely useful when the group lacks direction and corrosive when it already has one. Before you restructure a meeting, check whether the group is confused or simply slower. Your pace is not the benchmark. The concrete practice: when someone else leads, stay ten seconds longer in the listening posture than feels comfortable. That gap is where trust compounds.',
  },
  {
    id: 'jung:ENTP:team', system: 'jung', key: 'ENTP', domain: 'team',
    traitIds: ['jung:extraversion', 'jung:intuition', 'jung:thinking', 'jung:perceiving'],
    text: 'You are the team\'s idea engine and its most distracting member. You connect dots nobody asked to connect, and half of those connections are gold. The problem: you move on before the team has absorbed the first insight. Slow the feed. When you surface an idea, state it, let silence land, then ask one person by name what they heard. This forces the idea through the group\'s filter instead of past it. Your best contribution arrives when you debate to clarify, not to win.',
  },
  {
    id: 'jung:INFJ:team', system: 'jung', key: 'INFJ', domain: 'team',
    traitIds: ['jung:introversion', 'jung:intuition', 'jung:feeling', 'jung:judging'],
    text: 'You read a room before anyone speaks. Your instinct for interpersonal dynamics is real and quietly relied upon, even when no one names it. The risk: you absorb the group\'s tension, process it internally, and burn out without anyone noticing you were carrying it. Name what you sense early: "It feels like we are avoiding the budget question." This externalizes your read, lets others confirm or correct it, and protects your energy. You do not need to solve the dynamic — surfacing it is the contribution.',
  },
  {
    id: 'jung:INFP:team', system: 'jung', key: 'INFP', domain: 'team',
    traitIds: ['jung:introversion', 'jung:intuition', 'jung:feeling', 'jung:perceiving'],
    text: 'Your presence in a team is quiet and your influence is indirect. You sense inauthenticity before anyone else and resist agendas that violate the group\'s stated values. When you withdraw, the team loses its conscience and does not notice until later. The practice: write your dissent if you cannot voice it. A brief note — "I think this contradicts what we agreed about X" — carries weight precisely because it comes from the person who rarely pushes. Make the discomfort external so it can be addressed.',
  },
  {
    id: 'jung:ENFJ:team', system: 'jung', key: 'ENFJ', domain: 'team',
    traitIds: ['jung:extraversion', 'jung:intuition', 'jung:feeling', 'jung:judging'],
    text: 'You are a natural facilitator: you track who has spoken, who was interrupted, who looks disengaged. The team runs smoother with you in it. The cost is that you optimize for harmony, which sometimes means smoothing over disagreements that need to be had. When you catch yourself bridging two positions into a compromise nobody actually holds, stop and name the disagreement instead. The group can tolerate more friction than you think, and authentic resolution builds more trust than diplomatic smoothing.',
  },
  {
    id: 'jung:ENFP:team', system: 'jung', key: 'ENFP', domain: 'team',
    traitIds: ['jung:extraversion', 'jung:intuition', 'jung:feeling', 'jung:perceiving'],
    text: 'You bring momentum and warmth. When the team\'s energy drops, your enthusiasm is the restart mechanism. The shadow side: you over-commit on behalf of the group, volunteering for tasks in the excitement of the brainstorm and discovering later that the calendar cannot hold them. Before you say "I\'ll handle that," pause and check the list of things you already promised. Your reliability is the bottleneck, not your energy. Protect it by under-promising once, and the team will trust your offers more.',
  },
  {
    id: 'jung:ISTJ:team', system: 'jung', key: 'ISTJ', domain: 'team',
    traitIds: ['jung:introversion', 'jung:sensing', 'jung:thinking', 'jung:judging'],
    text: 'You are the team\'s institutional memory and its most dependable executor. When something was agreed, you remember the exact terms. When a deadline is set, you meet it. The risk is rigidity: when circumstances change, you may defend the original plan past its usefulness because consistency feels like integrity. It is not always. The practice: ask yourself whether you are protecting the goal or the plan. If the goal survives a change of plan, the plan can move. State your concern once, clearly, then adapt.',
  },
  {
    id: 'jung:ISFJ:team', system: 'jung', key: 'ISFJ', domain: 'team',
    traitIds: ['jung:introversion', 'jung:sensing', 'jung:feeling', 'jung:judging'],
    text: 'You maintain the team in ways that are invisible until you stop. You remember birthdays, cover gaps, notice when someone is struggling. This service is real and routinely under-acknowledged. The danger is resentment: you give without asking and then feel unseen. The practice: name one need per week out loud. Not as a complaint, but as information. "I\'m behind on X because I covered Y" is not a grievance — it is logistics. Teams that see you clearly protect you. Help them see you.',
  },
  {
    id: 'jung:ESTJ:team', system: 'jung', key: 'ESTJ', domain: 'team',
    traitIds: ['jung:extraversion', 'jung:sensing', 'jung:thinking', 'jung:judging'],
    text: 'You bring order. You define the scope, assign the tasks, check the boxes. The team moves faster under your coordination, and your directness eliminates ambiguity. The cost: people who operate differently feel bulldozed, and their compliance masks disengagement. Watch for nods that come too quickly — they are often surrender, not agreement. Ask one open question per decision meeting: "What are we not seeing?" It costs you thirty seconds and returns signal you cannot get from a well-run agenda alone.',
  },
  {
    id: 'jung:ESFJ:team', system: 'jung', key: 'ESFJ', domain: 'team',
    traitIds: ['jung:extraversion', 'jung:sensing', 'jung:feeling', 'jung:judging'],
    text: 'You build the social fabric of the team. People feel included because you actively include them. You track morale the way others track metrics. The risk: you confuse consensus with correctness. A decision everyone likes is not always a decision that works. When you sense that the popular option is not the strong one, say so plainly — your social capital is high enough to spend on an unpopular truth. The team expects warmth from you; when you deliver honesty instead, it lands with unusual weight.',
  },
  {
    id: 'jung:ISTP:team', system: 'jung', key: 'ISTP', domain: 'team',
    traitIds: ['jung:introversion', 'jung:sensing', 'jung:thinking', 'jung:perceiving'],
    text: 'You work best at a distance from the group. Not opposed, just autonomous. You pick up the problem the team is stuck on, take it to your bench, and return with a solution that is annoyingly practical. The friction: you skip the social overhead that others rely on for alignment. Without periodic check-ins, the team will assume you have drifted off. A brief daily signal — "working on X, expect Y by Thursday" — costs you seconds and prevents the re-coordination meeting you would hate even more.',
  },
  {
    id: 'jung:ISFP:team', system: 'jung', key: 'ISFP', domain: 'team',
    traitIds: ['jung:introversion', 'jung:sensing', 'jung:feeling', 'jung:perceiving'],
    text: 'You bring craft and care. The work you touch is better because you pay attention to the details that others call minor and users call essential. In a team, your voice is the quietest and your taste is the most reliable. The risk: you defer to louder voices on matters where your judgment is actually stronger. The practice: when a quality decision is being rushed, say "this needs another pass" without explaining why yet. Defending craft is your role in the group; own it visibly.',
  },
  {
    id: 'jung:ESTP:team', system: 'jung', key: 'ESTP', domain: 'team',
    traitIds: ['jung:extraversion', 'jung:sensing', 'jung:thinking', 'jung:perceiving'],
    text: 'You are the first to act and the last to process. In a team, this means you cut through paralysis — you just start, and the momentum you create pulls others forward. The cost: not every situation benefits from speed. Some problems dissolve when you wait. The practice: before you act on behalf of the group, ask one question: "Is this reversible?" If yes, move fast. If no, announce your intent and count to ten. The team needs your bias toward action, but only when they have consented to the ride.',
  },
  {
    id: 'jung:ESFP:team', system: 'jung', key: 'ESFP', domain: 'team',
    traitIds: ['jung:extraversion', 'jung:sensing', 'jung:feeling', 'jung:perceiving'],
    text: 'You make the team want to come to work. Your energy is social glue. When morale drops, you pull people back from their screens and into the room. The shadow: you optimize for the vibe and can avoid hard conversations that would temporarily lower it. Notice when you change the subject after someone raises a problem. That redirect is visible to the person who spoke, and it reads as dismissal. Stay with the discomfort for two more exchanges before you lighten it. The group can hold both tension and warmth.',
  },

  // ═══════════════════════════════════════════
  // ENNEAGRAM — 9 cores × team
  // ═══════════════════════════════════════════
  {
    id: 'ennea:1:team', system: 'ennea', key: '1', domain: 'team',
    traitIds: ['enneagram:reformer-standards', 'enneagram:reformer-integrity'],
    text: 'You hold the team to its own standards, which is valuable until it becomes policing. You notice every error, every shortcut, every inconsistency — and your instinct is to name them all. The team benefits from your precision; it suffocates under your perfectionism. The practice: pick the one standard that matters most this week and hold it visibly. Let the rest pass. Your influence grows when it is concentrated. Watch for the inner critic extending itself outward — correcting others often means you are correcting yourself through them.',
  },
  {
    id: 'ennea:2:team', system: 'ennea', key: '2', domain: 'team',
    traitIds: ['enneagram:helper-attunement', 'enneagram:helper-giving'],
    text: 'You sense what people need and move toward it before they ask. In a team this makes you indispensable and exhausted in roughly equal measure. The invisible cost: you track favors. When the reciprocation does not come, resentment builds behind your warmth. The practice: before you help, check whether you were asked. Unsolicited help creates debt the other person did not agree to carry. Let the team ask. When they do, your generosity lands clean — as a gift, not an invoice.',
  },
  {
    id: 'ennea:3:team', system: 'ennea', key: '3', domain: 'team',
    traitIds: ['enneagram:achiever-drive', 'enneagram:achiever-adapt'],
    text: 'You raise the team\'s output. You set the pace, model urgency, and make progress visible. The risk: you optimize for measurable wins and deprioritize what cannot be shown. Relationship maintenance, quiet competence, slow-burn research — these do not fit your dashboard and they are what keeps the team alive. The practice: in your next status update, name one contribution from someone else that has no metric attached. This costs you nothing and signals that you value the work you cannot count.',
  },
  {
    id: 'ennea:4:team', system: 'ennea', key: '4', domain: 'team',
    traitIds: ['enneagram:individualist-depth', 'enneagram:individualist-unique'],
    text: 'You bring emotional honesty to a team that may prefer politeness. You name what is real — the frustration no one voices, the grief behind a failed project, the excitement that got buried under logistics. This is a genuine contribution, and it makes some teammates profoundly uncomfortable. The practice: frame your read as an observation, not a feeling. "The energy in the room shifted after that announcement" lands where "I feel like everyone is upset" sometimes does not. Precision of language protects both your insight and its reception.',
  },
  {
    id: 'ennea:5:team', system: 'ennea', key: '5', domain: 'team',
    traitIds: ['enneagram:investigator-detach', 'enneagram:investigator-conserve'],
    text: 'You contribute depth. When the team needs someone to actually understand the problem before acting, you are the one who will. The cost: you hoard information until it is complete, which means the team often acts without data you already have. The practice: share work-in-progress. A memo that says "preliminary, not confident yet" is more useful than silence followed by a finished analysis after the decision. Your instinct to conserve energy is real, but the team\'s decision timeline does not pause for your internal review cycle.',
  },
  {
    id: 'ennea:6:team', system: 'ennea', key: '6', domain: 'team',
    traitIds: ['enneagram:loyalist-vigilance', 'enneagram:loyalist-loyalty'],
    text: 'You scan for what could go wrong, and this makes you the team\'s most underappreciated asset. Optimists set the vision; you build the guardrails. The cost: your caution can read as resistance, and teams under momentum pressure may sideline you for slowing things down. The practice: frame concerns as risks, not objections. "If X happens, our fallback is Y — do we have Y?" is actionable. "I\'m worried about X" is not. Your vigilance has the most value when it comes with a contingency attached.',
  },
  {
    id: 'ennea:7:team', system: 'ennea', key: '7', domain: 'team',
    traitIds: ['enneagram:enthusiast-optimism', 'enneagram:enthusiast-variety'],
    text: 'You reframe problems as opportunities, and the team\'s mood lifts when you enter the room. This is not trivial — morale is a resource, and you generate it. The shadow: you skip past pain too quickly. When the team needs to sit with a failure and absorb its lessons, your instinct to reframe can feel dismissive. The practice: when bad news arrives, resist your first impulse to silver-line it. Say "this is hard" and let ten seconds pass. Then, and only then, explore what comes next. Optimism earned through acknowledged difficulty is trusted; reflexive positivity is not.',
  },
  {
    id: 'ennea:8:team', system: 'ennea', key: '8', domain: 'team',
    traitIds: ['enneagram:challenger-directness', 'enneagram:challenger-control'],
    text: 'You set the team\'s intensity. When you are engaged, the standard rises; when you push, people perform. The cost is invisible to you and obvious to everyone else: your force compresses people into compliance, and compliance is not the same as commitment. Watch for the person who agrees too quickly, especially after you have argued a point. That speed is not conviction — it is self-preservation. The practice: after you state your position, ask for the strongest objection. If none comes, you have silenced the room, not persuaded it.',
  },
  {
    id: 'ennea:9:team', system: 'ennea', key: '9', domain: 'team',
    traitIds: ['enneagram:peacemaker-harmony', 'enneagram:peacemaker-merging'],
    text: 'You hold the team together by holding space. You see every viewpoint, mediate without taking sides, and tolerate ambiguity that drives decisive types to frustration. The cost: your own position disappears. The team may rely on your agreeableness without ever asking what you actually want. The practice: state a preference before the consensus forms. Not after, when it feels like dissent, but before, when it is simply one voice among several. You do not need to fight for your position — just place it on the table where it can be seen.',
  },

  // ═══════════════════════════════════════════
  // HUMAN DESIGN — 5 types × team
  // ═══════════════════════════════════════════
  {
    id: 'hd:Generator:team', system: 'hd', key: 'Generator', domain: 'team',
    traitIds: ['hd:sacral-energy'],
    text: 'Your sacral energy is the engine room. When you are doing work that lights you up, the output is inexhaustible and contagious — the team rides your momentum. When you are doing work you did not choose, you drain and the team feels it as drag. The practice: before you accept a task, check your gut response. A flat "sure" is not a sacral yes; it is compliance. Protect the yes for what genuinely pulls you. The team gets more from your sixty percent capacity on the right work than your hundred on the wrong.',
  },
  {
    id: 'hd:Manifesting Generator:team', system: 'hd', key: 'Manifesting Generator', domain: 'team',
    traitIds: ['hd:multi-passionate'],
    text: 'You move faster than the team expects and in more directions than it tracks. Your speed is an asset when the group needs a prototype, a first draft, something real instead of another meeting. The cost: you skip steps that others need. You have already revised your mental model three times while the team is still on version one. The practice: when you pivot, narrate. "I tried A, it broke, I am now on B" costs five seconds and prevents the "what happened to A?" meeting that costs an hour.',
  },
  {
    id: 'hd:Projector:team', system: 'hd', key: 'Projector', domain: 'team',
    traitIds: ['hd:seeing-gift'],
    text: 'You see what the team cannot see about itself: who is misallocated, which process is broken, where the energy is leaking. This insight is your gift and your trap. Uninvited, it lands as criticism. The practice: wait for the question, or create the conditions for one. "I have a read on why this keeps stalling — want to hear it?" is an invitation to be invited. Once the door opens, your guidance is precise and the team wonders how they missed what you made obvious. Timing is everything; insight without an opening is noise.',
  },
  {
    id: 'hd:Manifestor:team', system: 'hd', key: 'Manifestor', domain: 'team',
    traitIds: ['hd:initiating-force'],
    text: 'You start things the team did not plan. This is how new directions are born and how existing ones get derailed. The difference is informing. When you act without telling the group, you create a wake — people behind you are displaced and confused. The practice: before you initiate, send one message: "I am going to X because Y." Not asking permission, which is not your design; informing, which is. The team does not need to approve your direction. It needs to see it coming so it can adjust without turbulence.',
  },
  {
    id: 'hd:Reflector:team', system: 'hd', key: 'Reflector', domain: 'team',
    traitIds: ['hd:mirror-quality'],
    text: 'You are the team\'s barometer. When something is off — the culture, the pace, the unspoken tension — you feel it before anyone else because you are sampling the entire field. The risk: the team reads your fluctuations as inconsistency instead of signal. The practice: name what you are reflecting. "The energy in this project has changed since last week" is data the team needs. Your well-being is diagnostic information about the group. Do not suppress it to appear stable; surface it so others can use what only you can sense.',
  },

  // ═══════════════════════════════════════════
  // MILLMAN — finals 1–12 × team
  // ═══════════════════════════════════════════
  {
    id: 'millman:1:team', system: 'millman', key: '1', domain: 'team',
    traitIds: ['millman:creative-independence'],
    text: 'Your purpose path pulls toward independence, and teams are, by definition, interdependent. This tension does not need to resolve — it needs to be managed. You contribute originality: the idea no one else would have brought, the angle that reframes the problem. The practice: pick one area of the project where you work solo and deliver the result to the group. This honors your need for autonomy while keeping you in the circuit. Watch for the impulse to go fully off-grid; isolation is not independence, it is withdrawal.',
  },
  {
    id: 'millman:2:team', system: 'millman', key: '2', domain: 'team',
    traitIds: ['millman:cooperative-sensitivity'],
    text: 'Cooperation is your life-path theme, and teams are where it gets tested daily. You sense when the group is out of balance and instinctively move to correct it. The cost: you over-correct. You take on the work others dropped, absorb the tension others created, and call it service. The practice: in your next team meeting, notice who is carrying less and let it stay that way for one full cycle. Your job is not to equalize the load; it is to learn where service ends and self-erasure begins.',
  },
  {
    id: 'millman:3:team', system: 'millman', key: '3', domain: 'team',
    traitIds: ['millman:expressive-gift'],
    text: 'Your path is expression, and a team is an audience that did not buy a ticket. The gift: you articulate what the group is feeling but has not named. The shadow: you perform. When you speak to be admired rather than understood, the team senses the shift and trust leaks. The practice: in collaborative discussion, say what is true before what is eloquent. A rough sentence that names the real issue earns more than a polished one that decorates it. Your expressiveness is most powerful when it serves clarity, not display.',
  },
  {
    id: 'millman:4:team', system: 'millman', key: '4', domain: 'team',
    traitIds: ['millman:builder-persistence'],
    text: 'You are the team member who builds the foundation others want to skip. When the group rushes to outcomes, you insist on process, and this insistence is your greatest contribution and your most frequent friction. The practice: state the step you believe is missing and the consequence of skipping it. "If we do not define scope, we will re-do this in two weeks" is concrete and verifiable. Let the group decide, then accept the outcome. Being right later is not a team skill; preventing the error now is.',
  },
  {
    id: 'millman:5:team', system: 'millman', key: '5', domain: 'team',
    traitIds: ['millman:freedom-discipline'],
    text: 'Freedom is your driver, and teams feel like constraint. You resist routine meetings, repetitive check-ins, and processes that exist for their own sake. This resistance is not laziness — it is a genuine signal that something is unnecessary. The practice: instead of pushing back on all structure, identify the one process that genuinely serves the group and commit to it fully. From that base of demonstrated reliability, your requests for autonomy carry weight. Freedom earned through visible discipline is respected; freedom demanded without proof is resented.',
  },
  {
    id: 'millman:6:team', system: 'millman', key: '6', domain: 'team',
    traitIds: ['millman:visionary-standards'],
    text: 'You see the team\'s potential and are frustrated by its actuality. The gap between what the group could be and what it is sits in your peripheral vision constantly. The practice: name one specific thing the team does well before you name what it should change. This is not flattery — it is calibration. Your vision has the most impact when it builds on acknowledged strengths rather than implied disappointment. Watch for the moment your standards become a lecture; that is the sign you have stopped seeing what already works.',
  },
  {
    id: 'millman:7:team', system: 'millman', key: '7', domain: 'team',
    traitIds: ['millman:inner-trust'],
    text: 'You process team dynamics internally and arrive at conclusions the group did not see you reach. This gives you an air of quiet authority that is either trusted or mistrusted depending on how much you share. The practice: when you sense a dynamic — mistrust, misalignment, hidden agenda — state the observation without the interpretation. "I notice the decision was made before the meeting started" is verifiable. "Someone is not being honest" is accusation. Your intuition is sharp; your task is to give it a form others can act on.',
  },
  {
    id: 'millman:8:team', system: 'millman', key: '8', domain: 'team',
    traitIds: ['millman:abundant-leadership'],
    text: 'You naturally organize people and resources. In a team, you gravitate toward the executive function: who does what, by when, with what budget. This is useful when the group needs a leader and corrosive when it already has one. The practice: before you direct, ask: "Who owns this?" If someone does, support them. If no one does, step in. Your leadership purpose is fulfilled not by always leading but by ensuring that leadership is always present. The team benefits most when you build others\' capacity to organize, not just your own.',
  },
  {
    id: 'millman:9:team', system: 'millman', key: '9', domain: 'team',
    traitIds: ['millman:exemplar-integrity'],
    text: 'You lead a team by example, which means the team watches you more closely than you realize. When you cut a corner, the standard drops silently. When you hold the line, others hold it too. The practice: choose one behavior you want the team to adopt and demonstrate it consistently without commentary. If you want honest feedback, give it first. If you want punctuality, arrive early. Your words set expectations; your actions set norms. The gap between the two is the exact gap the team will occupy.',
  },
  {
    id: 'millman:10:team', system: 'millman', key: '10', domain: 'team',
    traitIds: ['millman:creative-independence'],
    text: 'Your double-digit path combines creative originality with a fresh start energy that makes you the team member most likely to propose a reboot when things stagnate. You see potential in blank slates that others find destabilizing. The practice: when you propose starting over, bring one element from the old version forward. This signals that you value what was built while clearing space for what is next. Teams follow reinvention more willingly when it is framed as evolution rather than abandonment.',
  },
  {
    id: 'millman:11:team', system: 'millman', key: '11', domain: 'team',
    traitIds: ['millman:creative-independence'],
    text: 'The doubled creative energy of your path makes you the team\'s most original thinker and its most self-doubting one. You generate ideas at twice the rate and question them at the same frequency. In a team context, this means you oscillate between bold proposals and visible hesitation. The practice: assign yourself the role of first-draft generator. Commit to producing raw material for the group to refine. This channels your creativity into a structure where self-doubt becomes the group\'s editing function, not your private prison.',
  },
  {
    id: 'millman:12:team', system: 'millman', key: '12', domain: 'team',
    traitIds: ['millman:creative-independence', 'millman:cooperative-sensitivity'],
    text: 'Your path holds both the creative individualist and the cooperative diplomat. In a team, this means you can originate an idea and then build consensus around it — a rare combination. The tension: you sometimes cannot tell whether you are advocating for the idea because it is right or because you need it to be yours. The practice: propose your idea, then explicitly invite the group to change it. If the modified version is better, let it go. The path of 12 is fulfilled when creative vision and collaborative refinement become one motion.',
  },
];
