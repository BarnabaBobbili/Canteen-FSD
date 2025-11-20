import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Plus, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import API_BASE_URL from '../../../config/api';

/**
 * Favorite Items component for user profile
 * @param {Object} props
 * @param {Array} props.favoriteIds - Array of favorite item IDs
 * @param {Function} props.onRemoveFavorite - Handler to remove favorite
 */
const FavoriteItems = ({ favoriteIds, onRemoveFavorite }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favoriteIds && favoriteIds.length > 0) {
      loadFavoriteItems();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteIds]);

  const loadFavoriteItems = async () => {
    try {
      // Fetch all menu items
      const response = await fetch(`${API_BASE_URL}/menu`);
      const allItems = await response.json();

      // Filter only favorites
      const favorites = allItems.filter(item => favoriteIds.includes(item._id));
      setFavoriteItems(favorites);
    } catch (error) {
      console.error('Failed to load favorite items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleRemoveFavorite = (itemId) => {
    onRemoveFavorite(itemId);
    setFavoriteItems(prev => prev.filter(item => item._id !== itemId));
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading favorites...</p>
      </div>
    );
  }

  if (!favoriteItems || favoriteItems.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-black text-gray-900 mb-2">No Favorites Yet</h3>
        <p className="text-gray-600 mb-6 font-medium">Start adding items to your favorites!</p>
        <button
          onClick={() => navigate('/order')}
          className="px-6 py-3 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black transform hover:scale-105 hover:-rotate-1"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favoriteItems.map((item) => (
        <div
          key={item._id}
          className="bg-white border-4 border-gray-900 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all transform hover:-rotate-1"
        >
          {/* Item Image */}
          <div className="relative h-40 overflow-hidden">
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
              className={`absolute inset-0 bg-gray-900 flex items-center justify-center ${
                item.image ? 'hidden' : ''
              }`}
            >
              <UtensilsCrossed className="w-12 h-12 text-white opacity-50" />
            </div>

            {/* Remove Favorite Button */}
            <button
              onClick={() => handleRemoveFavorite(item._id)}
              className="absolute top-2 right-2 p-2 bg-white border-2 border-gray-900 hover:bg-red-50 transition-colors group shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
            >
              <Heart className="w-5 h-5 fill-red-500 text-red-500 group-hover:fill-red-600 group-hover:text-red-600" />
            </button>

            {/* Veg/Non-Veg Indicator */}
            <div className="absolute top-2 left-2">
              <div className={`w-6 h-6 border-2 flex items-center justify-center bg-white ${
                item.isVeg ? 'border-green-600' : 'border-red-600'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  item.isVeg ? 'bg-green-600' : 'bg-red-600'
                }`}></div>
              </div>
            </div>
          </div>

          {/* Item Details */}
          <div className="p-4">
            <h3 className="font-black text-gray-900 mb-1">{item.itemName}</h3>
            {item.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2 font-medium">{item.description}</p>
            )}

            {/* Category Tag */}
            <span className="inline-block text-xs font-black text-gray-900 bg-white border-2 border-gray-900 px-2 py-1 mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
              {item.category}
            </span>

            {/* Price and Add Button */}
            <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-gray-400">
              <span className="text-2xl font-black text-gray-900">₹{item.price}</span>
              <button
                onClick={() => handleAddToCart(item)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-3 border-gray-900 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black transform hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteItems;
