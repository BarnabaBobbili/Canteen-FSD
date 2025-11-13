import React from 'react';
import { useTranslation } from 'react-i18next';
import { calculateAverageRating } from './supplierHelpers';

const SupplierStats = ({ suppliers }) => {
  const { t } = useTranslation();
  const activeCount = suppliers.filter(s => s.status === 'active').length;
  const inactiveCount = suppliers.filter(s => s.status === 'inactive').length;
  const averageRating = calculateAverageRating(suppliers);

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-600">{t('suppliers.totalSuppliers')}</p>
        <p className="text-2xl font-bold text-gray-800">{suppliers.length}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg shadow">
        <p className="text-sm text-green-600">{t('common.active')}</p>
        <p className="text-2xl font-bold text-green-800">{activeCount}</p>
      </div>
      <div className="bg-red-50 p-4 rounded-lg shadow">
        <p className="text-sm text-red-600">{t('common.inactive')}</p>
        <p className="text-2xl font-bold text-red-800">{inactiveCount}</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg shadow">
        <p className="text-sm text-blue-600">{t('suppliers.averageRating')}</p>
        <p className="text-2xl font-bold text-blue-800">{averageRating}</p>
      </div>
    </div>
  );
};

export default SupplierStats;
