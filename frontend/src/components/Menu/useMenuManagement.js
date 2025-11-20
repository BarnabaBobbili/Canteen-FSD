import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import {
  fetchMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  uploadMenuImage,
  prepareMenuData
} from './menuService';
import { validateMenuForm } from './menuHelpers';

/**
 * useMenuManagement Hook
 * Manages all menu state and operations
 */
export const useMenuManagement = () => {
  const { t } = useTranslation();
  const { token, user } = useAuth();

  // State management
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch menu on mount
  useEffect(() => {
    loadMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset items to show when filters change
  useEffect(() => {
    setItemsToShow(10);
  }, [searchTerm, categoryFilter, availabilityFilter, sortBy]);

  /**
   * Load menu items from API
   */
  const loadMenu = async () => {
    try {
      const data = await fetchMenuItems();
      console.log('Menu items from backend:', data);
      setMenuItems(data);
    } catch (error) {
      setApiError(t('menu.fetchError') || 'Failed to fetch menu items');
    }
  };

  /**
   * Handle form submission for add/edit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateMenuForm(currentForm);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setApiError(t('menu.fixValidationErrors') || 'Please fix the validation errors before submitting');
      return;
    }

    if (!token) {
      setApiError(t('common.mustBeLoggedIn') || 'You must be logged in to perform this action. Please refresh and try again.');
      return;
    }

    try {
      const dataToSend = prepareMenuData(currentForm, modalMode, user?._id);
      console.log('Submitting menu item with image:', dataToSend.image);

      if (modalMode === 'add') {
        await createMenuItem(dataToSend, token);
        setSuccessMessage(t('menu.itemCreated'));
      } else {
        await updateMenuItem(currentForm._id, dataToSend, token);
        setSuccessMessage(t('menu.itemUpdated'));
      }

      setTimeout(() => setSuccessMessage(''), 3000);
      loadMenu();
      closeModal();
    } catch (error) {
      setApiError(`${t('menu.saveFailed')}: ${error.message}`);
    }
  };

  /**
   * Handle image upload via API
   */
  const handleImageUpload = async (file) => {
    try {
      const imagePath = await uploadMenuImage(file, token);
      return imagePath;
    } catch (error) {
      setApiError(t('menu.imageUploadFailed'));
      return null;
    }
  };

  /**
   * Initiate delete confirmation
   */
  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowDeleteConfirm(true);
  };

  /**
   * Execute delete after confirmation
   */
  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await deleteMenuItem(itemToDelete, token);
      setSuccessMessage(t('menu.itemDeleted'));
      setTimeout(() => setSuccessMessage(''), 3000);
      loadMenu();
    } catch (error) {
      setApiError(t('menu.deleteFailed'));
    } finally {
      setItemToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  /**
   * Open modal for add or edit
   */
  const openModal = (mode, item = {}) => {
    setModalMode(mode);
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
      ...item,
      itemType: item.itemType || 'homemade',
      stockQuantity: item.stockQuantity || 0,
      lowStockThreshold: item.lowStockThreshold || 10,
      image: (item.image && item.image.startsWith('data:')) ? null : (item.image || null)
    });
    setShowModal(true);
  };

  /**
   * Close modal and reset form
   */
  const closeModal = () => {
    setShowModal(false);
    setCurrentForm({});
    setErrors({});
    setApiError('');
  };

  return {
    // State
    menuItems,
    showModal,
    modalMode,
    currentForm,
    setCurrentForm,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    availabilityFilter,
    setAvailabilityFilter,
    sortBy,
    setSortBy,
    errors,
    apiError,
    setApiError,
    successMessage,
    itemsToShow,
    setItemsToShow,
    showFilters,
    setShowFilters,
    showDeleteConfirm,
    setShowDeleteConfirm,
    itemToDelete,
    setItemToDelete,
    // Methods
    handleSubmit,
    handleImageUpload,
    handleDelete,
    confirmDelete,
    openModal,
    closeModal,
    loadMenu
  };
};
