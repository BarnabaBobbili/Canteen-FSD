import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * CustomerInfoFields Component
 * Form fields for customer information (name, email, phone, order type)
 */
const CustomerInfoFields = ({ currentForm, setCurrentForm, errors }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Customer Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('orders.customerName')} *
        </label>
        <input
          type="text"
          value={currentForm.customerName || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, customerName: e.target.value })}
          className={`macos-input w-full ${
            errors.customerName ? 'border-red-500' : ''
          }`}
          placeholder={t('orders.customerName')}
        />
        {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
      </div>

      {/* Customer Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('common.email')} <span className="text-gray-400 font-normal">({t('common.noData')})</span>
        </label>
        <input
          type="email"
          value={currentForm.customerEmail || ''}
          onChange={(e) => setCurrentForm({ ...currentForm, customerEmail: e.target.value })}
          className={`macos-input w-full ${
            errors.customerEmail ? 'border-red-500' : ''
          }`}
          placeholder="customer@example.com"
        />
        {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>}
      </div>

      {/* Customer Phone */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('orders.customerPhone')} *
        </label>
        <input
          type="text"
          value={currentForm.customerPhone || ''}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ''); // Only allow digits
            setCurrentForm({ ...currentForm, customerPhone: value });
          }}
          className={`macos-input w-full ${
            errors.customerPhone ? 'border-red-500' : ''
          }`}
          placeholder="10 digit phone number"
          maxLength="10"
        />
        {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone}</p>}
      </div>

      {/* Order Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('orders.orderType')} *
        </label>
        <select
          value={currentForm.orderType || 'dine-in'}
          onChange={(e) => setCurrentForm({ ...currentForm, orderType: e.target.value })}
          className="macos-input w-full"
        >
          <option value="dine-in">{t('orders.dineIn')}</option>
          <option value="takeaway">Takeaway</option>
        </select>
      </div>
    </>
  );
};

export default CustomerInfoFields;
