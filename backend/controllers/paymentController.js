const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'your_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_key_secret'
});

/**
 * Create Razorpay order for online payment
 */
exports.createPaymentOrder = async (req, res) => {
  try {
    const { amount, orderId, currency = 'INR' } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    // Check if we're in test mode (no valid Razorpay credentials)
    const isTestMode = !process.env.RAZORPAY_KEY_ID ||
                       process.env.RAZORPAY_KEY_ID === 'rzp_test_YOUR_KEY_ID_HERE' ||
                       process.env.RAZORPAY_KEY_ID === 'your_key_id';

    if (isTestMode) {
      // Return mock payment order for testing
      const mockOrderId = `test_order_${Date.now()}`;
      console.log('📝 TEST MODE: Creating mock payment order');
      res.status(200).json({
        success: true,
        orderId: mockOrderId,
        amount: Math.round(amount * 100),
        currency: currency,
        key: 'test_key',
        testMode: true
      });
    } else {
      // Real Razorpay integration
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
        key: process.env.RAZORPAY_KEY_ID,
        testMode: false
      });
    }
  } catch (error) {
    console.error('Payment order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message
    });
  }
};

/**
 * Verify Razorpay payment signature
 */
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
      testMode
    } = req.body;

    // Test mode - auto-approve
    if (testMode) {
      console.log('✅ TEST MODE: Auto-approving payment');
      if (orderId) {
        await Order.findByIdAndUpdate(orderId, {
          paymentStatus: 'completed',
          paymentMethod: 'online',
          razorpayOrderId: razorpay_order_id || 'test_order',
          razorpayPaymentId: razorpay_payment_id || 'test_payment',
          transactionId: razorpay_payment_id || `TEST_${Date.now()}`
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully (Test Mode)'
      });
    }

    // Real Razorpay verification
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_key_secret')
      .update(sign.toString())
      .digest('hex');

    // Verify signature
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
      // Payment verification failed
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
};

/**
 * Get payment details for an order
 */
exports.getPaymentDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).select('paymentMethod paymentStatus transactionId razorpayPaymentId totalAmount');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      payment: {
        method: order.paymentMethod,
        status: order.paymentStatus,
        transactionId: order.transactionId || order.razorpayPaymentId,
        amount: order.totalAmount
      }
    });
  } catch (error) {
    console.error('Get payment details error:', error);
    res.status(500).json({ message: 'Failed to get payment details' });
  }
};

/**
 * Get all payments (for admin)
 */
exports.getAllPayments = async (req, res) => {
  try {
    const { startDate, endDate, paymentMethod, paymentStatus } = req.query;

    // Build query
    let query = {};

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    if (paymentMethod) {
      query.paymentMethod = paymentMethod;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    const payments = await Order.find(query)
      .select('customerName customerPhone orderType totalAmount paymentMethod paymentStatus transactionId createdAt')
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email');

    // Calculate totals
    const totals = {
      totalAmount: payments.reduce((sum, p) => sum + p.totalAmount, 0),
      completedAmount: payments.filter(p => p.paymentStatus === 'completed').reduce((sum, p) => sum + p.totalAmount, 0),
      pendingAmount: payments.filter(p => p.paymentStatus === 'pending').reduce((sum, p) => sum + p.totalAmount, 0),
      cashAmount: payments.filter(p => p.paymentMethod === 'cash').reduce((sum, p) => sum + p.totalAmount, 0),
      onlineAmount: payments.filter(p => p.paymentMethod === 'online').reduce((sum, p) => sum + p.totalAmount, 0),
      totalCount: payments.length
    };

    res.status(200).json({
      success: true,
      payments,
      totals
    });
  } catch (error) {
    console.error('Get all payments error:', error);
    res.status(500).json({ message: 'Failed to get payments' });
  }
};

/**
 * Update payment status (for admin)
 */
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Payment status updated',
      order
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({ message: 'Failed to update payment status' });
  }
};
