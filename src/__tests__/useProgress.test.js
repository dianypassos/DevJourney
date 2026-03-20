import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProgress } from '../hooks/useProgress.ts';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem:  (key) => store[key] ?? null,
    setItem:  (key, value) => { store[key] = String(value); },
    removeItem:(key) => { delete store[key]; },
    clear:    () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock roadmap to avoid importing all phase data in tests
vi.mock('../data/roadmap.js', () => ({
  PHASES: [
    {
      id: 'phase-1',
      modules: [
        { id: 'mod-1-1', xp: 100 },
        { id: 'mod-1-2', xp: 150 },
      ],
    },
    {
      id: 'phase-2',
      modules: [
        { id: 'mod-2-1', xp: 200 },
      ],
    },
  ],
  BADGES: [
    {
      id: 'first-code',
      condition: (s) => s.completedModules >= 1,
    },
    {
      id: 'phase-1-done',
      condition: (s) => s.completedPhases?.includes('phase-1'),
    },
  ],
  ALL_MODULES: [
    { id: 'mod-1-1', xp: 100 },
    { id: 'mod-1-2', xp: 150 },
    { id: 'mod-2-1', xp: 200 },
  ],
}));

describe('useProgress', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('inicia com progresso zerado', () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.progress.xp).toBe(0);
    expect(result.current.progress.level).toBe(1);
    expect(result.current.progress.completedModules).toEqual([]);
    expect(result.current.progress.badges).toEqual([]);
  });

  it('completa um módulo e acumula XP', () => {
    const { result } = renderHook(() => useProgress());
    act(() => { result.current.completeModule('mod-1-1'); });
    expect(result.current.progress.xp).toBe(100);
    expect(result.current.progress.completedModules).toContain('mod-1-1');
  });

  it('não duplica XP ao completar o mesmo módulo duas vezes', () => {
    const { result } = renderHook(() => useProgress());
    act(() => { result.current.completeModule('mod-1-1'); });
    act(() => { result.current.completeModule('mod-1-1'); });
    expect(result.current.progress.xp).toBe(100);
    expect(result.current.progress.completedModules.filter(m => m === 'mod-1-1').length).toBe(1);
  });

  it('ganha badge first-code ao completar o primeiro módulo', () => {
    const { result } = renderHook(() => useProgress());
    act(() => { result.current.completeModule('mod-1-1'); });
    expect(result.current.progress.badges).toContain('first-code');
  });

  it('ganha badge de fase ao completar todos os módulos da fase', () => {
    const { result } = renderHook(() => useProgress());
    act(() => { result.current.completeModule('mod-1-1'); });
    act(() => { result.current.completeModule('mod-1-2'); });
    expect(result.current.progress.badges).toContain('phase-1-done');
  });

  it('isModuleCompleted retorna true apenas para módulos completados', () => {
    const { result } = renderHook(() => useProgress());
    act(() => { result.current.completeModule('mod-1-1'); });
    expect(result.current.isModuleCompleted('mod-1-1')).toBe(true);
    expect(result.current.isModuleCompleted('mod-1-2')).toBe(false);
  });

  it('getPhaseProgress calcula percentual correto', () => {
    const { result } = renderHook(() => useProgress());
    act(() => { result.current.completeModule('mod-1-1'); });
    const p = result.current.getPhaseProgress('phase-1');
    expect(p.completed).toBe(1);
    expect(p.total).toBe(2);
    expect(p.percent).toBe(50);
  });

  it('completeExercise registra exercício sem duplicar', () => {
    const { result } = renderHook(() => useProgress());
    act(() => { result.current.completeExercise('mod-1-1'); });
    act(() => { result.current.completeExercise('mod-1-1'); });
    expect(result.current.isExerciseCompleted('mod-1-1')).toBe(true);
    expect(result.current.progress.completedExercises.filter(m => m === 'mod-1-1').length).toBe(1);
  });

  it('saveQuizResult guarda melhor pontuação', () => {
    const { result } = renderHook(() => useProgress());
    act(() => { result.current.saveQuizResult('mod-1-1', 3, 5); });
    act(() => { result.current.saveQuizResult('mod-1-1', 4, 5); }); // melhor
    act(() => { result.current.saveQuizResult('mod-1-1', 2, 5); }); // pior — não deve sobrescrever
    const quiz = result.current.progress.completedQuizzes['mod-1-1'];
    expect(quiz.score).toBe(4);
    expect(quiz.attempts).toBe(3);
  });

  it('overallPercent calcula corretamente', () => {
    const { result } = renderHook(() => useProgress());
    act(() => { result.current.completeModule('mod-1-1'); });
    // 1 de 3 módulos = 33%
    expect(result.current.overallPercent).toBe(33);
  });

  it('resetProgress volta ao estado inicial', () => {
    const { result } = renderHook(() => useProgress());
    act(() => { result.current.completeModule('mod-1-1'); });
    act(() => { result.current.resetProgress(); });
    expect(result.current.progress.xp).toBe(0);
    expect(result.current.progress.completedModules).toEqual([]);
  });

  it('migração de schema: dados legados sem completedExercises não quebram', () => {
    // Simula dado antigo salvo sem completedExercises
    localStorageMock.setItem('devjourney_progress', JSON.stringify({
      completedModules: ['mod-1-1'],
      xp: 100,
      level: 1,
      badges: ['first-code'],
      // completedExercises ausente — dado de versão antiga
    }));
    const { result } = renderHook(() => useProgress());
    expect(result.current.progress.completedExercises).toEqual([]);
    expect(result.current.progress.completedModules).toContain('mod-1-1');
    expect(result.current.progress.xp).toBe(100);
  });

  it('migração de schema: dado corrompido não quebra o app', () => {
    localStorageMock.setItem('devjourney_progress', 'json_invalido_{{{');
    const { result } = renderHook(() => useProgress());
    expect(result.current.progress.xp).toBe(0);
    expect(result.current.progress.completedModules).toEqual([]);
  });
});
