import React from 'react';
import { ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../../../context/CartContext';

/**
 * Order Summary component for checkout
 * Uses Cart Context for data
 */
const OrderSummary = ({ deliveryOption = 'dine-in' }) => {
  const { cart, getCartTotal, getCartQuantity } = useCart();
  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.05);
  const quantity = getCartQuantity();
  const takeawayCharge = deliveryOption === 'takeaway' ? quantity * 5 : 0;
  const total = subtotal + tax + takeawayCharge;

  return (
    <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-6">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingBag className="w-5 h-5 text-gray-900" />
        <h2 className="text-xl font-black text-gray-900 underline decoration-wavy decoration-2 underline-offset-4">Order Summary</h2>
      </div>

      {/* Items List */}
      <div className="space-y-3 mb-4 pb-4 border-b-2 border-dashed border-gray-400">
        {cart.map((item) => (
          <div key={item._id} className="flex items-center gap-3 p-2 border-2 border-gray-900 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
            {/* Image */}
            <div className="relative w-12 h-12 flex-shrink-0 border-2 border-gray-900 overflow-hidden">
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
                <UtensilsCrossed className="w-6 h-6 text-gray-900 opacity-30" />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-black text-gray-900 text-sm truncate">
                    {item.itemName}
                  </p>
                  <p className="text-xs text-gray-600 font-bold">Qty: {item.quantity}</p>
                </div>
                <p className="font-black text-gray-900 text-sm ml-2">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-2 mb-4 pb-4 border-b-2 border-dashed border-gray-400">
        <div className="flex justify-between text-gray-700 font-medium">
          <span>Subtotal ({quantity} items)</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-700 font-medium">
          <span>Tax (5%)</span>
          <span>₹{tax}</span>
        </div>
        {deliveryOption === 'takeaway' && (
          <div className="flex justify-between text-orange-600 font-bold">
            <span>Takeaway Charges (₹5 × {quantity})</span>
            <span>₹{takeawayCharge}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between text-xl font-black text-gray-900">
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
