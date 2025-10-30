import React, { useState, useEffect } from 'react';
import { Search, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';

const API_URL = 'http://localhost:5001/api';

const OrderForm = ({ currentForm, setCurrentForm, errors, modalMode }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState(currentForm.items || []);
  const [showItemSearch, setShowItemSearch] = useState(false);

  // Fetch menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${API_URL}/menu`);
        const data = await response.json();
        // Filter only available items
        setMenuItems(data.filter(item => item.available));
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  // Initialize selected items from currentForm when editing
  useEffect(() => {
    if (modalMode === 'edit' && currentForm.items) {
      setSelectedItems(currentForm.items);
    }
  }, [modalMode, currentForm.items]);

  // Calculate total whenever selected items change
  useEffect(() => {
    const total = selectedItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    setCurrentForm({ ...currentForm, totalAmount: total, items: selectedItems });
  }, [selectedItems]);

  const filteredMenuItems = menuItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItem = (menuItem) => {
    const existingItem = selectedItems.find(item => item.menuItemId === menuItem._id);
    if (existingItem) {
      // Increase quantity if already added
      setSelectedItems(selectedItems.map(item =>
        item.menuItemId === menuItem._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Add new item
      setSelectedItems([...selectedItems, {
        menuItemId: menuItem._id,
        itemName: menuItem.itemName,
        price: menuItem.price,
        quantity: 1
      }]);
    }
    setSearchTerm('');
    setShowItemSearch(false);
  };

  const updateQuantity = (index, quantity) => {
    if (quantity < 1) return;
    const updated = [...selectedItems];
    updated[index].quantity = parseInt(quantity);
    setSelectedItems(updated);
  };

  const removeItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Customer Name *
        </label>
        <input
          type="text"
          value={currentForm.customerName || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, customerName: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.customerName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'
          }`}
          placeholder="Enter customer name"
        />
        {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          value={currentForm.customerEmail || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, customerEmail: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.customerEmail ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'
          }`}
          placeholder="customer@example.com"
        />
        {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number *
        </label>
        <input
          type="text"
          value={currentForm.customerPhone || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, customerPhone: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.customerPhone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'
          }`}
          placeholder="10 digit phone number"
          maxLength="10"
        />
        {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Order Type *
        </label>
        <select
          value={currentForm.orderType || 'dine-in'}
          onChange={(e) => setCurrentForm({ ...currentForm, orderType: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="dine-in">Dine-In</option>
          <option value="takeaway">Takeaway</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>

      {/* Order Items Section */}
      <div className="mb-4 border-t pt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Order Items *
          </label>
          <button
            type="button"
            onClick={() => setShowItemSearch(!showItemSearch)}
            className="flex items-center gap-1 px-3 py-1 bg-sky-500 text-white text-sm rounded-lg hover:bg-sky-600"
          >
            <Plus size={16} />
            Add Item
          </button>
        </div>

        {/* Item Search Dropdown */}
        {showItemSearch && (
          <div className="mb-3 border border-gray-300 rounded-lg p-3 bg-gray-50">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search menu items..."
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                autoFocus
              />
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {filteredMenuItems.length > 0 ? (
                filteredMenuItems.map(item => (
                  <button
                    key={item._id}
                    type="button"
                    onClick={() => addItem(item)}
                    className="w-full text-left px-3 py-2 hover:bg-sky-50 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{item.itemName}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <span className="text-sky-600 font-semibold">₹{item.price}</span>
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-2">No items found</p>
              )}
            </div>
          </div>
        )}

        {/* Selected Items List */}
        {selectedItems.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {selectedItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <ShoppingCart size={16} className="text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">{item.itemName}</p>
                  <p className="text-xs text-gray-500">₹{item.price} each</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="p-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="p-1 bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
            <ShoppingCart size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No items added. Click "Add Item" to select menu items.</p>
          </div>
        )}
      </div>

      {/* Total Amount */}
      <div className="mb-4 border-t pt-4">
        <div className="flex justify-between items-center bg-sky-50 p-4 rounded-lg">
          <span className="text-lg font-bold text-gray-900">Total Amount:</span>
          <span className="text-2xl font-bold text-sky-600">
            ₹{(currentForm.totalAmount || 0).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={currentForm.status || 'pending'}
          onChange={(e) => setCurrentForm({ ...currentForm, status: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </>
  );
};

export default OrderForm;
