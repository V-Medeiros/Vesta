import styles from './style.module.css';

export function CountDown() {
  return (
    <time className={styles.container} dateTime='PT25M' aria-label='25 minutos restantes'>
      25:00
    </time>
  );
}
