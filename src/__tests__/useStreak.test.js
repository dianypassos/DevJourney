import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStreak } from '../hooks/useStreak.ts';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem:  (key) => store[key] ?? null,
    setItem:  (key, val) => { store[key] = String(val); },
    removeItem:(key) => { delete store[key]; },
    clear:    () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Helper: gera string de data local no formato YYYY-MM-DD
function localDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

describe('useStreak', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('inicia com streak zerado', () => {
    const { result } = renderHook(() => useStreak());
    expect(result.current.streak.current).toBe(0);
    expect(result.current.streak.best).toBe(0);
    expect(result.current.streak.lastDate).toBeNull();
  });

  it('registerActivity no primeiro dia inicia streak em 1', () => {
    const { result } = renderHook(() => useStreak());
    act(() => { result.current.registerActivity(); });
    expect(result.current.streak.current).toBe(1);
    expect(result.current.streak.best).toBe(1);
  });

  it('registerActivity duas vezes no mesmo dia não incrementa', () => {
    const { result } = renderHook(() => useStreak());
    act(() => { result.current.registerActivity(); });
    act(() => { result.current.registerActivity(); });
    expect(result.current.streak.current).toBe(1);
  });

  it('registerActivity em dias consecutivos incrementa streak', () => {
    const today = new Date(2024, 0, 15);
    const tomorrow = new Date(2024, 0, 16);

    vi.setSystemTime(today);
    const { result } = renderHook(() => useStreak());

    act(() => { result.current.registerActivity(); });
    expect(result.current.streak.current).toBe(1);

    vi.setSystemTime(tomorrow);
    act(() => { result.current.registerActivity(); });
    expect(result.current.streak.current).toBe(2);
    expect(result.current.streak.best).toBe(2);
  });

  it('streak quebra se pular um dia', () => {
    const day1 = new Date(2024, 0, 15);
    const day3 = new Date(2024, 0, 17); // pulou o dia 16

    vi.setSystemTime(day1);
    const { result } = renderHook(() => useStreak());
    act(() => { result.current.registerActivity(); });

    vi.setSystemTime(day3);
    act(() => { result.current.registerActivity(); });
    expect(result.current.streak.current).toBe(1); // começa do zero
    expect(result.current.streak.best).toBe(1);    // melhor mantido
  });

  it('best streak mantém o maior valor após quebrar', () => {
    const { result } = renderHook(() => useStreak());

    // Dias 1, 2, 3 — streak 3
    for (let day = 1; day <= 3; day++) {
      vi.setSystemTime(new Date(2024, 0, day));
      act(() => { result.current.registerActivity(); });
    }
    expect(result.current.streak.best).toBe(3);

    // Pula dia 4, estuda no dia 5 — streak volta para 1
    vi.setSystemTime(new Date(2024, 0, 5));
    act(() => { result.current.registerActivity(); });
    expect(result.current.streak.current).toBe(1);
    expect(result.current.streak.best).toBe(3); // melhor preservado
  });

  it('studiedToday é true após registerActivity hoje', () => {
    vi.setSystemTime(new Date(2024, 0, 15));
    const { result } = renderHook(() => useStreak());
    act(() => { result.current.registerActivity(); });
    expect(result.current.studiedToday).toBe(true);
  });

  it('streakAtRisk é true se estudou ontem mas não hoje', () => {
    const yesterday = new Date(2024, 0, 14);
    const today = new Date(2024, 0, 15);

    vi.setSystemTime(yesterday);
    const { result } = renderHook(() => useStreak());
    act(() => { result.current.registerActivity(); });

    vi.setSystemTime(today);
    // Re-render para recalcular streakAtRisk com a nova data
    const { result: result2 } = renderHook(() => useStreak());
    expect(result2.current.streakAtRisk).toBe(true);
    expect(result2.current.studiedToday).toBe(false);
  });

  it('activeDays registra os dias de atividade', () => {
    const { result } = renderHook(() => useStreak());
    const day1 = new Date(2024, 0, 15);
    const day2 = new Date(2024, 0, 16);

    vi.setSystemTime(day1);
    act(() => { result.current.registerActivity(); });

    vi.setSystemTime(day2);
    act(() => { result.current.registerActivity(); });

    expect(result.current.streak.activeDays).toContain(localDateStr(day1));
    expect(result.current.streak.activeDays).toContain(localDateStr(day2));
    expect(result.current.streak.activeDays.length).toBe(2);
  });
});
