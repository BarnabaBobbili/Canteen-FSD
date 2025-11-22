import { Moon, Sun } from 'lucide-react';

/**
 * Theme Toggle Button Component
 * Toggles between dark and light themes
 */
const ThemeToggleButton = ({ theme, isScrolled, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 sm:p-3 border-4 border-gray-900 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
        isScrolled ? 'opacity-0 scale-0 w-0 h-0 p-0 border-0' : 'opacity-100 scale-100'
      }`}
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #ffd700 0%, #ffeb3b 100%)'
      }}
      aria-label="Toggle theme"
      disabled={isScrolled}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" strokeWidth={3} />
      ) : (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" strokeWidth={3} />
      )}
    </button>
  );
};

export default ThemeToggleButton;
