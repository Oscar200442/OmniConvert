'use client'; // <-- Add this line at the very top

import Header from './components/Header';
import Converter from './components/Converter';
import { motion } from 'framer-motion';

export const metadata = {
  title: "OmniConvert - The Ultimate Unit Converter",
  description: "A fast, beautiful, and comprehensive unit converter.",
};

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-700 to-purple-700 dark:from-indigo-900 dark:to-purple-900" // Apply gradient here
    >
      <Header />
      <div className="flex flex-col items-center justify-center p-4 md:p-12 flex-grow">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center text-white drop-shadow-lg">The Only Converter You'll Ever Need</h2>
        <p className="text-lg text-indigo-100 dark:text-purple-200 mb-8 text-center max-w-xl">Fast, simple, and powerful. Convert anything with elegance.</p>

        <Converter />
      </div>
       <footer className="text-center p-4 text-sm text-indigo-100 dark:text-purple-200">
        <p>Built for Oskar200442 by your friendly AI assistant. © {new Date().getFullYear()}</p>
      </footer>
    </motion.main>
  );
}
