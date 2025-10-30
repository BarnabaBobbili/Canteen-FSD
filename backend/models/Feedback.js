const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true,
    lowercase: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  foodQuality: {
    type: Number,
    min: 1,
    max: 5
  },
  serviceQuality: {
    type: Number,
    min: 1,
    max: 5
  },
  cleanliness: {
    type: Number,
    min: 1,
    max: 5
  },
  valueForMoney: {
    type: Number,
    min: 1,
    max: 5
  },
  comments: {
    type: String
  },
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
    default: 'neutral'
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved'],
    default: 'pending'
  },
  response: {
    type: String
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  respondedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Auto-set sentiment based on rating
feedbackSchema.pre('save', function(next) {
  if (this.rating >= 4) {
    this.sentiment = 'positive';
  } else if (this.rating === 3) {
    this.sentiment = 'neutral';
  } else {
    this.sentiment = 'negative';
  }
  next();
});

module.exports = mongoose.model('Feedback', feedbackSchema);
