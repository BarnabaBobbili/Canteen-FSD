import React from 'react';
import {
  ShoppingCart, UtensilsCrossed, Package, Users,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';

/**
 * DashStack-style Dashboard Statistics Cards
 * Displays key metrics with percentage changes
 */
const DashboardStats = ({ stats, loading, previousStats = {} }) => {
  // Calculate percentage changes
  const calculateChange = (current, previous) => {
    if (!previous || previous === 0) return { value: 0, isPositive: true };
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change >= 0
    };
  };

  const orderChange = calculateChange(stats.activeOrders, previousStats.activeOrders);
  const menuChange = calculateChange(stats.menuItems, previousStats.menuItems);
  const stockChange = calculateChange(stats.stockLevel, previousStats.stockLevel);
  const inventoryChange = calculateChange(stats.inventoryItems, previousStats.inventoryItems);

  const statCards = [
    {
      title: 'Total Orders',
      value: loading ? '...' : stats.activeOrders?.toLocaleString() || '0',
      change: orderChange,
      icon: ShoppingCart,
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      changeLabel: 'from past week',
    },
    {
      title: 'Total Menu Items',
      value: loading ? '...' : stats.menuItems?.toLocaleString() || '0',
      change: menuChange,
      icon: UtensilsCrossed,
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      changeLabel: 'from last month',
    },
    {
      title: 'Stock Level',
      value: loading ? '...' : `${stats.stockLevel}%` || '0%',
      change: stockChange,
      icon: Package,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      changeLabel: 'from yesterday',
    },
    {
      title: 'Inventory Items',
      value: loading ? '...' : stats.inventoryItems?.toLocaleString() || '0',
      change: inventoryChange,
      icon: Users,
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      changeLabel: 'from last update',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 md:mb-8">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        const changeColor = card.change.isPositive ? 'text-green-600' : 'text-red-600';
        const ChangeArrowIcon = card.change.isPositive ? ArrowUpRight : ArrowDownRight;

        return (
          <div
            key={index}
            className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
          >
            {/* Header with Icon */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${card.bgColor} rounded-lg`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>

            {/* Title */}
            <p className="text-sm text-gray-600 font-medium mb-1">{card.title}</p>

            {/* Value */}
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              {card.value}
            </h3>

            {/* Change Indicator */}
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-1 ${changeColor}`}>
                <ChangeArrowIcon className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {card.change.value}%
                </span>
              </div>
              <span className="text-xs text-gray-500">{card.changeLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
