import React from 'react';
import {
  BarChart3, Filter, CheckCircle, TrendingUp, DollarSign
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
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
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2">
          <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500" />
          <span className="truncate">Orders Analytics</span>
        </h3>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Date Filter */}
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Filter by Period</h4>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setDateFilter(filter.value)}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                  dateFilter === filter.value
                    ? 'bg-sky-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="hidden sm:inline">{filter.label}</span>
                <span className="sm:hidden">{filter.shortLabel}</span>
              </button>
            ))}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Orders Trend Chart */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
            <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
              Orders Trend
            </h4>
            {analytics.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <LineChart data={analytics.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#f97316"
                    strokeWidth={2}
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] sm:h-[300px] flex items-center justify-center text-gray-500 text-sm">
                No data for selected period
              </div>
            )}
          </div>

          {/* Revenue Trend Chart */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
            <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
              Revenue Trend
            </h4>
            {analytics.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <BarChart data={analytics.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue (₹)" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] sm:h-[300px] flex items-center justify-center text-gray-500 text-sm">
                No data for selected period
              </div>
            )}
          </div>
        </div>

        {/* Order Status Distribution & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
            <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
              Order Status Distribution
            </h4>
            {analytics.statusChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <PieChart>
                  <Pie
                    data={analytics.statusChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.statusChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][index % 5]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] sm:h-[300px] flex items-center justify-center text-gray-500 text-sm">
                No orders data available
              </div>
            )}
          </div>

          {/* Completed Orders List */}
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
            <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
              Recent Completed Orders ({completedOrders.length})
            </h4>
            <div className="space-y-2 max-h-[250px] sm:max-h-[300px] overflow-y-auto">
              {completedOrders.slice(0, 10).map((order, idx) => (
                <div
                  key={order._id || idx}
                  className="flex items-center justify-between gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                      {order.customerName || 'Customer'}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {new Date(order.createdAt).toLocaleDateString()}
                      <span className="hidden sm:inline">
                        {' '}at {new Date(order.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-green-600 text-xs sm:text-sm">
                      ₹{order.totalAmount?.toFixed(2) || '0.00'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.items?.length || 0} items
                    </div>
                  </div>
                </div>
              ))}
              {completedOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-sm">
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
