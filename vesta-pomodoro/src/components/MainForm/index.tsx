import { PauseIcon, PlayIcon, SquareIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../Models/TaskModel';
import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import { getNextCycle } from '../../utils/getNextcycle';
import { NextCycleType } from '../../utils/NextCycleType';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';

export function MainForm() {
  const { ContextState, SetState } = useTaskContext()
  const taskNameInput = useRef<HTMLInputElement>(null)

  const nextCycle = getNextCycle(ContextState.currentCycle);
  const nextCycleType = NextCycleType(nextCycle)

  function StartNewTask(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim()


    if (!taskName) {
      alert('AAAAAAAAAAAAAAA digite o nome da tarefa')
      return
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: ContextState.config[nextCycleType],
      type: nextCycleType,

    };

    const SecondsRemaining = newTask.duration * 60

    SetState(prevState => {
      return {
        ...prevState,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining: SecondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(SecondsRemaining),
        timerStatus: 'running',
        endsAt: Date.now() + SecondsRemaining * 1000,
        feedbackMessage: null,
        tasks: [...prevState.tasks, newTask],
        config: { ...prevState.config },


      }
    })

    taskNameInput.current.value = '';
  }

  function pauseTimer() {
    SetState((previousState) => {
      if (previousState.timerStatus !== 'running' || previousState.endsAt === null) {
        return previousState;
      }

      const secondsRemaining = Math.max(
        0,
        Math.ceil((previousState.endsAt - Date.now()) / 1000),
      );

      return {
        ...previousState,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        timerStatus: 'paused',
        endsAt: null,
        feedbackMessage: 'Sessão pausada.',
      };
    });
  }

  function resumeTimer() {
    SetState((previousState) => {
      if (previousState.timerStatus !== 'paused' || !previousState.activeTask) {
        return previousState;
      }

      return {
        ...previousState,
        timerStatus: 'running',
        endsAt: Date.now() + previousState.secondsRemaining * 1000,
        feedbackMessage: null,
      };
    });
  }

  function abandonTimer() {
    if (!window.confirm('Abandonar esta sessão? O progresso atual será perdido.')) {
      return;
    }

    SetState((previousState) => {
      if (!previousState.activeTask) return previousState;

      const interruptedAt = Date.now();
      const previousCycle = previousState.currentCycle === 1
        ? 0
        : previousState.currentCycle - 1;

      return {
        ...previousState,
        tasks: previousState.tasks.map((task) =>
          task.id === previousState.activeTask?.id
            ? { ...task, interruptDate: interruptedAt }
            : task,
        ),
        activeTask: null,
        currentCycle: previousCycle,
        secondsRemaining: 0,
        formattedSecondsRemaining: formatSecondsToMinutes(
          previousState.config.workTime * 60,
        ),
        timerStatus: 'abandoned',
        endsAt: null,
        feedbackMessage: 'Sessão encerrada. Reacenda a chama quando quiser.',
      };
    });
  }


  return (
    <form onSubmit={StartNewTask} className='task-form'>
      <DefaultInput
        type='text'
        id='inputTask'
        labelText='Foco da sessao'
        placeholder='What drives you today?'
        ref={taskNameInput}
        disabled={!!ContextState.activeTask}
      />

      {ContextState.activeTask ? (
        <div className='timer-actions'>
          {ContextState.timerStatus === 'paused' ? (
            <DefaultButton type='button' icon={<PlayIcon />} onClick={resumeTimer}>
              Retomar
            </DefaultButton>
          ) : (
            <DefaultButton type='button' icon={<PauseIcon />} onClick={pauseTimer}>
              Pausar
            </DefaultButton>
          )}
          <DefaultButton
            type='button'
            icon={<SquareIcon />}
            color='red'
            onClick={abandonTimer}
          >
            Encerrar
          </DefaultButton>
        </div>
      ): (<DefaultButton type='submit' icon={<PlayIcon />} color='orange'>
        Iniciar
      </DefaultButton>)}

      {ContextState.feedbackMessage && (
        <p className='timer-feedback' role='status'>
          {ContextState.feedbackMessage}
        </p>
      )}
    </form>
  );
}
