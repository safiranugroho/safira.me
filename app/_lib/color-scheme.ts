export function getColorScheme() {
  try {
    return sessionStorage.getItem("color-scheme");
  } catch (e) {
    return null;
  }
}

export function persistColorScheme(colorScheme: string) {
  try {
    sessionStorage.setItem("color-scheme", colorScheme);
  } catch (e) {}
}

function getPreviousIndex() {
  try {
    return localStorage.getItem("prev-color-scheme");
  } catch (e) {
    return null;
  }
}

function persistPreviousIndex(index: string) {
  try {
    localStorage.setItem("prev-color-scheme", index);
  } catch (e) {}
}

type ColorScheme = {
  theme: string;
  bgLight: string;
  bgDark: string;
}

const colorSchemes: Record<string, ColorScheme> = {
  'moss-sapphire': {
    theme: 'prose-moss-sapphire',
    bgLight: 'bg-moss-500',
    bgDark: 'dark:bg-sapphire-500'
  }, 
  'lemon-aubergine': {
    theme: 'prose-lemon-aubergine',
    bgLight: 'bg-lemon-500',
    bgDark: 'dark:bg-aubergine-500'
  }, 
  'peach-army': {
    theme: 'prose-peach-army',
    bgLight: 'bg-peach-500',
    bgDark: 'dark:bg-army-500'
  }
};

export function getRandomColorScheme() {
  const prevIndex = getPreviousIndex();

  let randomIndex = Number(prevIndex);
  while (randomIndex == Number(prevIndex)) {
    randomIndex = Math.floor(Math.random() * Object.keys(colorSchemes).length);
  }

  persistPreviousIndex(String(randomIndex));
  return Object.keys(colorSchemes)[randomIndex];
}

export function setColorScheme(colorScheme: string) {
  const { theme, bgLight, bgDark } = colorSchemes[colorScheme];
  document.body.classList.add(theme);
  document.body.classList.add(bgLight);
  document.body.classList.add(bgDark);
}