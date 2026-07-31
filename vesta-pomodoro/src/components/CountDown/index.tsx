import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import styles from './style.module.css';


export function CountDown() {
  const { ContextState } = useTaskContext();

  return (
    <div
      className={styles.container}
      role='timer'
      aria-live='off'
      aria-label={`${ContextState.secondsRemaining} seconds remaining`}
    >
      {formatSecondsToMinutes(ContextState.secondsRemaining)}
    </div>
  );
}
