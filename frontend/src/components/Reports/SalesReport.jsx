import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, FileText, FileSpreadsheet, ShoppingCart, CheckCircle, XCircle, DollarSign, TrendingUp } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const SalesReport = ({ ordersData, dateRange, formatCurrency }) => {
  const { t } = useTranslation();

  // Calculate sales metrics
  const salesMetrics = useMemo(() => {
    const totalOrders = ordersData.length;
    const completedOrders = ordersData.filter(o => o.status === 'completed');
    const cancelledOrders = ordersData.filter(o => o.status === 'cancelled');

    const totalRevenue = completedOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const averageOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

    // Sales by order type
    const salesByType = completedOrders.reduce((acc, order) => {
      const type = order.orderType || 'counter';
      acc[type] = (acc[type] || 0) + (order.totalAmount || 0);
      return acc;
    }, {});

    // Sales by payment method
    const salesByPayment = completedOrders.reduce((acc, order) => {
      const method = order.paymentMethod || 'cash';
      acc[method] = (acc[method] || 0) + (order.totalAmount || 0);
      return acc;
    }, {});

    // Top selling items
    const itemsSold = {};
    completedOrders.forEach(order => {
      order.items?.forEach(item => {
        if (itemsSold[item.itemName]) {
          itemsSold[item.itemName].quantity += item.quantity;
          itemsSold[item.itemName].revenue += item.price * item.quantity;
        } else {
          itemsSold[item.itemName] = {
            quantity: item.quantity,
            revenue: item.price * item.quantity
          };
        }
      });
    });

    const topItems = Object.entries(itemsSold)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    return {
      totalOrders,
      completedOrders: completedOrders.length,
      cancelledOrders: cancelledOrders.length,
      totalRevenue,
      averageOrderValue,
      salesByType,
      salesByPayment,
      topItems
    };
  }, [ordersData]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(20);
    doc.text('Sales Report', pageWidth / 2, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Period: ${dateRange.startDate} to ${dateRange.endDate}`, pageWidth / 2, 22, { align: 'center' });
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 27, { align: 'center' });

    // Summary Statistics
    doc.setFontSize(14);
    doc.text('Summary', 14, 35);

    const summaryData = [
      ['Total Orders', salesMetrics.totalOrders.toString()],
      ['Completed Orders', salesMetrics.completedOrders.toString()],
      ['Cancelled Orders', salesMetrics.cancelledOrders.toString()],
      ['Total Revenue', formatCurrency(salesMetrics.totalRevenue)],
      ['Average Order Value', formatCurrency(salesMetrics.averageOrderValue)]
    ];

    autoTable(doc, {
      startY: 40,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'grid',
      headStyles: { fillColor: [249, 115, 22] }
    });

    // Sales by Order Type
    let currentY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Sales by Order Type', 14, currentY);

    const typeData = Object.entries(salesMetrics.salesByType).map(([type, amount]) => [
      type.charAt(0).toUpperCase() + type.slice(1),
      formatCurrency(amount)
    ]);

    autoTable(doc, {
      startY: currentY + 5,
      head: [['Order Type', 'Revenue']],
      body: typeData,
      theme: 'grid',
      headStyles: { fillColor: [249, 115, 22] }
    });

    // Top Selling Items
    currentY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Top Selling Items', 14, currentY);

    const topItemsData = salesMetrics.topItems.map(item => [
      item.name,
      item.quantity.toString(),
      formatCurrency(item.revenue)
    ]);

    autoTable(doc, {
      startY: currentY + 5,
      head: [['Item Name', 'Quantity Sold', 'Revenue']],
      body: topItemsData,
      theme: 'grid',
      headStyles: { fillColor: [249, 115, 22] }
    });

    doc.save(`Sales_Report_${dateRange.startDate}_to_${dateRange.endDate}.pdf`);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    // Summary Sheet
    const summaryData = [
      ['Sales Report'],
      [`Period: ${dateRange.startDate} to ${dateRange.endDate}`],
      [`Generated: ${new Date().toLocaleDateString()}`],
      [],
      ['Metric', 'Value'],
      ['Total Orders', salesMetrics.totalOrders],
      ['Completed Orders', salesMetrics.completedOrders],
      ['Cancelled Orders', salesMetrics.cancelledOrders],
      ['Total Revenue', salesMetrics.totalRevenue],
      ['Average Order Value', salesMetrics.averageOrderValue]
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');

    // Sales by Type Sheet
    const typeData = [
      ['Order Type', 'Revenue'],
      ...Object.entries(salesMetrics.salesByType).map(([type, amount]) => [type, amount])
    ];
    const typeSheet = XLSX.utils.aoa_to_sheet(typeData);
    XLSX.utils.book_append_sheet(wb, typeSheet, 'Sales by Type');

    // Top Items Sheet
    const topItemsData = [
      ['Item Name', 'Quantity Sold', 'Revenue'],
      ...salesMetrics.topItems.map(item => [item.name, item.quantity, item.revenue])
    ];
    const topItemsSheet = XLSX.utils.aoa_to_sheet(topItemsData);
    XLSX.utils.book_append_sheet(wb, topItemsSheet, 'Top Selling Items');

    // All Orders Sheet
    const ordersExportData = [
      ['Order Number', 'Date', 'Type', 'Status', 'Payment Method', 'Total Amount'],
      ...ordersData.map(order => [
        order.orderNumber,
        new Date(order.createdAt).toLocaleDateString(),
        order.orderType || 'counter',
        order.status,
        order.paymentMethod || 'cash',
        order.totalAmount
      ])
    ];
    const ordersSheet = XLSX.utils.aoa_to_sheet(ordersExportData);
    XLSX.utils.book_append_sheet(wb, ordersSheet, 'All Orders');

    XLSX.writeFile(wb, `Sales_Report_${dateRange.startDate}_to_${dateRange.endDate}.xlsx`);
  };

  const statCards = [
    {
      title: t('reports.sales.totalOrders', 'Total Orders'),
      value: salesMetrics.totalOrders,
      icon: ShoppingCart,
      bgColor: '#E0F2FE',
      iconColor: '#1570EF',
    },
    {
      title: t('reports.sales.completed', 'Completed'),
      value: salesMetrics.completedOrders,
      icon: CheckCircle,
      bgColor: '#ECFDF5',
      iconColor: '#10B981',
    },
    {
      title: t('reports.sales.cancelled', 'Cancelled'),
      value: salesMetrics.cancelledOrders,
      icon: XCircle,
      bgColor: '#FEF2F2',
      iconColor: '#EF4444',
    },
    {
      title: t('reports.sales.totalRevenue', 'Total Revenue'),
      value: formatCurrency(salesMetrics.totalRevenue),
      icon: DollarSign,
      bgColor: '#FFF7ED',
      iconColor: '#F59E0B',
    },
    {
      title: t('reports.sales.avgOrderValue', 'Avg Order Value'),
      value: formatCurrency(salesMetrics.averageOrderValue),
      icon: TrendingUp,
      bgColor: '#F5F3FF',
      iconColor: '#8B5CF6',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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

      {/* Sales by Order Type */}
      <div className="mb-6">
        <h3 className="macos-subheading text-lg mb-4">
          {t('reports.sales.byOrderType', 'Sales by Order Type')}
        </h3>
        <div className="macos-table overflow-hidden">
          <table className="min-w-full">
            <thead className="macos-table-header">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.sales.orderType', 'Order Type')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.sales.revenue', 'Revenue')}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(salesMetrics.salesByType).map(([type, amount], idx) => (
                <tr key={type} className="macos-table-row">
                  <td className="px-6 py-4 text-sm capitalize font-medium">{type}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    {formatCurrency(amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Selling Items */}
      <div>
        <h3 className="macos-subheading text-lg mb-4">
          {t('reports.sales.topSellingItems', 'Top Selling Items')}
        </h3>
        <div className="macos-table overflow-hidden">
          <table className="min-w-full">
            <thead className="macos-table-header">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.sales.itemName', 'Item Name')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.sales.quantitySold', 'Quantity Sold')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.sales.revenue', 'Revenue')}
                </th>
              </tr>
            </thead>
            <tbody>
              {salesMetrics.topItems.map((item, index) => (
                <tr key={index} className="macos-table-row">
                  <td className="px-6 py-4 text-sm font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-sm">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    {formatCurrency(item.revenue)}
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

export default SalesReport;
