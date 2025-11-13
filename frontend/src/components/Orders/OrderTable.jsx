import React from 'react';
import { useTranslation } from 'react-i18next';
import { Edit2, Trash2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { getStatusColor } from './orderHelpers';

/**
 * Order Table Component
 * Displays orders in a table format with actions
 */
const OrderTable = ({ orders, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
        <p className="text-gray-500">{t('orders.noOrders')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('orders.orderNumber')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('orders.customerName')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('orders.email')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('orders.phone')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('orders.orderType')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('orders.status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('orders.total')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('common.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                {/* Order Number */}
                <td className="px-6 py-4 text-sm font-bold text-indigo-600">
                  {order.orderNumber}
                </td>

                {/* Customer Name */}
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {order.customerName}
                </td>

                {/* Email */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {order.customerEmail || '-'}
                </td>

                {/* Phone */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {order.customerPhone}
                </td>

                {/* Order Type */}
                <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                  {order.orderType}
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>

                {/* Total Amount */}
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                  {formatCurrency(order.totalAmount)}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(order)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(order._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
