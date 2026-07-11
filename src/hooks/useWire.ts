import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Wire } from '@/lib/wire';

const WIRE_STORAGE_KEY = 'delphi:wire';

/**
 * Hook to manage the user's Wire (local-only in Phase 1).
 * Persists to localStorage. No relay publishing.
 */
export function useWire() {
  const [wire, setWire] = useLocalStorage<Wire>(WIRE_STORAGE_KEY, {});

  const updateWire = (updater: (current: Wire) => Wire) => {
    setWire(updater);
  };

  return { wire, updateWire };
}
