import { useTaskContext } from '../../context/TaskContext';
import styles from './style.module.css';


export function CountDown() {
  const {ContextState} = useTaskContext();
  
  return(
    <div className={styles.container}>{ContextState.formattedSecondsRemaining}</div>
  )
}
