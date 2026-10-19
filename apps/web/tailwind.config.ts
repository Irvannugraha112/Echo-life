import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1a2332",
        mist: "#f4f6f8",
        calm: "#5b7c99",
        soft: "#e8eef3",
      },
    },
  },
  plugins: [],
};
export default config;
