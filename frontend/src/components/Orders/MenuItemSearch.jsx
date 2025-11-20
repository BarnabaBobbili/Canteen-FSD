import React from 'react';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../context/SettingsContext';
import { calculateDiscountedPrice } from './orderHelpers';

/**
 * MenuItemSearch Component
 * Search dropdown to select menu items for order
 */
const MenuItemSearch = ({
  searchTerm,
  setSearchTerm,
  menuItems,
  onAddItem
}) => {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();

  const filteredMenuItems = menuItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-3 macos-panel macos-animate">
      {/* Search Input */}
      <div className="relative mb-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('menu.searchItems')}
          className="macos-input w-full pl-9 pr-9"
          autoFocus
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Menu Items List */}
      <div className="max-h-48 overflow-y-auto space-y-1">
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map(item => {
            const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
            const hasDiscount = item.discount && item.discount.type !== 'none' && item.discount.value > 0;

            return (
              <button
                key={item._id}
                type="button"
                onClick={() => onAddItem(item)}
                className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded-lg flex justify-between items-center transition-all duration-200"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.itemName}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                  {hasDiscount && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-semibold">
                      {item.discount.type === 'percentage' ? `${item.discount.value}% OFF` : `${formatCurrency(item.discount.value)} OFF`}
                    </span>
                  )}
                </div>
                <div className="text-right ml-2">
                  {hasDiscount ? (
                    <>
                      <div className="text-xs text-gray-400 line-through">{formatCurrency(item.price)}</div>
                      <div className="text-green-600 font-bold">{formatCurrency(discountedPrice)}</div>
                    </>
                  ) : (
                    <span className="text-sky-600 font-semibold">{formatCurrency(item.price)}</span>
                  )}
                </div>
              </button>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm text-center py-2">{t('menu.noItems')}</p>
        )}
      </div>
    </div>
  );
};

export default MenuItemSearch;
