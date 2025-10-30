import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from './DashboardLayout';
import API_BASE_URL from '../config/api';
import MenuForm from './MenuForm';
import {
  UtensilsCrossed, Plus, Edit2, Trash2, X, Save, Search, AlertCircle
} from 'lucide-react';

const MenuManagement = () => {
  const { token, user } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentForm, setCurrentForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu`);
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      setApiError('Failed to fetch menu items');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Token:', token);
    console.log('User:', user);

    if (!token) {
      setApiError('You must be logged in to perform this action. Please refresh and try again.');
      return;
    }

    try {
      const url = modalMode === 'add'
        ? `${API_BASE_URL}/menu`
        : `${API_BASE_URL}/menu/${currentForm._id}`;

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
        setSuccessMessage(`Menu item ${modalMode === 'add' ? 'added' : 'updated'} successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchMenu();
        closeModal();
      } else {
        const errorData = await response.json();
        setApiError(`Failed to save: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      setApiError(`Operation failed: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setSuccessMessage('Menu item deleted!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchMenu();
      }
    } catch (error) {
      setApiError('Delete failed');
    }
  };

  const openModal = (mode, item = {}) => {
    setModalMode(mode);
    setCurrentForm(mode === 'add' ? {
      itemName: '',
      category: 'snacks',
      price: '',
      description: '',
      allergens: '',
      available: true
    } : { ...item });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentForm({});
    setErrors({});
  };

  const filteredMenu = menuItems.filter(item =>
    item.itemName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {apiError && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">{apiError}</div>}
        {successMessage && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg">{successMessage}</div>}

        <div className="bg-white rounded-xl shadow-lg mb-6 p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button
              onClick={() => openModal('add')}
              className="flex items-center gap-2 px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
            >
              <Plus size={20} /> Add Menu Item
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Item Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Allergens</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Available</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenu.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{item.itemName}</td>
                  <td className="px-6 py-4 capitalize">{item.category}</td>
                  <td className="px-6 py-4">₹{item.price}</td>
                  <td className="px-6 py-4">{item.allergens || 'None'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.available ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => openModal('edit', item)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{modalMode === 'add' ? 'Add' : 'Edit'} Menu Item</h2>
              <button onClick={closeModal}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <MenuForm
                currentForm={currentForm}
                setCurrentForm={setCurrentForm}
                errors={errors}
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

export default MenuManagement;
