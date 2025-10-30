import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShoppingCart, UtensilsCrossed, Package, Users, Truck, Tag,
  MessageSquare, CreditCard, LogOut, Home, Menu, LayoutDashboard, Activity
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Navigation items with role-based access
  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'manager', 'cashier', 'staff', 'customer']
    },
    {
      name: 'Orders',
      path: '/orders',
      icon: ShoppingCart,
      roles: ['admin', 'manager', 'cashier', 'staff']
    },
    {
      name: 'Menu',
      path: '/menu',
      icon: UtensilsCrossed,
      roles: ['admin', 'manager', 'staff']
    },
    {
      name: 'Inventory',
      path: '/inventory',
      icon: Package,
      roles: ['admin', 'manager', 'staff']
    },
    {
      name: 'Staff',
      path: '/staff',
      icon: Users,
      roles: ['admin', 'manager']
    },
    {
      name: 'Activity Log',
      path: '/activities',
      icon: Activity,
      roles: ['admin', 'manager']
    },
    {
      name: 'Suppliers',
      path: '/suppliers',
      icon: Truck,
      roles: ['admin', 'manager']
    },
    {
      name: 'Discounts',
      path: '/discounts',
      icon: Tag,
      roles: ['admin', 'manager']
    },
    {
      name: 'Feedback',
      path: '/feedback',
      icon: MessageSquare,
      roles: ['admin', 'manager']
    },
    {
      name: 'Payments',
      path: '/payments',
      icon: CreditCard,
      roles: ['admin', 'manager', 'cashier']
    }
  ];

  // Filter navigation items based on user role
  const accessibleNavItems = navItems.filter(item =>
    item.roles.includes(user?.role)
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col fixed h-screen z-30`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-gradient-to-br from-sky-400 to-blue-500 p-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            <div>
              <h2 className="font-bold text-gray-900">Smart Canteen</h2>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
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
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                  active
                    ? 'bg-sky-50 text-sky-600 border-r-4 border-sky-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && (
                  <span className="font-medium truncate">{item.name}</span>
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
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                >
                  <Home size={16} />
                  Home
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate('/')}
                className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 mx-auto"
                title="Home"
              >
                <Home size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mx-auto"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Floating Button when Sidebar Hidden */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed left-4 top-6 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg p-3 hover:opacity-90 hover:shadow-2xl shadow-xl z-50 transition-all"
          title="Open Sidebar"
        >
          <Menu size={24} className="text-white" />
        </button>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        {/* Top Bar */}
        <div className="bg-white shadow-md sticky top-0 z-20">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {navItems.find(item => isActive(item.path))?.name || 'Dashboard'}
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back, <span className="font-semibold">{user?.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-sm font-medium capitalize">
                {user?.role}
              </div>
              {user?.status === 'active' && (
                <div className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                  Active
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
