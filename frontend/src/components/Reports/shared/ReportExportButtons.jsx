import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, FileSpreadsheet } from 'lucide-react';

/**
 * Shared Export Buttons Component for Reports
 * Provides consistent PDF and Excel export buttons across all reports
 */
const ReportExportButtons = ({ onExportPDF, onExportExcel }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row justify-end gap-3 mb-6">
      <button
        onClick={onExportPDF}
        className="macos-btn flex items-center justify-center gap-2 px-4 py-2.5 text-white"
        style={{
          background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
        }}
      >
        <FileText size={18} />
        {t('reports.exportPDF', 'Export PDF')}
      </button>
      <button
        onClick={onExportExcel}
        className="macos-btn flex items-center justify-center gap-2 px-4 py-2.5 text-white"
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
        }}
      >
        <FileSpreadsheet size={18} />
        {t('reports.exportExcel', 'Export Excel')}
      </button>
    </div>
  );
};

export default ReportExportButtons;
