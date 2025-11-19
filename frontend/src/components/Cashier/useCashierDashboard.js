import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as cashierService from './cashierService';
import { calculateCartTotal } from './cashierHelpers';

/**
 * useCashierDashboard Hook
 * Manages all state and business logic for the cashier dashboard
 */
export const useCashierDashboard = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  // Menu and Cart State
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);

  // Customer Info State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState('dine-in');

  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  // Orders State
  const [todaysOrders, setTodaysOrders] = useState([]);
  const [orderSearch, setOrderSearch] = useState('');

  // Load menu items on mount
  useEffect(() => {
    loadMenuItems();
  }, []);

  /**
   * Load available menu items
   */
  const loadMenuItems = async () => {
    try {
      const items = await cashierService.fetchMenuItems();
      setMenuItems(items);
    } catch (error) {
      setError('Failed to load menu items');
    }
  };

  /**
   * Add item to cart or increment quantity
   */
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

  /**
   * Update cart item quantity
   */
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

  /**
   * Remove item from cart
   */
  const handleRemoveFromCart = useCallback((itemId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== itemId));
  }, []);

  /**
   * Place order with current cart
   */
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

  /**
   * Fetch and display today's orders
   */
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

  /**
   * Update order status or details
   */
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

  /**
   * Cancel an order
   */
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

  /**
   * Show logout confirmation
   */
  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  /**
   * Confirm and execute logout
   */
  const confirmLogout = () => {
    logout();
    navigate('/login');
  };

  return {
    // Auth
    user,
    // Menu and Cart
    menuItems,
    cart,
    // Customer Info
    customerName,
    setCustomerName,
    customerEmail,
    setCustomerEmail,
    customerPhone,
    setCustomerPhone,
    orderType,
    setOrderType,
    // UI State
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    successMessage,
    error,
    setError,
    showLogoutConfirm,
    setShowLogoutConfirm,
    showOrders,
    setShowOrders,
    // Orders
    todaysOrders,
    orderSearch,
    setOrderSearch,
    // Handlers
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveFromCart,
    handlePlaceOrder,
    handleFetchTodaysOrders,
    handleUpdateOrder,
    handleCancelOrder,
    handleLogout,
    confirmLogout
  };
};
