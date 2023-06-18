export function setTheme(preferredTheme: string) {
  if (preferredTheme === "light") {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
}