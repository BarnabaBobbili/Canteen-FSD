/**
 * Order Management API Service
 * Handles all API calls related to orders
 */

import API_BASE_URL from '../../config/api';

/**
 * Fetch all orders
 * @returns {Promise<Array>} Array of order objects
 */
export const fetchOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/orders`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
};

/**
 * Create a new order
 * @param {Object} orderData - Order data
 * @param {string} token - Authentication token
 * @param {string} userId - User ID for tracking
 * @returns {Promise<Object>} Created order object
 */
export const createOrder = async (orderData, token, userId) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      ...orderData,
      createdBy: userId
    })
  });

  if (!response.ok) {
    throw new Error('Failed to create order');
  }
  return response.json();
};

/**
 * Update an existing order
 * @param {string} orderId - Order ID
 * @param {Object} orderData - Updated order data
 * @param {string} token - Authentication token
 * @param {string} userId - User ID for tracking
 * @returns {Promise<Object>} Updated order object
 */
export const updateOrder = async (orderId, orderData, token, userId) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      ...orderData,
      updatedBy: userId
    })
  });

  if (!response.ok) {
    throw new Error('Failed to update order');
  }
  return response.json();
};

/**
 * Delete an order
 * @param {string} orderId - Order ID
 * @param {string} token - Authentication token
 * @returns {Promise<void>}
 */
export const deleteOrder = async (orderId, token) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete order');
  }
};
