import React from 'react';
import { useTranslation } from 'react-i18next';
import { demoAccounts } from './authHelpers';

/**
 * DemoAccountButtons Component
 * Quick login buttons for demo accounts (development only)
 */
const DemoAccountButtons = ({ onDemoLogin }) => {
  const { t } = useTranslation();

  if (demoAccounts.length === 0) {
    return null; // Don't render in production
  }

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <p className="text-sm text-gray-600 mb-4 text-center">
        {t('auth.demoAccounts')}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {demoAccounts.map((account) => (
          <button
            key={account.role}
            onClick={() => onDemoLogin(account.email, account.password)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            {account.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DemoAccountButtons;
