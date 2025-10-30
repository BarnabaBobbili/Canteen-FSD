const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/ActivityLog');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Get all activities with filtering and pagination
router.get('/', authenticateToken, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      activityType,
      resourceType,
      performedBy,
      startDate,
      endDate,
      severity,
      customerEmail,
      search
    } = req.query;

    // Build query
    const query = {};

    if (activityType) {
      query.activityType = activityType;
    }

    if (resourceType) {
      query.resourceType = resourceType;
    }

    if (performedBy) {
      query.performedBy = performedBy;
    }

    if (severity) {
      query.severity = severity;
    }

    if (customerEmail) {
      query['details.customerEmail'] = customerEmail;
    }

    // Date range filter
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) {
        query.timestamp.$gte = new Date(startDate);
      }
      if (endDate) {
        query.timestamp.$lte = new Date(endDate);
      }
    }

    // Search in description and other fields
    if (search) {
      query.$or = [
        { description: { $regex: search, $options: 'i' } },
        { 'details.itemName': { $regex: search, $options: 'i' } },
        { 'details.customerName': { $regex: search, $options: 'i' } },
        { 'details.customerEmail': { $regex: search, $options: 'i' } },
        { 'details.userName': { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with population
    const activities = await ActivityLog.find(query)
      .populate('performedBy', 'name email role department')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await ActivityLog.countDocuments(query);

    res.json({
      activities,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Error fetching activities', error: error.message });
  }
});

// Get single activity by ID with full details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const activity = await ActivityLog.findById(req.params.id)
      .populate('performedBy', 'name email role department phone employeeId');

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    res.json(activity);
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ message: 'Error fetching activity', error: error.message });
  }
});

// Get activities by resource
router.get('/resource/:resourceType/:resourceId', authenticateToken, async (req, res) => {
  try {
    const { resourceType, resourceId } = req.params;

    const activities = await ActivityLog.find({
      resourceType,
      resourceId
    })
      .populate('performedBy', 'name email role department')
      .sort({ timestamp: -1 });

    res.json(activities);
  } catch (error) {
    console.error('Error fetching resource activities:', error);
    res.status(500).json({ message: 'Error fetching resource activities', error: error.message });
  }
});

// Get activities by user
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const activities = await ActivityLog.find({
      performedBy: userId
    })
      .populate('performedBy', 'name email role department')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ActivityLog.countDocuments({ performedBy: userId });

    res.json({
      activities,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching user activities:', error);
    res.status(500).json({ message: 'Error fetching user activities', error: error.message });
  }
});

// Get activity statistics (admin only)
router.get('/stats/summary', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const dateQuery = {};
    if (startDate || endDate) {
      dateQuery.timestamp = {};
      if (startDate) {
        dateQuery.timestamp.$gte = new Date(startDate);
      }
      if (endDate) {
        dateQuery.timestamp.$lte = new Date(endDate);
      }
    }

    // Activity type statistics
    const activityTypeStats = await ActivityLog.aggregate([
      { $match: dateQuery },
      {
        $group: {
          _id: '$activityType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // User activity statistics
    const userStats = await ActivityLog.aggregate([
      { $match: dateQuery },
      {
        $group: {
          _id: '$performedBy',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          name: '$user.name',
          email: '$user.email',
          role: '$user.role',
          count: 1
        }
      }
    ]);

    // Resource type statistics
    const resourceTypeStats = await ActivityLog.aggregate([
      { $match: dateQuery },
      {
        $group: {
          _id: '$resourceType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Recent critical activities
    const criticalActivities = await ActivityLog.find({
      ...dateQuery,
      severity: 'critical'
    })
      .populate('performedBy', 'name email role')
      .sort({ timestamp: -1 })
      .limit(10);

    res.json({
      activityTypeStats,
      userStats,
      resourceTypeStats,
      criticalActivities
    });
  } catch (error) {
    console.error('Error fetching activity statistics:', error);
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

// Delete old activities (admin only) - for maintenance
router.delete('/cleanup/:days', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const { days } = req.params;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));

    const result = await ActivityLog.deleteMany({
      timestamp: { $lt: cutoffDate },
      severity: { $ne: 'critical' } // Keep critical logs
    });

    res.json({
      message: `Deleted ${result.deletedCount} activities older than ${days} days`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error cleaning up activities:', error);
    res.status(500).json({ message: 'Error cleaning up activities', error: error.message });
  }
});

module.exports = router;
