import type { NostrEvent } from '@nostrify/nostrify';
import { parseAttestationEvent } from '@/hooks/useAttestations';
import { Card, CardContent } from '@/components/ui/card';
import { Fingerprint, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PublicAttestationListProps {
  event: NostrEvent;
  className?: string;
}

/**
 * Read-only display of a user's published self-attestation traits (kind 31401).
 * Shows each trait's label, verb (confirm/deny/partial), and weight.
 */
export function PublicAttestationList({ event, className }: PublicAttestationListProps) {
  const attestations = parseAttestationEvent(event);
  const entries = Object.values(attestations);

  if (entries.length === 0) return null;

  // Group by system prefix
  const grouped = groupAttestations(entries);

  return (
    <Card className={cn('border-border', className)}>
      <CardContent className="py-6 px-6 space-y-5">
        <div className="flex items-center gap-2">
          <Fingerprint className="size-5 text-oracle" />
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Self-Attestations
          </h3>
          <span className="text-xs text-muted-foreground">
            {entries.length} trait{entries.length !== 1 ? 's' : ''}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          This person has rated how strongly each trait describes them.
        </p>

        <div className="space-y-5">
          {grouped.map((group) => (
            <div key={group.system} className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {group.label}
              </h4>
              <div className="space-y-1.5">
                {group.attestations.map((att) => (
                  <AttestationRow key={att.traitId} attestation={att} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface AttestationEntry {
  traitId: string;
  verb: 'confirm' | 'deny' | 'partial';
  weight: number;
}

function AttestationRow({ attestation }: { attestation: AttestationEntry }) {
  const { traitId, verb, weight } = attestation;

  // Extract a human-readable label from the traitId
  const label = formatTraitLabel(traitId);

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2">
      {/* Verb icon */}
      <div
        className={cn(
          'flex items-center justify-center size-6 rounded-full shrink-0',
          verb === 'confirm' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
          verb === 'deny' && 'bg-red-500/10 text-red-600 dark:text-red-400',
          verb === 'partial' && 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        )}
      >
        {verb === 'confirm' && <ThumbsUp className="size-3" />}
        {verb === 'deny' && <ThumbsDown className="size-3" />}
        {verb === 'partial' && <Minus className="size-3" />}
      </div>

      {/* Label */}
      <span className="text-sm text-foreground flex-1 min-w-0 truncate">{label}</span>

      {/* Weight bar */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              verb === 'confirm' && 'bg-emerald-500',
              verb === 'deny' && 'bg-red-500',
              verb === 'partial' && 'bg-amber-500',
            )}
            style={{ width: `${Math.round(weight * 100)}%` }}
          />
        </div>
        <span className="text-xs font-mono text-muted-foreground w-8 text-right">
          {Math.round(weight * 100)}%
        </span>
      </div>
    </div>
  );
}

/** Convert a traitId like "jung:introversion" to "Introversion" */
function formatTraitLabel(traitId: string): string {
  // Split off the system prefix
  const parts = traitId.split(':');
  const raw = parts.slice(1).join(': ');
  // Convert kebab-case to title case
  return raw
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

interface AttestationGroup {
  system: string;
  label: string;
  attestations: AttestationEntry[];
}

const SYSTEM_LABELS: Record<string, string> = {
  jung: 'Jungian Type',
  enneagram: 'Enneagram',
  millman: 'Millman Life-Purpose',
  hd: 'Human Design',
};

function groupAttestations(entries: AttestationEntry[]): AttestationGroup[] {
  const groups: Record<string, AttestationEntry[]> = {};

  for (const entry of entries) {
    const system = entry.traitId.split(':')[0];
    if (!groups[system]) {
      groups[system] = [];
    }
    groups[system].push(entry);
  }

  return Object.entries(groups).map(([system, attestations]) => ({
    system,
    label: SYSTEM_LABELS[system] ?? system,
    attestations,
  }));
}
