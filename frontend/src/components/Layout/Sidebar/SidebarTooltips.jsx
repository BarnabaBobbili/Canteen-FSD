import React from 'react';
import { useTranslation } from 'react-i18next';
import { calculateTooltipPosition } from '../layoutHelpers';

/**
 * SidebarTooltips Component
 * Displays tooltips for sidebar items when collapsed
 */
const SidebarTooltips = ({
  sidebarVisible,
  sidebarOpen,
  hoveredItem,
  sidebarLocked,
  navItems
}) => {
  const { t } = useTranslation();

  if (!sidebarVisible || sidebarOpen || !hoveredItem) return null;

  // Navigation item tooltip
  if (hoveredItem !== 'logout' && hoveredItem !== 'lock') {
    const index = navItems.findIndex(item => item.path === hoveredItem);
    const itemName = navItems.find(item => item.path === hoveredItem)?.name;

    if (index === -1 || !itemName) return null;

    return (
      <div
        className="fixed px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none shadow-lg"
        style={{
          left: '92px', // 80px sidebar + 12px spacing
          top: calculateTooltipPosition(index, navItems.length),
          zIndex: 99999
        }}
      >
        {itemName}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900" style={{ left: '-6px' }}></div>
      </div>
    );
  }

  // Lock button tooltip
  if (hoveredItem === 'lock') {
    return (
      <div
        className="fixed px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none shadow-lg"
        style={{
          left: '92px',
          bottom: '100px',
          zIndex: 99999
        }}
      >
        {sidebarLocked ? 'Unlock sidebar' : 'Lock sidebar'}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900" style={{ left: '-6px' }}></div>
      </div>
    );
  }

  // Logout tooltip
  if (hoveredItem === 'logout') {
    return (
      <div
        className="fixed px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none shadow-lg"
        style={{
          left: '92px',
          bottom: '52px',
          zIndex: 99999
        }}
      >
        {t('common.logout')}
        <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900" style={{ left: '-6px' }}></div>
      </div>
    );
  }

  return null;
};

export default SidebarTooltips;
