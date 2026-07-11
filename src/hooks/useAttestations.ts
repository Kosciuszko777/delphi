import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useNostr } from '@nostrify/react';
import { useQuery } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import { ATTESTATION_KIND } from '@/lib/publish/wireEvent';
import type { TraitAttestation } from '@/lib/publish/traits';

const ATTESTATION_STORAGE_KEY = 'delphi:self-attestations';

/**
 * Hook to manage self-attestations locally and fetch published ones from relays.
 * Attestations are stored locally first, then optionally published as kind 31401.
 */
export function useAttestations() {
  const [attestations, setAttestations] = useLocalStorage<Record<string, TraitAttestation>>(ATTESTATION_STORAGE_KEY, {});

  const setAttestation = (traitId: string, attestation: TraitAttestation) => {
    setAttestations((prev) => ({ ...prev, [traitId]: attestation }));
  };

  const removeAttestation = (traitId: string) => {
    setAttestations((prev) => {
      const next = { ...prev };
      delete next[traitId];
      return next;
    });
  };

  const clearAttestations = () => {
    setAttestations({} as Record<string, TraitAttestation>);
  };

  return { attestations, setAttestation, removeAttestation, clearAttestations };
}

/**
 * Fetch published self-attestations (kind 31401) from relays for a given pubkey.
 */
export function usePublishedAttestations(pubkey: string | undefined) {
  const { nostr } = useNostr();

  return useQuery<NostrEvent | null>({
    queryKey: ['delphi', 'attestations', pubkey ?? ''],
    queryFn: async (c) => {
      if (!pubkey) return null;
      const [event] = await nostr.query(
        [{ kinds: [ATTESTATION_KIND], authors: [pubkey], '#d': ['self-attestations'], limit: 1 }],
        { signal: c.signal },
      );
      return event ?? null;
    },
    enabled: !!pubkey,
    staleTime: 60_000,
  });
}

/**
 * Parse a published attestation event into TraitAttestation records.
 */
export function parseAttestationEvent(event: NostrEvent): Record<string, TraitAttestation> {
  const attestations: Record<string, TraitAttestation> = {};

  for (const tag of event.tags) {
    if (tag[0] === 'trait' && tag.length >= 4) {
      const traitId = tag[1];
      const verb = tag[2] as TraitAttestation['verb'];
      const weight = parseFloat(tag[3]);

      if (['confirm', 'deny', 'partial'].includes(verb) && !isNaN(weight)) {
        attestations[traitId] = { traitId, verb, weight };
      }
    }
  }

  return attestations;
}
