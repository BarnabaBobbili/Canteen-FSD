/**
 * Payment Management API Service
 * Handles all API calls related to payments
 */

import API_BASE_URL from '../../config/api';

/**
 * Fetch all payments
 * @param {string} token - Authentication token
 * @returns {Promise<Array>} Array of payment objects
 */
export const fetchPayments = async (token) => {
  const response = await fetch(`${API_BASE_URL}/payments`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch payments: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch payment statistics
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Statistics object
 */
export const fetchStats = async (token) => {
  const response = await fetch(`${API_BASE_URL}/payments/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch stats: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Update payment status
 * @param {string} paymentId - Payment ID
 * @param {string} status - New status
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Updated payment object
 */
export const updatePaymentStatus = async (paymentId, status, token) => {
  const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ paymentStatus: status })
  });

  if (!response.ok) {
    throw new Error(`Failed to update payment: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
