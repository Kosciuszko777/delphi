import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { JungAnswers } from '@/lib/jung/scoring';

const JUNG_ANSWERS_KEY = 'delphi:jung-answers';

/**
 * Hook to manage raw Jung questionnaire answers (local-only).
 * Resumable: answers persist in localStorage so the user can
 * leave and come back without losing progress.
 */
export function useJungAnswers() {
  const [answers, setAnswers] = useLocalStorage<JungAnswers>(JUNG_ANSWERS_KEY, {});

  const setAnswer = (itemId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [itemId]: value }));
  };

  const clearAnswers = () => {
    setAnswers({} as JungAnswers);
  };

  return { answers, setAnswer, clearAnswers };
}
