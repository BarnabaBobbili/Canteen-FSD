import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="macos-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto macos-animate">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white bg-opacity-70 backdrop-blur-lg border-b border-white border-opacity-30 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {mode === 'add' ? t('orders.addOrder') : t('orders.editOrder')}
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
              className="macos-btn flex-1 flex items-center justify-center gap-2 text-white"
            >
              <Save size={18} /> {mode === 'add' ? t('common.add') : t('common.save')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 macos-input hover:bg-gray-50 transition-all duration-300"
            >
              {t('common.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderFormModal;
