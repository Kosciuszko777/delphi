import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import {
  DELPHI_OPERATOR_PUBKEY,
  STELE_KIND,
  STELE_D_TAG,
  BADGE_AWARD_KIND,
  COUNCIL_BADGE_D_TAG,
  BADGE_DEFINITION_KIND,
} from '@/lib/council/config';

export interface SteleMember {
  pubkey: string;
  seat: number;
  /** Optional chosen inscription name; pseudonymous by default. */
  name?: string;
}

/**
 * The Council Stele — the operator-authored roster (kind 31403).
 * member tags: ["member", "<pubkey>", "<seat>", "<name?>"]
 */
export function useCouncilStele() {
  const { nostr } = useNostr();

  return useQuery<{ members: SteleMember[]; count: number }>({
    queryKey: ['delphi', 'council-stele'],
    enabled: DELPHI_OPERATOR_PUBKEY.length === 64,
    staleTime: 60_000,
    queryFn: async (c) => {
      const events = await nostr.query(
        [{
          kinds: [STELE_KIND],
          authors: [DELPHI_OPERATOR_PUBKEY],
          '#d': [STELE_D_TAG],
          limit: 1,
        }],
        { signal: c.signal },
      );
      const event: NostrEvent | undefined = events[0];
      const members: SteleMember[] = (event?.tags ?? [])
        .filter(([n]) => n === 'member')
        .map(([, pubkey, seat, name]) => ({
          pubkey,
          seat: parseInt(seat, 10),
          name: name || undefined,
        }))
        .filter((m) => !!m.pubkey && Number.isFinite(m.seat))
        .sort((a, b) => a.seat - b.seat);
      return { members, count: members.length };
    },
  });
}

/**
 * Council membership for a pubkey, verified by a NIP-58 badge award
 * (kind 8) from the operator referencing the council seal definition.
 * This is the gating primitive: the Oracle grants councillors
 * lifetime access through this hook.
 */
export function useIsCouncillor(pubkey: string | undefined) {
  const { nostr } = useNostr();

  return useQuery<{ isCouncillor: boolean; award?: NostrEvent }>({
    queryKey: ['delphi', 'council-status', pubkey ?? ''],
    enabled: !!pubkey && DELPHI_OPERATOR_PUBKEY.length === 64,
    staleTime: 5 * 60_000,
    queryFn: async (c) => {
      const badgeAddress = `${BADGE_DEFINITION_KIND}:${DELPHI_OPERATOR_PUBKEY}:${COUNCIL_BADGE_D_TAG}`;
      const events = await nostr.query(
        [{
          kinds: [BADGE_AWARD_KIND],
          authors: [DELPHI_OPERATOR_PUBKEY],
          '#p': [pubkey!],
          '#a': [badgeAddress],
          limit: 1,
        }],
        { signal: c.signal },
      );
      return { isCouncillor: events.length > 0, award: events[0] };
    },
  });
}
