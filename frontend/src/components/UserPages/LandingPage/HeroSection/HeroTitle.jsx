/**
 * Hero Title Component
 * Manga-style dramatic title with focus lines
 */
const HeroTitle = () => {
  return (
    <div className="relative">
      {/* Manga panel corner markers - hand-drawn style */}
      <div className="absolute -top-8 -left-8 w-16 h-16 border-l-4 border-t-4 border-gray-900 opacity-30" style={{ filter: 'url(#sketch)' }}></div>
      <div className="absolute -top-8 -right-8 w-16 h-16 border-r-4 border-t-4 border-gray-900 opacity-30" style={{ filter: 'url(#sketch)' }}></div>

      {/* Hand-drawn scribble underline - very subtle */}
      <svg className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-full h-8 opacity-20" viewBox="0 0 400 20" preserveAspectRatio="none">
        <path d="M 5 15 Q 100 12, 200 14 T 395 15" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="text-gray-900" />
      </svg>

      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 sm:mb-8 leading-tight transform -rotate-1 relative" style={{
        textShadow: `
          4px 4px 0px rgba(0,0,0,1),
          6px 6px 0px rgba(0,0,0,0.3)
        `,
        letterSpacing: '-0.03em',
        WebkitTextStroke: '2px black',
        paintOrder: 'stroke fill'
      }}>
        Order Now,
        <span className="block relative mt-4 transform rotate-2">
          {/* Manga speed lines behind text */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div style={{
              background: 'repeating-linear-gradient(90deg, black 0px, black 3px, transparent 3px, transparent 8px)',
              height: '100%',
              transform: 'skewX(-20deg)'
            }}></div>
          </div>

          <span className="relative z-10 px-6 py-2 inline-block" style={{
            background: 'linear-gradient(135deg, #fef08a 0%, #fde047 50%, #facc15 100%)',
            WebkitTextStroke: '3px black',
            boxShadow: '0 0 0 4px black, 8px 8px 0 0 black'
          }}>
            Pick Up Fast!
          </span>

          {/* Manga action burst */}
          <div className="absolute -right-8 -top-8 w-16 h-16" style={{
            background: 'radial-gradient(circle, #fde047 0%, #facc15 50%, transparent 70%)',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
          }}></div>
        </span>
      </h1>

      {/* Manga focus lines effect */}
      <div className="absolute -inset-12 opacity-10 pointer-events-none">
        <div style={{
          background: `
            repeating-radial-gradient(circle at center,
              transparent 0px,
              transparent 30px,
              rgba(0,0,0,0.3) 30px,
              rgba(0,0,0,0.3) 32px
            )
          `
        }}></div>
      </div>
    </div>
  );
};

export default HeroTitle;
