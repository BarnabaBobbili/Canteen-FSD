/**
 * Supplier Service
 * Handles all API calls related to supplier management
 */

import API_BASE_URL from '../../config/api';

/**
 * Fetch all suppliers
 * @param {string} token - Authentication token
 * @returns {Promise<Array>} Array of suppliers
 */
export const fetchSuppliers = async (token) => {
  const response = await fetch(`${API_BASE_URL}/suppliers`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch suppliers');
  }

  return response.json();
};

/**
 * Create a new supplier
 * @param {Object} supplierData - Supplier data
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Created supplier
 */
export const createSupplier = async (supplierData, token) => {
  const response = await fetch(`${API_BASE_URL}/suppliers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(supplierData)
  });

  if (!response.ok) {
    let errorMessage = 'Failed to create supplier';
    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch {
      // Response body is not valid JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

/**
 * Update an existing supplier
 * @param {string} id - Supplier ID
 * @param {Object} supplierData - Updated supplier data
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Updated supplier
 */
export const updateSupplier = async (id, supplierData, token) => {
  const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(supplierData)
  });

  if (!response.ok) {
    let errorMessage = 'Failed to update supplier';
    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch {
      // Response body is not valid JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

/**
 * Delete a supplier
 * @param {string} id - Supplier ID
 * @param {string} token - Authentication token
 * @returns {Promise<void>}
 */
export const deleteSupplier = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/suppliers/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete supplier');
  }
};
