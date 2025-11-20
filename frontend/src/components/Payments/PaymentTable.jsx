import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { getStatusColor, getMethodIcon, formatDate } from './paymentHelpers';

/**
 * Payment Table Component
 * Displays payments in a table format with actions
 */
const PaymentTable = ({ payments, loading, onViewDetails }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  return (
    <div className="macos-card macos-animate overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="macos-table-header">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('payments.transactionId')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('common.customer')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('payments.method')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('common.amount')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('common.status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('common.date')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('common.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  {t('common.loading')}
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  {t('payments.noPayments')}
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment._id} className="macos-table-row-colors">
                  {/* Transaction ID */}
                  <td className="px-6 py-4 text-sm font-medium text-indigo-600">
                    {payment.transactionId || payment.razorpayPaymentId || 'N/A'}
                  </td>

                  {/* Customer Info */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {payment.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.customerEmail}
                    </div>
                  </td>

                  {/* Payment Method */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getMethodIcon(payment.paymentMethod)}</span>
                      <span className="text-sm capitalize">{payment.paymentMethod}</span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    {formatCurrency(payment.finalAmount != null ? payment.finalAmount : 0)}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(payment.paymentStatus)}`}>
                      {payment.paymentStatus}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(payment.createdAt)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onViewDetails(payment)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title={t('common.viewDetails')}
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
