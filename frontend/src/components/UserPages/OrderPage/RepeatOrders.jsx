import React from 'react';
import { Clock, Plus, UtensilsCrossed } from 'lucide-react';

/**
 * Repeat orders component for logged-in users
 * @param {Object} props
 * @param {Array} props.repeatOrders - Array of frequently ordered items
 * @param {Function} props.onAddToCart - Handler for adding item to cart
 */
const RepeatOrders = ({ repeatOrders, onAddToCart }) => {
  if (!repeatOrders || repeatOrders.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-900" />
        <h2 className="text-xl font-black text-gray-900">Order Again</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {repeatOrders.map((item, index) => (
          <div
            key={item._id}
            className={`bg-white border-3 border-gray-900 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all cursor-pointer transform ${index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'}`}
            onClick={() => onAddToCart(item)}
          >
            <div className="flex items-center gap-3 p-4">
              {/* Small Image */}
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden border-2 border-gray-900">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className={`absolute inset-0 bg-gray-200 flex items-center justify-center ${
                    item.image ? 'hidden' : ''
                  }`}
                >
                  <UtensilsCrossed className="w-8 h-8 text-gray-900 opacity-30" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-black text-gray-900">{item.itemName}</h3>
                <p className="text-sm text-gray-900 font-bold">₹{item.price}</p>
              </div>
              <button className="p-2 bg-gray-900 border-2 border-gray-900 text-white flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] transition-all">
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepeatOrders;
