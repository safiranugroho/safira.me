"use client";

import { useEffect } from "react";
import { getTheme, setTheme, persistTheme } from "../_lib/theme";
import { getColorScheme, getRandomColorScheme, persistColorScheme, setColorScheme } from "../_lib/color-scheme";

function onThemeChange() {
  const currentTheme = getTheme();
  const preferredTheme = currentTheme === "light" ? "dark" : "light";
  persistTheme(preferredTheme);
  setTheme(preferredTheme);
}

export const ThemeToggle = () => {
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme = prefersDark.matches ? "dark" : "light";
    const currentTheme = getTheme();

    prefersDark.addEventListener('change', onThemeChange);
    persistTheme(currentTheme || systemTheme);
    setTheme(currentTheme || systemTheme);

    return () => {
      prefersDark.removeEventListener('change', onThemeChange);
    }
  }, []);

  useEffect(() => {
    const currentColorScheme = getColorScheme();
    if (currentColorScheme) {
      setColorScheme(currentColorScheme);
    } else {
      const colorScheme = getRandomColorScheme();
      persistColorScheme(colorScheme);
      setColorScheme(colorScheme);
    }
  }, []);

  return (
    <button title="Color theme toggle" onClick={onThemeChange} className="hidden md:block md:fixed md:bottom-8 md:left-8">
      Toggle theme
    </button>
  )
}