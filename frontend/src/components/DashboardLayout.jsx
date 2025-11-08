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
      navigate('/login', { replace: true, state: null });
    }
  };

  const handleStayInDashboard = () => {
    setShowConfirmDialog(false);
  };

  const handleConfirmLogout = () => {
    setShowConfirmDialog(false);
    logout();
    navigate('/login', { replace: true, state: null });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
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
        } w-64 sm:w-72 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col fixed h-screen z-30`}
      >
        {/* Sidebar Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="bg-indigo-600 p-2 rounded-lg flex-shrink-0">
              <Menu className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-gray-900 text-base sm:text-lg truncate">DashStack</h2>
              <p className="text-xs text-gray-500 truncate">Canteen Admin</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                  active
                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100 font-medium'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && (
                  <span className="truncate text-sm">{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info & Actions */}
        <div className="border-t border-gray-200 p-4">
          {sidebarOpen ? (
            <>
              <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-600 rounded text-xs font-medium capitalize">
                    {user?.role}
                  </span>
                  {user?.status === 'active' && (
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-medium">
                      Active
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleLogoutClick}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium transition-colors"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleLogoutClick}
              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 mx-auto transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>

      </div>

      {/* Floating Button when Sidebar Hidden */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-6 bg-indigo-600 rounded-lg p-3 hover:bg-indigo-700 shadow-lg z-50 transition-all"
          title="Open Sidebar"
        >
          <Menu size={20} className="text-white" />
        </button>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'md:ml-64 lg:ml-72' : 'ml-0'
        }`}
      >
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className={`py-4 ${sidebarOpen ? 'px-4 md:px-6' : 'pl-20 pr-4 md:pr-6'}`}>
            <div className="flex justify-between items-center">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
                  {navItems.find(item => isActive(item.path))?.name || 'Dashboard'}
                </h1>
              </div>
              <div className="flex items-center gap-3 ml-4">
                {/* Search Button */}
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                {/* Notification Button */}
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {/* User Avatar */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>

      {/* Admin Logout Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-indigo-600" />
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
                className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-medium"
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
