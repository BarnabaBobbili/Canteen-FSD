import API_BASE_URL from '../../config/api';

/**
 * Fetch active orders (pending, preparing, ready)
 * @param {string} token - Auth token
 * @returns {Promise<Array>} Array of active orders
 */
export const fetchActiveOrders = async (token) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const allOrders = await response.json();

  // Filter only active orders
  return allOrders.filter(order =>
    ['pending', 'preparing', 'ready'].includes(order.status)
  );
};

/**
 * Update order status
 * @param {string} orderId - Order ID
 * @param {string} newStatus - New status
 * @param {string} token - Auth token
 * @returns {Promise<Object>} Response data
 */
export const updateOrderStatus = async (orderId, newStatus, token) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status: newStatus })
  });

  if (!response.ok) {
    throw new Error('Failed to update order status');
  }

  return response.json();
};
