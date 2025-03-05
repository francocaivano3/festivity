/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  "darkMode": "class", 
  theme: {
    extend: {
      fontFamily: {
        sans: ["roboto", "sans-serif"],
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      scrollBehavior: ["responsive"],
    },
  },
  corePlugins: {
    scrollBehavior: true,
  }
};