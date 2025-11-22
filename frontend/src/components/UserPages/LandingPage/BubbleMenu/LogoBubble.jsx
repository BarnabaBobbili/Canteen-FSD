import { UtensilsCrossed } from 'lucide-react';

/**
 * Logo Bubble Component
 * Animated logo button for the landing page
 */
const LogoBubble = ({ menuBg, menuContentColor, isScrolled, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bubble logo-bubble inline-flex items-center justify-center rounded-full pointer-events-auto h-12 sm:h-14 gap-2 sm:gap-3 will-change-transform border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:scale-110 cursor-pointer"
      aria-label="Go to home"
      style={{
        background: menuBg,
        minHeight: '48px',
        paddingLeft: isScrolled ? '12px' : '16px',
        paddingRight: isScrolled ? '12px' : '24px'
      }}
    >
      <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" style={{ color: menuContentColor }} strokeWidth={2.5} />
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
  );
};

export default LogoBubble;
