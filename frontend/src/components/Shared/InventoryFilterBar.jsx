import React from 'react';
import { Filter, ArrowUpDown, X } from 'lucide-react';

const InventoryFilterBar = ({
  supplierFilter,
  setSupplierFilter,
  stockFilter,
  setStockFilter,
  sortBy,
  setSortBy,
  suppliers = []
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Supplier Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Filter size={16} />
            Filter by Supplier
          </label>
          <select
            value={supplierFilter}
            onChange={(e) => setSupplierFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Suppliers</option>
            {suppliers.map((supplier, idx) => (
              <option key={idx} value={supplier.name}>{supplier.name}</option>
            ))}
          </select>
        </div>

        {/* Stock Level Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Filter size={16} />
            Filter by Stock Level
          </label>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Stock Levels</option>
            <option value="low">Low Stock (Below 20)</option>
            <option value="normal">Normal Stock (20+)</option>
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
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="quantity-asc">Quantity: Low to High</option>
            <option value="quantity-desc">Quantity: High to Low</option>
            <option value="supplier-asc">Supplier: A to Z</option>
            <option value="supplier-desc">Supplier: Z to A</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(supplierFilter !== 'all' || stockFilter !== 'all') && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Active filters:</span>
          {supplierFilter !== 'all' && (
            <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1">
              Supplier: {supplierFilter}
              <button onClick={() => setSupplierFilter('all')} className="hover:bg-sky-200 rounded-full p-0.5">
                <X size={14} />
              </button>
            </span>
          )}
          {stockFilter !== 'all' && (
            <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1">
              {stockFilter === 'low' ? 'Low Stock' : 'Normal Stock'}
              <button onClick={() => setStockFilter('all')} className="hover:bg-sky-200 rounded-full p-0.5">
                <X size={14} />
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setSupplierFilter('all');
              setStockFilter('all');
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

export default InventoryFilterBar;
