import { HistoryIcon, MoonIcon, SettingsIcon } from 'lucide-react';
import styles from './style.module.css';

export function Menu() {
  return (
    <nav className={styles.menu} aria-label='Ações'>
      <button className={`${styles.buttonMenu} ${styles.historyButton}`} type='button'>
        <HistoryIcon className={styles.menuLink} aria-hidden='true' />
        <span className={styles.historyText}>Histórico</span>
      </button>
      <button className={styles.buttonMenu} type='button' aria-label='Configurações'>
        <SettingsIcon className={styles.menuLink} aria-hidden='true' />
      </button>
      <button className={styles.buttonMenu} type='button' aria-label='Alternar tema'>
        <MoonIcon className={styles.menuLink} aria-hidden='true' />
      </button>
    </nav>
  );
}
