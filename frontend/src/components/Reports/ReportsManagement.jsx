import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';
import { useTranslation } from 'react-i18next';
import DashboardLayout from '../Layout/DashboardLayout';
import API_BASE_URL from '../../config/api';
import { FileText, Download, TrendingUp, Package, DollarSign, Calendar, FileBarChart, ArrowRight } from 'lucide-react';
import SalesReport from './SalesReport';
import InventoryReport from './InventoryReport';
import FinancialReport from './FinancialReport';

const ReportsManagement = () => {
  const { user, token } = useAuth();
  const { formatCurrency } = useSettings();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('sales');
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  // Create dateRange object for API calls
  const dateRange = {
    startDate: startDate,
    endDate: endDate
  };

  // Data states
  const [ordersData, setOrdersData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [paymentsData, setPaymentsData] = useState([]);

  useEffect(() => {
    fetchReportData();
  }, [startDate, endDate, token]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };

      const [ordersRes, inventoryRes, paymentsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/orders`, { headers }),
        fetch(`${API_BASE_URL}/inventory`, { headers }),
        fetch(`${API_BASE_URL}/payments`, { headers })
      ]);

      if (ordersRes.ok) {
        const orders = await ordersRes.json();
        // Filter orders by date range
        const filtered = orders.filter(order => {
          const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
          return orderDate >= dateRange.startDate && orderDate <= dateRange.endDate;
        });
        setOrdersData(filtered);
      }

      if (inventoryRes.ok) {
        const inventory = await inventoryRes.json();
        setInventoryData(inventory);
      }

      if (paymentsRes.ok) {
        const payments = await paymentsRes.json();
        // Filter payments by date range
        const filtered = payments.filter(payment => {
          const paymentDate = new Date(payment.createdAt).toISOString().split('T')[0];
          return paymentDate >= dateRange.startDate && paymentDate <= dateRange.endDate;
        });
        setPaymentsData(filtered);
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'sales', name: 'Sales Report', icon: TrendingUp },
    { id: 'inventory', name: 'Inventory Report', icon: Package },
    { id: 'financial', name: 'Financial Statement', icon: DollarSign }
  ];

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Welcome Header with macOS Gradient */}
        <div
          className="macos-gradient-blue rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 text-white relative overflow-hidden macos-animate"
          style={{
            boxShadow: '0 10px 15px -3px rgba(21, 112, 239, 0.3), 0 4px 6px -4px rgba(21, 112, 239, 0.15)'
          }}
        >
          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center gap-3">
                <FileBarChart className="w-8 h-8" />
                {t('reports.title', 'Reports & Analytics')}
              </h1>
              <p className="text-sm sm:text-base opacity-95">
                {t('reports.subtitle', 'Generate detailed reports and export data to PDF or Excel')}
              </p>
            </div>
            <Download className="w-12 h-12 sm:w-16 sm:h-16 opacity-10 flex-shrink-0" />
          </div>
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
        </div>

        {/* Date Range Filter with macOS Card */}
        <div className="macos-card p-5 sm:p-6 mb-6 macos-animate">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="macos-icon-bg" style={{ backgroundColor: '#FFF7ED' }}>
                <Calendar className="w-5 h-5" style={{ color: '#F59E0B' }} />
              </div>
              <h3 className="macos-subheading text-base">
                {t('reports.dateRange', 'Date Range')}
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1 w-full lg:w-auto">
              {/* From Date */}
              <div className="relative flex-1">
                <label className="block text-xs font-semibold macos-text uppercase tracking-wide mb-2">
                  {t('reports.from', 'From')}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="macos-input text-sm w-full pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Calendar className="w-4 h-4" style={{ color: '#9CA3AF' }} />
                  </div>
                </div>
              </div>

              {/* Arrow Separator */}
              <div className="hidden sm:flex items-end pb-3">
                <div
                  className="p-2 rounded-lg transition-all duration-300"
                  style={{
                    background: 'rgba(21, 112, 239, 0.08)',
                    border: '1px solid rgba(21, 112, 239, 0.1)'
                  }}
                >
                  <ArrowRight className="w-4 h-4" style={{ color: '#1570EF' }} />
                </div>
              </div>

              {/* To Date */}
              <div className="relative flex-1">
                <label className="block text-xs font-semibold macos-text uppercase tracking-wide mb-2">
                  {t('reports.to', 'To')}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    max={new Date().toISOString().split('T')[0]}
                    className="macos-input text-sm w-full pr-10"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Calendar className="w-4 h-4" style={{ color: '#9CA3AF' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Type Tabs with macOS Style */}
        <div className="macos-card p-2 mb-6 macos-animate">
          <div className="flex flex-col sm:flex-row gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`macos-tab flex items-center justify-center gap-2 ${
                    activeTab === tab.id ? 'active' : ''
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{t(`reports.tabs.${tab.id}`, tab.name)}</span>
                  <span className="sm:hidden">{t(`reports.tabs.${tab.id}Short`, tab.name.split(' ')[0])}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Report Content */}
        <div className="macos-card p-4 sm:p-6 macos-animate">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="macos-text">
                {t('reports.loading', 'Loading report data...')}
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'sales' && (
                <SalesReport
                  ordersData={ordersData}
                  dateRange={dateRange}
                  formatCurrency={formatCurrency}
                />
              )}
              {activeTab === 'inventory' && (
                <InventoryReport
                  inventoryData={inventoryData}
                  formatCurrency={formatCurrency}
                />
              )}
              {activeTab === 'financial' && (
                <FinancialReport
                  ordersData={ordersData}
                  paymentsData={paymentsData}
                  inventoryData={inventoryData}
                  dateRange={dateRange}
                  formatCurrency={formatCurrency}
                />
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsManagement;
