/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-kaisei-opti)', 'serif'],
      },
      colors: {
        'text-primary': '#000000',
        'text-accent': '#0FE400',
      },
    },
  },
  plugins: [],
};