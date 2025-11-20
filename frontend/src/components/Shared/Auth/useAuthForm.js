import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';
import {
  validatePasswordMatch,
  validatePasswordLength,
  validatePhone,
  getDefaultRedirect
} from './authHelpers';

/**
 * useAuthForm Hook
 * Manages authentication form state and logic
 */
export const useAuthForm = (mode, role) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, login, googleLogin, isAuthenticated, user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = getDefaultRedirect(user.role);
      navigate(redirectPath, { replace: true, state: null });
    }
  }, [isAuthenticated, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation for signup mode
    if (mode === 'signup') {
      const passwordMatchError = validatePasswordMatch(formData.password, formData.confirmPassword);
      if (passwordMatchError) {
        setError(passwordMatchError);
        return;
      }
    }

    const passwordLengthError = validatePasswordLength(formData.password);
    if (passwordLengthError) {
      setError(passwordLengthError);
      return;
    }

    if (mode === 'signup') {
      const phoneError = validatePhone(formData.phone);
      if (phoneError) {
        setError(phoneError);
        return;
      }
    }

    setLoading(true);

    try {
      let result;
      if (mode === 'signup') {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role
        };
        result = await register(userData);
      } else {
        result = await login(formData.email, formData.password);
      }

      if (result.success) {
        // Check if email verification is required
        if (result.requiresVerification) {
          setVerificationSent(true);
          setUserEmail(result.email || formData.email);
        } else {
          const redirectPath = getDefaultRedirect(result.user?.role || formData.role);
          navigate(redirectPath, { replace: true, state: null });
        }
      } else {
        setError(result.message || t(mode === 'signup' ? 'auth.registrationFailed' : 'auth.loginFailed'));
      }
    } catch (err) {
      setError(t('auth.anErrorOccurred'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);

    try {
      const result = await googleLogin(credentialResponse.credential);

      if (result.success) {
        const redirectPath = getDefaultRedirect(result.user?.role || formData.role);
        navigate(redirectPath, { replace: true, state: null });
      } else {
        setError(result.message || t('auth.googleAuthFailed'));
      }
    } catch (err) {
      setError(t('auth.googleAuthError'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError(t('auth.googleAuthFailed'));
  };

  const handleDemoLogin = (email, password) => {
    setFormData({ ...formData, email, password });
  };

  return {
    formData,
    setFormData,
    error,
    loading,
    verificationSent,
    userEmail,
    handleSubmit,
    handleChange,
    handleGoogleSuccess,
    handleGoogleError,
    handleDemoLogin
  };
};
