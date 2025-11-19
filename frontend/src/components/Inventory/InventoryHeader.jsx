import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Filter, ChevronUp, ChevronDown } from 'lucide-react';
import SearchBar from '../Shared/SearchBar';

/**
 * InventoryHeader Component
 * Search bar, filter toggle, and add button
 */
const InventoryHeader = ({
  searchTerm,
  onSearchChange,
  showFilters,
  onToggleFilters,
  onAddClick
}) => {
  const { t } = useTranslation();

  return (
    <div className="macos-card macos-animate mb-6 p-6">
      <div className="flex gap-4">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder={t('inventory.searchItems')}
        />
        <button
          onClick={onToggleFilters}
          className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg macos-table-row"
        >
          <Filter size={16} />
          {t('common.filters')}
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-6 py-2 macos-btn text-white"
        >
          <Plus size={20} /> {t('inventory.addItem')}
        </button>
      </div>
    </div>
  );
};

export default InventoryHeader;
