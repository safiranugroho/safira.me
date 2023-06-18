export function persistTheme(theme: string) {
  try {
    localStorage.setItem("color-theme", theme);
  } catch (e) {}
}
