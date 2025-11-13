import React from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

/**
 * Payment Statistics Cards Component
 * Displays key payment metrics in card format
 */
const PaymentStats = ({ stats }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Revenue */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <DollarSign className="w-8 h-8 opacity-80" />
          <TrendingUp className="w-5 h-5" />
        </div>
        <div className="text-2xl font-bold">
          {formatCurrency(stats.overall?.totalRevenue || 0)}
        </div>
        <div className="text-sm opacity-90">{t('payments.totalRevenue')}</div>
      </div>

      {/* Total Transactions */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <CreditCard className="w-8 h-8 opacity-80" />
          <span className="text-lg font-semibold">
            {stats.overall?.completedPayments || 0}
          </span>
        </div>
        <div className="text-2xl font-bold">
          {stats.overall?.totalPayments || 0}
        </div>
        <div className="text-sm opacity-90">{t('payments.totalTransactions')}</div>
      </div>

      {/* Refunds */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <TrendingDown className="w-8 h-8 opacity-80" />
          <span className="text-lg font-semibold">
            {stats.overall?.failedPayments || 0}
          </span>
        </div>
        <div className="text-2xl font-bold">
          {formatCurrency(stats.overall?.totalRefunds || 0)}
        </div>
        <div className="text-sm opacity-90">{t('payments.refunds')}</div>
      </div>

      {/* Discounts */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <DollarSign className="w-8 h-8 opacity-80" />
          <span className="text-lg font-semibold">
            {formatCurrency(stats.overall?.totalTax || 0)}
          </span>
        </div>
        <div className="text-2xl font-bold">
          {formatCurrency(stats.overall?.totalDiscounts || 0)}
        </div>
        <div className="text-sm opacity-90">{t('payments.discounts')}</div>
      </div>
    </div>
  );
};

export default PaymentStats;
