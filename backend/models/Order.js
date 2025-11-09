const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    // Not required here since it's auto-generated in pre-save hook
    required: false
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  items: [{
    itemName: String,
    quantity: Number,
    price: Number
  }],
  orderType: {
    type: String,
    enum: ['online', 'counter', 'dine-in', 'takeaway'],
    default: 'dine-in'
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'upi', 'card', 'online'],
    default: 'cash'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    trim: true
  },
  razorpayOrderId: {
    type: String,
    trim: true
  },
  razorpayPaymentId: {
    type: String,
    trim: true
  },
  razorpaySignature: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  otp: {
    type: String,
    trim: true
  },
  otpExpires: {
    type: Date
  },
  otpVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Generate unique order number before saving
orderSchema.pre('save', async function(next) {
  try {
    if (this.isNew && !this.orderNumber) {
      // Generate order number: ORD-YYYYMMDD-XXX
      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');

      // Find the last order of today
      const lastOrder = await mongoose.model('Order')
        .findOne({
          orderNumber: new RegExp(`^ORD-${dateStr}-`)
        })
        .sort({ orderNumber: -1 });

      let sequence = 1;
      if (lastOrder && lastOrder.orderNumber) {
        const lastSequence = parseInt(lastOrder.orderNumber.split('-')[2]);
        if (!isNaN(lastSequence)) {
          sequence = lastSequence + 1;
        }
      }

      // Format: ORD-20231108-001
      this.orderNumber = `ORD-${dateStr}-${sequence.toString().padStart(3, '0')}`;
      console.log('✅ Generated order number:', this.orderNumber);
    }
    next();
  } catch (error) {
    console.error('❌ Error generating order number:', error);
    next(error);
  }
});

module.exports = mongoose.model('Order', orderSchema);