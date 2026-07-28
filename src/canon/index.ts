/** Canon — the Delphi written corpus and composition engine. */

export type { Domain, CanonFragment, FrictionRule, DomainRoute, ComposedAnswer, ComposedSection } from './types';
export { DOMAINS } from './types';
export { composeAnswer } from './compose';
export { routeQuestion } from './routing';
export { allFragments, getFragment } from './corpus';
export { FRICTION_RULES } from './frictions';
export { WING_MODIFIERS, AUTHORITY_FRAGMENTS, PROFILE_FRAGMENTS } from './appendices';
export type { WingModifier, AuthorityFragment, ProfileFragment } from './appendices';
