import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import { ChefHat, Moon, Sun } from 'lucide-react';

export default function BubbleMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  // Check if we're on the landing page
  const isLandingPage = location.pathname === '/';

  // Helper function to get the correct dashboard route based on user role
  const getDashboardRoute = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/admin';
      case 'manager': return '/manager';
      case 'cashier': return '/cashier';
      case 'staff': return '/kitchen';
      case 'customer': return '/profile';
      default: return '/profile';
    }
  };

  // Filter menu items based on auth status
  const allMenuItems = [
    {
      label: 'Specials',
      href: '#specials',
      ariaLabel: 'Today\'s Specials',
      rotation: -8,
      hoverStyles: {
        bgColor: theme === 'dark' ? '#ba55d3' : '#9c27b0',
        textColor: '#ffffff'
      }
    },
    {
      label: 'Menu',
      href: '#menu',
      ariaLabel: 'View Menu',
      rotation: 8,
      hoverStyles: {
        bgColor: theme === 'dark' ? '#ff1493' : '#ff69b4',
        textColor: '#ffffff'
      }
    },
    {
      label: 'How It Works',
      href: '#how-it-works',
      ariaLabel: 'How It Works',
      rotation: -8,
      hoverStyles: {
        bgColor: theme === 'dark' ? '#00bfff' : '#4dd0e1',
        textColor: '#ffffff'
      }
    },
    {
      label: 'My Account',
      onClick: () => navigate(getDashboardRoute()),
      ariaLabel: 'My Account',
      rotation: 8,
      hoverStyles: {
        bgColor: theme === 'dark' ? '#9c27b0' : '#ba55d3',
        textColor: '#ffffff'
      },
      showWhen: user // Only show when user IS logged in
    },
    {
      label: 'Sign In',
      onClick: () => navigate('/login'),
      ariaLabel: 'Sign In',
      rotation: 8,
      hoverStyles: {
        bgColor: theme === 'dark' ? '#32cd32' : '#10b981',
        textColor: '#ffffff'
      },
      showWhen: !user // Only show when user is NOT logged in
    }
  ];

  // Filter out items that shouldn't be shown
  const menuItems = allMenuItems.filter(item => item.showWhen !== false);

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
  };

  const handleOverlayClick = () => {
    setIsMenuOpen(false);
  };

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href?.startsWith('#')) {
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'block' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      // Animate all bubbles at once (no stagger)
      gsap.to(bubbles, {
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.5)'
      });

      gsap.to(labels, {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        ease: 'power3.out',
        delay: 0.1
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });
    }
  }, [isMenuOpen, showOverlay]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;
        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Scroll detection for logo animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Hide text after 50px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuBg = theme === 'dark'
    ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    : 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)';

  const menuContentColor = theme === 'dark' ? '#ffffff' : '#111111';

  return (
    <>
      <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .bubble-menu-items .pill-link {
          transform: rotate(var(--item-rot));
        }
        .bubble-menu-items .pill-link:hover {
          transform: rotate(var(--item-rot)) scale(1.06);
          background: var(--hover-bg) !important;
          color: var(--hover-color) !important;
        }
        .bubble-menu-items .pill-link:active {
          transform: rotate(var(--item-rot)) scale(.94);
        }
      `}</style>

      <nav className="bubble-menu fixed left-0 right-0 top-4 sm:top-8 flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-8 pointer-events-none z-[1001]" aria-label="Main navigation">
        {/* Logo Bubble - Only on Landing Page */}
        {isLandingPage && (
          <button
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bubble logo-bubble inline-flex items-center justify-center rounded-full pointer-events-auto h-12 sm:h-14 gap-2 sm:gap-3 will-change-transform border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Go to home"
            style={{
              background: menuBg,
              minHeight: '48px',
              paddingLeft: isScrolled ? '12px' : '16px',
              paddingRight: isScrolled ? '12px' : '24px'
            }}
          >
            <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" style={{ color: menuContentColor }} strokeWidth={2.5} />
            <span
              className={`text-lg sm:text-xl font-black tracking-tight overflow-hidden transition-all duration-300 ${
                isScrolled ? 'w-0 opacity-0' : 'w-auto opacity-100'
              }`}
              style={{
                color: menuContentColor,
                whiteSpace: 'nowrap'
              }}
            >
              CANTEEN
            </span>
          </button>
        )}

        {/* Spacer when not on landing page */}
        {!isLandingPage && <div />}

        {/* Right side: Theme toggle + Menu button */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Theme Toggle - Only on Landing Page */}
          {isLandingPage && (
            <button
              onClick={toggleTheme}
              className={`p-2 sm:p-3 border-4 border-gray-900 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                isScrolled ? 'opacity-0 scale-0 w-0 h-0 p-0 border-0' : 'opacity-100 scale-100'
              }`}
              style={{
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                  : 'linear-gradient(135deg, #ffd700 0%, #ffeb3b 100%)'
              }}
              aria-label="Toggle theme"
              disabled={isScrolled}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" strokeWidth={3} />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" strokeWidth={3} />
              )}
            </button>
          )}

          {/* Menu Toggle */}
          <button
            type="button"
            className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''} inline-flex flex-col items-center justify-center rounded-full border-4 border-gray-900 w-12 h-12 sm:w-14 sm:h-14 cursor-pointer p-0 will-change-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all`}
            onClick={handleToggle}
            aria-label="Toggle menu"
            aria-pressed={isMenuOpen}
            style={{ background: menuBg }}
          >
            <span
              className="menu-line block mx-auto rounded-[2px]"
              style={{
                width: 22,
                height: 3,
                background: menuContentColor,
                transform: isMenuOpen ? 'translateY(5px) rotate(45deg)' : 'none'
              }}
            />
            <span
              className="menu-line short block mx-auto rounded-[2px]"
              style={{
                marginTop: '5px',
                width: 22,
                height: 3,
                background: menuContentColor,
                transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none'
              }}
            />
          </button>
        </div>
      </nav>

      {/* Menu Overlay - Click to close */}
      {showOverlay && (
        <>
          {/* Full screen backdrop - click to close */}
          <div
            className="fixed inset-0 z-[999]"
            onClick={handleOverlayClick}
            aria-hidden="true"
          />

          {/* Menu dropdown positioned below hamburger button */}
          <div
            ref={overlayRef}
            className="bubble-menu-items fixed top-20 sm:top-24 right-4 sm:right-8 z-[1000] pointer-events-none"
            aria-hidden={!isMenuOpen}
          >
            <ul
              className="pill-list list-none m-0 p-0 flex flex-col gap-3 pointer-events-auto"
              role="menu"
              aria-label="Menu links"
              onClick={(e) => e.stopPropagation()}
            >
              {menuItems.map((item, idx) => (
                <li
                  key={idx}
                  role="none"
                  className="pill-col"
                >
                  <button
                    role="menuitem"
                    onClick={() => handleItemClick(item)}
                    aria-label={item.ariaLabel || item.label}
                    className="pill-link group w-full rounded-full border-3 sm:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center relative transition-[background,color,box-shadow,transform] duration-300 ease-in-out cursor-pointer"
                    style={{
                      ['--item-rot']: `${item.rotation ?? 0}deg`,
                      ['--pill-bg']: theme === 'dark'
                        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
                      ['--pill-color']: menuContentColor,
                      ['--hover-bg']: item.hoverStyles?.bgColor || '#f3f4f6',
                      ['--hover-color']: item.hoverStyles?.textColor || menuContentColor,
                      background: 'var(--pill-bg)',
                      color: 'var(--pill-color)',
                      minWidth: '160px',
                      padding: '0.65rem 1.2rem',
                      fontSize: '0.9rem',
                      fontWeight: 900,
                      willChange: 'transform',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                    ref={el => {
                      if (el) bubblesRef.current[idx] = el;
                    }}
                  >
                    {/* Manga halftone dots background */}
                    <div className="absolute inset-0 rounded-full opacity-10 pointer-events-none" style={{
                      backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                      backgroundSize: '8px 8px'
                    }}></div>

                    {/* Manga star burst accent - top right */}
                    <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-yellow-300 border-2 border-gray-900 opacity-0 group-hover:opacity-100 transition-opacity" style={{
                      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                    }}></div>

                    {/* Manga sparkle - bottom left */}
                    <div className="absolute bottom-1.5 left-1.5 w-2 h-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity border border-gray-900" style={{
                      clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                      animationDelay: '0.1s'
                    }}></div>

                    <span
                      className="pill-label inline-block relative z-10"
                      style={{
                        willChange: 'transform, opacity',
                        lineHeight: 1.2,
                        textShadow: theme === 'dark'
                          ? '2px 2px 0px rgba(0,0,0,0.8)'
                          : '1px 1px 0px rgba(0,0,0,0.1)'
                      }}
                      ref={el => {
                        if (el) labelRefs.current[idx] = el;
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
