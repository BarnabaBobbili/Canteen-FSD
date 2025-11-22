import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../Layout/DashboardLayout';
import DiscountForm from './DiscountForm';
import ActiveDiscountsTab from './ActiveDiscountsTab';
import AllMenuItemsTab from './AllMenuItemsTab';
import MostOrderedTab from './MostOrderedTab';
import DiscountHeader from './DiscountHeader';
import DiscountActionButtons from './DiscountActionButtons';
import DiscountTabs from './DiscountTabs';
import DiscountFilters from './DiscountFilters';
import LowStockModal from './LowStockModal';
import ExpiringItemsModal from './ExpiringItemsModal';
import ConfirmationModal from '../Shared/ConfirmationModal';
import { useDiscountFilters } from './useDiscountFilters';
import {
  calculateDiscountedPrice,
  getDiscountBadgeColor,
  formatDate,
  filterAndSortItems
} from './discountHelpers';
import {
  fetchDiscountedItems as fetchDiscountedItemsAPI,
  fetchAllMenuItems as fetchAllMenuItemsAPI,
  fetchMostOrderedItems as fetchMostOrderedItemsAPI,
  getLowStockItems,
  getExpiringItems,
  applyLowStockDiscounts,
  applyExpiryDiscounts,
  applyDiscount,
  removeDiscount
} from './discountService';

