import React from 'react';

const MenuForm = ({ currentForm, setCurrentForm, errors }) => {
  return (
    <>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Item Name *
        </label>
        <input
          type="text"
          value={currentForm.itemName || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, itemName: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.itemName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'
          }`}
          placeholder="Enter item name (letters only)"
        />
        {errors.itemName && <p className="text-red-500 text-xs mt-1">{errors.itemName}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category *
        </label>
        <select
          value={currentForm.category || 'snacks'}
          onChange={(e) => setCurrentForm({ ...currentForm, category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="snacks">Snacks</option>
          <option value="beverages">Beverages</option>
          <option value="meals">Meals</option>
          <option value="desserts">Desserts</option>
          <option value="breakfast">Breakfast</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price *
        </label>
        <input
          type="number"
          value={currentForm.price || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, price: parseFloat(e.target.value) })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'
          }`}
          placeholder="0.00"
          min="0"
          step="0.01"
        />
        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={currentForm.description || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          rows="3"
          placeholder="Item description"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Allergens
        </label>
        <input
          type="text"
          value={currentForm.allergens || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, allergens: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="e.g., Nuts, Dairy, Gluten"
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={currentForm.available !== false}
            onChange={(e) => setCurrentForm({ ...currentForm, available: e.target.checked })}
            className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
          />
          <span className="text-sm font-medium text-gray-700">Available</span>
        </label>
      </div>
    </>
  );
};

export default MenuForm;
