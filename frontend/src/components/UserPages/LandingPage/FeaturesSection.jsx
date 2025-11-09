import React from 'react';
import { Zap, Clock, Shield, Heart } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

/**
 * Features section component highlighting key benefits
 */
const FeaturesSection = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: Zap,
      title: 'Quick Ordering',
      description: 'Order in seconds with our simple interface',
      gradient: 'linear-gradient(135deg, #ffd700 0%, #ffeb3b 100%)', // Gold-yellow
      shadowColor: 'rgba(255,215,0,0.5)'
    },
    {
      icon: Clock,
      title: 'Fast Delivery',
      description: 'Get your food ready in minutes',
      gradient: 'linear-gradient(135deg, #ff6b9d 0%, #ff1744 100%)', // Pink-red
      shadowColor: 'rgba(255,105,180,0.5)'
    },
    {
      icon: Shield,
      title: 'Quality Food',
      description: 'Fresh ingredients, prepared daily',
      gradient: 'linear-gradient(135deg, #4dd0e1 0%, #0091ea 100%)', // Cyan-blue
      shadowColor: 'rgba(135,206,250,0.5)'
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Crafted by our experienced chefs',
      gradient: 'linear-gradient(135deg, #ba55d3 0%, #9c27b0 100%)', // Purple-violet
      shadowColor: 'rgba(186,85,211,0.5)'
    }
  ];

  return (
    <div id="features" className="relative py-20 px-4 sm:px-6 overflow-hidden" style={{
      background: theme === 'dark'
        ? 'linear-gradient(135deg, #0d1b2a 0%, #1e293b 50%, #16213e 100%)'
        : 'linear-gradient(135deg, #fff9c4 0%, #ffe4e1 50%, #e0f7fa 100%)'
    }}>
      {/* Colorful manga speed lines from center */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
        background: `
          repeating-conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 2deg,
            rgba(255,215,0,0.5) 2deg,
            rgba(255,215,0,0.5) 3deg,
            transparent 3deg,
            transparent 5deg,
            rgba(255,105,180,0.5) 5deg,
            rgba(255,105,180,0.5) 6deg,
            transparent 6deg,
            transparent 8deg,
            rgba(186,85,211,0.5) 8deg,
            rgba(186,85,211,0.5) 9deg,
            transparent 9deg,
            transparent 11deg,
            rgba(135,206,250,0.5) 11deg,
            rgba(135,206,250,0.5) 12deg
          )
        `
      }}></div>

      {/* Manga halftone background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div style={{
          backgroundImage: 'radial-gradient(circle, #87ceeb 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 relative inline-block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} style={{
            textShadow: theme === 'dark'
              ? '4px 4px 0px rgba(186,85,211,0.7)'
              : '4px 4px 0px rgba(255,182,193,0.5)',
            WebkitTextStroke: theme === 'dark' ? '2px white' : '2px black',
            paintOrder: 'stroke fill'
          }}>
            <span className="relative z-10 px-4" style={{
              background: theme === 'dark'
                ? 'linear-gradient(to right, #ba55d3, #9c27b0)'
                : 'linear-gradient(to right, #ffd6e8, #ffb3d9)',
            }}>
              Why Choose Us
            </span>
            {/* Manga underline scribble */}
            <div className={`absolute -bottom-2 left-0 right-0 h-2 border-b-4 transform -rotate-1 ${theme === 'dark' ? 'border-white' : 'border-gray-900'}`}></div>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto font-bold mt-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
            We're committed to providing the best food experience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`text-center group hover:transform hover:scale-110 transition-all relative ${index % 2 === 0 ? 'hover:rotate-3' : 'hover:-rotate-3'}`}
            >
              {/* Feature card with border */}
              <div className="bg-white border-4 border-gray-900 p-6 transition-all" style={{
                boxShadow: `4px 4px 0px 0px rgba(0,0,0,1), 6px 6px 0px 0px ${feature.shadowColor}`
              }}>
                {/* Colorful icon container */}
                <div className="inline-flex items-center justify-center w-20 h-20 border-4 border-gray-900 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] relative" style={{
                  background: feature.gradient
                }}>
                  <feature.icon className="w-10 h-10 text-white" strokeWidth={3} />

                  {/* Star burst on icon */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-300 border-2 border-gray-900 opacity-0 group-hover:opacity-100 transition-opacity" style={{
                    clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                  }}></div>
                </div>

                <h3 className="text-xl font-black mb-3 uppercase tracking-wide text-gray-900" style={{
                  textShadow: '2px 2px 0px rgba(255,255,255,0.5)'
                }}>
                  {feature.title}
                </h3>
                <p className="font-bold text-sm text-gray-900">{feature.description}</p>

                {/* Manga speed lines on hover */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ animationDelay: '0.1s' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
