import { Home } from './pages/Home';
import { TaskContextProvider } from './context/TaskContext';

export function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}
