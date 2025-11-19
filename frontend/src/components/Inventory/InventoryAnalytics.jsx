import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const InventoryAnalytics = ({ inventory, suppliers }) => {
  const { t } = useTranslation();
  const supplierData = useMemo(() => {
    const supplierCounts = {};
    inventory.forEach(item => {
      supplierCounts[item.supplier] = (supplierCounts[item.supplier] || 0) + 1;
    });
    return Object.entries(supplierCounts).map(([name, value]) => ({ name, value }));
  }, [inventory]);

  const lowStockCount = useMemo(() => {
    return inventory.filter(item => item.quantity < 20).length;
  }, [inventory]);

  return (
    <div className="space-y-6 mt-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">{t('inventory.totalItems')}</h3>
          <p className="text-4xl font-bold">{inventory.length}</p>
        </div>
        <div className="macos-stat-card macos-gradient-red text-white">
          <h3 className="text-lg font-semibold mb-2">{t('inventory.lowStockAlert')}</h3>
          <p className="text-4xl font-bold">{lowStockCount}</p>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">{t('common.suppliers')}</h3>
          <p className="text-4xl font-bold">{suppliers.length}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="macos-card p-6 macos-animate-lg">
        <h3 className="text-lg font-bold mb-4">{t('inventory.inventoryAnalytics')}</h3>
        {supplierData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={supplierData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name.substring(0, 8)} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {supplierData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-8 text-gray-500">{t('common.noData')}</div>
        )}
      </div>
    </div>
  );
};

export default InventoryAnalytics;
