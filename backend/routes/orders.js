const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { logActivity, ActivityTypes, ResourceTypes } = require('../middleware/activityLogger');
const { authenticateToken } = require('../middleware/auth');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new order
router.post('/', authenticateToken, async (req, res) => {
  const order = new Order({
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    customerPhone: req.body.customerPhone,
    items: req.body.items || [],
    orderType: req.body.orderType,
    status: req.body.status || 'pending',
    totalAmount: req.body.totalAmount || 0,
    createdBy: req.user._id,
    updatedBy: req.user._id
  });

  try {
    const newOrder = await order.save();
    const populatedOrder = await Order.findById(newOrder._id)
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role');

    // Log activity
    await logActivity({
      activityType: ActivityTypes.ORDER_CREATE,
      performedBy: req.user._id,
      resourceType: ResourceTypes.ORDER,
      resourceId: newOrder._id,
      description: `Created new order for ${order.customerName}`,
      details: {
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        orderType: order.orderType,
        orderStatus: order.status,
        totalAmount: order.totalAmount,
        items: order.items
      },
      req
    });

    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE order
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Store previous values for activity log
    const previousStatus = order.status;
    const previousValues = {
      status: order.status,
      totalAmount: order.totalAmount,
      items: order.items
    };

    Object.keys(req.body).forEach(key => {
      if (key !== 'updatedBy') {
        order[key] = req.body[key];
      }
    });

    // Update the updatedBy field with authenticated user
    order.updatedBy = req.user._id;

    const updatedOrder = await order.save();
    const populatedOrder = await Order.findById(updatedOrder._id)
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role');

    // Determine activity type based on status change
    let activityType = ActivityTypes.ORDER_UPDATE;
    let description = `Updated order for ${order.customerName}`;

    if (previousStatus !== order.status) {
      if (order.status === 'cancelled') {
        activityType = ActivityTypes.ORDER_CANCEL;
        description = `Cancelled order for ${order.customerName}`;
      } else if (order.status === 'completed') {
        activityType = ActivityTypes.ORDER_COMPLETE;
        description = `Completed order for ${order.customerName}`;
      } else {
        description = `Updated order status from ${previousStatus} to ${order.status} for ${order.customerName}`;
      }
    }

    // Log activity
    await logActivity({
      activityType,
      performedBy: req.user._id,
      resourceType: ResourceTypes.ORDER,
      resourceId: updatedOrder._id,
      description,
      details: {
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        orderType: order.orderType,
        orderStatus: order.status,
        totalAmount: order.totalAmount,
        items: order.items,
        previousValues,
        newValues: {
          status: order.status,
          totalAmount: order.totalAmount,
          items: order.items
        }
      },
      severity: order.status === 'cancelled' ? 'warning' : 'info',
      req
    });

    res.json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;