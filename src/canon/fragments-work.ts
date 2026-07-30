import type { CanonFragment } from './types';

/** Canon fragments — domain: work. */
export const WORK_FRAGMENTS: CanonFragment[] = [
  // ═══════════════════════════════════════════
  // JUNG — 16 types × work
  // ═══════════════════════════════════════════
  {
    id: 'jung:INTJ:work', system: 'jung', key: 'INTJ', domain: 'work',
    traitIds: ['jung:introversion', 'jung:intuition', 'jung:thinking', 'jung:judging'],
    text: 'You do your best work on hard problems with clear ownership and minimal supervision. Open offices, real-time collaboration, and tasks that require emotional performance drain you faster than any deadline. The environments that suit you share a pattern: high autonomy, asynchronous communication, and outcomes measured in quality rather than hours visible. The practice: negotiate your conditions before you accept the role. Asking for headphones later feels like complaining; defining your terms upfront is professional architecture.',
  },
  {
    id: 'jung:INTP:work', system: 'jung', key: 'INTP', domain: 'work',
    traitIds: ['jung:introversion', 'jung:intuition', 'jung:thinking', 'jung:perceiving'],
    text: 'You are drawn to complexity and repelled by repetition. Your best work emerges from exploratory phases where the answer is not yet known, and it often dies in execution phases where the answer must be implemented. Recognize this pattern without moralizing it. The practice: pair with a completer — someone who enjoys the process of shipping what you designed. This is not delegation of the boring work; it is specialization. Build the relationship before the deadline, and your ideas will survive their contact with reality.',
  },
  {
    id: 'jung:ENTJ:work', system: 'jung', key: 'ENTJ', domain: 'work',
    traitIds: ['jung:extraversion', 'jung:intuition', 'jung:thinking', 'jung:judging'],
    text: 'You orient naturally toward strategy and execution. Work that offers neither — maintenance roles, support functions, ambiguous mandates — will hollow you out regardless of compensation. You need a clear objective, the authority to pursue it, and a scoreboard. The risk: you optimize for promotion instead of fit, and discover three levels up that the role you fought for is administratively dense and strategically empty. The practice: before you pursue the next position, audit whether it contains the kind of problem-solving that actually energizes you.',
  },
  {
    id: 'jung:ENTP:work', system: 'jung', key: 'ENTP', domain: 'work',
    traitIds: ['jung:extraversion', 'jung:intuition', 'jung:thinking', 'jung:perceiving'],
    text: 'You thrive at the intersection of ideas and people. Roles that let you explore, connect, pitch, and prototype fit you. Roles that require you to maintain, repeat, or follow a fixed process do not. The pattern to watch: you excel in the first sixty percent of any project and lose interest precisely when the work becomes operational. The practice: build a portfolio career or negotiate project-based roles. Your value is in starting and connecting, not in sustaining. Structure your work life around that truth instead of against it.',
  },
  {
    id: 'jung:INFJ:work', system: 'jung', key: 'INFJ', domain: 'work',
    traitIds: ['jung:introversion', 'jung:intuition', 'jung:feeling', 'jung:judging'],
    text: 'You need meaning in your work the way others need a paycheck — its absence is not a preference issue, it is an energy issue. When the work connects to something larger, you access reserves that surprise people. When it does not, you wilt visibly. The practice: identify the smallest unit of meaning you can find in your current role and orient your daily work around it. If no meaning is findable, that is diagnostic. You are not lazy; you are in the wrong place. Begin planning the exit before the exhaustion makes it impossible.',
  },
  {
    id: 'jung:INFP:work', system: 'jung', key: 'INFP', domain: 'work',
    traitIds: ['jung:introversion', 'jung:intuition', 'jung:feeling', 'jung:perceiving'],
    text: 'Your work must feel authentic or it will not get your best effort. This is not a character flaw — it is a design constraint. Roles that require you to promote things you do not believe in, perform enthusiasm you do not feel, or compete in ways that contradict your values will produce mediocre output from someone who is capable of extraordinary work. The practice: list the three values you will not compromise for a job. Use them as a filter before you apply, not after you are trapped. Your best work lives on the other side of a courageous no.',
  },
  {
    id: 'jung:ENFJ:work', system: 'jung', key: 'ENFJ', domain: 'work',
    traitIds: ['jung:extraversion', 'jung:intuition', 'jung:feeling', 'jung:judging'],
    text: 'You work best in roles where you develop people, facilitate outcomes, and connect stakeholders. Teaching, coaching, project leadership, and client relations fit you. Isolated technical work does not. The risk: you absorb the emotional labor of the entire team and call it your job. Burnout arrives not from overwork but from over-caring. The practice: define the boundaries of your role in writing and read them weekly. When you catch yourself solving a problem that belongs to someone else, return it with a question instead of a solution.',
  },
  {
    id: 'jung:ENFP:work', system: 'jung', key: 'ENFP', domain: 'work',
    traitIds: ['jung:extraversion', 'jung:intuition', 'jung:feeling', 'jung:perceiving'],
    text: 'Your enthusiasm is a professional asset. You rally teams, charm clients, and generate ideas that open new directions. The cost arrives at the operational level: follow-through. You have more open loops than any system can track, and closing them feels like a different kind of work than opening them. The practice: for every new commitment, close one old one. Write the rule somewhere visible. Your career grows not when you start more things but when you finish enough of them to build a track record others can rely on.',
  },
  {
    id: 'jung:ISTJ:work', system: 'jung', key: 'ISTJ', domain: 'work',
    traitIds: ['jung:introversion', 'jung:sensing', 'jung:thinking', 'jung:judging'],
    text: 'You are the most reliable person in any organization you join. Deadlines, procedures, quality standards — you take them seriously because you understand that systems break when individuals do not. Your career risk is not performance but recognition: you do the work that keeps things running and others receive credit for the work that makes things change. The practice: document your contributions in writing, monthly. Not for vanity — for the record. Reliable people are promoted when their reliability becomes visible, not when it becomes obvious through their absence.',
  },
  {
    id: 'jung:ISFJ:work', system: 'jung', key: 'ISFJ', domain: 'work',
    traitIds: ['jung:introversion', 'jung:sensing', 'jung:feeling', 'jung:judging'],
    text: 'You provide the care infrastructure that every organization needs and few budget for. You remember the details, maintain the relationships, and catch the things that fall through other people\'s cracks. The danger: you become so essential in a support role that no one considers you for a leadership one. The practice: make one strategic suggestion per quarter — something beyond your current scope. This signals that your vision extends past maintenance. You do not need to stop being dependable; you need to be seen as more than dependable.',
  },
  {
    id: 'jung:ESTJ:work', system: 'jung', key: 'ESTJ', domain: 'work',
    traitIds: ['jung:extraversion', 'jung:sensing', 'jung:thinking', 'jung:judging'],
    text: 'You organize work the way gravity organizes matter: naturally, forcefully, and without apology. You are effective in roles with clear authority, defined scope, and measurable outcomes. Ambiguous mandates frustrate you not because you cannot handle complexity but because you cannot tolerate waste. The practice: when you manage, check whether your efficiency is leaving room for the slower processes that produce innovation. Not everything that cannot be measured is unimportant. Schedule time for the unmeasurable; your structured mind needs permission to explore.',
  },
  {
    id: 'jung:ESFJ:work', system: 'jung', key: 'ESFJ', domain: 'work',
    traitIds: ['jung:extraversion', 'jung:sensing', 'jung:feeling', 'jung:judging'],
    text: 'You excel in roles where relationships and service intersect: client management, hospitality, healthcare, education, HR. You read people well and create environments where they feel valued. The risk: you measure your professional worth by how much others like you, which makes necessary criticism feel like personal failure. The practice: separate the feedback from the relationship. A direct conversation about performance does not damage a bond that is genuinely strong. If it does, the bond was based on comfort, not on trust.',
  },
  {
    id: 'jung:ISTP:work', system: 'jung', key: 'ISTP', domain: 'work',
    traitIds: ['jung:introversion', 'jung:sensing', 'jung:thinking', 'jung:perceiving'],
    text: 'You work best with tools, systems, and problems that respond to direct action. Engineering, troubleshooting, skilled trades, technical analysis — anything where competence is proven by results rather than presentation. Your aversion to politics and performance reviews is structural, not fixable. The practice: choose work environments where output speaks louder than optics. If your current role rewards self-promotion over skill, begin building toward one that does not. You will not learn to enjoy the game; find a field where the game is unnecessary.',
  },
  {
    id: 'jung:ISFP:work', system: 'jung', key: 'ISFP', domain: 'work',
    traitIds: ['jung:introversion', 'jung:sensing', 'jung:feeling', 'jung:perceiving'],
    text: 'You bring aesthetic sensitivity and quiet perfectionism to your work. What you produce has a quality of care that mass producers cannot replicate. Design, craft, curation, writing, culinary arts, healing work — domains where attention to texture and nuance translates directly into value. The career risk: you under-price yourself because the market rewards speed and you optimize for depth. The practice: name your process as part of your offering. "This takes longer because X" is not an excuse — it is a differentiator. Own the pace that produces the quality.',
  },
  {
    id: 'jung:ESTP:work', system: 'jung', key: 'ESTP', domain: 'work',
    traitIds: ['jung:extraversion', 'jung:sensing', 'jung:thinking', 'jung:perceiving'],
    text: 'You thrive in environments that reward action, adaptability, and nerve. Sales, entrepreneurship, crisis management, physical trades — work where the feedback loop is immediate and the stakes are tangible. Desk-bound, long-horizon planning roles are not your design. The practice: structure your career around cycles, not ladders. Short engagements with high intensity suit you better than long tenures with gradual advancement. When the excitement fades, move. Stagnation is more expensive for you than risk, and you intuitively know this.',
  },
  {
    id: 'jung:ESFP:work', system: 'jung', key: 'ESFP', domain: 'work',
    traitIds: ['jung:extraversion', 'jung:sensing', 'jung:feeling', 'jung:perceiving'],
    text: 'You are at your best in work that involves people, energy, and improvisation. Performance, event management, sales, hospitality, teaching, social media — roles where your presence is the product. The career risk: you chase the dopamine of immediate feedback and neglect the slower work of building something durable. The practice: dedicate one hour per week to your future self — a skill, a savings habit, a relationship with someone who can hire you in three years. Your present-tense genius needs a long-term container.',
  },

  // ═══════════════════════════════════════════
  // ENNEAGRAM — 9 cores × work
  // ═══════════════════════════════════════════
  {
    id: 'ennea:1:work', system: 'ennea', key: '1', domain: 'work',
    traitIds: ['enneagram:reformer-standards', 'enneagram:reformer-integrity'],
    text: 'You produce high-quality work and cannot produce anything less without suffering for it. This is your professional advantage and your burnout vector. Every error is a moral event for you, and the distinction between "good enough" and "right" rarely exists in your internal vocabulary. The practice: define "done" before you begin. Write the acceptance criteria. When they are met, ship. Your inner critic will protest; let it protest while you move on. Perfectionism does not improve quality past a certain point — it delays delivery and exhausts the person.',
  },
  {
    id: 'ennea:2:work', system: 'ennea', key: '2', domain: 'work',
    traitIds: ['enneagram:helper-attunement', 'enneagram:helper-giving'],
    text: 'You are drawn to roles where being needed is the currency: client service, caregiving, teaching, consulting. You read what people want and deliver it, often before they ask. The professional risk: you become the one who always helps and never leads. Your competence is real but invisible behind a service persona. The practice: take credit for one deliverable this week. Not loudly, not competitively — just factually. "I built that" is a statement of truth, not a display of ego. Say what you built, plainly, once — your career advances when your contributions are attributed, not assumed.',
  },
  {
    id: 'ennea:3:work', system: 'ennea', key: '3', domain: 'work',
    traitIds: ['enneagram:achiever-drive', 'enneagram:achiever-adapt'],
    text: 'You are built for professional achievement. The goal, the metric, the recognition — this is your native language. You will outperform in any system that keeps score. The risk: you confuse the score for the game. Titles, promotions, and external validation can accumulate while internal satisfaction erodes. The practice: once per quarter, ask yourself what you would work on if no one was watching and no one would know. If the answer differs sharply from your current trajectory, the gap is worth investigating before it becomes a crisis.',
  },
  {
    id: 'ennea:4:work', system: 'ennea', key: '4', domain: 'work',
    traitIds: ['enneagram:individualist-depth', 'enneagram:individualist-unique'],
    text: 'You bring depth, originality, and emotional intelligence to your work. When the task requires understanding human experience — design, writing, therapy, branding, art — your output has a quality that more detached types cannot replicate. The professional risk: you wait for inspiration and call it integrity. Consistency of output matters more than intensity of output in most careers. The practice: show up and produce even when you do not feel it. The gap between inspired work and disciplined work is smaller than the gap between disciplined work and no work.',
  },
  {
    id: 'ennea:5:work', system: 'ennea', key: '5', domain: 'work',
    traitIds: ['enneagram:investigator-detach', 'enneagram:investigator-expertise'],
    text: 'You are the expert. Your professional identity rests on knowing more deeply than anyone else in the room. Research, analysis, technical architecture, specialist consulting — these suit you. The risk: you retreat into expertise as a substitute for engagement. Knowing is not the same as contributing, and the gap between your internal knowledge and your external output is often your biggest career bottleneck. The practice: set a weekly publication cadence — a memo, a finding, a recommendation. Make your knowledge available before it is requested.',
  },
  {
    id: 'ennea:6:work', system: 'ennea', key: '6', domain: 'work',
    traitIds: ['enneagram:loyalist-vigilance', 'enneagram:loyalist-loyalty'],
    text: 'You are the most dependable and the most anxious worker in any organization. Your vigilance catches risks others miss, and your loyalty holds teams together through hard seasons. The professional cost: you second-guess decisions after you make them and seek reassurance more than your competence warrants. The practice: make a decision and set a review date. Between now and that date, execute without revisiting. Your instinct to scan for error is useful in the planning phase; in the execution phase, it is friction. Trust the plan until the review.',
  },
  {
    id: 'ennea:7:work', system: 'ennea', key: '7', domain: 'work',
    traitIds: ['enneagram:enthusiast-optimism', 'enneagram:enthusiast-variety'],
    text: 'You need variety, stimulation, and the feeling that the next interesting thing is not far away. Roles that offer novelty within structure — consulting, product development, journalism, entrepreneurship — fit you. Roles that require sustained attention to one unchanging domain will produce your worst work and your most creative escape plans. The practice: build variety into your schedule deliberately so you do not need to create it through chaos. One new project per quarter, planned, is better than three started on impulse and abandoned.',
  },
  {
    id: 'ennea:8:work', system: 'ennea', key: '8', domain: 'work',
    traitIds: ['enneagram:challenger-directness', 'enneagram:challenger-control'],
    text: 'You need authority over your work. Not supervision, not approval chains, not consensus — authority. When you have it, you build empires. When you do not, you fight the structure until you get it or leave. The professional risk: you conflate control with competence and resist feedback that feels like encroachment. The practice: identify one area where accepting input would genuinely improve the outcome and invite it proactively. Control that includes feedback is stronger than control that excludes it. Your power grows when you demonstrate that it is not fragile.',
  },
  {
    id: 'ennea:9:work', system: 'ennea', key: '9', domain: 'work',
    traitIds: ['enneagram:peacemaker-harmony', 'enneagram:peacemaker-numbing'],
    text: 'You are steady, adaptable, and agreeable in professional settings. These qualities make you welcome everywhere and promoted rarely. Your work is reliable but under-asserted, and the professional world rewards assertion more than reliability. The cost: you may spend a career doing good work on someone else\'s priorities without ever defining your own. The practice: write down the role you actually want — not the one you think is realistic, the one that excites you. Then take one step toward it this month. Your career needs your desire, not just your agreeableness.',
  },

  // ═══════════════════════════════════════════
  // HUMAN DESIGN — 5 types × work
  // ═══════════════════════════════════════════
  {
    id: 'hd:Generator:work', system: 'hd', key: 'Generator', domain: 'work',
    traitIds: ['hd:sacral-energy'],
    text: 'Your sacral energy is designed to respond, not to initiate. The career implication is counterintuitive: do not chase opportunities — let them come and notice your body\'s response. A genuine sacral yes feels like a rising energy, a pull forward. A flat okay is not enough. The practice: when a new project, role, or assignment is proposed, pay attention to your first physical response before your mind starts calculating advantages. The gut knows before the spreadsheet. Careers built on sacral yeses produce sustained energy; careers built on logic alone produce burnout.',
  },
  {
    id: 'hd:Manifesting Generator:work', system: 'hd', key: 'Manifesting Generator', domain: 'work',
    traitIds: ['hd:multi-passionate'],
    text: 'You are multi-speed and multi-track. The traditional career ladder — one specialty, vertical advancement — does not map to your design. You are built to pivot, to skip steps, to have three things running simultaneously and a fourth on the horizon. The practice: stop apologizing for your scattered resume and start framing it as range. "I have done X, Y, and Z" is not indecision — it is a portfolio. Build a narrative that connects your pivots into a coherent story of someone who solves different problems with transferable speed.',
  },
  {
    id: 'hd:Projector:work', system: 'hd', key: 'Projector', domain: 'work',
    traitIds: ['hd:seeing-gift'],
    text: 'You are not designed for sustained output the way generators are. Your energy is best spent in focused bursts of insight, guidance, and systems thinking. The work pattern that fits you: deep engagement for two to four hours, then rest. Jobs that demand eight hours of constant production will exhaust you not because you are weak but because your battery is a different shape. The practice: seek roles where your value is measured in quality of insight, not in quantity of hours. Consulting, advising, designing systems, teaching — work where being right matters more than being present.',
  },
  {
    id: 'hd:Manifestor:work', system: 'hd', key: 'Manifestor', domain: 'work',
    traitIds: ['hd:initiating-force'],
    text: 'You are built to start things. Entrepreneurship, creative direction, founding roles — work where the job is to bring something into existence that did not exist before. Employment structures that require you to wait for permission will generate a level of frustration that is not personality-based but energetically real. The practice: if you are in a conventional role, negotiate the maximum initiation space possible. If that is not available, build something on the side. Your design needs an outlet for initiation; if the day job cannot provide it, something else must.',
  },
  {
    id: 'hd:Reflector:work', system: 'hd', key: 'Reflector', domain: 'work',
    traitIds: ['hd:mirror-quality'],
    text: 'Your work environment matters more to you than to any other type. You absorb the health of the organization through your open centers, which means a toxic workplace is literally toxic for you. The practice: evaluate job opportunities primarily by the people and culture, not by the role or the compensation. Visit the office. Sit in a meeting. Notice how you feel seventy-two hours later. Your lunar cycle gives you access to a full spectrum of perspective — use a full month to evaluate any major career decision. What feels right on day three may feel different on day twenty.',
  },

  // ═══════════════════════════════════════════
  // MILLMAN — finals 1–12 × work
  // ═══════════════════════════════════════════
  {
    id: 'millman:1:work', system: 'millman', key: '1', domain: 'work',
    traitIds: ['millman:creative-independence'],
    text: 'Your life-purpose asks you to create something original and to stand behind it. Professionally, this means the work that fulfills you most will be work where your name is on it — not metaphorically, but actually. Freelance, entrepreneurship, authorship, solo practice. The risk: self-doubt masks itself as pragmatism and pushes you toward safe, anonymous roles. The practice: identify one project this year where the output is unmistakably yours. Not a team deliverable attributed to a group — something you made. The path of 1 is walked by making visible what only you could make.',
  },
  {
    id: 'millman:2:work', system: 'millman', key: '2', domain: 'work',
    traitIds: ['millman:cooperative-sensitivity'],
    text: 'Your purpose path is cooperation, which makes you naturally suited to partnership-based work: co-founding, mediation, diplomacy, counseling, duo practice. The danger is professional co-dependence — doing more than your share because the partnership "needs" you. The practice: define your fifty percent before the work begins. Write it down. When you catch yourself at sixty-five, stop and ask whether the extra was requested or assumed. Your career grows when cooperation becomes balance, not when it becomes self-sacrifice disguised as professionalism.',
  },
  {
    id: 'millman:3:work', system: 'millman', key: '3', domain: 'work',
    traitIds: ['millman:expressive-gift'],
    text: 'Expression is your purpose path, and your career should be its vehicle. Writing, speaking, teaching, performing, designing — work where the output carries your voice. When you suppress expression for safety — taking the stable job that asks nothing of your creativity — the suppression compounds into frustration that you will blame on the job but that actually belongs to the path you did not take. The practice: if expression is not in your job title, put it in your week. Teach something, write something, build something that speaks. The path of 3 requires a channel.',
  },
  {
    id: 'millman:4:work', system: 'millman', key: '4', domain: 'work',
    traitIds: ['millman:builder-persistence'],
    text: 'Your path is the builder\'s path. Steady, step-by-step, foundation-first. This means your career will look slower than some and last longer than most. You succeed not by leaping but by compounding: one skill added to another, one relationship built on the last, one project completing before the next begins. The practice: resist the shortcut. When a faster path appears, check whether it has a foundation. If it does not, the collapse will cost more than the time you saved. Your career is a structure; build it like one.',
  },
  {
    id: 'millman:5:work', system: 'millman', key: '5', domain: 'work',
    traitIds: ['millman:freedom-discipline'],
    text: 'Your life-purpose tension is between freedom and discipline, and your career is where it plays out daily. You want the freedom to set your own schedule, choose your own projects, work from wherever. You get that freedom only through the discipline that makes you reliable enough to be trusted with it. The practice: master one skill to the point where it cannot be questioned, then use that mastery as the basis for your independence. Freedom earned through competence is durable; freedom demanded through restlessness is not.',
  },
  {
    id: 'millman:6:work', system: 'millman', key: '6', domain: 'work',
    traitIds: ['millman:visionary-standards'],
    text: 'You see what the work could be, and the gap between that vision and the current reality is a source of constant, low-grade dissatisfaction. This is not negativity — it is your purpose operating. The practice: use the vision as a compass, not a whip. The gap is information about where to invest effort, not evidence that everything is wrong. Choose one improvement per cycle and bring it to completion. A single change fully implemented teaches you more about translating vision into reality than ten improvements left at the proposal stage.',
  },
  {
    id: 'millman:7:work', system: 'millman', key: '7', domain: 'work',
    traitIds: ['millman:inner-trust'],
    text: 'Your purpose path asks you to trust your inner knowing in a professional world that rewards credentials and citations. You sense the right move before you can justify it, and the gap between your intuition and your ability to argue for it is your career challenge. The practice: start keeping a decision journal. Write your gut feeling before you analyze. Track the accuracy over six months. When the data confirms what you already suspect — that your intuition is reliable — you will have evidence to share with the people who need it before they will trust your read.',
  },
  {
    id: 'millman:8:work', system: 'millman', key: '8', domain: 'work',
    traitIds: ['millman:abundant-leadership'],
    text: 'Your path is abundance and executive energy. You are built for work that involves marshaling resources: finance, operations, enterprise building, management. Money is not a taboo for you — it is a tool, and you handle it with less guilt than most. The risk: you equate professional success with financial success and neglect the non-monetary forms of value your work produces. The practice: define success in three currencies — money, impact, and craft. When all three are present, you are on path. When only one is, investigate which two you are trading away.',
  },
  {
    id: 'millman:9:work', system: 'millman', key: '9', domain: 'work',
    traitIds: ['millman:exemplar-integrity'],
    text: 'Your purpose path is integrity and leadership by example. Professionally, this means people watch you for cues whether you hold a title or not. When you cut a corner, the standard around you drops. When you hold the line, others calibrate upward. The practice: identify the one professional behavior that matters most to you — punctuality, honesty in reporting, quality of deliverable — and make it non-negotiable. Your career is not built by what you say you value but by what you consistently demonstrate. The path of 9 is walked in public, whether you intend it or not.',
  },
  {
    id: 'millman:10:work', system: 'millman', key: '10', domain: 'work',
    traitIds: ['millman:creative-independence'],
    text: 'Your double-digit path carries the creative individualist energy amplified by a cycle of renewal. Professionally, you are the person who can close a chapter and start a new one with less friction than most. Career pivots that would terrify others feel to you like clearing the desk. The practice: leverage this by entering fields where reinvention is the product — turnaround consulting, startup founding, transformation roles. Your capacity to begin again is not instability; it is a design feature. Build a career narrative around what you renew, not what you abandon.',
  },
  {
    id: 'millman:11:work', system: 'millman', key: '11', domain: 'work',
    traitIds: ['millman:creative-independence'],
    text: 'The doubled creative energy of 11 gives you twice the inspiration and twice the self-doubt. Professionally, you produce brilliant work and then question whether it is good enough to share. This cycle delays your career not by years but by the accumulation of days where you almost published, almost pitched, almost applied. The practice: set an external deadline with another person attached. Not a self-imposed one — those you will move. A real commitment to a real human who is expecting your output on a date. The work is ready before you think it is.',
  },
  {
    id: 'millman:12:work', system: 'millman', key: '12', domain: 'work',
    traitIds: ['millman:creative-independence', 'millman:cooperative-sensitivity'],
    text: 'Your path combines creative vision and cooperative diplomacy. Professionally, this makes you the rare person who can both originate an idea and build the coalition to implement it. The tension: you want ownership and partnership simultaneously, and the balance shifts depending on the phase of work. The practice: lead the creative phase solo, then open the execution phase to collaboration. State the handoff clearly: "The concept is mine; the build is ours." This protects your originality while honoring the cooperative energy that your path also requires.',
  },
];
