import React from 'react';
import { useTranslation } from 'react-i18next';
import AuthForm from '../Shared/Auth/AuthForm';

/**
 * Staff Signup Page
 * Thin wrapper around unified AuthForm component
 * Refactored from 346 lines → 15 lines
 */
const StaffSignup = () => {
  const { t } = useTranslation();
  return (
    <AuthForm
      mode="signup"
      variant="default"
      title={t('auth.createStaffAccount')}
      subtitle={t('auth.signUpAsStaff')}
      role="staff"
    />
  );
};

export default StaffSignup;
