import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Wire } from '@/lib/wire';
import { formatWire, isWirePopulated, TOTAL_CHAMBERS, filledChamberCount } from '@/lib/wire';
import { Omphalos } from '@/components/wire/Omphalos';
import { Check } from 'lucide-react';

interface WireCardProps {
  wire: Wire;
  className?: string;
  /** If true, renders a compact inline version */
  compact?: boolean;
  /** Display name inscribed on the tablet (optional) */
  displayName?: string;
  /** Short npub form shown under the name (optional) */
  npubShort?: string;
  /** Trait-system keys with at least one accepted peer attestation */
  attested?: Partial<Record<'jung' | 'hd' | 'millman' | 'enneagram', boolean>>;
}

/**
 * The Wire Card — Till spec v1.0.
 * A votive tablet: engraved chambers, mono-gold Wire string,
 * omphalos seal. Empty chambers are prepared niches, never errors.
 */
export function WireCard({ wire, className, compact, displayName, npubShort, attested }: WireCardProps) {
  const populated = isWirePopulated(wire);
  const filled = filledChamberCount(wire);

  if (compact && populated) {
    return (
      <div className={cn('flex items-center gap-2 text-sm', className)}>
        <Omphalos className="size-3.5 text-oracle shrink-0" />
        <span className="font-mono font-medium text-oracle truncate tracking-wide">{formatWire(wire)}</span>
      </div>
    );
  }

  const issued = new Date().toLocaleDateString('en-GB', { month: '2-digit', year: '2-digit' }).replace('/', '\u00B7');

  return (
    <div
      className={cn(
        'engraved grain relative overflow-hidden rounded-[2px] bg-card p-6 sm:p-8',
        className
      )}
    >
      {/* Header strip: mark left, issue label right */}
      <div className="flex items-center justify-between mb-5">
        <Omphalos className="size-5 text-umbra dark:text-ash" />
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-umbra dark:text-ash">
          Delphi &middot; {filled}/{TOTAL_CHAMBERS}
        </span>
      </div>

      {/* Name + npub */}
      {(displayName || npubShort) && (
        <div className="text-center mb-4">
          {displayName && (
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-foreground tracking-wide">
              {displayName}
            </h3>
          )}
          {npubShort && (
            <p className="font-mono text-xs text-ash mt-1">{npubShort}</p>
          )}
        </div>
      )}

      {/* Engraved rule */}
      <div className="h-px bg-umbra/30 dark:bg-ash/20 mb-6" style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.06)' }} />

      {/* The four chambers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Chamber
          label="Jung"
          value={wire.jung?.type}
          to="/assess/jung"
          sealed={attested?.jung}
        />
        <Chamber
          label="HD"
          value={wire.humanDesign ? `${wire.humanDesign.type}` : undefined}
          sub={wire.humanDesign?.profile}
          to="/assess/human-design"
          sealed={attested?.hd}
        />
        <Chamber
          label="Num"
          value={wire.millman?.number}
          to="/assess/millman"
          sealed={attested?.millman}
        />
        <Chamber
          label="Ennea"
          value={wire.enneagram ? `${wire.enneagram.core}w${wire.enneagram.wing}` : undefined}
          to="/assess/enneagram"
          sealed={attested?.enneagram}
        />
      </div>

      {/* THE WIRE — mono, gold, the highest-contrast element */}
      {populated && (
        <p className="wire-shimmer font-mono text-sm sm:text-base font-medium tracking-[0.04em] text-oracle text-center uppercase mb-6 break-words">
          {formatWire(wire)}
        </p>
      )}

      {/* Footer: motto left, issue date right */}
      <div className="flex items-center justify-between">
        <span className="font-serif text-[11px] tracking-[0.25em] text-umbra dark:text-ash select-none">
          {'\u0393\u039D\u03A9\u0398\u0399 \u03A3\u0395\u0391\u03A5\u03A4\u039F\u039D'}
        </span>
        <span className="font-mono text-[11px] text-ash">issued {issued}</span>
      </div>
    </div>
  );
}

interface ChamberProps {
  label: string;
  value?: string;
  sub?: string;
  to: string;
  /** Verdigris seal — at least one accepted peer attestation */
  sealed?: boolean;
}

function Chamber({ label, value, sub, to, sealed }: ChamberProps) {
  const filledChamber = !!value;

  return (
    <Link
      to={to}
      className={cn(
        'engraved group relative flex flex-col items-center justify-center rounded-[2px] px-2 py-4 sm:py-5 min-h-[92px] transition-colors',
        filledChamber
          ? 'bg-background/40 hover:bg-oracle/5'
          : 'bg-transparent hover:bg-oracle/5'
      )}
    >
      {/* System label */}
      <span className={cn(
        'font-mono text-[10px] uppercase tracking-[0.18em] mb-2',
        filledChamber ? 'text-umbra dark:text-ash' : 'text-ash'
      )}>
        {label}
      </span>

      {filledChamber ? (
        <span className="chamber-engrave font-serif text-lg sm:text-xl font-medium text-foreground text-center leading-tight">
          {value}
          {sub && <span className="block text-sm text-umbra dark:text-ash font-normal">{sub}</span>}
        </span>
      ) : (
        /* The prepared niche — an invitation, never an error */
        <span className="flex flex-col items-center gap-1.5">
          <span className="block w-8 border-b border-dotted border-ash/70" aria-hidden="true" />
          <span className="font-mono text-[11px] text-ash lowercase">unwritten</span>
        </span>
      )}

      {/* Verdigris attestation seal */}
      {sealed && (
        <span
          className="seal-stamp absolute top-1.5 right-1.5 flex items-center justify-center size-4 rounded-full bg-verdigris/15 text-verdigris"
          title="Attested by peers"
        >
          <Check className="size-2.5" strokeWidth={3} />
        </span>
      )}
    </Link>
  );
}
