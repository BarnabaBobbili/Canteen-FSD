import * as XLSX from 'xlsx';

/**
 * Create Excel workbook with summary and data sheets
 * @param {string} reportTitle - Report title
 * @param {Array} summaryData - Summary data as [key, value] pairs
 * @param {Object} dataSheets - Object with sheet names as keys and {headers, rows} as values
 * @param {string} filename - Output filename
 */
export const createExcelReport = (reportTitle, summaryData, dataSheets, filename) => {
  const wb = XLSX.utils.book_new();

  // Summary Sheet
  const summaryWS = XLSX.utils.aoa_to_sheet([
    [reportTitle],
    [`Generated: ${new Date().toLocaleDateString()}`],
    [],
    ['Metric', 'Value'],
    ...summaryData
  ]);

  // Set column widths
  summaryWS['!cols'] = [{ wch: 30 }, { wch: 20 }];

  XLSX.utils.book_append_sheet(wb, summaryWS, 'Summary');

  // Add additional data sheets
  Object.entries(dataSheets).forEach(([sheetName, sheetData]) => {
    const ws = XLSX.utils.aoa_to_sheet([
      sheetData.headers,
      ...sheetData.rows
    ]);

    // Auto-size columns
    const colWidths = sheetData.headers.map((_, i) => ({
      wch: Math.max(
        15,
        ...sheetData.rows.map(row => String(row[i] || '').length)
      )
    }));
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
  });

  // Write file
  XLSX.writeFile(wb, filename);
};

/**
 * Convert object data to Excel rows
 * @param {Object} data - Data object
 * @returns {Array} Array of [key, value] pairs
 */
export const objectToExcelRows = (data) => {
  return Object.entries(data).map(([key, value]) => [
    key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
    value
  ]);
};
