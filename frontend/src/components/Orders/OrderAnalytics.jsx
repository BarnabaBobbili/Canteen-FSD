import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../context/SettingsContext';

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

const OrderAnalytics = ({ orders }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  // Filter orders to only show today's orders
  const todayOrders = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= today && orderDate < tomorrow;
    });
  }, [orders]);

  const statusData = useMemo(() => {
    const statuses = {};
    todayOrders.forEach(order => {
      statuses[order.status] = (statuses[order.status] || 0) + 1;
    });
    return Object.entries(statuses).map(([name, value]) => ({ name, value }));
  }, [todayOrders]);

  const typeData = useMemo(() => {
    const types = {};
    todayOrders.forEach(order => {
      types[order.orderType] = (types[order.orderType] || 0) + 1;
    });
    return Object.entries(types).map(([name, value]) => ({ name, value }));
  }, [todayOrders]);

  const totalRevenue = useMemo(() => {
    return todayOrders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + parseFloat(order.totalAmount || 0), 0)
      .toFixed(2);
  }, [todayOrders]);

  const averageOrder = useMemo(() => {
    if (todayOrders.length === 0) return 0;
    const total = todayOrders.reduce((sum, o) => sum + parseFloat(o.totalAmount || 0), 0);
    return (total / todayOrders.length).toFixed(2);
  }, [todayOrders]);

  return (
    <div className="space-y-6 mt-6">
      {/* Header */}
      <div className="macos-card p-4 border-l-4 border-sky-500 macos-animate">
        <h2 className="text-2xl font-bold text-gray-900 macos-heading">{t('orders.orderAnalytics')}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="macos-stat-card macos-gradient-green text-white">
          <h3 className="text-lg font-semibold mb-2">{t('orders.totalRevenue')}</h3>
          <p className="text-4xl font-bold macos-metric text-white">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="macos-stat-card macos-gradient-blue text-white">
          <h3 className="text-lg font-semibold mb-2">{t('orders.todayOrders')}</h3>
          <p className="text-4xl font-bold macos-metric text-white">{todayOrders.length}</p>
        </div>
        <div className="macos-stat-card macos-gradient-purple text-white">
          <h3 className="text-lg font-semibold mb-2">{t('orders.averageOrderValue')}</h3>
          <p className="text-4xl font-bold macos-metric text-white">{formatCurrency(averageOrder)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="macos-card p-6 macos-animate">
          <h3 className="text-lg font-bold mb-4">{t('orders.orderStatus')} {t('common.status')}</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">{t('orders.noOrders')}</div>
          )}
        </div>

        <div className="macos-card p-6 macos-animate">
          <h3 className="text-lg font-bold mb-4 macos-subheading">{t('orders.orderType')} {t('common.status')}</h3>
          {typeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">{t('orders.noOrders')}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderAnalytics;
