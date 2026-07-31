import { CheckCircle2Icon, Clock3Icon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import {
  formatDateLabel,
  getRecentDateKeys,
  toLocalDateKey,
} from '../../utils/date';
import styles from './style.module.css';

type HistoryPanelProps = {
  onClose: () => void;
};

function formatSessionTime(timestamp: string) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

export function HistoryPanel({ onClose }: HistoryPanelProps) {
  const { ContextState } = useTaskContext();
  const recentDates = getRecentDateKeys(14);
  const [selectedDate, setSelectedDate] = useState(toLocalDateKey());
  const sessionsOnSelectedDate = ContextState.sessions.filter(
    (session) => session.date === selectedDate,
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
        aria-labelledby='history-title'
      >
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Your campfire</span>
            <h2 id='history-title'>Last 14 days</h2>
            <p>Every ember holds the time you dedicated.</p>
          </div>
          <button
            className={styles.close}
            type='button'
            onClick={onClose}
            aria-label='Close history'
            autoFocus
          >
            <XIcon />
          </button>
        </header>

        <div className={styles.streakSummary}>
          <div>
            <strong>{ContextState.streak.current}</strong>
            <span>current streak</span>
          </div>
          <div>
            <strong>{ContextState.streak.longestEver}</strong>
            <span>best streak</span>
          </div>
          <div>
            <strong>
              {
                ContextState.sessions.filter(
                  (session) => session.status === 'completed',
                ).length
              }
            </strong>
            <span>focus sessions completed</span>
          </div>
        </div>

        <div className={styles.campfire} role='list' aria-label='14-day campfire'>
          {recentDates.map((date) => {
            const sessions = ContextState.sessions.filter(
              (session) => session.date === date,
            );
            const completedSessions = sessions.filter(
              (session) => session.status === 'completed',
            );
            const state =
              completedSessions.length > 0
                ? 'lit'
                : sessions.length > 0
                  ? 'ash'
                  : 'empty';
            const isSelected = selectedDate === date;

            return (
              <button
                key={date}
                className={`${styles.day} ${styles[state]} ${
                  isSelected ? styles.selected : ''
                }`}
                type='button'
                role='listitem'
                onClick={() => setSelectedDate(date)}
                aria-pressed={isSelected}
                aria-label={`${formatDateLabel(date)}: ${
                  completedSessions.length
                } completed sessions and ${
                  sessions.length - completedSessions.length
                } abandoned sessions`}
              >
                <span className={styles.ember} aria-hidden='true'>
                  <span />
                </span>
                <span className={styles.dayLabel}>
                  {formatDateLabel(date)}
                </span>
              </button>
            );
          })}
        </div>

        <section
          className={styles.dayDetails}
          aria-labelledby='selected-day-title'
        >
          <div className={styles.detailsHeading}>
            <h3 id='selected-day-title'>{formatDateLabel(selectedDate)}</h3>
            <span>
              {sessionsOnSelectedDate.length}{' '}
              {sessionsOnSelectedDate.length === 1 ? 'session' : 'sessions'}
            </span>
          </div>

          {sessionsOnSelectedDate.length === 0 ? (
            <p className={styles.noSessions}>
              No sessions recorded on this day.
            </p>
          ) : (
            <ul className={styles.sessionList}>
              {sessionsOnSelectedDate.map((session) => {
                const task = ContextState.tasks.find(
                  (item) => item.id === session.taskId,
                );
                const isCompleted = session.status === 'completed';

                return (
                  <li key={session.id}>
                    <span
                      className={
                        isCompleted ? styles.successIcon : styles.abandonedIcon
                      }
                    >
                      {isCompleted ? (
                        <CheckCircle2Icon />
                      ) : (
                        <XIcon />
                      )}
                    </span>
                    <span className={styles.sessionDescription}>
                      <strong>
                        {task?.text ??
                          (session.taskId ? 'Deleted task' : 'Free focus')}
                      </strong>
                      <small>
                        {isCompleted ? 'Completed' : 'Abandoned'} ·{' '}
                        {formatSessionTime(session.startedAt)}
                      </small>
                    </span>
                    <span className={styles.duration}>
                      <Clock3Icon />
                      {session.durationMinutes} min
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </section>
    </div>
  );
}
