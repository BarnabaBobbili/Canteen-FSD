import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ShoppingCart, UtensilsCrossed, Package, Tag, LogOut, Menu, LayoutDashboard, X, Sparkles, ChevronLeft, ChevronRight
} from 'lucide-react';

const ManagerLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Default collapsed

  const navItems = [
    {
      name: 'Dashboard',
      path: '/manager',
      icon: LayoutDashboard,
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      name: 'Orders',
      path: '/orders',
      icon: ShoppingCart,
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'Menu',
      path: '/menu',
      icon: UtensilsCrossed,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      name: 'Inventory',
      path: '/inventory',
      icon: Package,
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      name: 'Discounts',
      path: '/discounts',
      icon: Tag,
      gradient: 'from-pink-500 to-rose-600'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50">
      {/* Modern Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 ${sidebarCollapsed ? 'w-20' : 'w-72'} bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white transition-all duration-300 ease-in-out shadow-2xl`}>
        <div className="flex flex-col h-full">
          {/* Modern Header */}
          <div className="p-6 border-b border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center w-full' : ''}`}>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
                  <Sparkles className="w-6 h-6" />
                </div>
                {!sidebarCollapsed && (
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                      Manager Portal
                    </h2>
                    <p className="text-sm text-purple-200">{user?.name}</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modern Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  title={sidebarCollapsed ? item.name : ''}
                  className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} shadow-lg shadow-purple-500/20 scale-105`
                      : 'text-purple-100 hover:bg-white/10 hover:scale-102'
                  }`}
                >
                  <div className={`${isActive ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'} p-2 rounded-lg transition-all`}>
                    <item.icon size={20} />
                  </div>
                  {!sidebarCollapsed && (
                    <>
                      <span className="font-semibold">{item.name}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Collapse Toggle Button */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex w-full items-center justify-center gap-3 px-4 py-3.5 text-purple-200 hover:bg-white/10 rounded-xl transition-all hover:scale-102 group mb-2"
              title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              <div className="bg-white/5 group-hover:bg-white/10 p-2 rounded-lg transition-all">
                {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </div>
              {!sidebarCollapsed && <span className="font-semibold">Collapse</span>}
            </button>

            {/* Modern Logout */}
            <button
              onClick={handleLogout}
              title={sidebarCollapsed ? 'Logout' : ''}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3.5 text-red-200 hover:bg-red-500/20 rounded-xl transition-all hover:scale-102 group`}
            >
              <div className="bg-red-500/10 group-hover:bg-red-500/20 p-2 rounded-lg transition-all">
                <LogOut size={20} />
              </div>
              {!sidebarCollapsed && <span className="font-semibold">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Modern Top Bar */}
        <div className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-purple-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-purple-600 hover:bg-purple-100 p-2 rounded-lg transition-all"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2.5 rounded-xl border border-purple-200 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                <p className="text-xs font-medium text-purple-600">Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area with subtle pattern */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default ManagerLayout;
