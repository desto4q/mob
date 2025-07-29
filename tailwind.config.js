/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // fontFamily: ["inter"],
    extend: {
      colors: {
        primary: "#A324F2",
        secondary: "#F1C40F",
        primaryLight: "#BF7FEA",
        backgroundDark: "#15171E",
        gray_light: "#B4B4B4",
        gray_dark: "#2E2F36",
        gray: "#848484",
        pink: "#FF6EB4",
        accent: "#FFC107",
        success: "#28A745",
        warning: "#FFC107",
        danger: "#DC3545",
        green: "#15932A",
        blue: "#242EF2",
        light: "#ebeaeafc",
      },
    },
  },
  plugins: [],
};
