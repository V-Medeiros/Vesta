import { createContext, useContext } from 'react';
import type { TaskStateModel } from '../../Models/TaskStateModel';

const initialState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
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

const ContextInitalState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};

const intialContextvalue = {
  ContextState: initialState, // nao importa
  ContextSetState: () => {}, // nao importa
};

export const TaskContext = createContext<TaskContextProps>(intialContextvalue);

type TaskContexProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContexProviderProps) {
  return (
    <TaskContext.Provider value={intialContextvalue}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext(){
  return  useContext(TaskContext);
  
}