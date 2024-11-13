/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Noto Sans Thai", "sans-serif"],
      }
    },
  },
  plugins: [],
};
