import React, { useEffect } from 'react';
import BubbleMenu from './BubbleMenu';
import HeroSection from './HeroSection';
import SpecialsSection from './SpecialsSection';
import CategorySection from './CategorySection';
import HowItWorksSection from './HowItWorksSection';
import CTASection from './CTASection';
import Footer from '../Shared/Footer';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';

/**
 * Main landing page orchestrator
 * Composed of modular components following CLAUDE.md patterns
 * @refactored from 495 lines → 30 lines
 *
 * Auto-logs out staff members (admin, manager, cashier, staff) when they navigate to home page
 * This ensures staff can only access customer pages as customers, not while logged in as staff
 */
const LandingPage = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  // Auto-logout staff roles when they navigate to landing page
  useEffect(() => {
    if (user && ['admin', 'manager', 'cashier', 'staff'].includes(user.role)) {
      logout();
    }
  }, [user, logout]);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      fontFamily: '"Arial Black", "Hiragino Sans", sans-serif',
      background: theme === 'dark'
        ? `linear-gradient(135deg,
            #1a1a2e 0%,
            #16213e 25%,
            #0d1b2a 50%,
            #0f172a 75%,
            #1e293b 100%
          )`
        : `linear-gradient(135deg,
            #fff5f7 0%,
            #fffacd 25%,
            #e0f7fa 50%,
            #fce4ec 75%,
            #fff9c4 100%
          )`
    }}>
      {/* SVG Filters for very subtle sketchy effects */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {/* Very subtle sketch filter */}
          <filter id="sketch">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" />
          </filter>
          {/* Very light rough edge filter */}
          <filter id="roughEdges">
            <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="2" result="turbulence" />
            <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="1" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          {/* Pencil sketch texture */}
          <filter id="pencilSketch">
            <feTurbulence type="fractalNoise" baseFrequency="0.3" numOctaves="2" result="noise" />
            <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="0.3">
              <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
          </filter>
          {/* Marker definition for arrows */}
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10" fill="black" />
          </marker>
        </defs>
      </svg>
      {/* Colorful manga gradient overlays */}
      <div className={`fixed top-0 left-0 w-full h-1/3 pointer-events-none ${theme === 'dark' ? 'opacity-30' : 'opacity-20'}`} style={{
        background: theme === 'dark'
          ? 'radial-gradient(ellipse at top, rgba(255,20,147,0.8) 0%, transparent 70%)'
          : 'radial-gradient(ellipse at top, rgba(255,182,193,0.6) 0%, transparent 70%)'
      }}></div>
      <div className={`fixed bottom-0 right-0 w-full h-1/3 pointer-events-none ${theme === 'dark' ? 'opacity-30' : 'opacity-20'}`} style={{
        background: theme === 'dark'
          ? 'radial-gradient(ellipse at bottom right, rgba(0,191,255,0.8) 0%, transparent 70%)'
          : 'radial-gradient(ellipse at bottom right, rgba(135,206,250,0.6) 0%, transparent 70%)'
      }}></div>
      <div className={`fixed top-1/2 left-0 w-1/2 h-1/2 pointer-events-none ${theme === 'dark' ? 'opacity-25' : 'opacity-15'}`} style={{
        background: theme === 'dark'
          ? 'radial-gradient(ellipse at center, rgba(255,165,0,0.7) 0%, transparent 70%)'
          : 'radial-gradient(ellipse at center, rgba(255,218,185,0.5) 0%, transparent 70%)'
      }}></div>
      <div className={`fixed top-1/4 right-0 w-1/2 h-1/2 pointer-events-none ${theme === 'dark' ? 'opacity-25' : 'opacity-15'}`} style={{
        background: theme === 'dark'
          ? 'radial-gradient(ellipse at center, rgba(186,85,211,0.7) 0%, transparent 70%)'
          : 'radial-gradient(ellipse at center, rgba(216,191,216,0.5) 0%, transparent 70%)'
      }}></div>

      {/* Colored manga screentone patterns */}
      <div className={`fixed inset-0 pointer-events-none ${theme === 'dark' ? 'opacity-[0.08]' : 'opacity-[0.04]'}`} style={{
        backgroundImage: theme === 'dark'
          ? 'radial-gradient(circle at 25% 25%, #ff1493 1.5px, transparent 1.5px)'
          : 'radial-gradient(circle at 25% 25%, #ff69b4 1.5px, transparent 1.5px)',
        backgroundSize: '12px 12px'
      }}></div>

      {/* Colored manga speed lines */}
      <div className={`fixed inset-0 pointer-events-none ${theme === 'dark' ? 'opacity-[0.10]' : 'opacity-[0.05]'}`} style={{
        background: theme === 'dark'
          ? `repeating-conic-gradient(
              from 0deg at 50% 50%,
              transparent 0deg,
              transparent 2deg,
              rgba(255,20,147,0.6) 2deg,
              rgba(255,20,147,0.6) 3deg
            )`
          : `repeating-conic-gradient(
              from 0deg at 50% 50%,
              transparent 0deg,
              transparent 2deg,
              rgba(255,182,193,0.4) 2deg,
              rgba(255,182,193,0.4) 3deg
            )`
      }}></div>

      {/* Manga sparkle effects - colorful dots */}
      <div className={`fixed inset-0 pointer-events-none ${theme === 'dark' ? 'opacity-40' : 'opacity-20'}`}>
        <div className={`absolute top-20 left-20 w-3 h-3 rounded-full animate-pulse ${theme === 'dark' ? 'bg-pink-500' : 'bg-pink-400'}`}></div>
        <div className={`absolute top-40 right-40 w-2 h-2 rounded-full animate-pulse ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-400'}`} style={{ animationDelay: '0.5s' }}></div>
        <div className={`absolute bottom-32 left-32 w-2 h-2 rounded-full animate-pulse ${theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-400'}`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute bottom-20 right-20 w-3 h-3 rounded-full animate-pulse ${theme === 'dark' ? 'bg-purple-500' : 'bg-purple-400'}`} style={{ animationDelay: '1.5s' }}></div>
        <div className={`absolute top-1/2 left-10 w-2 h-2 rounded-full animate-pulse ${theme === 'dark' ? 'bg-cyan-500' : 'bg-cyan-400'}`} style={{ animationDelay: '0.3s' }}></div>
        <div className={`absolute top-1/3 right-10 w-2 h-2 rounded-full animate-pulse ${theme === 'dark' ? 'bg-rose-500' : 'bg-rose-400'}`} style={{ animationDelay: '0.8s' }}></div>
      </div>

      {/* Manga character illustrations - Chef cooking action */}
      <div className={`fixed top-20 right-10 pointer-events-none hidden lg:block ${theme === 'dark' ? 'opacity-[0.15]' : 'opacity-[0.08]'}`}>
        <svg width="300" height="400" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Manga-style chef character silhouette with action lines */}
          <g transform="translate(50, 50)">
            {/* Chef's body in dynamic pose */}
            <ellipse cx="100" cy="280" rx="60" ry="30" fill={theme === 'dark' ? 'white' : 'black'} opacity="0.8"/>
            <rect x="70" y="150" width="60" height="130" rx="10" fill={theme === 'dark' ? 'white' : 'black'} opacity="0.8"/>
            {/* Chef hat */}
            <ellipse cx="100" cy="100" rx="50" ry="40" fill={theme === 'dark' ? 'white' : 'black'} opacity="0.8"/>
            <rect x="80" y="100" width="40" height="30" fill={theme === 'dark' ? 'white' : 'black'} opacity="0.8"/>
            {/* Arm holding spatula */}
            <rect x="130" y="170" width="15" height="70" rx="5" transform="rotate(45 137.5 205)" fill={theme === 'dark' ? 'white' : 'black'} opacity="0.8"/>
            {/* Spatula */}
            <rect x="160" y="150" width="40" height="8" rx="2" transform="rotate(45 180 154)" fill={theme === 'dark' ? 'white' : 'black'} opacity="0.8"/>
            {/* Action sparkles */}
            <circle cx="200" cy="140" r="3" fill={theme === 'dark' ? 'white' : 'black'}/>
            <circle cx="210" cy="135" r="2" fill={theme === 'dark' ? 'white' : 'black'}/>
            <circle cx="190" cy="145" r="2" fill={theme === 'dark' ? 'white' : 'black'}/>
          </g>
        </svg>
      </div>

      {/* Manga character - Person eating with excitement */}
      <div className="fixed bottom-20 left-10 pointer-events-none opacity-[0.08] hidden lg:block">
        <svg width="250" height="350" viewBox="0 0 250 350" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(30, 30)">
            {/* Person's head */}
            <circle cx="100" cy="80" r="40" fill="black" opacity="0.8"/>
            {/* Excited expression (manga style) */}
            <circle cx="90" cy="75" r="5" fill="white"/>
            <circle cx="110" cy="75" r="5" fill="white"/>
            {/* Open mouth */}
            <path d="M 85 90 Q 100 100 115 90" stroke="white" strokeWidth="3" fill="none"/>
            {/* Body */}
            <rect x="70" y="120" width="60" height="100" rx="10" fill="black" opacity="0.8"/>
            {/* Arms up in excitement */}
            <rect x="40" y="130" width="15" height="60" rx="5" transform="rotate(-30 47.5 160)" fill="black" opacity="0.8"/>
            <rect x="145" y="130" width="15" height="60" rx="5" transform="rotate(30 152.5 160)" fill="black" opacity="0.8"/>
            {/* Bowl of ramen */}
            <ellipse cx="100" cy="180" rx="30" ry="15" fill="black" opacity="0.8"/>
            {/* Steam lines (manga style) */}
            <path d="M 80 170 Q 85 160 80 150" stroke="black" strokeWidth="2" fill="none" opacity="0.6"/>
            <path d="M 100 170 Q 105 158 100 145" stroke="black" strokeWidth="2" fill="none" opacity="0.6"/>
            <path d="M 120 170 Q 115 160 120 150" stroke="black" strokeWidth="2" fill="none" opacity="0.6"/>
          </g>
        </svg>
      </div>

      {/* Manga food illustrations - Top left */}
      <div className="fixed top-40 left-20 pointer-events-none opacity-[0.06] hidden md:block">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Burger with manga shading */}
          <ellipse cx="100" cy="150" rx="60" ry="20" fill="black" opacity="0.8"/>
          <rect x="50" y="100" width="100" height="50" rx="25" fill="black" opacity="0.8"/>
          <ellipse cx="100" cy="100" rx="60" ry="25" fill="black" opacity="0.8"/>
          {/* Shine effect */}
          <ellipse cx="80" cy="110" rx="15" ry="8" fill="white" opacity="0.3"/>
        </svg>
      </div>

      {/* Manga action word "DELICIOUS!" */}
      <div className="fixed top-1/3 right-20 pointer-events-none opacity-[0.05] hidden xl:block transform -rotate-12">
        <div style={{
          fontSize: '80px',
          fontWeight: '900',
          color: 'black',
          textShadow: '6px 6px 0px white',
          WebkitTextStroke: '3px black',
          letterSpacing: '5px'
        }}>
          おいしい
        </div>
      </div>

      <BubbleMenu />
      <HeroSection />
      <SpecialsSection />
      <CategorySection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
