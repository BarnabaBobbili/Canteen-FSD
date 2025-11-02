/**
 * Calculate time difference from now in a human-readable format
 * @param {Date|string} date - The date to compare with current time
 * @returns {string} Human-readable time difference (e.g., "2h ago", "3d ago")
 */
export const getTimeDifference = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
};

/**
 * Get date range based on filter type
 * @param {string} filter - Filter type ('week', 'month', 'quarterly', 'half-yearly', 'yearly')
 * @returns {Object} Object with startDate and endDate
 */
export const getDateRange = (filter) => {
  const now = new Date();
  const startDate = new Date();

  switch (filter) {
    case 'week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'quarterly':
      startDate.setMonth(now.getMonth() - 3);
      break;
    case 'half-yearly':
      startDate.setMonth(now.getMonth() - 6);
      break;
    case 'yearly':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    default:
      startDate.setDate(now.getDate() - 7);
  }

  return { startDate, endDate: now };
};

/**
 * Format activity data from API response
 * @param {Array} activities - Raw activities from API
 * @param {Function} getTimeDifference - Function to calculate time difference
 * @returns {Array} Formatted activities
 */
export const formatActivities = (activities, getTimeDifference) => {
  return activities.map(activity => {
    const activityDate = new Date(activity.timestamp);

    // Determine icon based on activity type
    let icon = 'update';
    if (activity.activityType.includes('order')) icon = 'order';
    else if (activity.activityType.includes('menu')) icon = 'menu';
    else if (activity.activityType.includes('inventory')) icon = 'inventory';
    else if (activity.activityType.includes('low_stock')) icon = 'alert';

    if (activity.activityType === 'order_complete') icon = 'completed';
    else if (activity.activityType === 'order_cancel') icon = 'cancelled';

    return {
      text: activity.description,
      detail: activity.performedBy ? `By: ${activity.performedBy.name} (${activity.performedBy.role})` : '',
      time: getTimeDifference(activityDate),
      timestamp: activityDate,
      icon,
      type: activity.activityType,
      data: activity,
      createdBy: activity.performedBy,
      updatedBy: activity.performedBy
    };
  });
};

/**
 * Generate fallback activities from orders and menu items if API activities are empty
 * @param {Array} orders - All orders
 * @param {Array} menuItems - All menu items
 * @param {Function} getTimeDifference - Function to calculate time difference
 * @returns {Array} Generated activities
 */
export const generateFallbackActivities = (orders, menuItems, getTimeDifference) => {
  const fallbackActivities = [];

  // Add order activities
  orders.forEach(order => {
    const orderDate = new Date(order.createdAt);
    fallbackActivities.push({
      text: `Order #${order._id?.slice(-6)} - ${order.customerName || 'Customer'} (${order.status})`,
      detail: `${order.items?.length || 0} items, ₹${order.totalAmount?.toFixed(2) || '0.00'}`,
      time: getTimeDifference(orderDate),
      timestamp: orderDate,
      icon: order.status === 'completed' ? 'completed' :
            order.status === 'cancelled' ? 'cancelled' : 'order',
      type: 'order',
      data: order,
      createdBy: order.createdBy,
      updatedBy: order.updatedBy
    });

    // Add status update activity if order was updated recently
    if (order.updatedAt && order.updatedAt !== order.createdAt) {
      const updateDate = new Date(order.updatedAt);
      fallbackActivities.push({
        text: `Order #${order._id?.slice(-6)} status changed to ${order.status}`,
        detail: order.customerName || 'Customer',
        time: getTimeDifference(updateDate),
        timestamp: updateDate,
        icon: 'update',
        type: 'order-update',
        data: order,
        createdBy: order.createdBy,
        updatedBy: order.updatedBy
      });
    }
  });

  // Add menu items activities
  menuItems.forEach(item => {
    const createdDate = new Date(item.createdAt || new Date());
    fallbackActivities.push({
      text: `Menu item "${item.itemName}" added`,
      detail: `${item.category} - ₹${item.price}`,
      time: getTimeDifference(createdDate),
      timestamp: createdDate,
      icon: 'menu',
      type: 'menu-add',
      data: item,
      createdBy: item.createdBy,
      updatedBy: item.updatedBy
    });

    // Add update activity
    if (item.updatedAt && item.updatedAt !== item.createdAt) {
      const updateDate = new Date(item.updatedAt);
      fallbackActivities.push({
        text: `Menu item "${item.itemName}" updated`,
        detail: item.available ? 'Available' : 'Unavailable',
        time: getTimeDifference(updateDate),
        timestamp: updateDate,
        icon: 'update',
        type: 'menu-update',
        data: item,
        createdBy: item.createdBy,
        updatedBy: item.updatedBy
      });
    }
  });

  // Sort by timestamp (newest first)
  return fallbackActivities.sort((a, b) => b.timestamp - a.timestamp);
};
