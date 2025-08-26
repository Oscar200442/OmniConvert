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
        // Define a custom palette for gradients and UI elements
        primary: {
          light: '#6366f1', // Indigo for light mode primary (buttons, focus)
          dark: '#a78bfa',  // Purple-blue for dark mode primary
        },
        secondary: {
          light: '#6b7280', // Gray for secondary text/borders
          dark: '#9ca3af',
        },
        accent: {
          light: '#c084fc', // Light purple for accents
          dark: '#e879f9',  // Vibrant pink-purple for dark mode accents
        },
        background: {
          light: '#f8fafc', // Very light blue-gray
          dark: '#0f172a',  // Deep dark blue
        },
        card: {
          light: '#ffffff', // White card
          dark: '#1e293b',  // Dark blue-gray card
        },
        input: {
          light: '#f1f5f9', // Lighter input background
          dark: '#334155', // Darker input background
        }
      },
    },
  },
  plugins: [],
};
