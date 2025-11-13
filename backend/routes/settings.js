const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// Get user settings
router.get('/', authenticateToken, async (req, res) => {
  try {
    let settings = await Settings.findOne({ userId: req.user.id });

    // If no settings exist, create default settings
    if (!settings) {
      const user = await User.findById(req.user.id);
      settings = new Settings({
        userId: req.user.id,
        profile: {
          name: user.name,
          phone: user.phone || ''
        }
      });
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user settings
router.put('/', authenticateToken, async (req, res) => {
  try {
    const { profile, notifications, security, system } = req.body;

    let settings = await Settings.findOne({ userId: req.user.id });

    if (!settings) {
      settings = new Settings({ userId: req.user.id });
    }

    // Update settings
    if (profile) settings.profile = { ...settings.profile, ...profile };
    if (notifications) settings.notifications = { ...settings.notifications, ...notifications };
    if (security) settings.security = { ...settings.security, ...security };
    if (system) settings.system = { ...settings.system, ...system };

    await settings.save();

    // If profile name is updated, also update User model
    if (profile && profile.name) {
      await User.findByIdAndUpdate(req.user.id, {
        name: profile.name,
        phone: profile.phone || undefined
      });
    }

    res.json({
      message: 'Settings updated successfully',
      settings
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update specific setting section
router.patch('/:section', authenticateToken, async (req, res) => {
  try {
    const { section } = req.params;
    const updates = req.body;

    if (!['profile', 'notifications', 'security', 'system'].includes(section)) {
      return res.status(400).json({ message: 'Invalid section' });
    }

    let settings = await Settings.findOne({ userId: req.user.id });

    if (!settings) {
      settings = new Settings({ userId: req.user.id });
    }

    settings[section] = { ...settings[section], ...updates };
    await settings.save();

    // Update User model if profile is changed
    if (section === 'profile' && updates.name) {
      await User.findByIdAndUpdate(req.user.id, {
        name: updates.name,
        phone: updates.phone || undefined
      });
    }

    res.json({
      message: `${section.charAt(0).toUpperCase() + section.slice(1)} settings updated successfully`,
      settings
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
