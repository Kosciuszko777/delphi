import { cn } from '@/lib/utils';
import type { ParsedWireEvent } from '@/hooks/usePublishedWire';
import { Sparkles } from 'lucide-react';

interface PublicWireCardProps {
  parsed: ParsedWireEvent;
  className?: string;
}

/**
 * Read-only Wire Card — renders a published Wire event for public display.
 * No links to assessment pages; purely for viewing someone else's Wire.
 */
export function PublicWireCard({ parsed, className }: PublicWireCardProps) {
  const chambers = getChambers(parsed);
  const filledCount = chambers.filter((c) => c.value).length;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-oracle/20 bg-gradient-to-br from-card via-card to-oracle-muted/30 p-6 sm:p-8',
        'shadow-sm',
        className,
      )}
    >
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-oracle/40 to-transparent" />

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-oracle" />
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground tracking-wide">
            Wire
          </h3>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'size-2 rounded-full transition-colors',
                i < filledCount ? 'bg-oracle' : 'bg-border',
              )}
            />
          ))}
        </div>
      </div>

      {/* Wire signature line */}
      {parsed.wireString && (
        <div className="mb-6 p-4 rounded-lg bg-background/60 border border-oracle/10">
          <p className="font-serif text-lg sm:text-xl text-foreground font-medium tracking-wide text-center">
            {parsed.wireString}
          </p>
        </div>
      )}

      {/* Chambers grid */}
      <div className="grid grid-cols-2 gap-3">
        {chambers.map((chamber) => (
          <PublicChamber key={chamber.icon} {...chamber} />
        ))}
      </div>

      {/* Published timestamp */}
      {parsed.publishedAt && (
        <p className="text-xs text-muted-foreground/60 mt-4 text-center">
          Published {formatRelativeTime(parsed.publishedAt)}
        </p>
      )}
    </div>
  );
}

interface ChamberData {
  icon: string;
  label: string;
  value?: string;
}

function getChambers(parsed: ParsedWireEvent): ChamberData[] {
  return [
    {
      icon: 'J',
      label: 'Jungian Type',
      value: parsed.jung,
    },
    {
      icon: 'H',
      label: 'Human Design',
      value:
        parsed.hdType
          ? `${parsed.hdType}${parsed.hdProfile ? ` ${parsed.hdProfile}` : ''}`
          : undefined,
    },
    {
      icon: 'M',
      label: 'Millman',
      value: parsed.millman,
    },
    {
      icon: 'E',
      label: 'Enneagram',
      value:
        parsed.enneagramCore
          ? `${parsed.enneagramCore}${parsed.enneagramWing ? `w${parsed.enneagramWing}` : ''}`
          : undefined,
    },
  ];
}

function PublicChamber({ icon, label, value }: ChamberData) {
  const filled = !!value;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border p-3 sm:p-4',
        filled
          ? 'border-oracle/20 bg-oracle/5'
          : 'border-dashed border-border bg-muted/20',
      )}
    >
      <div
        className={cn(
          'mb-2 flex items-center justify-center size-8 rounded-full text-xs font-bold',
          filled ? 'bg-oracle/15 text-oracle' : 'bg-muted text-muted-foreground',
        )}
      >
        {icon}
      </div>

      {filled ? (
        <span className="font-serif text-sm sm:text-base font-semibold text-foreground">
          {value}
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">—</span>
      )}

      <span
        className={cn(
          'text-xs mt-1',
          filled ? 'text-muted-foreground' : 'text-muted-foreground/60',
        )}
      >
        {label}
      </span>
    </div>
  );
}

function formatRelativeTime(unixTimestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - unixTimestamp;

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;

  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}
