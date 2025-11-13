/**
 * Utility functions for discount calculations and formatting
 */
import i18n from '../../i18n/i18n';

const { t } = i18n;

/**
 * Calculate the final price after applying discount
 * @param {number} price - Original price
 * @param {object} discount - Discount object with type and value
 * @returns {number} - Discounted price
 */
export const calculateDiscountedPrice = (price, discount) => {
  if (!discount || discount.type === 'none') return price;

  if (discount.type === 'percentage') {
    return price - (price * discount.value / 100);
  } else if (discount.type === 'fixed') {
    return Math.max(0, price - discount.value);
  }
  return price;
};

/**
 * Get the appropriate badge color based on discount reason
 * @param {string} reason - Discount reason
 * @returns {string} - Tailwind CSS classes for badge
 */
export const getDiscountBadgeColor = (reason) => {
  switch (reason) {
    case 'low_stock': return 'bg-orange-100 text-orange-800';
    case 'expiry': return 'bg-red-100 text-red-800';
    case 'clearance': return 'bg-purple-100 text-purple-800';
    case 'manual': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return t('common.notAvailable');
  return new Date(date).toLocaleDateString(i18n.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Filter and sort items based on criteria
 * @param {Array} items - Items to filter and sort
 * @param {string} searchTerm - Search query
 * @param {string} categoryFilter - Category filter value
 * @param {string} expiryFilter - Expiry filter value
 * @param {string} sortBy - Sort criteria
 * @returns {Array} - Filtered and sorted items
 */
export const filterAndSortItems = (items, searchTerm = '', categoryFilter = 'all', expiryFilter = 'all', sortBy = 'discount-desc') => {
  let filtered = [...items];

  // Apply search filter
  if (searchTerm.trim()) {
    filtered = filtered.filter(item => {
      const itemName = (item.menuItemDetails?.itemName || item.itemName || '').toLowerCase();
      const category = (item.menuItemDetails?.category || item.category || '').toLowerCase();
      return itemName.includes(searchTerm.toLowerCase()) || category.includes(searchTerm.toLowerCase());
    });
  }

  // Apply category filter
  if (categoryFilter !== 'all') {
    filtered = filtered.filter(item => {
      const category = item.menuItemDetails?.category || item.category;
      return category === categoryFilter;
    });
  }

  // Apply expiry filter
  if (expiryFilter !== 'all') {
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    switch (expiryFilter) {
      case 'expiring-soon':
        filtered = filtered.filter(item => {
          const expiryDate = item.menuItemDetails?.expiryDate || item.expiryDate;
          return expiryDate && new Date(expiryDate) <= sevenDaysFromNow && new Date(expiryDate) >= today;
        });
        break;
      case 'expired':
        filtered = filtered.filter(item => {
          const expiryDate = item.menuItemDetails?.expiryDate || item.expiryDate;
          return expiryDate && new Date(expiryDate) < today;
        });
        break;
      case 'has-expiry':
        filtered = filtered.filter(item => {
          const expiryDate = item.menuItemDetails?.expiryDate || item.expiryDate;
          return expiryDate;
        });
        break;
      case 'no-expiry':
        filtered = filtered.filter(item => {
          const expiryDate = item.menuItemDetails?.expiryDate || item.expiryDate;
          return !expiryDate;
        });
        break;
      default:
        break;
    }
  }

  // Apply sorting
  switch (sortBy) {
    case 'discount-desc':
      filtered.sort((a, b) => {
        const aDiscount = a.menuItemDetails?.discount?.value || a.discount?.value || 0;
        const bDiscount = b.menuItemDetails?.discount?.value || b.discount?.value || 0;
        return bDiscount - aDiscount;
      });
      break;
    case 'discount-asc':
      filtered.sort((a, b) => {
        const aDiscount = a.menuItemDetails?.discount?.value || a.discount?.value || 0;
        const bDiscount = b.menuItemDetails?.discount?.value || b.discount?.value || 0;
        return aDiscount - bDiscount;
      });
      break;
    case 'price-desc':
      filtered.sort((a, b) => {
        const aPrice = a.menuItemDetails?.price || a.price || 0;
        const bPrice = b.menuItemDetails?.price || b.price || 0;
        return bPrice - aPrice;
      });
      break;
    case 'price-asc':
      filtered.sort((a, b) => {
        const aPrice = a.menuItemDetails?.price || a.price || 0;
        const bPrice = b.menuItemDetails?.price || b.price || 0;
        return aPrice - bPrice;
      });
      break;
    case 'expiry-soon':
      filtered.sort((a, b) => {
        const aExpiry = a.menuItemDetails?.expiryDate || a.expiryDate;
        const bExpiry = b.menuItemDetails?.expiryDate || b.expiryDate;
        if (!aExpiry) return 1;
        if (!bExpiry) return -1;
        return new Date(aExpiry) - new Date(bExpiry);
      });
      break;
    case 'expiry-late':
      filtered.sort((a, b) => {
        const aExpiry = a.menuItemDetails?.expiryDate || a.expiryDate;
        const bExpiry = b.menuItemDetails?.expiryDate || b.expiryDate;
        if (!aExpiry) return 1;
        if (!bExpiry) return -1;
        return new Date(bExpiry) - new Date(aExpiry);
      });
      break;
    case 'name-asc':
      filtered.sort((a, b) => {
        const aName = a.itemName || a._id || '';
        const bName = b.itemName || b._id || '';
        return aName.localeCompare(bName);
      });
      break;
    case 'name-desc':
      filtered.sort((a, b) => {
        const aName = a.itemName || a._id || '';
        const bName = b.itemName || b._id || '';
        return bName.localeCompare(aName);
      });
      break;
    default:
      break;
  }

  return filtered;
};

/**
 * Calculate discount percentage for expiring items based on days until expiry
 * @param {string|Date} expiryDate - Expiry date
 * @returns {number} - Discount percentage (30, 50, or 70)
 */
export const calculateExpiryDiscount = (expiryDate) => {
  const daysUntilExpiry = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));

  if (daysUntilExpiry <= 1) return 70;
  if (daysUntilExpiry <= 3) return 50;
  return 30;
};

/**
 * Sort items by discount status (non-discounted first, then discounted)
 * @param {Array} items - Items to sort
 * @param {string} discountReason - Discount reason to check
 * @returns {Array} - Sorted items
 */
export const sortByDiscountStatus = (items, discountReason) => {
  return items.sort((a, b) => {
    const aHasDiscount = a.discount?.reason === discountReason && a.discount?.value > 0;
    const bHasDiscount = b.discount?.reason === discountReason && b.discount?.value > 0;

    if (aHasDiscount && !bHasDiscount) return 1;
    if (!aHasDiscount && bHasDiscount) return -1;
    return 0;
  });
};
