/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   extend: {
      fontFamily: {
        title: '',
        body: '',
        alt: '',
      },
      colors: {
        mainTitle:"#2A416F"
      }
    },
  },
  plugins: [],
}