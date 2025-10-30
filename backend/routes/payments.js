const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

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
