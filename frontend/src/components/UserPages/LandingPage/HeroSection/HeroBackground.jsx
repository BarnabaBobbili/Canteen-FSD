/**
 * Hero Background Component
 * Manga-style decorative background elements
 */
const HeroBackground = () => {
  return (
    <>
      {/* Colorful manga speed lines radiating from center */}
      <div className="absolute inset-0 overflow-hidden opacity-12">
        <div className="absolute top-1/2 left-1/2 w-full h-full" style={{
          background: `
            repeating-conic-gradient(
              from 0deg at 0% 0%,
              transparent 0deg,
              transparent 3deg,
              rgba(255,105,180,0.3) 3deg,
              rgba(255,105,180,0.3) 4deg,
              transparent 4deg,
              transparent 7deg,
              rgba(135,206,250,0.3) 7deg,
              rgba(135,206,250,0.3) 8deg
            )
          `,
          transform: 'translate(-50%, -50%) scale(2)'
        }}></div>
      </div>

      {/* Colorful manga action word "YUMMY!" in background */}
      <div className="absolute top-20 right-10 opacity-8 transform rotate-12 hidden lg:block">
        <div style={{
          fontSize: '120px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #ff6b9d 0%, #ffa07a 50%, #ffd700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          WebkitTextStroke: '4px rgba(255,105,180,0.5)',
          filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.1))',
          letterSpacing: '10px'
        }}>
          YUMMY!
        </div>
      </div>

      {/* Colorful manga action word "うまい!" (Delicious!) */}
      <div className="absolute bottom-40 left-10 opacity-8 transform -rotate-12 hidden lg:block">
        <div style={{
          fontSize: '100px',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #87ceeb 0%, #98d8c8 50%, #b19cd9 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          WebkitTextStroke: '4px rgba(135,206,250,0.5)',
          filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.1))',
          letterSpacing: '5px'
        }}>
          うまい!
        </div>
      </div>

      {/* Colorful manga screentone patterns */}
      <div className="absolute top-1/4 right-1/4 w-48 h-48 opacity-15" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,182,193,0.6) 0px, rgba(255,182,193,0.6) 2px, transparent 2px, transparent 8px)',
      }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-56 h-56 opacity-15" style={{
        backgroundImage: 'radial-gradient(circle, rgba(176,224,230,0.6) 1.5px, transparent 1.5px)',
        backgroundSize: '12px 12px'
      }}></div>

      {/* Floating colorful manga stars */}
      <div className="absolute top-32 left-1/4 w-16 h-16 opacity-30 animate-pulse" style={{
        background: 'radial-gradient(circle, #ffd700 0%, #ffb6c1 100%)',
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        filter: 'blur(2px)'
      }}></div>
      <div className="absolute bottom-32 right-1/4 w-12 h-12 opacity-30 animate-pulse" style={{
        background: 'radial-gradient(circle, #87ceeb 0%, #dda0dd 100%)',
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        filter: 'blur(2px)',
        animationDelay: '0.5s'
      }}></div>
    </>
  );
};

export default HeroBackground;
