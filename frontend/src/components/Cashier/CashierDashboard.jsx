import React from 'react';
import CashierHeader from './CashierHeader';
import ToastMessages from './ToastMessages';
import MenuGrid from './MenuGrid';
import CartPanel from './CartPanel';
import TodaysOrdersModal from './TodaysOrdersModal';
import ConfirmationModal from '../Shared/ConfirmationModal';
import { useCashierDashboard } from './useCashierDashboard';
import './cashierStyles.css';

/**
 * CashierDashboard Component
 * Main orchestrator for cashier POS system
 * Refactored from 369 lines → ~110 lines
 */
const CashierDashboard = () => {
  const {
    // Auth
    user,
    // Menu and Cart
    menuItems,
    cart,
    // Customer Info
    customerName,
    setCustomerName,
    customerEmail,
    setCustomerEmail,
    customerPhone,
    setCustomerPhone,
    orderType,
    setOrderType,
    // UI State
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    successMessage,
    error,
    setError,
    showLogoutConfirm,
    setShowLogoutConfirm,
    showOrders,
    setShowOrders,
    // Orders
    todaysOrders,
    orderSearch,
    setOrderSearch,
    // Handlers
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveFromCart,
    handlePlaceOrder,
    handleFetchTodaysOrders,
    handleUpdateOrder,
    handleCancelOrder,
    handleLogout,
    confirmLogout
  } = useCashierDashboard();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <CashierHeader
        user={user}
        onViewOrders={handleFetchTodaysOrders}
        onLogout={handleLogout}
      />

      {/* Toast Messages */}
      <ToastMessages
        successMessage={successMessage}
        errorMessage={error}
        onClearError={() => setError('')}
      />

      {/* Main Content */}
      <div className="flex h-[calc(100vh-65px)]">
        {/* Menu Grid */}
        <div className="flex-1 p-3">
          <MenuGrid
            menuItems={menuItems}
            cart={cart}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
        </div>

        {/* Cart Panel */}
        <div className="w-80 p-3">
          <CartPanel
            cart={cart}
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerEmail={customerEmail}
            setCustomerEmail={setCustomerEmail}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            orderType={orderType}
            setOrderType={setOrderType}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        icon="danger"
      />

      {/* Today's Orders Modal */}
      <TodaysOrdersModal
        isOpen={showOrders}
        onClose={() => setShowOrders(false)}
        orders={todaysOrders}
        searchTerm={orderSearch}
        onSearchChange={setOrderSearch}
        menuItems={menuItems}
        onUpdateOrder={handleUpdateOrder}
        onCancelOrder={handleCancelOrder}
      />
    </div>
  );
};

export default CashierDashboard;
