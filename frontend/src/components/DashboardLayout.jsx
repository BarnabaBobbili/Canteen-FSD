import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShoppingCart, UtensilsCrossed, Package, Users, Truck, Tag,
  MessageSquare, CreditCard, LogOut, Menu, LayoutDashboard, Activity,
  AlertCircle, Bell, Search, ChevronDown, Settings
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper function to get path with admin prefix
  const getPath = (basePath) => {
    return user?.role === 'admin' ? `/admin${basePath === '/dashboard' ? '' : basePath}` : basePath;
  };

  // Navigation items with role-based access
  const navItems = [
    { name: 'Dashboard', path: getPath('/dashboard'), icon: LayoutDashboard, roles: ['admin', 'manager', 'cashier', 'staff', 'customer'] },
    { name: 'Orders', path: getPath('/orders'), icon: ShoppingCart, roles: ['admin', 'manager', 'cashier', 'staff'] },
    { name: 'Menu', path: getPath('/menu'), icon: UtensilsCrossed, roles: ['admin', 'manager', 'staff'] },
    { name: 'Inventory', path: getPath('/inventory'), icon: Package, roles: ['admin', 'manager', 'staff'] },
    { name: 'Staff', path: getPath('/staff'), icon: Users, roles: ['admin', 'manager'] },
    { name: 'Activity', path: getPath('/activities'), icon: Activity, roles: ['admin', 'manager'] },
    { name: 'Suppliers', path: getPath('/suppliers'), icon: Truck, roles: ['admin', 'manager'] },
    { name: 'Discounts', path: getPath('/discounts'), icon: Tag, roles: ['admin', 'manager'] },
    { name: 'Feedback', path: getPath('/feedback'), icon: MessageSquare, roles: ['admin', 'manager'] },
    { name: 'Payments', path: getPath('/payments'), icon: CreditCard, roles: ['admin', 'manager', 'cashier'] }
  ];

  const accessibleNavItems = navItems.filter(item => item.roles.includes(user?.role));

  const handleLogoutClick = () => {
    if (user?.role === 'admin') {
      setShowLogoutConfirm(true);
    } else {
      logout();
      navigate('/login', { replace: true, state: null });
    }
  };

  const confirmLogout = () => {
    logout();
    navigate('/login', { replace: true, state: null });
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} lg:w-64 bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 overflow-hidden shadow-sm`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-18 px-6 py-5 border-b border-gray-100 flex items-center">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EEF2FF' }}>
              <UtensilsCrossed className="w-6 h-6" style={{ color: '#4A6CF7' }} />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">Canteen</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {accessibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={isActive ? { backgroundColor: '#4A6CF7' } : {}}
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
              onClick={handleLogoutClick}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-18 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
          {/* Left: Mobile Menu + Search */}
          <div className="flex items-center flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg mr-4 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all"
                style={{ '--tw-ring-color': '#4A6CF7' }}
              />
            </div>
          </div>

          {/* Right: Notifications, Profile */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                className="relative p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EEF2FF' }}>
                          <Bell className="w-5 h-5" style={{ color: '#4A6CF7' }} />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">New order received</p>
                          <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t border-gray-100">
                    <button className="text-sm font-medium hover:underline transition-all" style={{ color: '#4A6CF7' }}>
                      See all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundColor: '#4A6CF7' }}
                >
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors">
                      <Settings className="w-4 h-4 mr-3 text-gray-400" />
                      Settings
                    </button>
                    <button
                      onClick={handleLogoutClick}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: '#F9FAFB' }}>
          {children}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-center w-14 h-14 mx-auto bg-red-100 rounded-full">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900 text-center">
                Confirm Logout
              </h3>
              <p className="mt-2 text-sm text-gray-600 text-center leading-relaxed">
                Are you sure you want to logout? You will need to sign in again to access the dashboard.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
