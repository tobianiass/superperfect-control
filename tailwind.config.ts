import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
        sm: '768px',
        md: '1024px',
        xl: '1440px',
    },
    colors: {
        yellow: '#FFEC40',
        grey: '#ECECEC',
        darkGrey: '#C0C0C0',
        lightGrey: '#EFEFEF',
        textGrey: '#797979'
    },
  },
  plugins: [],
};
export default config;
