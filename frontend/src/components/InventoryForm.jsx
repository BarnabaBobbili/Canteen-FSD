import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import API_BASE_URL from '../config/api';

const InventoryForm = ({ currentForm, setCurrentForm, errors }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/suppliers', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Filter only active suppliers
        const activeSuppliers = data.filter(s => s.status === 'active');
        setSuppliers(activeSuppliers);
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {
      setLoadingSuppliers(false);
    }
  };

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
          Quantity *
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentForm({ ...currentForm, quantity: Math.max(0, (currentForm.quantity || 0) - 1) })}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Minus size={20} />
          </button>
          <input
            type="number"
            value={currentForm.quantity || ''}
            onChange={(e) => setCurrentForm({ ...currentForm, quantity: parseFloat(e.target.value) || 0 })}
            className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-center font-semibold text-lg ${
              errors.quantity ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'
            }`}
            placeholder="0"
            min="0"
            step="1"
          />
          <button
            type="button"
            onClick={() => setCurrentForm({ ...currentForm, quantity: (currentForm.quantity || 0) + 1 })}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Unit *
        </label>
        <select
          value={currentForm.unit || 'kg'}
          onChange={(e) => setCurrentForm({ ...currentForm, unit: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="kg">Kilogram (kg)</option>
          <option value="g">Gram (g)</option>
          <option value="l">Liter (l)</option>
          <option value="ml">Milliliter (ml)</option>
          <option value="pcs">Pieces (pcs)</option>
          <option value="packets">Packets</option>
          <option value="boxes">Boxes</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Supplier *
        </label>
        <select
          value={currentForm.supplier || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, supplier: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.supplier ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-500'
          }`}
          disabled={loadingSuppliers}
        >
          <option value="">
            {loadingSuppliers ? 'Loading suppliers...' : 'Select Supplier'}
          </option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier.supplierName}>
              {supplier.supplierName}
            </option>
          ))}
          {!loadingSuppliers && suppliers.length === 0 && (
            <option value="" disabled>No active suppliers available</option>
          )}
        </select>
        {errors.supplier && <p className="text-red-500 text-xs mt-1">{errors.supplier}</p>}
        {!loadingSuppliers && suppliers.length === 0 && (
          <p className="text-amber-600 text-xs mt-1">
            No suppliers found. Please add suppliers in the Supplier Management page.
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Expiry Date
        </label>
        <input
          type="date"
          value={currentForm.expiryDate || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, expiryDate: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Batch Number
        </label>
        <input
          type="text"
          value={currentForm.batchNumber || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, batchNumber: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="e.g., BATCH2024001"
        />
      </div>
    </>
  );
};

export default InventoryForm;
