/**
 * Translation Extraction Script
 * Extracts hardcoded strings from React components and auto-translates them
 *
 * Usage: node scripts/extract-translations.js
 */

const fs = require('fs');
const path = require('path');
const { translate } = require('@vitalets/google-translate-api');

// Language configurations
const LANGUAGES = {
  en: 'English',
  hi: 'Hindi',
  ta: 'Tamil',
  te: 'Telugu',
  ml: 'Malayalam'
};

const COMPONENTS_DIR = path.join(__dirname, '../src/components');
const LOCALES_DIR = path.join(__dirname, '../src/i18n/locales');

// Regex patterns to extract text
const PATTERNS = {
  jsxText: />([A-Z][^<>{]*[a-z][^<>{}]*)</g,
  stringLiteral: /['"`]([A-Z][^'"`]*[a-z][^'"`]{3,})['"`]/g,
  placeholder: /placeholder\s*=\s*[{"'`]([^}"'`]+)[}"'`]/g,
  title: /title\s*=\s*[{"'`]([^}"'`]+)[}"'`]/g,
  ariaLabel: /aria-label\s*=\s*[{"'`]([^}"'`]+)[}"'`]/g,
};

// Words to exclude (common code terms)
const EXCLUDE_WORDS = new Set([
  'className', 'onClick', 'onChange', 'onSubmit', 'useState', 'useEffect',
  'props', 'return', 'const', 'let', 'var', 'function', 'import', 'export',
  'from', 'default', 'true', 'false', 'null', 'undefined', 'async', 'await',
  'try', 'catch', 'throw', 'new', 'this', 'super', 'class', 'extends',
  'px-', 'py-', 'mt-', 'mb-', 'ml-', 'mr-', 'text-', 'bg-', 'border-',
  'flex', 'grid', 'rounded', 'shadow', 'hover:', 'focus:', 'active:',
]);

// Common UI patterns that shouldn't be translated
const EXCLUDE_PATTERNS = [
  /^[A-Z]{2,}$/,  // ALL CAPS (likely acronyms)
  /^\d/,  // Starts with number
  /^[a-z]/,  // Starts with lowercase (likely code)
  /[{}()[\]]/,  // Contains code characters
  /^(px|py|pt|pb|pl|pr|mt|mb|ml|mr|m|p|w|h|text|bg|border|flex|grid|rounded|shadow|hover|focus|active)/,  // Tailwind classes
  /\.(jsx?|tsx?|css|scss|json)$/,  // File extensions
];

/**
 * Check if text should be excluded from translation
 */
function shouldExclude(text) {
  const trimmed = text.trim();

  // Empty or too short
  if (!trimmed || trimmed.length < 3) return true;

  // In exclude list
  if (EXCLUDE_WORDS.has(trimmed)) return true;

  // Matches exclude patterns
  if (EXCLUDE_PATTERNS.some(pattern => pattern.test(trimmed))) return true;

  // Only special characters
  if (!/[a-zA-Z]/.test(trimmed)) return true;

  return false;
}

/**
 * Generate a translation key from text
 */
function generateKey(text) {
  return text
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '_')
    .toLowerCase()
    .substring(0, 50);
}

/**
 * Extract translatable strings from file content
 */
function extractStrings(content, filePath) {
  const strings = new Set();

  Object.entries(PATTERNS).forEach(([name, pattern]) => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const text = match[1];
      if (!shouldExclude(text)) {
        strings.add(text.trim());
      }
    }
  });

  return Array.from(strings);
}

/**
 * Recursively scan directory for JSX files
 */
function scanDirectory(dir) {
  const allStrings = new Map();

  function scan(currentDir) {
    const files = fs.readdirSync(currentDir);

    files.forEach(file => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scan(filePath);
      } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const strings = extractStrings(content, filePath);

        strings.forEach(str => {
          const key = generateKey(str);
          if (!allStrings.has(key)) {
            allStrings.set(key, str);
          }
        });
      }
    });
  }

  scan(dir);
  return allStrings;
}

/**
 * Translate text to target language using Google Translate
 */
async function translateText(text, targetLang) {
  try {
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));

    const result = await translate(text, { to: targetLang });
    return result.text;
  } catch (error) {
    console.error(`Translation error for "${text}" to ${targetLang}:`, error.message);
    return text; // Fallback to original text
  }
}

/**
 * Load existing translations from JSON file
 */
function loadExistingTranslations(lang) {
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
  console.log(`✓ Saved ${Object.keys(translations).length} translations to ${lang}.json`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Starting translation extraction...\n');

  // Step 1: Extract all strings
  console.log('📝 Extracting strings from components...');
  const extractedStrings = scanDirectory(COMPONENTS_DIR);
  console.log(`   Found ${extractedStrings.size} unique strings\n`);

  // Step 2: Load existing translations
  console.log('📂 Loading existing translations...');
  const existingTranslations = {};
  for (const lang of Object.keys(LANGUAGES)) {
    existingTranslations[lang] = loadExistingTranslations(lang);
    console.log(`   ${lang}: ${Object.keys(existingTranslations[lang]).length} existing keys`);
  }
  console.log();

  // Step 3: Process each language
  for (const [lang, langName] of Object.entries(LANGUAGES)) {
    console.log(`🌐 Processing ${langName} (${lang})...`);
    const translations = { ...existingTranslations[lang] };
    let newCount = 0;
    let skippedCount = 0;

    for (const [key, englishText] of extractedStrings) {
      if (translations[key]) {
        skippedCount++;
        continue;
      }

      if (lang === 'en') {
        translations[key] = englishText;
        newCount++;
      } else {
        process.stdout.write(`   Translating: "${englishText.substring(0, 40)}..." `);
        const translated = await translateText(englishText, lang);
        translations[key] = translated;
        console.log('✓');
        newCount++;
      }
    }

    saveTranslations(lang, translations);
    console.log(`   Added ${newCount} new translations, skipped ${skippedCount} existing\n`);
  }

  console.log('✨ Translation extraction complete!\n');
  console.log('📊 Summary:');
  console.log(`   Total unique strings: ${extractedStrings.size}`);
  console.log(`   Languages updated: ${Object.keys(LANGUAGES).length}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Review the generated translations for accuracy');
  console.log('   2. Update your components to use t() function');
  console.log('   3. Test language switching in your app');
}

// Run the script
main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
