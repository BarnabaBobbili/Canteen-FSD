import React from 'react';
import AuthForm from '../../Shared/Auth/AuthForm';

/**
 * User (Customer) Signup Page with Sketch Style
 * Thin wrapper around unified AuthForm component
 * Refactored from 347 lines → 16 lines
 */
const UserSignup = () => {
  return (
    <AuthForm
      mode="signup"
      variant="sketch"
      title="Create Account"
      subtitle="Sign up to start ordering delicious food"
      role="customer"
    />
  );
};

export default UserSignup;
