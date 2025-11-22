import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Settings, LogOut } from 'lucide-react';

/**
 * ProfileMenu Component
 * Displays user profile dropdown with settings and logout
 */
const ProfileMenu = ({ user, show, onToggle, profileRef, onLogoutClick }) => {
  const navigate = useNavigate();

  return (
    <div className="relative" ref={profileRef} style={{ zIndex: 10000 }}>
      <button
        onClick={onToggle}
        className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
        aria-haspopup="menu"
        aria-expanded={show}
        aria-controls="profile-menu"
      >
        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
          style={{ backgroundColor: '#1570EF' }}
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" aria-hidden="true" />
      </button>

      {/* Profile Dropdown */}
      {show && (
        <div id="profile-menu" className="macos-dropdown absolute right-0 mt-2 w-56 macos-animate" style={{ zIndex: 99999 }} role="menu" aria-label="User menu">
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
          </div>
          <div className="py-2">
            {/* Only show settings for admin */}
            {user?.role === 'admin' && (
              <button
                onClick={() => {
                  navigate('/admin/settings');
                  onToggle();
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                role="menuitem"
                type="button"
              >
                <Settings className="w-4 h-4 mr-3 text-gray-400" aria-hidden="true" />
                Settings
              </button>
            )}
            <button
              onClick={onLogoutClick}
              className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
              role="menuitem"
              type="button"
            >
              <LogOut className="w-4 h-4 mr-3" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
