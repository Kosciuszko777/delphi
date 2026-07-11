import { useState, useMemo } from 'react';
import { useSeoMeta } from '@unhead/react';
import { useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWire } from '@/hooks/useWire';
import { useJungAnswers } from '@/hooks/useJungAnswers';
import { scoreJung, isComplete, answeredCount } from '@/lib/jung/scoring';
import type { DimensionScore } from '@/lib/jung/scoring';
import type { Pole } from '@/lib/jung/items';
import { TOTAL_ITEMS } from '@/lib/jung/items';
import type { JungResult } from '@/lib/wire';
import { JungQuestionnaire } from '@/components/jung/JungQuestionnaire';
import { JungResults } from '@/components/jung/JungResults';
import { ArrowLeft, RotateCcw } from 'lucide-react';

type Phase = 'intro' | 'quiz' | 'results';

export default function JungPage() {
  const { wire, updateWire } = useWire();
  const { answers, setAnswer, clearAnswers } = useJungAnswers();
  const navigate = useNavigate();

  const hasExistingResult = !!wire.jung;
  const hasProgress = answeredCount(answers) > 0;
  const allAnswered = isComplete(answers);

  // Determine initial phase
  const initialPhase: Phase = hasExistingResult
    ? 'results'
    : hasProgress
      ? 'quiz'
      : 'intro';

  const [phase, setPhase] = useState<Phase>(initialPhase);

  const result = useMemo(() => {
    if (allAnswered) return scoreJung(answers);
    if (wire.jung) {
      // Reconstruct a minimal result from wire for display
      return {
        type: wire.jung.type,
        ei: wire.jung.ei,
        sn: wire.jung.sn,
        tf: wire.jung.tf,
        jp: wire.jung.jp,
        dimensions: buildDimensionsFromWire(wire.jung),
      };
    }
    return null;
  }, [allAnswered, answers, wire.jung]);

  useSeoMeta({
    title: '16-Type Jungian Assessment — Delphi',
    description: 'A 32-item questionnaire mapping your cognitive functions and personality preferences across four Jungian dimensions.',
  });

  const handleComplete = () => {
    if (!allAnswered) return;
    const scored = scoreJung(answers);

    // Save to Wire
    updateWire((current) => ({
      ...current,
      jung: {
        type: scored.type,
        ei: scored.ei,
        sn: scored.sn,
        tf: scored.tf,
        jp: scored.jp,
      },
    }));

    setPhase('results');
  };

  const handleRetake = () => {
    clearAnswers();
    updateWire((current) => {
      const next = { ...current };
      delete next.jung;
      return next;
    });
    setPhase('intro');
  };

  const handleStartQuiz = () => {
    setPhase('quiz');
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
          Back to Assessments
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center size-10 rounded-full bg-oracle/15 text-oracle text-sm font-bold">
              J
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              16-Type Jungian Profile
            </h1>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            {phase === 'results'
              ? 'Your cognitive function profile across four Jungian dimensions.'
              : 'A 32-item questionnaire exploring how you perceive, decide, and orient your energy. Takes about 10 minutes.'
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
                    <span>You'll see 32 statements about how you think, feel, and act.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center size-6 rounded-full bg-oracle/10 text-oracle text-xs font-bold shrink-0">2</span>
                    <span>Rate each one from "Strongly disagree" to "Strongly agree" — go with your first instinct.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center size-6 rounded-full bg-oracle/10 text-oracle text-xs font-bold shrink-0">3</span>
                    <span>Your answers are scored across four dimensions: Energy (E–I), Perception (S–N), Decision-making (T–F), and Lifestyle (J–P).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center size-6 rounded-full bg-oracle/10 text-oracle text-xs font-bold shrink-0">4</span>
                    <span>You'll receive your four-letter type with percentage breakdowns and an in-depth interpretation.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Privacy:</strong> Your answers are stored locally on this device only. 
                  They are never sent to any server. Only the derived four-letter type code will 
                  be added to your Wire — raw answers remain private.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleStartQuiz}
                  className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-8"
                >
                  Begin Assessment
                </Button>
                {hasProgress && (
                  <Button
                    variant="outline"
                    onClick={() => setPhase('quiz')}
                    className="rounded-full"
                  >
                    Resume ({answeredCount(answers)}/{TOTAL_ITEMS} answered)
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Questionnaire */}
        {phase === 'quiz' && (
          <JungQuestionnaire
            answers={answers}
            onAnswer={setAnswer}
            onComplete={handleComplete}
          />
        )}

        {/* Results */}
        {phase === 'results' && result && (
          <div className="space-y-6">
            <JungResults result={result} />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/wire')}
                className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-6"
              >
                View My Wire
              </Button>
              <Button
                variant="outline"
                onClick={handleRetake}
                className="rounded-full gap-1.5"
              >
                <RotateCcw className="size-3.5" />
                Retake Assessment
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

/**
 * Reconstruct DimensionScore array from stored wire data for display.
 * This is used when viewing results without raw answers (e.g., coming
 * back to the page after closing).
 */
function buildDimensionsFromWire(jung: JungResult): DimensionScore[] {
  const dims: Array<{
    dimension: 'EI' | 'SN' | 'TF' | 'JP';
    leftPole: string;
    rightPole: string;
    leftName: string;
    rightName: string;
    rightPercent: number;
  }> = [
    { dimension: 'EI', leftPole: 'E', rightPole: 'I', leftName: 'Extraversion', rightName: 'Introversion', rightPercent: jung.ei },
    { dimension: 'SN', leftPole: 'S', rightPole: 'N', leftName: 'Sensing', rightName: 'Intuition', rightPercent: jung.sn },
    { dimension: 'TF', leftPole: 'T', rightPole: 'F', leftName: 'Thinking', rightName: 'Feeling', rightPercent: jung.tf },
    { dimension: 'JP', leftPole: 'J', rightPole: 'P', leftName: 'Judging', rightName: 'Perceiving', rightPercent: jung.jp },
  ];

  return dims.map(d => {
    const leftPercent = 100 - d.rightPercent;
    const rightPercent = d.rightPercent;
    const diff = Math.abs(leftPercent - rightPercent);
    const strength: 'slight' | 'moderate' | 'clear' | 'strong' =
      diff <= 10 ? 'slight' :
      diff <= 25 ? 'moderate' :
      diff <= 40 ? 'clear' : 'strong';

    return {
      dimension: d.dimension,
      leftPole: d.leftPole,
      rightPole: d.rightPole,
      leftName: d.leftName,
      rightName: d.rightName,
      leftPercent,
      rightPercent,
      winner: (leftPercent >= rightPercent ? d.leftPole : d.rightPole) as Pole,
      strength,
    };
  });
}
