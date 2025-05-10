'use client'

import { useTheme } from '@/contexts/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-300 transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <FaSun size={18} className="text-yellow-300" />
      ) : (
        <FaMoon size={18} className="text-gray-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
