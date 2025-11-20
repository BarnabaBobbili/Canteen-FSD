import React from 'react';
import { useTranslation } from 'react-i18next';
import ToggleSwitch from './ToggleSwitch';
import SaveButton from './SaveButton';

/**
 * NotificationsTab Component
 * Notification preferences with toggle switches
 */
const NotificationsTab = ({ settings, onChange, onSave, saving }) => {
  const { t } = useTranslation();

  const notificationOptions = [
    { key: 'emailNotifications', label: t('settings.emailNotifications') },
    { key: 'orderNotifications', label: t('settings.orderNotifications') },
    { key: 'inventoryAlerts', label: t('settings.inventoryAlerts') },
    { key: 'feedbackNotifications', label: t('settings.feedbackNotifications') },
    { key: 'dailyReports', label: t('settings.dailyReports') }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">{t('settings.notificationSettings')}</h2>
      <div className="space-y-4">
        {notificationOptions.map(({ key, label }) => (
          <ToggleSwitch
            key={key}
            checked={settings[key]}
            onChange={(e) => onChange({ ...settings, [key]: e.target.checked })}
            label={label}
            description={`Receive ${label.toLowerCase()}`}
          />
        ))}
        <SaveButton onClick={() => onSave('Notification')} saving={saving} />
      </div>
    </div>
  );
};

export default NotificationsTab;
