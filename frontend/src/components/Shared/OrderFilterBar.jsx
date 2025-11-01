import React from 'react';
import { Filter, ArrowUpDown, X } from 'lucide-react';

const OrderFilterBar = ({
  statusFilter,
  setStatusFilter,
  orderTypeFilter,
  setOrderTypeFilter,
  sortBy,
  setSortBy
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Filter size={16} />
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Order Type Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Filter size={16} />
            Filter by Order Type
          </label>
          <select
            value={orderTypeFilter}
            onChange={(e) => setOrderTypeFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Types</option>
            <option value="dine-in">Dine-In</option>
            <option value="takeaway">Takeaway</option>
            <option value="delivery">Delivery</option>
            <option value="online">Online</option>
            <option value="counter">Counter</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <ArrowUpDown size={16} />
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          >
            <option value="date-desc">Date: Newest First</option>
            <option value="date-asc">Date: Oldest First</option>
            <option value="total-desc">Total: High to Low</option>
            <option value="total-asc">Total: Low to High</option>
            <option value="customer-asc">Customer: A to Z</option>
            <option value="customer-desc">Customer: Z to A</option>
            <option value="status">Status (Pending → Completed)</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(statusFilter !== 'all' || orderTypeFilter !== 'all') && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Active filters:</span>
          {statusFilter !== 'all' && (
            <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1 capitalize">
              Status: {statusFilter}
              <button onClick={() => setStatusFilter('all')} className="hover:bg-sky-200 rounded-full p-0.5">
                <X size={14} />
              </button>
            </span>
          )}
          {orderTypeFilter !== 'all' && (
            <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1 capitalize">
              Type: {orderTypeFilter}
              <button onClick={() => setOrderTypeFilter('all')} className="hover:bg-sky-200 rounded-full p-0.5">
                <X size={14} />
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setStatusFilter('all');
              setOrderTypeFilter('all');
            }}
            className="text-sm text-sky-600 hover:text-sky-800 font-medium"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderFilterBar;
