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
 *
 * Auto-logs out staff members (admin, manager, cashier, staff) when they access this page
 * This ensures staff can only browse as customers or guests
 */
const OrderPage = () => {
  const { user, logout } = useAuth();
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

  // Auto-logout staff roles when they access order page
  useEffect(() => {
    if (user && ['admin', 'manager', 'cashier', 'staff'].includes(user.role)) {
      logout();
    }
  }, [user, logout]);

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
    <div className="min-h-screen relative overflow-hidden" style={{
      fontFamily: '"Arial Black", "Hiragino Sans", sans-serif',
      background: `linear-gradient(135deg, #fff5f7 0%, #fffacd 25%, #e0f7fa 50%, #fce4ec 75%, #fff9c4 100%)`
    }}>
      {/* Colorful manga gradient overlays */}
      <div className="fixed top-0 left-0 w-full h-1/3 pointer-events-none opacity-20" style={{
        background: 'radial-gradient(ellipse at top, rgba(255,182,193,0.6) 0%, transparent 70%)'
      }}></div>
      <div className="fixed bottom-0 right-0 w-full h-1/3 pointer-events-none opacity-20" style={{
        background: 'radial-gradient(ellipse at bottom right, rgba(135,206,250,0.6) 0%, transparent 70%)'
      }}></div>

      {/* Colorful manga speed lines from center */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05]" style={{
        background: `
          repeating-conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 2deg,
            rgba(255,105,180,0.4) 2deg,
            rgba(255,105,180,0.4) 3deg,
            transparent 3deg,
            transparent 5deg,
            rgba(135,206,250,0.4) 5deg,
            rgba(135,206,250,0.4) 6deg
          )
        `
      }}></div>

      {/* Manga sparkle effects */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-20 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-40 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-32 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

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
