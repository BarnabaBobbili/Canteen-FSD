import API_BASE_URL from '../../config/api';

/**
 * Fetch all available menu items
 * @returns {Promise<Array>} Array of menu items
 */
export const fetchMenuItems = async () => {
  const response = await fetch(`${API_BASE_URL}/menu`);
  const data = await response.json();
  return data.filter(item => item.available);
};

/**
 * Fetch today's orders
 * @param {string} token - Auth token
 * @returns {Promise<Array>} Array of today's orders
 */
export const fetchTodaysOrders = async (token) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const allOrders = await response.json();

  // Filter for today's orders only
  return allOrders.filter(order => {
    const orderDate = new Date(order.createdAt);
    orderDate.setHours(0, 0, 0, 0);
    return orderDate.getTime() === today.getTime();
  });
};

/**
 * Place a new order
 * @param {Object} orderData - Order details
 * @param {string} token - Auth token
 * @returns {Promise<Object>} Response data
 */
export const placeOrder = async (orderData, token) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Order placement failed:', errorData);
    throw new Error(errorData.message || 'Failed to place order');
  }

  return response.json();
};

/**
 * Update an existing order
 * @param {string} orderId - Order ID
 * @param {Object} updateData - Data to update
 * @param {string} token - Auth token
 * @returns {Promise<Object>} Response data
 */
export const updateOrder = async (orderId, updateData, token) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updateData)
  });

  if (!response.ok) {
    throw new Error('Failed to update order');
  }

  return response.json();
};

/**
 * Cancel an order
 * @param {string} orderId - Order ID
 * @param {string} token - Auth token
 * @returns {Promise<Object>} Response data
 */
export const cancelOrder = async (orderId, token) => {
  return updateOrder(orderId, { status: 'cancelled' }, token);
};
