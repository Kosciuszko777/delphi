/**
 * The Council of the Temple — configuration.
 *
 * Placeholders below are armed by the operator per
 * docs/COUNCIL-OPERATIONS.md. The page degrades gracefully while they
 * are empty: checkout hides, the stele shows its pre-launch state.
 */

/** Operator (issuer) pubkey — signs the stele and council seals. Hex. */
export const DELPHI_OPERATOR_PUBKEY = ''; // TODO(operator): hex pubkey of the Delphi issuing key

/** Lightning address for the Lightning checkout (BTCPay LNURL or ln-address). */
export const COUNCIL_LIGHTNING_ADDRESS = ''; // TODO(operator): e.g. council@pay.delphi.example

/** Stripe Payment Link for the card checkout. */
export const COUNCIL_STRIPE_LINK = ''; // TODO(operator): https://buy.stripe.com/...

/** One-time seat price, displayed only. Paid in USD or the equivalent in lightning. */
export const COUNCIL_PRICE_USD = 777;

/** The number of seats. Exact, not a target — the council has 777 chairs. */
export const COUNCIL_SEATS = 777;

/** Addressable kind for the Council Stele (operator-authored roster). */
export const STELE_KIND = 31403;
export const STELE_D_TAG = 'council-stele';

/** NIP-58 badge kinds. */
export const BADGE_DEFINITION_KIND = 30009;
export const BADGE_AWARD_KIND = 8;
export const COUNCIL_BADGE_D_TAG = 'delphi-council';
