/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");

export default {
  content: [
    './src/**/*.tsx',
    './index.html',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ['Poppins', 'sans-serif'],
        'Oleo': ['Oleo Script', 'sans-serif'],
        'Roboto': ['Roboto', 'sans-serif']
      },
      backgroundColor:{
        'darkLigth': ['#202020'],
        'ligthWhite' : ['#c3c3c3ab'],
        'darkSecond': ['#272727e6']
      },

      borderColor:{
        'darkLigth': ['#202020'],
        'ligthWhite' : ['#c3c3c3ab'],
        'darkSecond': ['#272727e6']
      },

      fontSize:{
        'CrushClamp': "clamp(1.25rem, 1.199rem + 0.355vw, 1.625rem)",
        'IftoClamp': "clamp(1rem, 0.932rem + 0.4734vw, 1.5rem)",
        'PostClamp': "clamp(0.75rem, 0.699rem + 0.355vw, 1.125rem)",
        'ButtonPostClamp': "clamp(0.5rem, 0.466rem + 0.2367vw, 0.75rem)",
      }
    },
  },
  darkMode: "class",  
  plugins: [nextui()],
}

