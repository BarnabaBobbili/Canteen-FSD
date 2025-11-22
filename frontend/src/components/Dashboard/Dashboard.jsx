import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import DashboardLayout from '../Layout/DashboardLayout';
import API_BASE_URL from '../../config/api';
import {
  ShoppingCart, UtensilsCrossed, Package, Users, Truck, Tag,
  MessageSquare, CreditCard, FileText
} from 'lucide-react';

// Import Dashboard components
import WelcomeCard from './WelcomeCard';
import QuickAccessModules from './QuickAccessModules';
import DashboardStats from './DashboardStats';
import RecentActivities from './RecentActivities';
import UserInfo from './UserInfo';
import OrderAnalyticsSection from './OrderAnalyticsSection';
import ActivityModal from './ActivityModal';

// Import custom hooks and helpers
import { useDashboardAnalytics } from './useDashboardAnalytics';
import { useDashboardActivities } from './useDashboardActivities';
import {
  getTimeDifference,
  formatActivities,
  generateFallbackActivities
} from './dashboardHelpers';

const Dashboard = () => {
  const { user, token } = useAuth();
  const { formatCurrency } = useSettings();

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

  // State for orders and activities
  const [allOrders, setAllOrders] = useState([]);
  const [allActivities, setAllActivities] = useState([]);

  // State for analytics filters
  const [dateFilter, setDateFilter] = useState('week');

  // State for activity modal
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activityDateFilter, setActivityDateFilter] = useState('today');
  const [activityTypeFilter, setActivityTypeFilter] = useState('all');
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });

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
    },
    {
      name: 'Reports & Export',
      description: 'Generate detailed sales reports, inventory summaries, and financial statements. Export to PDF or Excel.',
      icon: FileText,
      path: '/reports',
      color: 'from-orange-500 to-orange-600',
      roles: ['admin', 'manager']
    }
  ];

  // Filter modules based on user role
  const accessibleModules = modules.filter(module =>
    module.roles.includes(user?.role)
  );

  // Use custom hooks for analytics and activity filtering
  const { completedOrders, analytics } = useDashboardAnalytics(allOrders, dateFilter);
  const filteredActivities = useDashboardActivities(
    allActivities,
    activityDateFilter,
    activityTypeFilter,
    customDateRange
  );

  // Fetch dashboard statistics
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [ordersRes, menuRes, inventoryRes, activitiesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/orders`),
          fetch(`${API_BASE_URL}/menu`),
          fetch(`${API_BASE_URL}/inventory`),
          fetch(`${API_BASE_URL}/activities?limit=50`, {
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

        // Process activities using helper functions
        const activities = activitiesData.activities && activitiesData.activities.length > 0
          ? formatActivities(activitiesData.activities, getTimeDifference)
          : generateFallbackActivities(orders, menuItemsData, getTimeDifference, formatCurrency);

        setAllActivities(activities);
        setRecentActivity(activities.slice(0, 5));
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
  }, [token]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Card */}
        <WelcomeCard user={user} accessibleModules={accessibleModules} />

        {/* Quick Access Modules */}
        <QuickAccessModules accessibleModules={accessibleModules} />

        {/* Stats Grid */}
        <DashboardStats stats={stats} loading={loading} />

        {/* Recent Activity & User Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <RecentActivities recentActivity={recentActivity} loading={loading} />
          <UserInfo user={user} />
        </div>

        {/* Order Analytics Section */}
        <OrderAnalyticsSection
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          analytics={analytics}
          completedOrders={completedOrders}
        />

        {/* Activity Modal */}
        <ActivityModal
          showModal={showActivityModal}
          onClose={() => setShowActivityModal(false)}
          activityDateFilter={activityDateFilter}
          setActivityDateFilter={setActivityDateFilter}
          activityTypeFilter={activityTypeFilter}
          setActivityTypeFilter={setActivityTypeFilter}
          customDateRange={customDateRange}
          setCustomDateRange={setCustomDateRange}
          filteredActivities={filteredActivities}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
