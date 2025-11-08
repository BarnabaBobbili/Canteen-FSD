import React from 'react';
import { TrendingUp, DollarSign, Clock, Star } from 'lucide-react';

/**
 * Sort filter component for menu items
 * @param {Object} props
 * @param {string} props.selectedSort - Currently selected sort option
 * @param {Function} props.onSortChange - Handler for sort change
 */
const SortFilter = ({ selectedSort, onSortChange }) => {
  const sortOptions = [
    { id: 'default', label: 'Default', icon: Star },
    { id: 'popularity', label: 'Popular', icon: TrendingUp },
    { id: 'price-low', label: 'Price: Low to High', icon: DollarSign },
    { id: 'price-high', label: 'Price: High to Low', icon: DollarSign },
    { id: 'newest', label: 'Newest', icon: Clock }
  ];

  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm font-black text-gray-900 whitespace-nowrap">Sort by:</span>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sortOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              onClick={() => onSortChange(option.id)}
              className={`flex items-center gap-2 px-4 py-2 border-2 font-bold whitespace-nowrap transition-all transform ${
                selectedSort === option.id
                  ? 'bg-gray-900 border-gray-900 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] -rotate-1'
                  : 'bg-white border-gray-900 text-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] hover:-rotate-1'
              }`}
            >
              <Icon className="w-4 h-4" />
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SortFilter;
