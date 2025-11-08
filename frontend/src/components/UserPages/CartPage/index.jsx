import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus, ChefHat } from 'lucide-react';
import { useCart } from '../../../context/CartContext';

/**
 * Dedicated Cart Page
 * Uses Cart Context for state management
 */
const CartPage = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, removeAllFromCart, getCartTotal, getCartQuantity } = useCart();
  const total = getCartTotal();
  const quantity = getCartQuantity();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white relative" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
        fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
      }}>
        {/* Header */}
        <div className="bg-white border-b-4 border-gray-900 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/order')}
                className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-all transform hover:-rotate-3"
              >
                <ArrowLeft className="w-6 h-6 text-gray-900" />
              </button>
              <div>
                <h1 className="text-2xl font-black text-gray-900">Your Cart</h1>
                <p className="text-gray-600 text-sm font-medium">Review your order</p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 font-medium">Add some delicious items to get started!</p>
          <button
            onClick={() => navigate('/order')}
            className="px-8 py-3 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black transform hover:scale-105 hover:-rotate-1"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    }}>
      {/* Header */}
      <div className="bg-white border-b-4 border-gray-900 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/order')}
                className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-all transform hover:-rotate-3"
              >
                <ArrowLeft className="w-6 h-6 text-gray-900" />
              </button>
              <div>
                <h1 className="text-2xl font-black text-gray-900">Your Cart</h1>
                <p className="text-gray-600 text-sm font-medium">{quantity} {quantity === 1 ? 'item' : 'items'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div key={item._id} className={`bg-white border-4 border-gray-900 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all transform ${index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'}`}>
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden border-2 border-gray-900">
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
                      <ChefHat className="w-12 h-12 text-gray-900 opacity-30" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-black text-lg text-gray-900">{item.itemName}</h3>
                        <p className="text-gray-900 font-bold text-lg">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => removeAllFromCart(item._id)}
                        className="p-2 text-red-500 border-2 border-red-500 hover:bg-red-50 transition-all transform hover:rotate-6"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-dashed border-gray-300">
                      <div className="flex items-center gap-3 bg-white border-2 border-gray-900 px-3 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-900" />
                        </button>
                        <span className="font-black text-lg text-gray-900 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-gray-900" />
                        </button>
                      </div>
                      <div className="font-black text-gray-900">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] sticky top-6">
              <h2 className="text-xl font-black text-gray-900 mb-4 underline decoration-wavy decoration-2 underline-offset-4">Order Summary</h2>

              <div className="space-y-3 mb-4 pb-4 border-b-2 border-dashed border-gray-400">
                <div className="flex justify-between text-gray-700 font-medium">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-700 font-medium">
                  <span>Tax (5%)</span>
                  <span>₹{Math.round(total * 0.05)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-black text-gray-900 mb-6">
                <span>Total</span>
                <span>₹{Math.round(total * 1.05)}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black text-lg transform hover:scale-105 hover:-rotate-1"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/order')}
                className="w-full mt-3 py-3 border-4 border-gray-900 bg-white text-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all font-bold transform hover:rotate-1"
              >
                Add More Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
