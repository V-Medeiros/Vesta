import { PauseIcon, PlayIcon, SquareIcon } from 'lucide-react';
import styles from './style.module.css';


export function Controller() {
  return(
    <nav className={styles.controller}>
      <a className={styles.buttonController} href='#'>
        <PlayIcon className={styles.controllerLink}/>
      </a>
      <a className={styles.buttonController} href='#'>
        <PauseIcon className={styles.controllerLink}/>
      </a>
      <a className={styles.buttonController} href='#'>
        <SquareIcon className={styles.controllerLink}/>
      </a>
    </nav>
  )
}
