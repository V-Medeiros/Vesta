import { createContext } from "react";
import type { TaskStateModel } from "../../Models/TaskStateModel";
import { initialTaskState } from "./initialTaskState";

type TaskContextProps = {
  ContextState: TaskStateModel;
  ContextSetState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const intialContextvalue = {
  ContextState: initialTaskState,
  ContextSetState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(intialContextvalue);

