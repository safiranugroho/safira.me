/** @type {import('tailwindcss').Config} */
const typography = ({ theme }) => {
  const colorSchemes = [['moss','sapphire'], ['lemon','aubergine'], ['peach','army']]
  return colorSchemes.reduce((acc, [light, dark]) => ({
    ...acc,
    [`${light}-${dark}`]: {
      css: {
        // Light mode
        '--tw-prose-body': theme(`colors.${dark}[500]`),
        '--tw-prose-headings': theme(`colors.${dark}[500]`),
        '--tw-prose-lead': theme(`colors.${dark}[600]`),
        '--tw-prose-links': theme(`colors.${dark}[500]`),
        '--tw-prose-bold': theme(`colors.${dark}[500]`),
        '--tw-prose-counters': theme(`colors.${dark}[500]`),
        '--tw-prose-bullets': theme(`colors.${dark}[500]`),
        '--tw-prose-hr': theme(`colors.${light}[400]`),
        '--tw-prose-quotes': theme(`colors.${dark}[500]`),
        '--tw-prose-quote-borders': theme(`colors.${dark}[600]`),
        '--tw-prose-captions': theme(`colors.${dark}[700]`),
        '--tw-prose-code': theme(`colors.${dark}[500]`),
        '--tw-prose-pre-code': theme(`colors.${dark}[700]`),
        '--tw-prose-pre-bg': theme(`colors.${light}[400]`),
        '--tw-prose-th-borders': theme(`colors.${light}[600]`),
        '--tw-prose-td-borders': theme(`colors.${light}[600]`),
        // Dark mode
        '--tw-prose-invert-body': theme(`colors.${light}[500]`),
        '--tw-prose-invert-headings': theme(`colors.${light}[500]`),
        '--tw-prose-invert-lead': theme(`colors.${light}[400]`),
        '--tw-prose-invert-links': theme(`colors.${light}[500]`),
        '--tw-prose-invert-bold': theme(`colors.${light}[500]`),
        '--tw-prose-invert-counters': theme(`colors.${light}[500]`),
        '--tw-prose-invert-bullets': theme(`colors.${light}[500]`),
        '--tw-prose-invert-hr': theme(`colors.${dark}[400]`),
        '--tw-prose-invert-quotes':  theme(`colors.${light}[500]`),
        '--tw-prose-invert-quote-borders': theme(`colors.${dark}[600]`),
        '--tw-prose-invert-captions': theme(`colors.${light}[500]`),
        '--tw-prose-invert-code': theme(`colors.${light}[500]`),
        '--tw-prose-invert-pre-code': theme(`colors.${light}[400]`),
        '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
        '--tw-prose-invert-th-borders': theme(`colors.${light}[400]`),
        '--tw-prose-invert-td-borders': theme(`colors.${light}[400]`),
      },
    }
  }), {})
}

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        moss: {
          100: "#f1f5f2",
          200: "#e3ebe5",
          300: "#d5e2d9",
          400: "#c7d8cc",
          500: "#b9cebf",
          600: "#94a599",
          700: "#6f7c73",
          800: "#4a524c",
          900: "#252926"
        },
        sapphire: {
          100: "#d3d8f1",
          200: "#a7b2e3",
          300: "#7b8bd5",
          400: "#4f65c7",
          500: "#233eb9",
          600: "#1c3294",
          700: "#15256f",
          800: "#0e194a",
          900: "#070c25"
        },
        lemon: {
          100: "#fefcee",
          200: "#fcfadd",
          300: "#fbf7cc",
          400: "#f9f5bb",
          500: "#f8f2aa",
          600: "#c6c288",
          700: "#959166",
          800: "#636144",
          900: "#323022"
        },
        aubergine: {
          100: "#d8cce1",
          200: "#b199c3",
          300: "#8a66a4",
          400: "#633386",
          500: "#3c0068",
          600: "#300053",
          700: "#24003e",
          800: "#18002a",
          900: "#0c0015"
        },
        peach: {
          100: '#fff8f7',
          200: "#f7ebea",
          300: "#eed7d5",
          400: "#e6c3c0",
          500: "#ddafab",
          600: "#d59b96",
          700: "#aa7c78",
          800: "#805d5a",
          900: "#553e3c",
        },
        army: {
          100: "#cfd3cf",
          200: "#9fa79f",
          300: "#707b6e",
          400: "#404f3e",
          500: "#10230e",
          600: "#0d1c0b",
          700: "#0a1508",
          800: "#060e06",
          900: "#030703"
        },
      },
      typography
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
