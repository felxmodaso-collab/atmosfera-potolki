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
        coral: "#D8554A",
        coralDark: "#B23E34",
        teal: "#2C7A7B",
        sage: "#6B8E7F",
        gold: "#D4A857",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Cormorant Garamond'", "serif"],
      },
      fontSize: {
        mega: ["clamp(3rem, 7vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.025em" }],
        hero: ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["clamp(2rem, 3.5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["clamp(1.5rem, 2.4vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      maxWidth: { container: "1280px" },
      boxShadow: {
        card: "0 1px 2px rgba(14,15,17,.04), 0 4px 16px rgba(14,15,17,.06)",
        soft: "0 10px 40px -10px rgba(14,15,17,.15)",
        deep: "0 24px 60px -20px rgba(14,15,17,.4)",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "fade-up": "fadeUp .7s ease both",
        "ken-burns": "kenBurns 18s ease-in-out infinite alternate",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        fadeUp:  { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "none" } },
        kenBurns:{ "0%": { transform: "scale(1)" }, "100%": { transform: "scale(1.07)" } },
      },
    },
  },
  plugins: [],
};

export default config;
