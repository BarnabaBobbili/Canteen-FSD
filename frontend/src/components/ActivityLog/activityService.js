/**
 * Activity Service
 * Handles all API calls related to activity logging
 */

import API_BASE_URL from '../../config/api';

/**
 * Fetch activities with pagination and filters
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.search - Search term
 * @param {Object} params.filters - Filter options
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Activities data with pagination
 */
export const fetchActivities = async (params, token) => {
  const queryParams = new URLSearchParams({
    page: params.page,
    limit: params.limit
  });

  // Add filters if they exist
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
  }

  // Add search term if it exists
  if (params.search) {
    queryParams.append('search', params.search);
  }

  const response = await fetch(`${API_BASE_URL}/activities?${queryParams}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch activities');
  }

  return response.json();
};

/**
 * Fetch a single activity by ID
 * @param {string} activityId - Activity ID
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Activity details
 */
export const fetchActivityById = async (activityId, token) => {
  const response = await fetch(`${API_BASE_URL}/activities/${activityId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch activity details');
  }

  return response.json();
};
