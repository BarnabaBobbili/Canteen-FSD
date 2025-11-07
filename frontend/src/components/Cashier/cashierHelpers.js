/**
 * Validate phone number (10 digits)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.trim());
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const validateEmail = (email) => {
  if (!email.trim()) return true; // Optional field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Calculate cart total amount
 * @param {Array} cart - Array of cart items
 * @returns {number} Total amount
 */
export const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => {
    const price = item.discount?.type !== 'none' && item.discount?.value > 0
      ? item.discount.type === 'percentage'
        ? item.price - (item.price * item.discount.value / 100)
        : item.price - item.discount.value
      : item.price;
    return total + (price * item.quantity);
  }, 0);
};

/**
 * Filter menu items by search term and category
 * @param {Array} items - Menu items array
 * @param {string} searchTerm - Search query
 * @param {string} category - Selected category
 * @returns {Array} Filtered items
 */
export const filterMenuItems = (items, searchTerm, category) => {
  return items.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });
};

/**
 * Get unique categories from menu items
 * @param {Array} items - Menu items array
 * @returns {Array} Array of categories including 'all'
 */
export const getCategories = (items) => {
  return ['all', ...new Set(items.map(item => item.category))];
};

/**
 * Get status badge classes
 * @param {string} status - Order status
 * @returns {string} Tailwind CSS classes
 */
export const getStatusBadgeClasses = (status) => {
  const baseClasses = 'inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold shadow-sm';

  switch (status) {
    case 'completed':
      return `${baseClasses} bg-gradient-to-r from-green-500 to-emerald-500 text-white`;
    case 'preparing':
      return `${baseClasses} bg-gradient-to-r from-yellow-400 to-orange-400 text-white`;
    case 'ready':
      return `${baseClasses} bg-gradient-to-r from-blue-500 to-sky-500 text-white`;
    case 'cancelled':
      return `${baseClasses} bg-gradient-to-r from-red-500 to-pink-500 text-white`;
    default:
      return `${baseClasses} bg-gradient-to-r from-gray-400 to-gray-500 text-white`;
  }
};

/**
 * Format time from date
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted time string
 */
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

/**
 * Get image URL with fallback
 * @param {string} image - Image path or URL
 * @param {string} apiBaseUrl - API base URL
 * @returns {string} Full image URL
 */
export const getImageUrl = (image, apiBaseUrl) => {
  if (!image) return null;
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  return `${apiBaseUrl.replace('/api', '')}${image}`;
};
