import React from 'react';
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
  return (
    <div>
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Filter size={16} />
            Filter by Category
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Categories</option>
            <option value="snacks">Snacks</option>
            <option value="beverages">Beverages</option>
            <option value="meals">Meals</option>
            <option value="desserts">Desserts</option>
            <option value="breakfast">Breakfast</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Filter size={16} />
            Filter by Availability
          </label>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Items</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
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
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="category-asc">Category: A to Z</option>
            <option value="category-desc">Category: Z to A</option>
          </select>
        </div>
      </div>
      )}

      {/* Active Filters Display */}
      {(categoryFilter !== 'all' || availabilityFilter !== 'all') && (
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-600">Active filters:</span>
          {categoryFilter !== 'all' && (
            <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1">
              Category: {categoryFilter}
              <button onClick={() => setCategoryFilter('all')} className="hover:bg-sky-200 rounded-full p-0.5">
                <X size={14} />
              </button>
            </span>
          )}
          {availabilityFilter !== 'all' && (
            <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1">
              {availabilityFilter === 'available' ? 'Available' : 'Unavailable'}
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
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuFilterBar;
