import { HistoryIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { applyTheme, initialTheme, type Theme } from '../../theme/theme';
import styles from './style.module.css';

type MenuProps = {
  onOpenHistory?: () => void;
  onOpenSettings?: () => void;
};

export function Menu({ onOpenHistory, onOpenSettings }: MenuProps) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  function handleThemeChange() {
    setTheme((currentTheme) =>
      currentTheme === 'dark' ? 'light' : 'dark',
    );
  }

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const iconByTheme = {
    dark: <SunIcon className={styles.menuLink} />,
    light: <MoonIcon className={styles.menuLink} />,
  };

  return (
    <nav className={styles.menu} aria-label='Actions'>
      {onOpenHistory && (
        <button
          className={`${styles.buttonMenu} ${styles.historyButton}`}
          type='button'
          onClick={onOpenHistory}
        >
          <HistoryIcon className={styles.menuLink} />
          <span className={styles.historyText}>History</span>
        </button>
      )}
      {onOpenSettings && (
        <button
          className={styles.buttonMenu}
          type='button'
          aria-label='Settings'
          onClick={onOpenSettings}
        >
          <SettingsIcon className={styles.menuLink} />
        </button>
      )}
      <button
        className={styles.buttonMenu}
        type='button'
        aria-label={`Use ${theme === 'dark' ? 'light' : 'dark'} theme`}
        onClick={handleThemeChange}
      >
        {iconByTheme[theme]}
      </button>
    </nav>
  );
}
