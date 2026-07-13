import type { ComponentProps } from 'react';
import styles from './style.module.css';

type ButtonProps = {
  icon: React.ReactNode;
} & ComponentProps<'button'>;

export function DefaultButton({ icon, ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {icon}
    </button>
  );
}
