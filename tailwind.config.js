/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        maroon: {
          600: "#9b1a1a",
          700: "#8B0000",
          800: "#700000",
          900: "#500000",
        },
      },
    },
  },
};
