import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from './DashboardLayout';
import API_BASE_URL from '../config/api';
import DiscountForm from './Discount/DiscountForm';
import ActiveDiscountsTab from './Discount/ActiveDiscountsTab';
import AllMenuItemsTab from './Discount/AllMenuItemsTab';
import MostOrderedTab from './Discount/MostOrderedTab';
import {
  Tag, TrendingUp, Clock, Package, X, AlertCircle,
  CheckCircle, RefreshCw, Filter, ArrowUpDown, Search,
  ChevronUp, ChevronDown, ShoppingCart
} from 'lucide-react';

const DiscountManagement = () => {
  const { token } = useAuth();
  const [discountedItems, setDiscountedItems] = useState([]);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [mostOrderedItems, setMostOrderedItems] = useState([]);
  const [showManualModal, setShowManualModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('discounted');

  // Filter and sort states
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expiryFilter, setExpiryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('discount-desc');

  // Search states for each tab
  const [discountedSearch, setDiscountedSearch] = useState('');
  const [allItemsSearch, setAllItemsSearch] = useState('');
  const [popularSearch, setPopularSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Auto-discount modal states
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [showExpiryModal, setShowExpiryModal] = useState(false);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [expiringItems, setExpiringItems] = useState([]);
  const [selectedLowStockIds, setSelectedLowStockIds] = useState([]);
  const [selectedExpiryIds, setSelectedExpiryIds] = useState([]);

  useEffect(() => {
    fetchDiscountedItems();
    fetchAllMenuItems();
    fetchMostOrderedItems();
  }, []);

  const fetchDiscountedItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/discounts/active`);
      const data = await response.json();
      setDiscountedItems(data);
    } catch (error) {
      setApiError('Failed to fetch discounted items');
    }
  };

  const fetchAllMenuItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu`);
      const data = await response.json();
      setAllMenuItems(data);
    } catch (error) {
      setApiError('Failed to fetch menu items');
    }
  };

  const fetchMostOrderedItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/analytics/most-ordered?limit=10&days=30`);
      const data = await response.json();
      setMostOrderedItems(data);
    } catch (error) {
      console.error('Failed to fetch most ordered items:', error);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([
      fetchDiscountedItems(),
      fetchAllMenuItems(),
      fetchMostOrderedItems()
    ]);
    setLoading(false);
    setSuccessMessage('Data refreshed successfully!');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const fetchLowStockItems = async () => {
    try {
      const items = allMenuItems.filter(item =>
        item.stockQuantity !== undefined && item.stockQuantity <= item.lowStockThreshold
      );

      // Sort: items without low_stock discount first, then items with low_stock discount
      const sortedItems = items.sort((a, b) => {
        const aHasDiscount = a.discount?.reason === 'low_stock' && a.discount?.value > 0;
        const bHasDiscount = b.discount?.reason === 'low_stock' && b.discount?.value > 0;

        if (aHasDiscount && !bHasDiscount) return 1;
        if (!aHasDiscount && bHasDiscount) return -1;
        return 0;
      });

      setLowStockItems(sortedItems);

      // Auto-select ALL items (both new and already discounted)
      const itemsToSelect = sortedItems.map(item => item._id);
      setSelectedLowStockIds(itemsToSelect);

      setShowLowStockModal(true);
    } catch (error) {
      setApiError('Failed to fetch low stock items');
    }
  };

  const fetchExpiringItems = async () => {
    try {
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

      const items = allMenuItems.filter(item => {
        if (!item.expiryDate) return false;
        const expiryDate = new Date(item.expiryDate);
        return expiryDate <= sevenDaysFromNow && expiryDate >= new Date();
      });

      // Sort: items without expiry discount first, then items with expiry discount
      const sortedItems = items.sort((a, b) => {
        const aHasDiscount = a.discount?.reason === 'expiry' && a.discount?.value > 0;
        const bHasDiscount = b.discount?.reason === 'expiry' && b.discount?.value > 0;

        if (aHasDiscount && !bHasDiscount) return 1;
        if (!aHasDiscount && bHasDiscount) return -1;
        return 0;
      });

      setExpiringItems(sortedItems);

      // Auto-select ALL items (both new and already discounted)
      const itemsToSelect = sortedItems.map(item => item._id);
      setSelectedExpiryIds(itemsToSelect);

      setShowExpiryModal(true);
    } catch (error) {
      setApiError('Failed to fetch expiring items');
    }
  };

  const handleAutoDiscountLowStock = async () => {
    if (selectedLowStockIds.length === 0) {
      setApiError('Please select at least one item');
      setTimeout(() => setApiError(''), 3000);
      return;
    }

    setLoading(true);
    try {
      let successCount = 0;
      let failCount = 0;

      // Apply discount to selected items
      for (const itemId of selectedLowStockIds) {
        try {
          const response = await fetch(`${API_BASE_URL}/menu/${itemId}/discount`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              discountType: 'percentage',
              discountValue: 15,
              reason: 'low_stock'
            })
          });

          if (response.ok) {
            successCount++;
          } else {
            failCount++;
          }
        } catch (error) {
          failCount++;
        }
      }

      // Remove discount from unselected items that have low_stock discount
      const itemsToRemoveDiscount = lowStockItems
        .filter(item => !selectedLowStockIds.includes(item._id) && item.discount?.reason === 'low_stock')
        .map(item => item._id);

      for (const itemId of itemsToRemoveDiscount) {
        try {
          await fetch(`${API_BASE_URL}/menu/${itemId}/discount`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        } catch (error) {
          console.error('Failed to remove discount:', error);
        }
      }

      setSuccessMessage(`Applied discounts to ${successCount} item(s)${failCount > 0 ? `, ${failCount} failed` : ''}`);
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchDiscountedItems();
      fetchAllMenuItems();
      setShowLowStockModal(false);
      setSelectedLowStockIds([]);
    } catch (error) {
      setApiError('Operation failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoDiscountExpiry = async () => {
    if (selectedExpiryIds.length === 0) {
      setApiError('Please select at least one item');
      setTimeout(() => setApiError(''), 3000);
      return;
    }

    setLoading(true);
    try {
      let successCount = 0;
      let failCount = 0;

      // Apply discount to selected items
      for (const itemId of selectedExpiryIds) {
        const item = expiringItems.find(i => i._id === itemId);
        if (!item) continue;

        const daysUntilExpiry = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
        let discountValue = 30;

        if (daysUntilExpiry <= 1) {
          discountValue = 70;
        } else if (daysUntilExpiry <= 3) {
          discountValue = 50;
        }

        try {
          const response = await fetch(`${API_BASE_URL}/menu/${itemId}/discount`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              discountType: 'percentage',
              discountValue: discountValue,
              reason: 'expiry'
            })
          });

          if (response.ok) {
            successCount++;
          } else {
            failCount++;
          }
        } catch (error) {
          failCount++;
        }
      }

      // Remove discount from unselected items that have expiry discount
      const itemsToRemoveDiscount = expiringItems
        .filter(item => !selectedExpiryIds.includes(item._id) && item.discount?.reason === 'expiry')
        .map(item => item._id);

      for (const itemId of itemsToRemoveDiscount) {
        try {
          await fetch(`${API_BASE_URL}/menu/${itemId}/discount`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        } catch (error) {
          console.error('Failed to remove discount:', error);
        }
      }

      setSuccessMessage(`Applied discounts to ${successCount} item(s)${failCount > 0 ? `, ${failCount} failed` : ''}`);
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchDiscountedItems();
      fetchAllMenuItems();
      setShowExpiryModal(false);
      setSelectedExpiryIds([]);
    } catch (error) {
      setApiError('Operation failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLowStockSelection = (itemId) => {
    setSelectedLowStockIds(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleExpirySelection = (itemId) => {
    setSelectedExpiryIds(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const toggleAllLowStock = () => {
    if (selectedLowStockIds.length === lowStockItems.length) {
      setSelectedLowStockIds([]);
    } else {
      setSelectedLowStockIds(lowStockItems.map(item => item._id));
    }
  };

  const toggleAllExpiry = () => {
    if (selectedExpiryIds.length === expiringItems.length) {
      setSelectedExpiryIds([]);
    } else {
      setSelectedExpiryIds(expiringItems.map(item => item._id));
    }
  };

  const openManualDiscountModal = (item) => {
    setSelectedItem(item);
    setShowManualModal(true);
  };

  const handleManualDiscountSubmit = async (discountData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/menu/${selectedItem._id}/discount`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(discountData)
      });

      if (response.ok) {
        setSuccessMessage('Discount applied successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchDiscountedItems();
        fetchAllMenuItems();
        fetchMostOrderedItems();
        setShowManualModal(false);
      } else {
        setApiError('Failed to apply discount');
      }
    } catch (error) {
      setApiError('Operation failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDiscount = async (itemId) => {
    if (!window.confirm('Remove discount from this item?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/menu/${itemId}/discount`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSuccessMessage('Discount removed successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        fetchDiscountedItems();
        fetchAllMenuItems();
      } else {
        setApiError('Failed to remove discount');
      }
    } catch (error) {
      setApiError('Operation failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount.type === 'none') return price;

    if (discount.type === 'percentage') {
      return price - (price * discount.value / 100);
    } else if (discount.type === 'fixed') {
      return Math.max(0, price - discount.value);
    }
    return price;
  };

  const getDiscountBadgeColor = (reason) => {
    switch (reason) {
      case 'low_stock': return 'bg-orange-100 text-orange-800';
      case 'expiry': return 'bg-red-100 text-red-800';
      case 'clearance': return 'bg-purple-100 text-purple-800';
      case 'manual': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter and sort logic
  const filterAndSortItems = (items, searchTerm = '') => {
    let filtered = [...items];

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(item => {
        const itemName = (item.menuItemDetails?.itemName || item.itemName || '').toLowerCase();
        const category = (item.menuItemDetails?.category || item.category || '').toLowerCase();
        return itemName.includes(searchTerm.toLowerCase()) || category.includes(searchTerm.toLowerCase());
      });
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => {
        const category = item.menuItemDetails?.category || item.category;
        return category === categoryFilter;
      });
    }

    // Apply expiry filter
    if (expiryFilter !== 'all') {
      const today = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);

      switch (expiryFilter) {
        case 'expiring-soon':
          filtered = filtered.filter(item => {
            const expiryDate = item.menuItemDetails?.expiryDate || item.expiryDate;
            return expiryDate && new Date(expiryDate) <= sevenDaysFromNow && new Date(expiryDate) >= today;
          });
          break;
        case 'expired':
          filtered = filtered.filter(item => {
            const expiryDate = item.menuItemDetails?.expiryDate || item.expiryDate;
            return expiryDate && new Date(expiryDate) < today;
          });
          break;
        case 'has-expiry':
          filtered = filtered.filter(item => {
            const expiryDate = item.menuItemDetails?.expiryDate || item.expiryDate;
            return expiryDate;
          });
          break;
        case 'no-expiry':
          filtered = filtered.filter(item => {
            const expiryDate = item.menuItemDetails?.expiryDate || item.expiryDate;
            return !expiryDate;
          });
          break;
        default:
          break;
      }
    }

    // Apply sorting
    switch (sortBy) {
      case 'discount-desc':
        filtered.sort((a, b) => {
          const aDiscount = a.menuItemDetails?.discount?.value || a.discount?.value || 0;
          const bDiscount = b.menuItemDetails?.discount?.value || b.discount?.value || 0;
          return bDiscount - aDiscount;
        });
        break;
      case 'discount-asc':
        filtered.sort((a, b) => {
          const aDiscount = a.menuItemDetails?.discount?.value || a.discount?.value || 0;
          const bDiscount = b.menuItemDetails?.discount?.value || b.discount?.value || 0;
          return aDiscount - bDiscount;
        });
        break;
      case 'price-desc':
        filtered.sort((a, b) => {
          const aPrice = a.menuItemDetails?.price || a.price || 0;
          const bPrice = b.menuItemDetails?.price || b.price || 0;
          return bPrice - aPrice;
        });
        break;
      case 'price-asc':
        filtered.sort((a, b) => {
          const aPrice = a.menuItemDetails?.price || a.price || 0;
          const bPrice = b.menuItemDetails?.price || b.price || 0;
          return aPrice - bPrice;
        });
        break;
      case 'expiry-soon':
        filtered.sort((a, b) => {
          const aExpiry = a.menuItemDetails?.expiryDate || a.expiryDate;
          const bExpiry = b.menuItemDetails?.expiryDate || b.expiryDate;
          if (!aExpiry) return 1;
          if (!bExpiry) return -1;
          return new Date(aExpiry) - new Date(bExpiry);
        });
        break;
      case 'expiry-late':
        filtered.sort((a, b) => {
          const aExpiry = a.menuItemDetails?.expiryDate || a.expiryDate;
          const bExpiry = b.menuItemDetails?.expiryDate || b.expiryDate;
          if (!aExpiry) return 1;
          if (!bExpiry) return -1;
          return new Date(bExpiry) - new Date(aExpiry);
        });
        break;
      case 'name-asc':
        filtered.sort((a, b) => {
          const aName = a.itemName || a._id || '';
          const bName = b.itemName || b._id || '';
          return aName.localeCompare(bName);
        });
        break;
      case 'name-desc':
        filtered.sort((a, b) => {
          const aName = a.itemName || a._id || '';
          const bName = b.itemName || b._id || '';
          return bName.localeCompare(aName);
        });
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredDiscountedItems = filterAndSortItems(discountedItems, discountedSearch);
  const filteredAllMenuItems = filterAndSortItems(allMenuItems, allItemsSearch);
  const filteredMostOrderedItems = filterAndSortItems(mostOrderedItems, popularSearch);

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Tag className="text-indigo-600" />
              Discount Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage discounts, clearance sales, and promotional pricing
            </p>
          </div>
          <button
            onClick={refreshData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Alerts */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 text-green-800 flex items-center gap-2">
            <CheckCircle size={20} />
            <span>{successMessage}</span>
          </div>
        )}
        {apiError && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-800 flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{apiError}</span>
            <button onClick={() => setApiError('')} className="ml-auto">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={fetchLowStockItems}
            disabled={loading}
            className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition shadow-md disabled:opacity-50"
          >
            <Package size={24} />
            <div className="text-left">
              <div className="font-semibold">Auto-Discount Low Stock</div>
              <div className="text-sm opacity-90">Apply 15% off to low inventory items</div>
            </div>
          </button>

          <button
            onClick={fetchExpiringItems}
            disabled={loading}
            className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition shadow-md disabled:opacity-50"
          >
            <Clock size={24} />
            <div className="text-left">
              <div className="font-semibold">Auto-Discount Expiring Items</div>
              <div className="text-sm opacity-90">Apply up to 70% off for items near expiry</div>
            </div>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('discounted')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'discounted'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            <span className="flex items-center gap-2">
              <Tag size={18} />
              Active Discounts ({filteredDiscountedItems.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'all'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={18} />
              All Menu Items ({filteredAllMenuItems.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab('popular')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'popular'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            <span className="flex items-center gap-2">
              <TrendingUp size={18} />
              Most Ordered ({filteredMostOrderedItems.length})
            </span>
          </button>
        </div>

        {/* Search Bar and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-4 mb-4">
            {activeTab === 'discounted' && (
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search active discounts by name or category..."
                  value={discountedSearch}
                  onChange={(e) => setDiscountedSearch(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {discountedSearch && (
                  <button
                    onClick={() => setDiscountedSearch('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    type="button"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            )}

            {activeTab === 'all' && (
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search all menu items by name or category..."
                  value={allItemsSearch}
                  onChange={(e) => setAllItemsSearch(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {allItemsSearch && (
                  <button
                    onClick={() => setAllItemsSearch('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    type="button"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            )}

            {activeTab === 'popular' && (
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search most ordered items by name or category..."
                  value={popularSearch}
                  onChange={(e) => setPopularSearch(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {popularSearch && (
                  <button
                    onClick={() => setPopularSearch('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    type="button"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            )}

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            >
              <Filter size={16} />
              Filters
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {showFilters && (
            <>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Categories</option>
                <option value="snacks">Snacks</option>
                <option value="beverages">Beverages</option>
                <option value="meals">Meals</option>
                <option value="desserts">Desserts</option>
                <option value="breakfast">Breakfast</option>
              </select>
            </div>

            {/* Expiry Filter */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} />
                Filter by Expiry
              </label>
              <select
                value={expiryFilter}
                onChange={(e) => setExpiryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Items</option>
                <option value="expiring-soon">Expiring Soon (7 days)</option>
                <option value="expired">Expired</option>
                <option value="has-expiry">Has Expiry Date</option>
                <option value="no-expiry">No Expiry Date</option>
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <ArrowUpDown size={16} />
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="discount-desc">Discount: High to Low</option>
                <option value="discount-asc">Discount: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="expiry-soon">Expiry: Soonest First</option>
                <option value="expiry-late">Expiry: Latest First</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
            </>
          )}

          {/* Active Filters Display - Always visible when filters are active */}
          {(categoryFilter !== 'all' || expiryFilter !== 'all') && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              {categoryFilter !== 'all' && (
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-1">
                  Category: {categoryFilter}
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className="hover:bg-indigo-200 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {expiryFilter !== 'all' && (
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm flex items-center gap-1">
                  Expiry: {expiryFilter.replace('-', ' ')}
                  <button
                    onClick={() => setExpiryFilter('all')}
                    className="hover:bg-indigo-200 rounded-full p-0.5"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setExpiryFilter('all');
                }}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'discounted' && (
          <ActiveDiscountsTab
            items={filteredDiscountedItems}
            onEdit={openManualDiscountModal}
            onRemove={handleRemoveDiscount}
            calculateDiscountedPrice={calculateDiscountedPrice}
            getDiscountBadgeColor={getDiscountBadgeColor}
            formatDate={formatDate}
          />
        )}

        {activeTab === 'all' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <AllMenuItemsTab
              items={filteredAllMenuItems}
              onEdit={openManualDiscountModal}
              formatDate={formatDate}
            />
          </div>
        )}

        {activeTab === 'popular' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <MostOrderedTab
              items={filteredMostOrderedItems}
              onEdit={openManualDiscountModal}
            />
          </div>
        )}

        {/* Low Stock Items Modal */}
        {showLowStockModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Low Stock Items</h2>
                  <button
                    onClick={() => setShowLowStockModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                {lowStockItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Package size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No low stock items found</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
                      <p className="text-gray-700">
                        Found <strong>{lowStockItems.length}</strong> item(s) with stock below threshold.
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Selected: <strong>{selectedLowStockIds.length}</strong> item(s) will receive 15% discount
                      </p>
                    </div>

                    {/* Select All Checkbox */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedLowStockIds.length === lowStockItems.length}
                          onChange={toggleAllLowStock}
                          className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                        />
                        <span className="font-semibold text-gray-800">
                          {selectedLowStockIds.length === lowStockItems.length ? 'Deselect All' : 'Select All'}
                        </span>
                      </label>
                    </div>

                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {/* New Items (not yet discounted) */}
                      {lowStockItems.filter(item => !(item.discount?.reason === 'low_stock' && item.discount?.value > 0)).length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">New Items</h3>
                          <div className="space-y-2">
                            {lowStockItems
                              .filter(item => !(item.discount?.reason === 'low_stock' && item.discount?.value > 0))
                              .map((item) => (
                                <label
                                  key={item._id}
                                  className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedLowStockIds.includes(item._id)}
                                    onChange={() => toggleLowStockSelection(item._id)}
                                    className="mt-1 w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800">{item.itemName}</h4>
                                    <p className="text-sm text-gray-600">
                                      Stock: {item.stockQuantity} / {item.lowStockThreshold} | Price: Rs. {item.price.toFixed(2)}
                                    </p>
                                  </div>
                                </label>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Already Discounted Items */}
                      {lowStockItems.filter(item => item.discount?.reason === 'low_stock' && item.discount?.value > 0).length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2 flex items-center gap-2">
                            Already Discounted
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full normal-case">
                              Uncheck to remove discount
                            </span>
                          </h3>
                          <div className="space-y-2">
                            {lowStockItems
                              .filter(item => item.discount?.reason === 'low_stock' && item.discount?.value > 0)
                              .map((item) => (
                                <label
                                  key={item._id}
                                  className="flex items-start gap-3 p-4 bg-orange-50 border-2 border-orange-200 rounded-lg hover:border-orange-400 transition cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedLowStockIds.includes(item._id)}
                                    onChange={() => toggleLowStockSelection(item._id)}
                                    className="mt-1 w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-800">{item.itemName}</h4>
                                    <p className="text-sm text-gray-600">
                                      Stock: {item.stockQuantity} / {item.lowStockThreshold} | Price: Rs. {item.price.toFixed(2)}
                                    </p>
                                    <span className="inline-block mt-1 px-2 py-1 bg-orange-200 text-orange-900 rounded text-xs font-semibold">
                                      Current: {item.discount.type === 'percentage' ? `${item.discount.value}%` : `Rs. ${item.discount.value}`} OFF
                                    </span>
                                  </div>
                                </label>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowLowStockModal(false);
                          setSelectedLowStockIds([]);
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAutoDiscountLowStock}
                        disabled={loading}
                        className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                      >
                        {loading ? 'Applying...' : `Proceed - Apply to ${selectedLowStockIds.length} item(s)`}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Expiring Items Modal */}
        {showExpiryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Expiring Items</h2>
                  <button
                    onClick={() => setShowExpiryModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                {expiringItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Clock size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No items expiring soon</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 rounded">
                      <p className="text-gray-700">
                        Found <strong>{expiringItems.length}</strong> item(s) expiring within 7 days.
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Selected: <strong>{selectedExpiryIds.length}</strong> item(s) will receive automatic discount (30%-70% based on days until expiry)
                      </p>
                    </div>

                    {/* Select All Checkbox */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedExpiryIds.length === expiringItems.length}
                          onChange={toggleAllExpiry}
                          className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                        />
                        <span className="font-semibold text-gray-800">
                          {selectedExpiryIds.length === expiringItems.length ? 'Deselect All' : 'Select All'}
                        </span>
                      </label>
                    </div>

                    <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                      {/* New Items (not yet discounted) */}
                      {expiringItems.filter(item => !(item.discount?.reason === 'expiry' && item.discount?.value > 0)).length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2">New Items</h3>
                          <div className="space-y-2">
                            {expiringItems
                              .filter(item => !(item.discount?.reason === 'expiry' && item.discount?.value > 0))
                              .map((item) => {
                                const daysUntilExpiry = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                                let suggestedDiscount = 30;
                                if (daysUntilExpiry <= 1) suggestedDiscount = 70;
                                else if (daysUntilExpiry <= 3) suggestedDiscount = 50;

                                return (
                                  <label
                                    key={item._id}
                                    className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedExpiryIds.includes(item._id)}
                                      onChange={() => toggleExpirySelection(item._id)}
                                      className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-gray-800">{item.itemName}</h4>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                          daysUntilExpiry <= 1 ? 'bg-red-200 text-red-900' :
                                          daysUntilExpiry <= 3 ? 'bg-orange-200 text-orange-900' :
                                          'bg-yellow-200 text-yellow-900'
                                        }`}>
                                          {suggestedDiscount}% OFF
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-600">
                                        Expires: {formatDate(item.expiryDate)} ({daysUntilExpiry} day{daysUntilExpiry !== 1 ? 's' : ''}) | Price: Rs. {item.price.toFixed(2)}
                                      </p>
                                    </div>
                                  </label>
                                );
                              })}
                          </div>
                        </div>
                      )}

                      {/* Already Discounted Items */}
                      {expiringItems.filter(item => item.discount?.reason === 'expiry' && item.discount?.value > 0).length > 0 && (
                        <div>
                          <h3 className="text-sm font-semibold text-gray-600 uppercase mb-2 flex items-center gap-2">
                            Already Discounted
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full normal-case">
                              Uncheck to remove discount
                            </span>
                          </h3>
                          <div className="space-y-2">
                            {expiringItems
                              .filter(item => item.discount?.reason === 'expiry' && item.discount?.value > 0)
                              .map((item) => {
                                const daysUntilExpiry = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                                return (
                                  <label
                                    key={item._id}
                                    className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg hover:border-red-400 transition cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedExpiryIds.includes(item._id)}
                                      onChange={() => toggleExpirySelection(item._id)}
                                      className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                                    />
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-gray-800">{item.itemName}</h4>
                                      <p className="text-sm text-gray-600">
                                        Expires: {formatDate(item.expiryDate)} ({daysUntilExpiry} day{daysUntilExpiry !== 1 ? 's' : ''}) | Price: Rs. {item.price.toFixed(2)}
                                      </p>
                                      <span className="inline-block mt-1 px-2 py-1 bg-red-200 text-red-900 rounded text-xs font-semibold">
                                        Current: {item.discount.type === 'percentage' ? `${item.discount.value}%` : `Rs. ${item.discount.value}`} OFF
                                      </span>
                                    </div>
                                  </label>
                                );
                              })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowExpiryModal(false);
                          setSelectedExpiryIds([]);
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAutoDiscountExpiry}
                        disabled={loading}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                      >
                        {loading ? 'Applying...' : `Proceed - Apply to ${selectedExpiryIds.length} item(s)`}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Manual Discount Modal */}
        {showManualModal && selectedItem && (
          <DiscountForm
            selectedItem={selectedItem}
            onClose={() => setShowManualModal(false)}
            onSubmit={handleManualDiscountSubmit}
            loading={loading}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default DiscountManagement;
