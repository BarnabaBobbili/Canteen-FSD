import React from 'react';
import {
  BarChart3, CheckCircle, TrendingUp, DollarSign
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const OrderAnalyticsSection = ({
  dateFilter,
  setDateFilter,
  analytics,
  completedOrders
}) => {
  const filterOptions = [
    { value: 'week', label: 'Last Week', shortLabel: '1W' },
    { value: 'month', label: 'Last Month', shortLabel: '1M' },
    { value: 'quarterly', label: 'Last Quarter', shortLabel: '3M' },
    { value: 'half-yearly', label: 'Last 6 Months', shortLabel: '6M' },
    { value: 'yearly', label: 'Last Year', shortLabel: '1Y' }
  ];

  return (
    <div className="mt-6 md:mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Sales Details</h3>
        {/* Date Filter Dropdown */}
        <div className="relative">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
          >
            {filterOptions.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium mb-1">Total Orders</p>
            <h3 className="text-3xl font-bold text-gray-900">{analytics.totalOrders}</h3>
            <div className="flex items-center gap-1 mt-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">12.5%</span>
              <span className="text-xs text-gray-500">from last period</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium mb-1">Total Revenue</p>
            <h3 className="text-3xl font-bold text-gray-900">
              ₹{analytics.totalRevenue.toFixed(2)}
            </h3>
            <div className="flex items-center gap-1 mt-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">8.2%</span>
              <span className="text-xs text-gray-500">from last period</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium mb-1">Avg Order Value</p>
            <h3 className="text-3xl font-bold text-gray-900">
              ₹{analytics.averageOrderValue.toFixed(2)}
            </h3>
            <div className="flex items-center gap-1 mt-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">3.1%</span>
              <span className="text-xs text-gray-500">from last period</span>
            </div>
          </div>
        </div>

        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-white/20 rounded-lg backdrop-blur">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1">{analytics.totalOrders}</h3>
            <p className="text-blue-100 text-xs sm:text-sm">Completed Orders</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-white/20 rounded-lg backdrop-blur">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1">
              ₹{analytics.totalRevenue.toFixed(2)}
            </h3>
            <p className="text-green-100 text-xs sm:text-sm">Total Revenue</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-white/20 rounded-lg backdrop-blur">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-1">
              ₹{analytics.averageOrderValue.toFixed(2)}
            </h3>
            <p className="text-purple-100 text-xs sm:text-sm">Average Order Value</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders Trend Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4 text-base">
              Orders Trend
            </h4>
            {analytics.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#6366f1"
                    strokeWidth={3}
                    name="Orders"
                    dot={{ fill: '#6366f1', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">
                No data for selected period
              </div>
            )}
          </div>

          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4 text-base">
              Revenue Trend
            </h4>
            {analytics.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#10b981"
                    name="Revenue (₹)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">
                No data for selected period
              </div>
            )}
          </div>
        </div>

        {/* Order Status Distribution & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4 text-base">
              Order Status Distribution
            </h4>
            {analytics.statusChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.statusChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.statusChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-400 text-sm">
                No orders data available
              </div>
            )}
          </div>

          {/* Completed Orders List */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h4 className="font-semibold text-gray-900 mb-4 text-base">
              Recent Completed Orders
            </h4>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {completedOrders.slice(0, 10).map((order, idx) => (
                <div
                  key={order._id || idx}
                  className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm truncate">
                      {order.customerName || 'Customer'}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-green-600 text-sm">
                      ₹{order.totalAmount?.toFixed(2) || '0.00'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.items?.length || 0} items
                    </div>
                  </div>
                </div>
              ))}
              {completedOrders.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-sm">
                  No completed orders in selected period
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAnalyticsSection;
