import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import CategoryStack from './CategoryStack';

/**
 * Category section component showing food categories with images
 */
const CategorySection = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Stack cards data - featured categories
  const stackCards = [
    { id: 1, name: 'Biryani', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&q=80' },
    { id: 2, name: 'Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80' },
    { id: 3, name: 'Burger', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80' },
    { id: 4, name: 'Shawarma', img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&q=80' },
    { id: 5, name: 'South Indian', img: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=500&q=80' }
  ];

  return (
    <div id="menu" className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Hand-drawn menu doodles background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        {/* Noodle bowl doodle */}
        <svg className="absolute top-16 left-16 w-28 h-28" viewBox="0 0 100 100" style={{ filter: 'url(#sketch)' }}>
          <ellipse cx="50" cy="60" rx="30" ry="15" stroke="black" strokeWidth="2" fill="none" />
          <ellipse cx="50" cy="50" rx="35" ry="10" stroke="black" strokeWidth="2" fill="none" />
          <path d="M 25 50 Q 30 30, 35 50 M 40 50 Q 45 35, 50 50 M 55 50 Q 60 30, 65 50 M 70 50 Q 75 35, 75 50" stroke="black" strokeWidth="1.5" fill="none" />
          <path d="M 20 55 Q 25 50, 30 55" stroke="black" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Ice cream cone doodle */}
        <svg className="absolute top-32 right-24 w-24 h-32" viewBox="0 0 100 100" style={{ filter: 'url(#sketch)' }}>
          <path d="M 40 50 L 50 90 L 60 50 Z" stroke="black" strokeWidth="2" fill="none" />
          <path d="M 40 50 L 60 50" stroke="black" strokeWidth="2" fill="none" />
          <circle cx="50" cy="40" r="12" stroke="black" strokeWidth="2" fill="none" />
          <circle cx="42" cy="35" r="10" stroke="black" strokeWidth="2" fill="none" />
          <circle cx="58" cy="35" r="10" stroke="black" strokeWidth="2" fill="none" />
        </svg>

        {/* Sushi rolls doodle */}
        <svg className="absolute bottom-32 left-1/4 w-32 h-24" viewBox="0 0 100 100" style={{ filter: 'url(#sketch)' }}>
          <ellipse cx="30" cy="50" rx="15" ry="20" stroke="black" strokeWidth="2" fill="none" />
          <ellipse cx="30" cy="50" rx="8" ry="10" stroke="black" strokeWidth="1.5" fill="none" />
          <ellipse cx="60" cy="50" rx="15" ry="20" stroke="black" strokeWidth="2" fill="none" />
          <ellipse cx="60" cy="50" rx="8" ry="10" stroke="black" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Donut doodle */}
        <svg className="absolute bottom-24 right-20 w-24 h-24" viewBox="0 0 100 100" style={{ filter: 'url(#sketch)' }}>
          <circle cx="50" cy="50" r="30" stroke="black" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="12" stroke="black" strokeWidth="2" fill="none" />
          <path d="M 40 30 Q 45 25, 50 30 T 60 30 T 70 30" stroke="black" strokeWidth="1.5" fill="none" />
          <circle cx="35" cy="45" r="2" fill="black" />
          <circle cx="55" cy="40" r="2" fill="black" />
          <circle cx="45" cy="55" r="2" fill="black" />
        </svg>

        {/* Heart doodle */}
        <svg className="absolute top-1/2 right-12 w-20 h-20" viewBox="0 0 100 100">
          <path d="M 50 80 Q 20 60, 20 40 Q 20 20, 35 20 Q 50 20, 50 40 Q 50 20, 65 20 Q 80 20, 80 40 Q 80 60, 50 80 Z" stroke="black" strokeWidth="2" fill="none" style={{ filter: 'url(#sketch)' }} />
        </svg>

        {/* Chef hat doodle */}
        <svg className="absolute bottom-1/3 left-12 w-24 h-24" viewBox="0 0 100 100" style={{ filter: 'url(#sketch)' }}>
          <ellipse cx="50" cy="40" rx="25" ry="20" stroke="black" strokeWidth="2" fill="none" />
          <rect x="30" y="40" width="40" height="15" stroke="black" strokeWidth="2" fill="none" />
          <path d="M 30 55 L 35 65 L 65 65 L 70 55" stroke="black" strokeWidth="2" fill="none" />
        </svg>

        {/* Wavy lines */}
        <svg className="absolute top-2/3 right-1/3 w-40 h-20" viewBox="0 0 100 50">
          <path d="M 10 25 Q 30 15, 50 25 T 90 25" stroke="black" strokeWidth="1.5" fill="none" style={{ filter: 'url(#sketch)' }} />
        </svg>
      </div>

      {/* Colorful manga speed lines from center */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
        background: `
          repeating-conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 2deg,
            rgba(255,105,180,0.5) 2deg,
            rgba(255,105,180,0.5) 3deg,
            transparent 3deg,
            transparent 5deg,
            rgba(135,206,250,0.5) 5deg,
            rgba(135,206,250,0.5) 6deg,
            transparent 6deg,
            transparent 8deg,
            rgba(255,215,0,0.5) 8deg,
            rgba(255,215,0,0.5) 9deg
          )
        `
      }}></div>

      {/* Manga halftone background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div style={{
          backgroundImage: 'radial-gradient(circle, #ff69b4 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 relative inline-block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{
            textShadow: theme === 'dark'
              ? '4px 4px 0px rgba(255,20,147,0.7)'
              : '4px 4px 0px rgba(255,182,193,0.5)',
            WebkitTextStroke: theme === 'dark' ? '2px white' : '2px black',
            paintOrder: 'stroke fill'
          }}>
            <span className="relative z-10 px-4" style={{
              background: theme === 'dark'
                ? 'linear-gradient(to right, #ffd700, #ffa500)'
                : 'linear-gradient(to right, #fef08a, #fde047)',
            }}>
              Explore Our Menu
            </span>
            {/* Manga underline scribble */}
            <div className={`absolute -bottom-2 left-0 right-0 h-2 border-b-4 transform -rotate-1 ${theme === 'dark' ? 'border-white' : 'border-gray-900'}`}></div>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto font-bold mt-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
            From traditional favorites to modern delights, discover a world of flavors
          </p>
        </div>

        {/* Featured Stack - Interactive Card Stack */}
        <div className="mb-16 flex flex-col items-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 border-4 border-gray-900 px-6 py-3 transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]" style={{
              background: theme === 'dark'
                ? 'linear-gradient(135deg, #ff1493 0%, #ffa500 100%)'
                : 'linear-gradient(135deg, #ff6b9d 0%, #ffd700 100%)'
            }}>
              <span className={`font-black uppercase tracking-wide ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Featured Favorites
              </span>
            </div>
          </div>

          <CategoryStack
            cardsData={stackCards}
            cardDimensions={{ width: 280, height: 280 }}
            sensitivity={180}
            randomRotation={true}
            sendToBackOnClick={false}
          />

          
        </div>

        {/* View Full Menu Button - SKETCHY */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate('/order')}
            className={`relative px-10 py-5 text-white border-4 font-black text-xl uppercase tracking-wider transform hover:scale-110 hover:-rotate-2 transition-all ${theme === 'dark' ? 'border-white' : 'border-gray-900'}`}
            style={{
              background: theme === 'dark'
                ? 'linear-gradient(135deg, #ff1493 0%, #ffa500 50%, #ffd700 100%)'
                : 'linear-gradient(135deg, #ff6b9d 0%, #ffa07a 50%, #ffd700 100%)',
              boxShadow: theme === 'dark'
                ? '8px 8px 0px 0px rgba(255,255,255,0.8), 10px 10px 0px 2px rgba(255,20,147,0.6)'
                : '8px 8px 0px 0px rgba(0,0,0,1), 10px 10px 0px 2px rgba(255,105,180,0.6)',
              filter: 'url(#roughEdges)'
            }}
          >
            View Full Menu
            {/* Star burst */}
            <div className="absolute -top-3 -right-3 w-8 h-8 border-2 border-gray-900 animate-pulse" style={{
              background: 'radial-gradient(circle, #ffeb3b 0%, #ff6b9d 100%)',
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
