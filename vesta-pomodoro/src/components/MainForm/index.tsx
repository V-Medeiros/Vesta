import { PlayIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import type { TaskModel } from '../../Models/TaskModel';
import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import { getNextCycle } from '../../utils/getNextcycle';

export function MainForm() {
  const { ContextState, SetState } = useTaskContext()
  const taskNameInput = useRef<HTMLInputElement>(null)

  const nextCycle = getNextCycle(ContextState.currentCycle);

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
      duration: 1,
      type: 'workTime',

    };

    const SecondsRemaining = newTask.duration * 60

    SetState(prevState => {
      return {
        ...prevState,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining: SecondsRemaining,
        formattedSecondsRemaining: '00:00',
        tasks: [...prevState.tasks, newTask],
        config: { ...prevState.config },


      }
    })
  }

  return (
    <form onSubmit={StartNewTask} className='task-form'>
      <DefaultInput
        type='text'
        id='inputTask'
        labelText='Foco da sessao'
        placeholder='What drives you today?'
        ref={taskNameInput}
      />
      <DefaultButton type='submit' icon={<PlayIcon />} color='orange'>
        Start
      </DefaultButton>
    </form>
  );
}
