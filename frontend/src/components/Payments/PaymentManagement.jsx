import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../DashboardLayout';
import PaymentStats from './PaymentStats';
import PaymentMethodBreakdown from './PaymentMethodBreakdown';
import PaymentFilters from './PaymentFilters';
import PaymentTable from './PaymentTable';
import PaymentDetailModal from './PaymentDetailModal';
import { filterPayments } from './paymentHelpers';
import * as paymentService from './paymentService';

/**
 * Payment Management Main Component
 * Orchestrates payment management functionality
 */
const PaymentManagement = () => {
  const { token } = useAuth();

  // State
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    if (token) {
      loadPayments();
      loadStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Load payments from API
  const loadPayments = async () => {
    try {
      const data = await paymentService.fetchPayments(token);
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Load statistics from API
  const loadStats = async () => {
    try {
      const data = await paymentService.fetchStats(token);
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error.message || 'Unknown error');
    }
  };

  // Handle view payment details
  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setShowDetailsModal(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedPayment(null);
  };

  // Filter payments based on current filters
  const filteredPayments = filterPayments(
    payments,
    searchTerm,
    filterStatus,
    filterMethod
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Payment Management
          </h1>
          <p className="text-gray-600 mt-1">
            Track and manage all payment transactions
          </p>
        </div>

        {/* Statistics Cards */}
        <PaymentStats stats={stats} />

        {/* Payment Method Breakdown */}
        <PaymentMethodBreakdown stats={stats} />

        {/* Filters and Search */}
        <PaymentFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterMethod={filterMethod}
          setFilterMethod={setFilterMethod}
        />

        {/* Payments Table */}
        <PaymentTable
          payments={filteredPayments}
          loading={loading}
          onViewDetails={handleViewDetails}
        />

        {/* Payment Details Modal */}
        <PaymentDetailModal
          payment={selectedPayment}
          isOpen={showDetailsModal}
          onClose={handleCloseModal}
        />
      </div>
    </DashboardLayout>
  );
};

export default PaymentManagement;
