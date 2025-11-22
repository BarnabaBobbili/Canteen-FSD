import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, CheckCircle, XCircle, DollarSign, TrendingUp } from 'lucide-react';
import * as XLSX from 'xlsx';
import ReportExportButtons from './shared/ReportExportButtons';
import ReportSummaryCards from './shared/ReportSummaryCards';
import { formatCurrencyForPDF, getPDFFileName, getExcelFileName } from './reportHelpers';
import { createPDFWithHeader, addPDFSummarySection, addPDFTableSection } from './shared/reportPDFHelpers';

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
        // Skip items without valid name
        if (!item.itemName) return;
        // Safely coerce quantity and price to numbers
        const safeQuantity = Number.isFinite(Number(item.quantity)) ? Number(item.quantity) : 0;
        const safePrice = Number.isFinite(Number(item.price)) ? Number(item.price) : 0;

        if (itemsSold[item.itemName]) {
          itemsSold[item.itemName].quantity += safeQuantity;
          itemsSold[item.itemName].revenue += safePrice * safeQuantity;
        } else {
          itemsSold[item.itemName] = {
            quantity: safeQuantity,
            revenue: safePrice * safeQuantity
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
    const doc = createPDFWithHeader('Sales Report', dateRange);

    // Summary section
    const summaryData = [
      ['Total Orders', salesMetrics.totalOrders.toString()],
      ['Completed Orders', salesMetrics.completedOrders.toString()],
      ['Cancelled Orders', salesMetrics.cancelledOrders.toString()],
      ['Total Revenue', formatCurrencyForPDF(formatCurrency(salesMetrics.totalRevenue))],
      ['Average Order Value', formatCurrencyForPDF(formatCurrency(salesMetrics.averageOrderValue))]
    ];
    let currentY = addPDFSummarySection(doc, 'Summary', summaryData);

    // Sales by order type
    const typeData = Object.entries(salesMetrics.salesByType).map(([type, amount]) => [
      type.charAt(0).toUpperCase() + type.slice(1),
      formatCurrencyForPDF(formatCurrency(amount))
    ]);
    currentY = addPDFTableSection(doc, 'Sales by Order Type', ['Order Type', 'Revenue'], typeData, currentY);

    // Top selling items
    const topItemsData = salesMetrics.topItems.map(item => [
      item.name,
      item.quantity.toString(),
      formatCurrencyForPDF(formatCurrency(item.revenue))
    ]);
    addPDFTableSection(doc, 'Top Selling Items', ['Item Name', 'Quantity Sold', 'Revenue'], topItemsData, currentY);

    doc.save(getPDFFileName('Sales', dateRange.startDate, dateRange.endDate));
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

    XLSX.writeFile(wb, getExcelFileName('Sales', dateRange.startDate, dateRange.endDate));
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
      <ReportExportButtons onExportPDF={exportToPDF} onExportExcel={exportToExcel} />

      <ReportSummaryCards cards={statCards} />

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
              {Object.entries(salesMetrics.salesByType).map(([type, amount]) => (
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
              {salesMetrics.topItems.map((item) => (
                <tr key={item.name || item.id} className="macos-table-row">
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
