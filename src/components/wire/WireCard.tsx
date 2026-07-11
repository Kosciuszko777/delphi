import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Wire } from '@/lib/wire';
import { formatWire, isWirePopulated, TOTAL_CHAMBERS, filledChamberCount } from '@/lib/wire';
import { Sparkles, ArrowRight } from 'lucide-react';

interface WireCardProps {
  wire: Wire;
  className?: string;
  /** If true, renders a compact inline version */
  compact?: boolean;
}

/**
 * The Wire Card — the central UI artifact.
 * An elegant card rendering the user's Wire with filled and empty "chambers".
 */
export function WireCard({ wire, className, compact }: WireCardProps) {
  const populated = isWirePopulated(wire);
  const filled = filledChamberCount(wire);

  if (compact && populated) {
    return (
      <div className={cn('flex items-center gap-2 text-sm', className)}>
        <Sparkles className="size-3.5 text-oracle shrink-0" />
        <span className="font-medium text-foreground truncate">{formatWire(wire)}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-oracle/20 bg-gradient-to-br from-card via-card to-oracle-muted/30 p-6 sm:p-8',
        'shadow-sm transition-shadow hover:shadow-md',
        className
      )}
    >
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-oracle/40 to-transparent" />

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground tracking-wide">
            Your Wire
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filled}/{TOTAL_CHAMBERS} chambers filled
          </p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: TOTAL_CHAMBERS }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'size-2 rounded-full transition-colors',
                i < filled ? 'bg-oracle' : 'bg-border'
              )}
            />
          ))}
        </div>
      </div>

      {/* Wire signature line */}
      {populated && (
        <div className="mb-6 p-4 rounded-lg bg-background/60 border border-oracle/10">
          <p className="font-serif text-lg sm:text-xl text-foreground font-medium tracking-wide text-center">
            {formatWire(wire)}
          </p>
        </div>
      )}

      {/* Chambers grid */}
      <div className="grid grid-cols-2 gap-3">
        <Chamber
          label="Jungian Type"
          value={wire.jung?.type}
          to="/assess/jung"
          icon="J"
        />
        <Chamber
          label="Human Design"
          value={wire.humanDesign ? `${wire.humanDesign.type} ${wire.humanDesign.profile}` : undefined}
          to="/assess/human-design"
          icon="H"
        />
        <Chamber
          label="Millman"
          value={wire.millman ? wire.millman.number : undefined}
          to="/assess/millman"
          icon="M"
        />
        <Chamber
          label="Enneagram"
          value={wire.enneagram ? `${wire.enneagram.core}w${wire.enneagram.wing}` : undefined}
          to="/assess/enneagram"
          icon="E"
        />
      </div>
    </div>
  );
}

interface ChamberProps {
  label: string;
  value?: string;
  to: string;
  icon: string;
}

function Chamber({ label, value, to, icon }: ChamberProps) {
  const filled = !!value;

  return (
    <Link
      to={to}
      className={cn(
        'group relative flex flex-col items-center justify-center rounded-lg border p-3 sm:p-4 transition-all',
        filled
          ? 'border-oracle/20 bg-oracle/5 hover:bg-oracle/10 hover:border-oracle/30'
          : 'border-dashed border-border hover:border-oracle/30 hover:bg-oracle/5'
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'mb-2 flex items-center justify-center size-8 rounded-full text-xs font-bold',
          filled
            ? 'bg-oracle/15 text-oracle'
            : 'bg-muted text-muted-foreground'
        )}
      >
        {icon}
      </div>

      {/* Value or placeholder */}
      {filled ? (
        <span className="font-serif text-sm sm:text-base font-semibold text-foreground">
          {value}
        </span>
      ) : (
        <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-oracle transition-colors">
          Begin <ArrowRight className="size-3" />
        </span>
      )}

      <span className={cn(
        'text-xs mt-1',
        filled ? 'text-muted-foreground' : 'text-muted-foreground/60'
      )}>
        {label}
      </span>
    </Link>
  );
}
