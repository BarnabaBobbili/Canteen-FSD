import React from 'react';
import { useTranslation } from 'react-i18next';
import { Truck, Edit, Trash2, Star } from 'lucide-react';
import { getSupplierTypeColor, formatPaymentTerms } from './supplierHelpers';

const SupplierTable = ({ suppliers, loading, onEdit, onDelete, onAddClick }) => {
  const { t } = useTranslation();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={14}
            className={
              index < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : index === fullStars && hasHalfStar
                ? 'fill-yellow-200 text-yellow-400'
                : 'text-gray-300'
            }
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="text-center py-12">
          <p className="text-gray-500">{t('suppliers.loading')}</p>
        </div>
      </div>
    );
  }

  if (suppliers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="text-center py-12">
          <Truck className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-500">{t('suppliers.noSuppliers')}</p>
          <button
            onClick={onAddClick}
            className="mt-4 text-sky-600 hover:text-sky-700 font-medium"
          >
            {t('suppliers.addFirst')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('suppliers.supplier')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('suppliers.supplierContact')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('suppliers.supplierType')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('suppliers.paymentTerms')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('suppliers.rating')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('common.status')}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t('common.actions')}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {suppliers.map((supplier) => (
            <tr key={supplier._id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <p className="font-semibold text-gray-800">{supplier.supplierName}</p>
                  <p className="text-sm text-gray-500">{supplier.contactPerson}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="text-sm text-gray-800">{supplier.email}</p>
                  <p className="text-sm text-gray-500">{supplier.phone}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSupplierTypeColor(supplier.supplierType)}`}>
                  {t(`suppliers.types.${supplier.supplierType}`)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {formatPaymentTerms(supplier.paymentTerms)}
              </td>
              <td className="px-6 py-4">
                {renderStars(supplier.rating || 3)}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  supplier.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {t(`common.${supplier.status}`)}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(supplier)}
                    className="text-blue-600 hover:text-blue-800"
                    title={t('common.edit')}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(supplier._id)}
                    className="text-red-600 hover:text-red-800"
                    title={t('common.delete')}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTable;
