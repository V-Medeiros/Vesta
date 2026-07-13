import styles from './style.module.css';

type InputProps = {
  id: string;
  labelText?: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({ type, id, labelText, ...rest }: InputProps) {
  return (
    <label className={styles.label} htmlFor={id}>
      {labelText && <span className={styles.labelText}>{labelText}</span>}
      <input className={styles.input} id={id} type={type} {...rest} />
    </label>
  );
}
