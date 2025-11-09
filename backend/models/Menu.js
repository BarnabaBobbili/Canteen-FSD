const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['snacks', 'beverages', 'meals', 'desserts', 'breakfast']
  },
  itemType: {
    type: String,
    required: true,
    enum: ['homemade', 'packaged'],
    default: 'homemade'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  allergens: {
    type: String,
    trim: true
  },
  available: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 0,
    min: 0
  },
  lowStockThreshold: {
    type: Number,
    default: 10,
    min: 0
  },
  expiryDate: {
    type: Date
  },
  preparedDate: {
    type: Date
  },
  image: {
    type: String,
    default: null
  },
  discount: {
    type: {
      type: String,
      enum: ['percentage', 'fixed', 'none'],
      default: 'none'
    },
    value: {
      type: Number,
      default: 0,
      min: 0
    },
    reason: {
      type: String,
      enum: ['manual', 'low_stock', 'expiry', 'clearance', 'none'],
      default: 'none'
    },
    appliedAt: {
      type: Date
    }
  },
  ratings: {
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalRatings: {
      type: Number,
      default: 0,
      min: 0
    },
    ratingBreakdown: {
      5: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      1: { type: Number, default: 0 }
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Menu', menuSchema);