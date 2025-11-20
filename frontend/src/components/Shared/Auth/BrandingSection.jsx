import React from 'react';
import { useTranslation } from 'react-i18next';
import { UtensilsCrossed, UserPlus, Lock } from 'lucide-react';

/**
 * BrandingSection Component
 * Left side branding panel for authentication forms
 */
const BrandingSection = ({ mode, variant, style }) => {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:block">
      <div className={style.leftCard}>
        <div className={style.leftInner}>
          <div className="flex items-center gap-3 mb-6">
            <div className={variant === 'sketch' ? "bg-gray-900 border-3 border-gray-900 p-3 transform rotate-3" : "bg-white p-3 rounded-xl"}>
              <UtensilsCrossed className={`w-10 h-10 ${variant === 'sketch' ? 'text-white' : 'text-sky-500'}`} />
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
  );
};

export default BrandingSection;
