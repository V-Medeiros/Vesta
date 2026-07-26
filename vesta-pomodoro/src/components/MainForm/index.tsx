import { PlayIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useState } from 'react';

export function MainForm() {

  const [taskName, setTaskName] = useState('');

  function StartNewTask(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
  }


  return (
    <form onSubmit={StartNewTask} className='task-form'>
      <DefaultInput
        type='text'
        id='inputTask'
        labelText='Foco da sessao'
        placeholder='What drives you today?'
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
      />
      <DefaultButton type='submit' icon={<PlayIcon />} color='orange'>
        Start
      </DefaultButton>
    </form>
  );
}
