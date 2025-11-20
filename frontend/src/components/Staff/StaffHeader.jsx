import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, X, Shield } from 'lucide-react';

const StaffHeader = ({ searchTerm, onSearchChange, onAddClick }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-blue-800 font-semibold mb-1">{t('staff.accountCreationTitle')}</h3>
            <p className="text-blue-700 text-sm">
              {t('staff.accountCreationInfo')}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Add Controls */}
      <div className="macos-card macos-animate mb-6 p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('staff.searchStaff')}
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
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 px-6 py-2 macos-btn text-white transition-colors"
          >
            <Plus size={20} />
            {t('staff.addStaff')}
          </button>
        </div>
      </div>
    </>
  );
};

export default StaffHeader;
