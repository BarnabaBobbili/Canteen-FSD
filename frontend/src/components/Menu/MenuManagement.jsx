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
  Plus, Edit2, Trash2, X, Save, Filter, ChevronUp, ChevronDown, AlertTriangle, Clock
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
      // Debug: Check images in fetched data
      const itemsWithImages = data.filter(item => item.image);
      console.log('Items with images:', itemsWithImages.map(item => ({ name: item.itemName, image: item.image })));
      setMenuItems(data);
    } catch (error) {
      setApiError('Failed to fetch menu items');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate item name (letters and spaces only, min 3 characters)
    if (!currentForm.itemName || currentForm.itemName.trim() === '') {
      newErrors.itemName = 'Item name is required';
    } else {
      const trimmedName = currentForm.itemName.trim();
      if (trimmedName.length < 3) {
        newErrors.itemName = 'Item name must be at least 3 characters';
      } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
        newErrors.itemName = 'Item name can only contain letters and spaces';
      }
    }

    if (!currentForm.category) {
      newErrors.category = 'Category is required';
    }

    if (!currentForm.itemType) {
      newErrors.itemType = 'Item type is required';
    }

    if (!currentForm.price || currentForm.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    // Validation for packaged items
    if (currentForm.itemType === 'packaged') {
      if (!currentForm.stockQuantity && currentForm.stockQuantity !== 0) {
        newErrors.stockQuantity = 'Stock quantity is required for packaged items';
      }

      if (!currentForm.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required for packaged items';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      setApiError('Please fix the validation errors before submitting');
      return;
    }

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

      // Clean up any base64 data before sending (shouldn't happen, but just in case)
      if (dataToSend.image && dataToSend.image.startsWith('data:')) {
        console.warn('Removing base64 data from submission. Setting image to null.');
        dataToSend.image = null;
      }

      // Debug: Log image data being sent
      console.log('Submitting menu item with image:', dataToSend.image);

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

  const handleImageUpload = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_BASE_URL}/menu/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        return data.imagePath;
      } else {
        setApiError('Failed to upload image');
        return null;
      }
    } catch (error) {
      setApiError('Image upload failed');
      return null;
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
    // Clear any previous errors
    setErrors({});
    setApiError('');

    setCurrentForm(mode === 'add' ? {
      itemName: '',
      category: 'snacks',
      itemType: 'homemade',
      price: '',
      description: '',
      allergens: '',
      available: true,
      stockQuantity: 0,
      lowStockThreshold: 10,
      expiryDate: null,
      image: null
    } : {
      // Ensure all fields are properly set for edit mode
      ...item,
      // Add default for itemType if not present (for backward compatibility)
      itemType: item.itemType || 'homemade',
      // Ensure numeric fields have proper defaults
      stockQuantity: item.stockQuantity || 0,
      lowStockThreshold: item.lowStockThreshold || 10,
      // IMPORTANT: Remove base64 data from existing items (should be URL or server path only)
      image: (item.image && item.image.startsWith('data:')) ? null : (item.image || null)
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentForm({});
    setErrors({});
    setApiError('');
  };

  // Calculate alerts - Only for packaged items
  const lowStockItems = menuItems.filter(item =>
    (item.itemType || 'homemade') === 'packaged' &&
    item.stockQuantity <= (item.lowStockThreshold || 10) &&
    item.stockQuantity > 0
  );
  const outOfStockItems = menuItems.filter(item =>
    (item.itemType || 'homemade') === 'packaged' &&
    item.stockQuantity === 0
  );

  const expiringItems = menuItems.filter(item => {
    if ((item.itemType || 'homemade') !== 'packaged' || !item.expiryDate) return false;
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  });

  const expiredItems = menuItems.filter(item => {
    if ((item.itemType || 'homemade') !== 'packaged' || !item.expiryDate) return false;
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    return expiryDate <= today;
  });

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

  const content = (
    <>
    <div className="p-6">
        {apiError && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">{apiError}</div>}
        {successMessage && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg">{successMessage}</div>}

        {/* Alert Banners */}
        {(outOfStockItems.length > 0 || lowStockItems.length > 0 || expiredItems.length > 0 || expiringItems.length > 0) && (
          <div className="mb-4 space-y-2">
            {outOfStockItems.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="text-red-500 mr-3" size={20} />
                  <div>
                    <p className="text-red-800 font-semibold">Out of Stock ({outOfStockItems.length} items)</p>
                    <p className="text-red-700 text-sm">
                      {outOfStockItems.map(item => item.itemName).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {lowStockItems.length > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="text-yellow-600 mr-3" size={20} />
                  <div>
                    <p className="text-yellow-800 font-semibold">Low Stock Alert ({lowStockItems.length} items)</p>
                    <p className="text-yellow-700 text-sm">
                      {lowStockItems.map(item => `${item.itemName} (${item.stockQuantity})`).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {expiredItems.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center">
                  <Clock className="text-red-500 mr-3" size={20} />
                  <div>
                    <p className="text-red-800 font-semibold">Expired Items ({expiredItems.length})</p>
                    <p className="text-red-700 text-sm">
                      {expiredItems.map(item => item.itemName).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {expiringItems.length > 0 && (
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg">
                <div className="flex items-center">
                  <Clock className="text-orange-600 mr-3" size={20} />
                  <div>
                    <p className="text-orange-800 font-semibold">Expiring Soon ({expiringItems.length} items)</p>
                    <p className="text-orange-700 text-sm">
                      {expiringItems.map(item => {
                        const daysLeft = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                        return `${item.itemName} (${daysLeft}d)`;
                      }).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

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
                <th className="px-6 py-3 text-left text-sm font-semibold">Image</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Item Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Expiry</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Available</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenu.slice(0, itemsToShow).map((item) => {
                const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
                const hasDiscount = item.discount && item.discount.type !== 'none' && item.discount.value > 0;

                // Check stock and expiry only for packaged items
                // Default to 'homemade' if itemType is not set (backward compatibility)
                const isPackaged = (item.itemType || 'homemade') === 'packaged';
                const isLowStock = isPackaged && item.stockQuantity <= (item.lowStockThreshold || 10);
                const isOutOfStock = isPackaged && item.stockQuantity === 0;

                let isExpiringSoon = false;
                let isExpired = false;
                let daysUntilExpiry = null;

                if (isPackaged && item.expiryDate) {
                  const expiryDate = new Date(item.expiryDate);
                  const today = new Date();
                  daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                  isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry > 0;
                  isExpired = daysUntilExpiry <= 0;
                }

                return (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        {item.image ? (
                          <img
                            src={(() => {
                              const isExternalUrl = item.image.startsWith('http://') || item.image.startsWith('https://');
                              const imageSrc = isExternalUrl ? item.image : `${API_BASE_URL.replace('/api', '')}${item.image}`;
                              // Debug log for each image
                              if (item.image.includes('http')) {
                                console.log(`Image for ${item.itemName}:`, { original: item.image, isExternal: isExternalUrl, finalSrc: imageSrc });
                              }
                              return imageSrc;
                            })()}
                            alt={item.itemName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.error(`Failed to load image for ${item.itemName}:`, item.image);
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23e5e7eb" width="64" height="64"/%3E%3Ctext fill="%239ca3af" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-size="10"%3ENo Image%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        ) : (
                          <span className="text-xs text-gray-400">No Image</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.itemName}</span>
                        {/* Show alerts only for packaged items */}
                        {isPackaged && ((isLowStock || isOutOfStock) || (isExpiringSoon || isExpired)) && (
                          <div className="flex gap-1">
                            {(isLowStock || isOutOfStock) && (
                              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold ${
                                isOutOfStock ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                <AlertTriangle size={12} className="mr-1" />
                                {isOutOfStock ? 'Out' : 'Low'}
                              </span>
                            )}
                            {(isExpiringSoon || isExpired) && (
                              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold ${
                                isExpired ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                              }`}>
                                <Clock size={12} className="mr-1" />
                                {isExpired ? 'Expired' : `${daysUntilExpiry}d`}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize">{item.category}</span>
                      <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                        (item.itemType || 'homemade') === 'homemade' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {(item.itemType || 'homemade') === 'homemade' ? 'Homemade' : 'Packaged'}
                      </span>
                    </td>
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
                    <td className="px-6 py-4">
                      {item.stockQuantity ? (
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          isOutOfStock ? 'bg-red-100 text-red-800' :
                          isLowStock ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.stockQuantity}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {item.expiryDate ? (
                        <div>
                          <div className={`text-sm ${isExpired ? 'text-red-600 font-semibold' : isExpiringSoon ? 'text-orange-600' : 'text-gray-700'}`}>
                            {new Date(item.expiryDate).toLocaleDateString()}
                          </div>
                          {isExpired && <div className="text-xs text-red-600">Expired</div>}
                          {isExpiringSoon && <div className="text-xs text-orange-600">Expires in {daysUntilExpiry} days</div>}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">N/A</span>
                      )}
                    </td>
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
                onImageUpload={handleImageUpload}
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
    </>
  );

  // Conditionally wrap in DashboardLayout only for admin
  return user?.role === 'admin' ? <DashboardLayout>{content}</DashboardLayout> : content;
};

export default MenuManagement;
