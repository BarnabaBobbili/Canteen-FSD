import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  UtensilsCrossed, LogOut, ChevronLeft,
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
 * MobileSidebar Component
 * Mobile version of sidebar with overlay
 */
const MobileSidebar = ({
  sidebarVisible,
  setSidebarVisible,
  navItems,
  onLogoutClick
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarVisible(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`macos-sidebar fixed top-0 left-0 h-full w-64 transition-transform duration-300 z-50 lg:hidden ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-18 px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center">
              <div className="macos-logo w-10 h-10 flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold macos-heading">Canteen</span>
            </div>
            <button
              onClick={() => setSidebarVisible(false)}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = iconMap[item.icon] || LayoutDashboard;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarVisible(false);
                  }}
                  className={`macos-nav-item w-full flex items-center px-4 py-3 text-sm ${
                    isActive
                      ? 'active text-white'
                      : 'text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="px-4 py-4 border-t border-gray-100">
            <button
              onClick={onLogoutClick}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              {t('common.logout')}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
