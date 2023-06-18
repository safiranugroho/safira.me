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
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // Light mode
            '--tw-prose-body': theme('colors.teal[800]'),
            '--tw-prose-headings': theme('colors.teal[800]'),
            '--tw-prose-lead': theme('colors.stone[200]'),
            '--tw-prose-links': theme('colors.teal[800]'),
            '--tw-prose-bold': theme('colors.teal[800]'),
            '--tw-prose-counters': theme('colors.teal[800]'),
            '--tw-prose-bullets': theme('colors.teal[800]'),
            '--tw-prose-hr': theme('colors.stone[300]'),
            '--tw-prose-quotes': theme('colors.teal[800]'),
            '--tw-prose-quote-borders': theme('colors.teal[750]'),
            '--tw-prose-captions': theme('colors.teal[900]'),
            '--tw-prose-code': theme('colors.teal[800]'),
            '--tw-prose-pre-code': theme('colors.teal[900]'),
            '--tw-prose-pre-bg': theme('colors.stone[200]'),
            '--tw-prose-th-borders': theme('colors.stone[200]'),
            '--tw-prose-td-borders': theme('colors.stone[300]'),
            // Dark mode
            '--tw-prose-invert-body': theme('colors.stone[100]'),
            '--tw-prose-invert-headings': theme('colors.stone[100]'),
            '--tw-prose-invert-lead': theme('colors.teal[900]'),
            '--tw-prose-invert-links': theme('colors.stone[100]'),
            '--tw-prose-invert-bold': theme('colors.stone[100]'),
            '--tw-prose-invert-counters': theme('colors.stone[100]'),
            '--tw-prose-invert-bullets': theme('colors.stone[100]'),
            '--tw-prose-invert-hr': theme('colors.teal[900]'),
            '--tw-prose-invert-quotes':  theme('colors.stone[150]'),
            '--tw-prose-invert-quote-borders': theme('colors.teal[900]'),
            '--tw-prose-invert-captions': theme('colors.teal[900]'),
            '--tw-prose-invert-code': theme('colors.stone[100]'),
            '--tw-prose-invert-pre-code': theme('colors.stone[150]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.teal[900]'),
            '--tw-prose-invert-td-borders': theme('colors.teal[950]'),
          },
        },
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
