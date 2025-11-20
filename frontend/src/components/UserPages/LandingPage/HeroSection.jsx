import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

/**
 * Hero section component for landing page
 */
const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-20 overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center items-center">
          {/* Hero Content */}
          <div className="text-center max-w-4xl">
            {/* Colorful manga-style badge with speech bubble effect - SKETCHY */}
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

            {/* Manga-style dramatic title with focus lines - SKETCHY */}
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

            {/* Comic-style speech bubble for description - SKETCHY */}
            <div className="relative inline-block mb-8 sm:mb-10 p-4 sm:p-6 bg-white border-3 sm:border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-1 max-w-2xl mx-4" style={{ filter: 'url(#roughEdges)' }}>
              <p className="text-base sm:text-lg md:text-xl font-bold leading-relaxed" style={{ color: '#1a202c' }}>
                Skip the line! Order ahead and grab your food when it's ready. Fresh, hot, and waiting for you.
              </p>
              {/* Comic action lines in corners - sketchy */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-gray-900" style={{ filter: 'url(#sketch)' }}></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-gray-900" style={{ filter: 'url(#sketch)' }}></div>

              {/* Hand-drawn circle around text - subtle */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" viewBox="0 0 300 150">
                <ellipse cx="150" cy="75" rx="145" ry="70" stroke="black" strokeWidth="1" fill="none" strokeDasharray="5,5" />
              </svg>
            </div>

            {/* Manga-style action buttons with dramatic effects */}
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
                onClick={() => navigate('/order')}
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
                  onClick={() => navigate('/login')}
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

            {/* Manga panel-style stats with dramatic effects - SKETCHY */}
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

              <div className="relative text-center p-4 sm:p-6 border-3 sm:border-4 border-gray-900 transform -rotate-3 hover:rotate-0 transition-all z-10" style={{
                background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 30%, #ffc0cb 60%, #ffb6c1 100%)',
                boxShadow: '6px 6px 0px 0px rgba(0,0,0,1), 8px 8px 0px 0px rgba(255,105,180,0.5), 10px 10px 0px 0px rgba(255,182,193,0.3)',
                filter: 'url(#roughEdges)'
              }}>
                {/* Manga screentone background */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.08] overflow-hidden">
                  <div style={{
                    background: 'repeating-linear-gradient(-45deg, #000 0px, #000 2px, transparent 2px, transparent 10px)'
                  }}></div>
                </div>
                {/* Manga emphasis lines */}
                <div className="absolute top-2 right-2 w-8 h-8 opacity-30">
                  <div className="absolute top-0 right-0 w-full border-t-2 border-gray-900 transform -rotate-45"></div>
                  <div className="absolute top-2 right-0 w-full border-t-2 border-gray-900 transform -rotate-45"></div>
                  <div className="absolute top-4 right-0 w-full border-t-2 border-gray-900 transform -rotate-45"></div>
                </div>

                <div className="relative text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-2" style={{
                  textShadow: '4px 4px 0px rgba(255,255,255,1), 5px 5px 0px rgba(0,0,0,0.3)',
                  WebkitTextStroke: '2px black',
                  paintOrder: 'stroke fill'
                }}>50+</div>
                <div className="text-xs sm:text-sm font-black text-gray-700 uppercase tracking-widest">Menu Items</div>

                {/* Colorful manga star burst */}
                <div className="absolute -top-3 -right-3 w-8 h-8 border-2 border-gray-900" style={{
                  background: 'radial-gradient(circle, #ff6b9d 0%, #ff1493 100%)',
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                }}></div>
              </div>

              <div className="relative text-center p-4 sm:p-6 border-3 sm:border-4 border-gray-900 transform rotate-3 hover:rotate-0 transition-all z-10" style={{
                background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 30%, #80deea 60%, #4dd0e1 100%)',
                boxShadow: '6px 6px 0px 0px rgba(0,0,0,1), 8px 8px 0px 0px rgba(77,208,225,0.5), 10px 10px 0px 0px rgba(129,212,250,0.3)',
                filter: 'url(#roughEdges)'
              }}>
                {/* Manga dot screentone */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.08] overflow-hidden">
                  <div style={{
                    backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)',
                    backgroundSize: '12px 12px'
                  }}></div>
                </div>
                <div className="absolute top-2 left-2 w-8 h-8 opacity-30">
                  <div className="absolute top-0 left-0 w-full border-t-2 border-gray-900 transform rotate-45"></div>
                  <div className="absolute top-2 left-0 w-full border-t-2 border-gray-900 transform rotate-45"></div>
                  <div className="absolute top-4 left-0 w-full border-t-2 border-gray-900 transform rotate-45"></div>
                </div>

                <div className="relative text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-2" style={{
                  textShadow: '4px 4px 0px rgba(255,255,255,1), 5px 5px 0px rgba(0,0,0,0.3)',
                  WebkitTextStroke: '2px black',
                  paintOrder: 'stroke fill'
                }}>5min</div>
                <div className="text-xs sm:text-sm font-black text-gray-700 uppercase tracking-widest">Avg Wait Time</div>

                {/* Colorful manga star burst */}
                <div className="absolute -top-3 -left-3 w-8 h-8 border-2 border-gray-900" style={{
                  background: 'radial-gradient(circle, #87ceeb 0%, #4169e1 100%)',
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                }}></div>
              </div>

              <div className="relative text-center p-4 sm:p-6 border-3 sm:border-4 border-gray-900 transform -rotate-2 hover:rotate-0 transition-all z-10" style={{
                background: 'linear-gradient(135deg, #fff9c4 0%, #fff176 30%, #ffeb3b 60%, #fdd835 100%)',
                boxShadow: '6px 6px 0px 0px rgba(0,0,0,1), 8px 8px 0px 0px rgba(253,216,53,0.5), 10px 10px 0px 0px rgba(255,235,59,0.3)',
                filter: 'url(#roughEdges)'
              }}>
                {/* Manga gradient screentone */}
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.08] overflow-hidden">
                  <div style={{
                    background: 'repeating-linear-gradient(45deg, #000 0px, #000 2px, transparent 2px, transparent 10px)'
                  }}></div>
                </div>
                <div className="absolute bottom-2 right-2 w-8 h-8 opacity-30">
                  <div className="absolute bottom-0 right-0 w-full border-b-2 border-gray-900 transform rotate-45"></div>
                  <div className="absolute bottom-2 right-0 w-full border-b-2 border-gray-900 transform rotate-45"></div>
                  <div className="absolute bottom-4 right-0 w-full border-b-2 border-gray-900 transform rotate-45"></div>
                </div>

                <div className="relative text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 flex items-center gap-2 justify-center mb-2" style={{
                  textShadow: '4px 4px 0px rgba(255,255,255,1), 5px 5px 0px rgba(0,0,0,0.3)',
                  WebkitTextStroke: '2px black',
                  paintOrder: 'stroke fill'
                }}>
                  4.9
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" strokeWidth={3} />
                </div>
                <div className="text-xs sm:text-sm font-black text-gray-700 uppercase tracking-widest">Rating</div>

                {/* Colorful manga star burst */}
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-2 border-gray-900" style={{
                  background: 'radial-gradient(circle, #ffd700 0%, #ff8c00 100%)',
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
