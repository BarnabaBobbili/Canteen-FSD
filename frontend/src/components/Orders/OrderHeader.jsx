import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Filter, ChevronUp, ChevronDown } from 'lucide-react';
import SearchBar from '../Shared/SearchBar';
import OrderFilterBar from '../Shared/OrderFilterBar';

/**
 * Order Header Component
 * Contains search bar, filters toggle, and add order button
 */
const OrderHeader = ({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  statusFilter,
  setStatusFilter,
  orderTypeFilter,
  setOrderTypeFilter,
  sortBy,
  setSortBy,
  onAddOrder
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 p-6">
      {/* Search Bar and Buttons */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="flex-1 min-w-[300px]">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder={t('orders.searchOrders')}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          <Filter size={16} />
          {t('common.filters')}
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <button
          onClick={onAddOrder}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
        >
          <Plus size={18} /> {t('orders.addOrder')}
        </button>
      </div>

      {/* Filters */}
      <OrderFilterBar
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        orderTypeFilter={orderTypeFilter}
        setOrderTypeFilter={setOrderTypeFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        showFilters={showFilters}
      />
    </div>
  );
};

export default OrderHeader;
