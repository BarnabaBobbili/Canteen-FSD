import React from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, ArrowUpDown, X } from 'lucide-react';

const MenuFilterBar = ({
  categoryFilter,
  setCategoryFilter,
  availabilityFilter,
  setAvailabilityFilter,
  sortBy,
  setSortBy,
  showFilters = true
}) => {
  const { t } = useTranslation();
  return (
    <div>
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Filter size={16} />
            {t('menu.filterByCategory')}
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">{t('menu.allCategories')}</option>
            <option value="snacks">{t('menu.snacks')}</option>
            <option value="beverages">{t('menu.beverages')}</option>
            <option value="meals">{t('menu.meals')}</option>
            <option value="desserts">{t('menu.desserts')}</option>
            <option value="breakfast">{t('menu.breakfast')}</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Filter size={16} />
            {t('menu.filterByAvailability')}
          </label>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">{t('menu.allItems')}</option>
            <option value="available">{t('menu.available')}</option>
            <option value="unavailable">{t('menu.unavailable')}</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <ArrowUpDown size={16} />
            {t('menu.sortBy')}
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          >
            <option value="name-asc">{t('menu.nameAscending')}</option>
            <option value="name-desc">{t('menu.nameDescending')}</option>
            <option value="price-asc">{t('menu.priceAscending')}</option>
            <option value="price-desc">{t('menu.priceDescending')}</option>
            <option value="category-asc">{t('menu.categoryAscending')}</option>
            <option value="category-desc">{t('menu.categoryDescending')}</option>
          </select>
        </div>
      </div>
      )}

      {/* Active Filters Display */}
      {(categoryFilter !== 'all' || availabilityFilter !== 'all') && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">{t('menu.activeFilters')}:</span>
          {categoryFilter !== 'all' && (
            <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1">
              {t('menu.itemCategory')}: {categoryFilter}
              <button onClick={() => setCategoryFilter('all')} className="hover:bg-sky-200 rounded-full p-0.5">
                <X size={14} />
              </button>
            </span>
          )}
          {availabilityFilter !== 'all' && (
            <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1">
              {availabilityFilter === 'available' ? t('menu.available') : t('menu.unavailable')}
              <button onClick={() => setAvailabilityFilter('all')} className="hover:bg-sky-200 rounded-full p-0.5">
                <X size={14} />
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setCategoryFilter('all');
              setAvailabilityFilter('all');
            }}
            className="text-sm text-sky-600 hover:text-sky-800 font-medium"
          >
            {t('common.clearAll')}
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuFilterBar;
