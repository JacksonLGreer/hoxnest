import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'hawks-red': '#C8102E',
        'hawks-yellow': '#FDB927',
      },
      gridTemplateColumns: {
        // This is for the full statistics list with 22 fields
        '22custom': '2fr repeat(21, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
} satisfies Config;
