import { useState } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import type { TaskStateModel } from '../../Models/TaskStateModel';

type TaskContexProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContexProviderProps) {
  const [ContextState, ContextSetState] =
    useState<TaskStateModel>(initialTaskState);

  return (
    <TaskContext.Provider value={{ ContextState, ContextSetState }}>
      {children}
    </TaskContext.Provider>
  );
}
