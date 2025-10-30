import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from './DashboardLayout';
import {
  ShoppingCart, UtensilsCrossed, Package, Users, Truck, Tag,
  MessageSquare, CreditCard, TrendingUp, BarChart3, Clock, CheckCircle, AlertTriangle,
  DollarSign, Filter, X, ChevronRight, Activity, Calendar
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const API_URL = 'http://localhost:5001/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // State for dynamic data
  const [stats, setStats] = useState({
    activeOrders: 0,
    menuItems: 0,
    inventoryItems: 0,
    stockLevel: 0,
    lowStockCount: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for completed orders analytics
  const [allOrders, setAllOrders] = useState([]);
  const [dateFilter, setDateFilter] = useState('week'); // week, month, quarterly, half-yearly, yearly

  // State for all activities and activity modal
  const [allActivities, setAllActivities] = useState([]);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activityDateFilter, setActivityDateFilter] = useState('today'); // today, yesterday, week, all, custom
  const [activityTypeFilter, setActivityTypeFilter] = useState('all'); // all, order, menu, inventory, low-stock, update
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Role-based module access
  const modules = [
    {
      name: 'Orders',
      description: 'Manage customer orders and track status',
      icon: ShoppingCart,
      path: '/orders',
      color: 'from-blue-500 to-blue-600',
      roles: ['admin', 'manager', 'cashier', 'staff']
    },
    {
      name: 'Menu',
      description: 'Manage menu items and categories',
      icon: UtensilsCrossed,
      path: '/menu',
      color: 'from-sky-500 to-sky-600',
      roles: ['admin', 'manager', 'staff']
    },
    {
      name: 'Inventory',
      description: 'Track stock and manage inventory',
      icon: Package,
      path: '/inventory',
      color: 'from-green-500 to-green-600',
      roles: ['admin', 'manager', 'staff']
    },
    {
      name: 'Staff Management',
      description: 'Manage staff accounts and roles',
      icon: Users,
      path: '/staff',
      color: 'from-purple-500 to-purple-600',
      roles: ['admin', 'manager']
    },
    {
      name: 'Suppliers',
      description: 'Manage supplier information',
      icon: Truck,
      path: '/suppliers',
      color: 'from-cyan-500 to-cyan-600',
      roles: ['admin', 'manager']
    },
    {
      name: 'Discounts',
      description: 'Create and manage discount codes',
      icon: Tag,
      path: '/discounts',
      color: 'from-pink-500 to-pink-600',
      roles: ['admin', 'manager']
    },
    {
      name: 'Feedback',
      description: 'View and respond to customer feedback',
      icon: MessageSquare,
      path: '/feedback',
      color: 'from-indigo-500 to-indigo-600',
      roles: ['admin', 'manager']
    },
    {
      name: 'Payments',
      description: 'Process payments and view transactions',
      icon: CreditCard,
      path: '/payments',
      color: 'from-emerald-500 to-emerald-600',
      roles: ['admin', 'manager', 'cashier']
    }
  ];

  // Filter modules based on user role
  const accessibleModules = modules.filter(module =>
    module.roles.includes(user?.role)
  );

  // Fetch dashboard statistics
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [ordersRes, menuRes, inventoryRes, activitiesRes] = await Promise.all([
          fetch(`${API_URL}/orders`),
          fetch(`${API_URL}/menu`),
          fetch(`${API_URL}/inventory`),
          fetch(`${API_URL}/activities?limit=50`, {
            headers: {
              'Authorization': `Bearer ${token || ''}`
            }
          })
        ]);

        const orders = await ordersRes.json();
        const menuItemsData = await menuRes.json();
        const inventoryData = await inventoryRes.json();
        const activitiesData = activitiesRes.ok ? await activitiesRes.json() : { activities: [] };

        // Store all orders for analytics
        setAllOrders(orders);

        // Calculate active orders (pending, preparing, ready)
        const activeOrders = orders.filter(order =>
          ['pending', 'preparing', 'ready'].includes(order.status?.toLowerCase())
        ).length;

        // Calculate stock level percentage
        const totalItems = inventoryData.length;
        const lowStockItems = inventoryData.filter(item => item.quantity < 20).length;
        const stockLevel = totalItems > 0
          ? Math.round(((totalItems - lowStockItems) / totalItems) * 100)
          : 100;

        setStats({
          activeOrders,
          menuItems: menuItemsData.length,
          inventoryItems: totalItems,
          stockLevel,
          lowStockCount: lowStockItems
        });

        // Convert API activities to dashboard format
        const activities = (activitiesData.activities || []).map(activity => {
          const activityDate = new Date(activity.timestamp);

          // Determine icon based on activity type
          let icon = 'update';
          if (activity.activityType.includes('order')) icon = 'order';
          else if (activity.activityType.includes('menu')) icon = 'menu';
          else if (activity.activityType.includes('inventory')) icon = 'inventory';
          else if (activity.activityType.includes('low_stock')) icon = 'alert';

          if (activity.activityType === 'order_complete') icon = 'completed';
          else if (activity.activityType === 'order_cancel') icon = 'cancelled';

          return {
            text: activity.description,
            detail: activity.performedBy ? `By: ${activity.performedBy.name} (${activity.performedBy.role})` : '',
            time: getTimeDifference(activityDate),
            timestamp: activityDate,
            icon,
            type: activity.activityType,
            data: activity,
            createdBy: activity.performedBy,
            updatedBy: activity.performedBy
          };
        });

        // If no API activities, generate from existing data as fallback
        if (activities.length === 0) {
          const fallbackActivities = [];

          // Add all orders with their status changes
          orders.forEach(order => {
            const orderDate = new Date(order.createdAt);

            fallbackActivities.push({
            text: `Order #${order._id?.slice(-6)} - ${order.customerName || 'Customer'} (${order.status})`,
            detail: `${order.items?.length || 0} items, ₹${order.totalAmount?.toFixed(2) || '0.00'}`,
            time: getTimeDifference(orderDate),
            timestamp: orderDate,
            icon: order.status === 'completed' ? 'completed' :
                  order.status === 'cancelled' ? 'cancelled' : 'order',
            type: 'order',
            data: order,
            createdBy: order.createdBy,
            updatedBy: order.updatedBy
          });

            // Add status update activity if order was updated recently
            if (order.updatedAt && order.updatedAt !== order.createdAt) {
              const updateDate = new Date(order.updatedAt);
              fallbackActivities.push({
              text: `Order #${order._id?.slice(-6)} status changed to ${order.status}`,
              detail: order.customerName || 'Customer',
              time: getTimeDifference(updateDate),
              timestamp: updateDate,
              icon: 'update',
              type: 'order-update',
              data: order,
              createdBy: order.createdBy,
              updatedBy: order.updatedBy
            });
          }
        });

          // Add menu items activities
          menuItemsData.forEach(item => {
            const createdDate = new Date(item.createdAt || new Date());

            fallbackActivities.push({
            text: `Menu item "${item.itemName}" added`,
            detail: `${item.category} - ₹${item.price}`,
            time: getTimeDifference(createdDate),
            timestamp: createdDate,
            icon: 'menu',
            type: 'menu-add',
            data: item,
            createdBy: item.createdBy,
            updatedBy: item.updatedBy
          });

            // Add update activity
            if (item.updatedAt && item.updatedAt !== item.createdAt) {
              const updateDate = new Date(item.updatedAt);
              fallbackActivities.push({
                text: `Menu item "${item.itemName}" updated`,
                detail: item.available ? 'Available' : 'Unavailable',
                time: getTimeDifference(updateDate),
                timestamp: updateDate,
                icon: 'menu',
                type: 'menu-update',
                data: item,
                createdBy: item.createdBy,
                updatedBy: item.updatedBy
              });
            }
          });

          // Add inventory activities
          inventoryData.forEach(item => {
            const createdDate = new Date(item.createdAt || new Date());

            fallbackActivities.push({
              text: `Inventory: ${item.itemName} added`,
              detail: `Quantity: ${item.quantity} ${item.unit || ''}`,
              time: getTimeDifference(createdDate),
              timestamp: createdDate,
              icon: 'inventory',
              type: 'inventory-add',
              data: item,
              createdBy: item.createdBy,
              updatedBy: item.updatedBy
            });

            // Low stock alerts
            if (item.quantity < 20) {
              fallbackActivities.push({
                text: `Low stock alert: ${item.itemName}`,
                detail: `Only ${item.quantity} ${item.unit || 'units'} remaining`,
                time: 'now',
                timestamp: new Date(),
                icon: 'alert',
                type: 'low-stock'
              });
            }

            // Update activity
            if (item.updatedAt && item.updatedAt !== item.createdAt) {
              const updateDate = new Date(item.updatedAt);
              fallbackActivities.push({
                text: `Inventory: ${item.itemName} updated`,
                detail: `Current quantity: ${item.quantity}`,
                time: getTimeDifference(updateDate),
                timestamp: updateDate,
                icon: 'inventory',
                type: 'inventory-update'
              });
            }
          });

          // Sort all fallback activities by timestamp (most recent first)
          fallbackActivities.sort((a, b) => b.timestamp - a.timestamp);

          setAllActivities(fallbackActivities);
          setRecentActivity(fallbackActivities.slice(0, 5));
        } else {
          // Use API activities
          setAllActivities(activities);
          setRecentActivity(activities.slice(0, 5));
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to calculate time difference
  const getTimeDifference = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  // Get date range based on filter
  const getDateRange = (filter) => {
    const now = new Date();
    const startDate = new Date();

    switch (filter) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarterly':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'half-yearly':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case 'yearly':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    return { startDate, endDate: now };
  };

  // Filter completed orders by date range
  const completedOrders = useMemo(() => {
    const { startDate, endDate } = getDateRange(dateFilter);

    return allOrders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return (
        order.status?.toLowerCase() === 'completed' &&
        orderDate >= startDate &&
        orderDate <= endDate
      );
    });
  }, [allOrders, dateFilter]);

  // Calculate analytics from completed orders
  const analytics = useMemo(() => {
    const totalOrders = completedOrders.length;
    const totalRevenue = completedOrders.reduce((sum, order) =>
      sum + (order.totalAmount || 0), 0
    );
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Group orders by date for chart
    const ordersByDate = {};
    completedOrders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString();
      if (!ordersByDate[date]) {
        ordersByDate[date] = { date, count: 0, revenue: 0 };
      }
      ordersByDate[date].count++;
      ordersByDate[date].revenue += order.totalAmount || 0;
    });

    const chartData = Object.values(ordersByDate).sort((a, b) =>
      new Date(a.date) - new Date(b.date)
    );

    // Orders by status breakdown
    const ordersByStatus = allOrders.reduce((acc, order) => {
      const status = order.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const statusChartData = Object.entries(ordersByStatus).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value
    }));

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      chartData,
      statusChartData
    };
  }, [completedOrders, allOrders]);

  // Filter activities by date and type
  const filteredActivities = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    return allActivities.filter(activity => {
      // Filter by date
      const activityDate = new Date(activity.timestamp);
      const activityDay = new Date(
        activityDate.getFullYear(),
        activityDate.getMonth(),
        activityDate.getDate()
      );

      let dateMatch = false;
      switch (activityDateFilter) {
        case 'today':
          dateMatch = activityDay.getTime() === today.getTime();
          break;
        case 'yesterday':
          dateMatch = activityDay.getTime() === yesterday.getTime();
          break;
        case 'week':
          dateMatch = activityDate >= weekAgo;
          break;
        case 'custom':
          if (customDateRange.start && customDateRange.end) {
            const startDate = new Date(customDateRange.start);
            const endDate = new Date(customDateRange.end);
            endDate.setHours(23, 59, 59, 999); // Include the entire end date
            dateMatch = activityDate >= startDate && activityDate <= endDate;
          } else {
            dateMatch = true;
          }
          break;
        case 'all':
        default:
          dateMatch = true;
      }

      // Filter by activity type
      let typeMatch = false;
      if (activityTypeFilter === 'all') {
        typeMatch = true;
      } else if (activityTypeFilter === 'order') {
        typeMatch = activity.type === 'order' || activity.type === 'order-update';
      } else if (activityTypeFilter === 'menu') {
        typeMatch = activity.type === 'menu-add' || activity.type === 'menu-update';
      } else if (activityTypeFilter === 'inventory') {
        typeMatch = activity.type === 'inventory-add' || activity.type === 'inventory-update';
      } else if (activityTypeFilter === 'low-stock') {
        typeMatch = activity.type === 'low-stock';
      } else if (activityTypeFilter === 'completed') {
        typeMatch = activity.icon === 'completed';
      } else if (activityTypeFilter === 'cancelled') {
        typeMatch = activity.icon === 'cancelled';
      }

      return dateMatch && typeMatch;
    });
  }, [allActivities, activityDateFilter, activityTypeFilter, customDateRange]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome to Smart Canteen!</h2>
              <p className="text-sky-50 mb-4">
                {user?.role === 'admin' && 'You have full access to all system features.'}
                {user?.role === 'manager' && 'Manage operations and oversee canteen activities.'}
                {user?.role === 'cashier' && 'Process orders and handle payments efficiently.'}
                {user?.role === 'staff' && 'Manage orders, menu items, and inventory.'}
              </p>
              <div className="flex gap-4 text-sm">
                <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur">
                  <div className="font-semibold">{accessibleModules.length}</div>
                  <div className="text-sky-100">Available Modules</div>
                </div>
                {user?.department && user.department !== 'none' && (
                  <div className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur">
                    <div className="font-semibold capitalize">{user.department}</div>
                    <div className="text-sky-100">Department</div>
                  </div>
                )}
              </div>
            </div>
            <BarChart3 className="w-24 h-24 opacity-20" />
          </div>
        </div>

        {/* Quick Access Modules */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Access</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {accessibleModules.slice(1, 5).map((module, index) => {
              const Icon = module.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(module.path)}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-left group"
                >
                  <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${module.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-gray-900 mb-1">{module.name}</h4>
                  <p className="text-xs text-gray-600">{module.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {loading ? '...' : stats.activeOrders}
            </h3>
            <p className="text-sm text-gray-600">Active Orders</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-sky-100 rounded-lg">
                <UtensilsCrossed className="w-6 h-6 text-sky-600" />
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {loading ? '...' : stats.menuItems}
            </h3>
            <p className="text-sm text-gray-600">Menu Items</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              {stats.lowStockCount > 0 ? (
                <AlertTriangle className="w-5 h-5 text-sky-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {loading ? '...' : `${stats.stockLevel}%`}
            </h3>
            <p className="text-sm text-gray-600">
              Stock Level {stats.lowStockCount > 0 && `(${stats.lowStockCount} low)`}
            </p>
          </div>
        </div>

        {/* Recent Activity & Quick Info */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-500" />
                Recent Activity
              </h3>
              <button
                onClick={() => navigate('/activities')}
                className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700 font-medium"
              >
                View More
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {loading ? (
                <div className="text-center py-4 text-gray-500">Loading...</div>
              ) : recentActivity.length > 0 ? (
                recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.icon === 'alert' ? 'bg-red-500' :
                      activity.icon === 'completed' ? 'bg-green-500' :
                      activity.icon === 'cancelled' ? 'bg-red-400' :
                      activity.icon === 'order' ? 'bg-blue-500' :
                      activity.icon === 'menu' ? 'bg-sky-500' :
                      activity.icon === 'inventory' ? 'bg-purple-500' :
                      activity.icon === 'update' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-900 font-medium truncate">{activity.text}</div>
                      {activity.detail && (
                        <div className="text-xs text-gray-500 mt-0.5">{activity.detail}</div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">No recent activity</div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Email</span>
                <span className="text-sm text-gray-900 font-semibold truncate ml-2">{user?.email}</span>
              </div>
              <div className="flex justify-between p-3 bg-sky-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Role</span>
                <span className="text-sm text-gray-900 font-semibold capitalize">{user?.role}</span>
              </div>
              {user?.employeeId && (
                <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Employee ID</span>
                  <span className="text-sm text-gray-900 font-semibold">{user.employeeId}</span>
                </div>
              )}
              {user?.department && user.department !== 'none' && (
                <div className="flex justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Department</span>
                  <span className="text-sm text-gray-900 font-semibold capitalize">{user.department}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Completed Orders Analytics Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-sky-500" />
              Orders Analytics
            </h3>
          </div>

          <div className="space-y-6">
              {/* Date Filter */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <h4 className="font-semibold text-gray-900">Filter by Period</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'week', label: 'Last Week' },
                    { value: 'month', label: 'Last Month' },
                    { value: 'quarterly', label: 'Last Quarter (3 months)' },
                    { value: 'half-yearly', label: 'Last 6 Months' },
                    { value: 'yearly', label: 'Last Year' }
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setDateFilter(filter.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        dateFilter === filter.value
                          ? 'bg-sky-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Analytics Summary Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{analytics.totalOrders}</h3>
                  <p className="text-blue-100">Completed Orders</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">
                    ₹{analytics.totalRevenue.toFixed(2)}
                  </h3>
                  <p className="text-green-100">Total Revenue</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg backdrop-blur">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="text-3xl font-bold mb-1">
                    ₹{analytics.averageOrderValue.toFixed(2)}
                  </h3>
                  <p className="text-purple-100">Average Order Value</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Orders Trend Chart */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Orders Trend</h4>
                  {analytics.chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={analytics.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#f97316"
                          strokeWidth={2}
                          name="Orders"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      No data for selected period
                    </div>
                  )}
                </div>

                {/* Revenue Trend Chart */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Revenue Trend</h4>
                  {analytics.chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analytics.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#10b981" name="Revenue (₹)" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      No data for selected period
                    </div>
                  )}
                </div>
              </div>

              {/* Order Status Distribution */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Order Status Distribution</h4>
                  {analytics.statusChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={analytics.statusChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {analytics.statusChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][index % 5]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                      No orders data available
                    </div>
                  )}
                </div>

                {/* Completed Orders List */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Recent Completed Orders ({completedOrders.length})
                  </h4>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {completedOrders.slice(0, 10).map((order, idx) => (
                      <div
                        key={order._id || idx}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {order.customerName || 'Customer'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()} at{' '}
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">
                            ₹{order.totalAmount?.toFixed(2) || '0.00'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.items?.length || 0} items
                          </div>
                        </div>
                      </div>
                    ))}
                    {completedOrders.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No completed orders in selected period
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Activity Modal */}
        {showActivityModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Activity className="w-6 h-6" />
                    All Activities
                  </h2>
                  <button
                    onClick={() => setShowActivityModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date Filter Dropdown */}
                  <div>
                    <label className="text-sm text-sky-100 mb-2 font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Filter by Date
                    </label>
                    <select
                      value={activityDateFilter}
                      onChange={(e) => {
                        setActivityDateFilter(e.target.value);
                        if (e.target.value !== 'custom') {
                          setCustomDateRange({ start: '', end: '' });
                        }
                      }}
                      className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="week">Last 7 Days</option>
                      <option value="all">All Time</option>
                      <option value="custom">Custom Date Range</option>
                    </select>

                    {/* Custom Date Range Inputs */}
                    {activityDateFilter === 'custom' && (
                      <div className="mt-3 space-y-2">
                        <div>
                          <label className="text-xs text-sky-100 mb-1 block">Start Date</label>
                          <input
                            type="date"
                            value={customDateRange.start}
                            onChange={(e) => setCustomDateRange({ ...customDateRange, start: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-sky-100 mb-1 block">End Date</label>
                          <input
                            type="date"
                            value={customDateRange.end}
                            onChange={(e) => setCustomDateRange({ ...customDateRange, end: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Activity Type Filter Dropdown */}
                  <div>
                    <label className="text-sm text-sky-100 mb-2 font-medium flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filter by Type
                    </label>
                    <select
                      value={activityTypeFilter}
                      onChange={(e) => setActivityTypeFilter(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <option value="all">All Activities</option>
                      <option value="order">Orders</option>
                      <option value="menu">Menu</option>
                      <option value="inventory">Inventory</option>
                      <option value="low-stock">Low Stock</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Activities Count */}
              <div className="px-6 py-3 bg-gray-50 border-b">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{filteredActivities.length}</span> {filteredActivities.length === 1 ? 'activity' : 'activities'}
                </p>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-240px)]">
                {filteredActivities.length > 0 ? (
                  <div className="space-y-2">
                    {filteredActivities.map((activity, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {/* Activity Icon */}
                        <div className={`p-3 rounded-lg flex-shrink-0 ${
                          activity.icon === 'alert' ? 'bg-red-100' :
                          activity.icon === 'completed' ? 'bg-green-100' :
                          activity.icon === 'cancelled' ? 'bg-red-100' :
                          activity.icon === 'order' ? 'bg-blue-100' :
                          activity.icon === 'menu' ? 'bg-sky-100' :
                          activity.icon === 'inventory' ? 'bg-purple-100' :
                          activity.icon === 'update' ? 'bg-yellow-100' :
                          'bg-gray-100'
                        }`}>
                          {activity.icon === 'alert' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                          {activity.icon === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {activity.icon === 'cancelled' && <X className="w-5 h-5 text-red-600" />}
                          {activity.icon === 'order' && <ShoppingCart className="w-5 h-5 text-blue-600" />}
                          {activity.icon === 'menu' && <UtensilsCrossed className="w-5 h-5 text-sky-600" />}
                          {activity.icon === 'inventory' && <Package className="w-5 h-5 text-purple-600" />}
                          {activity.icon === 'update' && <Clock className="w-5 h-5 text-yellow-600" />}
                        </div>

                        {/* Activity Details */}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 mb-1">
                            {activity.text}
                          </div>
                          {activity.detail && (
                            <div className="text-sm text-gray-600">
                              {activity.detail}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>

                        {/* Time Ago */}
                        <div className="text-xs text-gray-500 flex-shrink-0 font-medium">
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Activity className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium">No activities found</p>
                    <p className="text-sm mt-2">Try selecting a different date range</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
                <button
                  onClick={() => setShowActivityModal(false)}
                  className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
