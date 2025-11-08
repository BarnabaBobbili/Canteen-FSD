import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle, XCircle, ChefHat } from 'lucide-react';

/**
 * Order History component for user profile
 * @param {Object} props
 * @param {Array} props.orders - Array of past orders
 * @param {boolean} props.loading - Loading state
 */
const OrderHistory = ({ orders, loading }) => {
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-[#8FCB9B]" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'preparing':
      case 'ready':
        return <ChefHat className="w-5 h-5 text-[#FF7A00]" />;
      default:
        return <Clock className="w-5 h-5 text-[#2E3A47]" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-[#F9F9F9] text-[#8FCB9B] border-[#8FCB9B]';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'preparing':
      case 'ready':
        return 'bg-[#F9F9F9] text-[#FF7A00] border-[#FF7A00]';
      default:
        return 'bg-[#F9F9F9] text-[#2E3A47] border-[#2E3A47]';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading order history...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-black text-gray-900 mb-2">No Orders Yet</h3>
        <p className="text-gray-600 mb-6 font-medium">Start ordering delicious food from our menu!</p>
        <button
          onClick={() => navigate('/order')}
          className="px-6 py-3 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black transform hover:scale-105 hover:-rotate-1"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all p-6 cursor-pointer transform hover:-rotate-1"
          onClick={() => navigate('/order-tracking', { state: { orderId: order._id, orderNumber: order.orderNumber } })}
        >
          {/* Order Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-5 h-5 text-gray-900" />
                <span className="font-black text-gray-900">Order #{order.orderNumber}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">{formatDate(order.createdAt)}</p>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 border-2 ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              <span className="text-sm font-black capitalize">{order.status}</span>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-2 mb-4 pb-4 border-b-2 border-dashed border-gray-400">
            {order.items.slice(0, 3).map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 font-medium">
                  {item.itemName} × {item.quantity}
                </span>
                <span className="font-black text-gray-900">₹{item.price * item.quantity}</span>
              </div>
            ))}
            {order.items.length > 3 && (
              <p className="text-sm text-gray-500 font-medium">+{order.items.length - 3} more items</p>
            )}
          </div>

          {/* Order Total */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-bold">Total Amount</span>
            <span className="text-2xl font-black text-gray-900">₹{order.totalAmount}</span>
          </div>

          {/* Track Order Button */}
          {order.status !== 'completed' && order.status !== 'cancelled' && (
            <button
              className="w-full mt-4 py-2 border-4 border-gray-900 bg-white text-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all font-black transform hover:rotate-1"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/order-tracking', { state: { orderId: order._id, orderNumber: order.orderNumber } });
              }}
            >
              Track Order
            </button>
          )}

          {/* Reorder Button */}
          {order.status === 'completed' && (
            <button
              className="w-full mt-4 py-2 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black transform hover:scale-105 hover:-rotate-1"
              onClick={(e) => {
                e.stopPropagation();
                // TODO: Add reorder functionality
                navigate('/order');
              }}
            >
              Reorder
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
