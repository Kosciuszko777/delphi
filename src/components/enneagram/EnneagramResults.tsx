import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { EnneagramScoreResult, TypeScore } from '@/lib/enneagram/scoring';
import { enneagramInterpretations } from '@/lib/enneagram/interpretations';

interface EnneagramResultsProps {
  result: EnneagramScoreResult;
}

export function EnneagramResults({ result }: EnneagramResultsProps) {
  const interpretation = enneagramInterpretations[result.coreType];
  const wingDesc = interpretation?.wings[result.wing];

  return (
    <div className="space-y-6">
      {/* Big type display */}
      <div className="relative overflow-hidden rounded-xl border border-oracle/20 bg-gradient-to-br from-card via-card to-oracle-muted/20 p-8 sm:p-10 text-center">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-oracle/40 to-transparent" />

        <p className="text-sm text-muted-foreground mb-2">Enneagram Profile</p>

        <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-oracle tracking-wide">
          {result.label}
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

      {/* Nine-type bar profile */}
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6 space-y-4">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          Full Type Profile
        </h3>
        <div className="space-y-3">
          {result.scores.map((score) => (
            <TypeBar
              key={score.type}
              score={score}
              isCore={score.type === result.coreType}
              isWing={score.type === result.wing}
            />
          ))}
        </div>
      </div>

      {/* Core motivation */}
      {interpretation && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-oracle/15 bg-oracle/5 p-5 sm:p-6">
            <h3 className="font-serif font-semibold text-foreground mb-2">Core Fear</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{interpretation.coreFear}</p>
          </div>
          <div className="rounded-xl border border-oracle/15 bg-oracle/5 p-5 sm:p-6">
            <h3 className="font-serif font-semibold text-foreground mb-2">Core Desire</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{interpretation.coreDesire}</p>
          </div>
        </div>
      )}

      {/* Interpretation */}
      {interpretation && (
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
            Type {result.coreType}: {interpretation.name}
          </h3>
          <p className="text-sm text-oracle font-medium italic mb-4">{interpretation.subtitle}</p>
          <div className="text-[0.95rem] text-foreground/90 leading-relaxed whitespace-pre-line">
            {interpretation.description}
          </div>
        </div>
      )}

      {/* Wing description */}
      {wingDesc && (
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <h3 className="font-serif font-semibold text-foreground mb-2">
            Your Wing: {wingDesc.label}
          </h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {wingDesc.description}
          </p>
        </div>
      )}

      {/* Strengths & Challenges */}
      {interpretation && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <h3 className="font-serif font-semibold text-foreground mb-3">Strengths</h3>
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
            <h3 className="font-serif font-semibold text-foreground mb-3">Challenges</h3>
            <ul className="space-y-2">
              {interpretation.challenges.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-foreground/80">
                  <div className="size-1.5 rounded-full bg-border shrink-0 mt-1.5" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Separator />

      {/* Top types summary */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground mr-1">Strongest types:</span>
        {[...result.scores]
          .sort((a, b) => b.percent - a.percent)
          .slice(0, 3)
          .map((s) => (
            <Badge key={s.type} variant={s.type === result.coreType ? 'default' : 'secondary'} className="font-normal gap-1">
              Type {s.type}
              <span className="text-muted-foreground">({s.percent}%)</span>
            </Badge>
          ))}
      </div>
    </div>
  );
}

function TypeBar({ score, isCore, isWing }: { score: TypeScore; isCore: boolean; isWing: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {/* Type label */}
      <div className="w-6 text-right shrink-0">
        <span className={cn(
          'text-sm font-bold tabular-nums',
          isCore ? 'text-oracle' : 'text-muted-foreground'
        )}>
          {score.type}
        </span>
      </div>

      {/* Bar */}
      <div className="flex-1 relative h-7 rounded-md overflow-hidden bg-muted/40 border border-border/40">
        <div
          className={cn(
            'absolute top-0 left-0 h-full rounded-md transition-all duration-500',
            isCore
              ? 'bg-oracle/70'
              : isWing
                ? 'bg-oracle/40'
                : 'bg-muted-foreground/20'
          )}
          style={{ width: `${score.percent}%` }}
        />
        <div className="absolute inset-0 flex items-center px-3 justify-between">
          <span className={cn(
            'text-xs font-medium truncate',
            isCore ? 'text-oracle-foreground' : 'text-foreground/60'
          )}>
            {score.name}
          </span>
          <span className={cn(
            'text-xs font-bold tabular-nums',
            isCore ? 'text-oracle' : 'text-foreground/50'
          )}>
            {score.percent}%
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="w-12 shrink-0">
        {isCore && (
          <span className="text-[10px] font-bold text-oracle bg-oracle/10 px-1.5 py-0.5 rounded">
            CORE
          </span>
        )}
        {isWing && !isCore && (
          <span className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            WING
          </span>
        )}
      </div>
    </div>
  );
}
