import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Core surfaces */
        background:  "#060504",
        foreground:  "#f5f0e6",
        primary:     "#0f0d0a",
        card:        "#1a1714",

        /* Gold palette */
        accent:      "#d4af37",
        "accent-deep":   "#b8952a",
        "accent-bright": "#e8c84a",
        "accent-light":  "#f0d878",
        "accent-pale":   "#faecc8",
        "accent-warm":   "#c8a97e",
        "accent-muted":  "#9a7d4a",

        /* Neutral darks */
        "surface-void":  "#030302",
        "surface-deep":  "#060504",
        "surface-dark":  "#0a0907",
        "surface-rich":  "#0f0d0a",
        "surface-mid":   "#141210",
        "surface-card":  "#1a1714",
        "surface-light": "#222018",

        /* Text */
        "text-primary":   "#f5f0e6",
        "text-secondary": "#d4c9b0",
        "text-muted":     "#8a7d6a",
        "text-faint":     "#4a4035",
      },

      fontFamily: {
        sans:      ['"Montserrat"', '"voga"', 'system-ui', 'sans-serif'],
        serif:     ['"Cormorant Garamond"', '"voga"', 'Georgia', 'serif'],
        display:   ['"Cormorant Garamond"', '"voga"', 'serif'],
        body:      ['"Montserrat"', 'system-ui', 'sans-serif'],
        mono:      ['"voga"', 'monospace'],
        /* Legacy alias kept for any existing usage */
        playfair:  ['"Cormorant Garamond"', '"voga"', 'serif'],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem",    letterSpacing: "0.1em"  }],
        xs:    ["0.75rem",  { lineHeight: "1.125rem", letterSpacing: "0.05em" }],
      },

      letterSpacing: {
        luxury:  "0.25em",
        widest2: "0.35em",
        brand:   "0.15em",
      },

      backgroundImage: {
        "gradient-radial":    "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gold-gradient":      "linear-gradient(135deg, #b8952a 0%, #d4af37 40%, #e8c84a 65%, #c8a97e 100%)",
        "gold-shimmer":       "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.2) 50%, transparent 100%)",
        "dark-fade-up":       "linear-gradient(to top, #060504 0%, transparent 100%)",
        "dark-fade-down":     "linear-gradient(to bottom, #060504 0%, transparent 100%)",
        "dark-vignette":      "radial-gradient(ellipse at center, transparent 40%, rgba(3,3,2,0.85) 100%)",
        "luxury-card":        "linear-gradient(145deg, #1a1714 0%, #0f0d0a 100%)",
        "hero-overlay":       "linear-gradient(to bottom, rgba(3,3,2,0.35) 0%, rgba(3,3,2,0.55) 60%, rgba(3,3,2,0.8) 100%)",
      },

      boxShadow: {
        "gold-sm":   "0 0 12px rgba(212,175,55,0.15)",
        "gold-md":   "0 0 30px rgba(212,175,55,0.20)",
        "gold-lg":   "0 0 60px rgba(212,175,55,0.18)",
        "gold-glow": "0 0 80px rgba(212,175,55,0.12), 0 0 160px rgba(212,175,55,0.06)",
        "luxury":    "0 24px 64px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.5)",
        "card":      "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.04)",
        "nav":       "0 4px 40px rgba(0,0,0,0.6)",
        "inset-gold":"inset 0 1px 0 rgba(212,175,55,0.15)",
      },

      borderColor: {
        "gold-subtle": "rgba(212,175,55,0.08)",
        "gold-faint":  "rgba(212,175,55,0.12)",
        "gold-light":  "rgba(212,175,55,0.25)",
        "gold-mid":    "rgba(212,175,55,0.4)",
        "gold":        "#d4af37",
      },

      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "26":  "6.5rem",
        "30":  "7.5rem",
        "34":  "8.5rem",
        "38":  "9.5rem",
        "42":  "10.5rem",
        "46":  "11.5rem",
        "50":  "12.5rem",
        "100": "25rem",
        "112": "28rem",
        "128": "32rem",
        "144": "36rem",
        "160": "40rem",
      },

      maxWidth: {
        "8xl":  "88rem",
        "9xl":  "96rem",
        "10xl": "104rem",
      },

      borderRadius: {
        none:   "0px",
        "luxury": "2px",
      },

      transitionTimingFunction: {
        "luxury-in":  "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "luxury-out": "cubic-bezier(0.0, 0.0, 0.2, 1)",
        "luxury":     "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },

      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
        "1200": "1200ms",
        "1500": "1500ms",
        "2000": "2000ms",
      },

      animation: {
        /* Core */
        "fade-in":       "fadeIn 1s ease-out forwards",
        "fade-in-slow":  "fadeIn 2s ease-out forwards",
        "slide-up":      "slideUp 0.8s ease-out forwards",
        "slide-up-slow": "slideUp 1.2s ease-out forwards",
        "slide-in-left": "slideInLeft 0.8s ease-out forwards",
        /* UI */
        "shimmer":       "shimmer 2.5s linear infinite",
        "gold-pulse":    "goldPulse 2.5s ease-in-out infinite",
        "float":         "floatY 4s ease-in-out infinite",
        /* Scroll indicator */
        "scroll-line":   "scrollLine 2s ease-in-out infinite",
      },

      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%":   { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        goldPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0)" },
          "50%":       { boxShadow: "0 0 20px 4px rgba(212,175,55,0.25)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-12px)" },
        },
        scrollLine: {
          "0%":   { transform: "scaleY(0)", transformOrigin: "top"    },
          "50%":  { transform: "scaleY(1)", transformOrigin: "top"    },
          "51%":  { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },

      aspectRatio: {
        "portrait":  "3/4",
        "cinematic": "21/9",
        "golden":    "1.618/1",
      },

      zIndex: {
        "splash":   "10001",
        "progress": "10000",
        "cursor":   "9999",
        "modal":    "1000",
        "overlay":  "900",
        "nav":      "500",
        "whatsapp": "9990",
      },
    },
  },
  plugins: [],
};

export default config;
