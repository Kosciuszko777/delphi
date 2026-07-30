/**
 * AI model configuration — centralized model IDs and register constraints.
 *
 * Quality / cost trade-off per tier:
 * - MODEL_FREE_TIER (glm-4.6): lowest-cost inference on Shakespeare AI,
 *   sufficient for structured output (Mirror JSON, Oracle guidance).
 *   Requires explicit register constraints to prevent stylistic drift.
 * - MODEL_HIGH_ORACLE: the strongest available hosted model, reserved
 *   for council entitlement. Selected at runtime from available models.
 * - Paid tiers select the best available Sonnet/Claude model at runtime.
 */

/** The model used for free-tier Oracle and Mirror inference. */
export const MODEL_FREE_TIER = 'glm-4.6';

/** @deprecated Use MODEL_FREE_TIER. */
export const FREE_TIER_MODEL = MODEL_FREE_TIER;

/**
 * High Oracle model ID — the strongest hosted model, reserved for
 * council entitlement. This is a preference; the actual model is
 * selected at runtime from available Shakespeare AI models, preferring
 * Sonnet/Claude. This constant is used as documentation / label only.
 */
export const MODEL_HIGH_ORACLE = 'high-oracle';

/**
 * Register reminder block — appended to free-tier prompts to prevent
 * stylistic drift from cheaper models. Compact enough to fit in every
 * request without meaningful token cost.
 */
export const REGISTER_REMINDER = `
REGISTER RULES (absolute):
- No exclamation marks. No flattery. No superlatives that sell.
- State, never sell. Second person throughout.
- Every claim grounded in the profile data. No invented biography.
- Concrete final sentences: give the person something to do or watch for.
- Denied traits do not exist. Never assert or hedge toward them.`.trim();
