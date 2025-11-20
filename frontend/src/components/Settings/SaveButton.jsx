import React from 'react';
import { useTranslation } from 'react-i18next';
import { Save } from 'lucide-react';

/**
 * SaveButton Component
 * Reusable save button for settings sections
 */
const SaveButton = ({ onClick, saving, disabled }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      disabled={saving || disabled}
      className="flex items-center gap-2 px-6 py-2.5 text-white rounded-lg shadow-sm hover:opacity-90 transition-colors font-medium disabled:opacity-50"
      style={{ backgroundColor: '#1570EF' }}
    >
      <Save className="w-4 h-4" />
      {saving ? t('settings.saving') : t('settings.saveChanges')}
    </button>
  );
};

export default SaveButton;
