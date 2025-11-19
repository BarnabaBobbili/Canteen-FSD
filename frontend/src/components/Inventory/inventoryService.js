import API_BASE_URL from '../../config/api';

/**
 * Inventory Management API Service
 * Handles all API calls related to inventory
 */

/**
 * Fetch all inventory items
 * @param {string} token - Optional authentication token
 * @returns {Promise<Array>} Array of inventory items
 */
export const fetchInventory = async (token) => {
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/inventory`, { headers });
  if (!response.ok) {
    throw new Error('Failed to fetch inventory');
  }
  return response.json();
};

/**
 * Fetch all suppliers
 * @param {string} token - Authentication token (required)
 * @returns {Promise<Array>} Array of suppliers
 */
export const fetchSuppliers = async (token) => {
  const headers = {
    'Authorization': `Bearer ${token}`
  };

  const response = await fetch(`${API_BASE_URL}/suppliers`, { headers });
  if (!response.ok) {
    throw new Error('Failed to fetch suppliers');
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

/**
 * Fetch both inventory and suppliers
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Object with inventory and suppliers arrays
 */
export const fetchInventoryData = async (token) => {
  const [inventory, suppliers] = await Promise.all([
    fetchInventory(token),
    fetchSuppliers(token)
  ]);
  return { inventory, suppliers };
};

/**
 * Create a new inventory item
 * @param {Object} itemData - Inventory item data
 * @param {string} token - Authentication token
 * @param {string} userId - User ID for tracking
 * @returns {Promise<Object>} Created inventory item
 */
export const createInventoryItem = async (itemData, token, userId) => {
  const response = await fetch(`${API_BASE_URL}/inventory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      ...itemData,
      createdBy: userId
    })
  });

  if (!response.ok) {
    throw new Error('Failed to create inventory item');
  }
  return response.json();
};

/**
 * Update an existing inventory item
 * @param {string} itemId - Inventory item ID
 * @param {Object} itemData - Updated inventory item data
 * @param {string} token - Authentication token
 * @param {string} userId - User ID for tracking
 * @returns {Promise<Object>} Updated inventory item
 */
export const updateInventoryItem = async (itemId, itemData, token, userId) => {
  const response = await fetch(`${API_BASE_URL}/inventory/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      ...itemData,
      updatedBy: userId
    })
  });

  if (!response.ok) {
    throw new Error('Failed to update inventory item');
  }
  return response.json();
};

/**
 * Delete an inventory item
 * @param {string} itemId - Inventory item ID
 * @param {string} token - Authentication token
 * @returns {Promise<void>}
 */
export const deleteInventoryItem = async (itemId, token) => {
  const response = await fetch(`${API_BASE_URL}/inventory/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete inventory item');
  }
};
