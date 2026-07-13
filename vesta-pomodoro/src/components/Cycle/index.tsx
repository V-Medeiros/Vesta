import styles from './style.module.css';

/* type Cycleprops={
  type: 'focus'| 'shortBreak'| 'longBreak';
} */



export function Cycle() {
  return (
    <div className={styles.cycle} aria-label='Ciclo 1 de 4'>
      <div className={styles.cycleDots} aria-hidden='true'>
        <span className={`${styles.cycleDot} ${styles.current}`} />
        <span className={styles.cycleDot} />
        <span className={styles.cycleDot} />
        <span className={styles.cycleDot} />
      </div>

      <span className={styles.cycleText}>Ciclo 1 de 4</span>
    </div>
  )
}
