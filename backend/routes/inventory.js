const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const { logActivity, ActivityTypes, ResourceTypes } = require('../middleware/activityLogger');
const { authenticateToken } = require('../middleware/auth');

// GET all inventory items
router.get('/', async (req, res) => {
  try {
    const inventoryItems = await Inventory.find()
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role')
      .sort({ itemName: 1 });
    res.json(inventoryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single inventory item
router.get('/:id', async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json(inventoryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new inventory item
router.post('/', authenticateToken, async (req, res) => {
  const inventoryItem = new Inventory({
    itemName: req.body.itemName,
    quantity: req.body.quantity,
    unit: req.body.unit,
    supplier: req.body.supplier,
    expiryDate: req.body.expiryDate,
    batchNumber: req.body.batchNumber,
    createdBy: req.user._id,
    updatedBy: req.user._id
  });

  try {
    const newInventoryItem = await inventoryItem.save();
    const populatedInventoryItem = await Inventory.findById(newInventoryItem._id)
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role');

    // Log activity
    await logActivity({
      activityType: ActivityTypes.INVENTORY_CREATE,
      performedBy: req.user._id,
      resourceType: ResourceTypes.INVENTORY,
      resourceId: newInventoryItem._id,
      description: `Added new inventory item: ${inventoryItem.itemName}`,
      details: {
        inventoryItem: inventoryItem.itemName,
        quantity: inventoryItem.quantity,
        unit: inventoryItem.unit,
        supplier: inventoryItem.supplier
      },
      req
    });

    res.status(201).json(populatedInventoryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE inventory item
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    // Store previous values for activity log
    const previousQuantity = inventoryItem.quantity;
    const previousValues = {
      quantity: inventoryItem.quantity,
      unit: inventoryItem.unit,
      supplier: inventoryItem.supplier
    };

    Object.keys(req.body).forEach(key => {
      if (key !== 'updatedBy') {
        inventoryItem[key] = req.body[key];
      }
    });

    // Update the updatedBy field with authenticated user
    inventoryItem.updatedBy = req.user._id;

    const updatedInventoryItem = await inventoryItem.save();
    const populatedInventoryItem = await Inventory.findById(updatedInventoryItem._id)
      .populate('createdBy', 'name email role')
      .populate('updatedBy', 'name email role');

    // Determine severity based on stock level
    let severity = 'info';
    if (inventoryItem.quantity < 10) {
      severity = 'warning';
    }

    // Log activity
    await logActivity({
      activityType: ActivityTypes.INVENTORY_UPDATE,
      performedBy: req.user._id,
      resourceType: ResourceTypes.INVENTORY,
      resourceId: updatedInventoryItem._id,
      description: `Updated inventory: ${inventoryItem.itemName} (${previousQuantity} → ${inventoryItem.quantity} ${inventoryItem.unit})`,
      details: {
        inventoryItem: inventoryItem.itemName,
        quantity: inventoryItem.quantity,
        unit: inventoryItem.unit,
        supplier: inventoryItem.supplier,
        previousQuantity,
        newQuantity: inventoryItem.quantity,
        previousValues,
        newValues: {
          quantity: inventoryItem.quantity,
          unit: inventoryItem.unit,
          supplier: inventoryItem.supplier
        }
      },
      severity,
      req
    });

    // Log low stock warning if quantity is low
    if (inventoryItem.quantity < 10 && previousQuantity >= 10) {
      await logActivity({
        activityType: ActivityTypes.INVENTORY_LOW_STOCK,
        performedBy: req.user._id,
        resourceType: ResourceTypes.INVENTORY,
        resourceId: updatedInventoryItem._id,
        description: `Low stock alert: ${inventoryItem.itemName} (${inventoryItem.quantity} ${inventoryItem.unit} remaining)`,
        details: {
          inventoryItem: inventoryItem.itemName,
          quantity: inventoryItem.quantity,
          unit: inventoryItem.unit
        },
        severity: 'critical',
        tags: ['low-stock', 'alert'],
        req
      });
    }

    res.json(populatedInventoryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE inventory item
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    // Store item details before deletion
    const itemDetails = {
      inventoryItem: inventoryItem.itemName,
      quantity: inventoryItem.quantity,
      unit: inventoryItem.unit,
      supplier: inventoryItem.supplier
    };

    await Inventory.findByIdAndDelete(req.params.id);

    // Log activity
    await logActivity({
      activityType: ActivityTypes.INVENTORY_DELETE,
      performedBy: req.user._id,
      resourceType: ResourceTypes.INVENTORY,
      resourceId: req.params.id,
      description: `Deleted inventory item: ${inventoryItem.itemName}`,
      details: itemDetails,
      severity: 'warning',
      req
    });

    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
