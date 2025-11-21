import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, FileSpreadsheet, AlertTriangle, Package, TrendingDown, XOctagon, DollarSign } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formatCurrencyForPDF, getPDFFileName, getExcelFileName } from './reportHelpers';

const InventoryReport = ({ inventoryData, formatCurrency }) => {
  const { t } = useTranslation();

  // Calculate inventory metrics
  const inventoryMetrics = useMemo(() => {
    const totalItems = inventoryData.length;
    const lowStockItems = inventoryData.filter(item => item.quantity < 20);
    const outOfStockItems = inventoryData.filter(item => item.quantity === 0);

    const totalValue = inventoryData.reduce((sum, item) => {
      return sum + (item.quantity * (item.unitPrice || 0));
    }, 0);

    // Group by category
    const byCategory = inventoryData.reduce((acc, item) => {
      const category = item.category || 'Other';
      if (!acc[category]) {
        acc[category] = {
          count: 0,
          totalQuantity: 0,
          totalValue: 0
        };
      }
      acc[category].count++;
      acc[category].totalQuantity += item.quantity;
      acc[category].totalValue += item.quantity * (item.unitPrice || 0);
      return acc;
    }, {});

    return {
      totalItems,
      lowStockCount: lowStockItems.length,
      outOfStockCount: outOfStockItems.length,
      totalValue,
      byCategory,
      lowStockItems,
      outOfStockItems
    };
  }, [inventoryData]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(20);
    doc.text('Inventory Report', pageWidth / 2, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 22, { align: 'center' });

    // Summary Statistics
    doc.setFontSize(14);
    doc.text('Inventory Summary', 14, 30);

    const summaryData = [
      ['Total Items', inventoryMetrics.totalItems.toString()],
      ['Low Stock Items', inventoryMetrics.lowStockCount.toString()],
      ['Out of Stock Items', inventoryMetrics.outOfStockCount.toString()],
      ['Total Inventory Value', formatCurrencyForPDF(formatCurrency(inventoryMetrics.totalValue))]
    ];

    autoTable(doc, {
      startY: 35,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'grid',
      headStyles: { fillColor: [249, 115, 22] }
    });

    // Inventory by Category
    let currentY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Inventory by Category', 14, currentY);

    const categoryData = Object.entries(inventoryMetrics.byCategory).map(([category, data]) => [
      category,
      data.count.toString(),
      data.totalQuantity.toString(),
      formatCurrencyForPDF(formatCurrency(data.totalValue))
    ]);

    autoTable(doc, {
      startY: currentY + 5,
      head: [['Category', 'Items', 'Total Quantity', 'Total Value']],
      body: categoryData,
      theme: 'grid',
      headStyles: { fillColor: [249, 115, 22] }
    });

    // Low Stock Items
    if (inventoryMetrics.lowStockItems.length > 0) {
      currentY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(14);
      doc.setTextColor(220, 38, 38); // Red color
      doc.text('Low Stock Alert', 14, currentY);
      doc.setTextColor(0, 0, 0); // Reset to black

      const lowStockData = inventoryMetrics.lowStockItems.map(item => [
        item.itemName,
        item.quantity.toString(),
        item.unit || 'pcs',
        item.supplier || 'N/A'
      ]);

      autoTable(doc, {
        startY: currentY + 5,
        head: [['Item Name', 'Quantity', 'Unit', 'Supplier']],
        body: lowStockData,
        theme: 'grid',
        headStyles: { fillColor: [220, 38, 38] }
      });
    }

    doc.save(getPDFFileName('Inventory', null, null));
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    // Summary Sheet
    const summaryData = [
      ['Inventory Report'],
      [`Generated: ${new Date().toLocaleDateString()}`],
      [],
      ['Metric', 'Value'],
      ['Total Items', inventoryMetrics.totalItems],
      ['Low Stock Items', inventoryMetrics.lowStockCount],
      ['Out of Stock Items', inventoryMetrics.outOfStockCount],
      ['Total Inventory Value', inventoryMetrics.totalValue]
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');

    // By Category Sheet
    const categoryData = [
      ['Category', 'Items', 'Total Quantity', 'Total Value'],
      ...Object.entries(inventoryMetrics.byCategory).map(([category, data]) => [
        category,
        data.count,
        data.totalQuantity,
        data.totalValue
      ])
    ];
    const categorySheet = XLSX.utils.aoa_to_sheet(categoryData);
    XLSX.utils.book_append_sheet(wb, categorySheet, 'By Category');

    // All Inventory Sheet
    const allInventoryData = [
      ['Item Name', 'Category', 'Quantity', 'Unit', 'Unit Price', 'Total Value', 'Supplier'],
      ...inventoryData.map(item => [
        item.itemName,
        item.category || 'Other',
        item.quantity,
        item.unit || 'pcs',
        item.unitPrice || 0,
        item.quantity * (item.unitPrice || 0),
        item.supplier || 'N/A'
      ])
    ];
    const allInventorySheet = XLSX.utils.aoa_to_sheet(allInventoryData);
    XLSX.utils.book_append_sheet(wb, allInventorySheet, 'All Items');

    // Low Stock Sheet
    if (inventoryMetrics.lowStockItems.length > 0) {
      const lowStockData = [
        ['Item Name', 'Quantity', 'Unit', 'Supplier', 'Unit Price'],
        ...inventoryMetrics.lowStockItems.map(item => [
          item.itemName,
          item.quantity,
          item.unit || 'pcs',
          item.supplier || 'N/A',
          item.unitPrice || 0
        ])
      ];
      const lowStockSheet = XLSX.utils.aoa_to_sheet(lowStockData);
      XLSX.utils.book_append_sheet(wb, lowStockSheet, 'Low Stock Alert');
    }

    XLSX.writeFile(wb, getExcelFileName('Inventory', null, null));
  };

  const statCards = [
    {
      title: t('reports.inventory.totalItems', 'Total Items'),
      value: inventoryMetrics.totalItems,
      icon: Package,
      bgColor: '#E0F2FE',
      iconColor: '#1570EF',
    },
    {
      title: t('reports.inventory.lowStock', 'Low Stock'),
      value: inventoryMetrics.lowStockCount,
      icon: TrendingDown,
      bgColor: '#FEF9C3',
      iconColor: '#EAB308',
    },
    {
      title: t('reports.inventory.outOfStock', 'Out of Stock'),
      value: inventoryMetrics.outOfStockCount,
      icon: XOctagon,
      bgColor: '#FEF2F2',
      iconColor: '#EF4444',
    },
    {
      title: t('reports.inventory.totalValue', 'Total Value'),
      value: formatCurrency(inventoryMetrics.totalValue),
      icon: DollarSign,
      bgColor: '#ECFDF5',
      iconColor: '#10B981',
    },
  ];

  return (
    <div>
      {/* Export Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mb-6">
        <button
          onClick={exportToPDF}
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
          onClick={exportToExcel}
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

      {/* Summary Cards with macOS Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="macos-stat-card macos-animate cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="macos-icon-bg" style={{ backgroundColor: card.bgColor }}>
                  <Icon className="w-6 h-6" style={{ color: card.iconColor }} />
                </div>
              </div>
              <p className="macos-text text-sm font-medium mb-1">{card.title}</p>
              <h3 className="macos-metric text-2xl sm:text-3xl">
                {card.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Low Stock Alert */}
      {inventoryMetrics.lowStockItems.length > 0 && (
        <div className="mb-6 macos-card macos-animate" style={{
          background: 'rgba(254, 242, 242, 0.9)',
          borderColor: 'rgba(239, 68, 68, 0.2)'
        }}>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="macos-icon-bg" style={{ backgroundColor: '#FEE2E2' }}>
                <AlertTriangle className="w-5 h-5" style={{ color: '#DC2626' }} />
              </div>
              <h3 className="macos-subheading text-lg" style={{ color: '#991B1B' }}>
                {t('reports.inventory.lowStockAlert', 'Low Stock Alert')}
              </h3>
            </div>
            <p className="text-sm mb-4" style={{ color: '#B91C1C' }}>
              {t('reports.inventory.lowStockMessage', `${inventoryMetrics.lowStockCount} items are running low on stock (below 20 units)`)}
            </p>
            <div className="macos-table overflow-hidden">
              <table className="min-w-full">
                <thead className="macos-table-header" style={{ background: 'rgba(254, 226, 226, 0.5)' }}>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase" style={{ color: '#991B1B' }}>
                      {t('reports.inventory.itemName', 'Item Name')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase" style={{ color: '#991B1B' }}>
                      {t('reports.inventory.quantity', 'Quantity')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase" style={{ color: '#991B1B' }}>
                      {t('reports.inventory.unit', 'Unit')}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase" style={{ color: '#991B1B' }}>
                      {t('reports.inventory.supplier', 'Supplier')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryMetrics.lowStockItems.map((item, index) => (
                    <tr key={index} className="macos-table-row">
                      <td className="px-6 py-4 text-sm font-medium">{item.itemName}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-red-600">{item.quantity}</td>
                      <td className="px-6 py-4 text-sm">{item.unit || 'pcs'}</td>
                      <td className="px-6 py-4 text-sm">{item.supplier || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Inventory by Category */}
      <div>
        <h3 className="macos-subheading text-lg mb-4">
          {t('reports.inventory.byCategory', 'Inventory by Category')}
        </h3>
        <div className="macos-table overflow-hidden">
          <table className="min-w-full">
            <thead className="macos-table-header">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.inventory.category', 'Category')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.inventory.items', 'Items')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.inventory.totalQuantity', 'Total Quantity')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.inventory.totalValue', 'Total Value')}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(inventoryMetrics.byCategory).map(([category, data]) => (
                <tr key={category} className="macos-table-row">
                  <td className="px-6 py-4 text-sm font-medium capitalize">{category}</td>
                  <td className="px-6 py-4 text-sm">{data.count}</td>
                  <td className="px-6 py-4 text-sm">{data.totalQuantity}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    {formatCurrency(data.totalValue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryReport;
