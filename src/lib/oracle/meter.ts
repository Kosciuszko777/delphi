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

export function remaining(state: MeterState | null, month: string = currentMonth()): number {
  const s = normalize(state, month);
  return Math.max(0, FREE_MONTHLY_LIMIT - s.used);
}

export function canSend(
  state: MeterState | null,
  isCouncillor: boolean,
  month: string = currentMonth(),
): boolean {
  if (isCouncillor) return true;
  return remaining(state, month) > 0;
}

export function consume(state: MeterState | null, month: string = currentMonth()): MeterState {
  const s = normalize(state, month);
  return { month: s.month, used: s.used + 1 };
}
