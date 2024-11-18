/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4c9bd4",
        link: "#7bc8fc"
      }
    },
  },
  plugins: [],
}

