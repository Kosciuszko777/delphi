/**
 * Oracle metering — free tier: 10 messages per calendar month.
 * Council seats are unlimited (checked by the caller via
 * useIsCouncillor).
 *
 * Honesty note, on the record: this is a client-side soft limit in a
 * static app with no backend. A motivated user can clear localStorage.
 * That is an accepted trade-off at this stage — the meter exists to
 * shape honest usage and mark the paid boundary, not to be
 * tamper-proof. Server-side enforcement arrives with the first
 * backend component, if ever needed.
 */

export const FREE_MONTHLY_LIMIT = 10;
export const INITIATE_MONTHLY_LIMIT = 100;

export type Entitlement = 'free' | 'initiate' | 'council';

export function limitFor(entitlement: Entitlement): number {
  if (entitlement === 'council') return Number.POSITIVE_INFINITY;
  if (entitlement === 'initiate') return INITIATE_MONTHLY_LIMIT;
  return FREE_MONTHLY_LIMIT;
}

export interface MeterState {
  month: string;
  used: number;
}

export function currentMonth(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function freshMeter(month: string = currentMonth()): MeterState {
  return { month, used: 0 };
}

/** Normalize a stored state against the current month (rollover). */
export function normalize(state: MeterState | null, month: string = currentMonth()): MeterState {
  if (!state || state.month !== month) return freshMeter(month);
  return state;
}

export function remaining(
  state: MeterState | null,
  month: string = currentMonth(),
  limit: number = FREE_MONTHLY_LIMIT,
): number {
  const s = normalize(state, month);
  if (!Number.isFinite(limit)) return Number.POSITIVE_INFINITY;
  return Math.max(0, limit - s.used);
}

export function canSend(
  state: MeterState | null,
  entitlement: Entitlement | boolean,
  month: string = currentMonth(),
): boolean {
  // boolean form kept for backward compatibility: true == council
  const ent: Entitlement = typeof entitlement === 'boolean'
    ? (entitlement ? 'council' : 'free')
    : entitlement;
  if (ent === 'council') return true;
  return remaining(state, month, limitFor(ent)) > 0;
}

export function consume(state: MeterState | null, month: string = currentMonth()): MeterState {
  const s = normalize(state, month);
  return { month: s.month, used: s.used + 1 };
}
