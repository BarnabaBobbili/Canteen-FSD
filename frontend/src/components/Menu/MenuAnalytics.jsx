import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart, Bar, PieChart, Pie, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell, ResponsiveContainer
} from 'recharts';
import { useSettings } from '../../context/SettingsContext';

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const MenuAnalytics = ({ menuItems }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  const categoryData = useMemo(() => {
    const categories = {};
    menuItems.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [menuItems]);

  const priceData = useMemo(() => {
    const ranges = { '₹0-50': 0, '₹51-100': 0, '₹101-150': 0, '₹150+': 0 };
    menuItems.forEach(item => {
      if (item.price <= 50) ranges['₹0-50']++;
      else if (item.price <= 100) ranges['₹51-100']++;
      else if (item.price <= 150) ranges['₹101-150']++;
      else ranges['₹150+']++;
    });
    return Object.entries(ranges).map(([name, items]) => ({ name, items }));
  }, [menuItems]);

  const averagePrice = useMemo(() => {
    if (menuItems.length === 0) return 0;
    const total = menuItems.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
    return (total / menuItems.length).toFixed(2);
  }, [menuItems]);

  return (
    <div className="space-y-6 mt-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">{t('menu.totalItems')}</h3>
          <p className="text-4xl font-bold">{menuItems.length}</p>
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">{t('menu.averagePrice')}</h3>
          <p className="text-4xl font-bold">{formatCurrency(averagePrice)}</p>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">{t('menu.categories')}</h3>
          <p className="text-4xl font-bold">{categoryData.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4">{t('menu.categoryDistribution')}</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">{t('common.noData')}</div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4">{t('menu.priceDistribution')}</h3>
          {priceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="items" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">{t('common.noData')}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuAnalytics;
