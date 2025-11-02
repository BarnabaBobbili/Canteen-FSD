import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import SupplierForm from './SupplierForm';
import ConfirmationModal from './Shared/ConfirmationModal';
import API_BASE_URL from '../config/api';

// Import Supplier components
import SupplierHeader from './Supplier/SupplierHeader';
import SupplierStats from './Supplier/SupplierStats';
import SupplierTable from './Supplier/SupplierTable';

// Import helper functions
import { validateSupplierForm, filterSuppliers } from './Supplier/supplierHelpers';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateSupplierForm(currentForm);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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

  const filteredSuppliers = filterSuppliers(suppliers, searchTerm);

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header with Search */}
        <SupplierHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={() => openModal('add')}
        />

        {/* Statistics */}
        <SupplierStats suppliers={suppliers} />

        {/* Suppliers Table */}
        <SupplierTable
          suppliers={filteredSuppliers}
          loading={loading}
          onEdit={(supplier) => openModal('edit', supplier)}
          onDelete={handleDelete}
          onAddClick={() => openModal('add')}
        />

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
