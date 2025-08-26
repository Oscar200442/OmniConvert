'use client';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-[var(--primary)]">
        OmniConvert ✨
      </h1>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-[var(--foreground)]"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}
