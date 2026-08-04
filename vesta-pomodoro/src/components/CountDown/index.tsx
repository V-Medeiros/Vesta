import { useEffect } from 'react';
import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import styles from './style.module.css';


export function CountDown() {
  const { ContextState, SetState } = useTaskContext();

  useEffect(() => {
    if (
      ContextState.timerStatus !== 'running' ||
      ContextState.endsAt === null ||
      ContextState.activeTask === null
    ) {
      return;
    }

    const activeTaskId = ContextState.activeTask.id;

    function updateTimer() {
      SetState((previousState) => {
        if (
          previousState.timerStatus !== 'running' ||
          previousState.endsAt === null ||
          previousState.activeTask?.id !== activeTaskId
        ) {
          return previousState;
        }

        const secondsRemaining = Math.max(
          0,
          Math.ceil((previousState.endsAt - Date.now()) / 1000),
        );

        if (secondsRemaining === 0) {
          const completedAt = Date.now();
          return {
            ...previousState,
            tasks: previousState.tasks.map((task) =>
              task.id === activeTaskId
                ? { ...task, completeDate: completedAt }
                : task,
            ),
            activeTask: null,
            secondsRemaining: 0,
            formattedSecondsRemaining: '00:00',
            timerStatus: 'completed',
            endsAt: null,
            feedbackMessage: 'Sessão concluída. A chama está mais forte!',
          };
        }

        if (secondsRemaining === previousState.secondsRemaining) {
          return previousState;
        }

        return {
          ...previousState,
          secondsRemaining,
          formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        };
      });
    }

    updateTimer();
    const intervalId = window.setInterval(updateTimer, 250);
    return () => window.clearInterval(intervalId);
  }, [
    ContextState.activeTask,
    ContextState.endsAt,
    ContextState.timerStatus,
    SetState,
  ]);

  useEffect(() => {
    document.title = `${ContextState.formattedSecondsRemaining} • Vesta`;
    return () => {
      document.title = 'Vesta';
    };
  }, [ContextState.formattedSecondsRemaining]);
  
  return(
    <div
      className={styles.container}
      role='timer'
      aria-live='off'
      aria-label={`${ContextState.formattedSecondsRemaining} restantes`}
    >
      {ContextState.formattedSecondsRemaining}
    </div>
  )
}
