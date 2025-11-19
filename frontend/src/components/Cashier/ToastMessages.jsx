import React from 'react';
import { CheckCircle, X } from 'lucide-react';

/**
 * ToastMessages Component
 * Displays success and error toast notifications
 */
const ToastMessages = ({ successMessage, errorMessage, onClearError }) => {
  return (
    <>
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-20 right-4 z-50">
          <div className="bg-green-600 text-white px-4 py-3 rounded shadow-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="fixed top-20 right-4 z-50">
          <div className="bg-red-600 text-white px-4 py-3 rounded shadow-lg flex items-center gap-2">
            <X className="w-5 h-5" />
            <span className="font-medium">{errorMessage}</span>
            <button
              onClick={onClearError}
              className="ml-2 hover:bg-red-700 p-1 rounded"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ToastMessages;
