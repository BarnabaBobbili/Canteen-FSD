import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tag, DollarSign, Percent, Package, Calendar } from 'lucide-react';

const ActiveDiscountsTab = ({
  items,
  onEdit,
  onRemove,
  calculateDiscountedPrice,
  getDiscountBadgeColor,
  formatDate
}) => {
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <div className="col-span-full text-center py-12 text-gray-500">
        <Tag size={48} className="mx-auto mb-4 opacity-50" />
        <p className="text-lg">{t('discounts.noActiveDiscounts')}</p>
        <p className="text-sm">{t('discounts.applyToStart')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item._id}
          className="macos-card macos-animate-md p-5 hover:shadow-lg transition border border-gray-200"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-lg text-gray-800">{item.itemName}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDiscountBadgeColor(item.discount.reason)}`}>
              {t(`discounts.reasons.${item.discount.reason}`)}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign size={16} />
              <span className="line-through">Rs. {item.price.toFixed(2)}</span>
              <span className="text-green-600 font-bold text-lg">
                Rs. {calculateDiscountedPrice(item.price, item.discount).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Percent size={16} className="text-indigo-600" />
              <span className="font-semibold text-indigo-600">
                {item.discount.type === 'percentage'
                  ? `${item.discount.value}${t('discounts.percentOff')}`
                  : `Rs. ${item.discount.value}${t('discounts.amountOff')}`}
              </span>
            </div>

            {item.stockQuantity !== undefined && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package size={16} />
                <span>{t('discounts.stock')}: {item.stockQuantity} {t('discounts.units')}</span>
              </div>
            )}

            {item.expiryDate && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>{t('discounts.expires')}: {formatDate(item.expiryDate)}</span>
              </div>
            )}

            <div className="text-xs text-gray-500">
              {t('discounts.applied')}: {formatDate(item.discount.appliedAt)}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(item)}
              className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition text-sm font-medium"
            >
              {t('common.edit')}
            </button>
            <button
              onClick={() => onRemove(item._id)}
              className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium"
            >
              {t('common.remove')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveDiscountsTab;
