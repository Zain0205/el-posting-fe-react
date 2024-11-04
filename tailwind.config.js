/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030712',
        primary: '#14b8a6',
        secondary: '#3b82f6',
        secondaryDark: '#2563eb',
      },
      fontFamily: {
        roboto: 'Roboto, sans-serif',
        monserat: 'Montserrat, sans-serif',
        playWrite: 'Playwrite GB S',
        jakrta: 'Jakarta Text Regular',
      },
    },
  },
  plugins: [],
}