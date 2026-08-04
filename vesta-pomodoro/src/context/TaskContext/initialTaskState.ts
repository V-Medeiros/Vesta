import type { TaskStateModel } from "../../Models/TaskStateModel";

export const initialTaskState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: '25:00',
  activeTask: null,
  timerStatus: 'idle',
  endsAt: null,
  feedbackMessage: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};
