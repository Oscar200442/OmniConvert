'use client';

import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex justify-between items-center p-4 md:px-8 bg-[var(--card)] bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md border-b border-[var(--secondary)]/[0.2] dark:border-[var(--secondary)]/[0.1] shadow-md relative z-10"
    >
      <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--primary)]">
        OmniConvert <span className="text-[var(--accent)]">✨</span>
      </h1>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-[var(--input-bg)] text-[var(--foreground)] shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all duration-300"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>
    </motion.header>
  );
}
