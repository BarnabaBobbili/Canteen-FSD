import React, { useState } from 'react';
import { X, Plus, Minus, UtensilsCrossed } from 'lucide-react';

/**
 * Item details modal for quick view
 * @param {Object} props
 * @param {Object} props.item - Menu item to display
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Handler to close modal
 * @param {Function} props.onAddToCart - Handler to add item to cart
 */
const ItemDetailsModal = ({ item, isOpen, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !item) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(item);
    }
    setQuantity(1);
    onClose();
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sketch-cursor" style={{ fontFamily: '"Comic Sans MS", "Marker Felt", cursive' }}>
        <div className="bg-white border-6 border-gray-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] animate-scale-in transform rotate-1">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:scale-110 transition-all z-10 transform hover:rotate-12"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>

          {/* Image */}
          <div className="relative h-64 sm:h-80 overflow-hidden border-b-4 border-gray-900">
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
              <UtensilsCrossed className="w-24 h-24 text-gray-900 opacity-30" />
            </div>

            {/* Veg/Non-Veg Badge */}
            <div className="absolute top-4 left-4">
              <div className={`w-6 h-6 border-2 flex items-center justify-center bg-white ${
                item.isVeg ? 'border-green-600' : 'border-red-600'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  item.isVeg ? 'bg-green-600' : 'bg-red-600'
                }`}></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 bg-gray-50">
            <h2 className="text-3xl font-black text-gray-900 mb-2 underline decoration-wavy decoration-2 underline-offset-4">{item.itemName}</h2>

            {item.description && (
              <p className="text-gray-700 mb-4 font-medium">{item.description}</p>
            )}

            {item.ingredients && (
              <div className="mb-4 p-3 border-2 border-dashed border-gray-300 bg-white">
                <h3 className="font-black text-gray-900 mb-2">Ingredients:</h3>
                <p className="text-gray-700 text-sm font-medium">{item.ingredients}</p>
              </div>
            )}

            {item.allergens && (
              <div className="mb-4 p-3 border-2 border-dashed border-gray-300 bg-white">
                <h3 className="font-black text-gray-900 mb-2">Allergens:</h3>
                <p className="text-gray-700 text-sm font-medium">{item.allergens}</p>
              </div>
            )}

            {/* Price and Quantity */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t-4 border-dashed border-gray-400">
              <div className="text-3xl font-black text-gray-900">₹{item.price}</div>

              <div className="flex items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center gap-3 bg-white border-2 border-gray-900 px-3 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  <button
                    onClick={decrementQuantity}
                    className="p-1 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-5 h-5 text-gray-900" />
                  </button>
                  <span className="font-black text-lg text-gray-900 min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="p-1 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-900" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black transform hover:scale-105 hover:-rotate-2"
                >
                  <Plus className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetailsModal;
