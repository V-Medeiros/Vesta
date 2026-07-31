import {
  PauseIcon,
  PlayIcon,
  RotateCcwIcon,
  SquareIcon,
} from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import { DefaultButton } from '../DefaultButton';
import styles from './style.module.css';

const DURATION_PRESETS = [15, 25, 45, 60];

export function MainForm() {
  const {
    ContextState,
    abandonSession,
    pauseSession,
    resumeSession,
    setDuration,
    startSession,
  } = useTaskContext();
  const isActive =
    ContextState.sessionStatus === 'running' ||
    ContextState.sessionStatus === 'paused';

  function handleAbandon() {
    const confirmed = window.confirm(
      'Deseja abandonar esta sessão? O tempo não contará para o streak.',
    );

    if (confirmed) abandonSession();
  }

  return (
    <div className={styles.controls}>
      <fieldset className={styles.durationFieldset} disabled={isActive}>
        <legend>Duração da sessão</legend>
        <div className={styles.presets}>
          {DURATION_PRESETS.map((minutes) => (
            <button
              key={minutes}
              className={`${styles.preset} ${
                ContextState.durationMinutes === minutes ? styles.selected : ''
              }`}
              type='button'
              onClick={() => setDuration(minutes)}
              aria-pressed={ContextState.durationMinutes === minutes}
            >
              {minutes} min
            </button>
          ))}
          <label className={styles.customDuration}>
            <span>Personalizado</span>
            <input
              type='number'
              min='5'
              max='120'
              value={ContextState.durationMinutes}
              onChange={(event) => setDuration(Number(event.target.value))}
              aria-label='Duração personalizada em minutos'
            />
            <span>min</span>
          </label>
        </div>
      </fieldset>

      <div className={styles.actions}>
        {!isActive && (
          <DefaultButton
            type='button'
            icon={
              ContextState.sessionStatus === 'completed' ? (
                <RotateCcwIcon />
              ) : (
                <PlayIcon />
              )
            }
            onClick={startSession}
          >
            {ContextState.sessionStatus === 'completed'
              ? 'Nova sessão'
              : 'Iniciar foco'}
          </DefaultButton>
        )}

        {ContextState.sessionStatus === 'running' && (
          <DefaultButton
            type='button'
            icon={<PauseIcon />}
            color='secondary'
            onClick={pauseSession}
          >
            Pausar
          </DefaultButton>
        )}

        {ContextState.sessionStatus === 'paused' && (
          <DefaultButton
            type='button'
            icon={<PlayIcon />}
            color='secondary'
            onClick={resumeSession}
          >
            Continuar
          </DefaultButton>
        )}

        {isActive && (
          <DefaultButton
            type='button'
            icon={<SquareIcon />}
            color='danger'
            onClick={handleAbandon}
          >
            Abandonar
          </DefaultButton>
        )}
      </div>
    </div>
  );
}
