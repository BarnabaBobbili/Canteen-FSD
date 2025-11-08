import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingCart as CartIcon, Trash2, Check } from 'lucide-react';
import { getCartTotal, getCartQuantity } from './cartHelpers';

/**
 * Shopping cart sidebar component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether cart is open
 * @param {Function} props.onClose - Handler to close cart
 * @param {Array} props.cart - Cart items
 * @param {boolean} props.isAuthenticated - Whether user is logged in
 * @param {Function} props.onAddToCart - Handler to add item
 * @param {Function} props.onRemoveFromCart - Handler to remove item
 * @param {Function} props.onRemoveAllFromCart - Handler to remove all of an item
 */
const ShoppingCart = ({
  isOpen,
  onClose,
  cart,
  isAuthenticated,
  onAddToCart,
  onRemoveFromCart,
  onRemoveAllFromCart
}) => {
  const navigate = useNavigate();
  const total = getCartTotal(cart);
  const quantity = getCartQuantity(cart);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      ></div>

      {/* Cart Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white border-l-4 border-gray-900 shadow-[-4px_0px_0px_0px_rgba(0,0,0,0.2)] z-50 transform transition-transform duration-300 sketch-cursor ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ fontFamily: '"Comic Sans MS", "Marker Felt", cursive' }}>
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="bg-gray-900 border-b-4 border-gray-900 text-white p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CartIcon className="w-6 h-6" />
                <h2 className="text-xl font-black">Your Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 border-2 border-white hover:bg-white/20 transition-all transform hover:rotate-12"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-white/80 text-sm font-medium">{quantity} {quantity === 1 ? 'item' : 'items'}</p>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <CartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-900 text-lg font-bold">Your cart is empty</p>
                <p className="text-gray-600 text-sm mt-2 font-medium">Add some delicious items!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item._id} className="bg-white border-3 border-gray-900 p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-black text-gray-900">{item.itemName}</h3>
                        <p className="text-gray-900 font-bold text-lg">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => onRemoveAllFromCart(item._id)}
                        className="p-1.5 text-red-500 border-2 border-red-500 hover:bg-red-50 transition-all transform hover:rotate-6"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-gray-300">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onRemoveFromCart(item._id)}
                          className="p-2 bg-white border-2 border-gray-900 text-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-black text-lg text-gray-900 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onAddToCart(item)}
                          className="p-2 bg-gray-900 border-2 border-gray-900 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="font-black text-gray-900">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="border-t-4 border-gray-900 p-6 space-y-4 bg-white">
              <div className="flex items-center justify-between text-xl font-black">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">₹{total}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black text-lg transform hover:scale-105 hover:-rotate-1"
              >
                <Check className="w-5 h-5" />
                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
