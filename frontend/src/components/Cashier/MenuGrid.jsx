import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import MenuItemCard from './MenuItemCard';
import { filterMenuItems, getCategories } from './cashierHelpers';

const MenuGrid = React.memo(({
  menuItems,
  cart,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onAddToCart,
  onUpdateQuantity
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, setSearchTerm]);

  // Memoize filtered items and sort by cart items first
  const filteredItems = useMemo(() => {
    const filtered = filterMenuItems(menuItems, searchTerm, selectedCategory);
    // Sort: items in cart first, then others
    return filtered.sort((a, b) => {
      const aInCart = cart.some(c => c._id === a._id);
      const bInCart = cart.some(c => c._id === b._id);
      if (aInCart && !bInCart) return -1;
      if (!aInCart && bInCart) return 1;
      return 0;
    });
  }, [menuItems, searchTerm, selectedCategory, cart]);

  // Memoize categories
  const categories = useMemo(() =>
    getCategories(menuItems),
    [menuItems]
  );

  // Memoized callback for clearing search
  const handleClearSearch = useCallback(() => {
    setLocalSearchTerm('');
    setSearchTerm('');
  }, [setSearchTerm]);

  return (
    <div className="bg-white rounded shadow p-4 h-full flex flex-col border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Menu Items</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Filter size={16} />
          <span>{filteredItems.length} items</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search menu items..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
          />
          {localSearchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="overflow-y-auto flex-1">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredItems.map(item => {
            const cartItem = cart.find(c => c._id === item._id);
            const quantityInCart = cartItem ? cartItem.quantity : 0;

            return (
              <MenuItemCard
                key={item._id}
                item={item}
                quantityInCart={quantityInCart}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

MenuGrid.displayName = 'MenuGrid';

export default MenuGrid;
