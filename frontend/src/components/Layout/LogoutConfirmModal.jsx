import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * LogoutConfirmModal Component
 * Confirmation modal for logout action
 */
const LogoutConfirmModal = ({ show, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="macos-modal max-w-md w-full mx-4 macos-animate">
        <div className="p-6">
          <div className="flex items-center justify-center w-14 h-14 mx-auto bg-red-100 rounded-full">
            <AlertCircle className="w-7 h-7 text-red-600" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-gray-900 text-center">
            Confirm Logout
          </h3>
          <p className="mt-2 text-sm text-gray-600 text-center leading-relaxed">
            Are you sure you want to logout? You will need to sign in again to access the dashboard.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
