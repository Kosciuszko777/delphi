import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import { WIRE_KIND } from '@/lib/publish/wireEvent';

/**
 * Fetch a published Wire (kind 31400) from relays for a given pubkey.
 * Returns the raw event if found.
 */
export function usePublishedWire(pubkey: string | undefined) {
  const { nostr } = useNostr();

  return useQuery<NostrEvent | null>({
    queryKey: ['delphi', 'wire', pubkey ?? ''],
    queryFn: async (c) => {
      if (!pubkey) return null;
      const [event] = await nostr.query(
        [{ kinds: [WIRE_KIND], authors: [pubkey], '#d': ['wire'], limit: 1 }],
        { signal: c.signal },
      );
      return event ?? null;
    },
    enabled: !!pubkey,
    staleTime: 60_000,
  });
}

/**
 * Parse a Wire event's tags into a display-friendly structure.
 */
export interface ParsedWireEvent {
  jung?: string;
  hdType?: string;
  hdProfile?: string;
  hdAuthority?: string;
  millman?: string;
  enneagramCore?: string;
  enneagramWing?: string;
  wireString?: string;
  publishedAt?: number;
  content: string;
}

export function parseWireEvent(event: NostrEvent): ParsedWireEvent {
  const get = (name: string) => event.tags.find(([n]) => n === name)?.[1];

  const enneagramTag = event.tags.find(([n]) => n === 'enneagram');

  return {
    jung: get('jung'),
    hdType: get('hd_type'),
    hdProfile: get('hd_profile'),
    hdAuthority: get('hd_authority'),
    millman: get('millman'),
    enneagramCore: enneagramTag?.[1],
    enneagramWing: enneagramTag?.[2],
    wireString: get('wire'),
    publishedAt: get('published_at') ? parseInt(get('published_at')!, 10) : event.created_at,
    content: event.content,
  };
}
