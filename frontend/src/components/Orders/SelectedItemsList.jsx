import React from 'react';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../context/SettingsContext';

/**
 * SelectedItemsList Component
 * Displays selected order items with quantity controls
 */
const SelectedItemsList = ({ items, onUpdateQuantity, onRemoveItem, errors }) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();

  if (items.length === 0) {
    return (
      <div className={`text-center py-8 border-2 border-dashed rounded-lg ${
        errors.items ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-300 text-gray-400'
      }`}>
        <ShoppingCart size={32} className="mx-auto mb-2 opacity-50" />
        <p className="text-sm">{t('orders.noOrders')} {t('orders.addItem')}</p>
        {errors.items && <p className="text-red-500 text-xs mt-2 font-semibold">{errors.items}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {items.map((item, index) => {
        const hasDiscount = item.discount && item.discount.type !== 'none' && item.discount.value > 0;

        return (
          <div key={index} className="flex items-center gap-2 p-2 macos-panel">
            <ShoppingCart size={16} className="text-gray-400 flex-shrink-0" />

            {/* Item Details */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-gray-900 truncate">{item.itemName}</p>
              {hasDiscount ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 line-through">{formatCurrency(item.originalPrice)}</span>
                  <span className="text-xs text-green-600 font-semibold">{formatCurrency(item.price)} each</span>
                  <span className="text-xs bg-green-100 text-green-800 px-1 rounded">
                    {item.discount.type === 'percentage' ? `${item.discount.value}% OFF` : `${formatCurrency(item.discount.value)} OFF`}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-gray-500">{formatCurrency(item.price)} each</p>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="p-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                className="p-1 bg-gray-100 hover:bg-gray-200 rounded"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Item Total */}
            <span className={`text-sm font-semibold w-20 text-right ${hasDiscount ? 'text-green-600' : 'text-gray-900'}`}>
              {formatCurrency(item.price * item.quantity)}
            </span>

            {/* Remove Button */}
            <button
              type="button"
              onClick={() => onRemoveItem(index)}
              className="p-1 text-red-600 hover:bg-red-50 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SelectedItemsList;
