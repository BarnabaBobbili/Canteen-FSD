import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

/**
 * Shared navigation component for user-facing pages
 * @param {Object} props
 * @param {boolean} props.showAuth - Whether to show login/signup buttons
 * @param {string} props.variant - Navigation variant ('landing' | 'transparent' | 'solid')
 */
const Navigation = ({ showAuth = true, variant = 'landing' }) => {
  const navigate = useNavigate();

  const getNavClasses = () => {
    const baseClasses = "max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 flex justify-between items-center";

    if (variant === 'transparent') {
      return `${baseClasses} bg-transparent`;
    }
    return baseClasses;
  };

  return (
    <nav className={getNavClasses()} style={{ fontFamily: '"Comic Sans MS", "Marker Felt", cursive' }}>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="bg-gray-900 border-3 border-gray-900 p-1.5 sm:p-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] cursor-pointer"
          onClick={() => navigate('/')}>
          <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h1
          className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 truncate cursor-pointer"
          onClick={() => navigate('/')}
        >
          Smart Canteen
        </h1>
      </div>

      {showAuth && (
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={() => navigate('/signup')}
            className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-white text-gray-900 border-3 border-gray-900 hover:bg-gray-100 transition-all transform hover:scale-105 hover:rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] font-bold text-xs sm:text-sm md:text-base"
          >
            <span className="hidden sm:inline">Sign Up</span>
            <span className="sm:hidden">Join</span>
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-gray-900 border-3 border-gray-900 text-white transition-all transform hover:scale-105 hover:-rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] font-black text-xs sm:text-sm md:text-base"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
