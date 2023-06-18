import { getTheme } from "./get-theme";
import { persistTheme } from "./persist-theme";
import { setTheme } from "./setTheme";

export function onThemeChange() {
  const currentTheme = getTheme();
  const preferredTheme = currentTheme === "light" ? "dark" : "light";
  persistTheme(preferredTheme);
  setTheme(preferredTheme);
}
