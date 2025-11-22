import { TrendingUp } from 'lucide-react';

/**
 * Hero Stats Component
 * Manga panel-style stats with dramatic effects
 */
const HeroStats = () => {
  const stats = [
    {
      value: '50+',
      label: 'Menu Items',
      gradient: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 30%, #ffc0cb 60%, #ffb6c1 100%)',
      starGradient: 'radial-gradient(circle, #ff6b9d 0%, #ff1493 100%)',
      rotation: '-rotate-3',
      screentone: 'repeating-linear-gradient(-45deg, #000 0px, #000 2px, transparent 2px, transparent 10px)',
      emphasisDirection: 'top-2 right-2',
      emphasisRotation: '-rotate-45',
      starPosition: '-top-3 -right-3'
    },
    {
      value: '1000+',
      label: 'Happy Students',
      gradient: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 30%, #80deea 60%, #4dd0e1 100%)',
      starGradient: 'radial-gradient(circle, #87ceeb 0%, #4169e1 100%)',
      rotation: 'rotate-2',
      screentone: 'radial-gradient(circle, #000 1px, transparent 1px)',
      screentoneSize: '8px 8px',
      emphasisDirection: 'bottom-2 left-2',
      emphasisRotation: 'rotate-45',
      starPosition: '-top-3 -left-3'
    },
    {
      value: '4.9',
      label: 'Rating',
      gradient: 'linear-gradient(135deg, #fff9c4 0%, #fff176 30%, #ffeb3b 60%, #fdd835 100%)',
      starGradient: 'radial-gradient(circle, #ffd700 0%, #ff8c00 100%)',
      rotation: '-rotate-2',
      screentone: 'repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 10px)',
      emphasisDirection: 'bottom-2 right-2',
      emphasisRotation: 'rotate-45',
      starPosition: '-bottom-3 -right-3',
      showIcon: true
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-16 relative px-4">
      {/* Manga panel borders - sketchy */}
      <div className="absolute -inset-4 border-4 border-gray-900 opacity-20 pointer-events-none" style={{ filter: 'url(#sketch)' }}></div>
      <div className="absolute -top-6 -left-6 w-12 h-12 border-l-4 border-t-4 border-gray-900 opacity-50" style={{ filter: 'url(#sketch)' }}></div>
      <div className="absolute -bottom-6 -right-6 w-12 h-12 border-r-4 border-b-4 border-gray-900 opacity-50" style={{ filter: 'url(#sketch)' }}></div>

      {/* Hand-drawn arrows between stats - subtle */}
      <svg className="absolute top-1/2 left-1/3 w-24 h-12 hidden sm:block opacity-15" viewBox="0 0 100 50">
        <path d="M 10 25 Q 50 20, 85 25" stroke="black" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" />
      </svg>
      <svg className="absolute top-1/2 right-1/3 w-24 h-12 hidden sm:block opacity-15" viewBox="0 0 100 50">
        <path d="M 10 25 Q 50 30, 85 25" stroke="black" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)" />
      </svg>

      {stats.map((stat, index) => (
        <div key={index} className={`relative text-center p-4 sm:p-6 border-3 sm:border-4 border-gray-900 transform ${stat.rotation} hover:rotate-0 transition-all z-10`} style={{
          background: stat.gradient,
          boxShadow: '6px 6px 0px 0px rgba(0,0,0,1), 8px 8px 0px 0px rgba(255,105,180,0.5), 10px 10px 0px 0px rgba(255,182,193,0.3)',
          filter: 'url(#roughEdges)'
        }}>
          {/* Manga screentone background */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.08] overflow-hidden">
            <div style={{
              background: stat.screentone,
              backgroundSize: stat.screentoneSize || 'auto'
            }}></div>
          </div>

          {/* Manga emphasis lines */}
          <div className={`absolute ${stat.emphasisDirection} w-8 h-8 opacity-30`}>
            <div className={`absolute top-0 right-0 w-full border-t-2 border-gray-900 transform ${stat.emphasisRotation}`}></div>
            <div className={`absolute top-2 right-0 w-full border-t-2 border-gray-900 transform ${stat.emphasisRotation}`}></div>
            <div className={`absolute top-4 right-0 w-full border-t-2 border-gray-900 transform ${stat.emphasisRotation}`}></div>
          </div>

          <div className="relative text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 flex items-center gap-2 justify-center mb-2" style={{
            textShadow: '4px 4px 0px rgba(255,255,255,1), 5px 5px 0px rgba(0,0,0,0.3)',
            WebkitTextStroke: '2px black',
            paintOrder: 'stroke fill'
          }}>
            {stat.value}
            {stat.showIcon && <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" strokeWidth={3} />}
          </div>
          <div className="text-xs sm:text-sm font-black text-gray-700 uppercase tracking-widest">{stat.label}</div>

          {/* Colorful manga star burst */}
          <div className={`absolute ${stat.starPosition} w-8 h-8 border-2 border-gray-900`} style={{
            background: stat.starGradient,
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }}></div>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
