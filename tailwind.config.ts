import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "100": "#FFF1E6",
          "500": "#FF7000",
        },
        dark: {
          secondaryRight: "#0F1117",
          secondaryLeft: "#0F111780",
          border: "#101012",
          main: "#000000",
          "200": "#0F1117",
          "300": "#151821",
          "400": "#212734",
          "500": "#101012",
        },
        light: {
          "400": "#858EAD",
          "500": "#7B8EC8",
          "700": "#DCE3F1",
          "800": "#F4F6F8",
          "850": "#FDFDFD",
          "900": "#FFFFFF",
        },
      },
      boxShadow: {
        "auth-form-shadow-light": "0px 29.36px 58.72px 0px #00000029",
        "sidebar-shadow": "10px 10px 20px 0px #DAD5D51A",
        "right-sidebar-shadow": "-10px 10px 20px 0px #DAD5D51A",
        "question-card-shadow-light":
          "0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), 0px 2px 4px 0px rgba(184, 184, 184, 0.03)",
        "question-card-dark": "0px 2px 10px 0px rgba(46, 52, 56, 0.1)",
      },
      backdropBlur: {
        "83": "83px", // Custom blur value
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans"],
        "space-grotesk": ["var(--font-space-grotesk)", "sans"],
      },
      screens: {
        xs: "420px",
      },
      backgroundImage: {
        "auth-bg": "url(/images/auth-light.png)",
        "auth-bg-dark": "url(/images/auth-dark.png)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
