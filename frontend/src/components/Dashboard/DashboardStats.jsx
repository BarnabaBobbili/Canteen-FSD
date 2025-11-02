import React from 'react';
import {
  ShoppingCart, UtensilsCrossed, Package, TrendingUp,
  CheckCircle, AlertTriangle
} from 'lucide-react';

const DashboardStats = ({ stats, loading }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 md:mb-8">
      {/* Active Orders Card */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
          {loading ? '...' : stats.activeOrders}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">Active Orders</p>
      </div>

      {/* Menu Items Card */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 bg-sky-100 rounded-lg">
            <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
          </div>
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
          {loading ? '...' : stats.menuItems}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">Menu Items</p>
      </div>

      {/* Stock Level Card */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 bg-green-100 rounded-lg">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </div>
          {stats.lowStockCount > 0 ? (
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />
          ) : (
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
          )}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
          {loading ? '...' : `${stats.stockLevel}%`}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">
          Stock Level {stats.lowStockCount > 0 && `(${stats.lowStockCount} low)`}
        </p>
      </div>
    </div>
  );
};

export default DashboardStats;
