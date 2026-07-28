import type { Domain, DomainRoute } from './types';

/**
 * Keyword-based domain routing for free-text questions.
 * Lowercase stems, EN + DE.
 */
export const DOMAIN_ROUTES: DomainRoute[] = [
  {
    domain: 'team',
    keywords: [
      'team', 'kolleg', 'colleague', 'coworker', 'collaborat', 'group',
      'meeting', 'sitzung', 'zusammenarbeit', 'mitarbeit', 'gemeinsam',
    ],
  },
  {
    domain: 'work',
    keywords: [
      'work', 'career', 'job', 'beruf', 'arbeit', 'profession',
      'promot', 'beförder', 'hire', 'fired', 'resign', 'kündigung',
      'salary', 'gehalt', 'office', 'büro', 'remote', 'freelance',
    ],
  },
  {
    domain: 'relationships',
    keywords: [
      'relat', 'partner', 'love', 'liebe', 'marriage', 'ehe', 'dating',
      'freund', 'friend', 'family', 'familie', 'parent', 'eltern',
      'child', 'kind', 'romantic', 'attach', 'bindung', 'intimat',
    ],
  },
  {
    domain: 'conflict',
    keywords: [
      'conflict', 'fight', 'streit', 'argument', 'disagree', 'anger',
      'wut', 'frustrat', 'resent', 'boundar', 'grenz', 'confront',
      'toxic', 'difficult person', 'schwierig',
    ],
  },
  {
    domain: 'energy',
    keywords: [
      'energy', 'energie', 'drain', 'exhaust', 'erschöpf', 'burnout',
      'tired', 'müde', 'rest', 'ruhe', 'recharge', 'overwhelm',
      'überfordert', 'stress', 'capacity', 'kapazität',
    ],
  },
  {
    domain: 'purpose',
    keywords: [
      'purpose', 'sinn', 'meaning', 'bedeutung', 'calling', 'berufung',
      'mission', 'path', 'weg', 'life', 'leben', 'direction', 'richtung',
      'why', 'warum', 'destiny', 'bestimm',
    ],
  },
  {
    domain: 'happiness',
    keywords: [
      'happy', 'happiness', 'glück', 'joy', 'freude', 'fulfil',
      'erfüll', 'content', 'zufrieden', 'pleasure', 'satisfy', 'enjoy',
    ],
  },
  {
    domain: 'growth',
    keywords: [
      'grow', 'wachs', 'improv', 'verbess', 'develop', 'entwickl',
      'learn', 'lern', 'change', 'veränder', 'transform', 'habit',
      'gewohnheit', 'weak', 'strength', 'stärk', 'schwäch', 'shadow',
      'contradict', 'widerspruch', 'friction', 'tension', 'spannung',
    ],
  },
];

/**
 * Route a free-text question to a domain by keyword matching.
 * Returns the best matching domain, or null if no keywords match.
 */
export function routeQuestion(question: string): Domain | null {
  const lower = question.toLowerCase();
  let bestDomain: Domain | null = null;
  let bestScore = 0;

  for (const route of DOMAIN_ROUTES) {
    let score = 0;
    for (const kw of route.keywords) {
      if (lower.includes(kw)) {
        score += kw.length; // longer match = stronger signal
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestDomain = route.domain;
    }
  }

  return bestDomain;
}
