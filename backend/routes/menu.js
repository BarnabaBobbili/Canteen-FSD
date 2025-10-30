const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const { logActivity, ActivityTypes, ResourceTypes } = require('../middleware/activityLogger');
const { authenticateToken } = require('../middleware/auth');

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find()
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role')
      .sort({ category: 1, itemName: 1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single menu item
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new menu item
router.post('/', authenticateToken, async (req, res) => {
  const menuItem = new Menu({
    itemName: req.body.itemName,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    allergens: req.body.allergens,
    available: req.body.available !== false,
    createdBy: req.user._id,
    updatedBy: req.user._id
  });

  try {
    const newMenuItem = await menuItem.save();
    const populatedMenuItem = await Menu.findById(newMenuItem._id)
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role');

    // Log activity
    await logActivity({
      activityType: ActivityTypes.MENU_CREATE,
      performedBy: req.user._id,
      resourceType: ResourceTypes.MENU,
      resourceId: newMenuItem._id,
      description: `Created menu item: ${menuItem.itemName}`,
      details: {
        itemName: menuItem.itemName,
        category: menuItem.category,
        price: menuItem.price
      },
      req
    });

    res.status(201).json(populatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE menu item
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Store previous values for activity log
    const previousValues = {
      itemName: menuItem.itemName,
      category: menuItem.category,
      price: menuItem.price,
      available: menuItem.available
    };

    Object.keys(req.body).forEach(key => {
      if (key !== 'updatedBy') {
        menuItem[key] = req.body[key];
      }
    });

    // Update the updatedBy field with authenticated user
    menuItem.updatedBy = req.user._id;

    const updatedMenuItem = await menuItem.save();
    const populatedMenuItem = await Menu.findById(updatedMenuItem._id)
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role');

    // Log activity
    await logActivity({
      activityType: ActivityTypes.MENU_UPDATE,
      performedBy: req.user._id,
      resourceType: ResourceTypes.MENU,
      resourceId: updatedMenuItem._id,
      description: `Updated menu item: ${menuItem.itemName}`,
      details: {
        itemName: menuItem.itemName,
        category: menuItem.category,
        price: menuItem.price,
        previousValues,
        newValues: {
          itemName: menuItem.itemName,
          category: menuItem.category,
          price: menuItem.price,
          available: menuItem.available
        }
      },
      req
    });

    res.json(populatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE menu item
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Store item details before deletion
    const itemDetails = {
      itemName: menuItem.itemName,
      category: menuItem.category,
      price: menuItem.price
    };

    await Menu.findByIdAndDelete(req.params.id);

    // Log activity
    await logActivity({
      activityType: ActivityTypes.MENU_DELETE,
      performedBy: req.user._id,
      resourceType: ResourceTypes.MENU,
      resourceId: req.params.id,
      description: `Deleted menu item: ${itemDetails.itemName}`,
      details: itemDetails,
      severity: 'warning',
      req
    });

    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;