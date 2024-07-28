const { amber } = require("@mui/material/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  // important: "#root",
  theme: {
    extend: {
      colors: {
        primary: "#fef7dd",
        secondary: "#1E2A31",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};
