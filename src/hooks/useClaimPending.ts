import { useLocalStorage } from '@/hooks/useLocalStorage';

const PENDING_KEY = 'delphi:oracle-claim-pending';
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Tracks the "payment received, seal pending" state.
 * Set after Stripe redirect (?paid=1) or manual Lightning claim.
 * Expires after 7 days, at which point the gate re-appears.
 * Clears immediately when entitlement upgrades from 'free'.
 */
export function useClaimPending() {
  const [timestamp, setTimestamp] = useLocalStorage<number | null>(PENDING_KEY, null);

  const isPending = timestamp !== null && Date.now() - timestamp < EXPIRY_MS;

  const setPending = () => setTimestamp(Date.now());
  const clearPending = () => setTimestamp(null);

  return { isPending, setPending, clearPending };
}
