import React from 'react';

interface HeaderProps {
  toggleTheme: () => void;
  theme: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 md:px-10 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-gray-700 dark:to-gray-900 shadow-lg">
      <h1
        className="text-3xl font-bold text-white dark:text-gray-100"
        style={{ fontFamily: 'fantasy' }}
      >
        Dictionary App
      </h1>
      <button
        onClick={toggleTheme}
        className="p-2 rounded bg-white text-blue-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
      >
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
};

export default Header;
