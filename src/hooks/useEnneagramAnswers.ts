import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { EnneagramAnswers } from '@/lib/enneagram/scoring';

const ENNEAGRAM_ANSWERS_KEY = 'delphi:enneagram-answers';

/**
 * Hook to manage raw Enneagram questionnaire answers (local-only).
 * Resumable: answers persist in localStorage.
 */
export function useEnneagramAnswers() {
  const [answers, setAnswers] = useLocalStorage<EnneagramAnswers>(ENNEAGRAM_ANSWERS_KEY, {});

  const setAnswer = (itemId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [itemId]: value }));
  };

  const clearAnswers = () => {
    setAnswers({} as EnneagramAnswers);
  };

  return { answers, setAnswer, clearAnswers };
}
