import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../DashboardLayout';
import OrderHeader from './OrderHeader';
import OrderTable from './OrderTable';
import OrderPagination from './OrderPagination';
import OrderFormModal from './OrderFormModal';
import OrderAnalytics from './OrderAnalytics';
import ConfirmationModal from '../Shared/ConfirmationModal';
import {
  validateOrderForm,
  filterOrders,
  sortOrders,
  getInitialFormState
} from './orderHelpers';
import * as orderService from './orderService';

/**
 * Order Management Main Component
 * Orchestrates order management functionality
 */
const OrderManagement = () => {
  const { t } = useTranslation();
  const { token, user } = useAuth();

  // Data state
  const [orders, setOrders] = useState([]);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentForm, setCurrentForm] = useState({});
  const [formErrors, setFormErrors] = useState({});

  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orderTypeFilter, setOrderTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [showFilters, setShowFilters] = useState(false);
  const [showCompletedReady, setShowCompletedReady] = useState(false);

  // Pagination state
  const [displayLimit, setDisplayLimit] = useState(10);

  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // Load orders on mount
  useEffect(() => {
    loadOrders();
  }, []);

  // Load orders from API
  const loadOrders = async () => {
    try {
      const data = await orderService.fetchOrders();
      setOrders(data);
    } catch (error) {
      setApiError(t('common.fetchError'));
      setTimeout(() => setApiError(''), 3000);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setFormErrors({});
    setApiError('');

    // Validate form
    const errors = validateOrderForm(currentForm);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      if (errors.items) {
        setApiError(errors.items);
        setTimeout(() => setApiError(''), 3000);
      }
      return;
    }

    try {
      if (modalMode === 'add') {
        await orderService.createOrder(currentForm, token, user?._id);
      } else {
        await orderService.updateOrder(currentForm._id, currentForm, token, user?._id);
      }

      setSuccessMessage(t(modalMode === 'add' ? 'orders.orderCreated' : 'orders.orderUpdated'));
      setTimeout(() => setSuccessMessage(''), 3000);
      loadOrders();
      closeModal();
    } catch (error) {
      setApiError(t('common.operationFailed'));
      setTimeout(() => setApiError(''), 3000);
    }
  };

  // Handle delete order
  const handleDelete = (id) => {
    setOrderToDelete(id);
    setShowDeleteConfirm(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!orderToDelete) return;

    try {
      await orderService.deleteOrder(orderToDelete, token);
      setSuccessMessage(t('orders.orderDeleted'));
      setTimeout(() => setSuccessMessage(''), 3000);
      loadOrders();
    } catch (error) {
      setApiError(t('common.deleteFailed'));
      setTimeout(() => setApiError(''), 3000);
    } finally {
      setOrderToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  // Open modal for add/edit
  const openModal = (mode, order = null) => {
    setModalMode(mode);
    setCurrentForm(mode === 'add' ? getInitialFormState() : { ...order });
    setFormErrors({});
    setApiError('');
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentForm({});
    setFormErrors({});
    setApiError('');
  };

  // Filter and sort orders
  const filteredOrders = filterOrders(
    orders,
    searchTerm,
    statusFilter,
    orderTypeFilter,
    showCompletedReady
  );
  const sortedOrders = sortOrders(filteredOrders, sortBy);

  // Pagination
  const totalFilteredCount = sortedOrders.length;
  const displayedOrders = sortedOrders.slice(0, displayLimit);

  // Render content
  const content = (
    <>
      {/* Success/Error Messages */}
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-4 rounded-lg">
          {apiError}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 mb-4 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Header with Search and Filters */}
      <OrderHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        orderTypeFilter={orderTypeFilter}
        setOrderTypeFilter={setOrderTypeFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onAddOrder={() => openModal('add')}
      />

      {/* Orders Table */}
      <OrderTable
        orders={displayedOrders}
        onEdit={(order) => openModal('edit', order)}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <OrderPagination
        displayedCount={displayedOrders.length}
        totalCount={totalFilteredCount}
        displayLimit={displayLimit}
        setDisplayLimit={setDisplayLimit}
        showCompletedReady={showCompletedReady}
        setShowCompletedReady={setShowCompletedReady}
      />

      {/* Analytics Section */}
      <OrderAnalytics orders={orders} />

      {/* Order Form Modal */}
      <OrderFormModal
        isOpen={showModal}
        mode={modalMode}
        currentForm={currentForm}
        setCurrentForm={setCurrentForm}
        formErrors={formErrors}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setOrderToDelete(null);
        }}
        onConfirm={confirmDelete}
        title={t('orders.deleteOrder')}
        message={t('orders.confirmDelete')}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        icon="danger"
      />
    </>
  );

  // Conditionally wrap in DashboardLayout for admin and manager
  return user?.role === 'admin' || user?.role === 'manager' ? <DashboardLayout>{content}</DashboardLayout> : content;
};

export default OrderManagement;
