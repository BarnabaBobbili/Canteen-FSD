import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

/**
 * Payment Filters Component
 * Provides search and filter controls for payments
 */
const PaymentFilters = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterMethod,
  setFilterMethod
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('payments.searchPayments')}
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
            <option value="all">{t('payments.allStatus')}</option>
            <option value="completed">{t('payments.completed')}</option>
            <option value="pending">{t('payments.pending')}</option>
            <option value="processing">{t('payments.processing')}</option>
            <option value="failed">{t('payments.failed')}</option>
            <option value="refunded">{t('payments.refunded')}</option>
          </select>
        </div>

        {/* Payment Method Filter */}
        <div>
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">{t('payments.allMethods')}</option>
            <option value="cash">{t('payments.cash')}</option>
            <option value="card">{t('payments.card')}</option>
            <option value="upi">{t('payments.upi')}</option>
            <option value="wallet">{t('payments.wallet')}</option>
            <option value="online">{t('payments.online')}</option>
            <option value="payroll-deduction">{t('payments.payrollDeduction')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PaymentFilters;
