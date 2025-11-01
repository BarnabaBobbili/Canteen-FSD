import React from 'react';
import { Package, Clock } from 'lucide-react';

const DiscountActionButtons = ({
  onLowStockClick,
  onExpiringItemsClick,
  loading
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <button
        onClick={onLowStockClick}
        disabled={loading}
        className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition shadow-md disabled:opacity-50"
      >
        <Package size={24} />
        <div className="text-left">
          <div className="font-semibold">Auto-Discount Low Stock</div>
          <div className="text-sm opacity-90">Apply 15% off to low inventory items</div>
        </div>
      </button>

      <button
        onClick={onExpiringItemsClick}
        disabled={loading}
        className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition shadow-md disabled:opacity-50"
      >
        <Clock size={24} />
        <div className="text-left">
          <div className="font-semibold">Auto-Discount Expiring Items</div>
          <div className="text-sm opacity-90">Apply up to 70% off for items near expiry</div>
        </div>
      </button>
    </div>
  );
};

export default DiscountActionButtons;
