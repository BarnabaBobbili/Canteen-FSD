import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Shared Table Component for Reports
 * Provides consistent table rendering with macOS styling
 *
 * @param {string} title - Table heading
 * @param {Array} columns - Array of column headers
 * @param {Array} rows - Array of row data (each row is an array matching column count)
 * @param {Function} renderCell - Optional custom cell renderer (rowData, columnIndex, rowIndex)
 */
const ReportTable = ({ title, columns, rows, renderCell }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      {title && (
        <h3 className="macos-subheading text-lg mb-4">
          {title}
        </h3>
      )}
      <div className="macos-table overflow-hidden">
        <table className="min-w-full">
          <thead className="macos-table-header">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="macos-table-row">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-6 py-4 text-sm">
                    {renderCell ? renderCell(row, cellIdx, rowIdx) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
