// CanteenManagement.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from './DashboardLayout';
import API_BASE_URL from '../config/api';
import ConfirmationModal from './Shared/ConfirmationModal';
import {
  Search, Plus, Edit2, Trash2, X, Save,
  ShoppingCart, UtensilsCrossed, Package, AlertCircle, Truck, Filter, ArrowUpDown
} from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer
} from 'recharts';
import OrderForm from './Orders/OrderForm';
import MenuForm from './Menu/MenuForm';
import InventoryForm from './Inventory/InventoryForm';
const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#ef4444'];

const CanteenManagement = ({ section = 'orders', showTabs = false }) => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState(section);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentForm, setCurrentForm] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  // Filter and sort states for Inventory
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  // Filter and sort states for Menu
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [menuSortBy, setMenuSortBy] = useState('name-asc');
  // Filter and sort states for Orders
  const [statusFilter, setStatusFilter] = useState('all');
  const [orderTypeFilter, setOrderTypeFilter] = useState('all');
  const [orderSortBy, setOrderSortBy] = useState('date-desc');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Confirmation modal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setApiError('');
      if (activeTab === 'orders') {
        const response = await fetch(`${API_BASE_URL}/orders`);
        const data = await response.json();
        setOrders(data);
      } else if (activeTab === 'menu') {
        const response = await fetch(`${API_BASE_URL}/menu`);
        const data = await response.json();
        console.log('Fetched menu items:', data);
        console.log('First item discount:', data[0]?.discount);
        setMenuItems(data);
      } else if (activeTab === 'inventory') {
        // Fetch inventory and suppliers in parallel
        const [inventoryRes, suppliersRes] = await Promise.all([
          fetch(`${API_BASE_URL}/inventory`),
          fetch(`${API_BASE_URL}/suppliers`)
        ]);

        const inventoryData = await inventoryRes.json();
        const suppliersData = await suppliersRes.json();

        setInventory(inventoryData);
        // Ensure suppliers is always an array
        setSuppliers(Array.isArray(suppliersData) ? suppliersData : []);

        // Calculate low stock items (quantity < 20)
        const lowStock = inventoryData.filter(item => item.quantity < 20);
        setLowStockItems(lowStock);
      }
    } catch (error) {
      setApiError('Failed to fetch data. Please ensure the backend server is running.');
      console.error('Error fetching data:', error);
    }
  }, [activeTab]);

  // Update activeTab when section prop changes
  useEffect(() => {
    setActiveTab(section);
  }, [section]);

  // Fetch data on mount and when activeTab changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Validation functions
  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validateNumber = (num) => !isNaN(num) && num > 0;

  const validateForm = () => {
    const newErrors = {};

    if (activeTab === 'orders') {
      if (!currentForm.customerName || !validateName(currentForm.customerName)) {
        newErrors.customerName = 'Customer name should contain only letters';
      }
      if (!currentForm.customerEmail || !validateEmail(currentForm.customerEmail)) {
        newErrors.customerEmail = 'Invalid email format';
      }
      if (!currentForm.customerPhone || !validatePhone(currentForm.customerPhone)) {
        newErrors.customerPhone = 'Phone number must be 10 digits';
      }
      if (!currentForm.orderType) {
        newErrors.orderType = 'Order type is required';
      }
    } else if (activeTab === 'menu') {
      if (!currentForm.itemName || !validateName(currentForm.itemName)) {
        newErrors.itemName = 'Item name should contain only letters';
      }
      if (!currentForm.category) {
        newErrors.category = 'Category is required';
      }
      if (!currentForm.price || !validateNumber(currentForm.price)) {
        newErrors.price = 'Price must be a positive number';
      }
    } else if (activeTab === 'inventory') {
      if (!currentForm.itemName || !validateName(currentForm.itemName)) {
        newErrors.itemName = 'Item name should contain only letters';
      }
      if (!currentForm.quantity || !validateNumber(currentForm.quantity)) {
        newErrors.quantity = 'Quantity must be a positive number';
      }
      if (!currentForm.unit) {
        newErrors.unit = 'Unit is required';
      }
      if (!currentForm.supplier) {
        newErrors.supplier = 'Supplier is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setApiError('You must be logged in to perform this action. Please refresh and try again.');
      return;
    }

    if (!validateForm()) {
      setApiError('Please fix the validation errors before submitting.');
      return;
    }

    try {
      setApiError('');
      const endpoint = activeTab === 'orders' ? '/orders' : activeTab === 'menu' ? '/menu' : '/inventory';
      const method = modalMode === 'add' ? 'POST' : 'PUT';
      const url = modalMode === 'add' ? `${API_BASE_URL}${endpoint}` : `${API_BASE_URL}${endpoint}/${currentForm._id}`;

      console.log('Submitting to:', url);
      console.log('Method:', method);
      console.log('Data:', currentForm);

      // Add user tracking information
      const dataToSend = {
        ...currentForm,
        ...(modalMode === 'add' ? { createdBy: user?._id } : { updatedBy: user?._id })
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const savedData = await response.json();
      console.log('Saved data:', savedData);

      setSuccessMessage(`${modalMode === 'add' ? 'Added' : 'Updated'} successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);

      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error saving data:', error);
      setApiError(`Failed to save: ${error.message}`);
    }
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    if (!token) {
      setApiError('You must be logged in to perform this action.');
      return;
    }

    try {
      setApiError('');
      const endpoint = activeTab === 'orders' ? '/orders' : activeTab === 'menu' ? '/menu' : '/inventory';

      const response = await fetch(`${API_BASE_URL}${endpoint}/${itemToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccessMessage('Deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
      setApiError(`Failed to delete: ${error.message}`);
    } finally {
      setItemToDelete(null);
    }
  };

  const openModal = (mode, item = {}) => {
    setModalMode(mode);
    setApiError('');

    if (mode === 'add') {
      if (activeTab === 'orders') {
        setCurrentForm({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          items: [],
          orderType: 'online',
          status: 'pending',
          totalAmount: 0
        });
      } else if (activeTab === 'menu') {
        setCurrentForm({
          itemName: '',
          category: 'snacks',
          price: '',
          description: '',
          allergens: '',
          available: true
        });
      } else {
        setCurrentForm({
          itemName: '',
          quantity: '',
          unit: 'kg',
          supplier: '',
          expiryDate: '',
          batchNumber: ''
        });
      }
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

  const filteredData = () => {
    const data = activeTab === 'orders' ? orders : activeTab === 'menu' ? menuItems : inventory;

    // Safety check: return empty array if data is undefined/null
    if (!data || !Array.isArray(data)) {
      return [];
    }

    let filtered = data.filter(item => {
      const searchStr = searchTerm.toLowerCase();

      if (activeTab === 'orders') {
        // Orders filtering
        const matchesSearch = item.customerName?.toLowerCase().includes(searchStr) ||
               item.customerEmail?.toLowerCase().includes(searchStr) ||
               item.customerPhone?.includes(searchStr);
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
        const matchesOrderType = orderTypeFilter === 'all' || item.orderType === orderTypeFilter;
        return matchesSearch && matchesStatus && matchesOrderType;

      } else if (activeTab === 'menu') {
        // Menu filtering
        const matchesSearch = item.itemName?.toLowerCase().includes(searchStr) ||
               item.category?.toLowerCase().includes(searchStr);
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
        const matchesAvailability = availabilityFilter === 'all' ||
               (availabilityFilter === 'available' && item.available) ||
               (availabilityFilter === 'unavailable' && !item.available);
        return matchesSearch && matchesCategory && matchesAvailability;

      } else {
        // Inventory specific filters
        const matchesSearch = item.itemName?.toLowerCase().includes(searchStr) ||
               item.supplier?.toLowerCase().includes(searchStr);
        const matchesSupplier = supplierFilter === 'all' || item.supplier === supplierFilter;
        const matchesStock = stockFilter === 'all' ||
               (stockFilter === 'low' && item.quantity < 20) ||
               (stockFilter === 'normal' && item.quantity >= 20);
        return matchesSearch && matchesSupplier && matchesStock;
      }
    });

    // Apply sorting
    if (activeTab === 'inventory' && sortBy) {
      filtered = filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return (a.itemName || '').localeCompare(b.itemName || '');
          case 'name-desc':
            return (b.itemName || '').localeCompare(a.itemName || '');
          case 'quantity-asc':
            return (a.quantity || 0) - (b.quantity || 0);
          case 'quantity-desc':
            return (b.quantity || 0) - (a.quantity || 0);
          case 'supplier-asc':
            return (a.supplier || '').localeCompare(b.supplier || '');
          case 'supplier-desc':
            return (b.supplier || '').localeCompare(a.supplier || '');
          default:
            return 0;
        }
      });
    } else if (activeTab === 'menu' && menuSortBy) {
      filtered = filtered.sort((a, b) => {
        switch (menuSortBy) {
          case 'name-asc':
            return (a.itemName || '').localeCompare(b.itemName || '');
          case 'name-desc':
            return (b.itemName || '').localeCompare(a.itemName || '');
          case 'price-asc':
            return (a.price || 0) - (b.price || 0);
          case 'price-desc':
            return (b.price || 0) - (a.price || 0);
          case 'category-asc':
            return (a.category || '').localeCompare(b.category || '');
          case 'category-desc':
            return (b.category || '').localeCompare(a.category || '');
          default:
            return 0;
        }
      });
    } else if (activeTab === 'orders' && orderSortBy) {
      filtered = filtered.sort((a, b) => {
        switch (orderSortBy) {
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
    }

    return filtered;
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount.type === 'none' || !discount.value) return price;

    if (discount.type === 'percentage') {
      return price - (price * discount.value / 100);
    } else if (discount.type === 'fixed') {
      return Math.max(0, price - discount.value);
    }
    return price;
  };

  // Group data by category (for Menu)
  const groupByCategory = () => {
    const filtered = filteredData();
    const grouped = {};

    filtered.forEach(item => {
      const category = item.category || 'Uncategorized';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });

    return grouped;
  };

  // Group data by supplier (for Inventory)
  const groupBySupplier = () => {
    const filtered = filteredData();
    const grouped = {};

    filtered.forEach(item => {
      const supplier = item.supplier || 'Unknown Supplier';
      if (!grouped[supplier]) {
        grouped[supplier] = [];
      }
      grouped[supplier].push(item);
    });

    return grouped;
  };

  // Group data by status and order type (for Orders)
  const groupByStatusAndType = () => {
    const filtered = filteredData();
    const grouped = {
      status: {},
      type: {}
    };

    filtered.forEach(item => {
      const status = item.status || 'pending';
      const orderType = item.orderType || 'dine-in';

      if (!grouped.status[status]) {
        grouped.status[status] = [];
      }
      if (!grouped.type[orderType]) {
        grouped.type[orderType] = [];
      }

      grouped.status[status].push(item);
      grouped.type[orderType].push(item);
    });

    return grouped;
  };

  // === Visualization logic (from other file) ===
  const categoryData = React.useMemo(() => {
    const categories = {};
    menuItems.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + 1;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [menuItems]);

  const priceData = React.useMemo(() => {
    const ranges = {
      '₹0-50': 0,
      '₹51-100': 0,
      '₹101-150': 0,
      '₹150+': 0
    };
    menuItems.forEach(item => {
      if (item.price <= 50) ranges['₹0-50']++;
      else if (item.price <= 100) ranges['₹51-100']++;
      else if (item.price <= 150) ranges['₹101-150']++;
      else ranges['₹150+']++;
    });
    return Object.entries(ranges).map(([name, items]) => ({ name, items }));
  }, [menuItems]);

  const orderStatusData = React.useMemo(() => {
    const statuses = {};
    orders.forEach(order => {
      statuses[order.status] = (statuses[order.status] || 0) + 1;
    });
    return Object.entries(statuses).map(([name, value]) => ({ name, value }));
  }, [orders]);

  const inventoryAlertData = React.useMemo(() => {
    return inventory.filter(item => item.quantity < 20);
  }, [inventory]);

  // Low stock visualization data
  const lowStockVisualizationData = React.useMemo(() => {
    const lowStockBySupplier = {};
    inventory.forEach(item => {
      if (item.quantity < 20) {
        const supplier = item.supplier || 'Unknown';
        if (!lowStockBySupplier[supplier]) {
          lowStockBySupplier[supplier] = {
            supplier,
            items: [],
            count: 0
          };
        }
        lowStockBySupplier[supplier].items.push(item);
        lowStockBySupplier[supplier].count++;
      }
    });
    return Object.values(lowStockBySupplier);
  }, [inventory]);

  const averagePrice = React.useMemo(() => {
    if (menuItems.length === 0) return 0;
    const total = menuItems.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
    return (total / menuItems.length).toFixed(2);
  }, [menuItems]);

  const totalRevenue = React.useMemo(() => {
    return orders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + parseFloat(order.totalAmount || 0), 0)
      .toFixed(2);
  }, [orders]);

  // Order type distribution
  const orderTypeData = React.useMemo(() => {
    const types = {};
    orders.forEach(order => {
      types[order.orderType] = (types[order.orderType] || 0) + 1;
    });
    return Object.entries(types).map(([name, value]) => ({ name, value }));
  }, [orders]);

  // Supplier distribution
  const supplierData = React.useMemo(() => {
    const suppliers = {};
    inventory.forEach(item => {
      suppliers[item.supplier] = (suppliers[item.supplier] || 0) + 1;
    });
    return Object.entries(suppliers).map(([name, value]) => ({ name, value }));
  }, [inventory]);

  // Tab-specific visualizations
  const renderOrdersVisualization = () => (
    <div className="space-y-6 mt-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Orders Analytics</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-4xl font-bold">₹{totalRevenue}</p>
          <p className="text-sm mt-2">From completed orders</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-4xl font-bold">{orders.length}</p>
          <p className="text-sm mt-2">All time orders</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Average Order</h3>
          <p className="text-4xl font-bold">
            ₹{orders.length > 0 ? (orders.reduce((sum, o) => sum + parseFloat(o.totalAmount || 0), 0) / orders.length).toFixed(2) : 0}
          </p>
          <p className="text-sm mt-2">Per order value</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Status Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Order Status Distribution</h3>
          {orderStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">No order data available</div>
          )}
        </div>

        {/* Order Type Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Order Type Distribution</h3>
          {orderTypeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">No order data available</div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMenuVisualization = () => (
    <div className="space-y-6 mt-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Menu Analytics</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Total Items</h3>
          <p className="text-4xl font-bold">{menuItems.length}</p>
          <p className="text-sm mt-2">Active menu items</p>
        </div>

        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Average Price</h3>
          <p className="text-4xl font-bold">₹{averagePrice}</p>
          <p className="text-sm mt-2">Across all items</p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Highest Price</h3>
          <p className="text-4xl font-bold">
            ₹{menuItems.length > 0 ? Math.max(...menuItems.map(item => parseFloat(item.price || 0))) : 0}
          </p>
          <p className="text-sm mt-2">Most expensive</p>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Lowest Price</h3>
          <p className="text-4xl font-bold">
            ₹{menuItems.length > 0 ? Math.min(...menuItems.map(item => parseFloat(item.price || 0))) : 0}
          </p>
          <p className="text-sm mt-2">Most affordable</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Category Distribution</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">No menu data available</div>
          )}
        </div>

        {/* Price Range Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Price Range Distribution</h3>
          {priceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="items" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">No menu data available</div>
          )}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Category Breakdown</h3>
        <div className="space-y-3">
          {categoryData.map((cat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 capitalize">{cat.name}</span>
                  <span className="text-sm text-gray-600">{cat.value} items</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(cat.value / (menuItems.length || 1)) * 100}%`,
                      backgroundColor: COLORS[index % COLORS.length]
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInventoryVisualization = () => (
    <div className="space-y-6 mt-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Inventory Analytics</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Total Items</h3>
          <p className="text-4xl font-bold">{inventory.length}</p>
          <p className="text-sm mt-2">In stock</p>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Low Stock</h3>
          <p className="text-4xl font-bold">{inventoryAlertData.length}</p>
          <p className="text-sm mt-2">Items need reorder</p>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-xl shadow-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Suppliers</h3>
          <p className="text-4xl font-bold">{suppliers.length}</p>
          <p className="text-sm mt-2">Active suppliers</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Inventory Distribution by Supplier</h3>
          {supplierData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={supplierData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {supplierData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">No inventory data available</div>
          )}
        </div>

        {/* Low Stock Visualization */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle className="text-red-500" size={20} />
            Low Stock by Supplier
          </h3>
          {lowStockVisualizationData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lowStockVisualizationData.map(d => ({ name: d.supplier, count: d.count }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const supplierData = lowStockVisualizationData.find(d => d.supplier === payload[0].payload.name);
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                          <p className="font-semibold text-gray-800">{payload[0].payload.name}</p>
                          <p className="text-red-600 font-bold">{payload[0].value} items low on stock</p>
                          {supplierData && (
                            <div className="mt-2 text-xs text-gray-600">
                              {supplierData.items.slice(0, 3).map((item, idx) => (
                                <div key={idx}>{item.itemName} ({item.quantity} {item.unit})</div>
                              ))}
                              {supplierData.items.length > 3 && <div>+{supplierData.items.length - 3} more</div>}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Package size={48} className="mx-auto mb-2 opacity-50" />
              <p>All inventory levels are sufficient</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ---- Component JSX including tabs, search, table, modal + analytics ----
  return (
    <DashboardLayout>
      <div className="p-6">

        {/* Error/Success Messages */}
        {apiError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <div>
              <p className="font-bold">Error</p>
              <p>{apiError}</p>
            </div>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <div>{successMessage}</div>
          </div>
        )}

        {/* Tabs & Controls */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          {showTabs && (
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'orders'
                    ? 'border-b-2 border-sky-500 text-sky-600'
                    : 'text-gray-500 hover:text-sky-500'
                }`}
              >
                <ShoppingCart size={20} />
                Order Management
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'menu'
                    ? 'border-b-2 border-sky-500 text-sky-600'
                    : 'text-gray-500 hover:text-sky-500'
                }`}
              >
                <UtensilsCrossed size={20} />
                Menu Management
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'inventory'
                    ? 'border-b-2 border-sky-500 text-sky-600'
                    : 'text-gray-500 hover:text-sky-500'
                }`}
              >
                <Package size={20} />
                Inventory Management
              </button>
            </div>
          )}

          {/* Search and Add Button */}
          <div className="p-6 pb-4 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search..."
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
            <button
              onClick={() => openModal('add')}
              className="flex items-center gap-2 px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              <Plus size={20} />
              {activeTab === 'orders' ? 'New Order' : 'Add New'}
            </button>
          </div>

          {/* Filters and Sort (Menu) */}
          {activeTab === 'menu' && (
            <div className="px-6 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Filter size={16} />
                    Filter by Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="snacks">Snacks</option>
                    <option value="beverages">Beverages</option>
                    <option value="meals">Meals</option>
                    <option value="desserts">Desserts</option>
                    <option value="breakfast">Breakfast</option>
                  </select>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Filter size={16} />
                    Filter by Availability
                  </label>
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="all">All Items</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <ArrowUpDown size={16} />
                    Sort By
                  </label>
                  <select
                    value={menuSortBy}
                    onChange={(e) => setMenuSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="category-asc">Category: A to Z</option>
                    <option value="category-desc">Category: Z to A</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(categoryFilter !== 'all' || availabilityFilter !== 'all') && (
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {categoryFilter !== 'all' && (
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1">
                      Category: {categoryFilter}
                      <button onClick={() => setCategoryFilter('all')} className="hover:bg-sky-200 rounded-full p-0.5">
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {availabilityFilter !== 'all' && (
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1">
                      {availabilityFilter === 'available' ? 'Available' : 'Unavailable'}
                      <button onClick={() => setAvailabilityFilter('all')} className="hover:bg-sky-200 rounded-full p-0.5">
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setCategoryFilter('all');
                      setAvailabilityFilter('all');
                    }}
                    className="text-sm text-sky-600 hover:text-sky-800 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Filters and Sort (Orders) */}
          {activeTab === 'orders' && (
            <div className="px-6 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Filter size={16} />
                    Filter by Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Order Type Filter */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Filter size={16} />
                    Filter by Order Type
                  </label>
                  <select
                    value={orderTypeFilter}
                    onChange={(e) => setOrderTypeFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="all">All Types</option>
                    <option value="dine-in">Dine-In</option>
                    <option value="takeaway">Takeaway</option>
                    <option value="delivery">Delivery</option>
                    <option value="online">Online</option>
                    <option value="counter">Counter</option>
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <ArrowUpDown size={16} />
                    Sort By
                  </label>
                  <select
                    value={orderSortBy}
                    onChange={(e) => setOrderSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="date-desc">Date: Newest First</option>
                    <option value="date-asc">Date: Oldest First</option>
                    <option value="total-desc">Total: High to Low</option>
                    <option value="total-asc">Total: Low to High</option>
                    <option value="customer-asc">Customer: A to Z</option>
                    <option value="customer-desc">Customer: Z to A</option>
                    <option value="status">Status (Pending → Completed)</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(statusFilter !== 'all' || orderTypeFilter !== 'all') && (
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {statusFilter !== 'all' && (
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1 capitalize">
                      Status: {statusFilter}
                      <button onClick={() => setStatusFilter('all')} className="hover:bg-sky-200 rounded-full p-0.5">
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {orderTypeFilter !== 'all' && (
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1 capitalize">
                      Type: {orderTypeFilter}
                      <button onClick={() => setOrderTypeFilter('all')} className="hover:bg-sky-200 rounded-full p-0.5">
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setStatusFilter('all');
                      setOrderTypeFilter('all');
                    }}
                    className="text-sm text-sky-600 hover:text-sky-800 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Filters and Sort (Inventory Only) */}
          {activeTab === 'inventory' && (
            <div className="px-6 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Supplier Filter */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Filter size={16} />
                    Filter by Supplier
                  </label>
                  <select
                    value={supplierFilter}
                    onChange={(e) => setSupplierFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="all">All Suppliers</option>
                    {Array.isArray(suppliers) && suppliers.map((supplier, idx) => (
                      <option key={idx} value={supplier.name}>{supplier.name}</option>
                    ))}
                  </select>
                </div>

                {/* Stock Level Filter */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Filter size={16} />
                    Filter by Stock Level
                  </label>
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="all">All Stock Levels</option>
                    <option value="low">Low Stock (Below 20)</option>
                    <option value="normal">Normal Stock (20+)</option>
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <ArrowUpDown size={16} />
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="quantity-asc">Quantity: Low to High</option>
                    <option value="quantity-desc">Quantity: High to Low</option>
                    <option value="supplier-asc">Supplier: A to Z</option>
                    <option value="supplier-desc">Supplier: Z to A</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(supplierFilter !== 'all' || stockFilter !== 'all') && (
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {supplierFilter !== 'all' && (
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1">
                      Supplier: {supplierFilter}
                      <button
                        onClick={() => setSupplierFilter('all')}
                        className="hover:bg-sky-200 rounded-full p-0.5"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {stockFilter !== 'all' && (
                    <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm flex items-center gap-1">
                      {stockFilter === 'low' ? 'Low Stock' : 'Normal Stock'}
                      <button
                        onClick={() => setStockFilter('all')}
                        className="hover:bg-sky-200 rounded-full p-0.5"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSupplierFilter('all');
                      setStockFilter('all');
                    }}
                    className="text-sm text-sky-600 hover:text-sky-800 font-medium"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Low Stock Alerts (Inventory Only) */}
          {activeTab === 'inventory' && lowStockItems.length > 0 && (
            <div className="px-6 pb-4">
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={24} />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-800 mb-2">Low Stock Alert</h4>
                    <p className="text-sm text-red-700 mb-3">
                      {lowStockItems.length} item{lowStockItems.length > 1 ? 's are' : ' is'} running low on stock (below 20 units)
                    </p>
                    <div className="space-y-2">
                      {lowStockItems.slice(0, 5).map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-2 text-sm">
                          <span className="font-medium text-gray-900">{item.itemName}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-red-600 font-semibold">
                              {item.quantity} {item.unit}
                            </span>
                            <span className="text-gray-600">• {item.supplier}</span>
                          </div>
                        </div>
                      ))}
                      {lowStockItems.length > 5 && (
                        <p className="text-sm text-red-600 font-medium">
                          + {lowStockItems.length - 5} more items
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Suppliers Section (Inventory Only) */}
          {activeTab === 'inventory' && suppliers.length > 0 && (
            <div className="px-6 pb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Truck size={20} />
                  Active Suppliers ({suppliers.length})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {suppliers.slice(0, 8).map((supplier, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 border border-blue-100">
                      <p className="font-medium text-gray-900 text-sm truncate">{supplier.name}</p>
                      <p className="text-xs text-gray-600 truncate">{supplier.contact || 'N/A'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Data Table */}
          <div className="px-6 pb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {activeTab === 'orders' && (
                      <>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </>
                    )}
                    {activeTab === 'menu' && (
                      <>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Item Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Allergens</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Available</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </>
                    )}
                    {activeTab === 'inventory' && (
                      <>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Item Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Unit</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Supplier</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Expiry Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {/* MENU - Grouped by Category */}
                  {activeTab === 'menu' && Object.entries(groupByCategory()).map(([category, items]) => (
                    <React.Fragment key={category}>
                      <tr className="bg-sky-50">
                        <td colSpan="6" className="px-4 py-2 font-bold text-sky-800 text-sm uppercase tracking-wide">
                          {category} ({items.length} items)
                        </td>
                      </tr>
                      {items.map((item, index) => (
                        <tr key={item._id || index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">{item.itemName}</td>
                          <td className="px-4 py-3 text-sm capitalize">{item.category}</td>
                          <td className="px-4 py-3 text-sm">
                            {item.discount && item.discount.type !== 'none' && item.discount.value > 0 ? (
                              <div>
                                <div className="text-xs text-gray-400 line-through">₹{item.price.toFixed(2)}</div>
                                <div className="text-green-600 font-bold">₹{calculateDiscountedPrice(item.price, item.discount).toFixed(2)}</div>
                                <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-semibold">
                                  {item.discount.type === 'percentage' ? `${item.discount.value}% OFF` : `₹${item.discount.value} OFF`}
                                </span>
                              </div>
                            ) : (
                              <>₹{item.price.toFixed(2)}</>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">{item.allergens || 'None'}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              item.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {item.available ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openModal('edit', item)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}

                  {/* INVENTORY - Grouped by Supplier */}
                  {activeTab === 'inventory' && Object.entries(groupBySupplier()).map(([supplier, items]) => {
                    const lowStockInGroup = items.filter(item => item.quantity < 20).length;
                    return (
                      <React.Fragment key={supplier}>
                        <tr className="bg-blue-50">
                          <td colSpan="6" className="px-4 py-2 font-bold text-blue-800 text-sm uppercase tracking-wide">
                            <div className="flex items-center gap-2">
                              <Truck size={16} />
                              {supplier} ({items.length} items)
                              {lowStockInGroup > 0 && (
                                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                  {lowStockInGroup} Low Stock
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                        {items.map((item, index) => (
                          <tr key={item._id || index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">
                              <div className="flex items-center gap-2">
                                {item.itemName}
                                {item.quantity < 20 && (
                                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                                    Low Stock
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span className={item.quantity < 20 ? 'text-red-600 font-semibold' : ''}>
                                {item.quantity}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm">{item.unit}</td>
                            <td className="px-4 py-3 text-sm">{item.supplier}</td>
                            <td className="px-4 py-3 text-sm">{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}</td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => openModal('edit', item)}
                                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}

                  {/* ORDERS - Grouped by Status, then by Type */}
                  {activeTab === 'orders' && (() => {
                    const groupedData = groupByStatusAndType();
                    return Object.entries(groupedData.status).map(([status, statusItems]) => (
                      <React.Fragment key={status}>
                        <tr className="bg-purple-50">
                          <td colSpan="7" className="px-4 py-2 font-bold text-purple-800 text-sm uppercase tracking-wide">
                            Status: {status} ({statusItems.length} orders)
                          </td>
                        </tr>
                        {/* Group by order type within status */}
                        {Object.entries(
                          statusItems.reduce((acc, item) => {
                            const type = item.orderType || 'dine-in';
                            if (!acc[type]) acc[type] = [];
                            acc[type].push(item);
                            return acc;
                          }, {})
                        ).map(([orderType, typeItems]) => (
                          <React.Fragment key={`${status}-${orderType}`}>
                            <tr className="bg-green-50">
                              <td colSpan="7" className="px-4 py-1.5 font-semibold text-green-800 text-xs uppercase pl-8">
                                ↳ {orderType} ({typeItems.length})
                              </td>
                            </tr>
                            {typeItems.map((item, index) => (
                              <tr key={item._id || index} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">{item.customerName}</td>
                                <td className="px-4 py-3 text-sm">{item.customerEmail}</td>
                                <td className="px-4 py-3 text-sm">{item.customerPhone}</td>
                                <td className="px-4 py-3 text-sm capitalize">{item.orderType}</td>
                                <td className="px-4 py-3 text-sm">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    item.status === 'completed' ? 'bg-green-100 text-green-700' :
                                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-sm">₹{item.totalAmount || 0}</td>
                                <td className="px-4 py-3 text-sm">
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => openModal('edit', item)}
                                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                    >
                                      <Edit2 size={16} />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(item._id)}
                                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ));
                  })()}

                  {/* OLD FLAT VIEW - REMOVED */}
                  {false && filteredData().map((item, index) => (
                    <tr key={item._id || index} className="border-b hover:bg-gray-50">
                      {activeTab === 'orders' && (
                        <>
                          <td className="px-4 py-3 text-sm">{item.customerName}</td>
                          <td className="px-4 py-3 text-sm">{item.customerEmail}</td>
                          <td className="px-4 py-3 text-sm">{item.customerPhone}</td>
                          <td className="px-4 py-3 text-sm capitalize">{item.orderType}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              item.status === 'completed' ? 'bg-green-100 text-green-700' :
                              item.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">₹{item.totalAmount || 0}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openModal('edit', item)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                      {activeTab === 'menu' && (
                        <>
                          <td className="px-4 py-3 text-sm">{item.itemName}</td>
                          <td className="px-4 py-3 text-sm capitalize">{item.category}</td>
                          <td className="px-4 py-3 text-sm">
                            {item.discount && item.discount.type !== 'none' && item.discount.value > 0 ? (
                              <div>
                                <div className="text-xs text-gray-400 line-through">₹{item.price.toFixed(2)}</div>
                                <div className="text-green-600 font-bold">₹{calculateDiscountedPrice(item.price, item.discount).toFixed(2)}</div>
                                <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-semibold">
                                  {item.discount.type === 'percentage' ? `${item.discount.value}% OFF` : `₹${item.discount.value} OFF`}
                                </span>
                              </div>
                            ) : (
                              <>₹{item.price.toFixed(2)}</>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">{item.allergens || 'None'}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              item.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {item.available ? 'Yes' : 'No'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openModal('edit', item)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                      {activeTab === 'inventory' && (
                        <>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center gap-2">
                              {item.itemName}
                              {item.quantity < 20 && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                                  Low Stock
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className={item.quantity < 20 ? 'text-red-600 font-semibold' : ''}>
                              {item.quantity}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">{item.unit}</td>
                          <td className="px-4 py-3 text-sm">{item.supplier}</td>
                          <td className="px-4 py-3 text-sm">{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openModal('edit', item)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredData().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No data found. Click "Add New" to create an entry.
                </div>
              )}
              {activeTab === 'menu' && Object.keys(groupByCategory()).length === 0 && menuItems.length > 0 && (
                <div className="text-center py-8 text-gray-500">
                  No items match your search.
                </div>
              )}
              {activeTab === 'inventory' && Object.keys(groupBySupplier()).length === 0 && inventory.length > 0 && (
                <div className="text-center py-8 text-gray-500">
                  No items match your search.
                </div>
              )}
              {activeTab === 'orders' && Object.keys(groupByStatusAndType().status).length === 0 && orders.length > 0 && (
                <div className="text-center py-8 text-gray-500">
                  No orders match your search.
                </div>
              )}
            </div>
          </div>

          {/* Tab-Specific Visualizations */}
          <div className="px-6 pb-6">
            {activeTab === 'orders' && orders.length > 0 && renderOrdersVisualization()}
            {activeTab === 'menu' && menuItems.length > 0 && renderMenuVisualization()}
            {activeTab === 'inventory' && inventory.length > 0 && renderInventoryVisualization()}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {modalMode === 'add' ? 'Add New' : 'Edit'} {
                  activeTab === 'orders' ? 'Order' :
                  activeTab === 'menu' ? 'Menu Item' : 'Inventory Item'
                }
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
              {activeTab === 'orders' && (
                <OrderForm
                  currentForm={currentForm}
                  setCurrentForm={setCurrentForm}
                  errors={errors}
                  modalMode={modalMode}
                />
              )}

              {activeTab === 'menu' && (
                <MenuForm
                  currentForm={currentForm}
                  setCurrentForm={setCurrentForm}
                  errors={errors}
                />
              )}

              {activeTab === 'inventory' && (
                <InventoryForm
                  currentForm={currentForm}
                  setCurrentForm={setCurrentForm}
                  errors={errors}
                />
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  <Save size={18} />
                  {modalMode === 'add' ? 'Add' : 'Update'}
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        icon="danger"
      />
    </DashboardLayout>
  );
};

export default CanteenManagement;
