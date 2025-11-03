import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config/api';
import { ShoppingCart, Eye, X, Plus, Minus, LogOut, Search, Filter, Trash2, Edit3, CheckCircle, Clock, ChefHat } from 'lucide-react';

const CashierDashboard = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [todaysOrders, setTodaysOrders] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState('counter');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu`);
      const data = await response.json();
      setMenuItems(data.filter(item => item.available));
    } catch (error) {
      setError('Failed to load menu items');
    }
  };

  const fetchTodaysOrders = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const allOrders = await response.json();

      // Filter for today's orders only
      const todayOrders = allOrders.filter(order => {
        const orderDate = new Date(order.createdAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
      });

      setTodaysOrders(todayOrders);
      setShowOrders(true);
    } catch (error) {
      setError('Failed to load orders');
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, change) => {
    setCart(cart.map(item => {
      if (item._id === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item._id !== itemId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discount?.type !== 'none' && item.discount?.value > 0
        ? item.discount.type === 'percentage'
          ? item.price - (item.price * item.discount.value / 100)
          : item.price - item.discount.value
        : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      setError('Cart is empty');
      return;
    }

    if (!customerName.trim()) {
      setError('Please enter customer name');
      return;
    }

    if (!customerPhone.trim()) {
      setError('Please enter customer phone number');
      return;
    }

    // Basic phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(customerPhone.trim())) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    // Email validation (if provided)
    if (customerEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customerEmail.trim())) {
        setError('Please enter a valid email address');
        return;
      }
    }

    try {
      const orderData = {
        items: cart.map(item => ({
          itemName: item.itemName,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: calculateTotal(),
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim() || undefined,
        customerPhone: customerPhone.trim(),
        orderType,
        status: 'pending',
        createdBy: user._id
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setSuccessMessage('Order placed successfully!');
        setCart([]);
        setCustomerName('');
        setCustomerEmail('');
        setCustomerPhone('');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to place order');
      }
    } catch (error) {
      setError('Failed to place order');
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    navigate('/login');
  };

  const addItemToOrder = async (orderId, menuItem) => {
    try {
      const order = todaysOrders.find(o => o._id === orderId);
      const existingItem = order.items.find(item => item.itemName === menuItem.itemName);

      let updatedItems;
      if (existingItem) {
        updatedItems = order.items.map(item =>
          item.itemName === menuItem.itemName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...order.items, { itemName: menuItem.itemName, quantity: 1, price: menuItem.price }];
      }

      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: updatedItems,
          totalAmount: newTotal
        })
      });

      if (response.ok) {
        setSuccessMessage('Item added to order');
        fetchTodaysOrders();
        setTimeout(() => setSuccessMessage(''), 2000);
      } else {
        setError('Failed to update order');
      }
    } catch (error) {
      setError('Failed to update order');
    }
  };

  const removeItemFromOrder = async (orderId, itemIndex) => {
    try {
      const order = todaysOrders.find(o => o._id === orderId);
      const updatedItems = order.items.filter((_, idx) => idx !== itemIndex);

      if (updatedItems.length === 0) {
        setError('Cannot remove all items. Cancel the order instead.');
        return;
      }

      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: updatedItems,
          totalAmount: newTotal
        })
      });

      if (response.ok) {
        setSuccessMessage('Item removed from order');
        fetchTodaysOrders();
        setTimeout(() => setSuccessMessage(''), 2000);
      } else {
        setError('Failed to update order');
      }
    } catch (error) {
      setError('Failed to update order');
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      if (response.ok) {
        setSuccessMessage('Order cancelled');
        fetchTodaysOrders();
        setEditingOrderId(null);
        setTimeout(() => setSuccessMessage(''), 2000);
      } else {
        setError('Failed to cancel order');
      }
    } catch (error) {
      setError('Failed to cancel order');
    }
  };

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 text-white shadow-xl">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <ChefHat className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Canteen POS System</h1>
                <p className="text-sm text-sky-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  {user?.name} • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchTodaysOrders}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-sky-600 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-semibold"
              >
                <Eye size={20} />
                Today's Orders
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Success/Error Messages */}
      {successMessage && (
        <div className="fixed top-24 right-6 z-50 animate-slide-in-right">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-24 right-6 z-50 animate-slide-in-right">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <X className="w-6 h-6" />
            <span className="font-semibold">{error}</span>
            <button onClick={() => setError('')} className="ml-2 hover:bg-white/20 p-1 rounded-full transition">
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="flex h-[calc(100vh-80px)]">
          {/* Menu Section - Left Side */}
          <div className="flex-1 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 h-full flex flex-col border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Menu Items</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Filter size={16} />
                  <span>{filteredMenuItems.length} items</span>
                </div>
              </div>

              {/* Modern Search and Filter */}
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all transform hover:scale-105 ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Menu Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 flex-1 overflow-y-auto pr-2 custom-scrollbar auto-rows-max">
                {filteredMenuItems.map(item => (
                  <div
                    key={item._id}
                    onClick={() => addToCart(item)}
                    className="group bg-white border-2 border-gray-200 rounded-xl p-3 cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 hover:border-sky-400 relative overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>

                    <div className="relative">
                      {item.image ? (
                        <div className="relative overflow-hidden rounded-lg mb-3 w-full" style={{ paddingBottom: '100%' }}>
                          <img
                            src={item.image.startsWith('http') ? item.image : `${API_BASE_URL.replace('/api', '')}${item.image}`}
                            alt={item.itemName}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext fill="%23d1d5db" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                            }}
                          />
                          {item.discount?.type !== 'none' && item.discount?.value > 0 && (
                            <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
                              {item.discount.value}{item.discount.type === 'percentage' ? '%' : '₹'} OFF
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center" style={{ paddingBottom: '100%', position: 'relative' }}>
                          <ChefHat className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <h3 className="font-bold text-sm text-gray-800 mb-2 min-h-[40px]">{item.itemName}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-sky-600 font-bold text-lg">₹{item.price}</p>
                        <div className="bg-sky-100 text-sky-600 p-1.5 rounded-lg group-hover:bg-sky-500 group-hover:text-white transition-all">
                          <Plus size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Section - Right Side */}
          <div className="w-96 p-4">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-6 h-full flex flex-col border border-gray-100">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-200">
                <div className="bg-gradient-to-br from-sky-500 to-blue-500 p-3 rounded-xl">
                  <ShoppingCart className="text-white" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Current Order</h2>
                  <p className="text-xs text-gray-500">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
                </div>
              </div>

              {/* Customer Details */}
              <div className="mb-6 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Customer Name *</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="customer@email.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Order Type</label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition bg-white"
                  >
                    <option value="counter">🏪 Counter</option>
                    <option value="dine-in">🍽️ Dine-in</option>
                    <option value="online">📱 Online</option>
                  </select>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-3 flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <ShoppingCart size={48} className="mb-3 opacity-30" />
                    <p className="text-sm">Cart is empty</p>
                    <p className="text-xs">Add items from menu</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item._id} className="bg-white border-2 border-gray-100 rounded-xl p-3 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-bold text-sm text-gray-800">{item.itemName}</p>
                          <p className="text-xs text-gray-500">₹{item.price} × {item.quantity}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item._id, -1)}
                            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center font-bold text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, 1)}
                            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="text-lg font-bold text-sky-600">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total & Place Order */}
              <div className="border-t-2 border-gray-200 pt-4">
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-600">Total Amount:</span>
                    <span className="text-3xl font-bold text-sky-600">₹{calculateTotal().toFixed(2)}</span>
                  </div>
                  {cart.length > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)} items in cart
                    </div>
                  )}
                </div>

                <button
                  onClick={placeOrder}
                  disabled={cart.length === 0}
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-500 text-white py-4 rounded-xl hover:shadow-lg disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed font-bold text-lg transition-all transform hover:scale-105 disabled:hover:scale-100"
                >
                  {cart.length === 0 ? 'Cart is Empty' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </div>

      {/* Today's Orders Modal - Modern Design */}
      {showOrders && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 text-white px-8 py-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Today's Orders</h2>
                    <p className="text-sm text-sky-100 mt-1">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                    <span className="text-2xl font-bold">{todaysOrders.length}</span>
                    <span className="text-sm ml-2 text-sky-100">{todaysOrders.length === 1 ? 'Order' : 'Orders'}</span>
                  </div>
                  <button
                    onClick={() => setShowOrders(false)}
                    className="hover:bg-white/20 p-2 rounded-xl transition-all"
                  >
                    <X size={28} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)] bg-gradient-to-br from-gray-50 to-white">
              {todaysOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="bg-gray-100 p-8 rounded-full mb-4">
                    <Clock size={64} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-600 mb-2">No Orders Yet</h3>
                  <p className="text-gray-500">Orders for today will appear here</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {todaysOrders.map(order => (
                    <div key={order._id} className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-102">
                      {/* Order Header */}
                      <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b-2 border-gray-100">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="bg-gradient-to-br from-sky-500 to-blue-500 text-white p-2 rounded-lg">
                                <ShoppingCart size={20} />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-800">{order.customerName}</h3>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock size={12} />
                                  {new Date(order.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs">
                              <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-lg">
                                <span className="font-semibold">📞</span>
                                <span className="text-gray-700">{order.customerPhone}</span>
                              </div>
                              {order.customerEmail && (
                                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-lg">
                                  <span className="font-semibold">✉️</span>
                                  <span className="text-gray-700 truncate max-w-[150px]">{order.customerEmail}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="bg-gradient-to-br from-sky-50 to-blue-50 px-4 py-2 rounded-xl mb-2">
                              <p className="text-xs text-gray-500 mb-0.5">Total</p>
                              <p className="text-2xl font-bold text-sky-600">₹{order.totalAmount.toFixed(2)}</p>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-sm ${
                              order.status === 'completed' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                              order.status === 'preparing' ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' :
                              order.status === 'ready' ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white' :
                              order.status === 'cancelled' ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' :
                              'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                            }`}>
                              {order.status === 'completed' && <CheckCircle size={14} />}
                              {order.status === 'pending' && <Clock size={14} />}
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-6">
                        <h4 className="text-sm font-bold text-gray-600 mb-3 flex items-center gap-2">
                          <ChefHat size={16} />
                          Order Items ({order.items.length})
                        </h4>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-all">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="bg-white rounded-lg px-3 py-1.5 font-bold text-sky-600 shadow-sm">
                                  {item.quantity}x
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-sm text-gray-800">{item.itemName}</p>
                                  <p className="text-xs text-gray-500">₹{item.price} each</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</span>
                                {order.status === 'pending' && editingOrderId === order._id && (
                                  <button
                                    onClick={() => removeItemFromOrder(order._id, idx)}
                                    className="ml-2 text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Edit Controls for Pending Orders */}
                      {order.status === 'pending' && (
                        <div className="px-6 pb-6">
                          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4">
                            {editingOrderId === order._id ? (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => {
                                    setEditingOrderId(order._id);
                                    setShowAddItemModal(true);
                                  }}
                                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                                >
                                  <Plus size={18} />
                                  Add Item
                                </button>
                                <button
                                  onClick={() => setEditingOrderId(null)}
                                  className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all font-semibold"
                                >
                                  Done Editing
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm('Cancel this order? This cannot be undone.')) {
                                      cancelOrder(order._id);
                                    }
                                  }}
                                  className="px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                                >
                                  <X size={18} />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setEditingOrderId(order._id)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                              >
                                <Edit3 size={18} />
                                Edit Order
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Item to Order Modal */}
      {showAddItemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-sky-600 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Add Item to Order</h2>
              <button onClick={() => setShowAddItemModal(false)} className="hover:bg-sky-700 p-1 rounded">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Search */}
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4"
              />

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap mb-4">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                      selectedCategory === cat
                        ? 'bg-sky-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-max">
                {filteredMenuItems.map(item => (
                  <div
                    key={item._id}
                    onClick={() => {
                      addItemToOrder(editingOrderId, item);
                      setShowAddItemModal(false);
                    }}
                    className="group bg-white border-2 border-gray-200 rounded-xl p-3 cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 hover:border-sky-400"
                  >
                    {item.image ? (
                      <div className="relative overflow-hidden rounded-lg mb-3 w-full" style={{ paddingBottom: '100%' }}>
                        <img
                          src={item.image.startsWith('http') ? item.image : `${API_BASE_URL.replace('/api', '')}${item.image}`}
                          alt={item.itemName}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext fill="%23d1d5db" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        {item.discount?.type !== 'none' && item.discount?.value > 0 && (
                          <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
                            {item.discount.value}{item.discount.type === 'percentage' ? '%' : '₹'} OFF
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-3 flex items-center justify-center" style={{ paddingBottom: '100%', position: 'relative' }}>
                        <ChefHat className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <h3 className="font-bold text-sm text-gray-800 mb-2 min-h-[40px]">{item.itemName}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sky-600 font-bold text-lg">₹{item.price}</p>
                      <div className="bg-sky-100 text-sky-600 p-1.5 rounded-lg group-hover:bg-sky-500 group-hover:text-white transition-all">
                        <Plus size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #0ea5e9, #3b82f6);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0284c7, #2563eb);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .aspect-square {
          aspect-ratio: 1 / 1;
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default CashierDashboard;
