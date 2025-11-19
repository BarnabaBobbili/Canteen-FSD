import React from 'react';
import { useTranslation } from 'react-i18next';
import ToggleSwitch from './ToggleSwitch';
import SelectInput from './SelectInput';
import SaveButton from './SaveButton';

/**
 * SecurityTab Component
 * Security settings including 2FA, session timeout, and password expiry
 */
const SecurityTab = ({ settings, onChange, onSave, saving }) => {
  const { t } = useTranslation();

  const sessionTimeoutOptions = [
    { value: '15', label: t('settings.sessionTimeout15') },
    { value: '30', label: t('settings.sessionTimeout30') },
    { value: '60', label: t('settings.sessionTimeout60') },
    { value: '120', label: t('settings.sessionTimeout120') },
    { value: '240', label: t('settings.sessionTimeout240') },
    { value: '480', label: t('settings.sessionTimeout480') }
  ];

  const passwordExpiryOptions = [
    { value: '30', label: t('settings.passwordExpiry30') },
    { value: '60', label: t('settings.passwordExpiry60') },
    { value: '90', label: t('settings.passwordExpiry90') },
    { value: '180', label: t('settings.passwordExpiry180') },
    { value: '365', label: t('settings.passwordExpiry365') },
    { value: 'never', label: t('settings.passwordExpiryNever') }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">{t('settings.securitySettings')}</h2>
      <div className="space-y-4">
        <ToggleSwitch
          checked={settings.twoFactorAuth}
          onChange={(e) => onChange({ ...settings, twoFactorAuth: e.target.checked })}
          label={t('settings.twoFactorAuth')}
          description={t('settings.twoFactorAuthDesc')}
        />

        <SelectInput
          label={t('settings.sessionTimeout')}
          value={settings.sessionTimeout}
          onChange={(e) => onChange({ ...settings, sessionTimeout: e.target.value })}
          options={sessionTimeoutOptions}
        />

        <SelectInput
          label={t('settings.passwordExpiry')}
          value={settings.passwordExpiry}
          onChange={(e) => onChange({ ...settings, passwordExpiry: e.target.value })}
          options={passwordExpiryOptions}
        />

        <SaveButton onClick={() => onSave('Security')} saving={saving} />
      </div>
    </div>
  );
};

export default SecurityTab;
