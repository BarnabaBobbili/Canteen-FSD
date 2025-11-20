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
    <div className="macos-filter-bar mb-6 macos-animate">
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
          className="macos-input flex items-center gap-2 px-4 py-2 font-medium text-sm"
        >
          <Filter size={16} />
          {t('common.filters')}
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <button
          onClick={onAddOrder}
          className="macos-btn flex items-center gap-2 text-white font-medium text-sm"
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
