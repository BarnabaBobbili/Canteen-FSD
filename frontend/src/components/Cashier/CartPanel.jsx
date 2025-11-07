import React, { useMemo, useCallback } from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { calculateCartTotal, validatePhone, validateEmail } from './cashierHelpers';

const CartPanel = React.memo(({
  cart,
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
  customerPhone,
  setCustomerPhone,
  orderType,
  setOrderType,
  onUpdateQuantity,
  onRemoveFromCart,
  onPlaceOrder
}) => {
  // Memoize cart total
  const total = useMemo(() => calculateCartTotal(cart), [cart]);

  // Memoize total items count
  const totalItems = useMemo(() =>
    cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  // Memoized validation
  const isFormValid = useMemo(() => {
    if (!customerName.trim()) return false;
    if (!customerPhone.trim()) return false;
    if (!validatePhone(customerPhone)) return false;
    if (customerEmail.trim() && !validateEmail(customerEmail)) return false;
    return cart.length > 0;
  }, [customerName, customerPhone, customerEmail, cart]);

  const handlePlaceOrder = useCallback(() => {
    if (isFormValid) {
      onPlaceOrder();
    }
  }, [isFormValid, onPlaceOrder]);

  return (
    <div className="bg-white rounded shadow p-4 h-full flex flex-col border border-gray-200">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
        <div className="bg-sky-500 p-2 rounded">
          <ShoppingCart className="text-white" size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">Current Order</h2>
          <p className="text-xs text-gray-500">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      {/* Customer Details */}
      <div className="mb-4 space-y-2">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Customer Name *</label>
          <input
            type="text"
            placeholder="Enter name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number *</label>
          <input
            type="tel"
            placeholder="10-digit number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
            maxLength="10"
            pattern="[0-9]{10}"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Email (Optional)</label>
          <input
            type="email"
            placeholder="customer@email.com"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Order Type</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-500 bg-white"
          >
            <option value="counter">🏪 Counter</option>
            <option value="dine-in">🍽️ Dine-in</option>
            <option value="online">📱 Online</option>
          </select>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-2 flex-1 overflow-y-auto mb-4">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <ShoppingCart size={40} className="mb-2 opacity-30" />
            <p className="text-sm">Cart is empty</p>
          </div>
        ) : (
          [...cart].reverse().map(item => {
            // Calculate actual price with discount
            const actualPrice = item.discount?.type !== 'none' && item.discount?.value > 0
              ? item.discount.type === 'percentage'
                ? item.price - (item.price * item.discount.value / 100)
                : item.price - item.discount.value
              : item.price;

            const hasDiscount = item.discount?.type !== 'none' && item.discount?.value > 0;

            return (
              <div key={item._id} className="bg-gray-50 border border-gray-200 rounded p-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800">{item.itemName}</p>
                    <div className="flex items-center gap-2 text-xs">
                      {hasDiscount && (
                        <span className="text-gray-400 line-through">₹{item.price}</span>
                      )}
                      <span className={hasDiscount ? "text-green-600 font-semibold" : "text-gray-500"}>
                        ₹{actualPrice.toFixed(2)} × {item.quantity}
                      </span>
                      {hasDiscount && (
                        <span className="bg-green-600 text-white text-xs px-1 rounded">
                          {item.discount.value}{item.discount.type === 'percentage' ? '%' : '₹'} OFF
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 bg-gray-200 rounded p-1">
                    <button
                      onClick={() => onUpdateQuantity(item._id, -1)}
                      className="w-7 h-7 bg-white rounded flex items-center justify-center hover:bg-sky-500 hover:text-white"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-sm text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item._id, 1)}
                      className="w-7 h-7 bg-white rounded flex items-center justify-center hover:bg-sky-500 hover:text-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-base font-bold text-sky-600">₹{(actualPrice * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Total & Place Order */}
      <div className="border-t border-gray-200 pt-3">
        <div className="bg-sky-50 rounded p-3 mb-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Total:</span>
            <span className="text-2xl font-bold text-sky-600">₹{total.toFixed(2)}</span>
          </div>
          {cart.length > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              {totalItems} items
            </div>
          )}
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={!isFormValid}
          className="w-full bg-sky-500 text-white py-3 rounded hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed font-bold"
        >
          {cart.length === 0 ? 'Cart is Empty' : 'Place Order'}
        </button>
      </div>
    </div>
  );
});

CartPanel.displayName = 'CartPanel';

export default CartPanel;
