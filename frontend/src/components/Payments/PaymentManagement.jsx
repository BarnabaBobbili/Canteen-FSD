import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../DashboardLayout';
import API_BASE_URL from '../../config/api';
import {
  CreditCard, DollarSign, TrendingUp, TrendingDown, Search,
  Filter, Eye, RefreshCw, Download
} from 'lucide-react';

const PaymentManagement = () => {
  const { token } = useAuth();
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    if (token) {
      fetchPayments();
      fetchStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Add Escape key handler for modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showDetailsModal) {
        setShowDetailsModal(false);
      }
    };

    if (showDetailsModal) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showDetailsModal]);

  const fetchPayments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch payments: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error.message || 'Unknown error');
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || payment.paymentStatus === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.paymentMethod === filterMethod;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
      refunded: 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getMethodIcon = (method) => {
    const methods = {
      cash: '💵',
      card: '💳',
      upi: '📱',
      wallet: '👛',
      online: '🌐',
      'payroll-deduction': '📋'
    };
    return methods[method] || '💰';
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all payment transactions</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 opacity-80" />
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold">₹{stats.overall?.totalRevenue?.toFixed(2) || '0'}</div>
              <div className="text-sm opacity-90">Total Revenue</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <CreditCard className="w-8 h-8 opacity-80" />
                <span className="text-lg font-semibold">{stats.overall?.completedPayments || 0}</span>
              </div>
              <div className="text-2xl font-bold">{stats.overall?.totalPayments || 0}</div>
              <div className="text-sm opacity-90">Total Transactions</div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <TrendingDown className="w-8 h-8 opacity-80" />
                <span className="text-lg font-semibold">{stats.overall?.failedPayments || 0}</span>
              </div>
              <div className="text-2xl font-bold">₹{stats.overall?.totalRefunds?.toFixed(2) || '0'}</div>
              <div className="text-sm opacity-90">Refunds</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 opacity-80" />
                <span className="text-lg font-semibold">₹{stats.overall?.totalTax?.toFixed(2) || '0'}</span>
              </div>
              <div className="text-2xl font-bold">₹{stats.overall?.totalDiscounts?.toFixed(2) || '0'}</div>
              <div className="text-sm opacity-90">Discounts</div>
            </div>
          </div>
        )}

        {/* Payment Methods Breakdown */}
        {stats?.byMethod && stats.byMethod.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Payment Method Breakdown</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {stats.byMethod.map((method, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-2xl mb-2">{getMethodIcon(method._id)}</div>
                  <div className="text-sm font-semibold text-gray-700 capitalize">{method._id}</div>
                  <div className="text-lg font-bold text-gray-900">₹{method.total.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">{method.count} transactions</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by customer, transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            {/* Method Filter */}
            <div>
              <select
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Methods</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="wallet">Wallet</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      Loading payments...
                    </td>
                  </tr>
                ) : filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No payments found
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-indigo-600">
                        {payment.transactionId || payment.razorpayPaymentId || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{payment.customerName}</div>
                        <div className="text-sm text-gray-500">{payment.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getMethodIcon(payment.paymentMethod)}</span>
                          <span className="text-sm capitalize">{payment.paymentMethod}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ₹{payment.finalAmount != null ? payment.finalAmount.toFixed(2) : '0.00'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(payment.paymentStatus)}`}>
                          {payment.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedPayment(payment);
                            setShowDetailsModal(true);
                          }}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Details Modal */}
        {showDetailsModal && selectedPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Payment Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Transaction ID</label>
                    <p className="text-gray-900">{selectedPayment.transactionId || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Payment Method</label>
                    <p className="text-gray-900 capitalize">{selectedPayment.paymentMethod}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Customer Name</label>
                    <p className="text-gray-900">{selectedPayment.customerName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Email</label>
                    <p className="text-gray-900">{selectedPayment.customerEmail || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Amount</label>
                    <p className="text-gray-900">₹{selectedPayment.amount != null ? selectedPayment.amount.toFixed(2) : 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Tax</label>
                    <p className="text-gray-900">₹{selectedPayment.tax != null ? selectedPayment.tax.toFixed(2) : 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Discount</label>
                    <p className="text-gray-900">₹{selectedPayment.discountApplied != null ? selectedPayment.discountApplied.toFixed(2) : 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Final Amount</label>
                    <p className="text-gray-900 font-bold">₹{selectedPayment.finalAmount != null ? selectedPayment.finalAmount.toFixed(2) : 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Status</label>
                    <p className={`inline-flex px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(selectedPayment.paymentStatus)}`}>
                      {selectedPayment.paymentStatus}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Date</label>
                    <p className="text-gray-900">{new Date(selectedPayment.createdAt).toLocaleString()}</p>
                  </div>
                  {selectedPayment.notes && (
                    <div className="col-span-2">
                      <label className="text-sm font-semibold text-gray-600">Notes</label>
                      <p className="text-gray-900">{selectedPayment.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PaymentManagement;
