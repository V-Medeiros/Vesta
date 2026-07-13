import { HistoryIcon, MoonIcon, SettingsIcon } from 'lucide-react';
import styles from './style.module.css';

export function Menu() {
  return (
    <nav className={styles.menu} aria-label='Navegação principal'>
      <button className={`${styles.buttonMenu} ${styles.historyButton}`} type='button'>
        <HistoryIcon aria-hidden='true' />
        <span>Histórico</span>
      </button>

      <button className={styles.buttonMenu} type='button' aria-label='Configurações' title='Configurações'>
        <SettingsIcon aria-hidden='true' />
      </button>

      <button className={styles.buttonMenu} type='button' aria-label='Alternar tema' title='Alternar tema'>
        <MoonIcon aria-hidden='true' />
      </button>
    </nav>
  );
}
