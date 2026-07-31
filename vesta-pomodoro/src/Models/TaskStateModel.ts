import type { SessionModel } from './SessionModel';
import type { TaskModel } from './TaskModel';

export type TimerStatus =
  | 'idle'
  | 'running'
  | 'paused'
  | 'completed'
  | 'abandoned';

export type ActiveSessionModel = {
  id: string;
  durationMinutes: number;
  taskId: string | null;
  status: 'running' | 'paused';
  startedAt: string;
  endsAt: number | null;
  pausedSecondsRemaining: number | null;
};

export type StreakModel = {
  current: number;
  lastSessionDate: string | null;
  longestEver: number;
};

export type SettingsModel = {
  defaultDuration: number;
  soundEnabled: boolean;
};

export type TaskStateModel = {
  tasks: TaskModel[];
  sessions: SessionModel[];
  streak: StreakModel;
  settings: SettingsModel;
  activeSession: ActiveSessionModel | null;
  sessionStatus: TimerStatus;
  secondsRemaining: number;
  durationMinutes: number;
  selectedTaskId: string | null;
  feedbackMessage: string | null;
};
