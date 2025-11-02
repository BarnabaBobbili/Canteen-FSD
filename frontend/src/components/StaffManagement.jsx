import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from './DashboardLayout';
import API_BASE_URL from '../config/api';
import ConfirmationModal from './Shared/ConfirmationModal';
import { AlertCircle } from 'lucide-react';

// Import Staff components
import StaffHeader from './Staff/StaffHeader';
import StaffAnalytics from './Staff/StaffAnalytics';
import StaffTable from './Staff/StaffTable';
import StaffForm from './Staff/StaffForm';

// Import helper functions
import {
  calculateRoleDistribution,
  calculateDepartmentDistribution,
  countActiveStaff,
  countInactiveStaff,
  filterStaff
} from './Staff/staffHelpers';

const StaffManagement = () => {
  const { token } = useAuth();
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentForm, setCurrentForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Confirmation modal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStaff(data);
      } else {
        setApiError('Failed to fetch staff data');
      }
    } catch (error) {
      setApiError('Error fetching staff: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    try {
      const url = modalMode === 'add'
        ? `${API_BASE_URL}/auth/register`
        : `${API_BASE_URL}/users/${currentForm._id || currentForm.id}`;

      const method = modalMode === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(currentForm)
      });

      if (response.ok) {
        setSuccessMessage(`Staff ${modalMode === 'add' ? 'added' : 'updated'} successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchStaff();
        closeModal();
      } else {
        const error = await response.json();
        setApiError(error.message || 'Operation failed');
      }
    } catch (error) {
      setApiError('Error: ' + error.message);
    }
  };

  const handleDelete = (id) => {
    setStaffToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!staffToDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/users/${staffToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccessMessage('Staff deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchStaff();
      } else {
        setApiError('Failed to delete staff');
      }
    } catch (error) {
      setApiError('Error deleting staff: ' + error.message);
    } finally {
      setStaffToDelete(null);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccessMessage('Status updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchStaff();
      } else {
        setApiError('Failed to update status');
      }
    } catch (error) {
      setApiError('Error updating status: ' + error.message);
    }
  };

  const openModal = (mode, item = {}) => {
    setModalMode(mode);
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
        title="Delete Staff Member"
        message="Are you sure you want to delete this staff member? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        icon="danger"
      />
    </DashboardLayout>
  );
};

export default StaffManagement;
