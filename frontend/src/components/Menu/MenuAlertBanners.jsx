import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';

/**
 * MenuAlertBanners - Displays stock and expiry alerts for packaged items
 * Shows: Out of stock, low stock, expired, and expiring soon alerts
 */
const MenuAlertBanners = ({
  outOfStockItems = [],
  lowStockItems = [],
  expiredItems = [],
  expiringItems = []
}) => {
  // Don't render if no alerts
  if (outOfStockItems.length === 0 &&
      lowStockItems.length === 0 &&
      expiredItems.length === 0 &&
      expiringItems.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 space-y-2">
      {/* Out of Stock Alert */}
      {outOfStockItems.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="text-red-500 mr-3" size={20} />
            <div>
              <p className="text-red-800 font-semibold">
                Out of Stock ({outOfStockItems.length} items)
              </p>
              <p className="text-red-700 text-sm">
                {outOfStockItems.map(item => item.itemName).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="text-yellow-600 mr-3" size={20} />
            <div>
              <p className="text-yellow-800 font-semibold">
                Low Stock Alert ({lowStockItems.length} items)
              </p>
              <p className="text-yellow-700 text-sm">
                {lowStockItems.map(item => `${item.itemName} (${item.stockQuantity})`).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Expired Items Alert */}
      {expiredItems.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <Clock className="text-red-500 mr-3" size={20} />
            <div>
              <p className="text-red-800 font-semibold">
                Expired Items ({expiredItems.length})
              </p>
              <p className="text-red-700 text-sm">
                {expiredItems.map(item => item.itemName).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Expiring Soon Alert */}
      {expiringItems.length > 0 && (
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg">
          <div className="flex items-center">
            <Clock className="text-orange-600 mr-3" size={20} />
            <div>
              <p className="text-orange-800 font-semibold">
                Expiring Soon ({expiringItems.length} items)
              </p>
              <p className="text-orange-700 text-sm">
                {expiringItems.map(item => {
                  const daysLeft = Math.ceil(
                    (new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
                  );
                  return `${item.itemName} (${daysLeft}d)`;
                }).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuAlertBanners;
