/** @type {import('tailwindcss').Config} */
const nativewind = require('nativewind/tailwind/css')

module.exports = {
 content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [nativewind],
}

