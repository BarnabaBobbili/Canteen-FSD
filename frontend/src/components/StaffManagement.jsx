import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from './DashboardLayout';
import API_BASE_URL from '../config/api';
import {
  Users, Plus, Edit2, Trash2, X, Save, Search,
  AlertCircle, UserCheck, UserX, Shield, Briefcase, DollarSign
} from 'lucide-react';
import {
  PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const StaffManagement = () => {
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

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users', {
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
        ? `${API_BASE_URL}/auth/register'
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

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
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

    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentForm({});
    setErrors({});
    setApiError('');
  };

  const filteredStaff = staff.filter(member =>
    member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Visualization data
  const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  const roleDistribution = useMemo(() => {
    const roles = {};
    staff.forEach(member => {
      roles[member.role] = (roles[member.role] || 0) + 1;
    });
    return Object.entries(roles).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));
  }, [staff]);

  const departmentDistribution = useMemo(() => {
    const departments = {};
    staff.forEach(member => {
      const dept = member.department || 'None';
      departments[dept] = (departments[dept] || 0) + 1;
    });
    return Object.entries(departments).map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      count
    }));
  }, [staff]);

  const activeStaffCount = useMemo(() => staff.filter(m => m.status === 'active').length, [staff]);
  const inactiveStaffCount = useMemo(() => staff.filter(m => m.status === 'inactive').length, [staff]);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">

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

        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="text-blue-800 font-semibold mb-1">Staff Account Creation</h3>
              <p className="text-blue-700 text-sm">
                Only Admins can create Staff, Manager, and Cashier accounts. Public signup is restricted to Customer accounts only.
                Use the "Add Staff" button below to create new employee accounts.
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button
              onClick={() => openModal('add')}
              className="flex items-center gap-2 px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              <Plus size={20} />
              Add Staff
            </button>
          </div>
        </div>

        {/* Staff Analytics */}
        <div className="space-y-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800">Staff Analytics</h3>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-6 rounded-xl shadow-lg text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Total Staff</h3>
                <Users size={24} />
              </div>
              <p className="text-4xl font-bold">{staff.length}</p>
              <p className="text-sm mt-2 opacity-90">All employees</p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Active</h3>
                <UserCheck size={24} />
              </div>
              <p className="text-4xl font-bold">{activeStaffCount}</p>
              <p className="text-sm mt-2 opacity-90">Currently working</p>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl shadow-lg text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Inactive</h3>
                <UserX size={24} />
              </div>
              <p className="text-4xl font-bold">{inactiveStaffCount}</p>
              <p className="text-sm mt-2 opacity-90">Not working</p>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Departments</h3>
                <Briefcase size={24} />
              </div>
              <p className="text-4xl font-bold">{departmentDistribution.length}</p>
              <p className="text-sm mt-2 opacity-90">Active departments</p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Role Distribution */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield size={20} className="text-sky-500" />
                Role Distribution
              </h3>
              {roleDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={roleDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {roleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-gray-500">No staff data available</div>
              )}
            </div>

            {/* Department Distribution */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-blue-500" />
                Department Distribution
              </h3>
              {departmentDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-gray-500">No department data available</div>
              )}
            </div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((member, index) => (
                    <tr key={member._id || index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{member.phone}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          member.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                          member.role === 'manager' ? 'bg-blue-100 text-blue-700' :
                          member.role === 'cashier' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{member.department || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => toggleStatus(member._id, member.status)}
                          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                            member.status === 'active'
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          {member.status === 'active' ? <UserCheck size={14} /> : <UserX size={14} />}
                          {member.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal('edit', member)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(member._id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredStaff.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No staff members found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {modalMode === 'add' ? 'Add New Staff' : 'Edit Staff'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            {apiError && (
              <div className="mx-6 mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-2">
                <AlertCircle size={20} />
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={currentForm.name || ''}
                    onChange={(e) => setCurrentForm({ ...currentForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={currentForm.email || ''}
                    onChange={(e) => setCurrentForm({ ...currentForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                {modalMode === 'add' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                    <input
                      type="password"
                      value={currentForm.password || ''}
                      onChange={(e) => setCurrentForm({ ...currentForm, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required={modalMode === 'add'}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={currentForm.phone || ''}
                    onChange={(e) => setCurrentForm({ ...currentForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <select
                    value={currentForm.role || 'staff'}
                    onChange={(e) => setCurrentForm({ ...currentForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="cashier">Cashier</option>
                    <option value="staff">Staff</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    value={currentForm.department || 'none'}
                    onChange={(e) => setCurrentForm({ ...currentForm, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="none">None</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="counter">Counter</option>
                    <option value="management">Management</option>
                    <option value="inventory">Inventory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    value={currentForm.employeeId || ''}
                    onChange={(e) => setCurrentForm({ ...currentForm, employeeId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="e.g., EMP001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={currentForm.status || 'active'}
                    onChange={(e) => setCurrentForm({ ...currentForm, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  <Save size={18} />
                  {modalMode === 'add' ? 'Add Staff' : 'Update Staff'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StaffManagement;
