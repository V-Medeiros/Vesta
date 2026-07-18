export type Theme = 'dark' | 'light';

function getStoredTheme(): Theme {
  return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
}

export const initialTheme = getStoredTheme();

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
}

document.documentElement.dataset.theme = initialTheme;

requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.documentElement.dataset.themeReady = 'true';
  });
});
