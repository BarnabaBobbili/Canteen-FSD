import React from 'react';
import { Tag, TrendingUp, ShoppingCart } from 'lucide-react';

const DiscountTabs = ({
  activeTab,
  onTabChange,
  discountedCount,
  allItemsCount,
  popularCount
}) => {
  return (
    <div className="flex gap-2 mb-6 border-b border-gray-200">
      <button
        onClick={() => onTabChange('discounted')}
        className={`px-6 py-3 font-medium transition ${
          activeTab === 'discounted'
            ? 'text-indigo-600 border-b-2 border-indigo-600'
            : 'text-gray-600 hover:text-indigo-600'
        }`}
      >
        <span className="flex items-center gap-2">
          <Tag size={18} />
          Active Discounts ({discountedCount})
        </span>
      </button>
      <button
        onClick={() => onTabChange('all')}
        className={`px-6 py-3 font-medium transition ${
          activeTab === 'all'
            ? 'text-indigo-600 border-b-2 border-indigo-600'
            : 'text-gray-600 hover:text-indigo-600'
        }`}
      >
        <span className="flex items-center gap-2">
          <ShoppingCart size={18} />
          All Menu Items ({allItemsCount})
        </span>
      </button>
      <button
        onClick={() => onTabChange('popular')}
        className={`px-6 py-3 font-medium transition ${
          activeTab === 'popular'
            ? 'text-indigo-600 border-b-2 border-indigo-600'
            : 'text-gray-600 hover:text-indigo-600'
        }`}
      >
        <span className="flex items-center gap-2">
          <TrendingUp size={18} />
          Most Ordered ({popularCount})
        </span>
      </button>
    </div>
  );
};

export default DiscountTabs;
