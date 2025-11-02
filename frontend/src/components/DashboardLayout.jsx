import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShoppingCart, UtensilsCrossed, Package, Users, Truck, Tag,
  MessageSquare, CreditCard, LogOut, Menu, LayoutDashboard, Activity, X, AlertCircle
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  // Default sidebar closed on mobile, open on desktop
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Helper function to get path with admin prefix if user is admin
  const getPath = (basePath) => {
    return user?.role === 'admin' ? `/admin${basePath === '/dashboard' ? '' : basePath}` : basePath;
  };

  // Navigation items with role-based access
  const navItems = [
    {
      name: 'Dashboard',
      path: getPath('/dashboard'),
      icon: LayoutDashboard,
      roles: ['admin', 'manager', 'cashier', 'staff', 'customer']
    },
    {
      name: 'Orders',
      path: getPath('/orders'),
      icon: ShoppingCart,
      roles: ['admin', 'manager', 'cashier', 'staff']
    },
    {
      name: 'Menu',
      path: getPath('/menu'),
      icon: UtensilsCrossed,
      roles: ['admin', 'manager', 'staff']
    },
    {
      name: 'Inventory',
      path: getPath('/inventory'),
      icon: Package,
      roles: ['admin', 'manager', 'staff']
    },
    {
      name: 'Staff',
      path: getPath('/staff'),
      icon: Users,
      roles: ['admin', 'manager']
    },
    {
      name: 'Activity Log',
      path: getPath('/activities'),
      icon: Activity,
      roles: ['admin', 'manager']
    },
    {
      name: 'Suppliers',
      path: getPath('/suppliers'),
      icon: Truck,
      roles: ['admin', 'manager']
    },
    {
      name: 'Discounts',
      path: getPath('/discounts'),
      icon: Tag,
      roles: ['admin', 'manager']
    },
    {
      name: 'Feedback',
      path: getPath('/feedback'),
      icon: MessageSquare,
      roles: ['admin', 'manager']
    },
    {
      name: 'Payments',
      path: getPath('/payments'),
      icon: CreditCard,
      roles: ['admin', 'manager', 'cashier']
    }
  ];

  // Filter navigation items based on user role
  const accessibleNavItems = navItems.filter(item =>
    item.roles.includes(user?.role)
  );

  const handleLogoutClick = () => {
    if (user?.role === 'admin') {
      setShowConfirmDialog(true);
    } else {
      logout();
      navigate('/login');
    }
  };

  const handleStayInDashboard = () => {
    setShowConfirmDialog(false);
  };

  const handleConfirmLogout = () => {
    setShowConfirmDialog(false);
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex">
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 sm:w-72 bg-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col fixed h-screen z-30`}
      >
        {/* Sidebar Header */}
        <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-gradient-to-br from-sky-400 to-blue-500 p-1.5 sm:p-2 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-gray-900 text-sm sm:text-base truncate">Smart Canteen</h2>
              <p className="text-xs text-gray-500 capitalize truncate">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {accessibleNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path + item.name}
                onClick={() => {
                  navigate(item.path);
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 768) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 transition-colors ${
                  active
                    ? 'bg-sky-50 text-sky-600 border-r-4 border-sky-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={18} className="flex-shrink-0 sm:w-5 sm:h-5" />
                {sidebarOpen && (
                  <span className="font-medium truncate text-sm sm:text-base">{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info & Actions */}
        <div className="border-t border-gray-200 p-3 sm:p-4">
          {sidebarOpen ? (
            <>
              <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs sm:text-sm"
              >
                <LogOut size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleLogoutClick}
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mx-auto"
              title="Logout"
            >
              <LogOut size={18} className="sm:w-5 sm:h-5" />
            </button>
          )}
        </div>

      </div>

      {/* Floating Button when Sidebar Hidden */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed left-2 sm:left-4 top-4 sm:top-6 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg p-2 sm:p-3 hover:opacity-90 hover:shadow-2xl shadow-xl z-50 transition-all"
          title="Open Sidebar"
        >
          <Menu size={20} className="sm:w-6 sm:h-6 text-white" />
        </button>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'md:ml-64 lg:ml-72' : 'ml-0'
        }`}
      >
        {/* Top Bar */}
        <div className="bg-white shadow-md sticky top-0 z-10">
          <div className={`py-3 md:py-4 ${sidebarOpen ? 'px-3 sm:px-4 md:px-6' : 'pl-16 sm:pl-20 pr-3 sm:pr-4 md:pr-6'}`}>
            <div className="flex justify-between items-center">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                  {navItems.find(item => isActive(item.path))?.name || 'Dashboard'}
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5">
                  Welcome, <span className="font-semibold">{user?.name}</span>
                </p>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 ml-2">
                <div className="px-2 sm:px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-xs sm:text-sm font-medium capitalize">
                  {user?.role}
                </div>
                {user?.status === 'active' && (
                  <div className="hidden sm:flex px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                    Active
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-3 sm:p-4 md:p-6">
          {children}
        </div>
      </div>

      {/* Admin Logout Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-sky-100 p-3 rounded-full">
                  <AlertCircle className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
                  <p className="text-sm text-gray-500">You are logged in as Admin</p>
                </div>
              </div>
              <button
                onClick={handleStayInDashboard}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600">
                Are you sure you want to logout from your admin account?
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleStayInDashboard}
                className="w-full px-4 py-3 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Stay in Dashboard
              </button>
              <button
                onClick={handleConfirmLogout}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
