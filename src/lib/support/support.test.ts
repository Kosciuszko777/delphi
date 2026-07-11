import { describe, it, expect, beforeEach } from 'vitest';
import { captureReferrer, getStoredReferrer } from './referral';
import { REFERRER_STORAGE_KEY } from './config';
import { buildWireTags } from '@/lib/publish/wireEvent';
import { limitFor, canSend, freshMeter, consume, INITIATE_MONTHLY_LIMIT, FREE_MONTHLY_LIMIT } from '@/lib/oracle/meter';
import { nip19 } from 'nostr-tools';
import type { Wire } from '@/lib/wire';

const HEX = 'e88a691e98d9987c964521dff60025f60700378a4879180dcbbb4a5027850411';
const NPUB = nip19.npubEncode(HEX);

beforeEach(() => localStorage.clear());

describe('referral capture', () => {
  it('stores a valid npub referrer from the query string', () => {
    captureReferrer(`?ref=${NPUB}`);
    expect(getStoredReferrer()).toBe(HEX);
  });

  it('first referrer wins', () => {
    const other = nip19.npubEncode('a'.repeat(64));
    captureReferrer(`?ref=${NPUB}`);
    captureReferrer(`?ref=${other}`);
    expect(getStoredReferrer()).toBe(HEX);
  });

  it('ignores invalid refs silently', () => {
    captureReferrer('?ref=not-an-npub');
    captureReferrer('?ref=');
    expect(getStoredReferrer()).toBeNull();
  });

  it('expires after 90 days', () => {
    const now = Date.now();
    captureReferrer(`?ref=${NPUB}`, now);
    expect(getStoredReferrer(now + 89 * 86_400_000)).toBe(HEX);
    expect(getStoredReferrer(now + 91 * 86_400_000)).toBeNull();
    expect(localStorage.getItem(REFERRER_STORAGE_KEY)).toBeNull();
  });
});

describe('ref tag on the published Wire', () => {
  const wire = { millman: { number: '30/3' } } as Wire;

  it('rides on the kind 31400 when a referrer is present', () => {
    const tags = buildWireTags(wire, HEX);
    expect(tags).toContainEqual(['ref', HEX]);
  });

  it('is absent without a referrer', () => {
    const tags = buildWireTags(wire, null);
    expect(tags.find(([n]) => n === 'ref')).toBeUndefined();
    const tags2 = buildWireTags(wire);
    expect(tags2.find(([n]) => n === 'ref')).toBeUndefined();
  });
});

describe('entitlement ladder', () => {
  it('limits: free 10, initiate 100, council unlimited', () => {
    expect(limitFor('free')).toBe(FREE_MONTHLY_LIMIT);
    expect(limitFor('initiate')).toBe(INITIATE_MONTHLY_LIMIT);
    expect(limitFor('council')).toBe(Number.POSITIVE_INFINITY);
  });

  it('an initiate keeps sending past the free limit and stops at 100', () => {
    const JULY = '2026-07';
    let state = freshMeter(JULY);
    for (let i = 0; i < FREE_MONTHLY_LIMIT; i++) state = consume(state, JULY);
    expect(canSend(state, 'free', JULY)).toBe(false);
    expect(canSend(state, 'initiate', JULY)).toBe(true);
    for (let i = FREE_MONTHLY_LIMIT; i < INITIATE_MONTHLY_LIMIT; i++) state = consume(state, JULY);
    expect(canSend(state, 'initiate', JULY)).toBe(false);
    expect(canSend(state, 'council', JULY)).toBe(true);
  });

  it('boolean backward compatibility maps to council/free', () => {
    const JULY = '2026-07';
    let state = freshMeter(JULY);
    for (let i = 0; i < FREE_MONTHLY_LIMIT; i++) state = consume(state, JULY);
    expect(canSend(state, true, JULY)).toBe(true);
    expect(canSend(state, false, JULY)).toBe(false);
  });
});
