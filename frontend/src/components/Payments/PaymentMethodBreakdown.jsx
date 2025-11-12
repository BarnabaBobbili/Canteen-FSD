import React from 'react';
import { getMethodIcon } from './paymentHelpers';

/**
 * Payment Method Breakdown Component
 * Displays breakdown of payments by method
 */
const PaymentMethodBreakdown = ({ stats }) => {
  if (!stats?.byMethod || stats.byMethod.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
      <h2 className="text-lg font-bold mb-4">Payment Method Breakdown</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.byMethod.map((method, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
          >
            <div className="text-2xl mb-2">{getMethodIcon(method._id)}</div>
            <div className="text-sm font-semibold text-gray-700 capitalize">
              {method._id}
            </div>
            <div className="text-lg font-bold text-gray-900">
              ₹{method.total.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">
              {method.count} transactions
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodBreakdown;
