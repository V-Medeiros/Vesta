import { useEffect, useState } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import type { TaskStateModel } from '../../Models/TaskStateModel';

type TaskContexProviderProps = {
  children: React.ReactNode;
};

const STORAGE_KEY = 'vesta_timer_state';

function loadTaskState(): TaskStateModel {
  try {
    const storedState = localStorage.getItem(STORAGE_KEY);
    if (!storedState) return initialTaskState;

    const parsedState = JSON.parse(storedState) as Partial<TaskStateModel>;
    return {
      ...initialTaskState,
      ...parsedState,
      config: { ...initialTaskState.config, ...parsedState.config },
      tasks: Array.isArray(parsedState.tasks) ? parsedState.tasks : [],
    };
  } catch {
    return initialTaskState;
  }
}

export function TaskContextProvider({ children }: TaskContexProviderProps) {
  const [ContextState, SetState] = useState<TaskStateModel>(loadTaskState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ContextState));
  }, [ContextState]);
  return (
    <TaskContext.Provider value={{ ContextState, SetState }}>
      {children}
    </TaskContext.Provider>
  );
}
