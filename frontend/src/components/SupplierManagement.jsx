import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import SupplierForm from './SupplierForm';
import ConfirmationModal from './Shared/ConfirmationModal';

// Import Supplier components
import SupplierHeader from './Supplier/SupplierHeader';
import SupplierStats from './Supplier/SupplierStats';
import SupplierTable from './Supplier/SupplierTable';

// Import helper functions
import { validateSupplierForm, filterSuppliers } from './Supplier/supplierHelpers';

// Import service functions
import {
  fetchSuppliers as fetchSuppliersAPI,
  createSupplier,
  updateSupplier,
  deleteSupplier as deleteSupplierAPI
} from './Supplier/supplierService';

const SupplierManagement = () => {
  const { t } = useTranslation();
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
      const data = await fetchSuppliersAPI(token);
      setSuppliers(data);
    } catch (error) {
      console.error(`${t('suppliers.fetchError')}:`, error);
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

      if (modalMode === 'add') {
        await createSupplier(currentForm, token);
      } else {
        await updateSupplier(currentForm._id, currentForm, token);
      }

      fetchSuppliers();
      closeModal();
    } catch (error) {
      console.error(`${t('suppliers.submitError')}:`, error);
      alert(error.message || t('suppliers.submitError'));
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
      await deleteSupplierAPI(supplierToDelete, token);
      fetchSuppliers();
    } catch (error) {
      console.error(`${t('suppliers.deleteError')}:`, error);
      alert(error.message || t('suppliers.deleteError'));
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
            <div className="macos-card macos-animate-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  {modalMode === 'add' ? t('suppliers.addSupplier') : t('suppliers.editSupplier')}
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
                    {modalMode === 'add' ? t('suppliers.addSupplier') : t('suppliers.updateSupplier')}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    {t('common.cancel')}
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
          title={t('suppliers.deleteSupplier')}
          message={t('suppliers.confirmDelete')}
          confirmText={t('common.delete')}
          cancelText={t('common.cancel')}
          confirmButtonClass="bg-red-600 hover:bg-red-700"
          icon="danger"
        />
      </div>
    </DashboardLayout>
  );
};

export default SupplierManagement;
