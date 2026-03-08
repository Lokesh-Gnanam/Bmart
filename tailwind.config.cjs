/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'light': '#F3F4F4',
        'primary': '#6367FF',
        'secondary': '#FFA6A6',
        'accent': '#FFC300',
      }
    },
  },
  plugins: [],
};
