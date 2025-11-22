const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

/**
 * Escape HTML special characters to prevent XSS in email templates
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
const escapeHtml = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Email Service for sending verification and password reset emails
 * Supports Gmail (development) and SendGrid Web API (production)
 *
 * IMPORTANT: Railway/Render block SMTP ports, so use SendGrid Web API for production
 */

// Initialize SendGrid if API key is provided
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

/**
 * Create transporter based on environment (for Gmail only)
 * SendGrid uses Web API, not SMTP
 */
const createTransporter = () => {
  const emailService = process.env.EMAIL_SERVICE || 'gmail';

  if (emailService === 'gmail') {
    // Gmail configuration (development only)
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  } else {
    // Generic SMTP configuration
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
};

/**
 * Send email using appropriate service
 * @param {Object} mailOptions - Email options
 * @returns {Promise<Object>} Result object with success status
 */
const sendEmail = async (mailOptions) => {
  const emailService = process.env.EMAIL_SERVICE || 'gmail';

  try {
    if (emailService === 'sendgrid') {
      // Use SendGrid Web API (HTTPS - works on Railway/Render)
      if (!process.env.SENDGRID_API_KEY) {
        throw new Error('SENDGRID_API_KEY not configured');
      }

      // Convert attachments to SendGrid format (base64 content required)
      const sendgridAttachments = (mailOptions.attachments || []).map(att => {
        // If content is a Buffer, convert to base64
        const content = Buffer.isBuffer(att.content)
          ? att.content.toString('base64')
          : att.content;

        return {
          content: content,
          filename: att.filename,
          type: att.contentType || att.type || 'application/octet-stream',
          disposition: att.disposition || 'attachment'
        };
      });

      const msg = {
        to: mailOptions.to,
        from: process.env.EMAIL_USER || 'noreply@canteen.com',
        subject: mailOptions.subject,
        html: mailOptions.html,
        attachments: sendgridAttachments
      };

      await sgMail.send(msg);
      console.log('✅ Email sent via SendGrid Web API to:', mailOptions.to);
      return { success: true };
    } else {
      // Use nodemailer SMTP (Gmail for development)
      const transporter = createTransporter();
      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent via SMTP to:', mailOptions.to);
      return { success: true };
    }
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send email verification link
 * @param {string} email - Recipient email
 * @param {string} name - User name
 * @param {string} verificationToken - Verification token
 */
const sendVerificationEmail = async (email, name, verificationToken) => {
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
            <h2>Hello ${escapeHtml(name)},</h2>
            <p>Thank you for signing up! Please verify your email address to complete your registration and start ordering delicious food.</p>
            <p>Click the button below to verify your email:</p>
            <div style="text-align: center;">
              <a href="${escapeHtml(verificationUrl)}" class="button">Verify Email Address</a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #667eea;">${escapeHtml(verificationUrl)}</p>
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

  return sendEmail(mailOptions);
};

/**
 * Send password reset link
 * @param {string} email - Recipient email
 * @param {string} name - User name
 * @param {string} resetToken - Password reset token
 */
const sendPasswordResetEmail = async (email, name, resetToken) => {
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
            <h2>Hello ${escapeHtml(name)},</h2>
            <p>We received a request to reset your password for your Canteen Delight account.</p>
            <p>Click the button below to reset your password:</p>
            <div style="text-align: center;">
              <a href="${escapeHtml(resetUrl)}" class="button">Reset Password</a>
            </div>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #f5576c;">${escapeHtml(resetUrl)}</p>
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

  return sendEmail(mailOptions);
};

/**
 * Send order confirmation email with OTP
 * @param {string} email - Customer email
 * @param {string} name - Customer name
 * @param {Object} order - Order object
 * @param {string} otp - 6-digit OTP
 */
const sendOrderConfirmationEmail = async (email, name, order, otp) => {
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

  return sendEmail(mailOptions);
};

/**
 * Send order completion email with PDF bill
 * @param {string} email - Customer email
 * @param {string} name - Customer name
 * @param {Object} order - Order object
 * @param {Buffer} pdfBuffer - PDF bill buffer (optional, will be attached if provided)
 */
const sendOrderCompletionEmail = async (email, name, order, pdfBuffer = null) => {
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

  return sendEmail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendOrderConfirmationEmail,
  sendOrderCompletionEmail
};
