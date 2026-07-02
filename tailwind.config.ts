import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "apple-bg": "#F5F5F7",
        "apple-dark": "#000000",
        "apple-surface": "#FFFFFF",
        "apple-surface-dark": "#1D1D1F",
        "apple-border": "#D2D2D7",
        "apple-border-dark": "#38383A",
        "apple-text": "#1D1D1F",
        "apple-text-dark": "#F5F5F7",
        "apple-muted": "#6E6E73",
        "apple-blue": "#0071E3",
        "apple-blue-hover": "#0077ED",
        "apple-blue-active": "#005BBB",
        "apple-green": "#34C759",
        "apple-red": "#FF3B30",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'SF Pro Display'",
          "'Inter'",
          "'Segoe UI'",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        "apple-lg": "20px",
        "apple-xl": "28px",
      },
      backdropBlur: {
        apple: "20px",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop": {
          "0%": { transform: "scale(0.96)" },
          "60%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.25s ease-out",
        "pop": "pop 0.25s ease-out",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

export default config;
