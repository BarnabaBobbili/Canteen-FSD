import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, UtensilsCrossed, Plus, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../../../config/api';
import { useTheme } from '../../../context/ThemeContext';
import { getImageUrl } from '../../Menu/menuHelpers';

/**
 * Today's Specials / Offers Section
 * Displays featured and popular menu items
 */
const SpecialsSection = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [specialItems, setSpecialItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpecials();
  }, []);

  const loadSpecials = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu`);
      const data = await response.json();

      // Filter available items and get first 6 for "specials"
      // In production, backend should have a "featured" or "special" flag
      const availableItems = data.filter(item => item.available);
      const specials = availableItems.slice(0, 6);

      setSpecialItems(specials);
    } catch (error) {
      console.error('Failed to load specials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div id="specials" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading today's specials...</p>
        </div>
      </div>
    );
  }

  if (!specialItems || specialItems.length === 0) {
    return null;
  }

  return (
    <div id="specials" className="relative py-20 overflow-hidden">
      {/* Hand-drawn food doodles background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        {/* Pizza slice doodle */}
        <svg className="absolute top-10 left-10 w-24 h-24" viewBox="0 0 100 100" style={{ filter: 'url(#sketch)' }}>
          <path d="M 50 10 L 90 80 L 10 80 Z" stroke="black" strokeWidth="2" fill="none" />
          <circle cx="40" cy="50" r="3" fill="black" />
          <circle cx="60" cy="60" r="3" fill="black" />
          <circle cx="50" cy="70" r="3" fill="black" />
        </svg>

        {/* Burger doodle */}
        <svg className="absolute top-40 right-20 w-28 h-28" viewBox="0 0 100 100" style={{ filter: 'url(#sketch)' }}>
          <ellipse cx="50" cy="70" rx="35" ry="10" stroke="black" strokeWidth="2" fill="none" />
          <rect x="20" y="50" width="60" height="20" stroke="black" strokeWidth="2" fill="none" />
          <ellipse cx="50" cy="50" rx="35" ry="12" stroke="black" strokeWidth="2" fill="none" />
          <path d="M 20 60 Q 25 55, 30 60 T 40 60 T 50 60 T 60 60 T 70 60 T 80 60" stroke="black" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Coffee cup doodle */}
        <svg className="absolute bottom-20 left-1/4 w-20 h-20" viewBox="0 0 100 100" style={{ filter: 'url(#sketch)' }}>
          <rect x="30" y="40" width="40" height="40" rx="5" stroke="black" strokeWidth="2" fill="none" />
          <path d="M 70 50 Q 85 50, 85 60 Q 85 70, 70 70" stroke="black" strokeWidth="2" fill="none" />
          <path d="M 35 35 Q 40 25, 45 35" stroke="black" strokeWidth="1.5" fill="none" />
          <path d="M 50 35 Q 55 25, 60 35" stroke="black" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Stars and sparkles */}
        <svg className="absolute top-1/2 right-10 w-16 h-16" viewBox="0 0 50 50">
          <path d="M 25 5 L 28 20 L 45 25 L 28 30 L 25 45 L 22 30 L 5 25 L 22 20 Z" stroke="black" strokeWidth="1.5" fill="none" style={{ filter: 'url(#sketch)' }} />
        </svg>

        {/* Fork and knife doodle */}
        <svg className="absolute bottom-40 right-1/4 w-20 h-24" viewBox="0 0 100 100" style={{ filter: 'url(#sketch)' }}>
          <path d="M 30 10 L 30 90 M 25 10 L 25 40 M 35 10 L 35 40" stroke="black" strokeWidth="2" fill="none" />
          <path d="M 70 10 L 70 60 M 60 10 L 80 30" stroke="black" strokeWidth="2" fill="none" />
        </svg>

        {/* Scribble arrows */}
        <svg className="absolute top-20 right-1/3 w-32 h-16" viewBox="0 0 100 50">
          <path d="M 10 25 Q 50 15, 90 25" stroke="black" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" style={{ filter: 'url(#sketch)' }} />
        </svg>
      </div>

      {/* Colorful manga speed lines from center */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
        background: `
          repeating-conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 2deg,
            rgba(255,140,0,0.5) 2deg,
            rgba(255,140,0,0.5) 3deg,
            transparent 3deg,
            transparent 5deg,
            rgba(255,105,180,0.5) 5deg,
            rgba(255,105,180,0.5) 6deg,
            transparent 6deg,
            transparent 8deg,
            rgba(135,206,250,0.5) 8deg,
            rgba(135,206,250,0.5) 9deg
          )
        `
      }}></div>

      {/* Manga halftone background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div style={{
          backgroundImage: 'radial-gradient(circle, #ff8c00 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border-4 border-gray-900 px-6 py-3 mb-6 transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]" style={{
            background: 'linear-gradient(135deg, #ffd700 0%, #ffeb3b 100%)'
          }}>
            <Sparkles className="w-6 h-6 text-gray-900" strokeWidth={3} />
            <span className="text-gray-900 font-black uppercase tracking-wide">Limited Time</span>
          </div>
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 relative inline-block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{
            textShadow: theme === 'dark'
              ? '4px 4px 0px rgba(255,165,0,0.7)'
              : '4px 4px 0px rgba(255,182,193,0.5)',
            WebkitTextStroke: theme === 'dark' ? '2px white' : '2px black',
            paintOrder: 'stroke fill'
          }}>
            <span className="relative z-10 px-4" style={{
              background: theme === 'dark'
                ? 'linear-gradient(to right, #ffa500, #ff8c00)'
                : 'linear-gradient(to right, #ffe4e1, #ffb3d9)',
            }}>
              Today's Specials
            </span>
            {/* Manga underline scribble */}
            <div className={`absolute -bottom-2 left-0 right-0 h-2 border-b-4 transform rotate-1 ${theme === 'dark' ? 'border-white' : 'border-gray-900'}`}></div>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto font-bold mt-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
            Fresh, delicious, and handpicked just for you!
          </p>
        </div>

        {/* Specials Grid - SKETCHY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {specialItems.map((item, index) => (
            <div
              key={item._id}
              className="group bg-white border-4 border-gray-900 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all transform hover:-translate-y-1 hover:rotate-1 cursor-pointer"
              onClick={() => navigate('/order')}
              style={{ filter: 'url(#roughEdges)' }}
            >
              {/* Badge */}
              {index === 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-1 bg-yellow-200 border-2 border-gray-800 text-gray-900 px-3 py-1 text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] transform -rotate-3">
                    <TrendingUp className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {getImageUrl(item.image, API_BASE_URL) ? (
                  <img
                    src={getImageUrl(item.image, API_BASE_URL)}
                    alt={item.itemName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className={`absolute inset-0 bg-[#FF7A00] bg-opacity-20 flex items-center justify-center ${
                    getImageUrl(item.image, API_BASE_URL) ? 'hidden' : ''
                  }`}
                >
                  <UtensilsCrossed className="w-16 h-16 text-[#FF7A00]" />
                </div>

                {/* Veg/Non-Veg Indicator */}
                <div className="absolute top-3 right-3">
                  <div className={`w-6 h-6 border-2 flex items-center justify-center bg-white ${
                    item.isVeg ? 'border-green-600' : 'border-red-600'
                  }`}>
                    <div className={`w-3 h-3 rounded-full ${
                      item.isVeg ? 'bg-green-600' : 'bg-red-600'
                    }`}></div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 bg-gray-50">
                <h3 className="text-xl font-black text-gray-900 mb-2">{item.itemName}</h3>
                {item.description && (
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{item.description}</p>
                )}

                {/* Category Tag */}
                <span className="inline-block text-xs font-bold text-gray-900 border-2 border-gray-900 bg-white px-2 py-1 mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  {item.category}
                </span>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-gray-300">
                  <div>
                    <div className="text-2xl font-black text-gray-900">₹{item.price}</div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-2 border-gray-900 text-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] transition-all font-bold transform hover:-rotate-2">
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button - SKETCHY */}
        <div className="text-center">
          <button
            onClick={() => navigate('/order')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all transform hover:scale-105 hover:-rotate-1 font-black text-lg"
            style={{ filter: 'url(#roughEdges)' }}
          >
            View Full Menu
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialsSection;
