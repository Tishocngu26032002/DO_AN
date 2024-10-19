/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./src/***/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        tablet: { max: "799px" },
        // => @media (max-width: 799px) { ... }
        mobile: { max: "477px" },
        // => @media (max-width: 477px) { ... }
      },
    },
    screens: {
      sm: "576px",
      md: "799px",
      lg: "992px",
      xl: "1200px",
    },
  },
  plugins: [],
};