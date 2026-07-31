import { useCallback, useEffect, useRef, useState } from 'react';
import { CountDown } from '../../components/CountDown';
import { FocusFlame } from '../../components/FocusFlame';
import { HistoryPanel } from '../../components/HistoryPanel';
import { MainForm } from '../../components/MainForm';
import { SettingsPanel } from '../../components/SettingsPanel';
import { TaskPanel } from '../../components/TaskPanel';
import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import { MainTemplate } from '../../templates/MainTemplate';
import { playCompletionSound } from '../../utils/playCompletionSound';

export function Home() {
  const { ContextState, dismissFeedback, toggleTask } = useTaskContext();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const playedSessionId = useRef<string | null>(null);
  const closeHistory = useCallback(() => setIsHistoryOpen(false), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);
  const selectedTask = ContextState.tasks.find(
    (task) => task.id === ContextState.selectedTaskId,
  );
  const latestSession = ContextState.sessions.at(-1);
  const completedTask =
    ContextState.sessionStatus === 'completed' && latestSession?.taskId
      ? ContextState.tasks.find((task) => task.id === latestSession.taskId)
      : null;

  useEffect(() => {
    if (
      ContextState.sessionStatus !== 'completed' ||
      latestSession?.status !== 'completed' ||
      playedSessionId.current === latestSession.id
    ) {
      return;
    }

    playedSessionId.current = latestSession.id;
    if (ContextState.settings.soundEnabled) playCompletionSound();
  }, [
    ContextState.sessionStatus,
    ContextState.settings.soundEnabled,
    latestSession,
  ]);

  return (
    <MainTemplate
      onOpenHistory={() => setIsHistoryOpen(true)}
      onOpenSettings={() => setIsSettingsOpen(true)}
    >
      <div className='home-layout'>
        <section className='timer-area' aria-labelledby='session-title'>
          <FocusFlame />
          <h2 className='session-title' id='session-title'>
            Focus
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
      {isSettingsOpen && <SettingsPanel onClose={closeSettings} />}
    </MainTemplate>
  );
}
