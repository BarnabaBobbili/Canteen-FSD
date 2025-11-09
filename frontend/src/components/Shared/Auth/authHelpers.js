/**
 * Authentication Helper Functions
 * Pure utility functions for auth validation and routing
 */

/**
 * Validate password match for signup
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirm password
 * @returns {string|null} Error message or null if valid
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return null;
};

/**
 * Validate password length
 * @param {string} password - Password
 * @returns {string|null} Error message or null if valid
 */
export const validatePasswordLength = (password) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  return null;
};

/**
 * Validate phone number format (10 digits)
 * @param {string} phone - Phone number
 * @returns {string|null} Error message or null if valid
 */
export const validatePhone = (phone) => {
  if (phone && !/^[0-9]{10}$/.test(phone)) {
    return 'Phone number must be 10 digits';
  }
  return null;
};

/**
 * Get default redirect path based on user role
 * @param {string} role - User role
 * @returns {string} Redirect path
 */
export const getDefaultRedirect = (role) => {
  if (role === 'admin') return '/admin';
  if (role === 'manager') return '/manager';
  if (role === 'cashier') return '/cashier';
  if (role === 'staff') return '/kitchen';
  if (role === 'customer') return '/order';
  return '/dashboard';
};

/**
 * Demo accounts for quick testing (staff login only)
 * Only available in development mode for security
 */
export const getDemoAccounts = () => {
  // Only allow demo accounts in development mode
  if (process.env.NODE_ENV === 'production') {
    return [];
  }

  return [
    { label: 'Admin', email: 'admin@canteen.com', password: 'admin123', role: 'admin' },
    { label: 'Manager', email: 'manager@canteen.com', password: 'manager123', role: 'manager' },
    { label: 'Cashier', email: 'cashier@canteen.com', password: 'cashier123', role: 'cashier' },
    { label: 'Staff', email: 'staff@canteen.com', password: 'staff123', role: 'staff' }
  ];
};

// Backward compatibility - but will return empty array in production
export const demoAccounts = getDemoAccounts();
