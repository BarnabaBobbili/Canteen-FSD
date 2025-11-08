/**
 * Cart helper functions
 * Following CLAUDE.md patterns - pure functions with JSDoc
 */

/**
 * Calculate total quantity of items in cart
 * @param {Array} cart - Array of cart items
 * @returns {number} Total quantity
 */
export const getCartQuantity = (cart) => {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Calculate total price of cart
 * @param {Array} cart - Array of cart items with price and quantity
 * @returns {number} Total price
 */
export const getCartTotal = (cart) => {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

/**
 * Find item in cart by ID
 * @param {Array} cart - Array of cart items
 * @param {string} itemId - Item ID to find
 * @returns {Object|undefined} Cart item or undefined
 */
export const findCartItem = (cart, itemId) => {
  return cart.find(item => item._id === itemId);
};

/**
 * Add item to cart or increment quantity if exists
 * @param {Array} cart - Current cart array
 * @param {Object} item - Item to add
 * @returns {Array} Updated cart
 */
export const addToCart = (cart, item) => {
  const existingItem = findCartItem(cart, item._id);

  if (existingItem) {
    return cart.map(cartItem =>
      cartItem._id === item._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cart, { ...item, quantity: 1 }];
};

/**
 * Remove item from cart or decrement quantity
 * @param {Array} cart - Current cart array
 * @param {string} itemId - Item ID to remove
 * @returns {Array} Updated cart
 */
export const removeFromCart = (cart, itemId) => {
  const item = findCartItem(cart, itemId);

  if (!item) return cart;

  if (item.quantity > 1) {
    return cart.map(cartItem =>
      cartItem._id === itemId
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }

  return cart.filter(cartItem => cartItem._id !== itemId);
};

/**
 * Remove all items of a specific ID from cart
 * @param {Array} cart - Current cart array
 * @param {string} itemId - Item ID to remove completely
 * @returns {Array} Updated cart
 */
export const removeAllFromCart = (cart, itemId) => {
  return cart.filter(cartItem => cartItem._id !== itemId);
};
