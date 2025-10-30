const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  // Activity Details
  activityType: {
    type: String,
    required: true,
    enum: [
      'menu_create',
      'menu_update',
      'menu_delete',
      'order_create',
      'order_update',
      'order_cancel',
      'order_complete',
      'inventory_create',
      'inventory_update',
      'inventory_delete',
      'inventory_low_stock',
      'payment_create',
      'payment_refund',
      'user_create',
      'user_update',
      'user_delete',
      'discount_create',
      'discount_update',
      'discount_applied',
      'supplier_create',
      'supplier_update',
      'feedback_create',
      'feedback_respond',
      'login',
      'logout'
    ]
  },

  // User who performed the action
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Resource Details
  resourceType: {
    type: String,
    enum: ['Menu', 'Order', 'Inventory', 'Payment', 'User', 'Discount', 'Supplier', 'Feedback', 'Auth'],
    required: true
  },

  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false // Not required for some activities like login
  },

  // Activity Description
  description: {
    type: String,
    required: true
  },

  // Detailed Information
  details: {
    // For Menu activities
    itemName: String,
    category: String,
    price: Number,

    // For Order activities
    customerName: String,
    customerEmail: String,
    customerPhone: String,
    orderType: String,
    orderStatus: String,
    totalAmount: Number,
    items: [{
      itemName: String,
      quantity: Number,
      price: Number
    }],

    // For Inventory activities
    inventoryItem: String,
    quantity: Number,
    unit: String,
    supplier: String,
    previousQuantity: Number,
    newQuantity: Number,

    // For Payment activities
    paymentMethod: String,
    amount: Number,
    paymentStatus: String,
    discountApplied: Number,
    refundAmount: Number,
    refundReason: String,

    // For User activities
    userName: String,
    userEmail: String,
    userRole: String,
    department: String,

    // For Discount activities
    discountCode: String,
    discountValue: Number,
    discountType: String,

    // For Supplier activities
    supplierName: String,
    supplierType: String,

    // For Feedback activities
    rating: Number,
    sentiment: String,

    // Previous and New values for updates
    previousValues: mongoose.Schema.Types.Mixed,
    newValues: mongoose.Schema.Types.Mixed,

    // Additional metadata
    ipAddress: String,
    userAgent: String
  },

  // Status and Tags
  severity: {
    type: String,
    enum: ['info', 'warning', 'critical'],
    default: 'info'
  },

  tags: [String],

  // Timestamps
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
activityLogSchema.index({ performedBy: 1, timestamp: -1 });
activityLogSchema.index({ activityType: 1, timestamp: -1 });
activityLogSchema.index({ resourceType: 1, resourceId: 1 });
activityLogSchema.index({ timestamp: -1 });
activityLogSchema.index({ 'details.customerEmail': 1 });
activityLogSchema.index({ 'details.orderStatus': 1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
