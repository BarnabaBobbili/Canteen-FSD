import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from './Layout/DashboardLayout';
import API_BASE_URL from '../config/api';
import {
  ShoppingCart, UtensilsCrossed, Package, Users, Truck, Tag,
  MessageSquare, CreditCard
} from 'lucide-react';

// Import Dashboard components
import WelcomeCard from './Dashboard/WelcomeCard';
import QuickAccessModules from './Dashboard/QuickAccessModules';
import DashboardStats from './Dashboard/DashboardStats';
import RecentActivities from './Dashboard/RecentActivities';
import UserInfo from './Dashboard/UserInfo';
import OrderAnalyticsSection from './Dashboard/OrderAnalyticsSection';
import ActivityModal from './Dashboard/ActivityModal';

// Import custom hooks and helpers
import { useDashboardAnalytics } from './Dashboard/useDashboardAnalytics';
import { useDashboardActivities } from './Dashboard/useDashboardActivities';
import {
  getTimeDifference,
  formatActivities,
  generateFallbackActivities
} from './Dashboard/dashboardHelpers';

const AdminDashboard = () => {
  const { t } = useTranslation();
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

  // Role-based module access (admin paths with /admin prefix)
  const modules = [
    {
      name: t('modules.orders.name'),
      description: t('modules.orders.description'),
      icon: ShoppingCart,
      path: '/admin/orders',
      color: 'from-blue-500 to-blue-600',
      roles: ['admin']
    },
    {
      name: t('modules.menu.name'),
      description: t('modules.menu.description'),
      icon: UtensilsCrossed,
      path: '/admin/menu',
      color: 'from-sky-500 to-sky-600',
      roles: ['admin']
    },
    {
      name: t('modules.inventory.name'),
      description: t('modules.inventory.description'),
      icon: Package,
      path: '/admin/inventory',
      color: 'from-green-500 to-green-600',
      roles: ['admin']
    },
    {
      name: t('modules.staff.name'),
      description: t('modules.staff.description'),
      icon: Users,
      path: '/admin/staff',
      color: 'from-purple-500 to-purple-600',
      roles: ['admin']
    },
    {
      name: t('modules.suppliers.name'),
      description: t('modules.suppliers.description'),
      icon: Truck,
      path: '/admin/suppliers',
      color: 'from-cyan-500 to-cyan-600',
      roles: ['admin']
    },
    {
      name: t('modules.discounts.name'),
      description: t('modules.discounts.description'),
      icon: Tag,
      path: '/admin/discounts',
      color: 'from-pink-500 to-pink-600',
      roles: ['admin']
    },
    {
      name: t('modules.feedback.name'),
      description: t('modules.feedback.description'),
      icon: MessageSquare,
      path: '/admin/feedback',
      color: 'from-indigo-500 to-indigo-600',
      roles: ['admin']
    },
    {
      name: t('modules.payments.name'),
      description: t('modules.payments.description'),
      icon: CreditCard,
      path: '/admin/payments',
      color: 'from-emerald-500 to-emerald-600',
      roles: ['admin']
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
          : generateFallbackActivities(orders, menuItemsData, getTimeDifference);

        setAllActivities(activities);
        setRecentActivity(activities.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error(`${t('dashboard.fetchError')}:`, error);
        setLoading(false);
      }
    };

    fetchDashboardData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [token, t]);

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

export default AdminDashboard;
