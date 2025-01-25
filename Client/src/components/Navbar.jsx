import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check saved preference or default to dark mode
    return localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme');
  });

  useEffect(() => {
    // Apply the theme to the root element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <nav className="bg-white dark:bg-black text-black dark:text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-500">
              Video<span className="text-black dark:text-white">Streaming</span>
            </Link>
          </div>

          {/* Menu Links */}
          {/* <div className="hidden md:flex space-x-4 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 px-3 py-2 rounded-md text-sm font-medium'
                  : 'text-black dark:text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 px-3 py-2 rounded-md text-sm font-medium'
                  : 'text-black dark:text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium'
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 px-3 py-2 rounded-md text-sm font-medium'
                  : 'text-black dark:text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium'
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-400 px-3 py-2 rounded-md text-sm font-medium'
                  : 'text-black dark:text-white hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium'
              }
            >
              Contact
            </NavLink>
          </div> */}

          {/* Light/Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="text-black dark:text-white hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 px-4"
          >
            {isDarkMode ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m8.66-10h-1M4.34 12H3m15.36 4.95l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l.7-.7m-12.02 0l.7-.7M12 8a4 4 0 000 8m0-8a4 4 0 010 8"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
