import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, X, Plus, Minus, Trash2 } from 'lucide-react';

const OrderItem = ({ order, menuItems, onUpdateOrder, onCancelOrder }) => {
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedItems, setEditedItems] = useState(order.items);

  const isPending = order.status === 'pending';

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-gray-500',
      preparing: 'bg-yellow-500',
      ready: 'bg-blue-500',
      completed: 'bg-green-600',
      cancelled: 'bg-red-600'
    };
    return colors[status] || 'bg-gray-500';
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleUpdateQuantity = (idx, change) => {
    const newItems = [...editedItems];
    newItems[idx].quantity += change;
    if (newItems[idx].quantity <= 0) {
      newItems.splice(idx, 1);
    }
    setEditedItems(newItems);
  };

  const handleSaveEdit = async () => {
    if (editedItems.length === 0) {
      alert('Cannot save order with no items');
      return;
    }
    await onUpdateOrder(order._id, { items: editedItems, totalAmount: calculateTotal(editedItems) });
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditedItems(order.items);
    setEditMode(false);
  };

  return (
    <div className={`bg-white border-2 rounded ${isPending ? 'border-yellow-400' : 'border-gray-300'}`}>
      {/* Collapsed Header */}
      <div className="p-3 flex items-center justify-between">
        <div onClick={() => setExpanded(!expanded)} className="flex-1 cursor-pointer">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm">{order.customerName}</h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              {order.orderNumber}
            </span>
            <span className={`${getStatusColor(order.status)} text-white text-xs px-2 py-0.5 rounded`}>
              {order.status}
            </span>
          </div>
          <p className="text-xs text-gray-600">📞 {order.customerPhone}</p>
          <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-sky-600">₹{order.totalAmount.toFixed(2)}</span>
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-200 p-3 bg-gray-50">
          <div className="mb-2 flex justify-between items-center">
            <span className="text-xs text-gray-600">
              <span className="font-semibold">Type:</span> {order.orderType}
            </span>
            {isPending && !editMode && (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                >
                  <Edit2 size={12} /> Edit
                </button>
                <button
                  onClick={() => onCancelOrder(order._id)}
                  className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  <X size={12} /> Cancel Order
                </button>
              </div>
            )}
          </div>

          {editMode ? (
            <>
              <div className="space-y-1 mb-3">
                {editedItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm bg-white p-2 rounded">
                    <span className="flex-1">{item.itemName}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-gray-200 rounded">
                        <button
                          onClick={() => handleUpdateQuantity(idx, -1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-300"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(idx, 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-gray-300"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-semibold w-16 text-right">₹{(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => setEditedItems(editedItems.filter((_, i) => i !== idx))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 px-3 py-2 bg-gray-400 text-white text-sm rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
              <div className="pt-2 border-t border-gray-300 flex justify-between font-bold">
                <span>New Total:</span>
                <span className="text-sky-600">₹{calculateTotal(editedItems).toFixed(2)}</span>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm bg-white p-2 rounded">
                    <span>{item.quantity}x {item.itemName}</span>
                    <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-gray-300 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-sky-600">₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderItem;
