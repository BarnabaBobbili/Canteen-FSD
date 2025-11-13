import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X, Filter, Clock, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';

const DiscountFilters = ({
  activeTab,
  discountedSearch,
  allItemsSearch,
  popularSearch,
  onDiscountedSearchChange,
  onAllItemsSearchChange,
  onPopularSearchChange,
  showFilters,
  onToggleFilters,
  categoryFilter,
  expiryFilter,
  sortBy,
  onCategoryChange,
  onExpiryChange,
  onSortChange,
  onClearFilters
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex gap-4 mb-4">
        {activeTab === 'discounted' && (
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('discounts.searchActivePlaceholder')}
              value={discountedSearch}
              onChange={(e) => onDiscountedSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {discountedSearch && (
              <button
                onClick={() => onDiscountedSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
                aria-label={t('common.clearSearch')}
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        {activeTab === 'all' && (
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('discounts.searchAllPlaceholder')}
              value={allItemsSearch}
              onChange={(e) => onAllItemsSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {allItemsSearch && (
              <button
                onClick={() => onAllItemsSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
                aria-label={t('common.clearSearch')}
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        {activeTab === 'popular' && (
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('discounts.searchPopularPlaceholder')}
              value={popularSearch}
              onChange={(e) => onPopularSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {popularSearch && (
              <button
                onClick={() => onPopularSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
                aria-label={t('common.clearSearch')}
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        <button
          onClick={onToggleFilters}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
        >
          <Filter size={16} />
          {t('common.filters')}
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {showFilters && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Filter size={16} />
                {t('discounts.filterByCategory')}
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">{t('discounts.allCategories')}</option>
                <option value="snacks">{t('menu.categories.snacks')}</option>
                <option value="beverages">{t('menu.categories.beverages')}</option>
                <option value="meals">{t('menu.categories.meals')}</option>
                <option value="desserts">{t('menu.categories.desserts')}</option>
                <option value="breakfast">{t('menu.categories.breakfast')}</option>
              </select>
            </div>

            {/* Expiry Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} />
                {t('discounts.filterByExpiry')}
              </label>
              <select
                value={expiryFilter}
                onChange={(e) => onExpiryChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">{t('discounts.allItems')}</option>
                <option value="expiring-soon">{t('discounts.expiringSoon')}</option>
                <option value="expired">{t('discounts.expired')}</option>
                <option value="has-expiry">{t('discounts.hasExpiry')}</option>
                <option value="no-expiry">{t('discounts.noExpiry')}</option>
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <ArrowUpDown size={16} />
                {t('common.sortBy')}
              </label>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="discount-desc">{t('discounts.sort.discountDesc')}</option>
                <option value="discount-asc">{t('discounts.sort.discountAsc')}</option>
                <option value="price-desc">{t('discounts.sort.priceDesc')}</option>
                <option value="price-asc">{t('discounts.sort.priceAsc')}</option>
                <option value="expiry-soon">{t('discounts.sort.expirySoon')}</option>
                <option value="expiry-late">{t('discounts.sort.expiryLate')}</option>
                <option value="name-asc">{t('discounts.sort.nameAsc')}</option>
                <option value="name-desc">{t('discounts.sort.nameDesc')}</option>
              </select>
            </div>
          </div>
        </>
      )}

      {/* Active Filters Display - Always visible when filters are active */}
      {(categoryFilter !== 'all' || expiryFilter !== 'all') && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">{t('discounts.activeFilters')}:</span>
          {categoryFilter !== 'all' && (
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-1">
              {t('menu.category')}: {t(`menu.categories.${categoryFilter}`)}
              <button
                onClick={() => onCategoryChange('all')}
                className="hover:bg-indigo-200 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {expiryFilter !== 'all' && (
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-1">
              {t('inventory.expiry')}: {t(`discounts.expiryFilters.${expiryFilter}`)}
              <button
                onClick={() => onExpiryChange('all')}
                className="hover:bg-indigo-200 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          )}
          <button
            onClick={onClearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {t('common.clearAll')}
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscountFilters;
