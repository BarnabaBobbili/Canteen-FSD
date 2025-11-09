import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Phone, Utensils, ShoppingBag, User } from 'lucide-react';

const KitchenOrderCard = ({ order, onStatusUpdate, currentStatus }) => {
  const getElapsedTime = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 min ago';
    if (diffMins < 60) return `${diffMins} mins ago`;

    const hours = Math.floor(diffMins / 60);
    return `${hours}h ${diffMins % 60}m ago`;
  };

  const getNextStatus = () => {
    if (order.status === 'pending') return 'preparing';
    if (order.status === 'preparing') return 'ready';
    return 'completed';
  };

  const getButtonText = () => {
    if (order.status === 'pending') return 'Start Preparing';
    if (order.status === 'preparing') return 'Mark as Ready';
    return 'Complete Order';
  };

  const getButtonConfig = () => {
    if (order.status === 'pending') {
      return {
        bg: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
        icon: ArrowRight,
        shadow: 'shadow-amber-200'
      };
    }
    if (order.status === 'preparing') {
      return {
        bg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
        icon: CheckCircle2,
        shadow: 'shadow-emerald-200'
      };
    }
    return {
      bg: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
      icon: CheckCircle2,
      shadow: 'shadow-blue-200'
    };
  };

  const getOrderTypeIcon = () => {
    switch (order.orderType?.toLowerCase()) {
      case 'dine-in':
        return <Utensils size={16} />;
      case 'counter':
        return <ShoppingBag size={16} />;
      default:
        return <User size={16} />;
    }
  };

  const getElapsedColor = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMins = Math.floor((now - created) / 60000);

    if (diffMins > 30) return 'text-red-600 bg-red-50';
    if (diffMins > 15) return 'text-orange-600 bg-orange-50';
    return 'text-emerald-600 bg-emerald-50';
  };

  const buttonConfig = getButtonConfig();
  const ButtonIcon = buttonConfig.icon;

  return (
    <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-slate-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-100">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gradient-to-br from-slate-600 to-slate-700 text-white p-2 rounded-lg">
              <User size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-slate-800">{order.customerName}</h3>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                  {order.orderNumber}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                <Phone size={14} />
                <span>{order.customerPhone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold text-sm ${getElapsedColor(order.createdAt)}`}>
            <Clock size={16} />
            <span>{getElapsedTime(order.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium">
            {getOrderTypeIcon()}
            <span className="capitalize">{order.orderType}</span>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="space-y-2.5 mb-5">
        <div className="flex items-center gap-2 text-slate-600 font-semibold text-sm mb-2">
          <ShoppingBag size={16} />
          <span>Order Items:</span>
        </div>
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center bg-gradient-to-r from-slate-50 to-slate-100 p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg px-3 py-1.5 font-bold text-lg text-slate-700 shadow-sm">
                {item.quantity}×
              </div>
              <span className="font-semibold text-base text-slate-800">{item.itemName}</span>
            </div>
            {item.price && (
              <span className="text-sm font-bold text-slate-600">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Total Amount */}
      {order.totalAmount && (
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
          <span className="text-slate-600 font-semibold">Total Amount:</span>
          <span className="text-2xl font-bold text-slate-800">₹{order.totalAmount.toFixed(2)}</span>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={() => onStatusUpdate(order._id, getNextStatus())}
        className={`w-full ${buttonConfig.bg} text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg ${buttonConfig.shadow} hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]`}
      >
        <ButtonIcon size={22} className="animate-pulse" />
        {getButtonText()}
      </button>
    </div>
  );
};

export default KitchenOrderCard;
