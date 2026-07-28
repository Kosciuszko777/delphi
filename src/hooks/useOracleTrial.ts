import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ORACLE_TRIAL_QUESTIONS } from '@/lib/support/config';

const TRIAL_KEY = 'delphi:oracle-trial';

interface TrialState {
  used: number;
}

/**
 * Lifetime AI Oracle trial counter.
 * `ORACLE_TRIAL_QUESTIONS` introductory questions, ever — not monthly.
 * Once exhausted, the gate appears for free-tier users.
 */
export function useOracleTrial() {
  const [state, setState] = useLocalStorage<TrialState>(TRIAL_KEY, { used: 0 });

  const used = state.used;
  const remaining = Math.max(0, ORACLE_TRIAL_QUESTIONS - used);

  const consume = () => {
    setState((prev) => ({ used: prev.used + 1 }));
  };

  return { used, remaining, consume, limit: ORACLE_TRIAL_QUESTIONS };
}
