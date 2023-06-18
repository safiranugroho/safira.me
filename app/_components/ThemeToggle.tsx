"use client";

import { useEffect } from "react";
import { onThemeChange } from "../_lib/on-theme-change";
import { persistTheme } from "../_lib/persist-theme";
import { getTheme } from "../_lib/get-theme";
import { setTheme } from "../_lib/setTheme";

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

  return (
    <button title="Color theme toggle" onClick={onThemeChange} className="hidden md:block md:fixed md:bottom-8 md:left-8">
      Toggle theme
    </button>
  )
}