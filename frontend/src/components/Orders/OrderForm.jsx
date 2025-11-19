import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CustomerInfoFields from './CustomerInfoFields';
import MenuItemSearch from './MenuItemSearch';
import SelectedItemsList from './SelectedItemsList';
import OrderSummary from './OrderSummary';
import { fetchMenuItems } from './orderService';
import { calculateDiscountedPrice } from './orderHelpers';

/**
 * OrderForm Component
 * Main form for creating/editing orders
 * Refactored from 370 lines → ~150 lines
 */
const OrderForm = ({ currentForm, setCurrentForm, errors, modalMode }) => {
  const { t } = useTranslation();
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState(currentForm.items || []);
  const [showItemSearch, setShowItemSearch] = useState(false);

  // Fetch menu items on mount
  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const items = await fetchMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    loadMenuItems();
  }, []);

  // Initialize selected items from currentForm when editing
  useEffect(() => {
    if (modalMode === 'edit' && currentForm.items) {
      setSelectedItems(currentForm.items);
    }
  }, [modalMode, currentForm.items]);

  // Calculate total whenever selected items change or orderType changes
  useEffect(() => {
    const subtotal = selectedItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Add ₹5 per item for takeaway orders
    const totalQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    const takeawayCharge = currentForm.orderType === 'takeaway' ? totalQuantity * 5 : 0;
    const total = subtotal + takeawayCharge;

    setCurrentForm({ ...currentForm, totalAmount: total, items: selectedItems });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems, currentForm.orderType]);

  /**
   * Add menu item to selected items
   */
  const addItem = (menuItem) => {
    const finalPrice = calculateDiscountedPrice(menuItem.price, menuItem.discount);
    const existingItem = selectedItems.find(item => item.menuItemId === menuItem._id);

    if (existingItem) {
      // Increase quantity if already added
      setSelectedItems(selectedItems.map(item =>
        item.menuItemId === menuItem._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Add new item with discounted price
      setSelectedItems([...selectedItems, {
        menuItemId: menuItem._id,
        itemName: menuItem.itemName,
        price: finalPrice,
        originalPrice: menuItem.price,
        discount: menuItem.discount,
        quantity: 1
      }]);
    }
    setSearchTerm('');
    setShowItemSearch(false);
  };

  /**
   * Update item quantity
   */
  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return;
    const updated = [...selectedItems];
    updated[index].quantity = parseInt(quantity);
    setSelectedItems(updated);
  };

  /**
   * Remove item from selected items
   */
  const removeItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Customer Information */}
      <CustomerInfoFields
        currentForm={currentForm}
        setCurrentForm={setCurrentForm}
        errors={errors}
      />

      {/* Order Items Section */}
      <div className="mb-4 border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            {t('orders.items')} *
          </label>
          <button
            type="button"
            onClick={() => setShowItemSearch(!showItemSearch)}
            className="macos-btn flex items-center gap-1 text-white text-sm"
          >
            <Plus size={16} />
            {t('orders.addItem')}
          </button>
        </div>

        {/* Menu Item Search */}
        {showItemSearch && (
          <MenuItemSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            menuItems={menuItems}
            onAddItem={addItem}
          />
        )}

        {/* Selected Items List */}
        <SelectedItemsList
          items={selectedItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          errors={errors}
        />
      </div>

      {/* Order Summary */}
      <OrderSummary
        selectedItems={selectedItems}
        orderType={currentForm.orderType || 'dine-in'}
        totalAmount={currentForm.totalAmount}
      />

      {/* Order Status */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('common.status')}
        </label>
        <select
          value={currentForm.status || 'pending'}
          onChange={(e) => setCurrentForm({ ...currentForm, status: e.target.value })}
          className="macos-input w-full"
        >
          <option value="pending">{t('orders.statusPending')}</option>
          <option value="preparing">{t('orders.statusPreparing')}</option>
          <option value="ready">{t('orders.statusReady')}</option>
          <option value="completed">{t('orders.statusCompleted')}</option>
          <option value="cancelled">{t('orders.statusCancelled')}</option>
        </select>
      </div>
    </>
  );
};

export default OrderForm;
