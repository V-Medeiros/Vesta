export type Theme = 'dark' | 'light';

function getStoredTheme(): Theme {
  try {
    return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export const initialTheme = getStoredTheme();

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // O tema ainda é aplicado quando a persistência está indisponível.
  }
}

document.documentElement.dataset.theme = initialTheme;

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.documentElement.dataset.themeReady = 'true';
  });
});
