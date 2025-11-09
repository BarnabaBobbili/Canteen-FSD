const nodemailer = require('nodemailer');

/**
 * Email Service for sending verification and password reset emails
 * Uses nodemailer with Gmail SMTP (or other email service)
 */

// Create transporter
const createTransporter = () => {
  // For development, you can use ethereal.email for testing
  // For production, use your actual email service credentials
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

/**
 * Send email verification link
 * @param {string} email - Recipient email
 * @param {string} name - User name
 * @param {string} verificationToken - Verification token
 */
const sendVerificationEmail = async (email, name, verificationToken) => {
  const transporter = createTransporter();

  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email/${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@canteen.com',
    to: email,
    subject: 'Verify Your Email - Canteen Delight',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .button:hover { background: #5568d3; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Canteen Delight!</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Thank you for signing up! Please verify your email address to complete your registration and start ordering delicious food.</p>
            <p>Click the button below to verify your email:</p>
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${verificationUrl}</p>
            <p><strong>This link will expire in 24 hours.</strong></p>
            <p>If you didn't create an account, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Canteen Delight. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email);
    return { success: true };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send password reset link
 * @param {string} email - Recipient email
 * @param {string} name - User name
 * @param {string} resetToken - Password reset token
 */
const sendPasswordResetEmail = async (email, name, resetToken) => {
  const transporter = createTransporter();

  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@canteen.com',
    to: email,
    subject: 'Reset Your Password - Canteen Delight',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #f5576c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .button:hover { background: #e04557; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #888; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>We received a request to reset your password for your Canteen Delight account.</p>
            <p>Click the button below to reset your password:</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #f5576c;">${resetUrl}</p>
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul>
                <li>This link will expire in 1 hour</li>
                <li>If you didn't request a password reset, please ignore this email</li>
                <li>Your password will remain unchanged until you create a new one</li>
              </ul>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Canteen Delight. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', email);
    return { success: true };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send order confirmation email with OTP
 * @param {string} email - Customer email
 * @param {string} name - Customer name
 * @param {Object} order - Order object
 * @param {string} otp - 6-digit OTP
 */
const sendOrderConfirmationEmail = async (email, name, order, otp) => {
  const transporter = createTransporter();

  const trackingUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/track-order/${order.orderNumber}`;

  const itemsList = order.items.map(item =>
    `<li style="padding: 8px 0; border-bottom: 1px solid #eee;">
      <strong>${item.itemName}</strong> x ${item.quantity} - ₹${item.price * item.quantity}
    </li>`
  ).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@canteen.com',
    to: email,
    subject: `Order Confirmation - ${order.orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .otp-box { background: #fff; border: 3px dashed #667eea; padding: 20px; margin: 20px 0; text-align: center; border-radius: 10px; }
          .otp { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .items { list-style: none; padding: 0; margin: 15px 0; }
          .total { background: #667eea; color: white; padding: 15px; text-align: right; font-size: 20px; font-weight: bold; border-radius: 5px; margin-top: 15px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Order Confirmed!</h1>
            <p>Order #${order.orderNumber}</p>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Thank you for your order! Your delicious food is being prepared.</p>

            <div class="otp-box">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">Your Order OTP</p>
              <div class="otp">${otp}</div>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">Please provide this OTP when collecting your order</p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: #ff6b6b;">⏱️ Valid for 2 hours</p>
            </div>

            <div class="order-details">
              <h3>Order Details</h3>
              <ul class="items">
                ${itemsList}
              </ul>
              <div class="total">
                Total: ₹${order.totalAmount}
              </div>
            </div>

            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
              <strong>📋 Order Information:</strong>
              <ul style="margin: 10px 0 0 20px;">
                <li><strong>Order Number:</strong> ${order.orderNumber}</li>
                <li><strong>Order Type:</strong> ${order.orderType}</li>
                <li><strong>Payment Method:</strong> ${order.paymentMethod}</li>
                <li><strong>Status:</strong> ${order.status}</li>
              </ul>
            </div>

            <p style="text-align: center; margin: 30px 0;">
              <a href="${trackingUrl}" style="display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">📱 Track Your Order</a>
            </p>

            <p><strong>Next Steps:</strong></p>
            <ol>
              <li>We'll send you another email when your order is ready</li>
              <li>Come to the counter and provide your OTP: <strong>${otp}</strong></li>
              <li>Collect your order and enjoy!</li>
            </ol>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Canteen Delight. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to:', email);
    return { success: true };
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send order completion email with PDF bill
 * @param {string} email - Customer email
 * @param {string} name - Customer name
 * @param {Object} order - Order object
 * @param {Buffer} pdfBuffer - PDF bill buffer (optional, will be attached if provided)
 */
const sendOrderCompletionEmail = async (email, name, order, pdfBuffer = null) => {
  const transporter = createTransporter();

  const trackingUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/track-order/${order.orderNumber}`;

  const itemsList = order.items.map(item =>
    `<li style="padding: 8px 0; border-bottom: 1px solid #eee;">
      <strong>${item.itemName}</strong> x ${item.quantity} - ₹${item.price * item.quantity}
    </li>`
  ).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@canteen.com',
    to: email,
    subject: `Order Completed - ${order.orderNumber} - Thank You!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .items { list-style: none; padding: 0; margin: 15px 0; }
          .total { background: #10b981; color: white; padding: 15px; text-align: right; font-size: 20px; font-weight: bold; border-radius: 5px; margin-top: 15px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #888; }
          .thank-you { background: #d1fae5; border: 2px solid #10b981; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Order Completed!</h1>
            <p>Order #${order.orderNumber}</p>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>

            <div class="thank-you">
              <h2 style="margin: 0 0 10px 0; color: #059669;">Thank You for Your Order!</h2>
              <p style="margin: 0; font-size: 16px;">We hope you enjoyed your meal. We'd love to serve you again soon!</p>
            </div>

            <div class="order-details">
              <h3>Order Summary</h3>
              <p><strong>Order Number:</strong> ${order.orderNumber}</p>
              <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>

              <h4 style="margin-top: 20px;">Items Ordered:</h4>
              <ul class="items">
                ${itemsList}
              </ul>
              <div class="total">
                Total Paid: ₹${order.totalAmount}
              </div>
            </div>

            ${pdfBuffer ? '<p style="background: #e0e7ff; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;"><strong>📄 Bill Attached:</strong> Your detailed bill is attached as a PDF for your records.</p>' : ''}

            <p style="text-align: center; margin: 25px 0;">
              <a href="${trackingUrl}" style="display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 5px;">📱 View Order Details</a>
            </p>

            <p style="margin-top: 30px; text-align: center;">
              <strong>Rate your experience!</strong><br/>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/feedback" style="display: inline-block; margin-top: 10px; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">Leave Feedback</a>
            </p>
          </div>
          <div class="footer">
            <p>Thank you for choosing Canteen Delight!</p>
            <p>&copy; ${new Date().getFullYear()} Canteen Delight. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    attachments: pdfBuffer ? [{
      filename: `Bill-${order.orderNumber}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf'
    }] : []
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order completion email sent to:', email);
    return { success: true };
  } catch (error) {
    console.error('Error sending order completion email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendOrderConfirmationEmail,
  sendOrderCompletionEmail
};
