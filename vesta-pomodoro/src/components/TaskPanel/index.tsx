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
  const sortedTasks = [...ContextState.tasks].sort(
    (firstTask, secondTask) =>
      Number(firstTask.completed) - Number(secondTask.completed),
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedText = taskText.trim();

    if (!normalizedText) {
      setError('Digite uma tarefa antes de adicionar.');
      return;
    }

    addTask(normalizedText);
    setTaskText('');
    setError('');
  }

  function handleDelete(taskId: string, taskTextToDelete: string) {
    const confirmed = window.confirm(
      `Excluir a tarefa “${taskTextToDelete}”? O histórico das sessões será preservado.`,
    );

    if (confirmed) deleteTask(taskId);
  }

  return (
    <aside className={styles.panel} aria-labelledby='tasks-title'>
      <div className={styles.heading}>
        <div>
          <span className={styles.eyebrow}>Próximas faíscas</span>
          <h2 id='tasks-title'>Tarefas</h2>
        </div>
        <span className={styles.count}>
          {ContextState.tasks.filter((task) => !task.completed).length} abertas
        </span>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <span className={styles.visuallyHidden}>Nova tarefa</span>
          <input
            type='text'
            value={taskText}
            maxLength={120}
            placeholder='What drives you today?'
            onChange={(event) => {
              setTaskText(event.target.value);
              if (error) setError('');
            }}
            aria-describedby={error ? 'task-error' : undefined}
          />
        </label>
        <button type='submit' aria-label='Adicionar tarefa'>
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
          <p>Crie uma tarefa ou inicie um foco livre.</p>
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
                      ? `Reabrir ${task.text}`
                      : `Concluir ${task.text}`
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
                    {task.sessionsCount === 1 ? 'sessão' : 'sessões'}
                    {isSessionTask ? ' · em foco' : ''}
                  </small>
                </button>

                <button
                  className={styles.delete}
                  type='button'
                  disabled={isSessionTask}
                  onClick={() => handleDelete(task.id, task.text)}
                  aria-label={`Excluir ${task.text}`}
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
