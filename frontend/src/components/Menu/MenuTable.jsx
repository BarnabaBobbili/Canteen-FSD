import React from 'react';
import { Edit2, Trash2, AlertTriangle, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../context/SettingsContext';
import API_BASE_URL from '../../config/api';
import { calculateDiscountedPrice } from './menuHelpers';

/**
 * MenuTable - Displays menu items in a table format
 * Handles display of stock alerts, expiry warnings, discounts, and actions
 */
const MenuTable = ({
  menuItems,
  onEdit,
  onDelete,
  itemsToShow = 10
}) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
        {t('menu.noItems')}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('menu.image')}</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('menu.itemName')}</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('menu.itemCategory')}</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('menu.itemPrice')}</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('menu.stock')}</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('menu.expiryDate')}</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('menu.available')}</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.slice(0, itemsToShow).map((item) => {
            const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
            const hasDiscount = item.discount && item.discount.type !== 'none' && item.discount.value > 0;

            // Check stock and expiry only for packaged items
            const isPackaged = (item.itemType || 'homemade') === 'packaged';
            const isLowStock = isPackaged && item.stockQuantity <= (item.lowStockThreshold || 10);
            const isOutOfStock = isPackaged && item.stockQuantity === 0;

            let isExpiringSoon = false;
            let isExpired = false;
            let daysUntilExpiry = null;

            if (isPackaged && item.expiryDate) {
              const expiryDate = new Date(item.expiryDate);
              const today = new Date();
              daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
              isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry > 0;
              isExpired = daysUntilExpiry <= 0;
            }

            return (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                {/* Image Cell */}
                <td className="px-6 py-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={(() => {
                          const isExternalUrl = item.image.startsWith('http://') || item.image.startsWith('https://');
                          return isExternalUrl ? item.image : `${API_BASE_URL.replace('/api', '')}${item.image}`;
                        })()}
                        alt={item.itemName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23e5e7eb" width="64" height="64"/%3E%3Ctext fill="%239ca3af" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="10"%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    ) : (
                      <span className="text-xs text-gray-400">{t('menu.noImage')}</span>
                    )}
                  </div>
                </td>

                {/* Item Name Cell with Alerts */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.itemName}</span>
                    {isPackaged && ((isLowStock || isOutOfStock) || (isExpiringSoon || isExpired)) && (
                      <div className="flex gap-1">
                        {(isLowStock || isOutOfStock) && (
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold ${
                            isOutOfStock ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            <AlertTriangle size={12} className="mr-1" />
                            {isOutOfStock ? t('menu.out') : t('menu.low')}
                          </span>
                        )}
                        {(isExpiringSoon || isExpired) && (
                          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold ${
                            isExpired ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            <Clock size={12} className="mr-1" />
                            {isExpired ? t('menu.expired') : `${daysUntilExpiry}d`}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </td>

                {/* Category Cell */}
                <td className="px-6 py-4">
                  <span className="capitalize">{item.category}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                    (item.itemType || 'homemade') === 'homemade' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {(item.itemType || 'homemade') === 'homemade' ? t('menu.homemade') : t('menu.packaged')}
                  </span>
                </td>

                {/* Price Cell */}
                <td className="px-6 py-4">
                  {hasDiscount ? (
                    <div>
                      <div className="text-xs text-gray-400 line-through">{formatCurrency(item.price)}</div>
                      <div className="text-green-600 font-bold">{formatCurrency(discountedPrice)}</div>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-semibold">
                        {item.discount.type === 'percentage' ? `${item.discount.value}% OFF` : `${formatCurrency(item.discount.value)} OFF`}
                      </span>
                    </div>
                  ) : (
                    formatCurrency(item.price)
                  )}
                </td>

                {/* Stock Cell */}
                <td className="px-6 py-4">
                  {item.stockQuantity ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      isOutOfStock ? 'bg-red-100 text-red-800' :
                      isLowStock ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.stockQuantity}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">{t('menu.notApplicable')}</span>
                  )}
                </td>

                {/* Expiry Cell */}
                <td className="px-6 py-4">
                  {item.expiryDate ? (
                    <div>
                      <div className={`text-sm ${isExpired ? 'text-red-600 font-semibold' : isExpiringSoon ? 'text-orange-600' : 'text-gray-700'}`}>
                        {new Date(item.expiryDate).toLocaleDateString()}
                      </div>
                      {isExpired && <div className="text-xs text-red-600">{t('menu.expired')}</div>}
                      {isExpiringSoon && <div className="text-xs text-orange-600">{t('menu.expiresIn')} {daysUntilExpiry} {t('menu.days')}</div>}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">{t('menu.notApplicable')}</span>
                  )}
                </td>

                {/* Available Cell */}
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {item.available ? t('common.yes') : t('common.no')}
                  </span>
                </td>

                {/* Actions Cell */}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit item"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(item._id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Delete item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MenuTable;
