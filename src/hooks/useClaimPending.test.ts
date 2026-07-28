import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useClaimPending } from './useClaimPending';

describe('useClaimPending', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts as not pending', () => {
    const { result } = renderHook(() => useClaimPending());
    expect(result.current.isPending).toBe(false);
  });

  it('becomes pending after setPending', () => {
    const { result } = renderHook(() => useClaimPending());
    act(() => result.current.setPending());
    expect(result.current.isPending).toBe(true);
  });

  it('clears with clearPending', () => {
    const { result } = renderHook(() => useClaimPending());
    act(() => result.current.setPending());
    expect(result.current.isPending).toBe(true);
    act(() => result.current.clearPending());
    expect(result.current.isPending).toBe(false);
  });
});
