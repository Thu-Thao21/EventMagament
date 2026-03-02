/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatRight: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(15px, -10px)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        floatSlow: 'float 7s ease-in-out infinite',
        floatRight: 'floatRight 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}