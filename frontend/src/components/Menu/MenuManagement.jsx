import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../DashboardLayout';
import API_BASE_URL from '../../config/api';
import MenuForm from './MenuForm';
import SearchBar from '../Shared/SearchBar';
import MenuFilterBar from '../Shared/MenuFilterBar';
import MenuAnalytics from './MenuAnalytics';
import ConfirmationModal from '../Shared/ConfirmationModal';
import {
  Plus, Edit2, Trash2, X, Save, Filter, ChevronUp, ChevronDown
} from 'lucide-react';

const MenuManagement = () => {
  const { token, user } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentForm, setCurrentForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [itemsToShow, setItemsToShow] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  // Confirmation modal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount.type === 'none' || !discount.value) return price;

    if (discount.type === 'percentage') {
      return price - (price * discount.value / 100);
    } else if (discount.type === 'fixed') {
      return Math.max(0, price - discount.value);
    }
    return price;
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Reset items to show when filters change
  useEffect(() => {
    setItemsToShow(10);
  }, [searchTerm, categoryFilter, availabilityFilter, sortBy]);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu`);
      const data = await response.json();
      console.log('Menu items from backend:', data);
      console.log('Sample item with discount:', data[0]);
      setMenuItems(data);
    } catch (error) {
      setApiError('Failed to fetch menu items');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Token:', token);
    console.log('User:', user);

    if (!token) {
      setApiError('You must be logged in to perform this action. Please refresh and try again.');
      return;
    }

    try {
      const url = modalMode === 'add'
        ? `${API_BASE_URL}/menu`
        : `${API_BASE_URL}/menu/${currentForm._id}`;

      // Add user tracking information
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
        setSuccessMessage(`Menu item ${modalMode === 'add' ? 'added' : 'updated'} successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchMenu();
        closeModal();
      } else {
        const errorData = await response.json();
        setApiError(`Failed to save: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      setApiError(`Operation failed: ${error.message}`);
    }
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/menu/${itemToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setSuccessMessage('Menu item deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchMenu();
      }
    } catch (error) {
      setApiError('Delete failed');
    } finally {
      setItemToDelete(null);
    }
  };

  const openModal = (mode, item = {}) => {
    setModalMode(mode);
    setCurrentForm(mode === 'add' ? {
      itemName: '',
      category: 'snacks',
      price: '',
      description: '',
      allergens: '',
      available: true
    } : { ...item });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentForm({});
    setErrors({});
  };

  // Filter and sort menu items
  const filteredMenu = menuItems
    .filter(item => {
      // Search filter
      const matchesSearch = item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

      // Availability filter
      const matchesAvailability = availabilityFilter === 'all' ||
        (availabilityFilter === 'available' && item.available) ||
        (availabilityFilter === 'unavailable' && !item.available);

      return matchesSearch && matchesCategory && matchesAvailability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.itemName.localeCompare(b.itemName);
        case 'name-desc':
          return b.itemName.localeCompare(a.itemName);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'category-asc':
          return a.category.localeCompare(b.category);
        case 'category-desc':
          return b.category.localeCompare(a.category);
        default:
          return 0;
      }
    });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {apiError && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">{apiError}</div>}
        {successMessage && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg">{successMessage}</div>}

        <div className="bg-white rounded-xl shadow-lg mb-6 p-6">
          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search menu items..."
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
              <Plus size={20} /> Add Menu Item
            </button>
          </div>

          {/* Filters and Sort */}
          <MenuFilterBar
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            availabilityFilter={availabilityFilter}
            setAvailabilityFilter={setAvailabilityFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showFilters={showFilters}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Item Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Allergens</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Available</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenu.slice(0, itemsToShow).map((item) => {
                const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
                const hasDiscount = item.discount && item.discount.type !== 'none' && item.discount.value > 0;

                // Debug logging for first item
                if (filteredMenu.indexOf(item) === 0) {
                  console.log('First item:', item.itemName);
                  console.log('Discount object:', item.discount);
                  console.log('Has discount?', hasDiscount);
                }

                return (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{item.itemName}</td>
                    <td className="px-6 py-4 capitalize">{item.category}</td>
                    <td className="px-6 py-4">
                      {hasDiscount ? (
                        <div>
                          <div className="text-xs text-gray-400 line-through">₹{item.price.toFixed(2)}</div>
                          <div className="text-green-600 font-bold">₹{discountedPrice.toFixed(2)}</div>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-semibold">
                            {item.discount.type === 'percentage' ? `${item.discount.value}% OFF` : `₹${item.discount.value} OFF`}
                          </span>
                        </div>
                      ) : (
                        `₹${item.price.toFixed(2)}`
                      )}
                    </td>
                    <td className="px-6 py-4">{item.allergens || 'None'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.available ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openModal('edit', item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* View More/Less Buttons */}
        {filteredMenu.length > 10 && (
          <div className="mt-4 text-center flex gap-3 justify-center">
            {filteredMenu.length > itemsToShow && (
              <button
                onClick={() => setItemsToShow(prev => prev + 10)}
                className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                View More ({filteredMenu.length - itemsToShow} remaining)
              </button>
            )}
            {itemsToShow > 10 && (
              <button
                onClick={() => setItemsToShow(10)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Show Less
              </button>
            )}
          </div>
        )}
      </div>

      {/* Analytics Section */}
      <MenuAnalytics menuItems={menuItems} />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{modalMode === 'add' ? 'Add' : 'Edit'} Menu Item</h2>
              <button onClick={closeModal}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <MenuForm
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
        title="Delete Menu Item"
        message="Are you sure you want to delete this menu item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        icon="danger"
      />
    </DashboardLayout>
  );
};

export default MenuManagement;
