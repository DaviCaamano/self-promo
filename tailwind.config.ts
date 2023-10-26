/** @type {import('tailwindcss').Config} */
import colors from './src/styles/colors';
const defaultTheme = require('tailwindcss/defaultTheme');

console.log(
  `





colors`,
  colors,
  `


`,
);
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  purge: [
    './src/**/*.{js,ts,jsx,tsx}',
    // Add more here
  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors,
      fontFamily: {
        sans: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
        montserrat: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-montserrat)', ...defaultTheme.fontFamily.mono],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
};
