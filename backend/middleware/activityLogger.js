const ActivityLog = require('../models/ActivityLog');

/**
 * Helper function to log activity
 * @param {Object} options - Activity logging options
 */
const logActivity = async (options) => {
  try {
    const {
      activityType,
      performedBy,
      resourceType,
      resourceId,
      description,
      details,
      severity = 'info',
      tags = [],
      req
    } = options;

    // Add IP address and user agent if request object is available
    const activityDetails = { ...details };
    if (req) {
      activityDetails.ipAddress = req.ip || req.connection.remoteAddress;
      activityDetails.userAgent = req.get('user-agent');
    }

    const activity = new ActivityLog({
      activityType,
      performedBy,
      resourceType,
      resourceId,
      description,
      details: activityDetails,
      severity,
      tags,
      timestamp: new Date()
    });

    await activity.save();
    return activity;
  } catch (error) {
    console.error('Error logging activity:', error);
    // Don't throw error to prevent breaking the main operation
  }
};

/**
 * Middleware to automatically log activities
 * This middleware stores the original body for comparison after updates
 */
const activityLoggerMiddleware = (req, res, next) => {
  // Store original body for comparison in updates
  req.originalBody = { ...req.body };

  // Store original send function
  const originalSend = res.send;

  // Override send function to log activity after response
  res.send = function (data) {
    res.send = originalSend;

    // Log activity based on route and method
    if (req.activityLog) {
      logActivity({
        ...req.activityLog,
        req
      });
    }

    return res.send(data);
  };

  next();
};

/**
 * Helper to set activity log data on request
 */
const setActivityLog = (req, options) => {
  req.activityLog = {
    performedBy: req.user?._id,
    ...options
  };
};

// Activity type helpers for common operations
const ActivityTypes = {
  // Menu activities
  MENU_CREATE: 'menu_create',
  MENU_UPDATE: 'menu_update',
  MENU_DELETE: 'menu_delete',

  // Order activities
  ORDER_CREATE: 'order_create',
  ORDER_UPDATE: 'order_update',
  ORDER_CANCEL: 'order_cancel',
  ORDER_COMPLETE: 'order_complete',

  // Inventory activities
  INVENTORY_CREATE: 'inventory_create',
  INVENTORY_UPDATE: 'inventory_update',
  INVENTORY_DELETE: 'inventory_delete',
  INVENTORY_LOW_STOCK: 'inventory_low_stock',

  // Payment activities
  PAYMENT_CREATE: 'payment_create',
  PAYMENT_REFUND: 'payment_refund',

  // User activities
  USER_CREATE: 'user_create',
  USER_UPDATE: 'user_update',
  USER_DELETE: 'user_delete',

  // Discount activities
  DISCOUNT_CREATE: 'discount_create',
  DISCOUNT_UPDATE: 'discount_update',
  DISCOUNT_APPLIED: 'discount_applied',

  // Supplier activities
  SUPPLIER_CREATE: 'supplier_create',
  SUPPLIER_UPDATE: 'supplier_update',

  // Feedback activities
  FEEDBACK_CREATE: 'feedback_create',
  FEEDBACK_RESPOND: 'feedback_respond',

  // Auth activities
  LOGIN: 'login',
  LOGOUT: 'logout'
};

// Resource type helpers
const ResourceTypes = {
  MENU: 'Menu',
  ORDER: 'Order',
  INVENTORY: 'Inventory',
  PAYMENT: 'Payment',
  USER: 'User',
  DISCOUNT: 'Discount',
  SUPPLIER: 'Supplier',
  FEEDBACK: 'Feedback',
  AUTH: 'Auth'
};

module.exports = {
  logActivity,
  activityLoggerMiddleware,
  setActivityLog,
  ActivityTypes,
  ResourceTypes
};
