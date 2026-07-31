import { CheckIcon, CircleIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useTaskContext } from '../../context/TaskContext/UseTaskContext';
import styles from './style.module.css';

export function TaskPanel() {
  const {
    ContextState,
    addTask,
    deleteTask,
    selectTask,
    toggleTask,
  } = useTaskContext();
  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');
  const activeTaskId = ContextState.activeSession?.taskId ?? null;
  const openTaskCount = ContextState.tasks.filter(
    (task) => !task.completed,
  ).length;
  const sortedTasks = [...ContextState.tasks].sort(
    (firstTask, secondTask) =>
      Number(firstTask.completed) - Number(secondTask.completed),
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedText = taskText.trim();

    if (!normalizedText) {
      setError('Enter a task before adding it.');
      return;
    }

    addTask(normalizedText);
    setTaskText('');
    setError('');
  }

  return (
    <aside className={styles.panel} aria-labelledby='tasks-title'>
      <div className={styles.heading}>
        <div>
          <span className={styles.eyebrow}>Next sparks</span>
          <h2 id='tasks-title'>Tasks</h2>
        </div>
        <span className={styles.count}>{openTaskCount} open</span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span className={styles.visuallyHidden}>New task</span>
          <input
            type='text'
            value={taskText}
            maxLength={120}
            placeholder='What drives you today?'
            aria-describedby={error ? 'task-error' : undefined}
            onChange={(event) => {
              setTaskText(event.target.value);
              if (error) setError('');
            }}
          />
        </label>
        <button type='submit' aria-label='Add task'>
          <PlusIcon />
        </button>
      </form>

      {error && (
        <p className={styles.error} id='task-error' role='alert'>
          {error}
        </p>
      )}

      {sortedTasks.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptySpark} aria-hidden='true' />
          <p>Add a task, then select it for your next focus session.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {sortedTasks.map((task) => {
            const isSessionTask = activeTaskId === task.id;
            const isSelected = ContextState.selectedTaskId === task.id;

            return (
              <li
                key={task.id}
                className={`${styles.task} ${
                  task.completed ? styles.completed : ''
                } ${isSelected ? styles.selected : ''}`}
              >
                <button
                  className={styles.toggle}
                  type='button'
                  onClick={() => toggleTask(task.id)}
                  disabled={isSessionTask}
                  aria-label={
                    task.completed
                      ? `Reopen ${task.text}`
                      : `Complete ${task.text}`
                  }
                >
                  {task.completed ? <CheckIcon /> : <CircleIcon />}
                </button>

                <button
                  className={styles.taskContent}
                  type='button'
                  disabled={task.completed || isSessionTask}
                  onClick={() => selectTask(isSelected ? null : task.id)}
                  aria-pressed={isSelected}
                >
                  <span>{task.text}</span>
                  <small>
                    {task.sessionsCount}{' '}
                    {task.sessionsCount === 1 ? 'session' : 'sessions'}
                    {isSessionTask ? ' · focusing' : ''}
                  </small>
                </button>

                <button
                  className={styles.delete}
                  type='button'
                  disabled={isSessionTask}
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.text}`}
                >
                  <Trash2Icon />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
