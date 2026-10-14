const tokens = require("./src/theme/tokens.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: tokens.accent,
          strong: tokens.accentStrong,
        },
        glass: {
          DEFAULT: tokens.glass,
          soft: tokens.glassSoft,
          faint: tokens.glassFaint,
        },
      },
    },
  },
  plugins: [],
};
