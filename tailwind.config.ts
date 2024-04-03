import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './mdx-components.tsx',
  ],
  darkMode: ["class"],
  theme: {
    hljs: {
      theme: 'github',
    },
    extend: {
      screens: {'3xl': '1920px'},
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "a-shadow-md": {
          '0%': {
            "box-shadow": "0 1px 2px 0 rgb(0 0 0 / 0.05)"
          },
          '100%': {
            "box-shadow": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
          }
        }
      },
      animation: {
        "a-shadow-md": "a-shadow-md 0.2s ease-out forwards"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),    
    require('tailwind-highlightjs'),
  ],
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
};
export default config;
