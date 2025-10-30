const express = require('express');
const router = express.Router();
const Discount = require('../models/Discount');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get all discounts
router.get('/', async (req, res) => {
  try {
    const discounts = await Discount.find().sort({ createdAt: -1 });
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get active discounts
router.get('/active', async (req, res) => {
  try {
    const now = new Date();
    const discounts = await Discount.find({
      status: 'active',
      validFrom: { $lte: now },
      validUntil: { $gte: now }
    });
    res.json(discounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Validate discount code
router.post('/validate', async (req, res) => {
  try {
    const { code, orderAmount, userRole } = req.body;
    const now = new Date();

    const discount = await Discount.findOne({
      discountCode: code.toUpperCase(),
      status: 'active',
      validFrom: { $lte: now },
      validUntil: { $gte: now }
    });

    if (!discount) {
      return res.status(404).json({ message: 'Invalid or expired discount code' });
    }

    // Check minimum order amount
    if (orderAmount < discount.minOrderAmount) {
      return res.status(400).json({
        message: `Minimum order amount of ₹${discount.minOrderAmount} required`
      });
    }

    // Check usage limit
    if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
      return res.status(400).json({ message: 'Discount code usage limit reached' });
    }

    // Check applicable roles
    if (!discount.applicableRoles.includes('all') && !discount.applicableRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Discount not applicable for your role' });
    }

    // Calculate discount amount
    let discountAmount = 0;
    if (discount.discountType === 'percentage') {
      discountAmount = (orderAmount * discount.discountValue) / 100;
      if (discount.maxDiscountAmount) {
        discountAmount = Math.min(discountAmount, discount.maxDiscountAmount);
      }
    } else {
      discountAmount = discount.discountValue;
    }

    res.json({
      valid: true,
      discountAmount: discountAmount.toFixed(2),
      finalAmount: (orderAmount - discountAmount).toFixed(2),
      discountDetails: {
        name: discount.discountName,
        code: discount.discountCode,
        type: discount.discountType,
        value: discount.discountValue
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single discount
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.json(discount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create discount (admin, manager only)
router.post('/', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const discount = new Discount(req.body);
    const newDiscount = await discount.save();
    res.status(201).json(newDiscount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update discount (admin, manager only)
router.put('/:id', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }

    res.json(discount);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete discount (admin only)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.json({ message: 'Discount deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
