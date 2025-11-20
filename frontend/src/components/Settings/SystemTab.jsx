import React from 'react';
import { useTranslation } from 'react-i18next';
import SelectInput from './SelectInput';
import SaveButton from './SaveButton';

/**
 * SystemTab Component
 * System settings including currency, timezone, date format, and language
 */
const SystemTab = ({ settings, onChange, onSave, saving }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">{t('settings.systemSettings')}</h2>
      <div className="space-y-4">
        <SelectInput
          label={t('settings.currency')}
          value={settings.currency}
          onChange={(e) => onChange({ ...settings, currency: e.target.value })}
        >
          <option value="INR">🇮🇳 Indian Rupee (₹)</option>
          <option value="USD">🇺🇸 US Dollar ($)</option>
          <option value="EUR">🇪🇺 Euro (€)</option>
          <option value="GBP">🇬🇧 British Pound (£)</option>
          <option value="JPY">🇯🇵 Japanese Yen (¥)</option>
          <option value="AUD">🇦🇺 Australian Dollar ($)</option>
          <option value="CAD">🇨🇦 Canadian Dollar ($)</option>
          <option value="SGD">🇸🇬 Singapore Dollar ($)</option>
        </SelectInput>

        <SelectInput
          label="Timezone"
          value={settings.timezone}
          onChange={(e) => onChange({ ...settings, timezone: e.target.value })}
        >
          <option value="Africa/Cairo">Africa/Cairo (EET)</option>
          <option value="America/Chicago">America/Chicago (CST)</option>
          <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
          <option value="America/New_York">America/New York (EST)</option>
          <option value="Asia/Dubai">Asia/Dubai (GST)</option>
          <option value="Asia/Hong_Kong">Asia/Hong Kong (HKT)</option>
          <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
          <option value="Asia/Karachi">Asia/Karachi (PKT)</option>
          <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
          <option value="Asia/Seoul">Asia/Seoul (KST)</option>
          <option value="Asia/Shanghai">Asia/Shanghai (CST)</option>
          <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
          <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
          <option value="Australia/Sydney">Australia/Sydney (AEDT)</option>
          <option value="Europe/Berlin">Europe/Berlin (CET)</option>
          <option value="Europe/London">Europe/London (GMT)</option>
          <option value="Europe/Moscow">Europe/Moscow (MSK)</option>
          <option value="Europe/Paris">Europe/Paris (CET)</option>
          <option value="Pacific/Auckland">Pacific/Auckland (NZDT)</option>
          <option value="UTC">UTC (Coordinated Universal Time)</option>
        </SelectInput>

        <SelectInput
          label="Date Format"
          value={settings.dateFormat}
          onChange={(e) => onChange({ ...settings, dateFormat: e.target.value })}
        >
          <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2025)</option>
          <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2025)</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD (2025-12-31)</option>
          <option value="DD-MM-YYYY">DD-MM-YYYY (31-12-2025)</option>
          <option value="YYYY/MM/DD">YYYY/MM/DD (2025/12/31)</option>
        </SelectInput>

        <SelectInput
          label="Language"
          value={settings.language}
          onChange={(e) => onChange({ ...settings, language: e.target.value })}
        >
          <option value="en">English</option>
          <option value="hi">Hindi (हिन्दी)</option>
          <option value="ml">Malayalam (മലയാളം)</option>
          <option value="ta">Tamil (தமிழ்)</option>
          <option value="te">Telugu (తెలుగు)</option>
        </SelectInput>

        <SaveButton onClick={() => onSave('System')} saving={saving} />
      </div>
    </div>
  );
};

export default SystemTab;
