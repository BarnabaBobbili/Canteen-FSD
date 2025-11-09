import React from 'react';
import AuthForm from '../Shared/Auth/AuthForm';

/**
 * Staff Login Page
 * Thin wrapper around unified AuthForm component with demo accounts
 * Refactored from 275 lines → 14 lines
 */
const StaffLogin = () => {
  return (
    <AuthForm
      mode="login"
      variant="default"
      title="Welcome Back!"
      subtitle="Sign in to access your dashboard"
      showDemoAccounts={true}
    />
  );
};

export default StaffLogin;
