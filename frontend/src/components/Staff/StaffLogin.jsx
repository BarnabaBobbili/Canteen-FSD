import React from 'react';
import { useTranslation } from 'react-i18next';
import AuthForm from '../Shared/Auth/AuthForm';

/**
 * Staff Login Page
 * Thin wrapper around unified AuthForm component with demo accounts
 * Refactored from 275 lines → 14 lines
 */
const StaffLogin = () => {
  const { t } = useTranslation();
  return (
    <AuthForm
      mode="login"
      variant="default"
      title={t('auth.welcomeBack')}
      subtitle={t('auth.signInToDashboard')}
      showDemoAccounts={true}
    />
  );
};

export default StaffLogin;
