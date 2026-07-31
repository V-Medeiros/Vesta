import { CountDown } from '../../components/CountDown';
import { FocusFlame } from '../../components/FocusFlame';
import { HistoryPanel } from '../../components/HistoryPanel';
import { MainForm } from '../../components/MainForm';
import { TaskPanel } from '../../components/TaskPanel';
import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import { MainTemplate } from '../../templates/MainTemplate';
import { useCallback, useState } from 'react';

const SESSION_LABELS = {
  idle: 'Pronto para focar',
  running: 'Foco em andamento',
  paused: 'Sessão pausada',
  completed: 'Sessão concluída',
  abandoned: 'Sessão encerrada',
} as const;

export function Home() {
  const { ContextState, dismissFeedback, toggleTask } = useTaskContext();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const closeHistory = useCallback(() => setIsHistoryOpen(false), []);
  const selectedTask = ContextState.tasks.find(
    (task) => task.id === ContextState.selectedTaskId,
  );
  const latestSession = ContextState.sessions.at(-1);
  const completedTask =
    ContextState.sessionStatus === 'completed' && latestSession?.taskId
      ? ContextState.tasks.find((task) => task.id === latestSession.taskId)
      : null;

  return (
    <MainTemplate onOpenHistory={() => setIsHistoryOpen(true)}>
      <div className='home-layout'>
        <section className='timer-area' aria-labelledby='session-title'>
          <FocusFlame />
          <h2 className='session-title' id='session-title'>
            {SESSION_LABELS[ContextState.sessionStatus]}
          </h2>
          {selectedTask && (
            <p className='active-task-label'>{selectedTask.text}</p>
          )}
          <CountDown />

          {ContextState.feedbackMessage && (
            <div className='session-feedback' role='status'>
              <span>
                {ContextState.feedbackMessage}
                {completedTask && !completedTask.completed && (
                  <button
                    className='complete-task-action'
                    type='button'
                    onClick={() => toggleTask(completedTask.id)}
                  >
                    Marcar “{completedTask.text}” como concluída
                  </button>
                )}
              </span>
              <button type='button' onClick={dismissFeedback}>
                Fechar
              </button>
            </div>
          )}

          <MainForm />
        </section>

        <TaskPanel />
      </div>
      {isHistoryOpen && <HistoryPanel onClose={closeHistory} />}
    </MainTemplate>
  );
}
