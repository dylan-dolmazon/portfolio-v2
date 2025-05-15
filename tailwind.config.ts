// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,vue}",
    "./components/**/*.{js,ts,vue}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A78BFA", // Violet doux
        lavender: "#E9D8FD", // Lavande pastel
        bluePastel: "#BFDBFE", // Bleu pastel
        mint: "#BBF7D0", // Menthe légère
        pink: "#FBCFE8", // Rose poudré
        grayLight: "#F3F4F6", // Gris neutre clair
        grayDark: "#374151", // Gris profond
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
