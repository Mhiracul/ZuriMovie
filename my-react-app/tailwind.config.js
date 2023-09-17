/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontFamily: {
      satoshi: ["Satoshi", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
      dmsans: ["DM Sans", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
