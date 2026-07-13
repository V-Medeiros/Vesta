import styles from './style.module.css';

type InputProps = {
  id: string;
  labelText?: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({ type, id, labelText = 'Tarefa', placeholder = 'Qual é o foco desta sessão?', ...rest }: InputProps) {
  return (
    <label className={styles.label} htmlFor={id}>
      <span>{labelText}</span>
      <input
        className={styles.input}
        id={id}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
    </label>
  );
}
