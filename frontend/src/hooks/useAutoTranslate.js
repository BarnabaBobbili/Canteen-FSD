/**
 * Auto-Translation Hook
 * Automatically translates missing keys and provides fallback
 *
 * Usage:
 * const { tAuto } = useAutoTranslate();
 * <h1>{tAuto('myKey', 'My Default Text')}</h1>
 */

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const useAutoTranslate = () => {
  const { t, i18n } = useTranslation();
  const [missingKeys, setMissingKeys] = useState(new Set());

  /**
   * Auto-translate function with fallback
   * @param {string} key - Translation key
   * @param {string} fallback - Fallback text if key doesn't exist
   * @returns {string} Translated text or fallback
   */
  const tAuto = (key, fallback) => {
    const translated = t(key);

    // If translation returns the key itself, it means the key is missing
    if (translated === key && fallback) {
      // Log missing key for later processing
      if (!missingKeys.has(key)) {
        console.warn(`[i18n] Missing translation key: "${key}" (using fallback: "${fallback}")`);
        setMissingKeys(prev => new Set([...prev, key]));
      }
      return fallback;
    }

    return translated;
  };

  /**
   * Export missing keys (for debugging or auto-generation)
   */
  useEffect(() => {
    if (missingKeys.size > 0 && import.meta.env.MODE === 'development') {
      console.log('[i18n] Missing keys detected:', Array.from(missingKeys));
    }
  }, [missingKeys]);

  return {
    t,
    tAuto,
    language: i18n.language,
    changeLanguage: i18n.changeLanguage,
    missingKeys: Array.from(missingKeys)
  };
};

/**
 * Helper to generate translation key from text
 */
export const generateTranslationKey = (text) => {
  return text
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '_')
    .toLowerCase()
    .substring(0, 50);
};
