import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../context/SettingsContext';
import { getStatusColor, formatDate } from './paymentHelpers';

/**
 * Payment Detail Modal Component
 * Displays detailed information about a payment
 */
const PaymentDetailModal = ({ payment, isOpen, onClose }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen || !payment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{t('payments.paymentDetails')}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Transaction ID */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                {t('payments.transactionId')}
              </label>
              <p className="text-gray-900">
                {payment.transactionId || payment.razorpayPaymentId || 'N/A'}
              </p>
            </div>

            {/* Payment Method */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                {t('payments.paymentMethod')}
              </label>
              <p className="text-gray-900 capitalize">
                {payment.paymentMethod}
              </p>
            </div>

            {/* Customer Name */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                {t('common.customerName')}
              </label>
              <p className="text-gray-900">{payment.customerName}</p>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                {t('common.email')}
              </label>
              <p className="text-gray-900">{payment.customerEmail || 'N/A'}</p>
            </div>

            {/* Amount */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                {t('common.amount')}
              </label>
              <p className="text-gray-900">
                {payment.amount != null ? formatCurrency(payment.amount) : 'N/A'}
              </p>
            </div>

            {/* Tax */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                {t('payments.tax')}
              </label>
              <p className="text-gray-900">
                {payment.tax != null ? formatCurrency(payment.tax) : 'N/A'}
              </p>
            </div>

            {/* Discount */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                {t('payments.discount')}
              </label>
              <p className="text-gray-900">
                {payment.discountApplied != null ? formatCurrency(payment.discountApplied) : 'N/A'}
              </p>
            </div>

            {/* Final Amount */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                {t('payments.finalAmount')}
              </label>
              <p className="text-gray-900 font-bold">
                {payment.finalAmount != null ? formatCurrency(payment.finalAmount) : 'N/A'}
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                {t('common.status')}
              </label>
              <div className="mt-1">
                <span className={`inline-flex px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(payment.paymentStatus)}`}>
                  {payment.paymentStatus}
                </span>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                {t('common.date')}
              </label>
              <p className="text-gray-900">
                {formatDate(payment.createdAt, true)}
              </p>
            </div>

            {/* Razorpay Order ID (if applicable) */}
            {payment.razorpayOrderId && (
              <div className="col-span-2">
                <label className="text-sm font-semibold text-gray-600">
                  {t('payments.razorpayOrderId')}
                </label>
                <p className="text-gray-900 font-mono text-sm">
                  {payment.razorpayOrderId}
                </p>
              </div>
            )}

            {/* Notes (if any) */}
            {payment.notes && (
              <div className="col-span-2">
                <label className="text-sm font-semibold text-gray-600">
                  {t('common.notes')}
                </label>
                <p className="text-gray-900">{payment.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailModal;
