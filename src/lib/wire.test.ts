import { describe, it, expect } from 'vitest';
import { formatWire, isWirePopulated, filledChamberCount, TOTAL_CHAMBERS, type Wire } from './wire';

const fullWire: Wire = {
  jung: { type: 'INTJ', ei: 80, sn: 75, tf: 30, jp: 20 },
  humanDesign: { type: 'Generator', profile: '3/5', authority: 'Sacral' },
  millman: { number: '30/3' },
  enneagram: { core: 8, wing: 7, scores: [10, 10, 10, 10, 10, 10, 30, 40, 10] },
} as unknown as Wire;

describe('formatWire', () => {
  it('renders the full canonical signature', () => {
    expect(formatWire(fullWire)).toBe('INTJ · Generator 3/5 · Millman 30/3 · Enneagram 8w7');
  });

  it('renders partial wires without dangling separators', () => {
    const partial = { millman: fullWire.millman } as Wire;
    expect(formatWire(partial)).toBe('Millman 30/3');
    const two = { jung: fullWire.jung, enneagram: fullWire.enneagram } as Wire;
    expect(formatWire(two)).toBe('INTJ · Enneagram 8w7');
  });

  it('renders the empty wire as an empty string', () => {
    expect(formatWire({} as Wire)).toBe('');
  });

  it('renders corrected double-digit Millman finals verbatim', () => {
    const w = { millman: { number: '48/12' } } as Wire;
    expect(formatWire(w)).toBe('Millman 48/12');
  });
});

describe('chamber accounting', () => {
  it('counts filled chambers', () => {
    expect(filledChamberCount({} as Wire)).toBe(0);
    expect(filledChamberCount({ millman: { number: '4' } } as Wire)).toBe(1);
    expect(filledChamberCount(fullWire)).toBe(TOTAL_CHAMBERS);
  });

  it('isWirePopulated reflects any filled chamber', () => {
    expect(isWirePopulated({} as Wire)).toBe(false);
    expect(isWirePopulated({ millman: { number: '4' } } as Wire)).toBe(true);
  });
});
