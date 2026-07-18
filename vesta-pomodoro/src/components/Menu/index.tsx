import { HistoryIcon, MoonIcon, SettingsIcon } from 'lucide-react';
import styles from './style.module.css';
import { useEffect, useState } from 'react';

export function Menu() {
  type availableType = 'dark' | 'light';
  const [theme, setTheme] = useState<availableType>('dark');

  function handleTimeChange(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
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
          <SettingsIcon className={styles.menuLink} />
        </button>
        <button
          className={styles.buttonMenu}
          type='button'
          aria-label='Alternar tema'
          onClick={handleTimeChange}
        >
          <MoonIcon className={styles.menuLink} />
        </button>
      </nav>
    </>
  );
}
