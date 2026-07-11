import { useNostr } from '@nostrify/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { NostrEvent } from '@nostrify/nostrify';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useNostrPublish } from '@/hooks/useNostrPublish';
import { useWire } from '@/hooks/useWire';
import { useJungAnswers } from '@/hooks/useJungAnswers';
import { useEnneagramAnswers } from '@/hooks/useEnneagramAnswers';
import { useHDBirthData } from '@/hooks/useHDBirthData';
import { ENCRYPTED_RAW_KIND, buildEncryptedRawTags } from '@/lib/publish/wireEvent';
import { toast } from '@/hooks/useToast';

/** Slugs for each test's encrypted backup. */
export const BACKUP_SLUGS = ['jung', 'enneagram', 'millman', 'human-design'] as const;
export type BackupSlug = typeof BACKUP_SLUGS[number];

interface BackupPayload {
  slug: BackupSlug;
  data: unknown;
  timestamp: number;
}

/**
 * Fetch all encrypted raw-result events (kind 31402) for the current user.
 */
export function usePublishedBackups(pubkey: string | undefined) {
  const { nostr } = useNostr();

  return useQuery<NostrEvent[]>({
    queryKey: ['delphi', 'encrypted-backups', pubkey ?? ''],
    queryFn: async (c) => {
      if (!pubkey) return [];
      const dTags = BACKUP_SLUGS.map((s) => `raw:${s}`);
      const events = await nostr.query(
        [{ kinds: [ENCRYPTED_RAW_KIND], authors: [pubkey], '#d': dTags, limit: 10 }],
        { signal: c.signal },
      );
      return events;
    },
    enabled: !!pubkey,
    staleTime: 60_000,
  });
}

/**
 * Hook to backup and restore encrypted raw assessment data.
 */
export function useEncryptedBackup() {
  const { user } = useCurrentUser();
  const { mutateAsync: publish } = useNostrPublish();
  const queryClient = useQueryClient();
  const { wire, updateWire } = useWire();
  const { answers: jungAnswers } = useJungAnswers();
  const { answers: enneagramAnswers } = useEnneagramAnswers();
  const { birthData } = useHDBirthData();

  /**
   * Collect all raw data for a given test slug.
   */
  const getRawData = (slug: BackupSlug): unknown | null => {
    switch (slug) {
      case 'jung':
        return Object.keys(jungAnswers).length > 0
          ? { answers: jungAnswers, result: wire.jung }
          : null;
      case 'enneagram':
        return Object.keys(enneagramAnswers).length > 0
          ? { answers: enneagramAnswers, result: wire.enneagram }
          : null;
      case 'millman':
        return wire.millman ? { result: wire.millman } : null;
      case 'human-design':
        return wire.humanDesign
          ? { birthData, result: wire.humanDesign }
          : null;
      default:
        return null;
    }
  };

  /**
   * Encrypt and publish a single test's raw data.
   */
  const backupTest = async (slug: BackupSlug): Promise<boolean> => {
    if (!user) throw new Error('Must be logged in');
    if (!user.signer.nip44) {
      throw new Error('Your signer does not support NIP-44 encryption. Please upgrade.');
    }

    const rawData = getRawData(slug);
    if (!rawData) return false;

    const payload: BackupPayload = {
      slug,
      data: rawData,
      timestamp: Date.now(),
    };

    const plaintext = JSON.stringify(payload);
    const ciphertext = await user.signer.nip44.encrypt(user.pubkey, plaintext);

    await publish({
      kind: ENCRYPTED_RAW_KIND,
      content: ciphertext,
      tags: buildEncryptedRawTags(slug),
    });

    return true;
  };

  /**
   * Backup all tests that have data.
   */
  const backupAll = async (): Promise<number> => {
    let count = 0;
    for (const slug of BACKUP_SLUGS) {
      try {
        const backed = await backupTest(slug);
        if (backed) count++;
      } catch (err) {
        console.error(`Failed to backup ${slug}:`, err);
        toast({
          title: `Backup failed for ${slug}`,
          description: String(err),
          variant: 'destructive',
        });
      }
    }
    await queryClient.invalidateQueries({ queryKey: ['delphi', 'encrypted-backups'] });
    return count;
  };

  /**
   * Decrypt and restore from a single backup event.
   */
  const restoreFromEvent = async (event: NostrEvent): Promise<BackupPayload | null> => {
    if (!user) throw new Error('Must be logged in');
    if (!user.signer.nip44) {
      throw new Error('Your signer does not support NIP-44 encryption. Please upgrade.');
    }

    try {
      const plaintext = await user.signer.nip44.decrypt(user.pubkey, event.content);
      const payload = JSON.parse(plaintext) as BackupPayload;
      return payload;
    } catch (err) {
      console.error('Failed to decrypt backup event:', err);
      return null;
    }
  };

  /**
   * Restore all backed-up data into local storage.
   */
  const restoreAll = async (events: NostrEvent[]): Promise<number> => {
    let count = 0;

    for (const event of events) {
      const payload = await restoreFromEvent(event);
      if (!payload) continue;

      try {
        applyRestore(payload, updateWire);
        count++;
      } catch (err) {
        console.error(`Failed to restore ${payload.slug}:`, err);
      }
    }

    return count;
  };

  return {
    backupAll,
    backupTest,
    restoreAll,
    restoreFromEvent,
    getRawData,
  };
}

/**
 * Apply a decrypted backup payload to local state.
 */
function applyRestore(
  payload: BackupPayload,
  updateWire: (updater: (current: import('@/lib/wire').Wire) => import('@/lib/wire').Wire) => void,
) {
  const data = payload.data as Record<string, unknown>;

  switch (payload.slug) {
    case 'jung': {
      const result = data.result as import('@/lib/wire').JungResult | undefined;
      if (result) {
        updateWire((w) => ({ ...w, jung: result }));
      }
      // Note: raw answers go into localStorage directly for resumability
      if (data.answers && typeof data.answers === 'object') {
        localStorage.setItem('delphi:jung-answers', JSON.stringify(data.answers));
      }
      break;
    }
    case 'enneagram': {
      const result = data.result as import('@/lib/wire').EnneagramResult | undefined;
      if (result) {
        updateWire((w) => ({ ...w, enneagram: result }));
      }
      if (data.answers && typeof data.answers === 'object') {
        localStorage.setItem('delphi:enneagram-answers', JSON.stringify(data.answers));
      }
      break;
    }
    case 'millman': {
      const result = data.result as import('@/lib/wire').MillmanResult | undefined;
      if (result) {
        updateWire((w) => ({ ...w, millman: result }));
      }
      break;
    }
    case 'human-design': {
      const result = data.result as import('@/lib/wire').HumanDesignResult | undefined;
      if (result) {
        updateWire((w) => ({ ...w, humanDesign: result }));
      }
      if (data.birthData && typeof data.birthData === 'object') {
        localStorage.setItem('delphi:hd-birth-data', JSON.stringify(data.birthData));
      }
      break;
    }
  }
}
