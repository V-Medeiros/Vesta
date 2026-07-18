import { HistoryIcon, MoonIcon, SettingsIcon } from 'lucide-react';
import styles from './style.module.css';
import { useState } from 'react';

type availableThemes = 'dark' | 'light';

export function Menu() {

  const  [theme, setTheme]= useState<availableThemes>('dark') 
  return (
    <nav className={styles.menu} aria-label='Ações'>
      <button
        className={`${styles.buttonMenu} ${styles.historyButton}`}
        type='button'
      >
        <HistoryIcon className={styles.menuLink} />
        <span className={styles.historyText}>Histórico</span>
      </button>
      <button
        className={styles.buttonMenu}
        type='button'
        aria-label='Configurações'
      >
        <SettingsIcon className={styles.menuLink}/>
      </button>
      <button
        className={styles.buttonMenu}
        type='button'
        aria-label='Alternar tema'
      >
        <MoonIcon className={styles.menuLink}/>
      </button>
    </nav>
  );
}
