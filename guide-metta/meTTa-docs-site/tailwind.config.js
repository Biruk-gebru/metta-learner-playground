/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        metta: {
          lightBg: '#ffffff',
          lightPanel: '#f8fafc',
          lightText: '#1e293b',
          darkBg: '#1e1932', // purplish dark
          darkPanel: '#2d2547',
          darkText: '#f3e8ff',
          accent: '#a78bfa', // indigo-400
          highlight: '#fde68a', // yellow-200
        },
      },
    },
  },
  plugins: [],
}

