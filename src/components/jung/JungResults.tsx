import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { JungScoreResult, DimensionScore } from '@/lib/jung/scoring';
import { jungInterpretations } from '@/lib/jung/interpretations';

interface JungResultsProps {
  result: JungScoreResult;
}

export function JungResults({ result }: JungResultsProps) {
  const interpretation = jungInterpretations[result.type];

  return (
    <div className="space-y-6">
      {/* Big type display */}
      <div className="relative overflow-hidden rounded-xl border border-oracle/20 bg-gradient-to-br from-card via-card to-oracle-muted/20 p-8 sm:p-10 text-center">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-oracle/40 to-transparent" />

        <p className="text-sm text-muted-foreground mb-2">16-Type Jungian Profile</p>

        <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-oracle tracking-widest">
          {result.type}
        </div>

        {interpretation && (
          <>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mt-4">
              {interpretation.title}
            </h2>
            <p className="text-muted-foreground mt-1 italic font-serif">
              {interpretation.subtitle}
            </p>
          </>
        )}
      </div>

      {/* Dimension bar charts */}
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6 space-y-5">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          Dimension Scores
        </h3>
        <div className="space-y-6">
          {result.dimensions.map((dim) => (
            <DimensionBar key={dim.dimension} score={dim} />
          ))}
        </div>
      </div>

      {/* Interpretation */}
      {interpretation && (
        <>
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
              {interpretation.title}
            </h3>
            <p className="text-sm text-oracle font-medium italic mb-4">{interpretation.essence}</p>
            <div className="text-[0.95rem] text-foreground/90 leading-relaxed whitespace-pre-line">
              {interpretation.description}
            </div>
          </div>

          {/* Strengths & Blind Spots */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <h3 className="font-serif font-semibold text-foreground mb-3">
                Strengths
              </h3>
              <ul className="space-y-2">
                {interpretation.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-foreground/80">
                    <div className="size-1.5 rounded-full bg-oracle shrink-0 mt-1.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <h3 className="font-serif font-semibold text-foreground mb-3">
                Blind Spots
              </h3>
              <ul className="space-y-2">
                {interpretation.blindSpots.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                    <div className="size-1.5 rounded-full bg-border shrink-0 mt-1.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Team role */}
          <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <h3 className="font-serif font-semibold text-foreground mb-2">
              In Teams
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {interpretation.teamRole}
            </p>
          </div>

          <Separator />

          {/* Preference strengths */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground mr-1">Preferences:</span>
            {result.dimensions.map((dim) => (
              <Badge key={dim.dimension} variant="secondary" className="font-normal gap-1">
                {dim.winner === dim.leftPole ? dim.leftName : dim.rightName}
                <span className="text-muted-foreground">({dim.strength})</span>
              </Badge>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function DimensionBar({ score }: { score: DimensionScore }) {
  const leftWins = score.leftPercent >= score.rightPercent;

  return (
    <div className="space-y-1.5">
      {/* Labels and percentages */}
      <div className="flex items-center justify-between text-sm">
        <span className={cn(
          'font-medium',
          leftWins ? 'text-oracle' : 'text-muted-foreground'
        )}>
          {score.leftName} ({score.leftPole})
        </span>
        <span className={cn(
          'font-medium',
          !leftWins ? 'text-oracle' : 'text-muted-foreground'
        )}>
          ({score.rightPole}) {score.rightName}
        </span>
      </div>

      {/* Bar */}
      <div className="relative h-6 rounded-full overflow-hidden bg-muted/50 border border-border/50">
        {/* Left fill */}
        <div
          className={cn(
            'absolute top-0 left-0 h-full rounded-l-full transition-all duration-500',
            leftWins ? 'bg-oracle/60' : 'bg-muted-foreground/20'
          )}
          style={{ width: `${score.leftPercent}%` }}
        />
        {/* Right fill */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full rounded-r-full transition-all duration-500',
            !leftWins ? 'bg-oracle/60' : 'bg-muted-foreground/20'
          )}
          style={{ width: `${score.rightPercent}%` }}
        />
        {/* Center line */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-border" />
        {/* Percentage labels inside bar */}
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <span className="text-xs font-bold tabular-nums text-foreground/70">
            {score.leftPercent}%
          </span>
          <span className="text-xs font-bold tabular-nums text-foreground/70">
            {score.rightPercent}%
          </span>
        </div>
      </div>

      {/* Strength */}
      <div className="flex justify-center">
        <span className="text-xs text-muted-foreground capitalize">
          {score.strength} preference for {score.winner === score.leftPole ? score.leftName : score.rightName}
        </span>
      </div>
    </div>
  );
}
