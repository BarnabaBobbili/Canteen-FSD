import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import OrderHeader from './OrderHeader';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import SortFilter from './SortFilter';
import RepeatOrders from './RepeatOrders';
import MenuGrid from './MenuGrid';
import ShoppingCart from './ShoppingCart';
import ItemDetailsModal from './ItemDetailsModal';
import { fetchMenuItems } from './orderService';
import { getFavorites, toggleFavorite } from '../ProfilePage/profileService';

/**
 * Main OrderPage orchestrator
 * Composed of modular components following CLAUDE.md patterns
 * @refactored from 470 lines → ~100 lines
 */
const OrderPage = () => {
  const { user } = useAuth();
  const { cart, addToCart, removeFromCart, removeAllFromCart, getCartQuantity } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('default');
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [repeatOrders, setRepeatOrders] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);

  // Load menu items and favorites on mount
  useEffect(() => {
    loadMenuItems();
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favs = getFavorites();
    setFavorites(favs);
  };

  // Load repeat orders for authenticated users
  useEffect(() => {
    if (user && menuItems.length > 0) {
      loadRepeatOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, menuItems.length]);

  const loadMenuItems = async () => {
    try {
      const items = await fetchMenuItems();
      setMenuItems(items);
    } catch (error) {
      console.error('Failed to load menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRepeatOrders = () => {
    // Mock repeat orders - in production, fetch from user's order history
    const mockRepeatOrders = menuItems.slice(0, 3);
    setRepeatOrders(mockRepeatOrders);
  };

  // Filter and sort menu items based on search, category, and sort option
  const filteredAndSortedItems = React.useMemo(() => {
    // First filter
    let items = menuItems.filter(item => {
      const matchesSearch = item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Then sort
    switch (selectedSort) {
      case 'popularity':
        // In production, this would use actual popularity data from backend
        items = [...items].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'price-low':
        items = [...items].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items = [...items].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In production, this would use createdAt timestamp
        items = [...items].sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA;
        });
        break;
      default:
        // Keep default order
        break;
    }

    return items;
  }, [menuItems, searchQuery, selectedCategory, selectedSort]);

  // Cart handlers - now using Cart Context
  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleRemoveAllFromCart = (itemId) => {
    removeAllFromCart(itemId);
  };

  const handleToggleFavorite = (itemId) => {
    const updatedFavorites = toggleFavorite(itemId);
    setFavorites(updatedFavorites);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  return (
    <div className="min-h-screen bg-white relative" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    }}>
      <OrderHeader
        cartQuantity={getCartQuantity()}
        onCartClick={() => setShowCart(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {user && repeatOrders.length > 0 && (
          <div className="mt-8">
            <RepeatOrders
              repeatOrders={repeatOrders}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}

        <div className="mt-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="mt-4">
          <SortFilter
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />
        </div>

        <MenuGrid
          items={filteredAndSortedItems}
          cart={cart}
          favorites={favorites}
          loading={loading}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onToggleFavorite={handleToggleFavorite}
          onItemClick={handleItemClick}
        />
      </div>

      <ShoppingCart
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        isAuthenticated={!!user}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onRemoveAllFromCart={handleRemoveAllFromCart}
      />

      {/* Mobile Checkout Button */}
      {cart.length > 0 && !showCart && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t-4 border-gray-900 shadow-[0px_-4px_0px_0px_rgba(0,0,0,0.2)] lg:hidden">
          <button
            onClick={() => setShowCart(true)}
            className="w-full py-4 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] font-black text-lg flex items-center justify-between px-6 transform hover:scale-105 transition-all"
          >
            <span>{getCartQuantity()} Items</span>
            <span>View Cart</span>
          </button>
        </div>
      )}

      {/* Item Details Modal */}
      <ItemDetailsModal
        item={selectedItem}
        isOpen={showItemModal}
        onClose={() => setShowItemModal(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default OrderPage;
