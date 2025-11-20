import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../DashboardLayout';
import { X, Save } from 'lucide-react';
import InventoryHeader from './InventoryHeader';
import InventoryFilterBar from '../Shared/InventoryFilterBar';
import InventoryTable from './InventoryTable';
import InventoryAnalytics from './InventoryAnalytics';
import InventoryForm from './InventoryForm';
import ConfirmationModal from '../Shared/ConfirmationModal';
import {
  fetchInventoryData,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
} from './inventoryService';
import {
  validateInventoryForm,
  filterInventory,
  sortInventory,
  getInitialFormState
} from './inventoryHelpers';

/**
 * InventoryManagement Component
 * Main orchestrator for inventory management
 * Refactored from 363 lines → ~180 lines
 */
const InventoryManagement = () => {
  const { t } = useTranslation();
  const { token, user } = useAuth();

  // Data State
  const [inventory, setInventory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentForm, setCurrentForm] = useState({});

  // Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showFilters, setShowFilters] = useState(false);

  // UI State
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Load inventory and suppliers data
   */
  const loadData = async () => {
    try {
      const data = await fetchInventoryData(token);
      setInventory(data.inventory);
      setSuppliers(data.suppliers);
    } catch (error) {
      setApiError(t('inventory.errors.fetchFailed'));
      console.error('Failed to fetch inventory data:', error);
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError('');

    if (!token) {
      setApiError(t('common.errors.loginRequired'));
      return;
    }

    // Validate form
    const validationErrors = validateInventoryForm(currentForm, t);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (modalMode === 'add') {
        await createInventoryItem(currentForm, token, user?._id);
        setSuccessMessage(t('inventory.itemCreated'));
      } else {
        await updateInventoryItem(currentForm._id, currentForm, token, user?._id);
        setSuccessMessage(t('inventory.itemUpdated'));
      }

      setTimeout(() => setSuccessMessage(''), 3000);
      loadData();
      closeModal();
    } catch (error) {
      setApiError(t('inventory.errors.operationFailed'));
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

    if (!token) {
      setApiError(t('common.errors.loginRequired'));
      return;
    }

    try {
      await deleteInventoryItem(itemToDelete, token);
      setSuccessMessage(t('inventory.itemDeleted'));
      setTimeout(() => setSuccessMessage(''), 3000);
      loadData();
    } catch (error) {
      setApiError(t('inventory.errors.deleteFailed'));
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
    setCurrentForm(mode === 'add' ? getInitialFormState() : { ...item });
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

  // Apply filters and sorting
  const filteredInventory = sortInventory(
    filterInventory(inventory, searchTerm, supplierFilter, stockFilter),
    sortBy
  );

  const content = (
    <>
      <div className="p-6">
        {/* Error and Success Messages */}
        {apiError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">
            {apiError}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Header with Search and Actions */}
        <InventoryHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onAddClick={() => openModal('add')}
        />

        {/* Filter Bar */}
        <div className="mb-6">
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

        {/* Inventory Table */}
        <InventoryTable
          items={filteredInventory}
          onEdit={(item) => openModal('edit', item)}
          onDelete={handleDelete}
        />
      </div>

      {/* Analytics Section */}
      <InventoryAnalytics inventory={inventory} suppliers={suppliers} />

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="macos-modal macos-animate max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {modalMode === 'add' ? t('inventory.addItem') : t('inventory.editItem')}
              </h2>
              <button onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <InventoryForm
                currentForm={currentForm}
                setCurrentForm={setCurrentForm}
                errors={errors}
              />
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 macos-btn text-white"
                >
                  <Save size={18} /> {modalMode === 'add' ? t('common.add') : t('common.update')}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        title={t('inventory.deleteItem')}
        message={t('inventory.deleteConfirmation')}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        icon="danger"
      />
    </>
  );

  // Conditionally wrap in DashboardLayout for admin and manager
  return user?.role === 'admin' || user?.role === 'manager' ? (
    <DashboardLayout>{content}</DashboardLayout>
  ) : content;
};

export default InventoryManagement;
