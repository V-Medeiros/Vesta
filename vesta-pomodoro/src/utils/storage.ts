import type {
  ActiveSessionModel,
  SettingsModel,
  StreakModel,
} from '../Models/TaskStateModel';
import type { SessionModel } from '../Models/SessionModel';
import type { TaskModel } from '../Models/TaskModel';

export const STORAGE_KEYS = {
  tasks: 'vesta_tasks',
  sessions: 'vesta_sessions',
  streak: 'vesta_streak',
  settings: 'vesta_settings',
  activeSession: 'vesta_active_session',
} as const;

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function loadTasks() {
  const tasks = readStorage<unknown>(STORAGE_KEYS.tasks, []);
  return Array.isArray(tasks) ? (tasks as TaskModel[]) : [];
}

export function loadSessions() {
  const sessions = readStorage<unknown>(STORAGE_KEYS.sessions, []);
  return Array.isArray(sessions) ? (sessions as SessionModel[]) : [];
}

export function loadStreak(fallback: StreakModel) {
  return readStorage<StreakModel>(STORAGE_KEYS.streak, fallback);
}

export function loadSettings(fallback: SettingsModel) {
  return readStorage<SettingsModel>(STORAGE_KEYS.settings, fallback);
}

export function loadActiveSession() {
  return readStorage<ActiveSessionModel | null>(
    STORAGE_KEYS.activeSession,
    null,
  );
}

export function writeStorage(key: string, value: unknown) {
  try {
    if (value === null) {
      localStorage.removeItem(key);
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // O aplicativo continua funcional mesmo quando o navegador bloqueia storage.
  }
}
