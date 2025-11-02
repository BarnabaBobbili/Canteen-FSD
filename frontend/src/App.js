import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
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
        <Router>
          <div className="App">
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            {/* Admin Dashboard - Admin Only */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Regular Dashboard - All authenticated users except admin */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={['manager', 'cashier', 'staff', 'customer']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute roles={['admin', 'manager', 'cashier', 'staff']}>
                  <OrderManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/menu"
              element={
                <ProtectedRoute roles={['admin', 'manager', 'staff']}>
                  <MenuManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/inventory"
              element={
                <ProtectedRoute roles={['admin', 'manager', 'staff']}>
                  <InventoryManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/staff"
              element={
                <ProtectedRoute roles={['admin', 'manager']}>
                  <StaffManagement />
                </ProtectedRoute>
              }
            />

            <Route
              path="/activities"
              element={
                <ProtectedRoute roles={['admin', 'manager']}>
                  <ActivityLog />
                </ProtectedRoute>
              }
            />

            {/* Supplier Management Route */}
            <Route
              path="/suppliers"
              element={
                <ProtectedRoute roles={['admin', 'manager']}>
                  <SupplierManagement />
                </ProtectedRoute>
              }
            />

            {/* Discount Management Route */}
            <Route
              path="/discounts"
              element={
                <ProtectedRoute roles={['admin', 'manager']}>
                  <DiscountManagement />
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
    </AuthProvider>
  </GoogleOAuthProvider>
  );
}

export default App;