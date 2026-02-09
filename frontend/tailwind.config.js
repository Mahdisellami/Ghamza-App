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
          50: '#fef3f2',
          100: '#fee5e2',
          200: '#fdcfca',
          300: '#fbaea5',
          400: '#f77f71',
          500: '#ed6049',
          600: '#da4229',
          700: '#b7341e',
          800: '#982f1c',
          900: '#7e2c1e',
          950: '#44130b',
        },
      },
    },
  },
  plugins: [],
}
