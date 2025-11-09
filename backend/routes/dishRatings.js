const express = require('express');
const router = express.Router();
const DishRating = require('../models/DishRating');
const Menu = require('../models/Menu');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get all ratings for a specific menu item
router.get('/menu/:menuItemId', async (req, res) => {
  try {
    const ratings = await DishRating.find({ menuItemId: req.params.menuItemId })
      .populate('orderId', 'orderNumber')
      .sort({ createdAt: -1 });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all dish ratings (admin/manager)
router.get('/', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const ratings = await DishRating.find()
      .populate('menuItemId', 'itemName category')
      .populate('orderId', 'orderNumber')
      .sort({ createdAt: -1 });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit dish rating (public or authenticated)
router.post('/', async (req, res) => {
  try {
    const { menuItemId, orderId, customerId, customerName, customerEmail, rating, comment } = req.body;

    // Check if menu item exists
    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Create rating
    const dishRating = new DishRating({
      menuItemId,
      orderId,
      customerId,
      customerName,
      customerEmail,
      rating,
      comment
    });

    const newRating = await dishRating.save();
    res.status(201).json(newRating);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already rated this dish for this order' });
    }
    res.status(400).json({ message: error.message });
  }
});

// Update dish rating
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const rating = await DishRating.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    // Only allow update by the same customer
    if (rating.customerEmail !== req.user.email && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this rating' });
    }

    const updatedRating = await DishRating.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete dish rating (admin only)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const rating = await DishRating.findByIdAndDelete(req.params.id);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
