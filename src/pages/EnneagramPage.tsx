import { useState, useMemo } from 'react';
import { useSeoMeta } from '@unhead/react';
import { useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWire } from '@/hooks/useWire';
import { useEnneagramAnswers } from '@/hooks/useEnneagramAnswers';
import { useTranslation } from '@/hooks/useTranslation';
import { scoreEnneagram, isComplete, answeredCount, TYPE_NAMES } from '@/lib/enneagram/scoring';
import type { EnneagramScoreResult, TypeScore } from '@/lib/enneagram/scoring';
import { TOTAL_ITEMS } from '@/lib/enneagram/items';
import { EnneagramQuestionnaire } from '@/components/enneagram/EnneagramQuestionnaire';
import { EnneagramResults } from '@/components/enneagram/EnneagramResults';
import { ArrowLeft, RotateCcw } from 'lucide-react';

type Phase = 'intro' | 'quiz' | 'results';

export default function EnneagramPage() {
  const { wire, updateWire } = useWire();
  const { answers, setAnswer, clearAnswers } = useEnneagramAnswers();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const hasExistingResult = !!wire.enneagram;
  const hasProgress = answeredCount(answers) > 0;
  const allAnswered = isComplete(answers);

  const initialPhase: Phase = hasExistingResult
    ? 'results'
    : hasProgress
      ? 'quiz'
      : 'intro';

  const [phase, setPhase] = useState<Phase>(initialPhase);

  const result = useMemo((): EnneagramScoreResult | null => {
    if (allAnswered) return scoreEnneagram(answers);
    if (wire.enneagram) {
      return buildResultFromWire(wire.enneagram);
    }
    return null;
  }, [allAnswered, answers, wire.enneagram]);

  useSeoMeta({
    title: 'Enneagram Assessment — Delphi',
    description: 'Discover your core Enneagram type and wing across all nine personality patterns.',
  });

  const handleComplete = () => {
    if (!allAnswered) return;
    const scored = scoreEnneagram(answers);

    updateWire((current) => ({
      ...current,
      enneagram: {
        core: scored.coreType,
        wing: scored.wing,
        scores: scored.rawScores,
      },
    }));

    setPhase('results');
  };

  const handleRetake = () => {
    clearAnswers();
    updateWire((current) => {
      const next = { ...current };
      delete next.enneagram;
      return next;
    });
    setPhase('intro');
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Back link */}
        <Link
          to="/assess"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-3.5" />
          {t('common.backToAssessments')}
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center size-10 rounded-full bg-oracle/15 text-oracle text-sm font-bold">
              E
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {t('enneagram.title')}
            </h1>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            {phase === 'results'
              ? t('enneagram.subtitle.results')
              : t('enneagram.subtitle.quiz')
            }
          </p>
        </div>

        {/* Intro */}
        {phase === 'intro' && (
          <Card className="border-border">
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                <h2 className="font-serif text-lg font-semibold text-foreground">
                  How It Works
                </h2>
                <ul className="space-y-3 text-sm text-foreground/80">
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center size-6 rounded-full bg-oracle/10 text-oracle text-xs font-bold shrink-0">1</span>
                    <span>You'll see 36 statements about your motivations, fears, and habitual patterns.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center size-6 rounded-full bg-oracle/10 text-oracle text-xs font-bold shrink-0">2</span>
                    <span>Rate each from "Strongly disagree" to "Strongly agree." Answer honestly — there are no right or wrong responses.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center size-6 rounded-full bg-oracle/10 text-oracle text-xs font-bold shrink-0">3</span>
                    <span>Your answers are scored across all nine Enneagram types, producing a full profile — not just a single number.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center size-6 rounded-full bg-oracle/10 text-oracle text-xs font-bold shrink-0">4</span>
                    <span>You'll see your core type, your wing, and an in-depth interpretation of your pattern.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Privacy:</strong> Your answers are stored locally on this device only.
                  Only the derived core type and wing will be added to your Wire — raw answers remain private.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setPhase('quiz')}
                  className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8"
                >
                  {t('enneagram.beginAssessment')}
                </Button>
                {hasProgress && (
                  <Button
                    variant="outline"
                    onClick={() => setPhase('quiz')}
                    className="rounded-full"
                  >
                    {t('jung.resume')} ({answeredCount(answers)}/{TOTAL_ITEMS} {t('jung.answered')})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questionnaire */}
        {phase === 'quiz' && (
          <EnneagramQuestionnaire
            answers={answers}
            onAnswer={setAnswer}
            onComplete={handleComplete}
          />
        )}

        {/* Results */}
        {phase === 'results' && result && (
          <div className="space-y-6">
            <EnneagramResults result={result} />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/wire')}
                className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-6"
              >
                {t('common.viewMyWire')}
              </Button>
              <Button
                variant="outline"
                onClick={handleRetake}
                className="rounded-full gap-1.5"
              >
                <RotateCcw className="size-3.5" />
                {t('enneagram.retake')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

/**
 * Reconstruct a full score result from Wire data for display
 * when raw answers are no longer available.
 */
function buildResultFromWire(enneagram: { core: number; wing: number; scores: number[] }): EnneagramScoreResult {
  const maxPerType = 20; // 4 items × 5 max per item
  const scores: TypeScore[] = enneagram.scores.map((raw, idx) => ({
    type: idx + 1,
    name: TYPE_NAMES[idx + 1] ?? `Type ${idx + 1}`,
    rawScore: raw,
    maxScore: maxPerType,
    percent: Math.round((raw / maxPerType) * 100),
  }));

  return {
    scores,
    coreType: enneagram.core,
    wing: enneagram.wing,
    label: `${enneagram.core}w${enneagram.wing}`,
    rawScores: enneagram.scores,
  };
}
