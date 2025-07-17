/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          100: '#FFF1BF',
          200: '#FFE992',
          300: '#FFDE66',
          400: '#FFD43B',
          500: '#D4AF37', // Main gold
          600: '#B8860B', // Dark gold
          700: '#966600',
          800: '#754C00',
          900: '#543400',
        },
        black: '#000000',
        gray: {
          800: '#1A1A1A',
          900: '#0D0D0D',
        }
      }
    },
  },
  plugins: [],
}
