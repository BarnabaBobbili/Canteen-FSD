/**
 * Translate Missing Keys Script
 * Finds missing translation keys and auto-translates them
 *
 * Usage: node scripts/translate-missing.js
 */

const fs = require('fs');
const path = require('path');
const { translate } = require('@vitalets/google-translate-api');

const LOCALES_DIR = path.join(__dirname, '../src/i18n/locales');

const LANGUAGES = {
  en: 'English',
  hi: 'Hindi',
  ta: 'Tamil',
  te: 'Telugu',
  ml: 'Malayalam'
};

/**
 * Load translations from JSON file
 */
function loadTranslations(lang) {
  const filePath = path.join(LOCALES_DIR, `${lang}.json`);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return {};
}

/**
 * Save translations to JSON file
 */
function saveTranslations(lang, translations) {
  const filePath = path.join(LOCALES_DIR, `${lang}.json`);
  const sortedTranslations = Object.keys(translations)
    .sort()
    .reduce((acc, key) => {
      acc[key] = translations[key];
      return acc;
    }, {});

  fs.writeFileSync(
    filePath,
    JSON.stringify(sortedTranslations, null, 2) + '\n',
    'utf8'
  );
}

/**
 * Translate text to target language
 */
async function translateText(text, targetLang) {
  try {
    await new Promise(resolve => setTimeout(resolve, 100));
    const result = await translate(text, { to: targetLang });
    return result.text;
  } catch (error) {
    console.error(`Translation error: ${error.message}`);
    return text;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Checking for missing translations...\n');

  // Load all translations
  const allTranslations = {};
  for (const lang of Object.keys(LANGUAGES)) {
    allTranslations[lang] = loadTranslations(lang);
  }

  // Get all unique keys from English (master)
  const englishKeys = Object.keys(allTranslations.en);
  console.log(`📝 Found ${englishKeys.length} keys in English\n`);

  // Process each language
  for (const [lang, langName] of Object.entries(LANGUAGES)) {
    if (lang === 'en') continue; // Skip English

    console.log(`🌐 Checking ${langName} (${lang})...`);
    const translations = allTranslations[lang];
    const missingKeys = englishKeys.filter(key => !translations[key]);

    if (missingKeys.length === 0) {
      console.log(`   ✓ No missing keys\n`);
      continue;
    }

    console.log(`   ⚠️  Found ${missingKeys.length} missing keys`);

    for (const key of missingKeys) {
      const englishText = allTranslations.en[key];
      process.stdout.write(`   Translating "${key}": "${englishText.substring(0, 30)}..." `);

      const translated = await translateText(englishText, lang);
      translations[key] = translated;
      console.log('✓');
    }

    saveTranslations(lang, translations);
    console.log(`   ✓ Saved ${missingKeys.length} new translations\n`);
  }

  console.log('✨ Translation sync complete!');
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
