import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Menu, X } from 'lucide-react';

/**
 * Sticky navigation with scroll detection and mobile menu
 */
const StickyNav = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white border-b-4 border-gray-900 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)]' : 'bg-white/90 border-b-2 border-dashed border-gray-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-gray-900 border-3 border-gray-900 p-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)]">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900">Canteen Delight</h1>
              <p className="text-xs text-gray-600 hidden sm:block font-medium">Fresh Food, Fast Service</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#menu" className="text-gray-900 hover:underline decoration-wavy font-bold transition-all">Menu</a>
            <a href="#how-it-works" className="text-gray-900 hover:underline decoration-wavy font-bold transition-all">How It Works</a>
            <a href="#features" className="text-gray-900 hover:underline decoration-wavy font-bold transition-all">Features</a>
            <button
              onClick={() => navigate('/order')}
              className="px-6 py-2.5 bg-gray-900 border-3 border-gray-900 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all transform hover:scale-105 hover:-rotate-1 font-bold"
            >
              Order Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-900 hover:bg-gray-100 border-2 border-gray-900 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 space-y-3 border-t-2 border-dashed border-gray-400 animate-fade-in">
            <a href="#menu" className="block py-2 text-gray-900 hover:underline font-bold" onClick={() => setMobileMenuOpen(false)}>Menu</a>
            <a href="#how-it-works" className="block py-2 text-gray-900 hover:underline font-bold" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#features" className="block py-2 text-gray-900 hover:underline font-bold" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <button
              onClick={() => navigate('/order')}
              className="w-full px-6 py-2.5 bg-gray-900 border-3 border-gray-900 text-white font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]"
            >
              Order Now
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default StickyNav;
