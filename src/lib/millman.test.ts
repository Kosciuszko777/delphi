import { describe, it, expect } from 'vitest';
import {
  computeMillmanNumber,
  getFinalDigit,
  getWorkingSum,
  getPurposeDigits,
  isValidBirthDate,
} from './millman';

describe('computeMillmanNumber', () => {
  it('computes the documented example: March 15, 1978 → 34/7', () => {
    // 0+3+1+5+1+9+7+8 = 34 → 3+4 = 7
    expect(computeMillmanNumber(1978, 3, 15)).toBe('34/7');
  });

  it('produces the classic 30/3 pattern', () => {
    // Dec 3, 1968: 1+2+0+3+1+9+6+8 = 30 → 30/3
    expect(computeMillmanNumber(1968, 12, 3)).toBe('30/3');
  });

  describe('double-digit finals terminate (Millman system invariant)', () => {
    it('29 → 29/11, never 29/11/2', () => {
      // Nov 13, 1976: 1+1+1+3+1+9+7+6 = 29 → 2+9 = 11 (terminates)
      expect(computeMillmanNumber(1976, 11, 13)).toBe('29/11');
    });

    it('48 → 48/12, never 48/12/3 (maximum possible working sum)', () => {
      // Sep 29, 1999: 0+9+2+9+1+9+9+9 = 48 → 4+8 = 12 (terminates)
      expect(computeMillmanNumber(1999, 9, 29)).toBe('48/12');
    });

    it('28 → 28/10, never 28/10/1', () => {
      // Nov 12, 1976: 1+1+1+2+1+9+7+6 = 28 → 2+8 = 10 (terminates)
      expect(computeMillmanNumber(1976, 11, 12)).toBe('28/10');
    });

    it('never emits a three-part chain for any date in a full year sweep', () => {
      for (let month = 1; month <= 12; month++) {
        for (let day = 1; day <= 28; day++) {
          for (const year of [1900, 1955, 1976, 1999, 2000, 2011]) {
            const parts = computeMillmanNumber(year, month, day).split('/');
            expect(parts.length).toBeLessThanOrEqual(2);
          }
        }
      }
    });
  });

  it('handles leap day births', () => {
    // Feb 29, 2000: 0+2+2+9+2+0+0+0 = 15 → 15/6
    expect(computeMillmanNumber(2000, 2, 29)).toBe('15/6');
  });

  it('renders single-digit working sums without a slash (post-2000 births)', () => {
    // Jan 1, 2000: 0+1+0+1+2+0+0+0 = 4
    expect(computeMillmanNumber(2000, 1, 1)).toBe('4');
  });
});

describe('accessors', () => {
  it('getFinalDigit returns double-digit finals intact', () => {
    expect(getFinalDigit('29/11')).toBe(11);
    expect(getFinalDigit('48/12')).toBe(12);
    expect(getFinalDigit('34/7')).toBe(7);
    expect(getFinalDigit('4')).toBe(4);
  });

  it('getWorkingSum reads the first component', () => {
    expect(getWorkingSum('48/12')).toBe(48);
    expect(getWorkingSum('4')).toBe(4);
  });

  it('getPurposeDigits decomposes composite finals', () => {
    expect(getPurposeDigits(11)).toEqual([1, 1]);
    expect(getPurposeDigits(12)).toEqual([1, 2]);
    expect(getPurposeDigits(10)).toEqual([1, 0]);
    expect(getPurposeDigits(7)).toEqual([7]);
  });
});

describe('isValidBirthDate', () => {
  it('accepts real dates and leap days', () => {
    expect(isValidBirthDate(1978, 3, 15)).toBe(true);
    expect(isValidBirthDate(2000, 2, 29)).toBe(true);
  });

  it('rejects impossible calendar dates', () => {
    expect(isValidBirthDate(1999, 2, 29)).toBe(false); // not a leap year
    expect(isValidBirthDate(1990, 4, 31)).toBe(false); // April has 30 days
    expect(isValidBirthDate(1990, 13, 1)).toBe(false);
    expect(isValidBirthDate(1990, 0, 10)).toBe(false);
  });

  it('rejects out-of-range years', () => {
    expect(isValidBirthDate(1899, 6, 1)).toBe(false);
    expect(isValidBirthDate(new Date().getFullYear() + 1, 6, 1)).toBe(false);
  });
});
