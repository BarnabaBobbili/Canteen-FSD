import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Eye, LogOut, CheckCircle, X, Search } from 'lucide-react';
import MenuGrid from './MenuGrid';
import CartPanel from './CartPanel';
import OrderItem from './OrderItem';
import * as cashierService from './cashierService';
import { calculateCartTotal } from './cashierHelpers';
import './cashierStyles.css';

const CashierDashboard = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  // State
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState('dine-in');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [todaysOrders, setTodaysOrders] = useState([]);
  const [orderSearch, setOrderSearch] = useState('');

  // Fetch menu items on mount
  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const items = await cashierService.fetchMenuItems();
      setMenuItems(items);
    } catch (error) {
      setError('Failed to load menu items');
    }
  };

  // Add to cart
  const handleAddToCart = useCallback((item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem._id === item._id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  }, []);

  // Update quantity
  const handleUpdateQuantity = useCallback((itemId, change) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item._id === itemId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean)
    );
  }, []);

  // Remove from cart
  const handleRemoveFromCart = useCallback((itemId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== itemId));
  }, []);

  // Place order
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        items: cart.map(item => {
          // Calculate actual price with discount
          let actualPrice = item.discount?.type !== 'none' && item.discount?.value > 0
            ? item.discount.type === 'percentage'
              ? item.price - (item.price * item.discount.value / 100)
              : item.price - item.discount.value
            : item.price;

          // Add ₹5 extra for takeaway orders
          if (orderType === 'takeaway') {
            actualPrice += 5;
          }

          return {
            itemName: item.itemName,
            quantity: item.quantity,
            price: actualPrice
          };
        }),
        totalAmount: orderType === 'takeaway'
          ? calculateCartTotal(cart) + (cart.reduce((sum, item) => sum + item.quantity, 0) * 5)
          : calculateCartTotal(cart),
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim() || undefined,
        customerPhone: customerPhone.trim(),
        orderType,
        status: 'pending',
        createdBy: user._id
      };

      console.log('Placing order with data:', orderData);
      await cashierService.placeOrder(orderData, token);

      setSuccessMessage('Order placed successfully!');
      setCart([]);
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Order placement error:', error);
      setError(`Failed to place order: ${error.message}`);
      setTimeout(() => setError(''), 5000);
    }
  };

  // Fetch today's orders
  const handleFetchTodaysOrders = async () => {
    try {
      const orders = await cashierService.fetchTodaysOrders(token);
      // Sort: pending first, then by latest timestamp
      const sortedOrders = orders.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setTodaysOrders(sortedOrders);
      setShowOrders(true);
    } catch (error) {
      setError('Failed to load orders');
    }
  };

  // Update order
  const handleUpdateOrder = async (orderId, updateData) => {
    try {
      await cashierService.updateOrder(orderId, updateData, token);
      // Refresh orders
      const orders = await cashierService.fetchTodaysOrders(token);
      const sortedOrders = orders.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setTodaysOrders(sortedOrders);
      setSuccessMessage('Order updated successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError('Failed to update order');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Cancel order
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await cashierService.cancelOrder(orderId, token);
      // Refresh orders
      const orders = await cashierService.fetchTodaysOrders(token);
      const sortedOrders = orders.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setTodaysOrders(sortedOrders);
      setSuccessMessage('Order cancelled');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setError('Failed to cancel order');
      setTimeout(() => setError(''), 3000);
    }
  };

  // Logout
  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-sky-600 text-white shadow">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-sky-700 p-2 rounded">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Canteen POS System</h1>
                <p className="text-xs text-sky-100">
                  {user?.name} • {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleFetchTodaysOrders}
                className="flex items-center gap-2 px-4 py-2 bg-white text-sky-600 rounded hover:bg-gray-100 font-medium text-sm"
              >
                <Eye size={18} />
                Today's Orders
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-sky-700 border border-sky-500 rounded hover:bg-sky-800 text-sm"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      {successMessage && (
        <div className="fixed top-20 right-4 z-50">
          <div className="bg-green-600 text-white px-4 py-3 rounded shadow-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-20 right-4 z-50">
          <div className="bg-red-600 text-white px-4 py-3 rounded shadow-lg flex items-center gap-2">
            <X className="w-5 h-5" />
            <span className="font-medium">{error}</span>
            <button onClick={() => setError('')} className="ml-2 hover:bg-red-700 p-1 rounded">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex h-[calc(100vh-65px)]">
        {/* Menu Grid */}
        <div className="flex-1 p-3">
          <MenuGrid
            menuItems={menuItems}
            cart={cart}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </div>

        {/* Cart Panel */}
        <div className="w-80 p-3">
          <CartPanel
            cart={cart}
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerEmail={customerEmail}
            setCustomerEmail={setCustomerEmail}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            orderType={orderType}
            setOrderType={setOrderType}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-sm w-full mx-4 shadow-lg">
            <h2 className="text-lg font-bold mb-3 text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to logout?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Today's Orders Modal */}
      {showOrders && todaysOrders.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-lg">
            <div className="bg-sky-600 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Today's Orders ({todaysOrders.filter(o =>
                o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
                o.customerPhone.includes(orderSearch)
              ).length})</h2>
              <button onClick={() => { setShowOrders(false); setOrderSearch(''); }} className="hover:bg-sky-700 p-2 rounded">
                <X size={24} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by name or phone..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Orders List */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-2">
                {todaysOrders
                  .filter(order =>
                    order.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
                    order.customerPhone.includes(orderSearch)
                  )
                  .map(order => (
                    <OrderItem
                      key={order._id}
                      order={order}
                      menuItems={menuItems}
                      onUpdateOrder={handleUpdateOrder}
                      onCancelOrder={handleCancelOrder}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierDashboard;
