import API_BASE_URL from '../../../config/api';

/**
 * Order page API service
 * Following CLAUDE.md patterns - all API calls in service file
 */

/**
 * Fetch available menu items
 * @returns {Promise<Array>} Array of menu items
 * @throws {Error} If fetch fails
 */
export const fetchMenuItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/menu`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    const data = await response.json();
    return data.filter(item => item.available);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

/**
 * Place an order
 * @param {Object} orderData - Order data with items, total, etc.
 * @param {string} token - Auth token (optional for guests)
 * @returns {Promise<Object>} Order confirmation
 * @throws {Error} If order placement fails
 */
export const placeOrder = async (orderData, token = null) => {
  try {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Failed to place order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};

/**
 * Fetch user's order history (authenticated users only)
 * @param {string} token - Auth token
 * @returns {Promise<Array>} Array of past orders
 * @throws {Error} If fetch fails
 */
export const fetchOrderHistory = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order history');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching order history:', error);
    throw error;
  }
};
