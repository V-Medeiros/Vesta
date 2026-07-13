import styles from './style.module.css';

/* type Cycleprops={
  type: 'focus'| 'shortBreak'| 'longBreak';
} */



export function Cycle() {
  return (
    <div className={styles.cycle}>
      <span className={styles.cycleText}>Cycles</span>

      <div className={styles.cycleDots}>
        <span className={`${styles.cycleDot} ${styles.focus}`} />
        <span className={`${styles.cycleDot} ${styles.shortBreak}`} />
        <span className={`${styles.cycleDot} ${styles.focus}`} />
        <span className={`${styles.cycleDot} ${styles.shortBreak}`} />
        <span className={`${styles.cycleDot} ${styles.focus}`} />
        <span className={`${styles.cycleDot} ${styles.shortBreak}`} />
        <span className={`${styles.cycleDot} ${styles.focus}`} />
        <span className={`${styles.cycleDot} ${styles.longBreak}`} />
      </div>
    </div>
  )
}

