const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const Order = require('../models/Order');
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

// GET all items with active discounts (MUST be before /:id route)
router.get('/discounts/active', async (req, res) => {
  try {
    const discountedItems = await Menu.find({
      'discount.type': { $ne: 'none' },
      'discount.value': { $gt: 0 }
    })
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role')
      .sort({ 'discount.value': -1 });

    res.json(discountedItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET most ordered items (MUST be before /:id route)
router.get('/analytics/most-ordered', async (req, res) => {
  try {
    const { limit = 10, days = 30 } = req.query;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    // Aggregate orders to find most ordered items
    const mostOrdered = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          status: { $ne: 'cancelled' }
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.itemName',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: parseInt(limit) }
    ]);

    // Get full menu item details for the most ordered items
    const itemNames = mostOrdered.map(item => item._id);
    const menuItems = await Menu.find({ itemName: { $in: itemNames } });

    // Merge the data
    const results = mostOrdered.map(orderData => {
      const menuItem = menuItems.find(item => item.itemName === orderData._id);
      return {
        ...orderData,
        menuItemDetails: menuItem
      };
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single menu item (MUST be after specific routes)
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

// APPLY manual discount to an item
router.put('/:id/discount', authenticateToken, async (req, res) => {
  try {
    const { discountType, discountValue, reason } = req.body;

    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    menuItem.discount = {
      type: discountType || 'none',
      value: discountValue || 0,
      reason: reason || 'manual',
      appliedAt: new Date()
    };
    menuItem.updatedBy = req.user._id;

    const updatedMenuItem = await menuItem.save();
    const populatedMenuItem = await Menu.findById(updatedMenuItem._id)
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role');

    await logActivity({
      activityType: ActivityTypes.MENU_UPDATE,
      performedBy: req.user._id,
      resourceType: ResourceTypes.MENU,
      resourceId: updatedMenuItem._id,
      description: `Applied ${discountType} discount of ${discountValue} to ${menuItem.itemName}`,
      details: {
        itemName: menuItem.itemName,
        discount: menuItem.discount
      },
      req
    });

    res.json(populatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// AUTO-GENERATE discounts based on low stock
router.post('/discounts/auto-low-stock', authenticateToken, async (req, res) => {
  try {
    const { discountType = 'percentage', discountValue = 15 } = req.body;

    // Find items with stock below threshold
    const lowStockItems = await Menu.find({
      stockQuantity: { $gt: 0, $lte: '$lowStockThreshold' }
    });

    const updates = [];
    for (const item of lowStockItems) {
      if (item.stockQuantity <= item.lowStockThreshold) {
        item.discount = {
          type: discountType,
          value: discountValue,
          reason: 'low_stock',
          appliedAt: new Date()
        };
        item.updatedBy = req.user._id;
        await item.save();
        updates.push(item);

        await logActivity({
          activityType: ActivityTypes.MENU_UPDATE,
          performedBy: req.user._id,
          resourceType: ResourceTypes.MENU,
          resourceId: item._id,
          description: `Auto-applied low stock discount to ${item.itemName}`,
          details: {
            itemName: item.itemName,
            stockQuantity: item.stockQuantity,
            discount: item.discount
          },
          req
        });
      }
    }

    res.json({
      message: `Applied low stock discounts to ${updates.length} items`,
      items: updates
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// AUTO-GENERATE discounts based on expiry date
router.post('/discounts/auto-expiry', authenticateToken, async (req, res) => {
  try {
    const { daysThreshold = 7, discountType = 'percentage', discountValue = 30 } = req.body;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysThreshold);

    // Find items expiring soon
    const expiringItems = await Menu.find({
      expiryDate: {
        $exists: true,
        $ne: null,
        $lte: expiryDate,
        $gte: new Date()
      }
    });

    const updates = [];
    for (const item of expiringItems) {
      const daysUntilExpiry = Math.ceil((item.expiryDate - new Date()) / (1000 * 60 * 60 * 24));

      // Calculate discount based on days until expiry
      let calculatedDiscount = discountValue;
      if (daysUntilExpiry <= 3) {
        calculatedDiscount = Math.min(discountValue * 1.5, 50); // Max 50% off
      } else if (daysUntilExpiry <= 1) {
        calculatedDiscount = Math.min(discountValue * 2, 70); // Max 70% off
      }

      item.discount = {
        type: discountType,
        value: calculatedDiscount,
        reason: 'expiry',
        appliedAt: new Date()
      };
      item.updatedBy = req.user._id;
      await item.save();
      updates.push(item);

      await logActivity({
        activityType: ActivityTypes.MENU_UPDATE,
        performedBy: req.user._id,
        resourceType: ResourceTypes.MENU,
        resourceId: item._id,
        description: `Auto-applied expiry discount to ${item.itemName}`,
        details: {
          itemName: item.itemName,
          expiryDate: item.expiryDate,
          daysUntilExpiry,
          discount: item.discount
        },
        req
      });
    }

    res.json({
      message: `Applied expiry discounts to ${updates.length} items`,
      items: updates
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// REMOVE discount from an item
router.delete('/:id/discount', authenticateToken, async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    menuItem.discount = {
      type: 'none',
      value: 0,
      reason: 'none',
      appliedAt: null
    };
    menuItem.updatedBy = req.user._id;

    const updatedMenuItem = await menuItem.save();

    await logActivity({
      activityType: ActivityTypes.MENU_UPDATE,
      performedBy: req.user._id,
      resourceType: ResourceTypes.MENU,
      resourceId: updatedMenuItem._id,
      description: `Removed discount from ${menuItem.itemName}`,
      details: {
        itemName: menuItem.itemName
      },
      req
    });

    res.json(updatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;