/**
 * Inventory Management Helper Functions
 * Pure utility functions for inventory-related operations
 */

/**
 * Validate inventory form data
 * @param {Object} formData - Form data to validate
 * @param {Function} t - Translation function
 * @returns {Object} Object containing validation errors
 */
export const validateInventoryForm = (formData, t) => {
  const errors = {};

  // Validate item name (letters and spaces only, min 3 characters)
  if (!formData.itemName || formData.itemName.trim() === '') {
    errors.itemName = t('inventory.errors.itemNameRequired');
  } else {
    const trimmedName = formData.itemName.trim();
    if (trimmedName.length < 3) {
      errors.itemName = t('inventory.errors.itemNameMinLength');
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      errors.itemName = t('inventory.errors.itemNameLettersOnly');
    }
  }

  // Validate quantity
  if (!formData.quantity || formData.quantity <= 0) {
    errors.quantity = t('inventory.errors.quantityInvalid');
  }

  // Validate supplier
  if (!formData.supplier || formData.supplier.trim() === '') {
    errors.supplier = t('inventory.errors.supplierRequired');
  }

  return errors;
};

/**
 * Filter inventory items based on search term, supplier, and stock level
 * @param {Array} items - Array of inventory items
 * @param {string} searchTerm - Search term
 * @param {string} supplierFilter - Supplier filter
 * @param {string} stockFilter - Stock level filter ('all', 'low', 'normal')
 * @returns {Array} Filtered inventory items
 */
export const filterInventory = (items, searchTerm, supplierFilter, stockFilter) => {
  return items.filter(item => {
    const matchesSearch = item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSupplier = supplierFilter === 'all' || item.supplier === supplierFilter;
    const matchesStock = stockFilter === 'all' ||
      (stockFilter === 'low' && item.quantity < 20) ||
      (stockFilter === 'normal' && item.quantity >= 20);
    return matchesSearch && matchesSupplier && matchesStock;
  });
};

/**
 * Sort inventory items based on sort criteria
 * @param {Array} items - Array of inventory items
 * @param {string} sortBy - Sort criteria
 * @returns {Array} Sorted inventory items
 */
export const sortInventory = (items, sortBy) => {
  return [...items].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return (a.itemName || '').localeCompare(b.itemName || '');
      case 'name-desc':
        return (b.itemName || '').localeCompare(a.itemName || '');
      case 'quantity-asc':
        return (a.quantity || 0) - (b.quantity || 0);
      case 'quantity-desc':
        return (b.quantity || 0) - (a.quantity || 0);
      case 'supplier-asc':
        return (a.supplier || '').localeCompare(b.supplier || '');
      case 'supplier-desc':
        return (b.supplier || '').localeCompare(a.supplier || '');
      default:
        return 0;
    }
  });
};

/**
 * Check if an inventory item is low stock
 * @param {Object} item - Inventory item
 * @param {number} threshold - Low stock threshold (default: 20)
 * @returns {boolean} True if item is low stock
 */
export const isLowStock = (item, threshold = 20) => {
  return item.quantity < threshold;
};

/**
 * Get initial form state for new inventory item
 * @returns {Object} Initial form state
 */
export const getInitialFormState = () => ({
  itemName: '',
  quantity: '',
  unit: 'kg',
  supplier: '',
  expiryDate: '',
  batchNumber: ''
});

/**
 * Format expiry date for display
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date or 'N/A'
 */
export const formatExpiryDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString();
};
