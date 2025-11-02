import React from 'react';
import {
  Users, UserCheck, UserX, Shield, Briefcase
} from 'lucide-react';
import {
  PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

const StaffAnalytics = ({
  totalStaff,
  activeCount,
  inactiveCount,
  departmentCount,
  roleDistribution,
  departmentDistribution
}) => {
  return (
    <div className="space-y-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800">Staff Analytics</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Total Staff</h3>
            <Users size={24} />
          </div>
          <p className="text-4xl font-bold">{totalStaff}</p>
          <p className="text-sm mt-2 opacity-90">All employees</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Active</h3>
            <UserCheck size={24} />
          </div>
          <p className="text-4xl font-bold">{activeCount}</p>
          <p className="text-sm mt-2 opacity-90">Currently working</p>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Inactive</h3>
            <UserX size={24} />
          </div>
          <p className="text-4xl font-bold">{inactiveCount}</p>
          <p className="text-sm mt-2 opacity-90">Not working</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Departments</h3>
            <Briefcase size={24} />
          </div>
          <p className="text-4xl font-bold">{departmentCount}</p>
          <p className="text-sm mt-2 opacity-90">Active departments</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Shield size={20} className="text-sky-500" />
            Role Distribution
          </h3>
          {roleDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">No staff data available</div>
          )}
        </div>

        {/* Department Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Briefcase size={20} className="text-blue-500" />
            Department Distribution
          </h3>
          {departmentDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">No department data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffAnalytics;
