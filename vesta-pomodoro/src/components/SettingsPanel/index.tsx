import { BellRingIcon, SaveIcon, XIcon } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import styles from './style.module.css';

type SettingsPanelProps = {
  onClose: () => void;
};

const DURATION_PRESETS = [15, 25, 45, 60];

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { ContextState, updateSettings } = useTaskContext();
  const [defaultDuration, setDefaultDuration] = useState(
    ContextState.settings.defaultDuration,
  );
  const [soundEnabled, setSoundEnabled] = useState(
    ContextState.settings.soundEnabled,
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateSettings({
      defaultDuration,
      soundEnabled,
    });
    onClose();
  }

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={styles.dialog}
        role='dialog'
        aria-modal='true'
        aria-labelledby='settings-title'
      >
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Your ritual</span>
            <h2 id='settings-title'>Settings</h2>
            <p>Simple preferences saved only in this browser.</p>
          </div>
          <button
            className={styles.close}
            type='button'
            onClick={onClose}
            aria-label='Close settings'
            autoFocus
          >
            <XIcon />
          </button>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset>
            <legend>Default duration</legend>
            <p>Choose how every new session should begin.</p>
            <div className={styles.durationOptions}>
              {DURATION_PRESETS.map((minutes) => (
                <button
                  key={minutes}
                  className={
                    defaultDuration === minutes ? styles.selectedDuration : ''
                  }
                  type='button'
                  onClick={() => setDefaultDuration(minutes)}
                  aria-pressed={defaultDuration === minutes}
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
                  value={defaultDuration}
                  onChange={(event) =>
                    setDefaultDuration(
                      Math.min(
                        120,
                        Math.max(5, Number(event.target.value) || 5),
                      ),
                    )
                  }
                />
                <small>min</small>
              </label>
            </div>
          </fieldset>

          <label className={styles.soundSetting}>
            <span className={styles.soundIcon}>
              <BellRingIcon />
            </span>
            <span>
              <strong>Completion sound</strong>
              <small>Plays when your focus time ends.</small>
            </span>
            <input
              type='checkbox'
              checked={soundEnabled}
              onChange={(event) => setSoundEnabled(event.target.checked)}
            />
          </label>

          <button className={styles.save} type='submit'>
            <SaveIcon />
            Save settings
          </button>
        </form>
      </section>
    </div>
  );
}
