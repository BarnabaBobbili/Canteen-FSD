import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../context/SettingsContext';

/**
 * OrderSummary Component
 * Displays order total with breakdown (subtotal, takeaway charges)
 */
const OrderSummary = ({ selectedItems, orderType, totalAmount }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();

  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const showTakeawayCharges = orderType === 'takeaway' && selectedItems.length > 0;

  return (
    <div className="mb-4 border-t pt-4">
      <div className="macos-section space-y-2">
        {showTakeawayCharges && (
          <>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal:</span>
              <span className="font-semibold">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-orange-600">
              <span>Takeaway Charges ({formatCurrency(5)} × {totalQuantity}):</span>
              <span className="font-semibold">
                {formatCurrency(totalQuantity * 5)}
              </span>
            </div>
            <div className="border-t border-gray-300 my-1"></div>
          </>
        )}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">{t('orders.totalAmount')}:</span>
          <span className="text-2xl font-bold text-sky-600">
            {formatCurrency(totalAmount || 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
