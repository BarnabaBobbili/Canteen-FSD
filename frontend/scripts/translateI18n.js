/**
 * Auto-translate i18n files using Google Translate API
 * Handles nested JSON structures
 *
 * Usage: node scripts/translateI18n.js
 *
 * Requirements:
 * - Backend server must be running (npm start in backend folder)
 * - GOOGLE_TRANSLATE_API_KEY must be set in backend/.env
 */

const fs = require('fs');
const path = require('path');

const API_BASE_URL = 'http://localhost:5001/api';

// Language mappings
const languages = {
  hi: 'hi',  // Hindi
  ta: 'ta',  // Tamil
  te: 'te',  // Telugu
  ml: 'ml'   // Malayalam
};

/**
 * Flatten nested JSON object
 * { common: { dashboard: "Dashboard" } } => { "common.dashboard": "Dashboard" }
 */
function flattenJSON(obj, prefix = '') {
  let flattened = {};

  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively flatten nested objects
      Object.assign(flattened, flattenJSON(value, newKey));
    } else {
      // Add leaf values
      flattened[newKey] = value;
    }
  }

  return flattened;
}

/**
 * Unflatten JSON object
 * { "common.dashboard": "Dashboard" } => { common: { dashboard: "Dashboard" } }
 */
function unflattenJSON(obj) {
  const result = {};

  for (const key in obj) {
    const keys = key.split('.');
    let current = result;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (i === keys.length - 1) {
        // Leaf node
        current[k] = obj[key];
      } else {
        // Create nested object if it doesn't exist
        current[k] = current[k] || {};
        current = current[k];
      }
    }
  }

  return result;
}

// Read the English translation file (source)
const enPath = path.join(__dirname, '../src/i18n/locales/en.json');
const enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Flatten for translation
const flatEnTranslations = flattenJSON(enTranslations);

console.log('🌍 Starting translation process...');
console.log(`📄 Source file: en.json (${Object.keys(flatEnTranslations).length} keys)`);
console.log('');

// Function to translate to a specific language with batching
async function translateToLanguage(langCode, langName) {
  console.log(`🔄 Translating to ${langName} (${langCode})...`);

  try {
    const keys = Object.keys(flatEnTranslations);
    const values = Object.values(flatEnTranslations);
    const BATCH_SIZE = 50; // Translate 50 keys at a time
    const translatedFlat = {};

    // Split into batches
    for (let i = 0; i < keys.length; i += BATCH_SIZE) {
      const batchKeys = keys.slice(i, i + BATCH_SIZE);
      const batchValues = values.slice(i, i + BATCH_SIZE);

      console.log(`   Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(keys.length / BATCH_SIZE)} (${batchKeys.length} keys)...`);

      const response = await fetch(`${API_BASE_URL}/translate/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          texts: batchValues,
          targetLanguage: langCode
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Translation failed');
      }

      const data = await response.json();

      // Map translated values back to keys
      batchKeys.forEach((key, index) => {
        translatedFlat[key] = data.translations[index];
      });

      // Add small delay between batches to avoid rate limiting
      if (i + BATCH_SIZE < keys.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Unflatten the translated object
    const translatedNested = unflattenJSON(translatedFlat);

    // Write translated file
    const outputPath = path.join(__dirname, `../src/i18n/locales/${langCode}.json`);
    fs.writeFileSync(
      outputPath,
      JSON.stringify(translatedNested, null, 2),
      'utf8'
    );

    console.log(`✅ ${langName} translation completed (${keys.length} keys)`);
    console.log(`   Saved to: ${outputPath}`);
    console.log('');

    return true;
  } catch (error) {
    console.error(`❌ Failed to translate to ${langName}:`, error.message);
    console.log('');
    return false;
  }
}

// Main function to translate all languages
async function translateAll() {
  console.log('⚙️  Configuration:');
  console.log(`   API URL: ${API_BASE_URL}`);
  console.log(`   Languages: ${Object.keys(languages).join(', ')}`);
  console.log('');
  console.log('━'.repeat(60));
  console.log('');

  let successCount = 0;
  let failCount = 0;

  for (const [langCode, googleLangCode] of Object.entries(languages)) {
    const langNames = {
      hi: 'Hindi',
      ta: 'Tamil',
      te: 'Telugu',
      ml: 'Malayalam'
    };

    const success = await translateToLanguage(googleLangCode, langNames[langCode]);

    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // Add delay to avoid rate limiting
    if (langCode !== 'ml') {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('━'.repeat(60));
  console.log('');
  console.log('📊 Translation Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📝 Total keys per language: ${Object.keys(flatEnTranslations).length}`);
  console.log('');

  if (failCount === 0) {
    console.log('🎉 All translations completed successfully!');
  } else {
    console.log('⚠️  Some translations failed. Please check the errors above.');
    console.log('');
    console.log('💡 Troubleshooting:');
    console.log('   1. Make sure backend server is running (npm start in backend folder)');
    console.log('   2. Check that GOOGLE_TRANSLATE_API_KEY is set in backend/.env');
    console.log('   3. Verify your Google Cloud API key has Translation API enabled');
  }
}

// Check if backend is running before starting
async function checkBackend() {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/`);
    if (response.ok) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
}

// Run the script
(async () => {
  console.log('🔍 Checking backend server...');
  const backendRunning = await checkBackend();

  if (!backendRunning) {
    console.error('❌ Backend server is not running!');
    console.log('');
    console.log('Please start the backend server first:');
    console.log('   cd backend');
    console.log('   npm start');
    console.log('');
    process.exit(1);
  }

  console.log('✅ Backend server is running');
  console.log('');

  await translateAll();
})();
