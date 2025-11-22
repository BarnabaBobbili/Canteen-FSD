import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import LogoBubble from './BubbleMenu/LogoBubble';
import ThemeToggleButton from './BubbleMenu/ThemeToggleButton';
import MenuToggleButton from './BubbleMenu/MenuToggleButton';
import BubbleMenuOverlay from './BubbleMenu/BubbleMenuOverlay';
import { getMenuItems, getMenuColors } from './BubbleMenu/bubbleMenuHelpers';

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

  const isLandingPage = location.pathname === '/demo';
  const menuItems = getMenuItems(theme, user, navigate);
  const { menuBg, menuContentColor } = getMenuColors(theme);

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

  // GSAP animations for menu overlay
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

  // Handle resize for responsive rotation
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
  }, [isMenuOpen, menuItems]);

  // Scroll detection for logo animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <LogoBubble
            menuBg={menuBg}
            menuContentColor={menuContentColor}
            isScrolled={isScrolled}
            onClick={() => {
              navigate('/demo');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Spacer when not on landing page */}
        {!isLandingPage && <div />}

        {/* Right side: Theme toggle + Menu button */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Theme Toggle - Only on Landing Page */}
          {isLandingPage && (
            <ThemeToggleButton
              theme={theme}
              isScrolled={isScrolled}
              onClick={toggleTheme}
            />
          )}

          {/* Menu Toggle */}
          <MenuToggleButton
            isMenuOpen={isMenuOpen}
            menuBg={menuBg}
            menuContentColor={menuContentColor}
            onClick={handleToggle}
          />
        </div>
      </nav>

      {/* Menu Overlay */}
      <BubbleMenuOverlay
        showOverlay={showOverlay}
        isMenuOpen={isMenuOpen}
        menuItems={menuItems}
        theme={theme}
        menuContentColor={menuContentColor}
        overlayRef={overlayRef}
        bubblesRef={bubblesRef}
        labelRefs={labelRefs}
        onOverlayClick={handleOverlayClick}
        onItemClick={handleItemClick}
      />
    </>
  );
}
