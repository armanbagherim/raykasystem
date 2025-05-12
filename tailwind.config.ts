import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "open-menu": "openMenu 0.2s ease-in-out forwards",
        "close-menu": "closeMenu 0.2s ease-in-out forwards",
      },
      keyframes: {
        openMenu: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        closeMenu: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      colors: {
        primary: "#5C1891",
        customGray: "#F8F8F8",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradiant-login":
          "linear-gradient(135deg, #06784A 0.44%, #5C1891 55.77%, #20AC69 112.26%);",
      },
      boxShadow: {
        shadowCustom: "box-shadow: 0px 3px 8px 1px #F8F8F8",
      },
    },
  },
  plugins: [],
};
export default config;
