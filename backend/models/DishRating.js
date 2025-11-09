const mongoose = require('mongoose');

const dishRatingSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    lowercase: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true
  },
  verified: {
    type: Boolean,
    default: true // Only from actual orders
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate ratings for same dish in same order
dishRatingSchema.index({ menuItemId: 1, orderId: 1, customerEmail: 1 }, { unique: true });

// Update menu item ratings after saving
dishRatingSchema.post('save', async function() {
  const Menu = mongoose.model('Menu');

  // Aggregate ratings for this menu item
  const ratings = await this.constructor.aggregate([
    { $match: { menuItemId: this.menuItemId } },
    {
      $group: {
        _id: '$menuItemId',
        averageRating: { $avg: '$rating' },
        totalRatings: { $sum: 1 },
        rating5: { $sum: { $cond: [{ $eq: ['$rating', 5] }, 1, 0] } },
        rating4: { $sum: { $cond: [{ $eq: ['$rating', 4] }, 1, 0] } },
        rating3: { $sum: { $cond: [{ $eq: ['$rating', 3] }, 1, 0] } },
        rating2: { $sum: { $cond: [{ $eq: ['$rating', 2] }, 1, 0] } },
        rating1: { $sum: { $cond: [{ $eq: ['$rating', 1] }, 1, 0] } }
      }
    }
  ]);

  if (ratings.length > 0) {
    const ratingData = ratings[0];
    await Menu.findByIdAndUpdate(this.menuItemId, {
      'ratings.averageRating': ratingData.averageRating,
      'ratings.totalRatings': ratingData.totalRatings,
      'ratings.ratingBreakdown.5': ratingData.rating5,
      'ratings.ratingBreakdown.4': ratingData.rating4,
      'ratings.ratingBreakdown.3': ratingData.rating3,
      'ratings.ratingBreakdown.2': ratingData.rating2,
      'ratings.ratingBreakdown.1': ratingData.rating1
    });
  }
});

module.exports = mongoose.model('DishRating', dishRatingSchema);
