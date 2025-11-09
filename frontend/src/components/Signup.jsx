import React from 'react';
import AuthForm from './Shared/Auth/AuthForm';

/**
 * Public Signup Page
 * Thin wrapper around unified AuthForm component
 * Refactored from 347 lines → 15 lines
 */
const Signup = () => {
  return (
    <AuthForm
      mode="signup"
      variant="default"
      title="Create Account"
      subtitle="Sign up as a customer to order from our canteen"
      role="customer"
    />
  );
};

export default Signup;
