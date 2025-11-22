/**
 * Bubble Menu Item Component
 * Individual menu item with manga-style decorations
 */
const BubbleMenuItem = ({ item, index, theme, menuContentColor, onClick, bubbleRef, labelRef }) => {
  return (
    <li role="none" className="pill-col">
      <button
        role="menuitem"
        onClick={() => onClick(item)}
        aria-label={item.ariaLabel || item.label}
        className="pill-link group w-full rounded-full border-3 sm:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center relative transition-[background,color,box-shadow,transform] duration-300 ease-in-out cursor-pointer"
        style={{
          '--item-rot': `${item.rotation ?? 0}deg`,
          '--pill-bg': theme === 'dark'
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
          '--pill-color': menuContentColor,
          '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
          '--hover-color': item.hoverStyles?.textColor || menuContentColor,
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
        ref={bubbleRef}
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
          ref={labelRef}
        >
          {item.label}
        </span>
      </button>
    </li>
  );
};

export default BubbleMenuItem;
