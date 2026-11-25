/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#38a5f8',
          500: '#016cf8', // Exact primary Electric Tech Blue from logo.png
          600: '#005bd9',
          700: '#0048b0',
          800: '#033d8e',
          900: '#093475',
          950: '#06204c',
        },
      },
    },
  },
  plugins: [],
};
