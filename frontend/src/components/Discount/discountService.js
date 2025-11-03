/**
 * API service for discount-related operations
 */
import API_BASE_URL from '../../config/api';
import { calculateExpiryDiscount, sortByDiscountStatus } from './discountHelpers';

/**
 * Fetch all items with active discounts
 * @returns {Promise<Array>} - Array of discounted items
 */
export const fetchDiscountedItems = async () => {
  const response = await fetch(`${API_BASE_URL}/menu/discounts/active`);
  if (!response.ok) throw new Error('Failed to fetch discounted items');
  return await response.json();
};

/**
 * Fetch all menu items
 * @returns {Promise<Array>} - Array of menu items
 */
export const fetchAllMenuItems = async () => {
  const response = await fetch(`${API_BASE_URL}/menu`);
  if (!response.ok) throw new Error('Failed to fetch menu items');
  return await response.json();
};

/**
 * Fetch most ordered items
 * @param {number} limit - Number of items to fetch
 * @param {number} days - Number of days to look back
 * @returns {Promise<Array>} - Array of most ordered items
 */
export const fetchMostOrderedItems = async (limit = 10, days = 30) => {
  const response = await fetch(`${API_BASE_URL}/menu/analytics/most-ordered?limit=${limit}&days=${days}`);
  if (!response.ok) throw new Error('Failed to fetch most ordered items');
  return await response.json();
};

/**
 * Apply discount to a menu item
 * @param {string} itemId - Item ID
 * @param {object} discountData - Discount data
 * @param {string} token - Authorization token
 * @returns {Promise<object>} - Response data
 */
export const applyDiscount = async (itemId, discountData, token) => {
  const response = await fetch(`${API_BASE_URL}/menu/${itemId}/discount`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(discountData)
  });

  if (!response.ok) throw new Error('Failed to apply discount');
  return await response.json();
};

/**
 * Remove discount from a menu item
 * @param {string} itemId - Item ID
 * @param {string} token - Authorization token
 * @returns {Promise<void>}
 */
export const removeDiscount = async (itemId, token) => {
  const response = await fetch(`${API_BASE_URL}/menu/${itemId}/discount`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to remove discount');
};

/**
 * Get low stock items from menu items
 * Only includes packaged items (excludes homemade from auto-discount)
 * @param {Array} allMenuItems - All menu items
 * @returns {Array} - Sorted low stock items
 */
export const getLowStockItems = (allMenuItems) => {
  const items = allMenuItems.filter(item =>
    (item.itemType || 'homemade') === 'packaged' &&
    item.stockQuantity !== undefined &&
    item.stockQuantity <= item.lowStockThreshold
  );

  return sortByDiscountStatus(items, 'low_stock');
};

/**
 * Get expiring items from menu items
 * Only includes packaged items (excludes homemade from auto-discount)
 * @param {Array} allMenuItems - All menu items
 * @returns {Array} - Sorted expiring items
 */
export const getExpiringItems = (allMenuItems) => {
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const items = allMenuItems.filter(item => {
    if ((item.itemType || 'homemade') !== 'packaged' || !item.expiryDate) return false;
    const expiryDate = new Date(item.expiryDate);
    return expiryDate <= sevenDaysFromNow && expiryDate >= new Date();
  });

  return sortByDiscountStatus(items, 'expiry');
};

/**
 * Apply low stock discounts to selected items
 * @param {Array} selectedIds - Selected item IDs
 * @param {Array} lowStockItems - All low stock items
 * @param {string} token - Authorization token
 * @returns {Promise<object>} - Result with success and fail counts
 */
export const applyLowStockDiscounts = async (selectedIds, lowStockItems, token) => {
  let successCount = 0;
  let failCount = 0;

  // Apply discount to selected items
  for (const itemId of selectedIds) {
    try {
      await applyDiscount(itemId, {
        discountType: 'percentage',
        discountValue: 15,
        reason: 'low_stock'
      }, token);
      successCount++;
    } catch (error) {
      failCount++;
    }
  }

  // Remove discount from unselected items that have low_stock discount
  const itemsToRemoveDiscount = lowStockItems
    .filter(item => !selectedIds.includes(item._id) && item.discount?.reason === 'low_stock')
    .map(item => item._id);

  for (const itemId of itemsToRemoveDiscount) {
    try {
      await removeDiscount(itemId, token);
    } catch (error) {
      console.error('Failed to remove discount:', error);
    }
  }

  return { successCount, failCount };
};

/**
 * Apply expiry discounts to selected items
 * @param {Array} selectedIds - Selected item IDs
 * @param {Array} expiringItems - All expiring items
 * @param {string} token - Authorization token
 * @returns {Promise<object>} - Result with success and fail counts
 */
export const applyExpiryDiscounts = async (selectedIds, expiringItems, token) => {
  let successCount = 0;
  let failCount = 0;

  // Apply discount to selected items
  for (const itemId of selectedIds) {
    const item = expiringItems.find(i => i._id === itemId);
    if (!item) continue;

    const discountValue = calculateExpiryDiscount(item.expiryDate);

    try {
      await applyDiscount(itemId, {
        discountType: 'percentage',
        discountValue: discountValue,
        reason: 'expiry'
      }, token);
      successCount++;
    } catch (error) {
      failCount++;
    }
  }

  // Remove discount from unselected items that have expiry discount
  const itemsToRemoveDiscount = expiringItems
    .filter(item => !selectedIds.includes(item._id) && item.discount?.reason === 'expiry')
    .map(item => item._id);

  for (const itemId of itemsToRemoveDiscount) {
    try {
      await removeDiscount(itemId, token);
    } catch (error) {
      console.error('Failed to remove discount:', error);
    }
  }

  return { successCount, failCount };
};
