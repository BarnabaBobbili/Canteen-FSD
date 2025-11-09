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
    <div
      className="rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 mb-6 md:mb-8 text-white relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #4A6CF7 0%, #818CF8 100%)',
        boxShadow: '0 10px 15px -3px rgba(74, 108, 247, 0.2), 0 4px 6px -4px rgba(74, 108, 247, 0.1)'
      }}
    >
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            Welcome to Smart Canteen!
          </h2>
          <p className="mb-4 sm:mb-6 text-sm sm:text-base opacity-95">
            {getRoleMessage(user?.role)}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="bg-white/20 px-4 sm:px-5 py-2 sm:py-3 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="font-bold text-lg sm:text-xl">
                {accessibleModules.length}
              </div>
              <div className="opacity-90 text-xs sm:text-sm">Available Modules</div>
            </div>
            {user?.department && user.department !== 'none' && (
              <div className="bg-white/20 px-4 sm:px-5 py-2 sm:py-3 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="font-bold text-lg sm:text-xl capitalize">
                  {user.department}
                </div>
                <div className="opacity-90 text-xs sm:text-sm">Department</div>
              </div>
            )}
          </div>
        </div>
        <BarChart3 className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 opacity-10 flex-shrink-0" />
      </div>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
    </div>
  );
};

export default WelcomeCard;
