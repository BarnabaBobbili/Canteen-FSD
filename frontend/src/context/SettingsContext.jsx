import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import API_BASE_URL from '../config/api';
import i18n from '../i18n/i18n';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const { token } = useAuth();
  const [settings, setSettings] = useState({
    profile: {
      name: '',
      phone: ''
    },
    notifications: {
      emailNotifications: true,
      orderNotifications: true,
      inventoryAlerts: true,
      feedbackNotifications: false,
      dailyReports: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordExpiry: '90'
    },
    system: {
      currency: 'INR',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY',
      language: 'en'
    }
  });
  const [loading, setLoading] = useState(true);

  // Currency symbols mapping
  const currencySymbols = {
    'INR': '₹',
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'CNY': '¥',
    'AED': 'د.إ',
    'AUD': 'A$'
  };

  // Exchange rates (base currency: INR)
  // Updated rates as of 2024
  const exchangeRates = {
    'INR': 1.0,      // Base currency
    'USD': 0.012,    // 1 INR = 0.012 USD
    'EUR': 0.011,    // 1 INR = 0.011 EUR
    'GBP': 0.0095,   // 1 INR = 0.0095 GBP
    'JPY': 1.84,     // 1 INR = 1.84 JPY
    'CNY': 0.087,    // 1 INR = 0.087 CNY
    'AED': 0.044,    // 1 INR = 0.044 AED
    'AUD': 0.018     // 1 INR = 0.018 AUD
  };

  // Load settings from backend
  useEffect(() => {
    if (token) {
      loadSettings();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Apply language when it changes
  useEffect(() => {
    if (settings?.system?.language) {
      console.log('Applying language from settings:', settings.system.language);
      i18n.changeLanguage(settings.system.language);
    }
  }, [settings?.system?.language]);

  const loadSettings = async () => {
    try {
      console.log('Loading settings from backend...');
      const response = await fetch(`${API_BASE_URL}/settings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Settings loaded from backend:', data);
        // Backend returns settings directly (not wrapped)
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSettings)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Settings updated from backend:', data);
        // Backend returns { message, settings }
        setSettings(data.settings);

        // Apply language change immediately
        if (newSettings.system?.language) {
          console.log('Changing language to:', newSettings.system.language);
          await i18n.changeLanguage(newSettings.system.language);
          console.log('Current i18n language:', i18n.language);
        }

        return { success: true };
      }
      return { success: false, error: 'Failed to update settings' };
    } catch (error) {
      console.error('Error updating settings:', error);
      return { success: false, error: error.message };
    }
  };

  // Format currency based on settings with conversion
  const formatCurrency = (amount, fromCurrency = 'INR') => {
    const targetCurrency = settings?.system?.currency || 'INR';
    const amountInINR = parseFloat(amount);

    // Convert to target currency
    const exchangeRate = exchangeRates[targetCurrency] || 1.0;
    const convertedAmount = amountInINR * exchangeRate;

    const symbol = currencySymbols[targetCurrency] || targetCurrency;

    // Format based on currency (some currencies don't use decimals)
    const decimals = targetCurrency === 'JPY' ? 0 : 2;

    return `${symbol}${convertedAmount.toFixed(decimals)}`;
  };

  // Format date based on settings
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    const dateFormat = settings?.system?.dateFormat || 'DD/MM/YYYY';

    switch (dateFormat) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'DD-MM-YYYY':
        return `${day}-${month}-${year}`;
      case 'YYYY/MM/DD':
        return `${year}/${month}/${day}`;
      default:
        return `${day}/${month}/${year}`;
    }
  };

  // Format time based on timezone
  const formatTime = (date) => {
    const d = new Date(date);
    const timezone = settings?.system?.timezone || 'Asia/Kolkata';
    try {
      return d.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    } catch (error) {
      return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    }
  };

  // Get current time in selected timezone
  const getCurrentTime = () => {
    const timezone = settings?.system?.timezone || 'Asia/Kolkata';
    try {
      return new Date().toLocaleString('en-US', {
        timeZone: timezone
      });
    } catch (error) {
      return new Date().toLocaleString();
    }
  };

  const currency = settings?.system?.currency || 'INR';

  const value = {
    settings,
    updateSettings,
    loading,
    formatCurrency,
    formatDate,
    formatTime,
    getCurrentTime,
    currencySymbol: currencySymbols[currency] || currency
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
