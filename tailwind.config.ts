import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FAF8F4",
        cream: "#F2EDE5",
        ink: "#0E0F11",
        graphite: "#2A2C30",
        muted: "#6B6E74",
        line: "#E2DDD3",
        accent: "#B8946A",
        accentDark: "#8C6E47",
        success: "#3B7D5C",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Cormorant Garamond'", "serif"],
      },
      fontSize: {
        hero: ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["clamp(2rem, 3.5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.5rem, 2.4vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      maxWidth: { container: "1280px" },
      boxShadow: {
        card: "0 1px 2px rgba(14,15,17,.04), 0 4px 16px rgba(14,15,17,.06)",
        soft: "0 10px 40px -10px rgba(14,15,17,.15)",
      },
    },
  },
  plugins: [],
};

export default config;
