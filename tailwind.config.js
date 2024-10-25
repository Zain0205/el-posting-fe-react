/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617',
        primary: '#14b8a6',
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