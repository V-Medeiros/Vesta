import { createContext, useContext, useState } from 'react';
import type { TaskStateModel } from '../../Models/TaskStateModel';

const initialState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: '67:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};

type TaskContextProps = {
  ContextState: TaskStateModel;
  ContextSetState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const intialContextvalue = {
  ContextState: initialState,
  ContextSetState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(intialContextvalue);

type TaskContexProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContexProviderProps) {
  const [ContextState, ContextSetState] =
    useState<TaskStateModel>(initialState);

  return (
    <TaskContext.Provider value={{ ContextState, ContextSetState }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}
