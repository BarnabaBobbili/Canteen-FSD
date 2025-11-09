/**
 * SMS Service for sending order notifications via SMS
 * Uses Fast2SMS API (Indian SMS Gateway)
 */

/**
 * Check if Fast2SMS is configured
 * @returns {boolean} True if API key is configured
 */
const isSMSConfigured = () => {
  const apiKey = process.env.FAST2SMS_API_KEY;

  if (!apiKey) {
    console.warn('⚠️ Fast2SMS API key not configured. SMS notifications will be disabled.');
    return false;
  }

  return true;
};

/**
 * Send SMS using Fast2SMS API
 * @param {string} phoneNumber - Phone number (10 digits or with country code)
 * @param {string} message - SMS message content
 * @returns {Promise<Object>} Result object with success status
 */
const sendSMS = async (phoneNumber, message) => {
  if (!isSMSConfigured()) {
    return { success: false, error: 'SMS service not configured' };
  }

  // Clean phone number (remove +91 and spaces)
  let cleanedNumber = phoneNumber.replace(/[\s\-+]/g, '');
  if (cleanedNumber.startsWith('91') && cleanedNumber.length > 10) {
    cleanedNumber = cleanedNumber.substring(2);
  }

  const apiKey = process.env.FAST2SMS_API_KEY;
  const senderID = process.env.FAST2SMS_SENDER_ID || 'TXTIND'; // Default sender ID

  try {
    const url = 'https://www.fast2sms.com/dev/bulkV2';

    const params = new URLSearchParams({
      authorization: apiKey,
      sender_id: senderID,
      message: message,
      route: 'v3',
      numbers: cleanedNumber
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache'
      }
    });

    const data = await response.json();

    if (data.return === true) {
      console.log(`📱 SMS sent successfully to ${cleanedNumber}. Request ID: ${data.request_id}`);
      return { success: true, requestId: data.request_id, message: data.message };
    } else {
      console.error('❌ Fast2SMS API error:', data.message);
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.error('❌ Error sending SMS:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send order confirmation SMS with OTP and status link
 * @param {string} phoneNumber - Customer phone number (10 digits or with +91)
 * @param {string} customerName - Customer name
 * @param {Object} order - Order object
 * @param {string} otp - 6-digit OTP
 */
const sendOrderConfirmationSMS = async (phoneNumber, customerName, order, otp) => {
  if (!isSMSConfigured()) {
    console.log('⚠️ SMS service not configured, skipping SMS');
    return { success: false, error: 'SMS service not configured' };
  }

  const statusUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/track-order/${order.orderNumber}`;

  const message = `Hi ${customerName}! Order ${order.orderNumber} confirmed. OTP: ${otp} (Valid 2hrs). Total: Rs.${order.totalAmount}. Track: ${statusUrl} Show OTP at pickup. -Canteen Delight`;

  return await sendSMS(phoneNumber, message);
};

/**
 * Send order completion SMS with status link
 * @param {string} phoneNumber - Customer phone number (10 digits or with +91)
 * @param {string} customerName - Customer name
 * @param {Object} order - Order object
 */
const sendOrderCompletionSMS = async (phoneNumber, customerName, order) => {
  if (!isSMSConfigured()) {
    console.log('⚠️ SMS service not configured, skipping SMS');
    return { success: false, error: 'SMS service not configured' };
  }

  const statusUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/track-order/${order.orderNumber}`;

  const message = `Hi ${customerName}! Order ${order.orderNumber} completed. Total Paid: Rs.${order.totalAmount}. View bill: ${statusUrl} Thank you! -Canteen Delight`;

  return await sendSMS(phoneNumber, message);
};

/**
 * Format phone number for Fast2SMS (removes country code, keeps 10 digits)
 * @param {string} phone - Phone number
 * @returns {string} Formatted 10-digit phone number
 */
const formatPhoneNumber = (phone) => {
  if (!phone) return null;

  // Remove spaces, dashes, and +
  let cleaned = phone.replace(/[\s\-+]/g, '');

  // If it starts with 91, remove it (Indian country code)
  if (cleaned.startsWith('91') && cleaned.length > 10) {
    cleaned = cleaned.substring(2);
  }

  // Return 10-digit number
  return cleaned;
};

module.exports = {
  sendOrderConfirmationSMS,
  sendOrderCompletionSMS,
  formatPhoneNumber
};
