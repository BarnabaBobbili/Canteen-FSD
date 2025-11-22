import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, ShoppingCart, TrendingUp, Package } from 'lucide-react';
import * as XLSX from 'xlsx';
import ReportExportButtons from './shared/ReportExportButtons';
import ReportSummaryCards from './shared/ReportSummaryCards';
import { formatCurrencyForPDF, getPDFFileName, getExcelFileName } from './reportHelpers';
import { createPDFWithHeader, addPDFSummarySection, addPDFTableSection } from './shared/reportPDFHelpers';

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
        acc[method] = { count: 0, amount: 0 };
      }
      acc[method].count++;
      acc[method].amount += order.totalAmount || 0;
      return acc;
    }, {});

    // Calculate inventory costs
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

    const avgDailyRevenue = dailyRevenue.length > 0 ? totalRevenue / dailyRevenue.length : 0;

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
    const doc = createPDFWithHeader('Financial Statement', dateRange);

    // Summary section
    const summaryData = [
      ['Total Revenue', formatCurrencyForPDF(formatCurrency(financialMetrics.totalRevenue))],
      ['Total Orders', financialMetrics.totalOrders.toString()],
      ['Average Daily Revenue', formatCurrencyForPDF(formatCurrency(financialMetrics.avgDailyRevenue))],
      ['Inventory Value', formatCurrencyForPDF(formatCurrency(financialMetrics.totalInventoryCost))]
    ];
    let currentY = addPDFSummarySection(doc, 'Financial Summary', summaryData);

    // Revenue by payment method
    const paymentData = Object.entries(financialMetrics.revenueByPayment).map(([method, data]) => [
      method.toUpperCase(),
      data.count.toString(),
      formatCurrencyForPDF(formatCurrency(data.amount)),
      ((data.amount / financialMetrics.totalRevenue) * 100).toFixed(1) + '%'
    ]);
    currentY = addPDFTableSection(doc, 'Revenue by Payment Method',
      ['Payment Method', 'Transactions', 'Amount', '% of Total'], paymentData, currentY);

    // Daily revenue (first 15 days)
    const dailyData = financialMetrics.dailyRevenue.slice(0, 15).map(item => [
      new Date(item.date).toLocaleDateString(),
      formatCurrencyForPDF(formatCurrency(item.amount))
    ]);
    addPDFTableSection(doc, 'Daily Revenue Breakdown', ['Date', 'Revenue'], dailyData, currentY);

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
      ...financialMetrics.dailyRevenue.map(item => [item.date, item.amount])
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
      <ReportExportButtons onExportPDF={exportToPDF} onExportExcel={exportToExcel} />

      <ReportSummaryCards cards={statCards} />

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
