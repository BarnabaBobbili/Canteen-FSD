const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  // Profile Settings
  profile: {
    name: { type: String },
    phone: { type: String }
  },
  // Notification Settings
  notifications: {
    emailNotifications: { type: Boolean, default: true },
    orderNotifications: { type: Boolean, default: true },
    inventoryAlerts: { type: Boolean, default: true },
    feedbackNotifications: { type: Boolean, default: false },
    dailyReports: { type: Boolean, default: false }
  },
  // Security Settings
  security: {
    twoFactorAuth: { type: Boolean, default: false },
    sessionTimeout: { type: String, default: '30' }, // in minutes
    passwordExpiry: { type: String, default: '90' } // in days
  },
  // System Settings
  system: {
    currency: { type: String, default: 'INR' },
    timezone: { type: String, default: 'Asia/Kolkata' },
    dateFormat: { type: String, default: 'DD/MM/YYYY' },
    language: { type: String, default: 'en' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);
