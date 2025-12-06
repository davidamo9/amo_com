import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        // Semantic colors from CSS variables
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Gold color scale for direct use
        gold: {
          50: "#fdf8eb",
          100: "#f9ecc7",
          200: "#f3d88a",
          300: "#ecc04d",
          400: "#e5a823",
          500: "#d4a84b",
          600: "#b8872e",
          700: "#966628",
          800: "#7a5126",
          900: "#664323",
        },
        // Amber accent
        amber: {
          500: "#c27c1a",
          600: "#a66a15",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-up": "fadeUp 0.8s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        "text-reveal": "textReveal 1s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "glow": "glow 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        textReveal: {
          "0%": {
            clipPath: "inset(0 100% 0 0)",
            opacity: "0"
          },
          "100%": {
            clipPath: "inset(0 0 0 0)",
            opacity: "1"
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(212, 168, 75, 0.2)"
          },
          "50%": {
            boxShadow: "0 0 40px rgba(212, 168, 75, 0.4)"
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "shimmer-gold": "linear-gradient(90deg, transparent, rgba(212,168,75,0.1), transparent)",
        "gradient-gold": "linear-gradient(135deg, #d4a84b 0%, #c27c1a 100%)",
      },
      boxShadow: {
        "glow-gold": "0 0 20px rgba(212, 168, 75, 0.2)",
        "glow-gold-lg": "0 0 40px rgba(212, 168, 75, 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
