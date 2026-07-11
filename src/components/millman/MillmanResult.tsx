import { getFinalDigit, getWorkingSum } from '@/lib/millman';
import { millmanInterpretations, getWorkingSumDescription } from '@/lib/millmanInterpretations';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface MillmanResultProps {
  number: string;
  birthDate: string;
}

export function MillmanResult({ number, birthDate }: MillmanResultProps) {
  const finalDigit = getFinalDigit(number);
  const workingSum = getWorkingSum(number);
  const interpretation = millmanInterpretations[finalDigit];

  if (!interpretation) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="text-destructive">Unable to find interpretation for number {finalDigit}.</p>
      </div>
    );
  }

  // Format the birth date for display
  const formattedDate = (() => {
    try {
      const [y, m, d] = birthDate.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    } catch {
      return birthDate;
    }
  })();

  return (
    <div className="space-y-6">
      {/* Big number display */}
      <div className="relative overflow-hidden rounded-xl border border-oracle/20 bg-gradient-to-br from-card via-card to-oracle-muted/20 p-8 sm:p-10 text-center">
        {/* Top decorative line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-oracle/40 to-transparent" />

        <p className="text-sm text-muted-foreground mb-2">{formattedDate}</p>

        <div className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-oracle tracking-wide">
          {number}
        </div>

        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mt-4">
          {interpretation.title}
        </h2>
        <p className="text-muted-foreground mt-1 italic font-serif">
          {interpretation.subtitle}
        </p>
      </div>

      {/* Working sum meaning */}
      {workingSum >= 10 && (
        <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1.5">Your Path: {number}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {getWorkingSumDescription(workingSum)}
          </p>
        </div>
      )}

      {/* Interpretation */}
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
          Your Life Purpose
        </h3>
        <div className="text-[0.95rem] text-foreground/90 leading-relaxed whitespace-pre-line">
          {interpretation.description}
        </div>
      </div>

      {/* Strengths & Challenges */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <h3 className="font-serif font-semibold text-foreground mb-3">
            Strengths
          </h3>
          <ul className="space-y-2">
            {interpretation.strengths.map((strength) => (
              <li key={strength} className="flex items-center gap-2 text-sm text-foreground/80">
                <div className="size-1.5 rounded-full bg-oracle shrink-0" />
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <h3 className="font-serif font-semibold text-foreground mb-3">
            Challenges
          </h3>
          <ul className="space-y-2">
            {interpretation.challenges.map((challenge) => (
              <li key={challenge} className="flex items-center gap-2 text-sm text-foreground/80">
                <div className="size-1.5 rounded-full bg-border shrink-0" />
                {challenge}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator />

      {/* Keywords */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground mr-1">Keywords:</span>
        {interpretation.keywords.map((keyword) => (
          <Badge key={keyword} variant="secondary" className="font-normal">
            {keyword}
          </Badge>
        ))}
      </div>
    </div>
  );
}
