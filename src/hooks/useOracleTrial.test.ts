import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useOracleTrial } from './useOracleTrial';
import { ORACLE_TRIAL_QUESTIONS } from '@/lib/support/config';

describe('useOracleTrial', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with full trial allowance', () => {
    const { result } = renderHook(() => useOracleTrial());
    expect(result.current.remaining).toBe(ORACLE_TRIAL_QUESTIONS);
    expect(result.current.used).toBe(0);
    expect(result.current.limit).toBe(ORACLE_TRIAL_QUESTIONS);
  });

  it('consumes one trial question at a time', () => {
    const { result } = renderHook(() => useOracleTrial());

    act(() => result.current.consume());
    expect(result.current.remaining).toBe(ORACLE_TRIAL_QUESTIONS - 1);
    expect(result.current.used).toBe(1);
  });

  it('reaches zero after consuming all trial questions', () => {
    const { result } = renderHook(() => useOracleTrial());

    for (let i = 0; i < ORACLE_TRIAL_QUESTIONS; i++) {
      act(() => result.current.consume());
    }
    expect(result.current.remaining).toBe(0);
    expect(result.current.used).toBe(ORACLE_TRIAL_QUESTIONS);
  });

  it('remaining never goes below zero', () => {
    const { result } = renderHook(() => useOracleTrial());

    for (let i = 0; i < ORACLE_TRIAL_QUESTIONS + 5; i++) {
      act(() => result.current.consume());
    }
    expect(result.current.remaining).toBe(0);
  });

  it('persists across hook re-renders', () => {
    const { result, rerender } = renderHook(() => useOracleTrial());

    act(() => result.current.consume());
    rerender();
    expect(result.current.used).toBe(1);
    expect(result.current.remaining).toBe(ORACLE_TRIAL_QUESTIONS - 1);
  });
});
