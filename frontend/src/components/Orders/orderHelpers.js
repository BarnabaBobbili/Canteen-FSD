/**
 * Order Management Helper Functions
 * Pure utility functions for order-related operations
 */

/**
 * Validate email address
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid or empty
 */
export const validateEmail = (email) => {
  if (!email) return true; // Email is optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate order form data
 * @param {Object} formData - Form data to validate
 * @returns {Object} Object containing validation errors
 */
export const validateOrderForm = (formData) => {
  const errors = {};

  // Customer Name validation (letters and spaces only, min 3 characters)
  if (!formData.customerName || formData.customerName.trim() === '') {
    errors.customerName = 'Customer name is required';
  } else {
    const trimmedName = formData.customerName.trim();
    if (trimmedName.length < 3) {
      errors.customerName = 'Customer name must be at least 3 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      errors.customerName = 'Customer name can only contain letters and spaces';
    }
  }

  // Email validation (optional but must be valid if provided)
  if (formData.customerEmail && formData.customerEmail.trim() !== '') {
    if (!validateEmail(formData.customerEmail)) {
      errors.customerEmail = 'Please enter a valid email address';
    }
  }

  // Phone Number validation
  if (!formData.customerPhone || formData.customerPhone.trim() === '') {
    errors.customerPhone = 'Phone number is required';
  } else if (formData.customerPhone.length !== 10) {
    errors.customerPhone = 'Phone number must be 10 digits';
  } else if (!/^\d+$/.test(formData.customerPhone)) {
    errors.customerPhone = 'Phone number must contain only digits';
  }

  return errors;
};

/**
 * Filter orders based on search term, status, and order type
 * @param {Array} orders - Array of order objects
 * @param {string} searchTerm - Search term
 * @param {string} statusFilter - Status filter
 * @param {string} orderTypeFilter - Order type filter
 * @param {boolean} showCompletedReady - Whether to show completed/ready orders
 * @returns {Array} Filtered orders array
 */
export const filterOrders = (orders, searchTerm, statusFilter, orderTypeFilter, showCompletedReady) => {
  return orders.filter(order => {
    // Search filter
    const matchesSearch = order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone?.includes(searchTerm) ||
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    // Order type filter
    const matchesOrderType = orderTypeFilter === 'all' || order.orderType === orderTypeFilter;

    // Hide completed and ready orders by default unless user wants to see them
    const isActiveOrder = showCompletedReady || (order.status !== 'completed' && order.status !== 'ready');

    return matchesSearch && matchesStatus && matchesOrderType && isActiveOrder;
  });
};

/**
 * Sort orders based on sort criteria
 * @param {Array} orders - Array of order objects
 * @param {string} sortBy - Sort criteria
 * @returns {Array} Sorted orders array
 */
export const sortOrders = (orders, sortBy) => {
  return [...orders].sort((a, b) => {
    switch (sortBy) {
      case 'date-asc':
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      case 'date-desc':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'total-asc':
        return (a.totalAmount || 0) - (b.totalAmount || 0);
      case 'total-desc':
        return (b.totalAmount || 0) - (a.totalAmount || 0);
      case 'customer-asc':
        return (a.customerName || '').localeCompare(b.customerName || '');
      case 'customer-desc':
        return (b.customerName || '').localeCompare(a.customerName || '');
      case 'status':
        const statusOrder = { 'pending': 1, 'preparing': 2, 'ready': 3, 'completed': 4, 'cancelled': 5 };
        return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
      default:
        return 0;
    }
  });
};

/**
 * Get color class for order status badge
 * @param {string} status - Order status
 * @returns {string} Tailwind CSS classes for status badge
 */
export const getStatusColor = (status) => {
  const colors = {
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    preparing: 'bg-blue-100 text-blue-700',
    ready: 'bg-indigo-100 text-indigo-700',
    cancelled: 'bg-red-100 text-red-700'
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

/**
 * Create initial form state for new order
 * @returns {Object} Initial form state
 */
export const getInitialFormState = () => ({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  items: [],
  orderType: 'dine-in',
  status: 'pending',
  totalAmount: 0
});

/**
 * Calculate discounted price based on discount type
 * @param {number} price - Original price
 * @param {Object} discount - Discount object {type, value}
 * @returns {number} Final price after discount
 */
export const calculateDiscountedPrice = (price, discount) => {
  if (!discount || discount.type === 'none' || !discount.value) return price;

  if (discount.type === 'percentage') {
    return price - (price * discount.value / 100);
  } else if (discount.type === 'fixed') {
    return Math.max(0, price - discount.value);
  }
  return price;
};
