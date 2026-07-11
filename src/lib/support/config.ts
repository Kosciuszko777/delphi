/**
 * The Hearth — Support & Plans configuration.
 * Armed by the operator per docs/COUNCIL-OPERATIONS.md (Subscriptions
 * section). Every checkout element hides gracefully while empty.
 */

/** Donation rails (gifts — no benefits attach). */
export const SUPPORT_LIGHTNING_ADDRESS = 'dangerouscrocus6076@cake.cash';
export const SUPPORT_STRIPE_LINK = '';       // TODO(operator): pay-what-you-want link

/** On-chain Bitcoin — donations and seat payments alike. */
export const BITCOIN_ONCHAIN_ADDRESS = 'bc1q0yr9zv76nj6kywtsrye34pxy2qdrtqvzchc6w0';

/** Plan checkout (sales — entitlements attach via NIP-58 seals). */
export const PLAN_INITIATE_STRIPE = '';      // TODO(operator): CHF 9/month subscription link
export const PLAN_TEAM_STRIPE = '';          // TODO(operator): CHF 29/month subscription link
export const ENTERPRISE_CONTACT = '';        // TODO(operator): mailto:... or nostr:npub1...

/** Lightning yearly prepay (recurring Lightning arrives with NWC later). */
export const PLAN_INITIATE_YEARLY_CHF = 90;  // 2 months free
export const PLAN_TEAM_YEARLY_CHF = 290;

export const PLAN_INITIATE_CHF = 9;
export const PLAN_TEAM_CHF = 29;             // founding team rate
export const PLAN_TEAM_SEATS = 20;
export const PLAN_ENTERPRISE_CHF = 1900;

/** Subscriber seal (NIP-58), same pattern as the council seal. */
export const INITIATE_BADGE_D_TAG = 'delphi-initiate';

/** Referral capture. */
export const REFERRER_STORAGE_KEY = 'delphi:referrer';
export const REFERRER_VALIDITY_DAYS = 90;
