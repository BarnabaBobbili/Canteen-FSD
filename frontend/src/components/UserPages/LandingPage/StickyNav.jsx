import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Menu, X, User, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';

/**
 * Sticky navigation with scroll detection and mobile menu
 */
const StickyNav = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for styling
      setScrolled(currentScrollY > 50);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setVisible(false);
      } else {
        // Scrolling up - show navbar
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className="fixed w-full top-0 z-50 transition-all duration-300 border-b-4 border-gray-900"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out',
        background: theme === 'dark'
          ? scrolled
            ? 'linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(22,33,62,0.95) 50%, rgba(13,27,42,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(26,26,46,0.85) 0%, rgba(22,33,62,0.85) 50%, rgba(13,27,42,0.85) 100%)'
          : scrolled
            ? 'linear-gradient(135deg, rgba(255,245,247,0.95) 0%, rgba(255,250,205,0.95) 50%, rgba(224,247,250,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255,245,247,0.85) 0%, rgba(255,250,205,0.85) 50%, rgba(224,247,250,0.85) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: scrolled
          ? '0px 6px 0px 0px rgba(0,0,0,1)'
          : '0px 4px 0px 0px rgba(0,0,0,0.5)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer transform hover:-rotate-1 transition-transform" onClick={() => navigate('/')}>
            <div className="relative bg-gray-900 border-4 border-gray-900 p-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-3">
              <ChefHat className="w-7 h-7 text-white" strokeWidth={2.5} />
              {/* Comic accent burst */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 border-2 border-gray-900 rounded-full"></div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900" style={{
                textShadow: '2px 2px 0px rgba(255,255,255,0.8)',
                WebkitTextStroke: '0.5px black'
              }}>Canteen Delight</h1>
              <p className="text-xs text-gray-700 hidden sm:block font-black uppercase tracking-wide">Fresh Food, Fast Service</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#menu" className={`font-black uppercase text-sm hover:text-yellow-600 transition-all relative group ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Menu
              <span className={`absolute -bottom-1 left-0 w-0 h-1 group-hover:w-full transition-all ${theme === 'dark' ? 'bg-white' : 'bg-gray-900'}`}></span>
            </a>
            <a href="#how-it-works" className={`font-black uppercase text-sm hover:text-yellow-600 transition-all relative group ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              How It Works
              <span className={`absolute -bottom-1 left-0 w-0 h-1 group-hover:w-full transition-all ${theme === 'dark' ? 'bg-white' : 'bg-gray-900'}`}></span>
            </a>
            <a href="#features" className={`font-black uppercase text-sm hover:text-yellow-600 transition-all relative group ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Features
              <span className={`absolute -bottom-1 left-0 w-0 h-1 group-hover:w-full transition-all ${theme === 'dark' ? 'bg-white' : 'bg-gray-900'}`}></span>
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 border-4 border-gray-900 hover:bg-yellow-100 transition-all transform hover:rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                  : 'linear-gradient(135deg, #ffd700 0%, #ffeb3b 100%)'
              }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-300" strokeWidth={3} />
              ) : (
                <Moon className="w-5 h-5 text-gray-900" strokeWidth={3} />
              )}
            </button>
            {user ? (
              <button
                onClick={() => navigate('/profile')}
                className="relative flex items-center gap-2 px-6 py-2.5 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:scale-105 hover:-rotate-2 font-black uppercase text-sm"
              >
                <User size={18} strokeWidth={3} />
                My Account
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 border-2 border-gray-900 rounded-full"></div>
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="relative px-6 py-2.5 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:scale-105 hover:-rotate-2 font-black uppercase text-sm"
              >
                Sign In
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 border-2 border-gray-900 rounded-full"></div>
              </button>
            )}
          </div>

          {/* Mobile Menu Button - Comic Style */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative md:hidden p-3 text-gray-900 bg-white hover:bg-yellow-100 border-4 border-gray-900 transition-all transform hover:rotate-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 border border-gray-900 rounded-full"></div>
          </button>
        </div>

        {/* Mobile Menu - Comic Style Panel */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-4 py-4 space-y-3 border-t-4 border-gray-900 animate-fade-in ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <a
              href="#menu"
              className={`block py-2 px-3 font-black uppercase text-sm hover:bg-yellow-100 border-2 border-transparent hover:border-gray-900 transition-all transform hover:-rotate-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </a>
            <a
              href="#how-it-works"
              className={`block py-2 px-3 font-black uppercase text-sm hover:bg-yellow-100 border-2 border-transparent hover:border-gray-900 transition-all transform hover:rotate-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#features"
              className={`block py-2 px-3 font-black uppercase text-sm hover:bg-yellow-100 border-2 border-transparent hover:border-gray-900 transition-all transform hover:-rotate-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>

            {/* Theme Toggle in Mobile Menu */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center gap-2 py-3 px-3 border-4 border-gray-900 font-black uppercase text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform rotate-1"
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                  : 'linear-gradient(135deg, #ffd700 0%, #ffeb3b 100%)'
              }}
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-5 h-5 text-yellow-300" strokeWidth={3} />
                  <span className="text-yellow-300">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-gray-900" strokeWidth={3} />
                  <span className="text-gray-900">Dark Mode</span>
                </>
              )}
            </button>
            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/profile');
                }}
                className="relative w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 border-4 border-gray-900 text-white font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1"
              >
                <User size={18} strokeWidth={3} />
                My Account
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 border-2 border-gray-900 rounded-full"></div>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/login');
                }}
                className="relative w-full px-6 py-3 bg-gray-900 border-4 border-gray-900 text-white font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1"
              >
                Sign In
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 border-2 border-gray-900 rounded-full"></div>
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default StickyNav;
