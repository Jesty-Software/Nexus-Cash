/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        "poppins": ["Poppins", "Arial", "Helvetica", "sans-serif"],
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["business"]
  }
};
