import React from 'react';
import { useTranslation } from 'react-i18next';
import SaveButton from './SaveButton';

/**
 * ProfileTab Component
 * Profile settings tab with name, email, phone, and role fields
 */
const ProfileTab = ({ user, settings, onChange, onSave, saving }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">{t('settings.profileSettings')}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.fullName')}</label>
          <input
            type="text"
            value={settings.name}
            onChange={(e) => onChange({ ...settings, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': '#1570EF' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.email')}</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">{t('settings.emailCannotChange')}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.phone')}</label>
          <input
            type="tel"
            value={settings.phone}
            onChange={(e) => onChange({ ...settings, phone: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            style={{ '--tw-ring-color': '#1570EF' }}
            placeholder="+91 "
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.role')}</label>
          <input
            type="text"
            value={user?.role || ''}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 capitalize"
          />
        </div>
        <SaveButton onClick={() => onSave('Profile')} saving={saving} />
      </div>
    </div>
  );
};

export default ProfileTab;
