import React from 'react';
import { BarChart3 } from 'lucide-react';

const WelcomeCard = ({ user, accessibleModules }) => {
  const getRoleMessage = (role) => {
    switch (role) {
      case 'admin':
        return 'You have full access to all system features.';
      case 'manager':
        return 'Manage operations and oversee canteen activities.';
      case 'cashier':
        return 'Process orders and handle payments efficiently.';
      case 'staff':
        return 'Manage orders, menu items, and inventory.';
      default:
        return 'Welcome to Smart Canteen!';
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8 text-white shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
            Welcome to Smart Canteen!
          </h2>
          <p className="text-sky-50 mb-3 sm:mb-4 text-sm sm:text-base">
            {getRoleMessage(user?.role)}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg backdrop-blur">
              <div className="font-semibold text-sm sm:text-base">
                {accessibleModules.length}
              </div>
              <div className="text-sky-100 text-xs">Available Modules</div>
            </div>
            {user?.department && user.department !== 'none' && (
              <div className="bg-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg backdrop-blur">
                <div className="font-semibold text-sm sm:text-base capitalize">
                  {user.department}
                </div>
                <div className="text-sky-100 text-xs">Department</div>
              </div>
            )}
          </div>
        </div>
        <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 opacity-20 flex-shrink-0" />
      </div>
    </div>
  );
};

export default WelcomeCard;
