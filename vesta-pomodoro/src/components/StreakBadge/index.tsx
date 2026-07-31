import { FlameIcon, TrophyIcon } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import { getFlameLevel } from '../../utils/flameLevel';
import styles from './style.module.css';

export function StreakBadge() {
  const { ContextState } = useTaskContext();
  const level = getFlameLevel(ContextState.streak.current);

  return (
    <div
      className={styles.badge}
      aria-label={`Streak atual: ${ContextState.streak.current} dias. Recorde: ${ContextState.streak.longestEver} dias.`}
    >
      <span className={styles.current}>
        <FlameIcon />
        <strong>{ContextState.streak.current}</strong>
        <span>dias</span>
      </span>
      <span className={styles.divider} aria-hidden='true' />
      <span className={styles.level}>{level.name}</span>
      <span className={styles.record} title='Recorde pessoal'>
        <TrophyIcon />
        {ContextState.streak.longestEver}
      </span>
    </div>
  );
}
