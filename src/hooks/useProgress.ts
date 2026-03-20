import { useState, useEffect, useCallback } from 'react';
import { PHASES, BADGES, ALL_MODULES } from '../data/roadmap.js';

// ── Types ─────────────────────────────────────────────────────────────────────

interface QuizResult {
  score: number;
  total: number;
  date: string;
  attempts: number;
}

interface Progress {
  completedModules:  string[];
  completedExercises: string[];
  completedQuizzes:  Record<string, QuizResult>;
  xp:                number;
  level:             number;
  badges:            string[];
  startedAt:         string;
  lastActivity:      string;
}

interface PhaseProgress {
  completed: number;
  total:     number;
  percent:   number;
}

interface LevelProgress {
  current: number;
  needed:  number;
  percent: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'devjourney_progress';
const XP_LEVELS   = [0, 100, 250, 500, 900, 1500, 2500, 4000, 6000, 9000, 13000] as const;

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeDefaultProgress(): Progress {
  const now = new Date().toISOString();
  return {
    completedModules:  [],
    completedExercises: [],
    completedQuizzes:  {},
    xp:          0,
    level:       1,
    badges:      [],
    startedAt:   now,
    lastActivity: now,
  };
}

function calcLevel(xp: number): number {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i]) return i + 1;
  }
  return 1;
}

function xpToNextLevel(xp: number): LevelProgress {
  const currentLevel   = calcLevel(xp);
  const currentLevelXp = XP_LEVELS[currentLevel - 1] ?? 0;
  const nextLevelXp    = XP_LEVELS[currentLevel]     ?? XP_LEVELS[XP_LEVELS.length - 1];
  const range          = nextLevelXp - currentLevelXp;
  return {
    current: xp - currentLevelXp,
    needed:  range,
    percent: range > 0 ? Math.min(100, ((xp - currentLevelXp) / range) * 100) : 100,
  };
}

function migrateProgress(raw: unknown): Progress {
  const defaults = makeDefaultProgress();
  if (typeof raw !== 'object' || raw === null) return defaults;
  const p = raw as Record<string, unknown>;
  const migrated: Progress = { ...defaults, ...p } as Progress;
  if (!Array.isArray(migrated.completedModules))   migrated.completedModules   = [];
  if (!Array.isArray(migrated.completedExercises)) migrated.completedExercises = [];
  if (!Array.isArray(migrated.badges))             migrated.badges             = [];
  if (typeof migrated.completedQuizzes !== 'object' || migrated.completedQuizzes === null) {
    migrated.completedQuizzes = {};
  }
  migrated.xp    = typeof migrated.xp    === 'number' ? migrated.xp    : 0;
  migrated.level = typeof migrated.level === 'number' ? migrated.level : 1;
  return migrated;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return makeDefaultProgress();
      return migrateProgress(JSON.parse(stored));
    } catch {
      console.warn('[DevJourney] Progresso corrompido, reiniciando.');
      return makeDefaultProgress();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const completeModule = useCallback((moduleId: string) => {
    setProgress(prev => {
      if (prev.completedModules.includes(moduleId)) return prev;
      const module    = ALL_MODULES.find(m => m.id === moduleId);
      const earnedXp  = module?.xp ?? 0;
      const newXp     = prev.xp + earnedXp;
      const newCompleted = [...prev.completedModules, moduleId];
      const stats = {
        completedModules: newCompleted.length,
        completedPhases:  PHASES
          .filter(p => p.modules.every((m: { id: string }) => newCompleted.includes(m.id)))
          .map((p: { id: string }) => p.id),
      };
      const newBadges = BADGES
        .filter((b: { id: string; condition: (s: typeof stats) => boolean }) =>
          !prev.badges.includes(b.id) && b.condition(stats))
        .map((b: { id: string }) => b.id);
      return {
        ...prev,
        completedModules: newCompleted,
        xp:           newXp,
        level:        calcLevel(newXp),
        badges:       [...prev.badges, ...newBadges],
        lastActivity: new Date().toISOString(),
      };
    });
  }, []);

  const saveQuizResult = useCallback((moduleId: string, score: number, total: number) => {
    setProgress(prev => {
      const existing = prev.completedQuizzes?.[moduleId];
      const isBetter = !existing || score > existing.score;
      return {
        ...prev,
        completedQuizzes: {
          ...prev.completedQuizzes,
          [moduleId]: {
            score:    isBetter ? score         : existing.score,
            total,
            date:     isBetter ? new Date().toISOString() : existing.date,
            attempts: (existing?.attempts ?? 0) + 1,
          },
        },
        lastActivity: new Date().toISOString(),
      };
    });
  }, []);

  const isModuleCompleted  = useCallback((moduleId: string) =>
    progress.completedModules.includes(moduleId),
  [progress.completedModules]);

  const isModuleUnlocked   = useCallback((_moduleId: string) => true, []);

  const isModuleRecommended = useCallback((moduleId: string) => {
    const idx = ALL_MODULES.findIndex((m: { id: string }) => m.id === moduleId);
    if (idx <= 0) return true;
    return progress.completedModules.includes(ALL_MODULES[idx - 1].id);
  }, [progress.completedModules]);

  const getPhaseProgress = useCallback((phaseId: string): PhaseProgress => {
    const phase = PHASES.find((p: { id: string }) => p.id === phaseId);
    if (!phase) return { completed: 0, total: 0, percent: 0 };
    const completed = phase.modules.filter(
      (m: { id: string }) => progress.completedModules.includes(m.id)
    ).length;
    return {
      completed,
      total:   phase.modules.length,
      percent: phase.modules.length > 0
        ? Math.round((completed / phase.modules.length) * 100)
        : 0,
    };
  }, [progress.completedModules]);

  const completeExercise = useCallback((moduleId: string) => {
    setProgress(prev => {
      if ((prev.completedExercises ?? []).includes(moduleId)) return prev;
      return {
        ...prev,
        completedExercises: [...(prev.completedExercises ?? []), moduleId],
        lastActivity: new Date().toISOString(),
      };
    });
  }, []);

  const isExerciseCompleted = useCallback((moduleId: string) =>
    (progress.completedExercises ?? []).includes(moduleId),
  [progress.completedExercises]);

  const resetProgress = useCallback(() => {
    setProgress(makeDefaultProgress());
  }, []);

  return {
    progress,
    completeModule,
    completeExercise,
    isExerciseCompleted,
    saveQuizResult,
    isModuleCompleted,
    isModuleUnlocked,
    isModuleRecommended,
    getPhaseProgress,
    totalModules:  ALL_MODULES.length,
    overallPercent: Math.round((progress.completedModules.length / ALL_MODULES.length) * 100),
    levelProgress:  xpToNextLevel(progress.xp),
    calcLevel,
    resetProgress,
  };
}
