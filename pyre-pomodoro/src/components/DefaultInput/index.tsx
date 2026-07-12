import styles from './style.module.css';

type InputProps = {
  type: 'text' | 'number' | 'search';
};

export function Input({ type }: InputProps) {
  <>
  <label className='taskLabel' htmlFor='inputTask'>task
  <input id='intputTask' placeholder='What drivers you today?'></input>
  </label>
  </>

}