import type React from 'react';
import styles from './style.module.css';

type genericHtmlProps = {
  children: React.ReactNode;
};

export function GenericHtml({ children }: genericHtmlProps) {
  return (
    <>
      <div className={styles.Generic}>{children}</div>
    </>
  );
}
