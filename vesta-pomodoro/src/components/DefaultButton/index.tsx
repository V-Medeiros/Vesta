import type { ComponentProps, ReactNode } from 'react';
import styles from './style.module.css';

type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
} & ComponentProps<'button'>;

export function DefaultButton({ children, icon, type = 'button', ...props }: ButtonProps) {
  return (
    <button className={styles.button} type={type} {...props}>
      {icon && <span className={styles.icon} aria-hidden='true'>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
