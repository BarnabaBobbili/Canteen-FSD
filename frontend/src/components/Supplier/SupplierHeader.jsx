import React from 'react';
import { useTranslation } from 'react-i18next';
import { Truck, Plus, Search, X } from 'lucide-react';

const SupplierHeader = ({ searchTerm, onSearchChange, onAddClick }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      {/* Title and Add Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Truck className="text-sky-600" size={32} />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('suppliers.title')}</h1>
            <p className="text-sm text-gray-600">{t('suppliers.description')}</p>
          </div>
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
        >
          <Plus size={20} />
          {t('suppliers.addSupplier')}
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder={t('suppliers.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            type="button"
            aria-label={t('common.clearSearch')}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SupplierHeader;
