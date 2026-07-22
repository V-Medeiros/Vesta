import { useTaskContext } from '../../context/TaskContext';
import styles from './style.module.css';


export function CountDown() {
  const taskContext = useTaskContext();
  console.log(taskContext)
  
  return(
    <div className={styles.container}>25:00</div>
  )
}
