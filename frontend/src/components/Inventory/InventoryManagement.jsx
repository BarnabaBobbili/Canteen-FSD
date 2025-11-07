import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../DashboardLayout';
import API_BASE_URL from '../../config/api';
import SearchBar from '../Shared/SearchBar';
import InventoryFilterBar from '../Shared/InventoryFilterBar';
import InventoryAnalytics from './InventoryAnalytics';
import InventoryForm from './InventoryForm';
import ConfirmationModal from '../Shared/ConfirmationModal';
import {
  Plus, Edit2, Trash2, X, Save, Filter, ChevronUp, ChevronDown
} from 'lucide-react';

const InventoryManagement = () => {
  const { token, user } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentForm, setCurrentForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Confirmation modal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [inventoryRes, suppliersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/inventory`),
        fetch(`${API_BASE_URL}/suppliers`)
      ]);

      const inventoryData = await inventoryRes.json();
      const suppliersData = await suppliersRes.json();

      setInventory(inventoryData);
      setSuppliers(Array.isArray(suppliersData) ? suppliersData : []);
    } catch (error) {
      setApiError('Failed to fetch inventory data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError('');

    if (!token) {
      setApiError('You must be logged in to perform this action.');
      return;
    }

    // Validate form
    const validationErrors = {};

    // Validate item name (letters and spaces only, min 3 characters)
    if (!currentForm.itemName || currentForm.itemName.trim() === '') {
      validationErrors.itemName = 'Item name is required';
    } else {
      const trimmedName = currentForm.itemName.trim();
      if (trimmedName.length < 3) {
        validationErrors.itemName = 'Item name must be at least 3 characters';
      } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
        validationErrors.itemName = 'Item name can only contain letters and spaces';
      }
    }

    if (!currentForm.quantity || currentForm.quantity <= 0) {
      validationErrors.quantity = 'Quantity must be greater than 0';
    }

    if (!currentForm.supplier || currentForm.supplier.trim() === '') {
      validationErrors.supplier = 'Supplier is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const url = modalMode === 'add'
        ? `${API_BASE_URL}/inventory`
        : `${API_BASE_URL}/inventory/${currentForm._id}`;

      const dataToSend = {
        ...currentForm,
        ...(modalMode === 'add' ? { createdBy: user?._id } : { updatedBy: user?._id })
      };

      const response = await fetch(url, {
        method: modalMode === 'add' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      if (response.ok) {
        setSuccessMessage(`Inventory item ${modalMode === 'add' ? 'added' : 'updated'} successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchData();
        closeModal();
      }
    } catch (error) {
      setApiError('Operation failed');
    }
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    if (!token) {
      setApiError('You must be logged in to perform this action.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/inventory/${itemToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setSuccessMessage('Inventory item deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchData();
      }
    } catch (error) {
      setApiError('Delete failed');
    } finally {
      setItemToDelete(null);
    }
  };

  const openModal = (mode, item = {}) => {
    setModalMode(mode);
    setErrors({});
    setApiError('');
    setCurrentForm(mode === 'add' ? {
      itemName: '',
      quantity: '',
      unit: 'kg',
      supplier: '',
      expiryDate: '',
      batchNumber: ''
    } : { ...item });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentForm({});
    setErrors({});
    setApiError('');
  };

  // Filter and sort inventory
  const filteredInventory = inventory
    .filter(item => {
      const matchesSearch = item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSupplier = supplierFilter === 'all' || item.supplier === supplierFilter;
      const matchesStock = stockFilter === 'all' ||
        (stockFilter === 'low' && item.quantity < 20) ||
        (stockFilter === 'normal' && item.quantity >= 20);
      return matchesSearch && matchesSupplier && matchesStock;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return (a.itemName || '').localeCompare(b.itemName || '');
        case 'name-desc':
          return (b.itemName || '').localeCompare(a.itemName || '');
        case 'quantity-asc':
          return (a.quantity || 0) - (b.quantity || 0);
        case 'quantity-desc':
          return (b.quantity || 0) - (a.quantity || 0);
        case 'supplier-asc':
          return (a.supplier || '').localeCompare(b.supplier || '');
        case 'supplier-desc':
          return (b.supplier || '').localeCompare(a.supplier || '');
        default:
          return 0;
      }
    });

  const content = (
    <>
    <div className="p-6">
        {apiError && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">{apiError}</div>}
        {successMessage && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg">{successMessage}</div>}

        <div className="bg-white rounded-xl shadow-lg mb-6 p-6">
          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search inventory items..."
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Filter size={16} />
              Filters
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <button
              onClick={() => openModal('add')}
              className="flex items-center gap-2 px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
            >
              <Plus size={20} /> Add Item
            </button>
          </div>

          {/* Filters and Sort */}
          <InventoryFilterBar
            supplierFilter={supplierFilter}
            setSupplierFilter={setSupplierFilter}
            stockFilter={stockFilter}
            setStockFilter={setStockFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            suppliers={suppliers}
            showFilters={showFilters}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Item Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Unit</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Supplier</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Expiry Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {item.itemName}
                      {item.quantity < 20 && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                          Low Stock
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={item.quantity < 20 ? 'text-red-600 font-semibold' : ''}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.unit}</td>
                  <td className="px-6 py-4">{item.supplier}</td>
                  <td className="px-6 py-4">
                    {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal('edit', item)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredInventory.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No inventory items found.
            </div>
          )}
        </div>
      </div>

      {/* Analytics Section */}
      <InventoryAnalytics inventory={inventory} suppliers={suppliers} />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{modalMode === 'add' ? 'Add' : 'Edit'} Inventory Item</h2>
              <button onClick={closeModal}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <InventoryForm
                currentForm={currentForm}
                setCurrentForm={setCurrentForm}
                errors={errors}
              />
              <div className="flex gap-3 mt-6">
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
                  <Save size={18} /> {modalMode === 'add' ? 'Add' : 'Update'}
                </button>
                <button type="button" onClick={closeModal} className="px-6 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Inventory Item"
        message="Are you sure you want to delete this inventory item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        icon="danger"
      />
    </>
  );

  // Conditionally wrap in DashboardLayout only for admin
  return user?.role === 'admin' ? <DashboardLayout>{content}</DashboardLayout> : content;
};

export default InventoryManagement;
