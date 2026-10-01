/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: {
            50: "#fdf2f2",
            100: "#fde8e8",
            200: "#fbd5d5",
            300: "#f8b4b4",
            400: "#f07f7f",
            500: "#c82333",
            600: "#9e1520",
            700: "#7c1119",
            800: "#5e0d13",
            900: "#44090d",
            950: "#2a0407",
          },
          saffron: {
            50: "#fff7ed",
            100: "#ffedd5",
            200: "#fed7aa",
            300: "#fdba74",
            400: "#fb923c",
            500: "#ea580c",
            600: "#c2410c",
            700: "#9a3412",
            800: "#7c2d12",
            900: "#632711",
          },
          gold: {
            50: "#fcfbf3",
            100: "#f8f4df",
            200: "#f2e7b8",
            300: "#ebd58a",
            400: "#e0bf58",
            500: "#d4af37",
            600: "#b58d24",
            700: "#916c1b",
            800: "#76551b",
            900: "#63471c",
          },
          cream: {
            50: "#fffefb",
            100: "#fbf8f1",
            200: "#f5eee0",
            300: "#ede0c9",
            400: "#dfc9a8",
          },
          charcoal: {
            50: "#fafaf9",
            100: "#f5f5f4",
            200: "#e7e5e4",
            300: "#d6d3d1",
            400: "#a8a29e",
            500: "#78716c",
            600: "#57534e",
            700: "#44403c",
            800: "#292524",
            900: "#1c1917",
            950: "#0c0a09",
          },
        },
      },
      fontFamily: {
        sans: ["'Noto Sans Devanagari'", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
        heading: ["'Rozha One'", "'Noto Sans Devanagari'", "serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.35s ease-out forwards",
        slideUp: "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        scaleIn: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 4.5s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
