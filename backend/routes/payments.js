const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'your_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_key_secret'
});

// ==================== RAZORPAY PAYMENT GATEWAY ====================

// Create Razorpay order for online payment
router.post('/create-razorpay-order', async (req, res) => {
  try {
    const { amount, orderId, currency = 'INR' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const options = {
      amount: Math.round(amount * 100), // Amount in paise
      currency: currency,
      receipt: `order_${orderId || Date.now()}`,
      notes: {
        orderId: orderId || 'new_order'
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Payment order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message
    });
  }
});

// Verify Razorpay payment
router.post('/verify-razorpay', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_key_secret')
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Update order with payment details
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          paymentStatus: 'completed',
          paymentMethod: 'online',
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          transactionId: razorpay_payment_id
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          paymentStatus: 'failed'
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message
    });
  }
});

// ==================== EXISTING PAYMENT ROUTES ====================

// Get all payments
router.get('/', authenticateToken, authorizeRoles('admin', 'manager', 'cashier'), async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('orderId')
      .populate('processedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payment statistics
router.get('/stats', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const stats = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$finalAmount' },
          totalDiscounts: { $sum: '$discountApplied' },
          totalTax: { $sum: '$tax' },
          totalRefunds: { $sum: '$refundAmount' },
          totalPayments: { $sum: 1 },
          completedPayments: {
            $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, 1, 0] }
          },
          failedPayments: {
            $sum: { $cond: [{ $eq: ['$paymentStatus', 'failed'] }, 1, 0] }
          }
        }
      }
    ]);

    // Payment method breakdown
    const methodBreakdown = await Payment.aggregate([
      { $match: { paymentStatus: 'completed' } },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          total: { $sum: '$finalAmount' }
        }
      }
    ]);

    res.json({
      overall: stats[0] || {},
      byMethod: methodBreakdown
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single payment
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('orderId')
      .populate('processedBy', 'name');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create payment
router.post('/', authenticateToken, authorizeRoles('admin', 'manager', 'cashier'), async (req, res) => {
  try {
    const paymentData = {
      ...req.body,
      processedBy: req.user._id
    };

    const payment = new Payment(paymentData);
    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update payment status
router.put('/:id', authenticateToken, authorizeRoles('admin', 'manager', 'cashier'), async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('processedBy', 'name');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Process refund
router.post('/:id/refund', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const { refundAmount, refundReason } = req.body;

    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.paymentStatus === 'refunded') {
      return res.status(400).json({ message: 'Payment already refunded' });
    }

    payment.paymentStatus = 'refunded';
    payment.refundAmount = refundAmount;
    payment.refundReason = refundReason;
    payment.refundedAt = new Date();

    await payment.save();

    res.json({ message: 'Refund processed successfully', payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete payment (admin only)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
