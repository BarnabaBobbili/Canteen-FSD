import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../DashboardLayout';
import MenuForm from './MenuForm';
import MenuFilterBar from '../Shared/MenuFilterBar';
import MenuAnalytics from './MenuAnalytics';
import ConfirmationModal from '../Shared/ConfirmationModal';
import MenuAlertBanners from './MenuAlertBanners';
import MenuTable from './MenuTable';
import MenuHeader from './MenuHeader';
import { useMenuManagement } from './useMenuManagement';
import {
  filterBySearch,
  filterByCategory,
  filterByAvailability,
  sortMenuItems,
  getAlertItems
} from './menuHelpers';
import { X, Save } from 'lucide-react';

/**
 * MenuManagement - Main orchestrator for menu management
 * Refactored from 427 lines → ~180 lines
 * Uses custom hook for state/logic, service for API, extracted components
 */
const MenuManagement = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const {
    // State
    menuItems,
    showModal,
    modalMode,
    currentForm,
    setCurrentForm,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    availabilityFilter,
    setAvailabilityFilter,
    sortBy,
    setSortBy,
    errors,
    apiError,
    successMessage,
    itemsToShow,
    setItemsToShow,
    showFilters,
    setShowFilters,
    showDeleteConfirm,
    setShowDeleteConfirm,
    setItemToDelete,
    // Methods
    handleSubmit,
    handleImageUpload,
    handleDelete,
    confirmDelete,
    openModal,
    closeModal
  } = useMenuManagement();

  // Calculate alert items
  const { lowStockItems, outOfStockItems, expiringItems, expiredItems } = getAlertItems(menuItems);

  // Apply filters and sorting
  const filteredMenu = sortMenuItems(
    filterByAvailability(
      filterByCategory(
        filterBySearch(menuItems, searchTerm),
        categoryFilter
      ),
      availabilityFilter
    ),
    sortBy
  );

  const content = (
    <>
      <div className="p-6">
        {/* Error and Success Messages */}
        {apiError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">
            {apiError}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Alert Banners Component */}
        <MenuAlertBanners
          outOfStockItems={outOfStockItems}
          lowStockItems={lowStockItems}
          expiredItems={expiredItems}
          expiringItems={expiringItems}
        />

        {/* Header with Search and Actions */}
        <MenuHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onAddClick={() => openModal('add')}
        />

        {/* Filter Bar */}
        <div className="macos-card macos-animate mb-6 p-6">
          <MenuFilterBar
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            availabilityFilter={availabilityFilter}
            setAvailabilityFilter={setAvailabilityFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showFilters={showFilters}
          />
        </div>

        {/* Menu Table Component */}
        <MenuTable
          menuItems={filteredMenu}
          onEdit={(item) => openModal('edit', item)}
          onDelete={handleDelete}
          itemsToShow={itemsToShow}
        />

        {/* View More/Less Buttons */}
        {filteredMenu.length > 10 && (
          <div className="mt-4 text-center flex gap-3 justify-center">
            {filteredMenu.length > itemsToShow && (
              <button
                onClick={() => setItemsToShow(prev => prev + 10)}
                className="px-6 py-2 macos-btn text-white transition-colors"
              >
                {t('common.viewMore')} ({filteredMenu.length - itemsToShow} {t('common.remaining')})
              </button>
            )}
            {itemsToShow > 10 && (
              <button
                onClick={() => setItemsToShow(10)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                {t('common.showLess')}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Analytics Section */}
      <MenuAnalytics menuItems={menuItems} />

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="macos-modal macos-animate max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {modalMode === 'add' ? t('menu.addItem') : t('menu.editItem')}
              </h2>
              <button onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <MenuForm
                currentForm={currentForm}
                setCurrentForm={setCurrentForm}
                errors={errors}
                onImageUpload={handleImageUpload}
              />
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 macos-btn text-white"
                >
                  <Save size={18} /> {modalMode === 'add' ? t('common.add') : t('common.update')}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setItemToDelete(null);
        }}
        onConfirm={confirmDelete}
        title={t('menu.confirmDelete')}
        message={t('menu.confirmDeleteMessage')}
        confirmText={t('common.delete')}
        cancelText={t('common.cancel')}
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        icon="danger"
      />
    </>
  );

  // Conditionally wrap in DashboardLayout for admin and manager
  return user?.role === 'admin' || user?.role === 'manager' ? <DashboardLayout>{content}</DashboardLayout> : content;
};

export default MenuManagement;
