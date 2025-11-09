import React from 'react';
import { UtensilsCrossed, ShoppingCart, Star } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

/**
 * How It Works section showing the ordering process
 */
const HowItWorksSection = () => {
  const { theme } = useTheme();

  const steps = [
    {
      number: '01',
      title: 'Browse Menu',
      description: 'Explore our delicious menu with various categories',
      icon: UtensilsCrossed
    },
    {
      number: '02',
      title: 'Place Order',
      description: 'Select your favorites and place your order',
      icon: ShoppingCart
    },
    {
      number: '03',
      title: 'Enjoy Food',
      description: 'Pick up your order and enjoy!',
      icon: Star
    }
  ];

  const cardGradients = [
    'linear-gradient(135deg, #ffd6e8 0%, #ffb3d9 100%)', // Pink
    'linear-gradient(135deg, #b3e5fc 0%, #81d4fa 100%)', // Blue
    'linear-gradient(135deg, #fff9c4 0%, #ffeb3b 100%)'  // Yellow
  ];

  const iconGradients = [
    'linear-gradient(135deg, #ff6b9d 0%, #ff1744 100%)', // Hot pink-red
    'linear-gradient(135deg, #4dd0e1 0%, #0091ea 100%)', // Cyan-blue
    'linear-gradient(135deg, #ffd700 0%, #ff6f00 100%)'  // Gold-orange
  ];

  return (
    <div id="how-it-works" className="relative py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Hand-drawn process doodles background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        {/* Clock doodle */}
        <svg className="absolute top-20 left-20 w-24 h-24" viewBox="0 0 100 100" style={{ filter: 'url(#sketch)' }}>
          <circle cx="50" cy="50" r="35" stroke="black" strokeWidth="2" fill="none" />
          <circle cx="50" cy="50" r="3" fill="black" />
          <path d="M 50 50 L 50 25" stroke="black" strokeWidth="2.5" fill="none" />
          <path d="M 50 50 L 65 50" stroke="black" strokeWidth="2" fill="none" />
          <text x="50" y="20" fontSize="12" textAnchor="middle" fill="black">12</text>
          <text x="80" y="55" fontSize="12" textAnchor="middle" fill="black">3</text>
          <text x="50" y="85" fontSize="12" textAnchor="middle" fill="black">6</text>
          <text x="20" y="55" fontSize="12" textAnchor="middle" fill="black">9</text>
        </svg>

        {/* Shopping bag doodle */}
        <svg className="absolute top-1/3 right-16 w-28 h-28" viewBox="0 0 100 100" style={{ filter: 'url(#sketch)' }}>
          <rect x="25" y="35" width="50" height="55" rx="5" stroke="black" strokeWidth="2" fill="none" />
          <path d="M 35 35 Q 35 20, 50 20 Q 65 20, 65 35" stroke="black" strokeWidth="2" fill="none" />
          <circle cx="40" cy="50" r="2" fill="black" />
          <circle cx="60" cy="50" r="2" fill="black" />
        </svg>

        {/* Thumbs up doodle */}
        <svg className="absolute bottom-28 left-1/4 w-24 h-28" viewBox="0 0 100 100" style={{ filter: 'url(#sketch)' }}>
          <path d="M 40 60 L 40 90 L 60 90 L 60 60 M 50 60 L 50 40 Q 50 25, 60 25 Q 65 25, 65 30 L 65 60" stroke="black" strokeWidth="2" fill="none" />
          <rect x="60" y="60" width="15" height="30" stroke="black" strokeWidth="2" fill="none" />
        </svg>

        {/* Checkmark in circle */}
        <svg className="absolute top-1/2 left-12 w-20 h-20" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="35" stroke="black" strokeWidth="2.5" fill="none" style={{ filter: 'url(#sketch)' }} />
          <path d="M 30 50 L 45 65 L 75 35" stroke="black" strokeWidth="3" fill="none" style={{ filter: 'url(#sketch)' }} />
        </svg>

        {/* Phone/device doodle */}
        <svg className="absolute bottom-20 right-24 w-20 h-28" viewBox="0 0 100 100" style={{ filter: 'url(#sketch)' }}>
          <rect x="30" y="10" width="40" height="80" rx="5" stroke="black" strokeWidth="2" fill="none" />
          <circle cx="50" cy="82" r="3" fill="black" />
          <rect x="35" y="15" width="30" height="55" stroke="black" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Dotted arrow path */}
        <svg className="absolute top-40 right-1/3 w-48 h-24" viewBox="0 0 150 80">
          <path d="M 10 40 Q 50 20, 90 40 T 140 40" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" markerEnd="url(#arrowhead)" style={{ filter: 'url(#sketch)' }} />
        </svg>

        {/* Star burst */}
        <svg className="absolute bottom-1/3 right-12 w-20 h-20" viewBox="0 0 100 100">
          <path d="M 50 10 L 55 40 L 85 45 L 60 60 L 65 90 L 50 75 L 35 90 L 40 60 L 15 45 L 45 40 Z" stroke="black" strokeWidth="2" fill="none" style={{ filter: 'url(#sketch)' }} />
        </svg>

        {/* Scribble circles */}
        <svg className="absolute top-2/3 left-1/3 w-24 h-24" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="30" stroke="black" strokeWidth="1.5" fill="none" style={{ filter: 'url(#sketch)' }} />
          <circle cx="50" cy="50" r="20" stroke="black" strokeWidth="1.5" fill="none" style={{ filter: 'url(#sketch)' }} />
        </svg>
      </div>

      {/* Colorful manga speed lines from center */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
        background: `
          repeating-conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 2deg,
            rgba(135,206,250,0.5) 2deg,
            rgba(135,206,250,0.5) 3deg,
            transparent 3deg,
            transparent 5deg,
            rgba(255,215,0,0.5) 5deg,
            rgba(255,215,0,0.5) 6deg,
            transparent 6deg,
            transparent 8deg,
            rgba(255,105,180,0.5) 8deg,
            rgba(255,105,180,0.5) 9deg
          )
        `
      }}></div>

      {/* Manga halftone background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div style={{
          backgroundImage: 'radial-gradient(circle, #ff69b4 1.5px, transparent 1.5px)',
          backgroundSize: '25px 25px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 relative inline-block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{
            textShadow: theme === 'dark'
              ? '4px 4px 0px rgba(0,191,255,0.7)'
              : '4px 4px 0px rgba(255,182,193,0.5)',
            WebkitTextStroke: theme === 'dark' ? '2px white' : '2px black',
            paintOrder: 'stroke fill'
          }}>
            <span className="relative z-10 px-4" style={{
              background: theme === 'dark'
                ? 'linear-gradient(to right, #00bfff, #00e5ff)'
                : 'linear-gradient(to right, #b3e5fc, #81d4fa)',
            }}>
              How It Works
            </span>
            {/* Manga underline scribble */}
            <div className={`absolute -bottom-2 left-0 right-0 h-2 border-b-4 transform rotate-1 ${theme === 'dark' ? 'border-white' : 'border-gray-900'}`}></div>
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto font-bold mt-4 sm:mt-6 mb-8 sm:mb-12 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
            Three simple steps to get your delicious meal
          </p>
        </div>

        {/* Simple grid layout - SKETCHY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative border-3 sm:border-4 border-gray-900 rounded-[30px] sm:rounded-[40px] p-6 sm:p-8 group cursor-pointer hover:translate-y-[-8px] transition-all duration-300"
              style={{
                background: cardGradients[index % 3],
                boxShadow: `
                  6px 6px 0px 0px rgba(0,0,0,1),
                  8px 8px 0px 0px ${
                    index === 0 ? 'rgba(255,105,180,0.6)' :
                    index === 1 ? 'rgba(135,206,250,0.6)' :
                    'rgba(255,215,0,0.6)'
                  },
                  0 10px 30px rgba(0,0,0,0.15)
                `,
                filter: 'url(#roughEdges)'
              }}
            >
              <div className="flex flex-col items-center text-center">
                  {/* Manga number badge */}
                  <div className="text-3xl sm:text-4xl font-black mb-2 relative" style={{
                    textShadow: '3px 3px 0px rgba(0,0,0,1)',
                    WebkitTextStroke: '2px black',
                    paintOrder: 'stroke fill',
                    background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'white'
                  }}>
                    {step.number}
                    {/* Star burst accent */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-300 border-2 border-gray-900 animate-pulse" style={{
                      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                    }}></div>
                  </div>

                  {/* Colorful icon container */}
                  <div className="p-2 border-3 sm:border-4 border-gray-900 mb-2 group-hover:scale-125 group-hover:rotate-12 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]" style={{
                    background: iconGradients[index]
                  }}>
                    <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={3} />
                  </div>

                  <h3 className="text-base sm:text-lg font-black mb-1 uppercase tracking-wide text-gray-900" style={{
                    textShadow: '2px 2px 0px rgba(255,255,255,0.5)'
                  }}>
                    {step.title}
                  </h3>
                <p className="font-bold text-xs sm:text-sm text-gray-900">{step.description}</p>
              </div>

              {/* Manga sparkle on hover */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-white opacity-0 group-hover:opacity-100 transition-opacity border-2 border-gray-900" style={{
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
              }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
