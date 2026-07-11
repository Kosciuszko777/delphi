import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import { WIRE_KIND } from '@/lib/publish/wireEvent';

/**
 * Builders' Credit — the count of published Wires (kind 31400)
 * carrying this pubkey in a ["ref", ...] tag. Publicly verifiable
 * by anyone against the same relays.
 */
export function useBuildersCredit(pubkey: string | undefined) {
  const { nostr } = useNostr();

  return useQuery<number>({
    queryKey: ['delphi', 'builders-credit', pubkey ?? ''],
    enabled: !!pubkey,
    staleTime: 60_000,
    queryFn: async (c) => {
      const events = await nostr.query(
        [{ kinds: [WIRE_KIND], '#ref': [pubkey!], '#d': ['wire'], limit: 500 }],
        { signal: c.signal },
      );
      // one credit per author, latest replaceable state only
      const authors = new Set(events.map((e) => e.pubkey));
      return authors.size;
    },
  });
}
