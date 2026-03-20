import { useState, useEffect, useCallback, useRef } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface StreakData {
  current:    number;
  best:       number;
  lastDate:   string | null;
  activeDays: string[];
}

interface ReminderData {
  enabled:    boolean;
  hour:       number;
  minute:     number;
  permission: NotificationPermission | 'default';
}

// ── Constants ─────────────────────────────────────────────────────────────────

const STREAK_KEY = 'devjourney_streak_v1';
const REMIND_KEY = 'devjourney_reminder_v1';

// ── Date helpers (local timezone) ─────────────────────────────────────────────

function toLocalDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function today():     string { return toLocalDateStr(new Date()); }
function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return toLocalDateStr(d);
}
function ninetyDaysAgo(): string {
  const d = new Date();
  d.setDate(d.getDate() - 90);
  return toLocalDateStr(d);
}

// ── Persistence helpers ───────────────────────────────────────────────────────

function defaultStreak(): StreakData {
  return { current: 0, best: 0, lastDate: null, activeDays: [] };
}

function defaultReminder(): ReminderData {
  return { enabled: false, hour: 20, minute: 0, permission: 'default' };
}

function loadStreak(): StreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    return raw ? { ...defaultStreak(), ...JSON.parse(raw) } : defaultStreak();
  } catch { return defaultStreak(); }
}

function loadReminder(): ReminderData {
  try {
    const raw = localStorage.getItem(REMIND_KEY);
    return raw ? { ...defaultReminder(), ...JSON.parse(raw) } : defaultReminder();
  } catch { return defaultReminder(); }
}

function saveStreakData(data: StreakData):   void {
  try { localStorage.setItem(STREAK_KEY, JSON.stringify(data)); } catch { /* ignore */ }
}
function saveReminderData(data: ReminderData): void {
  try { localStorage.setItem(REMIND_KEY, JSON.stringify(data)); } catch { /* ignore */ }
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useStreak() {
  const [streak,   setStreakState]   = useState<StreakData>(loadStreak);
  const [reminder, setReminderState] = useState<ReminderData>(loadReminder);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { saveStreakData(streak); },   [streak]);
  useEffect(() => { saveReminderData(reminder); }, [reminder]);

  const registerActivity = useCallback(() => {
    setStreakState(prev => {
      const t = today();
      if (prev.lastDate === t) return prev;
      const wasYesterday = prev.lastDate === yesterday();
      const newCurrent   = wasYesterday ? prev.current + 1 : 1;
      const newBest      = Math.max(prev.best, newCurrent);
      const activeDays   = [...new Set([...prev.activeDays, t])]
        .filter(d => d >= ninetyDaysAgo())
        .sort();
      return { current: newCurrent, best: newBest, lastDate: t, activeDays };
    });
  }, []);

  const streakAtRisk  = streak.lastDate !== null && streak.lastDate !== today() && streak.current > 0;
  const studiedToday  = streak.lastDate === today();

  // Notification scheduling
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!reminder.enabled || reminder.permission !== 'granted') return;

    const now  = new Date();
    const fire = new Date();
    fire.setHours(reminder.hour, reminder.minute, 0, 0);
    if (fire <= now) fire.setDate(fire.getDate() + 1);

    timerRef.current = setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('🔥 DevJourney — hora de estudar!', {
          body: streak.current > 0
            ? `Você está em ${streak.current} dia(s) de streak. Não perca agora!`
            : 'Comece um novo streak hoje. Só 1 módulo já conta!',
          icon: '/favicon.ico',
          tag:  'devjourney-reminder',
        });
      }
      saveReminderData({ ...reminder });
    }, fire.getTime() - now.getTime());

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [reminder, streak.current]);

  const enableReminder = useCallback(async (hour: number, minute: number): Promise<NotificationPermission> => {
    let permission = Notification.permission;
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }
    const next: ReminderData = { enabled: permission === 'granted', hour, minute, permission };
    setReminderState(next);
    return permission;
  }, []);

  const disableReminder = useCallback(() => {
    setReminderState(prev => ({ ...prev, enabled: false }));
  }, []);

  const updateReminderTime = useCallback((hour: number, minute: number) => {
    setReminderState(prev => ({ ...prev, hour, minute }));
  }, []);

  return {
    streak,
    reminder,
    studiedToday,
    streakAtRisk,
    registerActivity,
    enableReminder,
    disableReminder,
    updateReminderTime,
  };
}
