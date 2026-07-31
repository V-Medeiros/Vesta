import type {
  SettingsModel,
  StreakModel,
  TaskStateModel,
} from '../../Models/TaskStateModel';
import { differenceInCalendarDays, toLocalDateKey } from '../../utils/date';
import {
  loadActiveSession,
  loadSessions,
  loadSettings,
  loadStreak,
  loadTasks,
} from '../../utils/storage';

export const defaultSettings: SettingsModel = {
  defaultDuration: 25,
  soundEnabled: true,
};

export const defaultStreak: StreakModel = {
  current: 0,
  lastSessionDate: null,
  longestEver: 0,
};

function getCurrentStreak(streak: StreakModel) {
  if (!streak.lastSessionDate) return streak;

  const daysSinceLastSession = differenceInCalendarDays(
    streak.lastSessionDate,
    toLocalDateKey(),
  );

  if (daysSinceLastSession <= 1) return streak;

  return { ...streak, current: 0 };
}

export function createInitialTaskState(): TaskStateModel {
  const settings = loadSettings(defaultSettings);
  const activeSession = loadActiveSession();
  const secondsRemaining =
    activeSession?.status === 'running' && activeSession.endsAt
      ? Math.max(0, Math.ceil((activeSession.endsAt - Date.now()) / 1000))
      : activeSession?.status === 'paused' &&
          activeSession.pausedSecondsRemaining
        ? activeSession.pausedSecondsRemaining
      : activeSession?.durationMinutes
        ? activeSession.durationMinutes * 60
        : settings.defaultDuration * 60;

  return {
    tasks: loadTasks(),
    sessions: loadSessions(),
    streak: getCurrentStreak(loadStreak(defaultStreak)),
    settings,
    activeSession,
    sessionStatus: activeSession?.status ?? 'idle',
    secondsRemaining,
    durationMinutes:
      activeSession?.durationMinutes ?? settings.defaultDuration,
    selectedTaskId: activeSession?.taskId ?? null,
    feedbackMessage: null,
  };
}
