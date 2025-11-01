import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../DashboardLayout';
import API_BASE_URL from '../../config/api';
import SearchBar from '../Shared/SearchBar';
import OrderFilterBar from '../Shared/OrderFilterBar';
import OrderAnalytics from './OrderAnalytics';
import OrderForm from './OrderForm';
import {
  Plus, Edit2, Trash2, X, Save, Filter, ChevronUp, ChevronDown
} from 'lucide-react';

const OrderManagement = () => {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentForm, setCurrentForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orderTypeFilter, setOrderTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [displayLimit, setDisplayLimit] = useState(10);
  const [showCompletedReady, setShowCompletedReady] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setApiError('Failed to fetch orders');
    }
  };

  const validateEmail = (email) => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {};

    // Customer Name validation
    if (!currentForm.customerName || currentForm.customerName.trim() === '') {
      errors.customerName = 'Customer name is required';
    }

    // Email validation (optional but must be valid if provided)
    if (currentForm.customerEmail && currentForm.customerEmail.trim() !== '') {
      if (!validateEmail(currentForm.customerEmail)) {
        errors.customerEmail = 'Please enter a valid email address';
      }
    }

    // Phone Number validation
    if (!currentForm.customerPhone || currentForm.customerPhone.trim() === '') {
      errors.customerPhone = 'Phone number is required';
    } else if (currentForm.customerPhone.length !== 10) {
      errors.customerPhone = 'Phone number must be 10 digits';
    } else if (!/^\d+$/.test(currentForm.customerPhone)) {
      errors.customerPhone = 'Phone number must contain only digits';
    }

    // Order Items validation
    if (!currentForm.items || currentForm.items.length === 0) {
      errors.items = 'Please add at least one item to the order';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setFormErrors({});
    setApiError('');

    // Validate form
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      if (errors.items) {
        setApiError(errors.items);
        setTimeout(() => setApiError(''), 3000);
      }
      return;
    }

    try {
      const url = modalMode === 'add'
        ? `${API_BASE_URL}/orders`
        : `${API_BASE_URL}/orders/${currentForm._id}`;

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
        setSuccessMessage(`Order ${modalMode === 'add' ? 'created' : 'updated'} successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchOrders();
        closeModal();
      }
    } catch (error) {
      setApiError('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setSuccessMessage('Order deleted!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchOrders();
      }
    } catch (error) {
      setApiError('Delete failed');
    }
  };

  const openModal = (mode, item = {}) => {
    setModalMode(mode);
    setCurrentForm(mode === 'add' ? {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      items: [],
      orderType: 'dine-in',
      status: 'pending',
      totalAmount: 0
    } : { ...item });
    setFormErrors({});
    setApiError('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentForm({});
    setFormErrors({});
    setApiError('');
  };

  // Filter and sort orders
  const filteredOrders = orders
    .filter(order => {
      // Search filter
      const matchesSearch = order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone?.includes(searchTerm);

      // Status filter
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      // Order type filter
      const matchesOrderType = orderTypeFilter === 'all' || order.orderType === orderTypeFilter;

      // Hide completed and ready orders by default unless user wants to see them
      const isActiveOrder = showCompletedReady || (order.status !== 'completed' && order.status !== 'ready');

      return matchesSearch && matchesStatus && matchesOrderType && isActiveOrder;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case 'date-desc':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case 'total-asc':
          return (a.totalAmount || 0) - (b.totalAmount || 0);
        case 'total-desc':
          return (b.totalAmount || 0) - (a.totalAmount || 0);
        case 'customer-asc':
          return (a.customerName || '').localeCompare(b.customerName || '');
        case 'customer-desc':
          return (b.customerName || '').localeCompare(a.customerName || '');
        case 'status':
          const statusOrder = { 'pending': 1, 'preparing': 2, 'ready': 3, 'completed': 4, 'cancelled': 5 };
          return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
        default:
          return 0;
      }
    });

  // Pagination - limit displayed orders
  const totalFilteredCount = filteredOrders.length;
  const displayedOrders = filteredOrders.slice(0, displayLimit);
  const hasMoreOrders = totalFilteredCount > displayLimit;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {apiError && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">{apiError}</div>}
        {successMessage && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg">{successMessage}</div>}

        <div className="bg-white rounded-xl shadow-lg mb-6 p-6">
          {/* Search Bar and Buttons */}
          <div className="flex gap-4 mb-4">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search orders by name, email, or phone..."
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
              <Plus size={20} /> Add Order
            </button>
          </div>

          {/* Filters and Sort */}
          <OrderFilterBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            orderTypeFilter={orderTypeFilter}
            setOrderTypeFilter={setOrderTypeFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showFilters={showFilters}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Customer Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Order Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{order.customerName}</td>
                  <td className="px-6 py-4">{order.customerEmail || '-'}</td>
                  <td className="px-6 py-4">{order.customerPhone}</td>
                  <td className="px-6 py-4 capitalize">{order.orderType}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">₹{order.totalAmount}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => openModal('edit', order)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(order._id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View More / Show Completed Orders Section */}
        <div className="mt-4 space-y-3">
          <div className="text-center text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{displayedOrders.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{totalFilteredCount}</span> orders
            {!showCompletedReady && <span className="text-gray-500"> (excluding completed & ready)</span>}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            {hasMoreOrders && (
              <button
                onClick={() => setDisplayLimit(displayLimit + 10)}
                className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                View More ({totalFilteredCount - displayLimit} more)
              </button>
            )}

            <button
              onClick={() => setShowCompletedReady(!showCompletedReady)}
              className={`px-6 py-2 rounded-lg border-2 transition-colors ${
                showCompletedReady
                  ? 'bg-sky-500 text-white border-sky-500 hover:bg-sky-600'
                  : 'bg-white text-sky-600 border-sky-500 hover:bg-sky-50'
              }`}
            >
              {showCompletedReady ? 'Hide' : 'Show'} Completed & Ready
            </button>

            {displayLimit > 10 && (
              <button
                onClick={() => setDisplayLimit(10)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <OrderAnalytics orders={orders} />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{modalMode === 'add' ? 'Add New' : 'Edit'} Order</h2>
              <button onClick={closeModal}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6" noValidate>
              <OrderForm
                currentForm={currentForm}
                setCurrentForm={setCurrentForm}
                errors={formErrors}
                modalMode={modalMode}
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
    </DashboardLayout>
  );
};

export default OrderManagement;
