const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  discountName: {
    type: String,
    required: true
  },
  discountCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  minOrderAmount: {
    type: Number,
    default: 0
  },
  maxDiscountAmount: {
    type: Number
  },
  applicableCategories: [{
    type: String,
    enum: ['snacks', 'beverages', 'meals', 'desserts', 'breakfast', 'all'],
    default: 'all'
  }],
  validFrom: {
    type: Date,
    required: true
  },
  validUntil: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'expired'],
    default: 'active'
  },
  usageLimit: {
    type: Number,
    default: null // null means unlimited
  },
  usedCount: {
    type: Number,
    default: 0
  },
  applicableRoles: [{
    type: String,
    enum: ['customer', 'staff', 'all'],
    default: 'all'
  }],
  description: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Discount', discountSchema);
