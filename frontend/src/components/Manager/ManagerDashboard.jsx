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
  ArrowRight,
  Sparkles,
  Activity,
  BarChart3
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
      <div className="p-6 space-y-6">
        {/* Modern Welcome Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-8 h-8" />
                <h1 className="text-4xl font-bold">Dashboard Overview</h1>
              </div>
              <p className="text-lg text-purple-100">Monitor your canteen operations in real-time</p>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <Activity className="w-6 h-6 animate-pulse" />
              <span className="text-sm font-semibold">Live Updates</span>
            </div>
          </div>
        </div>

        {/* Modern Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Today's Orders */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-100 overflow-hidden group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <ShoppingBag size={28} className="text-white" />
                </div>
                <div className="bg-purple-50 px-3 py-1.5 rounded-full">
                  <TrendingUp size={18} className="text-purple-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-purple-600 mb-1">Today's Orders</p>
              <p className="text-5xl font-bold text-gray-800 mb-1">{stats.totalOrders}</p>
              <div className="h-1 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full mt-4"></div>
            </div>
          </div>

          {/* Today's Revenue */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-emerald-100 overflow-hidden group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <DollarSign size={28} className="text-white" />
                </div>
                <div className="bg-emerald-50 px-3 py-1.5 rounded-full">
                  <TrendingUp size={18} className="text-emerald-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-emerald-600 mb-1">Today's Revenue</p>
              <p className="text-5xl font-bold text-gray-800 mb-1">₹{stats.todayRevenue.toFixed(0)}</p>
              <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mt-4"></div>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-amber-100 overflow-hidden group">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Clock size={28} className="text-white" />
                </div>
                {stats.pendingOrders > 0 && (
                  <div className="bg-red-100 px-3 py-1.5 rounded-full">
                    <AlertCircle size={18} className="text-red-600 animate-pulse" />
                  </div>
                )}
              </div>
              <p className="text-sm font-semibold text-amber-600 mb-1">Pending Orders</p>
              <p className="text-5xl font-bold text-gray-800 mb-1">{stats.pendingOrders}</p>
              <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mt-4"></div>
            </div>
          </div>
        </div>

        {/* Management Cards Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">Management Modules</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {managementCards.map((card) => (
              <div
                key={card.path}
                onClick={() => navigate(card.path)}
                className={`bg-gradient-to-br ${card.bgGradient} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 ${card.borderColor} overflow-hidden`}
              >
                <div className="p-6 relative">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`bg-gradient-to-br ${card.iconBg} p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                        <card.icon className="text-white" size={32} />
                      </div>
                      {card.alert && (
                        <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse shadow-lg">
                          <AlertCircle size={14} />
                          Alert
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">{card.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-4xl font-bold text-gray-800 mb-1">{card.stat}</p>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{card.statLabel}</p>
                      </div>
                      <div className={`bg-gradient-to-r ${card.gradient} text-white px-5 py-3 rounded-xl flex items-center gap-2 group-hover:gap-4 transition-all shadow-lg group-hover:shadow-xl`}>
                        <span className="font-bold text-sm">Open</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ManagerLayout>
  );
};

export default ManagerDashboard;
