/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          background: '#f9fafb',
          foreground: '#111827',
          card: '#ffffff',
          primary: '#3b82f6',
          secondary: '#6b7280',
        },
        dark: {
          background: '#111827',
          foreground: '#f9fafb',
          card: '#1f2937',
          primary: '#60a5fa',
          secondary: '#9ca3af',
        },
      },
    },
  },
  plugins: [],
};
