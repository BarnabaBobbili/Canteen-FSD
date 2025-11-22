import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, Save, AlertCircle } from 'lucide-react';

const StaffForm = ({
  show,
  mode,
  formData,
  onChange,
  onSubmit,
  onClose,
  errors = {},
  apiError
}) => {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" role="presentation">
      <div className="macos-modal macos-animate max-w-2xl w-full max-h-[90vh] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="staff-form-title">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 id="staff-form-title" className="text-xl font-bold text-gray-800">
            {mode === 'add' ? t('staff.addStaff') : t('staff.editStaff')}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close staff form">
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        {apiError && (
          <div className="mx-6 mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-2">
            <AlertCircle size={20} />
            {apiError}
          </div>
        )}

        <form onSubmit={onSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.name')} *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => onChange({ ...formData, name: e.target.value })}
                className={`macos-input w-full focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:ring-sky-500'
                }`}
                required
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.email')} *</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => onChange({ ...formData, email: e.target.value })}
                className={`macos-input w-full focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:ring-sky-500'
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span> {errors.email}
                </p>
              )}
            </div>

            {/* Password - Only for Add Mode */}
            {mode === 'add' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.password')} *</label>
                <input
                  type="password"
                  value={formData.password || ''}
                  onChange={(e) => onChange({ ...formData, password: e.target.value })}
                  className={`macos-input w-full focus:outline-none focus:ring-2 ${
                    errors.password ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:ring-sky-500'
                  }`}
                  required={mode === 'add'}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.password}
                  </p>
                )}
              </div>
            )}

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.phone')} *</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => onChange({ ...formData, phone: e.target.value })}
                className={`macos-input w-full focus:outline-none focus:ring-2 ${
                  errors.phone ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-300 focus:ring-sky-500'
                }`}
                required
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span> {errors.phone}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('staff.staffRole')} *</label>
              <select
                value={formData.role || 'staff'}
                onChange={(e) => onChange({ ...formData, role: e.target.value })}
                className="w-full macos-input"
              >
                <option value="admin">{t('staff.admin')}</option>
                <option value="manager">{t('staff.manager')}</option>
                <option value="cashier">{t('staff.cashier')}</option>
                <option value="staff">{t('staff.staffMember')}</option>
                <option value="customer">{t('staff.customer')}</option>
              </select>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('staff.staffDepartment')}</label>
              <select
                value={formData.department || 'none'}
                onChange={(e) => onChange({ ...formData, department: e.target.value })}
                className="w-full macos-input"
              >
                <option value="none">{t('common.none')}</option>
                <option value="kitchen">{t('staff.kitchen')}</option>
                <option value="counter">{t('staff.counter')}</option>
                <option value="management">{t('staff.management')}</option>
                <option value="inventory">{t('staff.inventory')}</option>
              </select>
            </div>

            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('staff.employeeId')}</label>
              <input
                type="text"
                value={formData.employeeId || ''}
                onChange={(e) => onChange({ ...formData, employeeId: e.target.value })}
                className="w-full macos-input"
                placeholder={t('staff.employeeIdPlaceholder')}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('common.status')}</label>
              <select
                value={formData.status || 'active'}
                onChange={(e) => onChange({ ...formData, status: e.target.value })}
                className="w-full macos-input"
              >
                <option value="active">{t('common.active')}</option>
                <option value="inactive">{t('common.inactive')}</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 macos-btn text-white transition-colors"
            >
              <Save size={18} />
              {mode === 'add' ? t('staff.addStaff') : t('staff.updateStaff')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg macos-table-row-colors"
            >
              {t('common.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffForm;
