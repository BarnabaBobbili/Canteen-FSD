/**
 * Supplier Management Helper Functions
 * Pure utility functions for supplier data processing
 */

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validate supplier form
 * @param {Object} form - Supplier form data
 * @returns {Object} Object containing validation errors (empty if valid)
 */
export const validateSupplierForm = (form) => {
  const errors = {};

  if (!form.supplierName || form.supplierName.trim() === '') {
    errors.supplierName = 'Supplier name is required';
  }

  if (!form.contactPerson || form.contactPerson.trim() === '') {
    errors.contactPerson = 'Contact person is required';
  }

  if (!form.email || !validateEmail(form.email)) {
    errors.email = 'Valid email is required';
  }

  if (!form.phone || form.phone.trim() === '') {
    errors.phone = 'Phone number is required';
  }

  if (!form.address || form.address.trim() === '') {
    errors.address = 'Address is required';
  }

  if (!form.supplierType) {
    errors.supplierType = 'Supplier type is required';
  }

  return errors;
};

/**
 * Get color classes for supplier type badge
 * @param {string} type - Supplier type
 * @returns {string} Tailwind CSS classes
 */
export const getSupplierTypeColor = (type) => {
  const colors = {
    'food': 'bg-green-100 text-green-800',
    'beverages': 'bg-blue-100 text-blue-800',
    'raw-materials': 'bg-yellow-100 text-yellow-800',
    'packaging': 'bg-purple-100 text-purple-800',
    'equipment': 'bg-gray-100 text-gray-800',
    'other': 'bg-pink-100 text-pink-800'
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

/**
 * Filter suppliers by search term
 * @param {Array} suppliers - Array of suppliers
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered suppliers
 */
export const filterSuppliers = (suppliers, searchTerm) => {
  const term = searchTerm.toLowerCase();
  return suppliers.filter(supplier =>
    supplier.supplierName.toLowerCase().includes(term) ||
    supplier.contactPerson.toLowerCase().includes(term) ||
    supplier.email.toLowerCase().includes(term) ||
    supplier.supplierType.toLowerCase().includes(term)
  );
};

/**
 * Calculate average rating from suppliers
 * @param {Array} suppliers - Array of suppliers
 * @returns {string} Average rating formatted to 1 decimal place
 */
export const calculateAverageRating = (suppliers) => {
  if (suppliers.length === 0) return '0.0';
  const sum = suppliers.reduce((acc, s) => acc + (s.rating || 3), 0);
  return (sum / suppliers.length).toFixed(1);
};

/**
 * Format payment terms for display
 * @param {string} terms - Payment terms code
 * @returns {string} Formatted payment terms
 */
export const formatPaymentTerms = (terms) => {
  if (!terms) return '';
  return terms.replace('net-', 'Net ').replace('immediate', 'Immediate');
};
