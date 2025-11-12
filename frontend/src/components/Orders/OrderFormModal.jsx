import React from 'react';
import { X, Save } from 'lucide-react';
import OrderForm from './OrderForm';

/**
 * Order Form Modal Component
 * Modal wrapper for order form
 */
const OrderFormModal = ({
  isOpen,
  mode,
  currentForm,
  setCurrentForm,
  formErrors,
  onSubmit,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {mode === 'add' ? 'Add New' : 'Edit'} Order
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body - Form */}
        <form onSubmit={onSubmit} className="p-6" noValidate>
          <OrderForm
            currentForm={currentForm}
            setCurrentForm={setCurrentForm}
            errors={formErrors}
            modalMode={mode}
          />

          {/* Form Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              <Save size={18} /> {mode === 'add' ? 'Add' : 'Update'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderFormModal;
