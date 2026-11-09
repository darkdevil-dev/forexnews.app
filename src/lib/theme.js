export const THEME_KEY = "fx-theme";

export function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function getStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY);
    if (value === "dark" || value === "light") return value;
  } catch {
    /* storage unavailable */
  }
  return null;
}