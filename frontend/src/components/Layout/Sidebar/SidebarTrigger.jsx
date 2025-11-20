import React from 'react';

/**
 * SidebarTrigger Component
 * Invisible trigger area at left edge to show sidebar on hover
 * Also displays visual indicator when sidebar is hidden
 */
const SidebarTrigger = ({ sidebarLocked, sidebarVisible, setSidebarVisible, triggerRef }) => {
  if (sidebarLocked) return null;

  return (
    <>
      <div
        ref={triggerRef}
        className="fixed left-0 top-0 bottom-0 w-1 z-40 hidden lg:block"
        style={{ backgroundColor: 'transparent' }}
        onMouseEnter={() => setSidebarVisible(true)}
      />

      {/* Visual Indicator - Subtle line at left edge */}
      <div
        className={`fixed left-0 top-0 bottom-0 w-1 transition-opacity duration-300 hidden lg:block ${
          sidebarVisible ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundColor: '#1570EF',
          zIndex: 30
        }}
      />
    </>
  );
};

export default SidebarTrigger;
