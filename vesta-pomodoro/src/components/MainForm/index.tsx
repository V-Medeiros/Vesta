import { PlayIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useTaskContext } from '../../context/TaskContext/UseTaskContext';

export function MainForm() {
  const {SetState} = useTaskContext();
  function handleClick(){
    SetState(prevState => {
      return {
        ...prevState,
        formattedSecondsRemaining: '21:00'
      }
    })
  }
  return (
    <form className='task-form'>
      <button onClick={handleClick} type='button'> 
        clique lindao
      </button>
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
