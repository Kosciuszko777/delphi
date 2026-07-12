import { useSeoMeta } from '@unhead/react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useWire } from '@/hooks/useWire';
import { useTranslation } from '@/hooks/useTranslation';
import { WireCard } from '@/components/wire/WireCard';
import { isWirePopulated } from '@/lib/wire';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AssessPage() {
  const { wire } = useWire();
  const hasWire = isWirePopulated(wire);
  const { t } = useTranslation();

  useSeoMeta({
    title: 'Assessments — Delphi',
    description: 'Complete personality and typology assessments to build your Wire — your sovereign psychometric fingerprint.',
  });

  const assessments = [
    {
      id: 'millman',
      letter: 'M',
      name: t('assess.millman.name'),
      description: t('assess.millman.desc'),
      time: t('assess.millman.time'),
      available: true,
      completed: !!wire.millman,
      to: '/assess/millman',
    },
    {
      id: 'jung',
      letter: 'J',
      name: t('assess.jung.name'),
      description: t('assess.jung.desc'),
      time: t('assess.jung.time'),
      available: true,
      completed: !!wire.jung,
      to: '/assess/jung',
    },
    {
      id: 'enneagram',
      letter: 'E',
      name: t('assess.enneagram.name'),
      description: t('assess.enneagram.desc'),
      time: t('assess.enneagram.time'),
      available: true,
      completed: !!wire.enneagram,
      to: '/assess/enneagram',
    },
    {
      id: 'human-design',
      letter: 'H',
      name: t('assess.hd.name'),
      description: t('assess.hd.desc'),
      time: t('assess.hd.time'),
      available: true,
      completed: !!wire.humanDesign,
      to: '/assess/human-design',
    },
  ];

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            {t('assess.title')}
          </h1>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            {t('assess.subtitle')}
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
  const { t } = useTranslation();
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
            <span className="text-xs text-oracle bg-oracle/10 px-2 py-0.5 rounded-full font-medium">{t('assess.completed')}</span>
          )}
          {!available && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{t('home.comingSoon')}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">{description}</p>
        <p className="text-xs text-muted-foreground/70 mt-1">&asymp; {time}</p>
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
