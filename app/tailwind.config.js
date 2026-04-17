/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind v4: scan all app source files
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./stores/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // ─── Design tokens ported 1:1 from "Vital Flow" mockups ───────────
      colors: {
        "primary":                   "#0058bf",
        "on-primary":                "#ffffff",
        "primary-container":         "#006fef",
        "on-primary-container":      "#fefcff",
        "primary-fixed":             "#d8e2ff",
        "primary-fixed-dim":         "#aec6ff",
        "on-primary-fixed":          "#001a42",
        "on-primary-fixed-variant":  "#004396",
        "inverse-primary":           "#aec6ff",

        "secondary":                 "#00696b",
        "on-secondary":              "#ffffff",
        "secondary-container":       "#56f5f8",
        "on-secondary-container":    "#006e70",
        "secondary-fixed":           "#5af8fb",
        "secondary-fixed-dim":       "#2ddbde",
        "on-secondary-fixed":        "#002020",
        "on-secondary-fixed-variant":"#004f51",

        "tertiary":                  "#4f54a3",
        "on-tertiary":               "#ffffff",
        "tertiary-container":        "#686dbe",
        "on-tertiary-container":     "#fffbff",
        "tertiary-fixed":            "#e0e0ff",
        "tertiary-fixed-dim":        "#bfc2ff",
        "on-tertiary-fixed":         "#070a61",
        "on-tertiary-fixed-variant": "#393e8c",

        "surface":                   "#f7f9fb",
        "surface-bright":            "#f7f9fb",
        "surface-dim":               "#d8dadc",
        "surface-variant":           "#e0e3e5",
        "surface-tint":              "#005ac4",
        "surface-container-lowest":  "#ffffff",
        "surface-container-low":     "#f2f4f6",
        "surface-container":         "#eceef0",
        "surface-container-high":    "#e6e8ea",
        "surface-container-highest": "#e0e3e5",
        "on-surface":                "#191c1e",
        "on-surface-variant":        "#414755",
        "inverse-surface":           "#2d3133",
        "inverse-on-surface":        "#eff1f3",

        "background":                "#f7f9fb",
        "on-background":             "#191c1e",

        "outline":                   "#727786",
        "outline-variant":           "#c1c6d7",

        "error":                     "#ba1a1a",
        "on-error":                  "#ffffff",
        "error-container":           "#ffdad6",
        "on-error-container":        "#93000a",
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg:      "2rem",
        xl:      "3rem",
        full:    "9999px",
      },
      fontFamily: {
        headline: ["PlusJakartaSans"],
        body:     ["Manrope"],
        label:    ["Manrope"],
      },
    },
  },
  plugins: [],
};
