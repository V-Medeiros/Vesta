import styles from './style.module.css';

type InputProps = {
  type: 'text' | 'number' | 'search';
};

export function Input({ type }: InputProps) {
  return (
    <label className={styles.input} htmlFor="inputTask">
      task
      <input id="inputTask" type={type} placeholder="What drives you today?" />
    </label>
  );
}
