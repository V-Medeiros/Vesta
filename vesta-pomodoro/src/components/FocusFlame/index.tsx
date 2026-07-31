import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import { getFlameLevel } from '../../utils/flameLevel';
import styles from './style.module.css';

const STATUS_LABELS = {
  idle: 'em repouso',
  running: 'acesa durante o foco',
  paused: 'baixa durante a pausa',
  completed: 'brilhando após a conclusão',
  abandoned: 'apagando após o encerramento',
} as const;

export function FocusFlame() {
  const { ContextState } = useTaskContext();
  const flameLevel = getFlameLevel(ContextState.streak.current);
  const status = ContextState.sessionStatus;

  return (
    <figure
      className={`${styles.focusFlame} ${styles[status]} ${
        styles[`level${flameLevel.level}`]
      }`}
      aria-label={`${flameLevel.name}, nível ${flameLevel.level}, ${STATUS_LABELS[status]}`}
    >
      <span className={styles.aura} aria-hidden='true' />
      <svg
        className={styles.flameSvg}
        viewBox='0 0 180 220'
        role='img'
        aria-hidden='true'
      >
        <defs>
          <linearGradient id='vesta-outer-flame' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stopColor='var(--flame-edge)' />
            <stop offset='55%' stopColor='var(--primary)' />
            <stop offset='100%' stopColor='#9f2500' />
          </linearGradient>
          <linearGradient id='vesta-inner-flame' x1='0' y1='1' x2='0' y2='0'>
            <stop offset='0%' stopColor='#fff1a8' />
            <stop offset='52%' stopColor='#ffb347' />
            <stop offset='100%' stopColor='#f5a623' />
          </linearGradient>
        </defs>

        <g className={styles.particles}>
          <circle cx='54' cy='52' r='3' />
          <circle cx='126' cy='72' r='2.5' />
          <circle cx='99' cy='32' r='2' />
          <circle cx='76' cy='82' r='2' />
          <circle cx='139' cy='42' r='1.8' />
        </g>

        <g className={styles.flame}>
          <path
            className={styles.outerFlame}
            d='M91 207c-43 0-70-28-70-67 0-48 42-66 47-121 1-8 10-12 16-7 18 15 29 37 27 61 13-9 19-22 20-37 0-7 8-10 13-5 22 24 35 59 35 91 0 50-35 85-88 85Z'
          />
          <path
            className={styles.middleFlame}
            d='M93 202c-29 0-48-18-48-45 0-30 24-44 31-73 2-7 10-9 14-3 10 14 15 29 13 45 9-6 15-15 18-25 2-6 9-7 13-2 10 14 16 34 16 51 0 31-23 52-57 52Z'
          />
          <path
            className={styles.innerFlame}
            d='M95 198c-18 0-30-12-30-29 0-19 14-28 23-48 3-6 11-6 14 0 5 10 7 20 5 30 6-4 10-9 13-15 2-5 9-4 11 1 4 8 6 18 6 27 0 20-17 34-42 34Z'
          />
        </g>
      </svg>

      <figcaption className={styles.caption}>
        <strong>{flameLevel.name}</strong>
        <span>Nível {flameLevel.level}</span>
      </figcaption>
    </figure>
  );
}
