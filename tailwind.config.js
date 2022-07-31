/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#363636",
        secondary: "#FBFBFB",
        tertiary: {
          50: "#81afff",
          100: "#6ca1ff",
          200: "#5794ff",
          300: "#4286ff",
          400: "#2d79ff",
          500: "#296de6",
          600: "#2461cc",
          700: "#1f55b3",
          800: "#1b4999",
          900: "#173d80",
        },
      },
    },
  },
  plugins: [],
};
