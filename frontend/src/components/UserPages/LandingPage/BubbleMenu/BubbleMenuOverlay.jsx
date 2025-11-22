import BubbleMenuItem from './BubbleMenuItem';

/**
 * Bubble Menu Overlay Component
 * Menu items dropdown overlay
 */
const BubbleMenuOverlay = ({
  showOverlay,
  isMenuOpen,
  menuItems,
  theme,
  menuContentColor,
  overlayRef,
  bubblesRef,
  labelRefs,
  onOverlayClick,
  onItemClick
}) => {
  if (!showOverlay) return null;

  return (
    <>
      {/* Full screen backdrop - click to close */}
      <div
        className="fixed inset-0 z-[999]"
        onClick={onOverlayClick}
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
            <BubbleMenuItem
              key={idx}
              item={item}
              index={idx}
              theme={theme}
              menuContentColor={menuContentColor}
              onClick={onItemClick}
              bubbleRef={el => {
                if (el) bubblesRef.current[idx] = el;
              }}
              labelRef={el => {
                if (el) labelRefs.current[idx] = el;
              }}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default BubbleMenuOverlay;
