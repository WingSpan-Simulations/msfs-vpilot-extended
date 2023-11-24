/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./build/html_ui/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        ...colors,
      }
    },
  },
  plugins: [],
}
