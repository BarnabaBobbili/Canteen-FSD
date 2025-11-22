import { Sparkles } from 'lucide-react';

/**
 * Hero Badge Component
 * Manga-style badge with speech bubble effect
 */
const HeroBadge = () => {
  return (
    <div className="relative inline-flex items-center gap-2 border-3 sm:border-4 border-gray-900 px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6 transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" style={{
      background: 'linear-gradient(135deg, #ffeb3b 0%, #ffc107 50%, #ff9800 100%)',
      filter: 'url(#roughEdges)'
    }}>
      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 animate-pulse" style={{
        filter: 'drop-shadow(0 0 4px rgba(255,105,180,0.8))'
      }} />
      <span className="text-gray-900 font-black text-sm sm:text-base uppercase tracking-wider" style={{
        textShadow: '2px 2px 0px rgba(255,255,255,0.5)'
      }}>Fresh & Delicious</span>
      {/* Speech bubble tail with gradient */}
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"></div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent" style={{
        borderTopColor: '#ff9800'
      }}></div>
    </div>
  );
};

export default HeroBadge;
