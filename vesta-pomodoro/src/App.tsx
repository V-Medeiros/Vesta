import { TaskContextProvider } from './context/TaskContext/TaskContextProvider';
import { Home } from './pages/Home';

export function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}
