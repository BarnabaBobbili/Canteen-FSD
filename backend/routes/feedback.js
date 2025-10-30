const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get all feedback
router.get('/', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate('orderId')
      .populate('respondedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get feedback by sentiment
router.get('/sentiment/:sentiment', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const feedback = await Feedback.find({ sentiment: req.params.sentiment })
      .populate('orderId')
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get feedback statistics
router.get('/stats', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          avgFoodQuality: { $avg: '$foodQuality' },
          avgServiceQuality: { $avg: '$serviceQuality' },
          avgCleanliness: { $avg: '$cleanliness' },
          avgValueForMoney: { $avg: '$valueForMoney' },
          totalFeedbacks: { $sum: 1 },
          positive: { $sum: { $cond: [{ $eq: ['$sentiment', 'positive'] }, 1, 0] } },
          neutral: { $sum: { $cond: [{ $eq: ['$sentiment', 'neutral'] }, 1, 0] } },
          negative: { $sum: { $cond: [{ $eq: ['$sentiment', 'negative'] }, 1, 0] } }
        }
      }
    ]);

    res.json(stats[0] || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single feedback
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('orderId')
      .populate('respondedBy', 'name');
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create feedback (public or authenticated)
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update feedback / Add response (admin, manager only)
router.put('/:id', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    // If adding a response, set respondedBy and respondedAt
    if (req.body.response) {
      req.body.respondedBy = req.user._id;
      req.body.respondedAt = new Date();
      req.body.status = 'reviewed';
    }

    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('respondedBy', 'name');

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete feedback (admin only)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
