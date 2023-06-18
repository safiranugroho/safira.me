export function getTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (e) {
    return null;
  }
}

export function persistTheme(theme: string) {
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {}
}

export function setTheme(preferredTheme: string) {
  if (preferredTheme === "light") {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
}