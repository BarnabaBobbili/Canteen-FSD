import React from 'react';
import { Menu } from 'lucide-react';
import DateTimeDisplay from './DateTimeDisplay';
import NotificationMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';

/**
 * Header Component
 * Main header bar with mobile menu toggle, date/time, notifications, and profile menu
 */
const Header = ({
  onMobileMenuToggle,
  timezone,
  showNotifications,
  setShowNotifications,
  showProfile,
  setShowProfile,
  notificationRef,
  profileRef,
  user,
  onLogoutClick
}) => {
  return (
    <header className="macos-header h-18 flex items-center justify-between px-6 flex-shrink-0" style={{ position: 'relative', zIndex: 50 }}>
      {/* Left: Mobile Menu + Date/Time */}
      <div className="flex items-center flex-1 gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Date and Time Display */}
        <DateTimeDisplay timezone={timezone} />
      </div>

      {/* Right: Notifications, Profile */}
      <div className="flex items-center space-x-2">
        {/* Notifications */}
        <NotificationMenu
          show={showNotifications}
          onToggle={() => {
            setShowNotifications(!showNotifications);
            setShowProfile(false);
          }}
          notificationRef={notificationRef}
          userRole={user?.role}
        />

        {/* Profile */}
        <ProfileMenu
          user={user}
          show={showProfile}
          onToggle={() => {
            setShowProfile(!showProfile);
            setShowNotifications(false);
          }}
          profileRef={profileRef}
          onLogoutClick={onLogoutClick}
        />
      </div>
    </header>
  );
};

export default Header;
