/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#D5DAE1",
        },
        black: {
          DEFAULT: "#000",
          500: "#1D2235",
        },
        blue: {
          500: "#2b77e7",
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        worksans: ["Work Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        bitcount: ['"Bitcount Prop Single Ink"', 'sans-serif'],
      },
      textShadow: {
        glow: '0 0 8px #39ff14, 0 0 16px #39ff14',
      },
      boxShadow: {
        card: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-glow': {
          textShadow: '0 0 8px #39ff14, 0 0 16px #39ff14',
        },
      });
    },
  ],
};
