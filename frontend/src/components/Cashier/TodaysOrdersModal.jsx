import React from 'react';
import { X, Search } from 'lucide-react';
import OrderItem from './OrderItem';

/**
 * TodaysOrdersModal Component
 * Modal displaying today's orders with search functionality
 */
const TodaysOrdersModal = ({
  isOpen,
  onClose,
  orders,
  searchTerm,
  onSearchChange,
  menuItems,
  onUpdateOrder,
  onCancelOrder
}) => {
  if (!isOpen || orders.length === 0) return null;

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerPhone.includes(searchTerm)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-lg">
        {/* Header */}
        <div className="bg-sky-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            Today's Orders ({filteredOrders.length})
          </h2>
          <button
            onClick={() => {
              onClose();
              onSearchChange('');
            }}
            className="hover:bg-sky-700 p-2 rounded"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="space-y-2">
            {filteredOrders.map(order => (
              <OrderItem
                key={order._id}
                order={order}
                menuItems={menuItems}
                onUpdateOrder={onUpdateOrder}
                onCancelOrder={onCancelOrder}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysOrdersModal;
