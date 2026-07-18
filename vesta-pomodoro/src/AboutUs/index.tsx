import { GenericHtml } from '../GenericHtml';
import styles from './style.module.css';

type AboutUsProps = {
  children?: React.ReactNode;
};

export function AboutUs({ children }: AboutUsProps) {
  return (
    <>
      <GenericHtml>
        <div className={styles.h1}>{children}
        <h1>About us</h1>
        </div>
      </GenericHtml>
      
    </>
  );
}
