import API_BASE_URL from '../../config/api';

/**
 * Menu Service
 * API calls for menu management
 */

/**
 * Fetch all menu items
 * @returns {Promise<Array>} Array of menu items
 */
export const fetchMenuItems = async () => {
  const response = await fetch(`${API_BASE_URL}/menu`);
  if (!response.ok) {
    throw new Error('Failed to fetch menu items');
  }
  return response.json();
};

/**
 * Create a new menu item
 * @param {Object} menuData - Menu item data
 * @param {string} token - Auth token
 * @returns {Promise<Object>} Created menu item
 */
export const createMenuItem = async (menuData, token) => {
  const response = await fetch(`${API_BASE_URL}/menu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(menuData)
  });

  if (!response.ok) {
    // Use generic error message to avoid exposing server internals
    let errorMessage = 'Failed to create menu item';
    try {
      const errorData = await response.json();
      // Log for debugging but don't expose to users
      if (errorData.message) {
        console.debug('Server error:', errorData.message);
      }
    } catch {
      // Response body is not valid JSON
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

/**
 * Update an existing menu item
 * @param {string} id - Menu item ID
 * @param {Object} menuData - Updated menu item data
 * @param {string} token - Auth token
 * @returns {Promise<Object>} Updated menu item
 */
export const updateMenuItem = async (id, menuData, token) => {
  const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(menuData)
  });

  if (!response.ok) {
    // Use generic error message to avoid exposing server internals
    let errorMessage = 'Failed to update menu item';
    try {
      const errorData = await response.json();
      // Log for debugging but don't expose to users
      if (errorData.message) {
        console.debug('Server error:', errorData.message);
      }
    } catch {
      // Response body is not valid JSON
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

/**
 * Delete a menu item
 * @param {string} id - Menu item ID
 * @param {string} token - Auth token
 * @returns {Promise<void>}
 */
export const deleteMenuItem = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    throw new Error('Failed to delete menu item');
  }
};

/**
 * Upload menu item image
 * @param {File} file - Image file
 * @param {string} token - Auth token
 * @returns {Promise<string>} Image path
 */
export const uploadMenuImage = async (file, token) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_BASE_URL}/menu/upload-image`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return data.imagePath;
};

/**
 * Prepare menu data for submission
 * Cleans base64 data and adds user tracking
 * @param {Object} formData - Form data
 * @param {string} mode - 'add' or 'edit'
 * @param {string} userId - User ID
 * @returns {Object} Cleaned data
 */
export const prepareMenuData = (formData, mode, userId) => {
  const dataToSend = {
    ...formData,
    ...(mode === 'add' ? { createdBy: userId } : { updatedBy: userId })
  };

  // Clean up base64 data
  if (dataToSend.image && dataToSend.image.startsWith('data:')) {
    console.warn('Removing base64 data from submission. Setting image to null.');
    dataToSend.image = null;
  }

  return dataToSend;
};
