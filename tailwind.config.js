/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
    },
    extend: {
      typography: ({ theme }) => ({
        'moss-sapphire': {
          css: {
            // Light mode
            '--tw-prose-body': theme('colors.sapphire[500]'),
            '--tw-prose-headings': theme('colors.sapphire[500]'),
            '--tw-prose-lead': theme('colors.sapphire[600]'),
            '--tw-prose-links': theme('colors.sapphire[500]'),
            '--tw-prose-bold': theme('colors.sapphire[500]'),
            '--tw-prose-counters': theme('colors.sapphire[500]'),
            '--tw-prose-bullets': theme('colors.sapphire[500]'),
            '--tw-prose-hr': theme('colors.moss[400]'),
            '--tw-prose-quotes': theme('colors.sapphire[500]'),
            '--tw-prose-quote-borders': theme('colors.sapphire[600]'),
            '--tw-prose-captions': theme('colors.sapphire[700]'),
            '--tw-prose-code': theme('colors.sapphire[500]'),
            '--tw-prose-pre-code': theme('colors.sapphire[700]'),
            '--tw-prose-pre-bg': theme('colors.moss[400]'),
            '--tw-prose-th-borders': theme('colors.moss[600]'),
            '--tw-prose-td-borders': theme('colors.moss[600]'),
            // Dark mode
            '--tw-prose-invert-body': theme('colors.moss[500]'),
            '--tw-prose-invert-headings': theme('colors.moss[500]'),
            '--tw-prose-invert-lead': theme('colors.moss[400]'),
            '--tw-prose-invert-links': theme('colors.moss[500]'),
            '--tw-prose-invert-bold': theme('colors.moss[500]'),
            '--tw-prose-invert-counters': theme('colors.moss[500]'),
            '--tw-prose-invert-bullets': theme('colors.moss[500]'),
            '--tw-prose-invert-hr': theme('colors.sapphire[400]'),
            '--tw-prose-invert-quotes':  theme('colors.stone[150]'),
            '--tw-prose-invert-quote-borders': theme('colors.sapphire[600]'),
            '--tw-prose-invert-captions': theme('colors.moss[500]'),
            '--tw-prose-invert-code': theme('colors.moss[500]'),
            '--tw-prose-invert-pre-code': theme('colors.moss[400]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.moss[400]'),
            '--tw-prose-invert-td-borders': theme('colors.moss[400]'),
          },
        },
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
