import API_BASE_URL from '../../../config/api';

/**
 * Profile page API service
 * Following CLAUDE.md patterns - all API calls in service file
 */

/**
 * Fetch user's order history
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

/**
 * Fetch user profile details
 * @param {string} token - Auth token
 * @returns {Promise<Object>} User profile data
 * @throws {Error} If fetch fails
 */
export const fetchUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

/**
 * Update user profile
 * @param {Object} profileData - Profile data to update
 * @param {string} token - Auth token
 * @returns {Promise<Object>} Updated profile
 * @throws {Error} If update fails
 */
export const updateUserProfile = async (profileData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

/**
 * Get user's favorite items from localStorage
 * @returns {Array} Array of favorite item IDs
 */
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem('canteen_favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

/**
 * Save user's favorite items to localStorage
 * @param {Array} favorites - Array of favorite item IDs
 */
export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem('canteen_favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

/**
 * Toggle favorite item
 * @param {string} itemId - Item ID to toggle
 * @returns {Array} Updated favorites array
 */
export const toggleFavorite = (itemId) => {
  const favorites = getFavorites();
  const index = favorites.indexOf(itemId);

  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(itemId);
  }

  saveFavorites(favorites);
  return favorites;
};
