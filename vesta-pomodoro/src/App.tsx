import { useState } from 'react';
import { Home } from './pages/Home';
import type { TaskStateModel } from './Models/TaskStateModule';

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

export function App() {
  const [state, setState] = useState<TaskStateModel>(initialState);

  return <Home stateHome={state} setStateHome={setState} />;
}
