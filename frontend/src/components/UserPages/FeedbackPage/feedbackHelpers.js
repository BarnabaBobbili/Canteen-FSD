import API_BASE_URL from '../../../config/api';

/**
 * Fetch user's completed orders
 * @returns {Promise<Array>} Array of completed orders
 */
export const fetchMyOrders = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();
  // Only show completed orders
  return data.filter(order => order.status === 'completed');
};

/**
 * Submit feedback to API
 * @param {Object} feedbackData - Feedback data to submit
 * @returns {Promise<Response>} Fetch response
 */
export const submitFeedback = async (feedbackData) => {
  return fetch(`${API_BASE_URL}/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(feedbackData)
  });
};
