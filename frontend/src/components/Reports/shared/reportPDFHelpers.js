import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrencyForPDF } from '../reportHelpers';

/**
 * Create PDF document with standard header
 * @param {string} title - Report title
 * @param {Object} dateRange - Optional date range {startDate, endDate}
 * @returns {jsPDF} PDF document instance
 */
export const createPDFWithHeader = (title, dateRange = null) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFontSize(20);
  doc.text(title, pageWidth / 2, 15, { align: 'center' });

  doc.setFontSize(10);
  if (dateRange && dateRange.startDate && dateRange.endDate) {
    doc.text(`Period: ${dateRange.startDate} to ${dateRange.endDate}`, pageWidth / 2, 22, { align: 'center' });
  }
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 27, { align: 'center' });

  return doc;
};

/**
 * Add summary section to PDF
 * @param {jsPDF} doc - PDF document
 * @param {string} sectionTitle - Section heading
 * @param {Array} data - Summary data as [key, value] pairs
 * @param {number} startY - Y position to start
 * @returns {number} Final Y position after table
 */
export const addPDFSummarySection = (doc, sectionTitle, data, startY = 35) => {
  doc.setFontSize(14);
  doc.text(sectionTitle, 14, startY);

  autoTable(doc, {
    startY: startY + 5,
    head: [['Metric', 'Value']],
    body: data,
    theme: 'grid',
    headStyles: { fillColor: [249, 115, 22] }
  });

  return doc.lastAutoTable.finalY;
};

/**
 * Add data table section to PDF
 * @param {jsPDF} doc - PDF document
 * @param {string} sectionTitle - Section heading
 * @param {Array} headers - Column headers
 * @param {Array} data - Table data rows
 * @param {number} startY - Y position to start
 * @returns {number} Final Y position after table
 */
export const addPDFTableSection = (doc, sectionTitle, headers, data, startY) => {
  const currentY = startY + 10;
  doc.setFontSize(14);
  doc.text(sectionTitle, 14, currentY);

  autoTable(doc, {
    startY: currentY + 5,
    head: [headers],
    body: data,
    theme: 'striped',
    headStyles: { fillColor: [249, 115, 22] }
  });

  return doc.lastAutoTable.finalY;
};

/**
 * Check if new page is needed and add if necessary
 * @param {jsPDF} doc - PDF document
 * @param {number} currentY - Current Y position
 * @param {number} requiredSpace - Space needed for next section
 * @returns {number} Updated Y position
 */
export const checkAddPage = (doc, currentY, requiredSpace = 40) => {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (currentY + requiredSpace > pageHeight - 20) {
    doc.addPage();
    return 20;
  }
  return currentY;
};
