import React from 'react';
import { useTranslation } from 'react-i18next';
import { Package, Clock } from 'lucide-react';

const DiscountActionButtons = ({
  onLowStockClick,
  onExpiringItemsClick,
  loading
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <button
        onClick={onLowStockClick}
        disabled={loading}
        className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition shadow-md disabled:opacity-50"
      >
        <Package size={24} />
        <div className="text-left">
          <div className="font-semibold">{t('discounts.autoDiscountLowStock')}</div>
          <div className="text-sm opacity-90">{t('discounts.autoDiscountLowStockDesc')}</div>
        </div>
      </button>

      <button
        onClick={onExpiringItemsClick}
        disabled={loading}
        className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition shadow-md disabled:opacity-50"
      >
        <Clock size={24} />
        <div className="text-left">
          <div className="font-semibold">{t('discounts.autoDiscountExpiring')}</div>
          <div className="text-sm opacity-90">{t('discounts.autoDiscountExpiringDesc')}</div>
        </div>
      </button>
    </div>
  );
};

export default DiscountActionButtons;
