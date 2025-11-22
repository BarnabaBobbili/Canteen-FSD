import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../context/SettingsContext';
import { getMethodIcon } from './paymentHelpers';

/**
 * Payment Method Breakdown Component
 * Displays breakdown of payments by method
 */
const PaymentMethodBreakdown = ({ stats }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  if (!stats?.byMethod || stats.byMethod.length === 0) return null;

  return (
    <div className="macos-card macos-animate p-6 mb-6">
      <h2 className="text-lg font-bold mb-4">{t('payments.paymentMethodBreakdown')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.byMethod.map((method) => (
          <div
            key={method._id || method.name || 'unknown'}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div className="text-2xl mb-2">{getMethodIcon(method._id)}</div>
            <div className="text-sm font-semibold text-gray-700 capitalize">
              {method._id}
            </div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(method.total)}
            </div>
            <div className="text-xs text-gray-500">
              {method.count} {t('payments.transactions')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodBreakdown;
