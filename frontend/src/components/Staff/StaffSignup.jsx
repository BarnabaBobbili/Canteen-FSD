import React from 'react';
import AuthForm from '../Shared/Auth/AuthForm';

/**
 * Staff Signup Page
 * Thin wrapper around unified AuthForm component
 * Refactored from 346 lines → 15 lines
 */
const StaffSignup = () => {
  return (
    <AuthForm
      mode="signup"
      variant="default"
      title="Create Staff Account"
      subtitle="Sign up as staff to manage the canteen"
      role="staff"
    />
  );
};

export default StaffSignup;
