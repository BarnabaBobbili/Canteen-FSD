import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ChefHat, LogOut, RefreshCw, Clock, Flame, CheckCircle2, ChevronDown } from 'lucide-react';
import KitchenOrderCard from './KitchenOrderCard';
import * as kitchenService from './kitchenService';

const KitchenDashboard = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('pending'); // New: Track active view

  useEffect(() => {
    loadOrders();
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadOrders, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await kitchenService.fetchActiveOrders(token);
      // Sort: pending first, then preparing, then ready
      const sorted = data.sort((a, b) => {
        const statusOrder = { pending: 0, preparing: 1, ready: 2 };
        if (statusOrder[a.status] !== statusOrder[b.status]) {
          return statusOrder[a.status] - statusOrder[b.status];
        }
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      setOrders(sorted);
    } catch (error) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await kitchenService.updateOrderStatus(orderId, newStatus, token);
      setSuccessMessage(`Order updated to ${newStatus}`);
      setTimeout(() => setSuccessMessage(''), 2000);
      loadOrders();
    } catch (error) {
      setError('Failed to update order');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');

  // Get orders for active tab
  const getActiveOrders = () => {
    switch (activeTab) {
      case 'pending':
        return pendingOrders;
      case 'preparing':
        return preparingOrders;
      case 'ready':
        return readyOrders;
      default:
        return [];
    }
  };

  // Tab configuration with new theme colors
  const tabs = [
    {
      id: 'pending',
      label: 'Pending',
      icon: Clock,
      count: pendingOrders.length,
      bgColor: '#1570EF',
      textColor: '#1570EF'
    },
    {
      id: 'preparing',
      label: 'Preparing',
      icon: Flame,
      count: preparingOrders.length,
      bgColor: '#F59E0B',
      textColor: '#F59E0B'
    },
    {
      id: 'ready',
      label: 'Ready',
      icon: CheckCircle2,
      count: readyOrders.length,
      bgColor: '#10B981',
      textColor: '#10B981'
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      {/* Modern Header with Gradient - STICKY */}
      <div
        className="sticky top-0 z-50 text-white shadow-xl"
        style={{ background: 'linear-gradient(135deg, #4A6CF7 0%, #818CF8 100%)' }}
      >
        <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl shadow-lg">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Kitchen Display</h1>
              <p className="text-sm font-medium opacity-90">
                {user?.name} • {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={loadOrders}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200"
              style={{ color: '#4A6CF7' }}
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/20 text-sm font-semibold shadow-md transition-all duration-200"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Dropdown Navigation - Part of Sticky Header */}
        <div className="bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Dropdown Selector */}
              <div className="flex-1 max-w-md">
                <label className="block text-xs font-semibold mb-2 opacity-90">
                  SELECT ORDER STATUS
                </label>
                <div className="relative">
                  <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                    className="w-full appearance-none text-white font-bold text-lg px-5 py-4 pr-12 rounded-xl shadow-lg cursor-pointer focus:outline-none focus:ring-4 transition-all duration-200 hover:shadow-xl"
                    style={{ backgroundColor: currentTab.bgColor, '--tw-ring-color': 'rgba(255, 255, 255, 0.3)' }}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.id} value={tab.id}>
                        {tab.label} ({tab.count})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white" size={24} />
                </div>
              </div>

              {/* Status Summary Cards */}
              <div className="hidden lg:flex gap-3">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <div
                      key={tab.id}
                      className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[120px]"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={18} />
                        <span className="text-xs font-semibold opacity-90">{tab.label}</span>
                      </div>
                      <div className="text-3xl font-bold">{tab.count}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Messages */}
      {successMessage && (
        <div className="fixed top-24 right-4 z-50 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl border-l-4 border-emerald-400 animate-slide-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} />
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}
      {error && (
        <div className="fixed top-24 right-4 z-50 bg-red-600 text-white px-6 py-4 rounded-xl shadow-2xl border-l-4 border-red-400 animate-slide-in">
          <div className="flex items-center gap-2">
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Orders Display - Full Width Single Section View */}
      <div className="px-4 sm:px-6 py-6">
        {/* Section Header */}
        <div className="mb-6 p-4 rounded-2xl text-white shadow-lg" style={{ backgroundColor: currentTab.bgColor }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {React.createElement(currentTab.icon, { size: 28 })}
              <div>
                <h2 className="text-2xl font-bold">{currentTab.label} Orders</h2>
                <p className="text-sm opacity-90">
                  {getActiveOrders().length} order{getActiveOrders().length !== 1 ? 's' : ''} in this section
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{getActiveOrders().length}</div>
            </div>
          </div>
        </div>

        {/* Orders Grid - Full Width for 10-inch screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {getActiveOrders().map(order => (
            <KitchenOrderCard
              key={order._id}
              order={order}
              onStatusUpdate={handleStatusUpdate}
              currentStatus={activeTab}
            />
          ))}
        </div>

        {/* Empty State */}
        {getActiveOrders().length === 0 && (
          <div className="text-center py-16">
            <div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4"
              style={{ backgroundColor: `${currentTab.bgColor}20` }}
            >
              {React.createElement(currentTab.icon, {
                size: 48,
                style: { color: currentTab.textColor }
              })}
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#374151' }}>
              No {currentTab.label} Orders
            </h3>
            <p style={{ color: '#6B7280' }}>
              All clear! No orders in this section right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenDashboard;
