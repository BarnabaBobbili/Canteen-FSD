/**
 * Staff Service
 * Handles all API calls related to staff management
 */

import API_BASE_URL from '../../config/api';

/**
 * Fetch all staff members
 * @param {string} token - Authentication token
 * @returns {Promise<Array>} Array of staff members
 */
export const fetchStaff = async (token) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch staff');
  }

  return response.json();
};

/**
 * Create a new staff member
 * @param {Object} staffData - Staff member data
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Created staff member
 */
export const createStaff = async (staffData, token) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(staffData)
  });

  if (!response.ok) {
    let errorMessage = 'Failed to create staff member';
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
 * Update an existing staff member
 * @param {string} id - Staff member ID
 * @param {Object} staffData - Updated staff member data
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Updated staff member
 */
export const updateStaff = async (id, staffData, token) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(staffData)
  });

  if (!response.ok) {
    let errorMessage = 'Failed to update staff member';
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
 * Delete a staff member
 * @param {string} id - Staff member ID
 * @param {string} token - Authentication token
 * @returns {Promise<void>}
 */
export const deleteStaff = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete staff member');
  }
};

/**
 * Toggle staff member status (active/inactive)
 * @param {string} id - Staff member ID
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Updated staff member
 */
export const toggleStaffStatus = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}/toggle-status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to toggle staff status');
  }

  return response.json();
};
