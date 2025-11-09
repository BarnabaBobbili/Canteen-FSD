import API_BASE_URL from '../config/api';

/**
 * Payment Service
 * Handles Razorpay payment integration
 */

/**
 * Create a Razorpay order
 * @param {number} amount - Amount in rupees
 * @param {string} orderId - Order ID from backend
 * @returns {Promise<Object>} Razorpay order details
 */
export const createRazorpayOrder = async (amount, orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        orderId,
        currency: 'INR'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create payment order');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

/**
 * Verify Razorpay payment
 * @param {Object} paymentData - Payment verification data
 * @returns {Promise<Object>} Verification result
 */
export const verifyRazorpayPayment = async (paymentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

/**
 * Initialize Razorpay checkout
 * @param {Object} options - Razorpay options
 * @param {Function} onSuccess - Success callback
 * @param {Function} onFailure - Failure callback
 * @param {Function} openTestModal - Function to open test payment modal (for test mode)
 */
export const initializeRazorpay = (options, onSuccess, onFailure, openTestModal) => {
  // Check if test mode
  if (options.testMode) {
    console.log('🧪 TEST MODE: Opening test payment modal');
    if (openTestModal) {
      openTestModal(options, onSuccess, onFailure);
    } else {
      console.error('Test modal function not provided');
      onFailure(new Error('Test mode not configured'));
    }
    return;
  }

  // Real Razorpay flow
  if (!window.Razorpay) {
    console.error('Razorpay SDK not loaded');
    onFailure(new Error('Payment gateway not available'));
    return;
  }

  const razorpayOptions = {
    key: options.key,
    amount: options.amount,
    currency: options.currency || 'INR',
    name: 'Smart Canteen',
    description: options.description || 'Order Payment',
    order_id: options.orderId,
    handler: function (response) {
      onSuccess(response);
    },
    prefill: {
      name: options.customerName || '',
      email: options.customerEmail || '',
      contact: options.customerPhone || ''
    },
    theme: {
      color: '#1F2937'
    },
    modal: {
      ondismiss: function () {
        onFailure(new Error('Payment cancelled by user'));
      }
    }
  };

  const razorpay = new window.Razorpay(razorpayOptions);
  razorpay.open();
};

/**
 * Process online payment with Razorpay
 * @param {Object} orderData - Order data
 * @param {Function} onSuccess - Success callback with order details
 * @param {Function} onFailure - Failure callback
 * @param {Function} openTestModal - Function to open test payment modal (optional)
 */
export const processOnlinePayment = async (orderData, onSuccess, onFailure, openTestModal) => {
  try {
    // Step 1: Create order in backend
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const orderResponse = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...orderData,
        paymentStatus: 'pending'
      })
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json();
      console.error('Order creation failed:', errorData);
      throw new Error(errorData.message || 'Failed to create order');
    }

    const order = await orderResponse.json();

    // Step 2: Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(orderData.totalAmount, order._id);

    // Step 3: Initialize Razorpay checkout (or test modal)
    initializeRazorpay(
      {
        key: razorpayOrder.key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        orderId: razorpayOrder.orderId,
        description: `Order #${order.orderNumber}`,
        customerName: orderData.customerName,
        customerEmail: orderData.customerEmail,
        customerPhone: orderData.customerPhone,
        testMode: razorpayOrder.testMode
      },
      async (paymentResponse) => {
        // Step 4: Verify payment
        try {
          const verificationResult = await verifyRazorpayPayment({
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_signature: paymentResponse.razorpay_signature,
            orderId: order._id,
            testMode: razorpayOrder.testMode
          });

          if (verificationResult.success) {
            onSuccess(order);
          } else {
            onFailure(new Error('Payment verification failed'));
          }
        } catch (error) {
          onFailure(error);
        }
      },
      (error) => {
        onFailure(error);
      },
      openTestModal
    );
  } catch (error) {
    console.error('Error processing payment:', error);
    onFailure(error);
  }
};
