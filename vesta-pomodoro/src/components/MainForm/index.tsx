import { PlayIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';

export function MainForm() {

  const taskNameInput = useRef<HTMLInputElement>(null)

  function StartNewTask(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if(taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim()


    if (!taskName){
      return
    }
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
