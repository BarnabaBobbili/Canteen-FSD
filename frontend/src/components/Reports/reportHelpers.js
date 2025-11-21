/**
 * Report Helper Functions
 * Utilities for PDF and Excel report generation
 */

/**
 * Format currency for PDF export (PDF-safe, no Unicode symbols)
 * Converts currency symbols to text abbreviations to avoid encoding issues
 * @param {string} formattedCurrency - Currency string with symbols (e.g., "₹100.00")
 * @returns {string} PDF-safe currency string (e.g., "INR 100.00")
 */
export const formatCurrencyForPDF = (formattedCurrency) => {
  if (!formattedCurrency) return 'INR 0.00';

  // Mapping of currency symbols to their text abbreviations
  const symbolToCode = {
    '₹': 'INR',
    '$': 'USD',
    '€': 'EUR',
    '£': 'GBP',
    '¥': 'JPY',
    'د.إ': 'AED',
    'A$': 'AUD'
  };

  // Convert to string and trim
  const currencyStr = String(formattedCurrency).trim();

  // Replace each symbol with its text code
  let result = currencyStr;
  for (const [symbol, code] of Object.entries(symbolToCode)) {
    if (result.includes(symbol)) {
      result = result.replace(symbol, code + ' ');
    }
  }

  return result;
};

/**
 * Sanitize text for PDF export
 * Removes or replaces problematic Unicode characters
 * @param {string} text - Text to sanitize
 * @returns {string} PDF-safe text
 */
export const sanitizeForPDF = (text) => {
  if (!text) return '';

  return String(text)
    // Remove zero-width characters
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    // Replace smart quotes with regular quotes
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    // Replace em/en dashes with hyphens
    .replace(/[\u2013\u2014]/g, '-')
    // Replace ellipsis
    .replace(/\u2026/g, '...')
    // Keep only ASCII and common Latin characters
    .replace(/[^\x00-\x7F\u00A0-\u00FF]/g, '');
};

/**
 * Format date for PDF export
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateForPDF = (date) => {
  if (!date) return '';

  const d = new Date(date);
  if (isNaN(d.getTime())) return '';

  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
};

/**
 * Get PDF file name with timestamp
 * @param {string} reportType - Type of report (e.g., 'Sales', 'Inventory')
 * @param {string} startDate - Start date
 * @param {string} endDate - End date
 * @returns {string} Formatted filename
 */
export const getPDFFileName = (reportType, startDate, endDate) => {
  const timestamp = new Date().toISOString().split('T')[0];
  if (startDate && endDate) {
    return `${reportType}_Report_${startDate}_to_${endDate}.pdf`;
  }
  return `${reportType}_Report_${timestamp}.pdf`;
};

/**
 * Get Excel file name with timestamp
 * @param {string} reportType - Type of report (e.g., 'Sales', 'Inventory')
 * @param {string} startDate - Start date
 * @param {string} endDate - End date
 * @returns {string} Formatted filename
 */
export const getExcelFileName = (reportType, startDate, endDate) => {
  const timestamp = new Date().toISOString().split('T')[0];
  if (startDate && endDate) {
    return `${reportType}_Report_${startDate}_to_${endDate}.xlsx`;
  }
  return `${reportType}_Report_${timestamp}.xlsx`;
};
