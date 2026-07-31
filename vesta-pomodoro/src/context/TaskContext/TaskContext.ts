import { createContext } from 'react';
import type { SettingsModel, TaskStateModel } from '../../Models/TaskStateModel';

export type TaskContextProps = {
  ContextState: TaskStateModel;
  setDuration: (minutes: number) => void;
  startSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  abandonSession: () => void;
  dismissFeedback: () => void;
  addTask: (text: string) => string;
  selectTask: (taskId: string | null) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  updateSettings: (settings: Partial<SettingsModel>) => void;
};

export const TaskContext = createContext<TaskContextProps | null>(null);
