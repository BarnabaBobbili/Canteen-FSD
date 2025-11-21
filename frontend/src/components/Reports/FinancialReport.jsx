import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, FileSpreadsheet, DollarSign, ShoppingCart, TrendingUp, Package } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formatCurrencyForPDF, getPDFFileName, getExcelFileName } from './reportHelpers';

const FinancialReport = ({ ordersData, paymentsData, inventoryData, dateRange, formatCurrency }) => {
  const { t } = useTranslation();

  // Calculate financial metrics
  const financialMetrics = useMemo(() => {
    // Revenue from completed orders
    const completedOrders = ordersData.filter(o => o.status === 'completed');
    const totalRevenue = completedOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Revenue by payment method
    const revenueByPayment = completedOrders.reduce((acc, order) => {
      const method = order.paymentMethod || 'cash';
      if (!acc[method]) {
        acc[method] = {
          count: 0,
          amount: 0
        };
      }
      acc[method].count++;
      acc[method].amount += order.totalAmount || 0;
      return acc;
    }, {});

    // Calculate inventory costs (estimation)
    const totalInventoryCost = inventoryData.reduce((sum, item) => {
      return sum + (item.quantity * (item.unitPrice || 0));
    }, 0);

    // Daily revenue breakdown
    const revenueByDate = completedOrders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + (order.totalAmount || 0);
      return acc;
    }, {});

    const dailyRevenue = Object.entries(revenueByDate)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Calculate average daily revenue
    const avgDailyRevenue = dailyRevenue.length > 0
      ? totalRevenue / dailyRevenue.length
      : 0;

    return {
      totalRevenue,
      revenueByPayment,
      totalInventoryCost,
      dailyRevenue,
      avgDailyRevenue,
      totalOrders: completedOrders.length
    };
  }, [ordersData, inventoryData]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFontSize(20);
    doc.text('Financial Statement', pageWidth / 2, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Period: ${dateRange.startDate} to ${dateRange.endDate}`, pageWidth / 2, 22, { align: 'center' });
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 27, { align: 'center' });

    // Financial Summary
    doc.setFontSize(14);
    doc.text('Financial Summary', 14, 35);

    const summaryData = [
      ['Total Revenue', formatCurrencyForPDF(formatCurrency(financialMetrics.totalRevenue))],
      ['Total Orders', financialMetrics.totalOrders.toString()],
      ['Average Daily Revenue', formatCurrencyForPDF(formatCurrency(financialMetrics.avgDailyRevenue))],
      ['Inventory Value', formatCurrencyForPDF(formatCurrency(financialMetrics.totalInventoryCost))]
    ];

    autoTable(doc, {
      startY: 40,
      head: [['Metric', 'Value']],
      body: summaryData,
      theme: 'grid',
      headStyles: { fillColor: [249, 115, 22] }
    });

    // Revenue by Payment Method
    let currentY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Revenue by Payment Method', 14, currentY);

    const paymentData = Object.entries(financialMetrics.revenueByPayment).map(([method, data]) => [
      method.toUpperCase(),
      data.count.toString(),
      formatCurrencyForPDF(formatCurrency(data.amount)),
      ((data.amount / financialMetrics.totalRevenue) * 100).toFixed(1) + '%'
    ]);

    autoTable(doc, {
      startY: currentY + 5,
      head: [['Payment Method', 'Transactions', 'Amount', '% of Total']],
      body: paymentData,
      theme: 'grid',
      headStyles: { fillColor: [249, 115, 22] }
    });

    // Daily Revenue (limited to first 15 days for PDF)
    currentY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text('Daily Revenue Breakdown', 14, currentY);

    const dailyData = financialMetrics.dailyRevenue
      .slice(0, 15)
      .map(item => [
        new Date(item.date).toLocaleDateString(),
        formatCurrencyForPDF(formatCurrency(item.amount))
      ]);

    autoTable(doc, {
      startY: currentY + 5,
      head: [['Date', 'Revenue']],
      body: dailyData,
      theme: 'grid',
      headStyles: { fillColor: [249, 115, 22] }
    });

    doc.save(getPDFFileName('Financial_Statement', dateRange.startDate, dateRange.endDate));
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    // Summary Sheet
    const summaryData = [
      ['Financial Statement'],
      [`Period: ${dateRange.startDate} to ${dateRange.endDate}`],
      [`Generated: ${new Date().toLocaleDateString()}`],
      [],
      ['Metric', 'Value'],
      ['Total Revenue', financialMetrics.totalRevenue],
      ['Total Orders', financialMetrics.totalOrders],
      ['Average Daily Revenue', financialMetrics.avgDailyRevenue],
      ['Inventory Value', financialMetrics.totalInventoryCost]
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');

    // Revenue by Payment Method
    const paymentData = [
      ['Payment Method', 'Transactions', 'Amount', '% of Total'],
      ...Object.entries(financialMetrics.revenueByPayment).map(([method, data]) => [
        method.toUpperCase(),
        data.count,
        data.amount,
        ((data.amount / financialMetrics.totalRevenue) * 100).toFixed(1) + '%'
      ])
    ];
    const paymentSheet = XLSX.utils.aoa_to_sheet(paymentData);
    XLSX.utils.book_append_sheet(wb, paymentSheet, 'Revenue by Payment');

    // Daily Revenue
    const dailyData = [
      ['Date', 'Revenue'],
      ...financialMetrics.dailyRevenue.map(item => [
        item.date,
        item.amount
      ])
    ];
    const dailySheet = XLSX.utils.aoa_to_sheet(dailyData);
    XLSX.utils.book_append_sheet(wb, dailySheet, 'Daily Revenue');

    XLSX.writeFile(wb, getExcelFileName('Financial_Statement', dateRange.startDate, dateRange.endDate));
  };

  const statCards = [
    {
      title: t('reports.financial.totalRevenue', 'Total Revenue'),
      value: formatCurrency(financialMetrics.totalRevenue),
      icon: DollarSign,
      bgColor: '#ECFDF5',
      iconColor: '#10B981',
    },
    {
      title: t('reports.financial.totalOrders', 'Total Orders'),
      value: financialMetrics.totalOrders,
      icon: ShoppingCart,
      bgColor: '#E0F2FE',
      iconColor: '#1570EF',
    },
    {
      title: t('reports.financial.avgDailyRevenue', 'Avg Daily Revenue'),
      value: formatCurrency(financialMetrics.avgDailyRevenue),
      icon: TrendingUp,
      bgColor: '#F5F3FF',
      iconColor: '#8B5CF6',
    },
    {
      title: t('reports.financial.inventoryValue', 'Inventory Value'),
      value: formatCurrency(financialMetrics.totalInventoryCost),
      icon: Package,
      bgColor: '#FFF7ED',
      iconColor: '#F59E0B',
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

      {/* Revenue by Payment Method */}
      <div className="mb-6">
        <h3 className="macos-subheading text-lg mb-4">
          {t('reports.financial.byPaymentMethod', 'Revenue by Payment Method')}
        </h3>
        <div className="macos-table overflow-hidden">
          <table className="min-w-full">
            <thead className="macos-table-header">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.financial.paymentMethod', 'Payment Method')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.financial.transactions', 'Transactions')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.financial.amount', 'Amount')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.financial.percentOfTotal', '% of Total')}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(financialMetrics.revenueByPayment).map(([method, data]) => (
                <tr key={method} className="macos-table-row">
                  <td className="px-6 py-4 text-sm uppercase font-semibold">{method}</td>
                  <td className="px-6 py-4 text-sm">{data.count}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    {formatCurrency(data.amount)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${(data.amount / financialMetrics.totalRevenue) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold min-w-[3rem] text-right">
                        {((data.amount / financialMetrics.totalRevenue) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daily Revenue Breakdown */}
      <div>
        <h3 className="macos-subheading text-lg mb-4">
          {t('reports.financial.dailyRevenue', 'Daily Revenue Breakdown')}
        </h3>
        <div className="macos-table overflow-hidden">
          <table className="min-w-full">
            <thead className="macos-table-header">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.financial.date', 'Date')}
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold macos-text uppercase">
                  {t('reports.financial.revenue', 'Revenue')}
                </th>
              </tr>
            </thead>
            <tbody>
              {financialMetrics.dailyRevenue.map((item, index) => (
                <tr key={index} className="macos-table-row">
                  <td className="px-6 py-4 text-sm font-medium">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    {formatCurrency(item.amount)}
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

export default FinancialReport;
