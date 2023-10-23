const typography = ({ theme }) => {
  const colorSchemes = ['moss-sapphire', 'lemon-aubergine', 'peach-army', 'celery-sky', 'lavender-ruby']
  return colorSchemes.reduce((acc, colorScheme) => {
    const [light, dark] = colorScheme.split('-')
    return ({
      ...acc,
      [colorScheme]: {
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
    })
  }, {})
}

/** @type {import('tailwindcss').Config} */
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
        celery: {
          100: "#FDFFF9",
          200: "#FBFFF0",
          300: "#F8FEE7",
          400: "#F2FED5",
          500: "#EDFDC3",
          600: "#D5E4B0",
          700: "#8E9875",
          800: "#6B7258",
          900: "#474C3B",
        },
        sky: {
          100: "#EAF2F5",
          200: "#CBDEE5",
          300: "#ACC9D6",
          400: "#6DA1B7",
          500: "#2F7998",
          600: "#2A6D89",
          700: "#1C495B",
          800: "#153644",
          900: "#0E242E",
        },
        lavender: {
          100: "#F7F6FE",
          200: "#ECE8FD",
          300: "#E0DAFC",
          400: "#C9BFF9",
          500: "#B2A3F7",
          600: "#A093DE",
          700: "#6B6294",
          800: "#50496F",
          900: "#35314A",
        },
        ruby: {
          100: "#F2E9EB",
          200: "#DDC8CC",
          300: "#C9A7AD",
          400: "#A16670",
          500: "#782432",
          600: "#6C202D",
          700: "#48161E",
          800: "#361017",
          900: "#240B0F",
        },
        latte: {
          100: "#ECEBEA",
          200: "#D0CDCA",
          300: "#B4AEAA",
          400: "#7C726A",
          500: "#44352A",
          600: "#3D3026",
          700: "#292019",
          800: "#1F1813",
          900: "#14100D",
        }
      },
      typography
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
