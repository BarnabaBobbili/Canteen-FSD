import React from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';

/**
 * GoogleAuthButton Component
 * Wrapper for Google OAuth login/signup with divider
 */
const GoogleAuthButton = ({
  mode = 'login',
  onSuccess,
  onError,
  dividerStyle,
  showDivider = true
}) => {
  const { t } = useTranslation();

  return (
    <>
      {showDivider && (
        <div className="mb-6 flex items-center">
          <div className={dividerStyle}></div>
          <span className={`px-4 text-gray-500 text-sm ${dividerStyle?.includes('font-black') ? 'font-black' : ''}`}>
            {t('common.or')}
          </span>
          <div className={dividerStyle}></div>
        </div>
      )}

      <div className={showDivider ? "" : "mb-6"} style={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          text={mode === 'signup' ? "signup_with" : "signin_with"}
          shape="rectangular"
          theme="outline"
          size="large"
          useOneTap={mode === 'login'}
          width="100%"
        />
      </div>
    </>
  );
};

export default GoogleAuthButton;
