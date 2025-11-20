import React from 'react';
import { Plus, Minus, Heart, UtensilsCrossed, Search, Eye } from 'lucide-react';
import { findCartItem } from './cartHelpers';
import { getImageUrl } from '../../Menu/menuHelpers';
import API_BASE_URL from '../../../config/api';

/**
 * Menu grid component displaying menu items
 * @param {Object} props
 * @param {Array} props.items - Filtered menu items to display
 * @param {Array} props.cart - Current cart items
 * @param {Array} props.favorites - Array of favorite item IDs
 * @param {boolean} props.loading - Loading state
 * @param {Function} props.onAddToCart - Handler for adding item to cart
 * @param {Function} props.onRemoveFromCart - Handler for removing item from cart
 * @param {Function} props.onToggleFavorite - Handler for toggling favorite
 * @param {Function} props.onItemClick - Handler for item click (open modal)
 */
const MenuGrid = ({
  items,
  cart,
  favorites,
  loading,
  onAddToCart,
  onRemoveFromCart,
  onToggleFavorite,
  onItemClick
}) => {
  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-900 font-bold">Loading menu...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-900 text-lg font-bold">No items found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => {
        const cartItem = findCartItem(cart, item._id);
        const quantity = cartItem ? cartItem.quantity : 0;

        return (
          <div
            key={item._id}
            className={`bg-white border-4 border-gray-900 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all transform hover:-translate-y-1 ${index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'}`}
          >
            {/* Menu Item Image */}
            <div className="relative h-48 overflow-hidden group cursor-pointer" onClick={() => onItemClick && onItemClick(item)}>
              {getImageUrl(item.image, API_BASE_URL) ? (
                <img
                  src={getImageUrl(item.image, API_BASE_URL)}
                  alt={item.itemName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className={`absolute inset-0 bg-gray-200 flex items-center justify-center ${
                  getImageUrl(item.image, API_BASE_URL) ? 'hidden' : ''
                }`}
              >
                <UtensilsCrossed className="w-16 h-16 text-gray-900 opacity-30" />
              </div>

              {/* Veg/Non-Veg Indicator */}
              <div className="absolute top-3 left-3">
                <div className={`w-6 h-6 border-2 flex items-center justify-center bg-white ${
                  item.isVeg ? 'border-green-600' : 'border-red-600'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${
                    item.isVeg ? 'bg-green-600' : 'bg-red-600'
                  }`}></div>
                </div>
              </div>

              {/* Quick View Button */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemClick && onItemClick(item);
                  }}
                  className="px-4 py-2 bg-white border-2 border-gray-900 text-gray-900 font-bold flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] transition-all transform hover:-rotate-2"
                >
                  <Eye className="w-4 h-4" />
                  Quick View
                </button>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(item._id);
                }}
                className="absolute top-3 right-3 p-2 bg-white border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform z-10"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.includes(item._id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            </div>

            <div className="p-5 bg-gray-50">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-black text-lg text-gray-900 mb-1">{item.itemName}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-700 line-clamp-2">{item.description}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-dashed border-gray-300">
                <div className="text-2xl font-black text-gray-900">₹{item.price}</div>

                {quantity === 0 ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-2 border-gray-900 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] transition-all font-bold transform hover:-rotate-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromCart(item._id);
                      }}
                      className="p-2 bg-white border-2 border-gray-900 text-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] transition-all"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="font-black text-lg text-gray-900 min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(item);
                      }}
                      className="p-2 bg-gray-900 border-2 border-gray-900 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuGrid;
