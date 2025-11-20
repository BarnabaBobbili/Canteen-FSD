import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';

/**
 * NotificationMenu Component
 * Displays notifications dropdown with mock data
 */
const NotificationMenu = ({ show, onToggle, notificationRef, userRole }) => {
  const navigate = useNavigate();

  return (
    <div className="relative" ref={notificationRef} style={{ zIndex: 10000 }}>
      <button
        onClick={onToggle}
        className="relative p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        <span className="macos-notification-badge absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
      </button>

      {/* Notifications Dropdown */}
      {show && (
        <div className="macos-dropdown absolute right-0 mt-2 w-96 macos-animate" style={{ zIndex: 99999 }}>
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
            <div className="flex items-center gap-2">
              <button
                className="text-xs font-medium px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                style={{ color: '#1570EF' }}
              >
                Mark all read
              </button>
              <button className="text-xs font-medium text-red-600 px-2 py-1 rounded hover:bg-red-50 transition-colors">
                Clear all
              </button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E0F2FE' }}>
                  <Bell className="w-5 h-5" style={{ color: '#1570EF' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">New order received</p>
                  <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                </div>
                <div className="flex-shrink-0 w-2 h-2 rounded-full mt-1" style={{ backgroundColor: '#1570EF' }}></div>
              </div>
            </div>
            <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFF7ED' }}>
                  <Bell className="w-5 h-5" style={{ color: '#F59E0B' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">Low stock alert</p>
                  <p className="text-xs text-gray-500 mt-1">Rice stock is running low</p>
                  <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
            <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ECFDF5' }}>
                  <Bell className="w-5 h-5" style={{ color: '#10B981' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">Payment received</p>
                  <p className="text-xs text-gray-500 mt-1">₹500 received for Order #1233</p>
                  <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
          {/* Only show "See all notifications" for admin */}
          {userRole === 'admin' && (
            <div className="p-3 text-center border-t border-gray-100">
              <button
                onClick={() => {
                  navigate('/admin/notifications');
                  onToggle();
                }}
                className="text-sm font-medium hover:underline transition-all"
                style={{ color: '#1570EF' }}
              >
                See all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
