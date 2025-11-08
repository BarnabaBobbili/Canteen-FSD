import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
// User-facing pages (refactored modular versions)
import LandingPage from './components/UserPages/LandingPage';
import OrderPage from './components/UserPages/OrderPage';
import CartPage from './components/UserPages/CartPage';
import CheckoutPage from './components/UserPages/CheckoutPage';
import OrderConfirmationPage from './components/UserPages/OrderConfirmationPage';
import OrderTrackingPage from './components/UserPages/OrderTrackingPage';
import ProfilePage from './components/UserPages/ProfilePage';
import UserLogin from './components/UserPages/Auth/UserLogin';
import UserSignup from './components/UserPages/Auth/UserSignup';
import ContactUs from './components/ContactUs';
import StaffLogin from './components/Staff/StaffLogin';
import StaffSignup from './components/Staff/StaffSignup';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import CashierDashboard from './components/Cashier/CashierDashboard';
import KitchenDashboard from './components/Kitchen/KitchenDashboard';
import ManagerDashboard from './components/Manager/ManagerDashboard';
import ManagerLayout from './components/Manager/ManagerLayout';
import ProtectedRoute from './components/ProtectedRoute';
import MenuManagement from './components/Menu/MenuManagement';
import OrderManagement from './components/Orders/OrderManagement';
import InventoryManagement from './components/Inventory/InventoryManagement';
import StaffManagement from './components/StaffManagement';
import ActivityLog from './components/ActivityLog';
import SupplierManagement from './components/SupplierManagement';
import DiscountManagement from './components/DiscountManagement';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
              <Route path="/order-tracking" element={<OrderTrackingPage />} />
              <Route path="/contactus" element={<ContactUs />} />

            {/* User Auth Routes */}
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserSignup />} />

            {/* User Profile (Protected) */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute roles={['customer']}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Staff Auth Routes */}
            <Route path="/staff/login" element={<StaffLogin />} />
            <Route path="/staff/signup" element={<StaffSignup />} />

            {/* Protected Routes */}

            {/* ========== ADMIN ROUTES (with /admin prefix) ========== */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute roles={['admin']}>
                  <OrderManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/menu"
              element={
                <ProtectedRoute roles={['admin']}>
                  <MenuManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/inventory"
              element={
                <ProtectedRoute roles={['admin']}>
                  <InventoryManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/staff"
              element={
                <ProtectedRoute roles={['admin']}>
                  <StaffManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/activities"
              element={
                <ProtectedRoute roles={['admin']}>
                  <ActivityLog />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/suppliers"
              element={
                <ProtectedRoute roles={['admin']}>
                  <SupplierManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/discounts"
              element={
                <ProtectedRoute roles={['admin']}>
                  <DiscountManagement />
                </ProtectedRoute>
              }
            />

            {/* ========== CASHIER ROUTES ========== */}
            <Route
              path="/cashier"
              element={
                <ProtectedRoute roles={['cashier']}>
                  <CashierDashboard />
                </ProtectedRoute>
              }
            />

            {/* ========== STAFF/KITCHEN ROUTES ========== */}
            <Route
              path="/kitchen"
              element={
                <ProtectedRoute roles={['staff']}>
                  <KitchenDashboard />
                </ProtectedRoute>
              }
            />

            {/* ========== MANAGER ROUTES ========== */}
            <Route
              path="/manager"
              element={
                <ProtectedRoute roles={['manager']}>
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />

            {/* ========== REGULAR USER ROUTES (without /admin prefix) ========== */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={['customer']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute roles={['manager']}>
                  <ManagerLayout>
                    <OrderManagement />
                  </ManagerLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/menu"
              element={
                <ProtectedRoute roles={['manager']}>
                  <ManagerLayout>
                    <MenuManagement />
                  </ManagerLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/inventory"
              element={
                <ProtectedRoute roles={['manager']}>
                  <ManagerLayout>
                    <InventoryManagement />
                  </ManagerLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/discounts"
              element={
                <ProtectedRoute roles={['manager']}>
                  <ManagerLayout>
                    <DiscountManagement />
                  </ManagerLayout>
                </ProtectedRoute>
              }
            />

              {/* Future routes for other management components */}
              {/*
              <Route path="/feedback" element={<ProtectedRoute roles={['admin', 'manager']}><FeedbackManagement /></ProtectedRoute>} />
              <Route path="/payments" element={<ProtectedRoute roles={['admin', 'manager', 'cashier']}><PaymentBilling /></ProtectedRoute>} />
              */}
                </Routes>
              </div>
            </Router>
        </CartProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;