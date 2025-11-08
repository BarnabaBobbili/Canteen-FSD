import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ChefHat, User } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

/**
 * Header component for order page
 * @param {Object} props
 * @param {number} props.cartQuantity - Total items in cart
 * @param {Function} props.onCartClick - Handler for cart button click
 */
const OrderHeader = ({ cartQuantity, onCartClick }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="sticky top-0 z-40 bg-white border-b-4 border-gray-900 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-all transform hover:-rotate-3"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-gray-900 border-3 border-gray-900 p-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)]">
                <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-black text-gray-900">Order Food</h1>
                <p className="text-xs text-gray-600 hidden sm:block font-medium">Choose your favorites</p>
              </div>
            </div>
          </div>

          {/* Right Side - Profile & Cart */}
          <div className="flex items-center gap-2">
            {/* Profile Button (only for authenticated users) */}
            {user && (
              <button
                onClick={() => navigate('/profile')}
                className="p-3 border-2 border-gray-900 bg-white hover:bg-gray-100 transition-all transform hover:rotate-3"
                title="My Profile"
              >
                <User className="w-6 h-6 text-gray-900" />
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-3 border-2 border-gray-900 bg-white hover:bg-gray-100 transition-all transform hover:rotate-3"
            >
              <ShoppingCart className="w-6 h-6 text-gray-900" />
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-200 border-2 border-gray-900 text-gray-900 text-xs font-black w-6 h-6 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]">
                  {cartQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
