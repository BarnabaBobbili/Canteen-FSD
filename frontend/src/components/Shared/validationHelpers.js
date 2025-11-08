/**
 * Shared Validation Helper Functions
 * Reusable validation utilities for form inputs
 */

/**
 * Validate name field (letters and spaces only, minimum 3 characters)
 * @param {string} name - Name to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {string|null} Error message or null if valid
 */
export const validateName = (name, fieldName = 'Name') => {
  if (!name || name.trim() === '') {
    return `${fieldName} is required`;
  }

  const trimmedName = name.trim();

  // Check minimum length
  if (trimmedName.length < 3) {
    return `${fieldName} must be at least 3 characters`;
  }

  // Check if contains only letters and spaces
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(trimmedName)) {
    return `${fieldName} can only contain letters and spaces`;
  }

  return null;
};

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validate phone number (basic validation)
 * @param {string} phone - Phone number to validate
 * @returns {string|null} Error message or null if valid
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return 'Phone number is required';
  }

  // Basic phone validation - at least 10 digits
  const phoneRegex = /\d{10,}/;
  if (!phoneRegex.test(phone.replace(/[\s\-()]/g, ''))) {
    return 'Phone number must contain at least 10 digits';
  }

  return null;
};
