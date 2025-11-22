/**
 * Menu Toggle Button Component
 * Hamburger menu button with animated lines
 */
const MenuToggleButton = ({ isMenuOpen, menuBg, menuContentColor, onClick }) => {
  return (
    <button
      type="button"
      className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''} inline-flex flex-col items-center justify-center rounded-full border-4 border-gray-900 w-12 h-12 sm:w-14 sm:h-14 cursor-pointer p-0 will-change-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all`}
      onClick={onClick}
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
  );
};

export default MenuToggleButton;
