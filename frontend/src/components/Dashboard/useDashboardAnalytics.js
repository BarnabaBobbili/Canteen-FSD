import { useMemo } from 'react';
import { getDateRange } from './dashboardHelpers';

/**
 * Custom hook for dashboard analytics calculations
 * @param {Array} allOrders - All orders from API
 * @param {string} dateFilter - Date filter type ('week', 'month', etc.)
 * @returns {Object} Analytics data including completedOrders and computed metrics
 */
export const useDashboardAnalytics = (allOrders, dateFilter) => {
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

  return { completedOrders, analytics };
};
