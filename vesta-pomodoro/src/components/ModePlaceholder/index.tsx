import { Clock3Icon, ConstructionIcon } from 'lucide-react';
import type { AppMode } from '../../Models/AppMode';
import styles from './style.module.css';

type ModePlaceholderProps = {
  mode: Exclude<AppMode, 'pomodoro'>;
  onBack: () => void;
};

const MODE_CONTENT = {
  stopwatch: {
    title: 'Stopwatch',
    description:
      'Open-ended time tracking is still being shaped for a future release.',
  },
  timer: {
    title: 'Timer',
    description:
      'A standalone countdown experience is still being shaped for a future release.',
  },
} as const;

export function ModePlaceholder({ mode, onBack }: ModePlaceholderProps) {
  const content = MODE_CONTENT[mode];

  return (
    <section className={styles.page} aria-labelledby='mode-title'>
      <div className={styles.icon} aria-hidden='true'>
        <Clock3Icon />
        <ConstructionIcon />
      </div>
      <span className={styles.eyebrow}>Vesta {content.title}</span>
      <h2 id='mode-title'>{content.title}</h2>
      <p className={styles.status}>Page in progress</p>
      <p className={styles.description}>{content.description}</p>
      <button type='button' onClick={onBack}>
        Back to Pomodoro
      </button>
    </section>
  );
}
