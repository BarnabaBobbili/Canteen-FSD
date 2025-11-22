import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, Package, TrendingDown, XOctagon, DollarSign } from 'lucide-react';
import * as XLSX from 'xlsx';
import ReportExportButtons from './shared/ReportExportButtons';
import ReportSummaryCards from './shared/ReportSummaryCards';
import { formatCurrencyForPDF, getPDFFileName, getExcelFileName } from './reportHelpers';
import { createPDFWithHeader, addPDFSummarySection, addPDFTableSection } from './shared/reportPDFHelpers';

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
        acc[category] = { count: 0, totalQuantity: 0, totalValue: 0 };
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
    const doc = createPDFWithHeader('Inventory Report');

    // Summary section
    const summaryData = [
      ['Total Items', inventoryMetrics.totalItems.toString()],
      ['Low Stock Items', inventoryMetrics.lowStockCount.toString()],
      ['Out of Stock Items', inventoryMetrics.outOfStockCount.toString()],
      ['Total Inventory Value', formatCurrencyForPDF(formatCurrency(inventoryMetrics.totalValue))]
    ];
    let currentY = addPDFSummarySection(doc, 'Inventory Summary', summaryData, 30);

    // By category
    const categoryData = Object.entries(inventoryMetrics.byCategory).map(([category, data]) => [
      category,
      data.count.toString(),
      data.totalQuantity.toString(),
      formatCurrencyForPDF(formatCurrency(data.totalValue))
    ]);
    currentY = addPDFTableSection(doc, 'Inventory by Category',
      ['Category', 'Items', 'Total Quantity', 'Total Value'], categoryData, currentY);

    // Low stock alert
    if (inventoryMetrics.lowStockItems.length > 0) {
      const lowStockData = inventoryMetrics.lowStockItems.map(item => [
        item.itemName,
        item.quantity.toString(),
        item.unit || 'pcs',
        item.supplier || 'N/A'
      ]);
      addPDFTableSection(doc, 'Low Stock Alert', ['Item Name', 'Quantity', 'Unit', 'Supplier'], lowStockData, currentY);
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
        category, data.count, data.totalQuantity, data.totalValue
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
          item.itemName, item.quantity, item.unit || 'pcs', item.supplier || 'N/A', item.unitPrice || 0
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
      <ReportExportButtons onExportPDF={exportToPDF} onExportExcel={exportToExcel} />

      <ReportSummaryCards cards={statCards} />

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
