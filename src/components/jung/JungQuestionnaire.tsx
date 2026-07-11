import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { getShuffledItems, TOTAL_ITEMS } from '@/lib/jung/items';
import type { JungAnswers } from '@/lib/jung/scoring';
import { answeredCount } from '@/lib/jung/scoring';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const LIKERT_OPTIONS = [
  { value: 1, label: 'Strongly disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly agree' },
] as const;

interface JungQuestionnaireProps {
  answers: JungAnswers;
  onAnswer: (itemId: number, value: number) => void;
  onComplete: () => void;
}

export function JungQuestionnaire({ answers, onAnswer, onComplete }: JungQuestionnaireProps) {
  const items = useMemo(() => getShuffledItems(), []);
  const answered = answeredCount(answers);
  const progress = Math.round((answered / TOTAL_ITEMS) * 100);

  // Find the first unanswered item to start from, or 0
  const firstUnanswered = useMemo(() => {
    const idx = items.findIndex(item => answers[item.id] === undefined);
    return idx === -1 ? items.length - 1 : idx;
  }, []); // Only compute on mount — don't jump around while answering

  const [currentIndex, setCurrentIndex] = useState(firstUnanswered);
  const currentItem = items[currentIndex];
  const currentAnswer = currentItem ? answers[currentItem.id] : undefined;

  const isAllAnswered = answered === TOTAL_ITEMS;

  const goNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  }, [currentIndex, items.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  }, [currentIndex]);

  const handleSelect = (value: number) => {
    onAnswer(currentItem.id, value);
    // Auto-advance after a brief moment
    if (currentIndex < items.length - 1) {
      setTimeout(() => {
        setCurrentIndex(i => i + 1);
      }, 200);
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Question {currentIndex + 1} of {TOTAL_ITEMS}
          </span>
          <span className="text-muted-foreground font-medium tabular-nums">
            {answered}/{TOTAL_ITEMS} answered
          </span>
        </div>
        <Progress
          value={progress}
          className="h-2 bg-oracle/10"
        />
      </div>

      {/* Question card */}
      <div className="rounded-xl border border-border bg-card p-6 sm:p-8 min-h-[280px] flex flex-col">
        {/* Question text */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <p className="font-serif text-xl sm:text-2xl text-foreground text-center leading-relaxed max-w-lg">
            {currentItem.text}
          </p>
        </div>

        {/* Likert scale */}
        <div className="space-y-3">
          {/* Desktop: horizontal button row */}
          <div className="hidden sm:flex gap-2 justify-center">
            {LIKERT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'flex-1 max-w-[140px] py-3 px-2 rounded-lg border text-sm font-medium transition-all',
                  'focus-visible:ring-2 focus-visible:ring-oracle/50 focus-visible:outline-none',
                  currentAnswer === option.value
                    ? 'border-oracle bg-oracle/10 text-oracle'
                    : 'border-border bg-background text-muted-foreground hover:border-oracle/30 hover:bg-oracle/5'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Mobile: vertical list */}
          <div className="sm:hidden space-y-2">
            {LIKERT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'w-full py-3 px-4 rounded-lg border text-sm font-medium transition-all text-left',
                  'focus-visible:ring-2 focus-visible:ring-oracle/50 focus-visible:outline-none',
                  currentAnswer === option.value
                    ? 'border-oracle bg-oracle/10 text-oracle'
                    : 'border-border bg-background text-muted-foreground hover:border-oracle/30 hover:bg-oracle/5'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="gap-1.5"
        >
          <ArrowLeft className="size-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {isAllAnswered && (
            <Button
              onClick={onComplete}
              className="bg-oracle text-oracle-foreground hover:bg-oracle/90 rounded-full px-6 gap-1.5"
            >
              <Check className="size-4" />
              View Results
            </Button>
          )}

          {!isAllAnswered && currentIndex === items.length - 1 && (
            <span className="text-sm text-muted-foreground self-center">
              {TOTAL_ITEMS - answered} question{TOTAL_ITEMS - answered > 1 ? 's' : ''} remaining
            </span>
          )}

          <Button
            variant="ghost"
            onClick={goNext}
            disabled={currentIndex === items.length - 1}
            className="gap-1.5"
          >
            Next
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Quick-nav dots (skip to unanswered) */}
      {answered > 0 && !isAllAnswered && (
        <div className="text-center">
          <button
            onClick={() => {
              const idx = items.findIndex(item => answers[item.id] === undefined);
              if (idx !== -1) setCurrentIndex(idx);
            }}
            className="text-xs text-oracle hover:text-oracle/80 transition-colors underline underline-offset-2"
          >
            Jump to next unanswered question
          </button>
        </div>
      )}
    </div>
  );
}
