/** @type {import('tailwindcss').Config} */
const nativewind = require('nativewind/tailwind/css')

module.exports = {
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: 'Poppins_700Bold',
        body: 'Poppins_400Regular',
        alt: 'Poppins_900Black',
      },
    },
  },
  plugins: [nativewind],
}

