import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Clock } from 'lucide-react';

const ExpiringItemsModal = ({
  isOpen,
  items,
  selectedIds,
  onClose,
  onToggleSelection,
  onToggleAll,
  onApply,
  loading,
  formatDate
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const newItems = items.filter(item => !(item.discount?.reason === 'expiry' && item.discount?.value > 0));
  const discountedItems = items.filter(item => item.discount?.reason === 'expiry' && item.discount?.value > 0);

  const calculateSuggestedDiscount = (expiryDate) => {
    const daysUntilExpiry = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry <= 1) return 70;
    if (daysUntilExpiry <= 3) return 50;
    return 30;
  };

  const calculateDaysUntilExpiry = (expiryDate) => {
    return Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
  };

  const getBadgeColor = (daysUntilExpiry) => {
    if (daysUntilExpiry <= 1) return 'bg-red-200 text-red-900';
    if (daysUntilExpiry <= 3) return 'bg-orange-200 text-orange-900';
    return 'bg-yellow-200 text-yellow-900';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{t('discounts.expiringItems')}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock size={48} className="mx-auto mb-4 opacity-50" />
              <p>{t('discounts.noExpiringItems')}</p>
            </div>
          ) : (
            <>
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 rounded">
                <p className="text-gray-700">
                  {t('discounts.found')} <strong>{items.length}</strong>{t('discounts.expiringWarning')}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {t('discounts.selected')}: <strong>{selectedIds.length}</strong>{t('discounts.expiringSelectionInfo')}
                </p>
              </div>

              {/* Select All Checkbox */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === items.length}
                    onChange={onToggleAll}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                  />
                  <span className="font-semibold text-gray-800">
                    {selectedIds.length === items.length ? t('common.deselectAll') : t('common.selectAll')}
                  </span>
                </label>
              </div>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {/* New Items (not yet discounted) */}
                {newItems.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">{t('discounts.newItems')}</h3>
                    <div className="space-y-2">
                      {newItems.map((item) => {
                        const daysUntilExpiry = calculateDaysUntilExpiry(item.expiryDate);
                        const suggestedDiscount = calculateSuggestedDiscount(item.expiryDate);

                        return (
                          <label
                            key={item._id}
                            className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(item._id)}
                              onChange={() => onToggleSelection(item._id)}
                              className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-800">{item.itemName}</h4>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${getBadgeColor(daysUntilExpiry)}`}>
                                  {suggestedDiscount}{t('discounts.percentOff')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">
                                {t('discounts.expires')}: {formatDate(item.expiryDate)} ({daysUntilExpiry} {t('discounts.day', { count: daysUntilExpiry })}) | {t('discounts.priceSeparator')}: Rs. {item.price.toFixed(2)}
                              </p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Already Discounted Items */}
                {discountedItems.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2 flex items-center gap-2">
                      {t('discounts.alreadyDiscounted')}
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full normal-case">
                        {t('discounts.uncheckToRemove')}
                      </span>
                    </h3>
                    <div className="space-y-2">
                      {discountedItems.map((item) => {
                        const daysUntilExpiry = calculateDaysUntilExpiry(item.expiryDate);

                        return (
                          <label
                            key={item._id}
                            className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg hover:border-red-400 transition cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(item._id)}
                              onChange={() => onToggleSelection(item._id)}
                              className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">{item.itemName}</h4>
                              <p className="text-sm text-gray-600">
                                {t('discounts.expires')}: {formatDate(item.expiryDate)} ({daysUntilExpiry} {t('discounts.day', { count: daysUntilExpiry })}) | {t('discounts.priceSeparator')}: Rs. {item.price.toFixed(2)}
                              </p>
                              <span className="inline-block mt-1 px-2 py-1 bg-red-200 text-red-900 rounded text-xs font-semibold">
                                {t('discounts.current')}: {item.discount.type === 'percentage' ? `${item.discount.value}%` : `Rs. ${item.discount.value}`}{t('discounts.amountOff')}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={onApply}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? t('discounts.applying') : `${t('discounts.proceedApply')} ${selectedIds.length} ${t('discounts.itemsCount', { count: selectedIds.length })}`}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpiringItemsModal;
