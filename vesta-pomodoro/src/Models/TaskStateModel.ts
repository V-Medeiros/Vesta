import type { TaskModel } from './TaskModel';

export type TimerStatus =
  | 'idle'
  | 'running'
  | 'paused'
  | 'completed'
  | 'abandoned';

export type TaskStateModel = {
  tasks: TaskModel[];
  secondsRemaining: number;
  formattedSecondsRemaining: string;
  activeTask: TaskModel | null;
  timerStatus: TimerStatus;
  endsAt: number | null;
  feedbackMessage: string | null;
  currentCycle: number;
  config: {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };
};
