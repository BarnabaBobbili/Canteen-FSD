import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

const ActivityFilters = ({
  searchTerm,
  onSearchChange,
  onSearch,
  filters,
  onFilterChange,
  showFilters,
  onToggleFilters,
  onClearFilters
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      {/* Search and Filter Toggle */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t('activities.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              type="button"
              aria-label={t('common.clearSearch')}
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button
          onClick={onSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {t('common.search')}
        </button>
        <button
          onClick={onToggleFilters}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          {t('common.filters')}
          {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('activities.activityType')}</label>
            <select
              value={filters.activityType}
              onChange={(e) => onFilterChange('activityType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{t('activities.allTypes')}</option>
              <option value="menu_create">{t('activities.types.menu_create')}</option>
              <option value="menu_update">{t('activities.types.menu_update')}</option>
              <option value="order_create">{t('activities.types.order_create')}</option>
              <option value="order_update">{t('activities.types.order_update')}</option>
              <option value="inventory_create">{t('activities.types.inventory_create')}</option>
              <option value="inventory_update">{t('activities.types.inventory_update')}</option>
              <option value="payment_create">{t('activities.types.payment_create')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('activities.resourceType')}</label>
            <select
              value={filters.resourceType}
              onChange={(e) => onFilterChange('resourceType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{t('activities.allResources')}</option>
              <option value="Menu">{t('resources.Menu')}</option>
              <option value="Order">{t('resources.Order')}</option>
              <option value="Inventory">{t('resources.Inventory')}</option>
              <option value="Payment">{t('resources.Payment')}</option>
              <option value="User">{t('resources.User')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('activities.severity')}</label>
            <select
              value={filters.severity}
              onChange={(e) => onFilterChange('severity', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">{t('activities.allSeverities')}</option>
              <option value="info">{t('severities.info')}</option>
              <option value="warning">{t('severities.warning')}</option>
              <option value="critical">{t('severities.critical')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.startDate')}</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => onFilterChange('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.endDate')}</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => onFilterChange('endDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(filters.activityType || filters.resourceType || filters.severity || filters.startDate || filters.endDate) && (
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">{t('activities.activeFilters')}:</span>
          {filters.activityType && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
              {t('activities.typeFilter')}: {t(`activities.types.${filters.activityType}`)}
              <button
                onClick={() => onFilterChange('activityType', '')}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {filters.resourceType && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
              {t('activities.resourceFilter')}: {t(`resources.${filters.resourceType}`)}
              <button
                onClick={() => onFilterChange('resourceType', '')}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {filters.severity && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
              {t('activities.severityFilter')}: {t(`severities.${filters.severity}`)}
              <button
                onClick={() => onFilterChange('severity', '')}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {filters.startDate && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
              {t('activities.fromFilter')}: {filters.startDate}
              <button
                onClick={() => onFilterChange('startDate', '')}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          )}
          {filters.endDate && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
              {t('activities.toFilter')}: {filters.endDate}
              <button
                onClick={() => onFilterChange('endDate', '')}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X size={14} />
              </button>
            </span>
          )}
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {t('common.clearAll')}
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFilters;
