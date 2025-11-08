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
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium mb-1">Today's Orders</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">{stats.totalOrders}</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">12.5%</span>
              </div>
              <span className="text-xs text-gray-500">from yesterday</span>
            </div>
          </div>

          {/* Today's Revenue */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium mb-1">Today's Revenue</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">₹{stats.todayRevenue.toFixed(0)}</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">8.2%</span>
              </div>
              <span className="text-xs text-gray-500">from yesterday</span>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              {stats.pendingOrders > 0 && (
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                  Action Needed
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 font-medium mb-1">Pending Orders</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">{stats.pendingOrders}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Requires attention</span>
            </div>
          </div>
        </div>

        {/* Management Cards Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Quick Access</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {managementCards.map((card) => {
              const colorMap = {
                'Orders Management': { bg: 'bg-indigo-50', icon: 'bg-indigo-50', iconColor: 'text-indigo-600', border: 'border-indigo-100' },
                'Menu Management': { bg: 'bg-green-50', icon: 'bg-green-50', iconColor: 'text-green-600', border: 'border-green-100' },
                'Inventory': { bg: 'bg-orange-50', icon: 'bg-orange-50', iconColor: 'text-orange-600', border: 'border-orange-100' },
                'Discounts': { bg: 'bg-pink-50', icon: 'bg-pink-50', iconColor: 'text-pink-600', border: 'border-pink-100' }
              };
              const colors = colorMap[card.title];

              return (
                <div
                  key={card.path}
                  onClick={() => navigate(card.path)}
                  className={`bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 ${colors.icon} rounded-lg`}>
                      <card.icon className={`${colors.iconColor}`} size={24} />
                    </div>
                    {card.alert && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold flex items-center gap-1">
                        <AlertCircle size={14} />
                        Alert
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{card.stat}</p>
                      <p className="text-xs font-medium text-gray-500">{card.statLabel}</p>
                    </div>
                    <button
                      className={`bg-gradient-to-r ${card.gradient} text-white px-4 py-2 rounded-lg flex items-center gap-2 group-hover:gap-3 transition-all shadow-sm group-hover:shadow-md`}
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
