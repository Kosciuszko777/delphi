import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Soulgraph } from '@/lib/wire';

const WIRE_STORAGE_KEY = 'delphi:wire';

/**
 * Hook to manage the user's Soulgraph (local-only in Phase 1).
 * Persists to localStorage. No relay publishing.
 */
export function useSoulgraph() {
  const [soulgraph, setSoulgraph] = useLocalStorage<Soulgraph>(WIRE_STORAGE_KEY, {});

  const updateSoulgraph = (updater: (current: Soulgraph) => Soulgraph) => {
    setSoulgraph(updater);
  };

  return { soulgraph, updateSoulgraph };
}

/** @deprecated Use useSoulgraph instead. */
export function useWire() {
  const { soulgraph, updateSoulgraph } = useSoulgraph();
  return { wire: soulgraph, updateWire: updateSoulgraph };
}
