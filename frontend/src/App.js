import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CanteenManagement from './components/CanteenManagement';
import StaffManagement from './components/StaffManagement';
import ActivityLog from './components/ActivityLog';
import SupplierManagement from './components/SupplierManagement';

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
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/management"
              element={
                <ProtectedRoute roles={['admin', 'manager', 'cashier', 'staff']}>
                  <CanteenManagement showTabs={true} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute roles={['admin', 'manager', 'cashier', 'staff']}>
                  <CanteenManagement section="orders" showTabs={false} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/menu"
              element={
                <ProtectedRoute roles={['admin', 'manager', 'staff']}>
                  <CanteenManagement section="menu" showTabs={false} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/inventory"
              element={
                <ProtectedRoute roles={['admin', 'manager', 'staff']}>
                  <CanteenManagement section="inventory" showTabs={false} />
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

            {/* Future routes for other management components */}
            {/*
            <Route path="/discounts" element={<ProtectedRoute roles={['admin', 'manager']}><DiscountManagement /></ProtectedRoute>} />
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