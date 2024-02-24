/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,tx,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "mainBackgroundColour": '#000435',
        "columnBackgroundColour": '#8f9779' 
      }
    },
  },
  plugins: [],
}

 