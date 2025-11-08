import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

/**
 * Custom hook to use Cart Context
 * @returns {Object} Cart state and methods
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

/**
 * Cart Provider Component
 * Manages cart state across the application
 */
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('canteen_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('canteen_cart', JSON.stringify(cart));
  }, [cart]);

  /**
   * Add item to cart or increment quantity if already exists
   * @param {Object} item - Menu item to add
   */
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  /**
   * Remove one quantity of item from cart
   * @param {string} itemId - Item ID to remove
   */
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === itemId);

      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem._id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }

      return prevCart.filter((cartItem) => cartItem._id !== itemId);
    });
  };

  /**
   * Remove all quantities of an item from cart
   * @param {string} itemId - Item ID to remove completely
   */
  const removeAllFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem._id !== itemId));
  };

  /**
   * Clear entire cart
   */
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('canteen_cart');
  };

  /**
   * Get total quantity of items in cart
   * @returns {number} Total quantity
   */
  const getCartQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Get total price of items in cart
   * @returns {number} Total price
   */
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /**
   * Check if item is in cart
   * @param {string} itemId - Item ID to check
   * @returns {boolean} True if item is in cart
   */
  const isInCart = (itemId) => {
    return cart.some((item) => item._id === itemId);
  };

  /**
   * Get quantity of specific item in cart
   * @param {string} itemId - Item ID to check
   * @returns {number} Quantity of item (0 if not in cart)
   */
  const getItemQuantity = (itemId) => {
    const item = cart.find((cartItem) => cartItem._id === itemId);
    return item ? item.quantity : 0;
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    clearCart,
    getCartQuantity,
    getCartTotal,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
