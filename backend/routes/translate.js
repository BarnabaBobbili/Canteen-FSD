const express = require('express');
const router = express.Router();
const { Translate } = require('@google-cloud/translate').v2;

// Initialize Google Translate client
let translate;

try {
  // Option 1: Using API Key (simpler for development)
  if (process.env.GOOGLE_TRANSLATE_API_KEY) {
    translate = new Translate({
      key: process.env.GOOGLE_TRANSLATE_API_KEY
    });
  }
  // Option 2: Using Service Account (more secure for production)
  else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    translate = new Translate({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
    });
  } else {
    console.warn('Google Translate not configured. Set GOOGLE_TRANSLATE_API_KEY in .env');
  }
} catch (error) {
  console.error('Error initializing Google Translate:', error);
}

// Translate single text
router.post('/text', async (req, res) => {
  try {
    if (!translate) {
      return res.status(503).json({
        error: 'Translation service not configured',
        message: 'Please set GOOGLE_TRANSLATE_API_KEY in .env file'
      });
    }

    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({
        error: 'Missing required fields: text and targetLanguage'
      });
    }

    const [translation] = await translate.translate(text, targetLanguage);

    res.json({
      originalText: text,
      translatedText: translation,
      targetLanguage
    });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({
      error: 'Translation failed',
      message: error.message
    });
  }
});

// Translate multiple texts (batch translation)
router.post('/batch', async (req, res) => {
  try {
    if (!translate) {
      return res.status(503).json({
        error: 'Translation service not configured',
        message: 'Please set GOOGLE_TRANSLATE_API_KEY in .env file'
      });
    }

    const { texts, targetLanguage } = req.body;

    if (!texts || !Array.isArray(texts) || !targetLanguage) {
      return res.status(400).json({
        error: 'Missing required fields: texts (array) and targetLanguage'
      });
    }

    const [translations] = await translate.translate(texts, targetLanguage);

    // Ensure translations is always an array
    const translationArray = Array.isArray(translations) ? translations : [translations];

    res.json({
      translations: translationArray,
      targetLanguage,
      count: translationArray.length
    });
  } catch (error) {
    console.error('Batch translation error:', error);
    res.status(500).json({
      error: 'Batch translation failed',
      message: error.message
    });
  }
});

// Translate entire JSON object (for i18n files)
router.post('/json', async (req, res) => {
  try {
    if (!translate) {
      return res.status(503).json({
        error: 'Translation service not configured',
        message: 'Please set GOOGLE_TRANSLATE_API_KEY in .env file'
      });
    }

    const { translations, targetLanguage } = req.body;

    if (!translations || typeof translations !== 'object' || !targetLanguage) {
      return res.status(400).json({
        error: 'Missing required fields: translations (object) and targetLanguage'
      });
    }

    // Extract all values from the JSON object
    const keys = Object.keys(translations);
    const values = Object.values(translations);

    // Translate all values in batch
    const [translatedValues] = await translate.translate(values, targetLanguage);

    // Ensure translatedValues is always an array
    const translationArray = Array.isArray(translatedValues) ? translatedValues : [translatedValues];

    // Reconstruct the object with translated values
    const translatedObject = {};
    keys.forEach((key, index) => {
      translatedObject[key] = translationArray[index];
    });

    res.json({
      translations: translatedObject,
      targetLanguage,
      keyCount: keys.length
    });
  } catch (error) {
    console.error('JSON translation error:', error);
    res.status(500).json({
      error: 'JSON translation failed',
      message: error.message
    });
  }
});

// Get supported languages
router.get('/languages', async (req, res) => {
  try {
    if (!translate) {
      return res.status(503).json({
        error: 'Translation service not configured',
        message: 'Please set GOOGLE_TRANSLATE_API_KEY in .env file'
      });
    }

    const [languages] = await translate.getLanguages();

    res.json({
      languages,
      count: languages.length
    });
  } catch (error) {
    console.error('Get languages error:', error);
    res.status(500).json({
      error: 'Failed to get languages',
      message: error.message
    });
  }
});

module.exports = router;
