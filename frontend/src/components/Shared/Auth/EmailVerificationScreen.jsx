import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import { getBackgroundStyle } from './authStyles';

/**
 * EmailVerificationScreen Component
 * Displays message after successful signup with email verification
 */
const EmailVerificationScreen = ({ userEmail, variant, style }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={style.container} style={getBackgroundStyle(variant)}>
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
};

export default EmailVerificationScreen;
