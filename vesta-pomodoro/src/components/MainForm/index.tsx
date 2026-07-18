import { PlayIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';

export function MainForm() {
  return (
    <form className='task-form'>
      <DefaultInput
        type='text'
        id='inputTask'
        labelText='Foco da sessao'
        placeholder='What drives you today?'
      />
      <DefaultButton type='button' icon={<PlayIcon />} color='orange'>
        Start
      </DefaultButton>
    </form>
  );
}
