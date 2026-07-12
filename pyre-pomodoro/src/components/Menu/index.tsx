import { HistoryIcon, HomeIcon, MoonIcon, SettingsIcon } from 'lucide-react';
import styles from './style.module.css';


export function Menu() {
  return(
    <nav className={styles.menu}>
      <a className={styles.buttonMenu} href='#'>
        <HomeIcon className={styles.menuLink}/>
      </a>
      <a className={styles.buttonMenu} href='#'>
        <SettingsIcon className={styles.menuLink}/>
      </a>
      <a className={styles.buttonMenu} href='#'>
        <HistoryIcon className={styles.menuLink}/>
      </a>
      <a className={styles.buttonMenu} href='#'>
        <MoonIcon className={styles.menuLink}/>
      </a>
    </nav>
  )
}