const DiscountManagement = () => {
  const { t } = useTranslation();
  const { token, user } = useAuth();

  // Data states
  const [discountedItems, setDiscountedItems] = useState([]);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [mostOrderedItems, setMostOrderedItems] = useState([]);

  // UI states
  const [showManualModal, setShowManualModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('discounted');

  // Filter and search states (from custom hook)
  const {
    categoryFilter,
    setCategoryFilter,
    expiryFilter,
    setExpiryFilter,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,
    discountedSearch,
    setDiscountedSearch,
    allItemsSearch,
    setAllItemsSearch,
    popularSearch,
    setPopularSearch,
    clearAllFilters
  } = useDiscountFilters();

  // Auto-discount modal states
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [showExpiryModal, setShowExpiryModal] = useState(false);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [expiringItems, setExpiringItems] = useState([]);
  const [selectedLowStockIds, setSelectedLowStockIds] = useState([]);
  const [selectedExpiryIds, setSelectedExpiryIds] = useState([]);

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    fetchDiscountedItems();
    fetchAllMenuItems();
    fetchMostOrderedItems();
  }, []);

  const fetchDiscountedItems = async () => {
    try {
      const data = await fetchDiscountedItemsAPI();
      setDiscountedItems(data);
    } catch (error) {
      setApiError(t('discounts.fetchError'));
    }
  };

  const fetchAllMenuItems = async () => {
    try {
      const data = await fetchAllMenuItemsAPI();
      setAllMenuItems(data);
    } catch (error) {
      setApiError(t('discounts.fetchMenuError'));
    }
  };

  const fetchMostOrderedItems = async () => {
    try {
      const data = await fetchMostOrderedItemsAPI();
      setMostOrderedItems(data);
    } catch (error) {
      console.error(`${t('discounts.fetchPopularError')}:`, error);
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
    setSuccessMessage(t('discounts.refreshSuccess'));
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const handleFetchLowStockItems = () => {
    try {
      const sortedItems = getLowStockItems(allMenuItems);
      setLowStockItems(sortedItems);

      // Auto-select ALL items (both new and already discounted)
      const itemsToSelect = sortedItems.map(item => item._id);
      setSelectedLowStockIds(itemsToSelect);

      setShowLowStockModal(true);
    } catch (error) {
      setApiError(t('discounts.fetchLowStockError'));
    }
  };

  const handleFetchExpiringItems = () => {
    try {
      const sortedItems = getExpiringItems(allMenuItems);
      setExpiringItems(sortedItems);

      // Auto-select ALL items (both new and already discounted)
      const itemsToSelect = sortedItems.map(item => item._id);
      setSelectedExpiryIds(itemsToSelect);

      setShowExpiryModal(true);
    } catch (error) {
      setApiError(t('discounts.fetchExpiryError'));
    }
  };

  const handleAutoDiscountLowStock = async () => {
    if (selectedLowStockIds.length === 0) {
      setApiError(t('discounts.selectItemError'));
      setTimeout(() => setApiError(''), 3000);
      return;
    }

    setLoading(true);
    try {
      const { successCount, failCount } = await applyLowStockDiscounts(
        selectedLowStockIds,
        lowStockItems,
        token
      );

      setSuccessMessage(t('discounts.applySuccess', { successCount, failCount }));
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchDiscountedItems();
      fetchAllMenuItems();
      setShowLowStockModal(false);
      setSelectedLowStockIds([]);
    } catch (error) {
      setApiError(`${t('common.operationFailed')}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoDiscountExpiry = async () => {
    if (selectedExpiryIds.length === 0) {
      setApiError(t('discounts.selectItemError'));
      setTimeout(() => setApiError(''), 3000);
      return;
    }

    setLoading(true);
    try {
      const { successCount, failCount } = await applyExpiryDiscounts(
        selectedExpiryIds,
        expiringItems,
        token
      );

      setSuccessMessage(t('discounts.applySuccess', { successCount, failCount }));
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchDiscountedItems();
      fetchAllMenuItems();
      setShowExpiryModal(false);
      setSelectedExpiryIds([]);
    } catch (error) {
      setApiError(`${t('common.operationFailed')}: ${error.message}`);
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
      await applyDiscount(selectedItem._id, discountData, token);
      setSuccessMessage(t('discounts.applySingleSuccess'));
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchDiscountedItems();
      fetchAllMenuItems();
      fetchMostOrderedItems();
      setShowManualModal(false);
    } catch (error) {
      setApiError(`${t('common.operationFailed')}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDiscount = (itemId) => {
    setItemToRemove(itemId);
    setShowConfirmModal(true);
  };

  const confirmRemoveDiscount = async () => {
    if (!itemToRemove) return;

    setLoading(true);
    try {
      await removeDiscount(itemToRemove, token);
      setSuccessMessage(t('discounts.removeSuccess'));
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchDiscountedItems();
      fetchAllMenuItems();
    } catch (error) {
      setApiError(`${t('common.operationFailed')}: ${error.message}`);
    } finally {
      setLoading(false);
      setItemToRemove(null);
    }
  };

  // Compute filtered and sorted items
  const filteredDiscountedItems = filterAndSortItems(discountedItems, discountedSearch, categoryFilter, expiryFilter, sortBy);
  const filteredAllMenuItems = filterAndSortItems(allMenuItems, allItemsSearch, categoryFilter, expiryFilter, sortBy);
  const filteredMostOrderedItems = filterAndSortItems(mostOrderedItems, popularSearch, categoryFilter, expiryFilter, sortBy);

  const content = (
    <div className="p-6">
        <DiscountHeader
          onRefresh={refreshData}
          loading={loading}
          successMessage={successMessage}
          errorMessage={apiError}
          onClearError={() => setApiError('')}
        />

        <DiscountActionButtons
          onLowStockClick={handleFetchLowStockItems}
          onExpiringItemsClick={handleFetchExpiringItems}
          loading={loading}
        />

        <DiscountTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          discountedCount={filteredDiscountedItems.length}
          allItemsCount={filteredAllMenuItems.length}
          popularCount={filteredMostOrderedItems.length}
        />

        <DiscountFilters
          activeTab={activeTab}
          discountedSearch={discountedSearch}
          allItemsSearch={allItemsSearch}
          popularSearch={popularSearch}
          onDiscountedSearchChange={setDiscountedSearch}
          onAllItemsSearchChange={setAllItemsSearch}
          onPopularSearchChange={setPopularSearch}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          categoryFilter={categoryFilter}
          expiryFilter={expiryFilter}
          sortBy={sortBy}
          onCategoryChange={setCategoryFilter}
          onExpiryChange={setExpiryFilter}
          onSortChange={setSortBy}
          onClearFilters={clearAllFilters}
        />

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

        <LowStockModal
          isOpen={showLowStockModal}
          items={lowStockItems}
          selectedIds={selectedLowStockIds}
          onClose={() => {
            setShowLowStockModal(false);
            setSelectedLowStockIds([]);
          }}
          onToggleSelection={toggleLowStockSelection}
          onToggleAll={toggleAllLowStock}
          onApply={handleAutoDiscountLowStock}
          loading={loading}
        />

        <ExpiringItemsModal
          isOpen={showExpiryModal}
          items={expiringItems}
          selectedIds={selectedExpiryIds}
          onClose={() => {
            setShowExpiryModal(false);
            setSelectedExpiryIds([]);
          }}
          onToggleSelection={toggleExpirySelection}
          onToggleAll={toggleAllExpiry}
          onApply={handleAutoDiscountExpiry}
          loading={loading}
          formatDate={formatDate}
        />

        {/* Manual Discount Modal */}
        {showManualModal && selectedItem && (
          <DiscountForm
            selectedItem={selectedItem}
            onClose={() => setShowManualModal(false)}
            onSubmit={handleManualDiscountSubmit}
            loading={loading}
          />
        )}

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => {
            setShowConfirmModal(false);
            setItemToRemove(null);
          }}
          onConfirm={confirmRemoveDiscount}
          title={t('discounts.removeDiscount')}
          message={t('discounts.confirmRemove')}
          confirmText={t('common.remove')}
          cancelText={t('common.cancel')}
          confirmButtonClass="bg-red-600 hover:bg-red-700"
          icon="danger"
        />
    </div>
  );

  // Conditionally wrap in DashboardLayout for admin and manager
  return user?.role === 'admin' || user?.role === 'manager' ? <DashboardLayout>{content}</DashboardLayout> : content;
};

export default DiscountManagement;
