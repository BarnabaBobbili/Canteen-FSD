import { User, Bell, Shield, Globe } from 'lucide-react';

/**
 * Settings Helpers
 * Utility functions and configuration for settings page
 */

/**
 * Get settings tabs configuration
 * @param {function} t - Translation function
 * @returns {Array} Array of tab objects
 */
export const getSettingsTabs = (t) => [
  { id: 'profile', label: t('settings.profileSettings'), icon: User },
  { id: 'notifications', label: t('settings.notificationSettings'), icon: Bell },
  { id: 'security', label: t('settings.securitySettings'), icon: Shield },
  { id: 'system', label: t('settings.systemSettings'), icon: Globe }
];

/**
 * Get default settings values
 * @param {Object} user - Current user object
 * @returns {Object} Default settings state
 */
export const getDefaultSettings = (user) => ({
  profile: {
    name: user?.name || '',
    phone: ''
  },
  notifications: {
    emailNotifications: true,
    orderNotifications: true,
    inventoryAlerts: true,
    feedbackNotifications: false,
    dailyReports: false
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90'
  },
  system: {
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    language: 'en'
  }
});

/**
 * Merge fetched settings with defaults
 * @param {Object} fetchedSettings - Settings from API
 * @param {Object} user - Current user
 * @returns {Object} Merged settings
 */
export const mergeSettings = (fetchedSettings, user) => {
  const defaults = getDefaultSettings(user);

  return {
    profile: { ...defaults.profile, ...fetchedSettings?.profile },
    notifications: { ...defaults.notifications, ...fetchedSettings?.notifications },
    security: { ...defaults.security, ...fetchedSettings?.security },
    system: { ...defaults.system, ...fetchedSettings?.system }
  };
};
