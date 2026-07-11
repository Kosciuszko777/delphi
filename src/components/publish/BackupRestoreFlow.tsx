import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useEncryptedBackup, usePublishedBackups, BACKUP_SLUGS, type BackupSlug } from '@/hooks/useEncryptedBackup';
import { useWire } from '@/hooks/useWire';
import { toast } from '@/hooks/useToast';
import {
  Shield,
  CloudUpload,
  CloudDownload,
  Loader2,
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SLUG_LABELS: Record<BackupSlug, string> = {
  jung: 'Jungian Type',
  enneagram: 'Enneagram',
  millman: 'Millman Life-Purpose',
  'human-design': 'Human Design',
};

export function BackupRestoreFlow() {
  const { user } = useCurrentUser();
  const { wire } = useWire();
  const { backupAll, restoreAll, getRawData } = useEncryptedBackup();
  const { data: publishedBackups } = usePublishedBackups(user?.pubkey);
  const [expanded, setExpanded] = useState(false);
  const [isBacking, setIsBacking] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

  // Figure out which slugs have local data
  const localSlugStatus: Record<BackupSlug, boolean> = {
    jung: !!wire.jung,
    enneagram: !!wire.enneagram,
    millman: !!wire.millman,
    'human-design': !!wire.humanDesign,
  };

  // Figure out which slugs have published backups
  const publishedSlugMap = new Map<string, boolean>();
  for (const event of publishedBackups ?? []) {
    const dTag = event.tags.find(([n]) => n === 'd')?.[1];
    if (dTag?.startsWith('raw:')) {
      publishedSlugMap.set(dTag.replace('raw:', ''), true);
    }
  }

  const localCount = BACKUP_SLUGS.filter((s) => localSlugStatus[s]).length;
  const backedUpCount = BACKUP_SLUGS.filter((s) => publishedSlugMap.has(s)).length;
  const hasNip44 = !!user?.signer.nip44;

  if (!user) {
    return (
      <Card className="border-dashed border-border/60">
        <CardContent className="py-8 px-6 text-center">
          <Shield className="size-8 text-muted-foreground mx-auto mb-3" />
          <p className="font-serif text-lg text-foreground mb-2">Encrypted Backup</p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Log in to back up your raw assessment data — encrypted to your own key, 
            stored on Nostr relays, restorable on any device.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleBackup = async () => {
    setIsBacking(true);
    try {
      const count = await backupAll();
      if (count > 0) {
        toast({
          title: 'Backup complete',
          description: `${count} assessment${count > 1 ? 's' : ''} encrypted and stored on Nostr.`,
        });
      } else {
        toast({
          title: 'Nothing to backup',
          description: 'Complete some assessments first.',
        });
      }
    } catch (err) {
      toast({ title: 'Backup failed', description: String(err), variant: 'destructive' });
    } finally {
      setIsBacking(false);
    }
  };

  const handleRestore = async () => {
    if (!publishedBackups?.length) return;
    setIsRestoring(true);
    try {
      const count = await restoreAll(publishedBackups);
      setShowRestoreConfirm(false);
      if (count > 0) {
        toast({
          title: 'Restore complete',
          description: `${count} assessment${count > 1 ? 's' : ''} restored from encrypted backup.`,
        });
      } else {
        toast({
          title: 'Nothing restored',
          description: 'Could not decrypt any backup events. Ensure you are using the same key.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({ title: 'Restore failed', description: String(err), variant: 'destructive' });
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <Card className="border-border">
      <CardContent className="py-6 px-6 space-y-5">
        {/* Header */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center gap-2">
            <Shield className="size-5 text-oracle" />
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Encrypted Backup
            </h3>
            {backedUpCount > 0 && (
              <Badge variant="outline" className="font-mono text-xs">
                {backedUpCount} backed up
              </Badge>
            )}
          </div>
          {expanded ? (
            <ChevronUp className="size-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </button>

        {!expanded && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your raw answers and scoring data are encrypted with NIP-44 to your own key. 
            Only you can decrypt them. Restore on any device by logging in.
          </p>
        )}

        {expanded && (
          <>
            {!hasNip44 && (
              <div className="flex gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                <AlertTriangle className="size-4 text-destructive shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your signer does not support NIP-44 encryption. Backup and restore require 
                  a signer that supports NIP-44 (most modern extensions do). Please upgrade 
                  your signer to use this feature.
                </p>
              </div>
            )}

            {/* Privacy explanation */}
            <div className="flex gap-3 rounded-lg border border-border/60 bg-muted/30 p-3">
              <Shield className="size-4 text-oracle shrink-0 mt-0.5" />
              <div className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">End-to-end encrypted:</strong> Raw questionnaire 
                answers, birth data, and scoring details are encrypted to your own pubkey using NIP-44. 
                Relay operators and other users <strong>cannot read</strong> your backup data.
              </div>
            </div>

            <Separator />

            {/* Status grid */}
            <div className="space-y-2">
              {BACKUP_SLUGS.map((slug) => {
                const hasLocal = localSlugStatus[slug];
                const hasBackup = publishedSlugMap.has(slug);
                const rawData = getRawData(slug);

                return (
                  <div
                    key={slug}
                    className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'size-2 rounded-full',
                          hasLocal ? 'bg-oracle' : 'bg-border',
                        )}
                      />
                      <span className="text-sm text-foreground">{SLUG_LABELS[slug]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {hasLocal && rawData != null && (
                        <Badge variant="outline" className="text-xs">
                          Local
                        </Badge>
                      )}
                      {hasBackup && (
                        <Badge className="bg-oracle/10 text-oracle text-xs border-oracle/20">
                          <Check className="size-3 mr-1" />
                          Backed up
                        </Badge>
                      )}
                      {!hasLocal && !hasBackup && (
                        <span className="text-xs text-muted-foreground">No data</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleBackup}
                disabled={isBacking || localCount === 0 || !hasNip44}
                className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-6 gap-1.5"
              >
                {isBacking ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <CloudUpload className="size-4" />
                )}
                Backup All
              </Button>

              {backedUpCount > 0 && !showRestoreConfirm && (
                <Button
                  variant="outline"
                  onClick={() => setShowRestoreConfirm(true)}
                  disabled={!hasNip44}
                  className="rounded-full px-6 gap-1.5"
                >
                  <CloudDownload className="size-4" />
                  Restore
                </Button>
              )}

              {showRestoreConfirm && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    onClick={handleRestore}
                    disabled={isRestoring}
                    className="rounded-full px-5 gap-1.5"
                  >
                    {isRestoring ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <CloudDownload className="size-3.5" />
                    )}
                    Confirm Restore
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShowRestoreConfirm(false)}
                    className="rounded-full"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            {showRestoreConfirm && (
              <div className="flex gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Restoring will <strong>overwrite</strong> any local assessment data with the 
                  encrypted backup. This includes raw answers and derived results.
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
