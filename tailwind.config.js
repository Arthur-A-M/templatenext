/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { default: "#95F3A0" },
        secondary: { default: "#95F3A0" },
        gray: {
          default: "#b8b8b8",
          200: "#a1a1a1",
          300: "#808080",
          400: "#616161",
          500: "#525252",
          600: "#424242",
          700: "#2E2E2E",
          800: "#111111",
          555: "#272727",
        },
        white: {
          default: "#FFFFFF",
        },
        green: {
          default: "#71f697",
        },
      },
      fontFamily: {
        montserrat: '"Montserrat", sans-serif',
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
      letterSpacing: {
        normal: "5px",
      },
      ringWidth: {
        5: "5px",
      },
    },
  },
  plugins: [],
};
