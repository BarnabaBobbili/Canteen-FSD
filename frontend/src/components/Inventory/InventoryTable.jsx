import React from 'react';
import { useTranslation } from 'react-i18next';
import { Edit2, Trash2 } from 'lucide-react';
import { isLowStock, formatExpiryDate } from './inventoryHelpers';

/**
 * InventoryTable Component
 * Table displaying inventory items with actions
 */
const InventoryTable = ({ items, onEdit, onDelete }) => {
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <div className="macos-card macos-animate overflow-hidden">
        <div className="text-center py-8 text-gray-500">
          {t('inventory.noItems')}
        </div>
      </div>
    );
  }

  return (
    <div className="macos-card macos-animate overflow-hidden">
      <table className="w-full">
        <thead className="macos-table-header">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('inventory.itemName')}</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('inventory.itemQuantity')}</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('inventory.itemUnit')}</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('inventory.supplier')}</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('inventory.expiryDate')}</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">{t('common.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-b macos-table-row">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {item.itemName}
                  {isLowStock(item) && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                      {t('inventory.lowStock')}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={isLowStock(item) ? 'text-red-600 font-semibold' : ''}>
                  {item.quantity}
                </span>
              </td>
              <td className="px-6 py-4">{item.unit}</td>
              <td className="px-6 py-4">{item.supplier}</td>
              <td className="px-6 py-4">{formatExpiryDate(item.expiryDate)}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
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

export default InventoryTable;
