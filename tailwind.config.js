/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  safelist: [
    "light-bg",
    "dark-bg",
    "light-card",
    "dark-card",
    "light-text",
    "dark-text",
    "light-muted",
    "dark-muted",
    "light-border",
    "dark-border",
    "accent",
    "dark-accent",
    "success",
    "danger",
    "warning",
    // Add others if needed
  ],
  theme: {
    extend: {
      colors: {
        // Base Backgrounds
        "light-bg": "#ffffff", // white
        "dark-bg": "#0f172a", // navy-very-dark

        // Card Backgrounds
        "light-card": "#f4f4f5", // zinc-100
        "dark-card": "#1e293b", // slate-800

        // Text
        "light-text": "#1f2937", // slate-800 (better contrast than #111)
        "dark-text": "#f8fafc", // slate-50 (brighter than #e2e8f0)

        // Muted / subtle text
        "light-muted": "#6b7280", // gray-500
        "dark-muted": "#94a3b8", // slate-400

        // Borders
        "light-border": "#d1d5db", // gray-300
        "dark-border": "#334155", // slate-700

        // Accents
        accent: "#1d4ed8", // blue-700 (primary accent)
        "dark-accent": "#38bdf8", // sky-400 (primary accent in dark)

        // Utility Colors
        success: "#22c55e", // green-500
        danger: "#ef4444", // red-500
        warning: "#facc15", // yellow-400
      },
    },
  },
  plugins: [],
};
