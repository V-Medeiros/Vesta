import type { ReactNode } from 'react';
import styles from './Container.module.css';

type ContainerProps = {
  children: ReactNode;
  contentClassName: string;
};

export function Container({children, contentClassName}: ContainerProps) {
  return(
      <section>
        <div className={styles.contentClassName}>
          <div className={styles.Container}>{children}</div>
        </div>
      </section>
  )
}
