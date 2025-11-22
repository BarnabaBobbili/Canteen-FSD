import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../Layout/DashboardLayout';
import ConfirmationModal from '../Shared/ConfirmationModal';
import { AlertCircle } from 'lucide-react';

// Import Staff components
import StaffHeader from './StaffHeader';
import StaffAnalytics from './StaffAnalytics';
import StaffTable from './StaffTable';
import StaffForm from './StaffForm';

// Import helper functions
import {
  calculateRoleDistribution,
  calculateDepartmentDistribution,
  countActiveStaff,
  countInactiveStaff,
  filterStaff,
  validateStaffForm
} from './staffHelpers';

// Import service functions
import {
  fetchStaff as fetchStaffAPI,
  createStaff,
  updateStaff,
  deleteStaff as deleteStaffAPI,
  toggleStaffStatus as toggleStaffStatusAPI
} from './staffService';

const StaffManagement = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentForm, setCurrentForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Confirmation modal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);

  useEffect(() => {
    fetchStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const data = await fetchStaffAPI(token);
      setStaff(data);
    } catch (error) {
      setApiError(`${t('staff.fetchError')}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    setErrors({});

    // Validate form
    const validationErrors = validateStaffForm(currentForm, modalMode);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (modalMode === 'add') {
        await createStaff(currentForm, token);
      } else {
        await updateStaff(currentForm._id || currentForm.id, currentForm, token);
      }

      setSuccessMessage(t(modalMode === 'add' ? 'staff.staffCreated' : 'staff.staffUpdated'));
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchStaff();
      closeModal();
    } catch (error) {
      setApiError(error.message || t('common.operationFailed'));
    }
  };

  const handleDelete = (id) => {
    setStaffToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!staffToDelete) return;

    try {
      await deleteStaffAPI(staffToDelete, token);
      setSuccessMessage(t('staff.staffDeleted'));
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchStaff();
    } catch (error) {
      setApiError(`${t('staff.deleteError')}: ${error.message}`);
    } finally {
      setStaffToDelete(null);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      await toggleStaffStatusAPI(id, token);
      setSuccessMessage(t('staff.statusUpdateSuccess'));
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchStaff();
    } catch (error) {
      setApiError(`${t('staff.statusUpdateError')}: ${error.message}`);
    }
  };

  const openModal = (mode, item = {}) => {
    setModalMode(mode);
    setErrors({});
    setApiError('');

    if (mode === 'add') {
      setCurrentForm({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'staff',
        status: 'active',
        employeeId: '',
        department: 'none'
      });
    } else {
      setCurrentForm({ ...item });
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentForm({});
    setErrors({});
    setApiError('');
  };

  // Calculate analytics using helper functions
  const roleDistribution = useMemo(() => calculateRoleDistribution(staff), [staff]);
  const departmentDistribution = useMemo(() => calculateDepartmentDistribution(staff), [staff]);
  const activeStaffCount = useMemo(() => countActiveStaff(staff), [staff]);
  const inactiveStaffCount = useMemo(() => countInactiveStaff(staff), [staff]);
  const filteredStaffList = useMemo(() => filterStaff(staff, searchTerm), [staff, searchTerm]);

  return (
    <DashboardLayout>
      <div className="p-6">

        {/* Messages */}
        {apiError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <div>{apiError}</div>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Header with Search and Add */}
        <StaffHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={() => openModal('add')}
        />

        {/* Analytics Section */}
        <StaffAnalytics
          totalStaff={staff.length}
          activeCount={activeStaffCount}
          inactiveCount={inactiveStaffCount}
          departmentCount={departmentDistribution.length}
          roleDistribution={roleDistribution}
          departmentDistribution={departmentDistribution}
        />

        {/* Staff Table */}
        <StaffTable
          staff={filteredStaffList}
          loading={loading}
          onEdit={(member) => openModal('edit', member)}
          onDelete={handleDelete}
          onToggleStatus={toggleStatus}
        />
      </div>

      {/* Staff Form Modal */}
      <StaffForm
        show={showModal}
        mode={modalMode}
        formData={currentForm}
        onChange={setCurrentForm}
        onSubmit={handleSubmit}
        onClose={closeModal}
        errors={errors}
        apiError={apiError}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setStaffToDelete(null);
        }}
        onConfirm={confirmDelete}
        title={t('staff.deleteStaff')}
        message={t('staff.confirmDelete')}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        icon="danger"
      />
    </DashboardLayout>
  );
};

export default StaffManagement;
