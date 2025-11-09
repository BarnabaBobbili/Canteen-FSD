import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  UtensilsCrossed,
  Package,
  Percent,
  DollarSign,
  Clock,
  TrendingUp,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import ManagerLayout from './ManagerLayout';
import API_BASE_URL from '../../config/api';

const ManagerDashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOrders: 0,
    todayRevenue: 0,
    menuItems: 0,
    lowStockItems: 0,
    activeDiscounts: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadStats = async () => {
    try {
      // Fetch orders
      const ordersRes = await fetch(`${API_BASE_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const orders = await ordersRes.json();

      // Today's orders
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayOrders = orders.filter(o => {
        const orderDate = new Date(o.createdAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
      });

      const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);
      const pendingOrders = orders.filter(o => o.status === 'pending').length;

      // Fetch menu items
      const menuRes = await fetch(`${API_BASE_URL}/menu`);
      const menuItems = await menuRes.json();

      // Fetch inventory
      const inventoryRes = await fetch(`${API_BASE_URL}/inventory`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const inventory = await inventoryRes.json();
      const lowStockItems = inventory.filter(i => i.quantity < 20).length;

      // Fetch discounts
      const discountsRes = await fetch(`${API_BASE_URL}/discounts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const discounts = await discountsRes.json();
      const activeDiscounts = discounts.filter(d => d.isActive).length;

      setStats({
        totalOrders: todayOrders.length,
        todayRevenue,
        menuItems: menuItems.length,
        lowStockItems,
        activeDiscounts,
        pendingOrders
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const managementCards = [
    {
      title: 'Orders Management',
      icon: ShoppingBag,
      gradient: 'from-blue-500 to-cyan-600',
      path: '/orders',
      description: 'View and manage all orders in real-time',
      stat: stats.pendingOrders,
      statLabel: 'Pending Orders',
      bgGradient: 'from-blue-50 to-cyan-50',
      iconBg: 'from-blue-500 to-cyan-600',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Menu Management',
      icon: UtensilsCrossed,
      gradient: 'from-emerald-500 to-teal-600',
      path: '/menu',
      description: 'Manage menu items and categories',
      stat: stats.menuItems,
      statLabel: 'Total Items',
      bgGradient: 'from-emerald-50 to-teal-50',
      iconBg: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-200'
    },
    {
      title: 'Inventory',
      icon: Package,
      gradient: 'from-orange-500 to-amber-600',
      path: '/inventory',
      description: 'Track stock levels and supplies',
      stat: stats.lowStockItems,
      statLabel: 'Low Stock Items',
      bgGradient: 'from-orange-50 to-amber-50',
      iconBg: 'from-orange-500 to-amber-600',
      borderColor: 'border-orange-200',
      alert: stats.lowStockItems > 0
    },
    {
      title: 'Discounts',
      icon: Percent,
      gradient: 'from-pink-500 to-rose-600',
      path: '/discounts',
      description: 'Create and manage discount offers',
      stat: stats.activeDiscounts,
      statLabel: 'Active Discounts',
      bgGradient: 'from-pink-50 to-rose-50',
      iconBg: 'from-pink-500 to-rose-600',
      borderColor: 'border-pink-200'
    }
  ];

  return (
    <ManagerLayout>
      <div className="space-y-6">
        {/* DashStack Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Today's Orders */}
          <div
            className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all"
            style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.08)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#EEF2FF' }}>
                <ShoppingBag className="w-6 h-6" style={{ color: '#4A6CF7' }} />
              </div>
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>Today's Orders</p>
            <h3 className="text-3xl font-bold mb-3" style={{ color: '#111827' }}>{stats.totalOrders}</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">12.5%</span>
              </div>
              <span className="text-xs" style={{ color: '#9CA3AF' }}>from yesterday</span>
            </div>
          </div>

          {/* Today's Revenue */}
          <div
            className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all"
            style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.08)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#ECFDF5' }}>
                <DollarSign className="w-6 h-6" style={{ color: '#10B981' }} />
              </div>
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>Today's Revenue</p>
            <h3 className="text-3xl font-bold mb-3" style={{ color: '#111827' }}>₹{stats.todayRevenue.toFixed(0)}</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">8.2%</span>
              </div>
              <span className="text-xs" style={{ color: '#9CA3AF' }}>from yesterday</span>
            </div>
          </div>

          {/* Pending Orders */}
          <div
            className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all"
            style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.08)' }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFF7ED' }}>
                <Clock className="w-6 h-6" style={{ color: '#F59E0B' }} />
              </div>
              {stats.pendingOrders > 0 && (
                <span className="px-2 py-1 rounded text-xs font-semibold" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                  Action Needed
                </span>
              )}
            </div>
            <p className="text-sm font-medium mb-1" style={{ color: '#6B7280' }}>Pending Orders</p>
            <h3 className="text-3xl font-bold mb-3" style={{ color: '#111827' }}>{stats.pendingOrders}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: '#9CA3AF' }}>Requires attention</span>
            </div>
          </div>
        </div>

        {/* Management Cards Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold" style={{ color: '#111827' }}>Quick Access</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {managementCards.map((card) => {
              const colorMap = {
                'Orders Management': { bg: '#EEF2FF', icon: '#4A6CF7' },
                'Menu Management': { bg: '#ECFDF5', icon: '#10B981' },
                'Inventory': { bg: '#FFF7ED', icon: '#F59E0B' },
                'Discounts': { bg: '#FCE7F3', icon: '#EC4899' }
              };
              // Add safe fallback for undefined colors
              const colors = colorMap[card.title] || { bg: '#F3F4F6', icon: '#6B7280' };

              return (
                <div
                  key={card.path}
                  onClick={() => navigate(card.path)}
                  className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
                  style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.08)' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: colors.bg }}>
                      <card.icon size={24} style={{ color: colors.icon }} />
                    </div>
                    {card.alert && (
                      <span className="px-2 py-1 rounded text-xs font-semibold flex items-center gap-1" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                        <AlertCircle size={14} />
                        Alert
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#111827' }}>{card.title}</h3>
                  <p className="text-sm mb-4" style={{ color: '#6B7280' }}>{card.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold mb-1" style={{ color: '#111827' }}>{card.stat}</p>
                      <p className="text-xs font-medium" style={{ color: '#9CA3AF' }}>{card.statLabel}</p>
                    </div>
                    <button
                      className="text-white px-4 py-2 rounded-lg flex items-center gap-2 group-hover:gap-3 transition-all shadow-sm"
                      style={{ backgroundColor: '#4A6CF7' }}
                    >
                      <span className="font-semibold text-sm">View</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ManagerLayout>
  );
};

export default ManagerDashboard;
