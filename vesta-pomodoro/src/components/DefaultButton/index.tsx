import type { ComponentProps, ReactNode } from 'react';
import styles from './style.module.css';

type ButtonProps = {
  children?: ReactNode;
  icon: ReactNode;
} & ComponentProps<'button'>;

export function DefaultButton({ children, icon, ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {icon}
      {children}
    </button>
  );
}
