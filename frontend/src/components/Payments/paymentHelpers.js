/**
 * Payment Management Helper Functions
 * Pure utility functions for payment-related operations
 */

/**
 * Get color class for payment status badge
 * @param {string} status - Payment status
 * @returns {string} Tailwind CSS classes for status badge
 */
export const getStatusColor = (status) => {
  const colors = {
    completed: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700',
    refunded: 'bg-gray-100 text-gray-700',
    processing: 'bg-blue-100 text-blue-700'
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

/**
 * Get icon for payment method
 * @param {string} method - Payment method
 * @returns {string} Emoji icon for payment method
 */
export const getMethodIcon = (method) => {
  const methods = {
    cash: '💵',
    card: '💳',
    upi: '📱',
    wallet: '👛',
    online: '🌐',
    'payroll-deduction': '📋'
  };
  return methods[method] || '💰';
};

/**
 * Filter payments based on search term and filters
 * @param {Array} payments - Array of payment objects
 * @param {string} searchTerm - Search term for filtering
 * @param {string} filterStatus - Status filter
 * @param {string} filterMethod - Payment method filter
 * @returns {Array} Filtered payments array
 */
export const filterPayments = (payments, searchTerm, filterStatus, filterMethod) => {
  return payments.filter(payment => {
    const matchesSearch = payment.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.razorpayPaymentId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || payment.paymentStatus === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.paymentMethod === filterMethod;

    return matchesSearch && matchesStatus && matchesMethod;
  });
};

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @returns {string} Formatted amount with currency symbol
 */
export const formatCurrency = (amount) => {
  if (amount == null) return '₹0.00';
  return `₹${Number(amount).toFixed(2)}`;
};

/**
 * Format date and time
 * @param {string|Date} date - Date to format
 * @param {boolean} includeTime - Whether to include time
 * @returns {string} Formatted date string
 */
export const formatDate = (date, includeTime = false) => {
  if (!date) return 'N/A';
  const dateObj = new Date(date);
  return includeTime ? dateObj.toLocaleString() : dateObj.toLocaleDateString();
};
