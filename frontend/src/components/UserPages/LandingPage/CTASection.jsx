import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

/**
 * Call-to-action section for landing page
 */
const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Helper function to get the correct dashboard route based on user role
  const getDashboardRoute = () => {
    if (!user) return '/signup';
    switch (user.role) {
      case 'admin': return '/admin';
      case 'manager': return '/manager';
      case 'cashier': return '/cashier';
      case 'staff': return '/kitchen';
      case 'customer': return '/profile';
      default: return '/profile';
    }
  };

  return (
    <div className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Colorful manga speed lines from center */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
        background: `
          repeating-conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 2deg,
            rgba(186,85,211,0.5) 2deg,
            rgba(186,85,211,0.5) 3deg,
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
          backgroundImage: 'radial-gradient(circle, #ba55d3 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="border-8 border-gray-900 p-12 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden transform rotate-1" style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          filter: 'url(#roughEdges)'
        }}>
          {/* Colorful manga speed lines in background */}
          <div className="absolute inset-0 opacity-10">
            <div style={{
              background: `
                repeating-conic-gradient(
                  from 0deg at 50% 50%,
                  transparent 0deg,
                  transparent 3deg,
                  rgba(255,215,0,0.6) 3deg,
                  rgba(255,215,0,0.6) 4deg,
                  transparent 4deg,
                  transparent 7deg,
                  rgba(255,105,180,0.6) 7deg,
                  rgba(255,105,180,0.6) 8deg
                )
              `
            }}></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6" style={{
              textShadow: '5px 5px 0px rgba(0,0,0,1)',
              WebkitTextStroke: '2px black',
              paintOrder: 'stroke fill',
              background: 'linear-gradient(135deg, #ffd700 0%, #ffeb3b 50%, #ff69b4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {user ? 'Ready to Order?' : 'Save Time, Skip the Line!'}
            </h2>
            <p className="text-lg sm:text-xl text-gray-900 mb-10 max-w-2xl mx-auto font-bold">
              {user
                ? 'Browse our menu and place your order now. Your favorites are waiting!'
                : 'Create an account to save your favorites and reorder in seconds. No more waiting!'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => navigate('/order')}
                className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 border-4 border-gray-900 text-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:scale-110 hover:-rotate-2 font-black text-lg uppercase tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, #ffd700 0%, #ffeb3b 50%, #ff69b4 100%)',
                  filter: 'url(#roughEdges)'
                }}
              >
                Browse Menu
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                {/* Star burst accent */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 border-2 border-gray-900 animate-pulse" style={{
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                }}></div>
              </button>
              <button
                onClick={() => navigate(getDashboardRoute())}
                className="relative inline-flex items-center justify-center gap-2 px-10 py-5 border-4 border-gray-900 text-gray-900 bg-white hover:bg-gray-100 transition-all transform hover:scale-110 hover:rotate-2 font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] uppercase tracking-wide"
                style={{ filter: 'url(#roughEdges)' }}
              >
                {user ? 'My Account' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
