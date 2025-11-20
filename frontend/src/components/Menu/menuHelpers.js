/**
 * Menu Management Helper Functions
 * Pure utility functions for menu data processing
 */

/**
 * Calculate discounted price based on discount type
 * @param {number} price - Original price
 * @param {Object} discount - Discount object {type, value}
 * @returns {number} Final price after discount
 */
export const calculateDiscountedPrice = (price, discount) => {
  if (!discount || discount.type === 'none' || !discount.value) return price;

  if (discount.type === 'percentage') {
    return price - (price * discount.value / 100);
  } else if (discount.type === 'fixed') {
    return Math.max(0, price - discount.value);
  }
  return price;
};

/**
 * Validate menu item form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation errors (empty if valid)
 */
export const validateMenuForm = (formData) => {
  const errors = {};

  // Validate item name (letters and spaces only, min 3 characters)
  if (!formData.itemName || formData.itemName.trim() === '') {
    errors.itemName = 'Item name is required';
  } else {
    const trimmedName = formData.itemName.trim();
    if (trimmedName.length < 3) {
      errors.itemName = 'Item name must be at least 3 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      errors.itemName = 'Item name can only contain letters and spaces';
    }
  }

  if (!formData.category) {
    errors.category = 'Category is required';
  }

  if (!formData.itemType) {
    errors.itemType = 'Item type is required';
  }

  if (!formData.price || formData.price <= 0) {
    errors.price = 'Price must be greater than 0';
  }

  // Validation for packaged items
  if (formData.itemType === 'packaged') {
    if (!formData.stockQuantity && formData.stockQuantity !== 0) {
      errors.stockQuantity = 'Stock quantity is required for packaged items';
    }

    if (!formData.expiryDate) {
      errors.expiryDate = 'Expiry date is required for packaged items';
    }
  }

  return errors;
};

/**
 * Filter menu items by search term
 * @param {Array} items - Menu items array
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered items
 */
export const filterBySearch = (items, searchTerm) => {
  if (!searchTerm) return items;

  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    item.itemName?.toLowerCase().includes(term) ||
    item.category?.toLowerCase().includes(term)
  );
};

/**
 * Filter menu items by category
 * @param {Array} items - Menu items array
 * @param {string} category - Category filter
 * @returns {Array} Filtered items
 */
export const filterByCategory = (items, category) => {
  if (category === 'all') return items;
  return items.filter(item => item.category === category);
};

/**
 * Filter menu items by availability
 * @param {Array} items - Menu items array
 * @param {string} availability - Availability filter ('all', 'available', 'unavailable')
 * @returns {Array} Filtered items
 */
export const filterByAvailability = (items, availability) => {
  if (availability === 'all') return items;
  if (availability === 'available') return items.filter(item => item.available);
  if (availability === 'unavailable') return items.filter(item => !item.available);
  return items;
};

/**
 * Sort menu items based on sort criteria
 * @param {Array} items - Menu items array
 * @param {string} sortBy - Sort criteria
 * @returns {Array} Sorted items
 */
export const sortMenuItems = (items, sortBy) => {
  const sorted = [...items];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.itemName.localeCompare(b.itemName));
    case 'name-desc':
      return sorted.sort((a, b) => b.itemName.localeCompare(a.itemName));
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'category-asc':
      return sorted.sort((a, b) => a.category.localeCompare(b.category));
    case 'category-desc':
      return sorted.sort((a, b) => b.category.localeCompare(a.category));
    default:
      return sorted;
  }
};

/**
 * Calculate days until expiry
 * @param {string|Date} expiryDate - Expiry date
 * @returns {number} Days until expiry
 */
export const calculateDaysUntilExpiry = (expiryDate) => {
  if (!expiryDate) return null;
  const expiry = new Date(expiryDate);
  const today = new Date();
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
};

/**
 * Get alert info for a menu item
 * @param {Object} item - Menu item
 * @returns {Object} Alert information
 */
export const getItemAlertInfo = (item) => {
  const isPackaged = (item.itemType || 'homemade') === 'packaged';
  const alerts = {
    isLowStock: false,
    isOutOfStock: false,
    isExpiringSoon: false,
    isExpired: false,
    daysUntilExpiry: null
  };

  if (!isPackaged) return alerts;

  // Stock alerts
  alerts.isOutOfStock = item.stockQuantity === 0;
  alerts.isLowStock = item.stockQuantity <= (item.lowStockThreshold || 10) && item.stockQuantity > 0;

  // Expiry alerts
  if (item.expiryDate) {
    const daysLeft = calculateDaysUntilExpiry(item.expiryDate);
    alerts.daysUntilExpiry = daysLeft;
    alerts.isExpiringSoon = daysLeft <= 7 && daysLeft > 0;
    alerts.isExpired = daysLeft <= 0;
  }

  return alerts;
};

/**
 * Get all alert items from menu
 * @param {Array} menuItems - All menu items
 * @returns {Object} Categorized alert items
 */
export const getAlertItems = (menuItems) => {
  const lowStockItems = menuItems.filter(item =>
    (item.itemType || 'homemade') === 'packaged' &&
    item.stockQuantity <= (item.lowStockThreshold || 10) &&
    item.stockQuantity > 0
  );

  const outOfStockItems = menuItems.filter(item =>
    (item.itemType || 'homemade') === 'packaged' &&
    item.stockQuantity === 0
  );

  const expiringItems = menuItems.filter(item => {
    if ((item.itemType || 'homemade') !== 'packaged' || !item.expiryDate) return false;
    const daysUntilExpiry = calculateDaysUntilExpiry(item.expiryDate);
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  });

  const expiredItems = menuItems.filter(item => {
    if ((item.itemType || 'homemade') !== 'packaged' || !item.expiryDate) return false;
    const daysUntilExpiry = calculateDaysUntilExpiry(item.expiryDate);
    return daysUntilExpiry <= 0;
  });

  return {
    lowStockItems,
    outOfStockItems,
    expiringItems,
    expiredItems
  };
};

/**
 * Get full image URL from path
 * @param {string} imagePath - Image path or URL from database
 * @param {string} apiBaseUrl - API base URL
 * @returns {string|null} Full image URL or null
 */
export const getImageUrl = (imagePath, apiBaseUrl) => {
  if (!imagePath) return null;

  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Remove /api from base URL and append image path
  return `${apiBaseUrl.replace('/api', '')}${imagePath}`;
};
