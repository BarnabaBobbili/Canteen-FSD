import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  UtensilsCrossed, LogOut, ChevronLeft, ChevronRight, Lock, Unlock,
  LayoutDashboard, ShoppingCart, UtensilsCrossed as MenuIcon, Package,
  Users, Activity, Truck, Tag, MessageSquare, CreditCard, FileText
} from 'lucide-react';

// Icon mapping for navigation items
const iconMap = {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed: MenuIcon,
  Package,
  Users,
  Activity,
  Truck,
  Tag,
  MessageSquare,
  CreditCard,
  FileText
};

/**
 * Sidebar Component
 * Main desktop sidebar with navigation, expand/collapse, and lock controls
 */
const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  sidebarLocked,
  sidebarVisible,
  toggleLock,
  sidebarRef,
  navItems,
  hoveredItem,
  setHoveredItem,
  onLogoutClick
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <aside
      ref={sidebarRef}
      className={`macos-sidebar ${sidebarLocked ? 'relative' : 'fixed left-0 top-0'} h-full ${
        sidebarOpen ? 'w-64' : 'w-20'
      } transition-all duration-300 hidden lg:flex flex-col ${
        sidebarLocked || sidebarVisible ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={sidebarLocked ? { zIndex: 200 } : { zIndex: 200 }}
    >
      {/* Logo */}
      <div className="h-16 px-4 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center min-w-0">
          <div className="macos-logo w-10 h-10 flex items-center justify-center flex-shrink-0">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </div>
          {sidebarOpen && (
            <span className="ml-3 text-xl font-bold macos-heading whitespace-nowrap">Canteen</span>
          )}
        </div>
        {/* Lock and Collapse buttons - only show when expanded */}
        {sidebarOpen && (
          <div className="flex items-center gap-1">
            {/* Lock/Unlock Button */}
            <button
              onClick={toggleLock}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              title={sidebarLocked ? 'Unlock sidebar' : 'Lock sidebar in place'}
              style={{ color: sidebarLocked ? '#1570EF' : '#9CA3AF' }}
            >
              {sidebarLocked ? (
                <Lock className="w-5 h-5" />
              ) : (
                <Unlock className="w-5 h-5" />
              )}
            </button>

            {/* Collapse Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 flex flex-col justify-evenly overflow-hidden">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive = location.pathname === item.path;
          return (
            <div key={item.path} className="relative">
              <button
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`macos-nav-item w-full flex items-center ${
                  sidebarOpen ? 'px-4' : 'px-3 justify-center'
                } py-2 text-sm ${
                  isActive
                    ? 'active text-white'
                    : 'text-gray-700'
                }`}
                title={!sidebarOpen ? item.name : ''}
              >
                <Icon className={`w-5 h-5 ${sidebarOpen ? 'mr-3' : ''} flex-shrink-0`} />
                {sidebarOpen && <span className="truncate">{item.name}</span>}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Toggle and Lock Buttons (when collapsed) */}
      {!sidebarOpen && (
        <div className="px-3 py-2 border-t border-gray-100 space-y-1">
          {/* Lock/Unlock Button */}
          <button
            onClick={toggleLock}
            onMouseEnter={() => setHoveredItem('lock')}
            onMouseLeave={() => setHoveredItem(null)}
            className="w-full flex items-center justify-center px-3 py-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
            title={sidebarLocked ? 'Unlock sidebar' : 'Lock sidebar in place'}
            style={{ color: sidebarLocked ? '#1570EF' : '#6B7280' }}
          >
            {sidebarLocked ? (
              <Lock className="w-5 h-5" />
            ) : (
              <Unlock className="w-5 h-5" />
            )}
          </button>

          {/* Expand Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-full flex items-center justify-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
            title="Expand sidebar"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* User Section (when expanded) */}
      {sidebarOpen && (
        <div className="px-3 py-2 border-t border-gray-100">
          <button
            onClick={onLogoutClick}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            {t('common.logout')}
          </button>
        </div>
      )}

      {/* Logout icon only (when collapsed) */}
      {!sidebarOpen && (
        <div className="px-3 py-2 border-t border-gray-100">
          <button
            onClick={onLogoutClick}
            onMouseEnter={() => setHoveredItem('logout')}
            onMouseLeave={() => setHoveredItem(null)}
            className="w-full flex items-center justify-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
