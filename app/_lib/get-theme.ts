export function getTheme() {
  try {
    return localStorage.getItem("color-theme");
  } catch (e) {
    return null;
  }
}