import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from 'react-i18next';
import DashboardLayout from './DashboardLayout';
import { Settings as SettingsIcon, ArrowLeft } from 'lucide-react';

// Import tab components
import ProfileTab from './Settings/ProfileTab';
import NotificationsTab from './Settings/NotificationsTab';
import SecurityTab from './Settings/SecurityTab';
import SystemTab from './Settings/SystemTab';

// Import helpers
import { getSettingsTabs, mergeSettings } from './Settings/settingsHelpers';

/**
 * Settings Component
 * Main settings page with tabs for profile, notifications, security, and system
 * Refactored from 536 lines → ~180 lines
 */
const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { settings, updateSettings, loading } = useSettings();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState('profile');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [saving, setSaving] = useState(false);

  // Local state for editing
  const [profileSettings, setProfileSettings] = useState({ name: '', phone: '' });
  const [notificationSettings, setNotificationSettings] = useState({});
  const [systemSettings, setSystemSettings] = useState({});
  const [securitySettings, setSecuritySettings] = useState({});

  // Load settings from context when available
  useEffect(() => {
    if (settings) {
      const merged = mergeSettings(settings, user);
      setProfileSettings(merged.profile);
      setNotificationSettings(merged.notifications);
      setSecuritySettings(merged.security);
      setSystemSettings(merged.system);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const handleSave = async (section) => {
    setSaving(true);
    setErrorMessage('');

    try {
      let data;
      switch (section) {
        case 'Profile':
          data = { profile: profileSettings };
          break;
        case 'Notification':
          data = { notifications: notificationSettings };
          break;
        case 'Security':
          data = { security: securitySettings };
          break;
        case 'System':
          data = { system: systemSettings };
          break;
        default:
          throw new Error('Invalid section');
      }

      const result = await updateSettings(data);

      if (result.success) {
        setSuccessMessage(`${section} settings saved successfully!`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        throw new Error(result.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setErrorMessage('Failed to save settings. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const tabs = getSettingsTabs(t);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <SettingsIcon className="w-8 h-8" style={{ color: '#1570EF' }} />
          <h1 className="text-3xl font-bold text-gray-800">{t('settings.title')}</h1>
        </div>
        <p className="text-gray-600 ml-14">{t('settings.managePreferences')}</p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#1570EF' }}></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    style={activeTab === tab.id ? { backgroundColor: '#1570EF' } : {}}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              {activeTab === 'profile' && (
                <ProfileTab
                  user={user}
                  settings={profileSettings}
                  onChange={setProfileSettings}
                  onSave={handleSave}
                  saving={saving}
                />
              )}

              {activeTab === 'notifications' && (
                <NotificationsTab
                  settings={notificationSettings}
                  onChange={setNotificationSettings}
                  onSave={handleSave}
                  saving={saving}
                />
              )}

              {activeTab === 'security' && (
                <SecurityTab
                  settings={securitySettings}
                  onChange={setSecuritySettings}
                  onSave={handleSave}
                  saving={saving}
                />
              )}

              {activeTab === 'system' && (
                <SystemTab
                  settings={systemSettings}
                  onChange={setSystemSettings}
                  onSave={handleSave}
                  saving={saving}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Settings;
