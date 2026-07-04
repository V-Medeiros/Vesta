import type { ReactNode } from 'react';
import styles from './Container.module.css';

type ContainerProps = {
  children: ReactNode;
  contentClassName?: string;
};

export function Container({ children, contentClassName }: ContainerProps) {
  const contentClass = contentClassName
    ? `${styles.content} ${contentClassName}`
    : styles.content;

  return (
    <div className={styles.container}>
      <div className={contentClass}>{children}</div>
    </div>
  );
}
