/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
      boxShadow: {
        'inner-2': 'inset 0px 0px 10px rgb(0 0 0 / 0.3);',
        'outer-2': '2px 2px 10px rgb(0 0 0 / 0.4);',
      },
      fontFamily: {
        sans: ['Questrial', ...defaultTheme.fontFamily.sans],
        Roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '750px',
          },
          '@screen lg': {
            maxWidth: '970px',
          },
          '@screen xl': {
            maxWidth: '1170px',
          },
        },
      });
    },
  ],
};
