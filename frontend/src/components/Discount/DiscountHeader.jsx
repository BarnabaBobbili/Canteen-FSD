import React from 'react';
import { Tag, RefreshCw, CheckCircle, AlertCircle, X } from 'lucide-react';

const DiscountHeader = ({
  onRefresh,
  loading,
  successMessage,
  errorMessage,
  onClearError
}) => {
  return (
    <>
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
          onClick={onRefresh}
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
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-800 flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{errorMessage}</span>
          <button onClick={onClearError} className="ml-auto">
            <X size={20} />
          </button>
        </div>
      )}
    </>
  );
};

export default DiscountHeader;
