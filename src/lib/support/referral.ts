import { nip19 } from 'nostr-tools';
import { REFERRER_STORAGE_KEY, REFERRER_VALIDITY_DAYS } from './config';

/**
 * Referral capture — protocol-native Builders' Credit.
 *
 * A visit with ?ref=<npub> stores the referrer locally (first referrer
 * wins, 90-day validity). When the visitor later PUBLISHES their Wire,
 * a ["ref", <referrer hex>] tag rides on the kind 31400 event — shown
 * in the consent preview like every other tag. Builders' Credit is
 * then simply the count of published Wires on the network referencing
 * a pubkey: publicly verifiable by anyone, no database, no trust in
 * Delphi required. Forward-compatible with the Refstr / Radical
 * Referrals primitive: the ledger exists on-relay before any reward
 * tier activates.
 */

interface StoredReferrer {
  pubkey: string;
  storedAt: number;
}

/** Parse and store ?ref=<npub> from a search string. First referrer wins. */
export function captureReferrer(search: string, now: number = Date.now()): void {
  try {
    const ref = new URLSearchParams(search).get('ref');
    if (!ref) return;
    const decoded = nip19.decode(ref);
    if (decoded.type !== 'npub') return;
    const existing = getStoredReferrer(now);
    if (existing) return; // first referrer wins
    const value: StoredReferrer = { pubkey: decoded.data, storedAt: now };
    localStorage.setItem(REFERRER_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // invalid npub or storage unavailable — ignore silently
  }
}

/** The stored referrer pubkey (hex), if present and still valid. */
export function getStoredReferrer(now: number = Date.now()): string | null {
  try {
    const raw = localStorage.getItem(REFERRER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredReferrer;
    if (!parsed.pubkey || !/^[0-9a-f]{64}$/.test(parsed.pubkey)) return null;
    const ageDays = (now - parsed.storedAt) / 86_400_000;
    if (ageDays > REFERRER_VALIDITY_DAYS) {
      localStorage.removeItem(REFERRER_STORAGE_KEY);
      return null;
    }
    return parsed.pubkey;
  } catch {
    return null;
  }
}
