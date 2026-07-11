import { useLocalStorage } from '@/hooks/useLocalStorage';

/**
 * Optional sensitive birth data for Human Design.
 * Stored locally only — flagged as sensitive, never published.
 * Needed later for computed HD engine (stretch goal, not in v1).
 */
export interface HDBirthData {
  date?: string;  // ISO YYYY-MM-DD
  time?: string;  // HH:MM (24h)
  place?: string; // Free text city/country
}

const HD_BIRTH_DATA_KEY = 'delphi:hd-birth-data';

export function useHDBirthData() {
  const [birthData, setBirthData] = useLocalStorage<HDBirthData>(HD_BIRTH_DATA_KEY, {});

  const updateBirthData = (data: Partial<HDBirthData>) => {
    setBirthData((prev) => ({ ...prev, ...data }));
  };

  const clearBirthData = () => {
    setBirthData({} as HDBirthData);
  };

  return { birthData, updateBirthData, clearBirthData };
}
