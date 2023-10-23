"use client";

import { useEffect, useState } from "react";
import { getTheme, setTheme, persistTheme } from "../_lib/theme";
import { getColorScheme, getRandomColorScheme, persistColorScheme, setColorScheme } from "../_lib/color-scheme";
import { Switch } from '@headlessui/react';
import Image from "next/image";

import lightMode from '../_assets/light-mode.png';
import darkMode from '../_assets/dark-mode.png';

function onThemeChange() {
  const currentTheme = getTheme();
  const preferredTheme = currentTheme === "light" ? "dark" : "light";
  persistTheme(preferredTheme);
  setTheme(preferredTheme);
}

export const ThemeToggle = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme = prefersDark.matches ? "dark" : "light";
    const currentTheme = getTheme();

    prefersDark.addEventListener('change', onThemeChange);
    const theme = currentTheme || systemTheme;
    persistTheme(theme);
    setTheme(theme);
    setDarkMode(theme === 'dark');

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

  const onChange = (checked: boolean) => { 
    setDarkMode(checked); 
    onThemeChange(); 
  };

  return (
    <div className="hidden md:flex md:flex-col md:gap-4 md:fixed md:bottom-8 md:left-8">
      <Switch checked={isDarkMode} onChange={onChange} className="bg-slate-900 dark:bg-slate-200 bg-opacity-10 dark:bg-opacity-10 inline-flex h-7 w-12 items-center rounded-full transition-colors">
        <Image 
          src={isDarkMode ? lightMode : darkMode} 
          alt={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          height={20}
          width={20}
          className={`${isDarkMode ? 'translate-x-6' : 'translate-x-1'} inline-block transform rounded-full bg-current transition`}
        />
      </Switch>
    </div>
  )
}