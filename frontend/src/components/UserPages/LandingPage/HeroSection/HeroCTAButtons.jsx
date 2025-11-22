import { ArrowRight } from 'lucide-react';

/**
 * Hero CTA Buttons Component
 * Manga-style action buttons with dramatic effects
 */
const HeroCTAButtons = ({ user, onOrderClick, onSignInClick }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mb-8 sm:mb-12 relative px-4">
      {/* Manga impact lines behind buttons */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div style={{
          background: `
            repeating-conic-gradient(
              from 45deg at 50% 50%,
              transparent 0deg,
              transparent 8deg,
              black 8deg,
              black 10deg
            )
          `,
          transform: 'scale(1.5)'
        }}></div>
      </div>

      <button
        onClick={onOrderClick}
        className="group relative flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-12 py-4 sm:py-6 text-white border-3 sm:border-4 border-gray-900 transition-all transform hover:scale-110 hover:-rotate-3 font-black text-lg sm:text-2xl uppercase tracking-wider z-10"
        style={{
          background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8fab 25%, #ffa07a 50%, #ffb347 75%, #ffd700 100%)',
          boxShadow: '6px 6px 0px 0px rgba(0,0,0,1), 8px 8px 0px 2px rgba(255,105,180,0.8), 10px 10px 0px 4px rgba(255,215,0,0.6)',
          filter: 'url(#roughEdges)'
        }}
      >
        {/* Colorful manga star burst effects */}
        <div className="absolute -top-4 -right-4 w-12 h-12 border-3 border-gray-900 animate-pulse" style={{
          background: 'radial-gradient(circle, #ffeb3b 0%, #ffc107 50%, #ff6b9d 100%)',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
        }}></div>
        <div className="absolute -bottom-4 -left-4 w-10 h-10 border-3 border-gray-900" style={{
          background: 'radial-gradient(circle, #87ceeb 0%, #b19cd9 50%, #ff6b9d 100%)',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}></div>

        {/* Manga speed lines on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity overflow-hidden">
          <div style={{
            background: 'repeating-linear-gradient(90deg, white 0px, white 2px, transparent 2px, transparent 6px)',
            height: '100%',
            transform: 'skewX(-15deg)'
          }}></div>
        </div>

        <span className="relative z-10">Order Now</span>
        <ArrowRight className="relative z-10 w-7 h-7 group-hover:translate-x-3 transition-transform" strokeWidth={4} />

        {/* Manga action word */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div style={{
            fontSize: '20px',
            fontWeight: '900',
            color: 'black',
            textShadow: '2px 2px 0px white',
            WebkitTextStroke: '1px black',
            whiteSpace: 'nowrap'
          }}>
            GO!
          </div>
        </div>
      </button>

      {!user && (
        <button
          onClick={onSignInClick}
          className="relative px-8 sm:px-12 py-4 sm:py-6 border-3 sm:border-4 border-gray-900 text-gray-900 transition-all transform hover:rotate-3 hover:scale-110 font-black text-lg sm:text-2xl uppercase tracking-wider z-10"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f8ff 20%, #e6e6fa 40%, #d8bfd8 60%, #dda0dd 80%, #ee82ee 100%)',
            boxShadow: '6px 6px 0px 0px rgba(0,0,0,1), 8px 8px 0px 2px rgba(221,160,221,0.6), 10px 10px 0px 4px rgba(238,130,238,0.4)',
            filter: 'url(#roughEdges)'
          }}
        >
          Sign In
          {/* Colorful manga emphasis marks */}
          <div className="absolute -top-3 -right-3 w-6 h-6 transform rotate-45" style={{
            background: 'linear-gradient(135deg, #ff6b9d 0%, #c71585 100%)'
          }}></div>
          <div className="absolute -top-3 -left-3 w-6 h-6 transform rotate-45" style={{
            background: 'linear-gradient(135deg, #87ceeb 0%, #4682b4 100%)'
          }}></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 transform rotate-45" style={{
            background: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)'
          }}></div>
        </button>
      )}
    </div>
  );
};

export default HeroCTAButtons;
