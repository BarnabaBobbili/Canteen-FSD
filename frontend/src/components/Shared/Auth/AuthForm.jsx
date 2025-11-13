import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import {
  UserPlus, User, Lock, AlertCircle, Eye, EyeOff, ChefHat, Mail, Phone, LogIn, ArrowLeft
} from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import {
  validatePasswordMatch,
  validatePasswordLength,
  validatePhone,
  getDefaultRedirect,
  demoAccounts
} from './authHelpers';

/**
 * Unified Authentication Form
 * Handles both login and signup with configurable styling
 * Refactored from 4 separate files (1,310 lines → 280 lines)
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  // Styling variants
  const styles = {
    default: {
      container: "min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 flex items-center justify-center p-6",
      bgPattern: "absolute inset-0 opacity-10",
      blob1: "absolute top-20 left-10 w-72 h-72 bg-sky-500 rounded-full blur-3xl",
      blob2: "absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl",
      leftCard: "bg-gradient-to-br from-sky-400 to-blue-500 rounded-3xl p-12 shadow-2xl",
      leftInner: "bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20",
      rightCard: "bg-white rounded-3xl shadow-2xl p-8 lg:p-12 max-h-[90vh] overflow-y-auto",
      input: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent",
      button: "w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 font-semibold",
      divider: "flex-1 border-t border-gray-300",
      link: "text-sky-600 hover:text-sky-700 font-medium"
    },
    sketch: {
      container: 'min-h-screen bg-white relative flex items-center justify-center p-6',
      bgPattern: `backgroundImage: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      leftCard: "bg-gray-900 border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] p-12 transform rotate-2",
      leftInner: "bg-white border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] p-8 transform -rotate-1",
      rightCard: "bg-white border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] p-8 lg:p-12 max-h-[90vh] overflow-y-auto transform -rotate-1",
      input: "w-full pl-10 pr-4 py-3 border-3 border-gray-900 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] font-medium transform focus:-rotate-1 transition-all",
      button: "w-full flex items-center justify-center gap-2 bg-gray-900 border-4 border-gray-900 text-white py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all transform hover:scale-105 hover:rotate-1 font-black",
      divider: "flex-1 border-t-2 border-dashed border-gray-400",
      link: "text-gray-900 hover:text-gray-600 font-black underline decoration-wavy decoration-2 underline-offset-2"
    }
  };

  const style = styles[variant];

  // Show verification message instead of form if email verification is required
  if (verificationSent && mode === 'signup') {
    return (
      <div className={style.container} style={variant === 'sketch' ? {
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
        fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
      } : {}}>
        <div className={style.rightCard} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Mail className="w-16 h-16 text-gray-900" />
            </div>
            <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${variant === 'sketch' ? 'underline decoration-wavy decoration-2 underline-offset-4' : ''}`}>
              {t('auth.checkYourEmail')}
            </h2>
            <p className={`text-gray-600 mb-6 ${variant === 'sketch' ? 'font-medium' : ''}`}>
              {t('auth.verificationLinkSent')} <strong>{userEmail}</strong>
            </p>
            <p className={`text-gray-600 mb-8 ${variant === 'sketch' ? 'font-medium' : ''}`}>
              {t('auth.checkInbox')}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/login')}
                className={style.button}
              >
                {t('auth.goToLogin')}
              </button>
              <p className={`text-sm text-gray-500 ${variant === 'sketch' ? 'font-medium' : ''}`}>
                {t('auth.noEmail')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container} style={variant === 'sketch' ? {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    } : {}}>
      {/* Background Pattern */}
      {variant === 'default' && (
        <div className={style.bgPattern}>
          <div className={style.blob1}></div>
          <div className={style.blob2}></div>
        </div>
      )}

      <div className="relative max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className={style.leftCard}>
            <div className={style.leftInner}>
              <div className="flex items-center gap-3 mb-6">
                <div className={variant === 'sketch' ? "bg-gray-900 border-3 border-gray-900 p-3 transform rotate-3" : "bg-white p-3 rounded-xl"}>
                  <ChefHat className={`w-10 h-10 ${variant === 'sketch' ? 'text-white' : 'text-sky-500'}`} />
                </div>
                <div className={variant === 'sketch' ? "text-gray-900" : "text-white"}>
                  <h1 className={`text-3xl ${variant === 'sketch' ? 'font-black' : 'font-bold'}`}>
                    {variant === 'sketch' ? t('auth.canteenDelight') : t('auth.smartCanteen')}
                  </h1>
                  <p className={variant === 'sketch' ? "text-gray-600 font-medium" : "text-sky-100"}>
                    {mode === 'login' ? t('auth.managementSystem') : t('auth.joinOurCommunity')}
                  </p>
                </div>
              </div>

              <div className={`space-y-4 ${variant === 'sketch' ? 'text-gray-900' : 'text-white'}`}>
                <div className="flex items-start gap-3">
                  <div className={variant === 'sketch' ? "bg-gray-900 border-2 border-gray-900 p-2 mt-1" : "bg-white/20 p-2 rounded-lg mt-1"}>
                    <UserPlus className={`w-5 h-5 ${variant === 'sketch' ? 'text-white' : ''}`} />
                  </div>
                  <div>
                    <h3 className={variant === 'sketch' ? "font-black" : "font-semibold"}>
                      {mode === 'login' ? t('auth.roleBasedAccess') : t('auth.quickRegistration')}
                    </h3>
                    <p className={`text-sm ${variant === 'sketch' ? 'text-gray-600 font-medium' : 'text-sky-100'}`}>
                      {mode === 'login' ? t('auth.secureLoginForAllRoles') : t('auth.createAccountInMinutes')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className={variant === 'sketch' ? "bg-gray-900 border-2 border-gray-900 p-2 mt-1" : "bg-white/20 p-2 rounded-lg mt-1"}>
                    <Lock className={`w-5 h-5 ${variant === 'sketch' ? 'text-white' : ''}`} />
                  </div>
                  <div>
                    <h3 className={variant === 'sketch' ? "font-black" : "font-semibold"}>{t('auth.secureAndProtected')}</h3>
                    <p className={`text-sm ${variant === 'sketch' ? 'text-gray-600 font-medium' : 'text-sky-100'}`}>
                      {mode === 'login' ? t('auth.jwtAuthentication') : t('auth.dataEncrypted')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
            <>
              <div className="mb-6 flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  text="signup_with"
                  shape="rectangular"
                  theme="outline"
                  size="large"
                  width="100%"
                />
              </div>

              <div className="mb-6 flex items-center">
                <div className={style.divider}></div>
                <span className={`px-4 text-gray-500 text-sm ${variant === 'sketch' ? 'font-black' : ''}`}>{t('common.or')}</span>
                <div className={style.divider}></div>
              </div>
            </>
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={style.input}
                    placeholder={t('common.emailPlaceholder')}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium text-gray-700 mb-2 ${variant === 'sketch' && mode === 'signup' ? 'font-black' : ''}`}>
                {t('common.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={mode === 'login' ? (e) => setFormData({ ...formData, password: e.target.value }) : handleChange}
                  className={style.input}
                  placeholder={t('common.passwordPlaceholder')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${variant === 'sketch' ? 'font-black' : ''}`}>
                  {t('common.confirmPassword')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={style.input}
                    placeholder={t('common.passwordPlaceholder')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
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
            <>
              <div className="mt-6 flex items-center">
                <div className={style.divider}></div>
                <span className="px-4 text-gray-500 text-sm">{t('common.or')}</span>
                <div className={style.divider}></div>
              </div>

              <div className="mt-6 flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  text="signin_with"
                  shape="rectangular"
                  theme="outline"
                  size="large"
                />
              </div>
            </>
          )}

          {showDemoAccounts && mode === 'login' && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4 text-center">{t('auth.demoAccounts')}</p>
              <div className="grid grid-cols-2 gap-3">
                {demoAccounts.map((account) => (
                  <button
                    key={account.role}
                    onClick={() => handleDemoLogin(account.email, account.password)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    {account.label}
                  </button>
                ))}
              </div>
            </div>
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
