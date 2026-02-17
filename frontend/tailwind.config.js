/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef5f3',
          100: '#fee8e4',
          200: '#fdd5cd',
          300: '#fbb6a9',
          400: '#f68d7a',
          500: '#ed6952',
          600: '#d94c37',
          700: '#b73c2b',
          800: '#973527',
          900: '#7d3226',
          950: '#44160f',
        },
        cream: {
          50: '#fcfaf8',
          100: '#f9f4ee',
          200: '#f5e6d3',
          300: '#ead5b8',
          400: '#dfc49d',
          500: '#d4b382',
        },
        brown: {
          700: '#5C3018',
          800: '#4a2612',
          900: '#3a1d0e',
        },
        sage: {
          500: '#4A7C59',
          600: '#3d6649',
          700: '#31503a',
        },
      },
    },
  },
  plugins: [],
}
