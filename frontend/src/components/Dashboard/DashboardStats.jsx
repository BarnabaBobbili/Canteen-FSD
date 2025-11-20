import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShoppingCart, UtensilsCrossed, Package, Users,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';

/**
 * DashStack-style Dashboard Statistics Cards
 * Displays key metrics with percentage changes
 */
const DashboardStats = ({ stats, loading, previousStats = {} }) => {
  const { t } = useTranslation();
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
      title: t('dashboard.totalOrders'),
      value: loading ? '...' : stats.activeOrders?.toLocaleString() || '0',
      change: orderChange,
      icon: ShoppingCart,
      bgColor: '#E0F2FE',
      iconColor: '#1570EF',
      changeLabel: t('dashboard.fromPastWeek'),
    },
    {
      title: t('dashboard.totalMenuItems'),
      value: loading ? '...' : stats.menuItems?.toLocaleString() || '0',
      change: menuChange,
      icon: UtensilsCrossed,
      bgColor: '#FFF7ED',
      iconColor: '#F59E0B',
      changeLabel: t('dashboard.fromLastMonth'),
    },
    {
      title: t('dashboard.stockLevel'),
      value: loading ? '...' : `${stats.stockLevel}%` || '0%',
      change: stockChange,
      icon: Package,
      bgColor: '#ECFDF5',
      iconColor: '#10B981',
      changeLabel: t('dashboard.fromYesterday'),
    },
    {
      title: t('dashboard.inventoryItems'),
      value: loading ? '...' : stats.inventoryItems?.toLocaleString() || '0',
      change: inventoryChange,
      icon: Users,
      bgColor: '#F5F3FF',
      iconColor: '#8B5CF6',
      changeLabel: t('dashboard.fromLastUpdate'),
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
            className="macos-stat-card macos-animate cursor-pointer"
          >
            {/* Header with Icon */}
            <div className="flex items-center justify-between mb-4">
              <div className="macos-icon-bg" style={{ backgroundColor: card.bgColor }}>
                <Icon className="w-6 h-6" style={{ color: card.iconColor }} />
              </div>
            </div>

            {/* Title */}
            <p className="macos-text text-sm font-medium mb-1">{card.title}</p>

            {/* Value */}
            <h3 className="macos-metric text-2xl sm:text-3xl mb-3">
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
              <span className="text-xs" style={{ color: '#9CA3AF' }}>{card.changeLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
