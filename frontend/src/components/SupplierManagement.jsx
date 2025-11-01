import React, { useState, useEffect } from 'react';
import { Truck, Plus, Edit, Trash2, Search, X, Star } from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import SupplierForm from './SupplierForm';
import ConfirmationModal from './Shared/ConfirmationModal';
import API_BASE_URL from '../config/api';

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [currentForm, setCurrentForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Confirmation modal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/suppliers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSuppliers(data);
      } else {
        console.error('Failed to fetch suppliers');
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const newErrors = {};

    if (!currentForm.supplierName || currentForm.supplierName.trim() === '') {
      newErrors.supplierName = 'Supplier name is required';
    }

    if (!currentForm.contactPerson || currentForm.contactPerson.trim() === '') {
      newErrors.contactPerson = 'Contact person is required';
    }

    if (!currentForm.email || !validateEmail(currentForm.email)) {
      newErrors.email = 'Valid email is required';
    }

    if (!currentForm.phone || currentForm.phone.trim() === '') {
      newErrors.phone = 'Phone number is required';
    }

    if (!currentForm.address || currentForm.address.trim() === '') {
      newErrors.address = 'Address is required';
    }

    if (!currentForm.supplierType) {
      newErrors.supplierType = 'Supplier type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const url = modalMode === 'add'
        ? `${API_BASE_URL}/suppliers`
        : `${API_BASE_URL}/suppliers/${currentForm._id}`;

      const method = modalMode === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(currentForm)
      });

      if (response.ok) {
        fetchSuppliers();
        closeModal();
      } else {
        const errorData = await response.json();
        console.error('Error saving supplier:', errorData);
        alert(errorData.message || 'Failed to save supplier');
      }
    } catch (error) {
      console.error('Error submitting supplier:', error);
      alert('An error occurred while saving the supplier');
    }
  };

  const handleDelete = (id) => {
    setSupplierToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!supplierToDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/suppliers/${supplierToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchSuppliers();
      } else {
        console.error('Failed to delete supplier');
        alert('Failed to delete supplier');
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
      alert('An error occurred while deleting the supplier');
    } finally {
      setSupplierToDelete(null);
    }
  };

  const openModal = (mode, supplier = {}) => {
    setModalMode(mode);
    setCurrentForm(
      mode === 'edit'
        ? supplier
        : {
            supplierName: '',
            contactPerson: '',
            email: '',
            phone: '',
            address: '',
            supplierType: '',
            status: 'active',
            gstNumber: '',
            paymentTerms: 'net-30',
            rating: 3,
            notes: ''
          }
    );
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentForm({});
    setErrors({});
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.supplierType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSupplierTypeColor = (type) => {
    const colors = {
      'food': 'bg-green-100 text-green-800',
      'beverages': 'bg-blue-100 text-blue-800',
      'raw-materials': 'bg-yellow-100 text-yellow-800',
      'packaging': 'bg-purple-100 text-purple-800',
      'equipment': 'bg-gray-100 text-gray-800',
      'other': 'bg-pink-100 text-pink-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={14}
            className={
              index < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : index === fullStars && hasHalfStar
                ? 'fill-yellow-200 text-yellow-400'
                : 'text-gray-300'
            }
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Truck className="text-sky-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Supplier Management</h1>
              <p className="text-sm text-gray-600">Manage your suppliers and vendors</p>
            </div>
          </div>
          <button
            onClick={() => openModal('add')}
            className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
          >
            <Plus size={20} />
            Add New Supplier
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search suppliers by name, contact, email, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              type="button"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Suppliers</p>
          <p className="text-2xl font-bold text-gray-800">{suppliers.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <p className="text-sm text-green-600">Active</p>
          <p className="text-2xl font-bold text-green-800">
            {suppliers.filter(s => s.status === 'active').length}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow">
          <p className="text-sm text-red-600">Inactive</p>
          <p className="text-2xl font-bold text-red-800">
            {suppliers.filter(s => s.status === 'inactive').length}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <p className="text-sm text-blue-600">Average Rating</p>
          <p className="text-2xl font-bold text-blue-800">
            {suppliers.length > 0
              ? (suppliers.reduce((acc, s) => acc + (s.rating || 3), 0) / suppliers.length).toFixed(1)
              : '0.0'}
          </p>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading suppliers...</p>
          </div>
        ) : filteredSuppliers.length === 0 ? (
          <div className="text-center py-12">
            <Truck className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500">No suppliers found</p>
            <button
              onClick={() => openModal('add')}
              className="mt-4 text-sky-600 hover:text-sky-700 font-medium"
            >
              Add your first supplier
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Terms
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{supplier.supplierName}</p>
                      <p className="text-sm text-gray-500">{supplier.contactPerson}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-800">{supplier.email}</p>
                      <p className="text-sm text-gray-500">{supplier.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSupplierTypeColor(supplier.supplierType)}`}>
                      {supplier.supplierType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {supplier.paymentTerms?.replace('net-', 'Net ').replace('immediate', 'Immediate')}
                  </td>
                  <td className="px-6 py-4">
                    {renderStars(supplier.rating || 3)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      supplier.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {supplier.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal('edit', supplier)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(supplier._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                {modalMode === 'add' ? 'Add New Supplier' : 'Edit Supplier'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-4">
              <SupplierForm
                currentForm={currentForm}
                setCurrentForm={setCurrentForm}
                errors={errors}
              />

              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors font-medium"
                >
                  {modalMode === 'add' ? 'Add Supplier' : 'Update Supplier'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
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
          setSupplierToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Supplier"
        message="Are you sure you want to delete this supplier? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        icon="danger"
      />
      </div>
    </DashboardLayout>
  );
};

export default SupplierManagement;
