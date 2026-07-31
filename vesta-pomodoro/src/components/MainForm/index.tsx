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
    selectTask,
    setDuration,
    startSession,
  } = useTaskContext();
  const isActive =
    ContextState.sessionStatus === 'running' ||
    ContextState.sessionStatus === 'paused';

  return (
    <div className={styles.controls}>
      <div className={styles.taskSelector}>
        <select
          id='session-task'
          aria-label='Session task'
          value={ContextState.selectedTaskId ?? ''}
          disabled={isActive}
          onChange={(event) => selectTask(event.target.value || null)}
        >
          <option value=''>Free focus — no task</option>
          {ContextState.tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <option key={task.id} value={task.id}>
                {task.text}
              </option>
            ))}
        </select>
      </div>

      <fieldset className={styles.durationFieldset} disabled={isActive}>
        <legend>Session duration</legend>
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
            <span>Custom</span>
            <input
              type='number'
              min='5'
              max='120'
              value={ContextState.durationMinutes}
              onChange={(event) => setDuration(Number(event.target.value))}
              aria-label='Custom duration in minutes'
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
            Start
          </DefaultButton>
        )}

        {ContextState.sessionStatus === 'running' && (
          <DefaultButton
            type='button'
            icon={<PauseIcon />}
            color='secondary'
            onClick={pauseSession}
          >
            Pause
          </DefaultButton>
        )}

        {ContextState.sessionStatus === 'paused' && (
          <DefaultButton
            type='button'
            icon={<PlayIcon />}
            color='secondary'
            onClick={resumeSession}
          >
            Resume
          </DefaultButton>
        )}

        {isActive && (
          <DefaultButton
            type='button'
            icon={<SquareIcon />}
            color='danger'
            onClick={abandonSession}
          >
            Stop
          </DefaultButton>
        )}
      </div>
    </div>
  );
}
