import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { Soulgraph } from '@/lib/wire';
import { formatSoulgraph, isSoulgraphPopulated, TOTAL_CHAMBERS, filledChamberCount } from '@/lib/wire';
import { Omphalos } from '@/components/wire/Omphalos';
import { Check, ShieldCheck, AlertTriangle } from 'lucide-react';

interface SoulgraphCardProps {
  wire: Soulgraph;
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
 * The Soulgraph Card — the inner architecture.
 * Strengths & weaknesses, core identity, oracular design language.
 */
export function SoulgraphCard({ wire, className, compact, displayName, npubShort, attested }: SoulgraphCardProps) {
  const populated = isSoulgraphPopulated(wire);
  const filled = filledChamberCount(wire);

  if (compact && populated) {
    return (
      <div className={cn('flex items-center gap-2 text-sm', className)}>
        <Omphalos className="size-3.5 text-oracle shrink-0" />
        <span className="font-mono font-medium text-oracle truncate tracking-wide">{formatSoulgraph(wire)}</span>
      </div>
    );
  }

  const issued = new Date().toLocaleDateString('en-GB', { month: '2-digit', year: '2-digit' }).replace('/', '\u00B7');

  // Derive strengths & weaknesses from the systems
  const strengths = deriveStrengths(wire);
  const weaknesses = deriveWeaknesses(wire);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-basalt text-bone',
        className,
      )}
    >
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-oracle/50 to-transparent" />

      {/* ── Header ── */}
      <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 text-center">
        <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-[0.3em] uppercase text-bone">
          Soulgraph
        </h2>
        {displayName && (
          <p className="font-serif text-lg sm:text-xl font-medium text-bone/90 mt-1 tracking-wide">
            {displayName}
          </p>
        )}
        {npubShort && (
          <p className="font-mono text-[11px] text-ash mt-0.5">{npubShort}</p>
        )}
      </div>

      {/* ── Core Identity Band ── */}
      <div className="mx-4 sm:mx-6 rounded-md border border-umbra/50 bg-[#1e1b17] px-3 py-3 mb-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ash text-center mb-2">
          Core Identity
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <CoreIdCell
            label={wire.jung?.type}
            system="Jung"
            filled={!!wire.jung}
            to="/assess/jung"
            sealed={attested?.jung}
          />
          <CoreIdCell
            label={wire.humanDesign?.type}
            sublabel={wire.humanDesign?.profile}
            system="HD"
            filled={!!wire.humanDesign}
            to="/assess/human-design"
            sealed={attested?.hd}
          />
          <CoreIdCell
            label={wire.millman?.number}
            system="Millman"
            filled={!!wire.millman}
            to="/assess/millman"
            sealed={attested?.millman}
          />
          <CoreIdCell
            label={wire.enneagram ? `${wire.enneagram.core}w${wire.enneagram.wing}` : undefined}
            system="Ennea"
            filled={!!wire.enneagram}
            to="/assess/enneagram"
            sealed={attested?.enneagram}
          />
        </div>
      </div>

      {/* ── Strengths & Weaknesses ── */}
      {populated && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-6 pb-4">
          {/* Strengths */}
          <div className="rounded-md border border-oracle/20 bg-oracle/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="size-4 text-oracle" />
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-oracle">
                Strengths
              </h3>
            </div>
            <ul className="space-y-2">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono text-[11px] text-oracle/70 mt-0.5 shrink-0 w-4 text-right">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-bone leading-tight">{s.title}</p>
                    <p className="text-xs text-ash leading-relaxed mt-0.5">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="rounded-md border border-red-900/30 bg-red-950/20 p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="size-4 text-red-400/80" />
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-red-400/80">
                Shadows
              </h3>
            </div>
            <ul className="space-y-2">
              {weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-mono text-[11px] text-red-400/50 mt-0.5 shrink-0 w-4 text-right">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-bone leading-tight">{w.title}</p>
                    <p className="text-xs text-ash leading-relaxed mt-0.5">{w.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ── Soulgraph signature line ── */}
      {populated && (
        <div className="px-6 sm:px-8 py-4 border-t border-umbra/30">
          <p className="font-mono text-sm sm:text-base font-medium tracking-[0.04em] text-oracle text-center uppercase break-words">
            {formatSoulgraph(wire)}
          </p>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-umbra/30">
        <div className="flex items-center gap-2">
          <Omphalos className="size-4 text-ash" />
          <span className="font-mono text-[11px] text-ash">
            Delphi &middot; {filled}/{TOTAL_CHAMBERS}
          </span>
        </div>
        <span className="font-serif text-[11px] tracking-[0.2em] text-ash select-none">
          {'\u0393\u039D\u03A9\u0398\u0399 \u03A3\u0395\u0391\u03A5\u03A4\u039F\u039D'}
        </span>
        <span className="font-mono text-[11px] text-ash">issued {issued}</span>
      </div>
    </div>
  );
}

interface CoreIdCellProps {
  label?: string;
  sublabel?: string;
  system: string;
  filled: boolean;
  to: string;
  sealed?: boolean;
}

function CoreIdCell({ label, sublabel, system, filled, to, sealed }: CoreIdCellProps) {
  return (
    <Link
      to={to}
      className={cn(
        'relative flex flex-col items-center justify-center rounded-sm px-2 py-3 min-h-[72px] transition-colors',
        filled
          ? 'bg-bone/5 hover:bg-oracle/10'
          : 'bg-transparent hover:bg-bone/5',
      )}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ash mb-1">
        {system}
      </span>
      {filled ? (
        <span className="font-serif text-base sm:text-lg font-medium text-bone text-center leading-tight">
          {label}
          {sublabel && <span className="block text-xs text-ash font-normal">{sublabel}</span>}
        </span>
      ) : (
        <span className="flex flex-col items-center gap-1">
          <span className="block w-6 border-b border-dotted border-ash/50" aria-hidden="true" />
          <span className="font-mono text-[10px] text-ash/60">—</span>
        </span>
      )}
      {sealed && (
        <span
          className="absolute top-1 right-1 flex items-center justify-center size-3.5 rounded-full bg-verdigris/15 text-verdigris"
          title="Attested by peers"
        >
          <Check className="size-2" strokeWidth={3} />
        </span>
      )}
    </Link>
  );
}

// ─── Strength & Weakness derivation from the Wire systems ───

interface TraitEntry {
  title: string;
  desc: string;
}

function deriveStrengths(wire: Soulgraph): TraitEntry[] {
  const items: TraitEntry[] = [];

  if (wire.jung) {
    const t = wire.jung.type;
    if (t.includes('N') && t.includes('T')) {
      items.push({ title: 'Systems Thinking', desc: 'Sees patterns, structures, and deep connections where others see noise.' });
    }
    if (t.includes('I')) {
      items.push({ title: 'Independent Judgment', desc: 'Inner conviction over social validation. Can hold minority positions for years.' });
    }
    if (t.includes('J')) {
      items.push({ title: 'Strategic Focus', desc: 'Decisive, organized, builds toward long-range goals with sustained discipline.' });
    }
    if (t.includes('E')) {
      items.push({ title: 'Social Energy', desc: 'Draws strength from interaction. Natural ability to rally, persuade, and connect.' });
    }
    if (t.includes('F')) {
      items.push({ title: 'Empathic Depth', desc: 'Reads people, senses harmony and discord, prioritizes human values.' });
    }
    if (t.includes('P')) {
      items.push({ title: 'Adaptive Flow', desc: 'Stays flexible, embraces change, thrives in ambiguity and open-ended exploration.' });
    }
    if (t.includes('S')) {
      items.push({ title: 'Grounded Precision', desc: 'Detail-oriented, reliable perception of facts and present reality.' });
    }
  }

  if (wire.humanDesign) {
    const hdType = wire.humanDesign.type.toLowerCase();
    if (hdType.includes('generator') || hdType.includes('manifesting')) {
      items.push({ title: 'Sustainable Life-Force', desc: 'Constant, deep energy when working on what genuinely resonates.' });
    }
    if (hdType === 'projector') {
      items.push({ title: 'Guiding Vision', desc: 'Sees systems and people with clarity. Built to advise, direct, and optimize.' });
    }
    if (hdType === 'manifestor') {
      items.push({ title: 'Initiating Power', desc: 'Born to start things. A force that sets new directions in motion.' });
    }
    if (hdType === 'reflector') {
      items.push({ title: 'Mirror Wisdom', desc: 'Samples the environment with rare objectivity. A living barometer of group health.' });
    }
  }

  if (wire.millman) {
    items.push({ title: 'Purpose Alignment', desc: `Life-purpose ${wire.millman.number} gives a clear orientation for meaningful work.` });
  }

  if (wire.enneagram) {
    const core = wire.enneagram.core;
    const enneagramStrengths: Record<number, TraitEntry> = {
      1: { title: 'Principled Integrity', desc: 'High standards, ethical clarity, and a drive to improve everything.' },
      2: { title: 'Generous Connection', desc: 'Deeply attuned to others\' needs, instinctive warmth and care.' },
      3: { title: 'Driven Excellence', desc: 'Ambitious, adaptable, achieves results with remarkable efficiency.' },
      4: { title: 'Authentic Depth', desc: 'Emotionally honest, creative, in touch with what is real and meaningful.' },
      5: { title: 'Analytical Mastery', desc: 'Deep thinker, objective observer, accumulates expertise with patience.' },
      6: { title: 'Loyal Vigilance', desc: 'Anticipates risk, builds trust, reliable under pressure.' },
      7: { title: 'Visionary Optimism', desc: 'Sees possibility everywhere, synthesizes ideas, brings infectious energy.' },
      8: { title: 'Decisive Strength', desc: 'Direct, protective, confronts reality head-on with courage.' },
      9: { title: 'Harmonizing Presence', desc: 'Sees all sides, mediates naturally, creates environments of peace.' },
    };
    if (enneagramStrengths[core]) {
      items.push(enneagramStrengths[core]);
    }
  }

  return items.slice(0, 6);
}

function deriveWeaknesses(wire: Soulgraph): TraitEntry[] {
  const items: TraitEntry[] = [];

  if (wire.jung) {
    const t = wire.jung.type;
    if (t.includes('I')) {
      items.push({ title: 'Withdrawal Under Pressure', desc: 'Retreats inward when overwhelmed. Can appear cold or disconnected.' });
    }
    if (t.includes('N') && t.includes('T')) {
      items.push({ title: 'Somatic Neglect', desc: 'Body gets ignored. Sleep, food, movement deprioritized until collapse.' });
    }
    if (t.includes('T')) {
      items.push({ title: 'Contempt as Default', desc: 'Precision can become a weapon. Clears the room of good-faith disagreement.' });
    }
    if (t.includes('J')) {
      items.push({ title: 'Rigidity', desc: 'Once convinced, hard to budge. Confirmation bias disguised as certainty.' });
    }
    if (t.includes('E') && t.includes('F')) {
      items.push({ title: 'Over-Extension', desc: 'Says yes to too much. Burns out trying to meet everyone\'s expectations.' });
    }
    if (t.includes('P')) {
      items.push({ title: 'Scattered Focus', desc: 'Starts many things, finishes few. Novelty overrides commitment.' });
    }
    if (t.includes('S') && t.includes('J')) {
      items.push({ title: 'Resistance to Change', desc: 'Clings to the proven. New ideas feel threatening until exhaustively vetted.' });
    }
  }

  if (wire.humanDesign) {
    const hdType = wire.humanDesign.type.toLowerCase();
    if (hdType.includes('generator')) {
      items.push({ title: 'Frustration Spiral', desc: 'When doing work that doesn\'t resonate, energy plummets into stagnation.' });
    }
    if (hdType === 'projector') {
      items.push({ title: 'Bitterness When Unseen', desc: 'Guiding energy that goes unrecognized can curdle into resentment.' });
    }
    if (hdType === 'manifestor') {
      items.push({ title: 'Anger When Blocked', desc: 'The drive to initiate meets resistance and flares into fury.' });
    }
  }

  if (wire.enneagram) {
    const core = wire.enneagram.core;
    const enneagramShadows: Record<number, TraitEntry> = {
      1: { title: 'Inner Critic', desc: 'Relentless self-criticism. Nothing is ever good enough, especially the self.' },
      2: { title: 'Covert Need', desc: 'Gives to be needed. Resentment builds when the giving isn\'t reciprocated.' },
      3: { title: 'Image Management', desc: 'Identity tied to achievement. Fear of being worthless without results.' },
      4: { title: 'Envy & Melancholy', desc: 'Compares self to others. Can get lost in longing for what\'s missing.' },
      5: { title: 'Detachment', desc: 'Retreats into knowledge. Withholds self and resources as a defense.' },
      6: { title: 'Anxiety Loop', desc: 'Worst-case thinking. Trust is hard-won and easily lost.' },
      7: { title: 'Avoidance', desc: 'Runs from pain into the next stimulation. Depth gets sacrificed for breadth.' },
      8: { title: 'Domination', desc: 'Vulnerability feels dangerous. Control becomes a substitute for connection.' },
      9: { title: 'Self-Erasure', desc: 'Merges with others\' agendas. Own anger and needs go underground.' },
    };
    if (enneagramShadows[core]) {
      items.push(enneagramShadows[core]);
    }
  }

  if (wire.millman) {
    items.push({ title: 'Self-Worth Oscillation', desc: 'The life-purpose path creates swings between "obviously significant" and "I\'ve built nothing."' });
  }

  return items.slice(0, 6);
}
