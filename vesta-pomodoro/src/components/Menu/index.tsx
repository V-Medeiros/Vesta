import { HistoryIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './style.module.css';
import { useEffect, useState } from 'react';
import { applyTheme, initialTheme, type Theme } from '../../theme/theme';

export function Menu() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  function handleThemeChange(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const iconByTheme = {
    dark: <SunIcon className={styles.menuLink} />,
    light: <MoonIcon className={styles.menuLink} />,
  }; 

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
          onClick={handleThemeChange}
        >
          {iconByTheme[theme]}
        </button>
      </nav>  
    </>
  );
}
