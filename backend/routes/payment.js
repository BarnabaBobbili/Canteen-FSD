const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Create payment order (for online payments)
router.post('/create-order', paymentController.createPaymentOrder);

// Verify payment
router.post('/verify', paymentController.verifyPayment);

// Get payment details for an order
router.get('/:orderId', authenticateToken, paymentController.getPaymentDetails);

// Get all payments (admin/manager only)
router.get('/', authenticateToken, authorizeRoles('admin', 'manager'), paymentController.getAllPayments);

// Update payment status (admin/manager only)
router.put('/:orderId/status', authenticateToken, authorizeRoles('admin', 'manager'), paymentController.updatePaymentStatus);

module.exports = router;
