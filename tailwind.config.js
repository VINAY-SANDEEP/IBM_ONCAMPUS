/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0F1B2D",
          900: "#152238",
          800: "#1D2E4A",
          700: "#28405F",
          600: "#375679",
          500: "#4A6D96",
          400: "#7692B3",
          300: "#A8BBD1",
          200: "#D2DDEA",
          100: "#EBF0F6",
          50: "#F5F8FB",
        },
        amber: {
          700: "#9A6414",
          600: "#B87A1A",
          500: "#C98A2C",
          400: "#DDA646",
          300: "#EAC27E",
          100: "#FBF0DD",
        },
        slate: {
          25: "#FAFBFC",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 27, 45, 0.06), 0 1px 1px rgba(15, 27, 45, 0.04)",
        raised: "0 4px 16px rgba(15, 27, 45, 0.10)",
      },
    },
  },
  plugins: [],
};
