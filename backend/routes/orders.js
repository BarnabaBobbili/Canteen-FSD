const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { logActivity, ActivityTypes, ResourceTypes } = require('../middleware/activityLogger');
const { authenticateToken } = require('../middleware/auth');
const { sendOrderConfirmationEmail, sendOrderCompletionEmail } = require('../services/emailService');
const { generateOrderBill } = require('../services/pdfService');
const { sendOrderConfirmationSMS, sendOrderCompletionSMS, formatPhoneNumber } = require('../services/smsService');
const crypto = require('crypto');

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

// GET user's own orders (authenticated)
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    console.log('📜 Fetching orders for user:', req.user._id);

    // Find orders created by this user OR where customer email matches
    const orders = await Order.find({
      $or: [
        { createdBy: req.user._id },
        { customerEmail: req.user.email }
      ]
    })
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role')
      .sort({ createdAt: -1 });

    console.log(`✅ Found ${orders.length} orders for user`);
    res.json(orders);
  } catch (error) {
    console.error('❌ Error fetching user orders:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET single order by ID or order number
router.get('/:id', async (req, res) => {
  try {
    let order;

    // Check if it's an order number (starts with ORD-)
    if (req.params.id.startsWith('ORD-')) {
      order = await Order.findOne({ orderNumber: req.params.id })
        .populate('createdBy', 'name email role phone')
        .populate('updatedBy', 'name email role phone');
    } else {
      // Try to find by MongoDB ID
      order = await Order.findById(req.params.id)
        .populate('createdBy', 'name email role phone')
        .populate('updatedBy', 'name email role phone');
    }

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Return complete order details
    res.json({
      ...order.toObject(),
      orderDetails: {
        orderNumber: order.orderNumber,
        orderId: order._id,
        customer: {
          name: order.customerName,
          email: order.customerEmail,
          phone: order.customerPhone
        },
        items: order.items,
        pricing: {
          subtotal: order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          totalAmount: order.totalAmount
        },
        payment: {
          method: order.paymentMethod,
          status: order.paymentStatus,
          transactionId: order.transactionId || order.razorpayPaymentId || 'N/A'
        },
        orderInfo: {
          type: order.orderType,
          status: order.status,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt
        },
        createdBy: order.createdBy
      }
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: error.message });
  }
});

// CREATE new order (supports both authenticated and guest users)
router.post('/', async (req, res) => {
  try {
    console.log('📦 Received order request:', JSON.stringify(req.body, null, 2));

    // Check if user is authenticated
    let userId = null;
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'canteen-secret-key-2024-change-in-production-environment-a8f9d3e2b7c4a1f0');
        userId = decoded.userId; // JWT uses 'userId' not '_id'
        console.log('✅ Authenticated user:', userId);
      } catch (err) {
        // Invalid token, continue as guest
        console.log('⚠️ Invalid token, processing as guest order:', err.message);
      }
    } else {
      console.log('👤 No token provided, processing as guest order');
    }

    // Validate required fields
    if (!req.body.customerName) {
      return res.status(400).json({ message: 'Customer name is required' });
    }
    if (!req.body.customerPhone) {
      return res.status(400).json({ message: 'Customer phone is required' });
    }
    if (!req.body.items || req.body.items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    const orderData = {
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail || '',
      customerPhone: req.body.customerPhone,
      items: req.body.items || [],
      orderType: req.body.orderType || 'dine-in',
      status: req.body.status || 'pending',
      totalAmount: req.body.totalAmount || 0,
      paymentMethod: req.body.paymentMethod || 'cash',
      paymentStatus: req.body.paymentStatus || 'pending'
    };

    // Add user ID only if authenticated
    if (userId) {
      orderData.createdBy = userId;
      orderData.updatedBy = userId;
    }

    console.log('💾 Creating order with data:', JSON.stringify(orderData, null, 2));

    const order = new Order(orderData);
    const newOrder = await order.save();

    console.log('✅ Order created successfully:', newOrder._id);

    // Generate 6-digit OTP for order verification
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours from now

    // Save OTP to order
    newOrder.otp = otp;
    newOrder.otpExpires = otpExpiry;
    newOrder.otpVerified = false;
    await newOrder.save();

    console.log('🔐 Generated OTP for order:', otp);

    // Send confirmation email if customer has email
    if (newOrder.customerEmail) {
      try {
        await sendOrderConfirmationEmail(
          newOrder.customerEmail,
          newOrder.customerName,
          newOrder,
          otp
        );
        console.log(`✉️ Order confirmation email sent to ${newOrder.customerEmail}`);
      } catch (emailError) {
        console.error('⚠️ Failed to send confirmation email:', emailError.message);
        // Don't block order creation if email fails
      }
    }

    // Send confirmation SMS if customer has phone
    if (newOrder.customerPhone) {
      try {
        const formattedPhone = formatPhoneNumber(newOrder.customerPhone);
        await sendOrderConfirmationSMS(
          formattedPhone,
          newOrder.customerName,
          newOrder,
          otp
        );
        console.log(`📱 Order confirmation SMS sent to ${formattedPhone}`);
      } catch (smsError) {
        console.error('⚠️ Failed to send confirmation SMS:', smsError.message);
        // Don't block order creation if SMS fails
      }
    }

    const populatedOrder = await Order.findById(newOrder._id)
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role');

    // Log activity only if user is authenticated
    if (userId) {
      await logActivity({
        activityType: ActivityTypes.ORDER_CREATE,
        performedBy: userId,
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
    }

    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error('❌ Order creation error:', error);
    console.error('Error details:', error.message);
    if (error.errors) {
      console.error('Validation errors:', JSON.stringify(error.errors, null, 2));
    }
    res.status(400).json({ message: error.message, details: error.errors });
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

    // Send completion email with PDF and SMS when order is completed
    if (previousStatus !== 'completed' && order.status === 'completed') {
      // Generate PDF once for both email and potential future use
      let pdfBuffer = null;
      try {
        console.log('📄 Generating PDF bill for completed order...');
        pdfBuffer = await generateOrderBill(order);
        console.log('✅ PDF bill generated successfully');
      } catch (pdfError) {
        console.error('⚠️ Failed to generate PDF:', pdfError.message);
      }

      // Send completion email if customer has email
      if (order.customerEmail && pdfBuffer) {
        try {
          console.log('📧 Sending completion email with PDF...');
          await sendOrderCompletionEmail(
            order.customerEmail,
            order.customerName,
            order,
            pdfBuffer
          );
          console.log(`✉️ Order completion email with PDF sent to ${order.customerEmail}`);
        } catch (emailError) {
          console.error('⚠️ Failed to send completion email:', emailError.message);
          // Don't block order update if email fails
        }
      }

      // Send completion SMS if customer has phone
      if (order.customerPhone) {
        try {
          const formattedPhone = formatPhoneNumber(order.customerPhone);
          await sendOrderCompletionSMS(
            formattedPhone,
            order.customerName,
            order
          );
          console.log(`📱 Order completion SMS sent to ${formattedPhone}`);
        } catch (smsError) {
          console.error('⚠️ Failed to send completion SMS:', smsError.message);
          // Don't block order update if SMS fails
        }
      }
    }

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

// VERIFY OTP for order pickup
router.post('/:id/verify-otp', async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: 'OTP is required' });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if OTP exists
    if (!order.otp) {
      return res.status(400).json({ message: 'No OTP found for this order' });
    }

    // Check if OTP has expired
    if (order.otpExpires && new Date() > order.otpExpires) {
      return res.status(400).json({
        message: 'OTP has expired',
        expired: true
      });
    }

    // Check if OTP matches
    if (order.otp !== otp.toString()) {
      return res.status(400).json({
        message: 'Invalid OTP',
        invalid: true
      });
    }

    // Check if already verified
    if (order.otpVerified) {
      return res.status(400).json({
        message: 'OTP has already been verified',
        alreadyVerified: true
      });
    }

    // Mark OTP as verified
    order.otpVerified = true;
    await order.save();

    console.log(`✅ OTP verified successfully for order ${order.orderNumber}`);

    res.json({
      success: true,
      message: 'OTP verified successfully',
      order: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        totalAmount: order.totalAmount,
        status: order.status,
        otpVerified: order.otpVerified
      }
    });
  } catch (error) {
    console.error('❌ Error verifying OTP:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;