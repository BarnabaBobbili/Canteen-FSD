import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { useTranslation } from 'react-i18next';
import DashboardLayout from './DashboardLayout';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Globe,
  Save,
  ArrowLeft
} from 'lucide-react';

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
  const [profileSettings, setProfileSettings] = useState({
    name: '',
    phone: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    inventoryAlerts: true,
    feedbackNotifications: false,
    dailyReports: false
  });

  const [systemSettings, setSystemSettings] = useState({
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    language: 'en'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90'
  });

  // Load settings from context when available
  useEffect(() => {
    if (settings) {
      setProfileSettings(settings.profile || { name: user?.name || '', phone: '' });
      setNotificationSettings(settings.notifications || {
        emailNotifications: true,
        orderNotifications: true,
        inventoryAlerts: true,
        feedbackNotifications: false,
        dailyReports: false
      });
      setSecuritySettings(settings.security || {
        twoFactorAuth: false,
        sessionTimeout: '30',
        passwordExpiry: '90'
      });
      setSystemSettings(settings.system || {
        currency: 'INR',
        timezone: 'Asia/Kolkata',
        dateFormat: 'DD/MM/YYYY',
        language: 'en'
      });
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

  const tabs = [
    { id: 'profile', label: t('settings.profileSettings'), icon: User },
    { id: 'notifications', label: t('settings.notificationSettings'), icon: Bell },
    { id: 'security', label: t('settings.securitySettings'), icon: Shield },
    { id: 'system', label: t('settings.systemSettings'), icon: Globe }
  ];

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
        <>

      {/* Settings Layout */}
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
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">{t('settings.profileSettings')}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.fullName')}</label>
                    <input
                      type="text"
                      value={profileSettings.name}
                      onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
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
                      value={profileSettings.phone}
                      onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
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
                  <button
                    onClick={() => handleSave('Profile')}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 text-white rounded-lg shadow-sm hover:opacity-90 transition-colors font-medium disabled:opacity-50"
                    style={{ backgroundColor: '#1570EF' }}
                  >
                    <Save className="w-4 h-4" />
                    {saving ? t('settings.saving') : t('settings.saveChanges')}
                  </button>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">{t('settings.notificationSettings')}</h2>
                <div className="space-y-4">
                  {Object.entries({
                    emailNotifications: t('settings.emailNotifications'),
                    orderNotifications: t('settings.orderNotifications'),
                    inventoryAlerts: t('settings.inventoryAlerts'),
                    feedbackNotifications: t('settings.feedbackNotifications'),
                    dailyReports: t('settings.dailyReports')
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{label}</p>
                        <p className="text-sm text-gray-600">Receive {label.toLowerCase()}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings[key]}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [key]: e.target.checked
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                  <button
                    onClick={() => handleSave('Notification')}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 text-white rounded-lg shadow-sm hover:opacity-90 transition-colors font-medium disabled:opacity-50"
                    style={{ backgroundColor: '#1570EF' }}
                  >
                    <Save className="w-4 h-4" />
                    {saving ? t('settings.saving') : t('settings.saveChanges')}
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">{t('settings.securitySettings')}</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{t('settings.twoFactorAuth')}</p>
                      <p className="text-sm text-gray-600">{t('settings.twoFactorAuthDesc')}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={securitySettings.twoFactorAuth}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            twoFactorAuth: e.target.checked
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.sessionTimeout')}</label>
                    <div className="relative">
                      <select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) =>
                          setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })
                        }
                        className="w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none text-gray-900 font-medium hover:border-gray-300"
                        style={{ '--tw-ring-color': '#1570EF' }}
                      >
                        <option value="15">{t('settings.sessionTimeout15')}</option>
                        <option value="30">{t('settings.sessionTimeout30')}</option>
                        <option value="60">{t('settings.sessionTimeout60')}</option>
                        <option value="120">{t('settings.sessionTimeout120')}</option>
                        <option value="240">{t('settings.sessionTimeout240')}</option>
                        <option value="480">{t('settings.sessionTimeout480')}</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.passwordExpiry')}</label>
                    <div className="relative">
                      <select
                        value={securitySettings.passwordExpiry}
                        onChange={(e) =>
                          setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })
                        }
                        className="w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none text-gray-900 font-medium hover:border-gray-300"
                        style={{ '--tw-ring-color': '#1570EF' }}
                      >
                        <option value="30">{t('settings.passwordExpiry30')}</option>
                        <option value="60">{t('settings.passwordExpiry60')}</option>
                        <option value="90">{t('settings.passwordExpiry90')}</option>
                        <option value="180">{t('settings.passwordExpiry180')}</option>
                        <option value="365">{t('settings.passwordExpiry365')}</option>
                        <option value="never">{t('settings.passwordExpiryNever')}</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSave('Security')}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 text-white rounded-lg shadow-sm hover:opacity-90 transition-colors font-medium disabled:opacity-50"
                    style={{ backgroundColor: '#1570EF' }}
                  >
                    <Save className="w-4 h-4" />
                    {saving ? t('settings.saving') : t('settings.saveChanges')}
                  </button>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">{t('settings.systemSettings')}</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings.currency')}</label>
                    <div className="relative">
                      <select
                        value={systemSettings.currency}
                        onChange={(e) => setSystemSettings({ ...systemSettings, currency: e.target.value })}
                        className="w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none text-gray-900 font-medium hover:border-gray-300"
                        style={{ '--tw-ring-color': '#1570EF' }}
                      >
                        <option value="INR">🇮🇳 Indian Rupee (₹)</option>
                        <option value="USD">🇺🇸 US Dollar ($)</option>
                        <option value="EUR">🇪🇺 Euro (€)</option>
                        <option value="GBP">🇬🇧 British Pound (£)</option>
                        <option value="JPY">🇯🇵 Japanese Yen (¥)</option>
                        <option value="AUD">🇦🇺 Australian Dollar ($)</option>
                        <option value="CAD">🇨🇦 Canadian Dollar ($)</option>
                        <option value="SGD">🇸🇬 Singapore Dollar ($)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <div className="relative">
                      <select
                        value={systemSettings.timezone}
                        onChange={(e) => setSystemSettings({ ...systemSettings, timezone: e.target.value })}
                        className="w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none text-gray-900 font-medium hover:border-gray-300"
                        style={{ '--tw-ring-color': '#1570EF' }}
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
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                    <div className="relative">
                      <select
                        value={systemSettings.dateFormat}
                        onChange={(e) => setSystemSettings({ ...systemSettings, dateFormat: e.target.value })}
                        className="w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none text-gray-900 font-medium hover:border-gray-300"
                        style={{ '--tw-ring-color': '#1570EF' }}
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2025)</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2025)</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD (2025-12-31)</option>
                        <option value="DD-MM-YYYY">DD-MM-YYYY (31-12-2025)</option>
                        <option value="YYYY/MM/DD">YYYY/MM/DD (2025/12/31)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <div className="relative">
                      <select
                        value={systemSettings.language}
                        onChange={(e) => setSystemSettings({ ...systemSettings, language: e.target.value })}
                        className="w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none text-gray-900 font-medium hover:border-gray-300"
                        style={{ '--tw-ring-color': '#1570EF' }}
                      >
                        <option value="as">Assamese (অসমীয়া)</option>
                        <option value="bn">Bengali (বাংলা)</option>
                        <option value="zh">Chinese (中文)</option>
                        <option value="en">English</option>
                        <option value="fr">French (Français)</option>
                        <option value="de">German (Deutsch)</option>
                        <option value="gu">Gujarati (ગુજરાતી)</option>
                        <option value="hi">Hindi (हिन्दी)</option>
                        <option value="ja">Japanese (日本語)</option>
                        <option value="kn">Kannada (ಕನ್ನಡ)</option>
                        <option value="ko">Korean (한국어)</option>
                        <option value="ml">Malayalam (മലയാളം)</option>
                        <option value="mr">Marathi (मराठी)</option>
                        <option value="ne">Nepali (नेपाली)</option>
                        <option value="or">Odia (ଓଡ଼ିଆ)</option>
                        <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
                        <option value="pt">Portuguese (Português)</option>
                        <option value="ru">Russian (Русский)</option>
                        <option value="sa">Sanskrit (संस्कृतम्)</option>
                        <option value="es">Spanish (Español)</option>
                        <option value="ta">Tamil (தமிழ்)</option>
                        <option value="te">Telugu (తెలుగు)</option>
                        <option value="ur">Urdu (اردو)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSave('System')}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-2.5 text-white rounded-lg shadow-sm hover:opacity-90 transition-colors font-medium disabled:opacity-50"
                    style={{ backgroundColor: '#1570EF' }}
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </>
      )}
    </DashboardLayout>
  );
};

export default Settings;
