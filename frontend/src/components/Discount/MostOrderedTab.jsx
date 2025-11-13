import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Award, Tag, Plus } from 'lucide-react';

const MostOrderedTab = ({
  items,
  onEdit
}) => {
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
        <p className="text-lg">{t('discounts.noOrderData')}</p>
        <p className="text-sm">{t('discounts.ordersAppearHere')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Award size={24} />
          {t('discounts.topMostOrdered')}
        </h2>
        <p className="text-sm opacity-90 mt-1">{t('discounts.trackBestSelling')}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('discounts.rank')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('menu.itemName')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('menu.category')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('discounts.totalSold')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('orders.title')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('analytics.revenue')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('discounts.currentDiscount')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('common.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-yellow-400 text-white' :
                    index === 1 ? 'bg-gray-300 text-white' :
                    index === 2 ? 'bg-orange-400 text-white' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item._id}</td>
                <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                  {item.menuItemDetails?.category || t('common.notAvailable')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{item.totalQuantity} {t('discounts.units')}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.orderCount} {t('discounts.orders')}</td>
                <td className="px-6 py-4 text-sm text-green-600 font-semibold">Rs. {item.totalRevenue.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm">
                  {item.menuItemDetails?.discount?.type !== 'none' && item.menuItemDetails?.discount?.value > 0 ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {item.menuItemDetails.discount.type === 'percentage'
                        ? `${item.menuItemDetails.discount.value}${t('discounts.percentOff')}`
                        : `Rs. ${item.menuItemDetails.discount.value}${t('discounts.amountOff')}`}
                    </span>
                  ) : (
                    <span className="text-gray-400">{t('common.none')}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  {item.menuItemDetails ? (
                    <button
                      onClick={() => onEdit(item.menuItemDetails)}
                      className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1 transition-colors ${
                        item.menuItemDetails.discount?.type !== 'none' && item.menuItemDetails.discount?.value > 0
                          ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {item.menuItemDetails.discount?.type !== 'none' && item.menuItemDetails.discount?.value > 0 ? (
                        <>
                          <Tag size={14} />
                          {t('discounts.editDiscount')}
                        </>
                      ) : (
                        <>
                          <Plus size={14} />
                          {t('discounts.addDiscount')}
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">{t('common.notAvailable')}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MostOrderedTab;
