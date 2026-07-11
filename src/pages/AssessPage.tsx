import { useSeoMeta } from '@unhead/react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useWire } from '@/hooks/useWire';
import { WireCard } from '@/components/wire/WireCard';
import { isWirePopulated } from '@/lib/wire';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AssessPage() {
  const { wire } = useWire();
  const hasWire = isWirePopulated(wire);

  useSeoMeta({
    title: 'Assessments — Delphi',
    description: 'Complete personality and typology assessments to build your Wire — your sovereign psychometric fingerprint.',
  });

  const assessments = [
    {
      id: 'millman',
      letter: 'M',
      name: 'Millman Life-Purpose',
      description: 'Enter your birth date to discover your life-purpose number — the core themes and lessons encoded in your path.',
      time: '1 minute',
      available: true,
      completed: !!wire.millman,
      to: '/assess/millman',
    },
    {
      id: 'jung',
      letter: 'J',
      name: '16-Type Jungian',
      description: 'A 32-item questionnaire mapping your cognitive functions and personality preferences.',
      time: '10 minutes',
      available: false,
      completed: !!wire.jung,
    },
    {
      id: 'enneagram',
      letter: 'E',
      name: 'Enneagram',
      description: 'Discover your core motivation pattern and wing type across all nine Enneagram positions.',
      time: '15 minutes',
      available: false,
      completed: !!wire.enneagram,
    },
    {
      id: 'human-design',
      letter: 'H',
      name: 'Human Design',
      description: 'Enter your Human Design type, profile, and authority from an external chart calculation.',
      time: '5 minutes',
      available: false,
      completed: !!wire.humanDesign,
    },
  ];

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Assessments
          </h1>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Each assessment fills a chamber in your Wire. Complete them in any order.
          </p>
        </div>

        {/* Wire preview */}
        {hasWire && (
          <div className="mb-8">
            <WireCard wire={wire} />
          </div>
        )}

        {/* Assessment list */}
        <div className="space-y-3">
          {assessments.map((assessment) => (
            <AssessmentRow key={assessment.id} {...assessment} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

interface AssessmentRowProps {
  letter: string;
  name: string;
  description: string;
  time: string;
  available: boolean;
  completed: boolean;
  to?: string;
}

function AssessmentRow({ letter, name, description, time, available, completed, to }: AssessmentRowProps) {
  const inner = (
    <div
      className={cn(
        'flex items-center gap-4 p-4 sm:p-5 rounded-xl border transition-all',
        available
          ? 'border-border bg-card hover:border-oracle/30 hover:shadow-sm'
          : 'border-border/50 bg-muted/20 opacity-50 cursor-not-allowed'
      )}
    >
      {/* Letter badge */}
      <div className={cn(
        'flex items-center justify-center size-12 rounded-full text-sm font-bold shrink-0',
        completed
          ? 'bg-oracle/15 text-oracle'
          : available
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-muted text-muted-foreground'
      )}>
        {completed ? <Check className="size-5" /> : letter}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-serif font-semibold text-foreground">{name}</h3>
          {completed && (
            <span className="text-xs text-oracle bg-oracle/10 px-2 py-0.5 rounded-full font-medium">Completed</span>
          )}
          {!available && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Coming soon</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{description}</p>
        <p className="text-xs text-muted-foreground/70 mt-1">≈ {time}</p>
      </div>

      {/* Arrow */}
      {available && (
        <ArrowRight className="size-4 text-muted-foreground shrink-0" />
      )}
    </div>
  );

  if (available && to) {
    return <Link to={to}>{inner}</Link>;
  }

  return inner;
}
