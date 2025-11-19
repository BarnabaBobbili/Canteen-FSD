import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserPlus, User, Mail, Phone, LogIn, ArrowLeft, AlertCircle } from 'lucide-react';

// Import extracted components
import BrandingSection from './BrandingSection';
import EmailVerificationScreen from './EmailVerificationScreen';
import PasswordInput from './PasswordInput';
import GoogleAuthButton from './GoogleAuthButton';
import DemoAccountButtons from './DemoAccountButtons';

// Import hooks and utilities
import { useAuthForm } from './useAuthForm';
import { authStyles, getBackgroundStyle } from './authStyles';

/**
 * Unified Authentication Form
 * Handles both login and signup with configurable styling
 * Refactored from 561 lines → ~240 lines
 *
 * @param {string} mode - 'login' or 'signup'
 * @param {string} variant - 'default' or 'sketch'
 * @param {string} title - Form title
 * @param {string} subtitle - Form subtitle
 * @param {boolean} showDemoAccounts - Show demo account buttons
 * @param {boolean} showBackButton - Show back to home button
 * @param {string} role - Default role for signup ('customer' for public)
 */
const AuthForm = ({
  mode = 'signup',
  variant = 'default',
  title,
  subtitle,
  showDemoAccounts = false,
  showBackButton = true,
  role = 'customer'
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    formData,
    error,
    loading,
    verificationSent,
    userEmail,
    handleSubmit,
    handleChange,
    handleGoogleSuccess,
    handleGoogleError,
    handleDemoLogin
  } = useAuthForm(mode, role);

  const style = authStyles[variant];

  // Show verification message instead of form if email verification is required
  if (verificationSent && mode === 'signup') {
    return (
      <EmailVerificationScreen
        userEmail={userEmail}
        variant={variant}
        style={style}
      />
    );
  }

  return (
    <div className={style.container} style={getBackgroundStyle(variant)}>
      {/* Background Pattern */}
      {variant === 'default' && (
        <div className={style.bgPattern}>
          <div className={style.blob1}></div>
          <div className={style.blob2}></div>
        </div>
      )}

      <div className="relative max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <BrandingSection mode={mode} variant={variant} style={style} />

        {/* Right Side - Form */}
        <div className={style.rightCard}>
          {showBackButton && variant === 'sketch' && (
            <button
              onClick={() => navigate('/')}
              className={`mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-bold border-2 border-transparent hover:border-gray-900 p-2 transform hover:rotate-3`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t('auth.backToHome')}</span>
            </button>
          )}

          <div className="mb-8">
            <h2 className={`text-3xl font-bold text-gray-900 mb-2 ${variant === 'sketch' ? 'underline decoration-wavy decoration-2 underline-offset-4' : ''}`}>
              {title || t(mode === 'login' ? 'auth.welcomeBack' : 'auth.createAccount')}
            </h2>
            <p className={`text-gray-600 ${variant === 'sketch' ? 'font-medium' : ''}`}>
              {subtitle || t(mode === 'login' ? 'auth.signInToDashboard' : 'auth.signUpToOrder')}
            </p>
          </div>

          {error && (
            <div className={`mb-6 bg-red-50 border-l-4 border-red-500 p-4 ${variant === 'default' ? 'rounded-lg' : ''} flex items-start gap-3`}>
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <div className={`text-red-700 text-sm ${variant === 'sketch' ? 'font-bold' : ''}`}>{error}</div>
            </div>
          )}

          {mode === 'signup' && (
            <GoogleAuthButton
              mode="signup"
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              dividerStyle={style.divider}
              showDivider={true}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <>
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${variant === 'sketch' ? 'font-black' : ''}`}>
                    {t('common.fullName')}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={style.input}
                      placeholder={t('common.fullNamePlaceholder')}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${variant === 'sketch' ? 'font-black' : ''}`}>
                    {t('common.emailAddress')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={style.input}
                      placeholder={t('common.emailPlaceholder')}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${variant === 'sketch' ? 'font-black' : ''}`}>
                    {t('common.phoneNumber')}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={style.input}
                      placeholder={t('common.phonePlaceholder')}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {mode === 'login' && (
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2`}>{t('common.emailAddress')}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={style.input}
                    placeholder={t('common.emailPlaceholder')}
                    required
                  />
                </div>
              </div>
            )}

            <PasswordInput
              label={t('common.password')}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('common.passwordPlaceholder')}
              inputStyle={style.input}
              labelStyle={`block text-sm font-medium text-gray-700 mb-2 ${variant === 'sketch' && mode === 'signup' ? 'font-black' : ''}`}
            />

            {mode === 'signup' && (
              <PasswordInput
                label={t('common.confirmPassword')}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t('common.passwordPlaceholder')}
                inputStyle={style.input}
                labelStyle={`block text-sm font-medium text-gray-700 mb-2 ${variant === 'sketch' ? 'font-black' : ''}`}
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className={`${style.button} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>{t('common.processing')}</>
              ) : (
                <>
                  {mode === 'login' ? <LogIn size={20} /> : <UserPlus size={20} />}
                  {mode === 'login' ? t('auth.signIn') : t('auth.createAccount')}
                </>
              )}
            </button>
          </form>

          {mode === 'login' && (
            <GoogleAuthButton
              mode="login"
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              dividerStyle={style.divider}
              showDivider={true}
            />
          )}

          {showDemoAccounts && mode === 'login' && (
            <DemoAccountButtons onDemoLogin={handleDemoLogin} />
          )}

          <div className="mt-6 text-center space-y-3">
            <p className={`text-gray-600 ${variant === 'sketch' ? 'font-medium' : ''}`}>
              {mode === 'login' ? t('auth.noAccount') : t('auth.alreadyHaveAccount')}{' '}
              <button
                onClick={() => navigate(mode === 'login' ? '/signup' : '/login')}
                className={style.link}
              >
                {mode === 'login' ? t('auth.signUp') : t('auth.signIn')}
              </button>
            </p>
            {showBackButton && variant === 'default' && (
              <button
                onClick={() => navigate('/')}
                className={`${style.link} text-sm`}
              >
                {t('auth.backToHomeArrow')}
              </button>
            )}
            {variant === 'sketch' && mode === 'signup' && (
              <p className="text-sm text-gray-500 font-medium">
                {t('auth.staffMember')}{' '}
                <button
                  onClick={() => navigate('/staff/login')}
                  className={style.link}
                >
                  {t('auth.staffLogin')}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
