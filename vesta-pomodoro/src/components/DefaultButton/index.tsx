import type { ComponentProps, ReactNode } from 'react';
import styles from './style.module.css';

type ButtonProps = {
  children?: ReactNode;
  icon: ReactNode;
  color?: 'orange' | 'red';
} & ComponentProps<'button'>;

export function DefaultButton({ children, icon, color='orange', ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[color]}` } {...props}>
      {icon}
      {children}
    </button>
  );
}
