import React from 'react';

const UserInfo = ({ user }) => {
  return (
    <div
      className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100"
      style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.08)' }}
    >
      <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-5" style={{ color: '#111827' }}>
        Your Information
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: '#EEF2FF' }}>
          <span className="text-sm font-medium flex-shrink-0" style={{ color: '#6B7280' }}>
            Email
          </span>
          <span className="text-sm font-semibold truncate" style={{ color: '#111827' }}>
            {user?.email}
          </span>
        </div>
        <div className="flex justify-between items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: '#DBEAFE' }}>
          <span className="text-sm font-medium" style={{ color: '#6B7280' }}>Role</span>
          <span className="text-sm font-semibold capitalize" style={{ color: '#111827' }}>
            {user?.role}
          </span>
        </div>
        {user?.employeeId && (
          <div className="flex justify-between items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: '#ECFDF5' }}>
            <span className="text-sm font-medium flex-shrink-0" style={{ color: '#6B7280' }}>
              Employee ID
            </span>
            <span className="text-sm font-semibold" style={{ color: '#111827' }}>
              {user.employeeId}
            </span>
          </div>
        )}
        {user?.department && user.department !== 'none' && (
          <div className="flex justify-between items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: '#F5F3FF' }}>
            <span className="text-sm font-medium flex-shrink-0" style={{ color: '#6B7280' }}>
              Department
            </span>
            <span className="text-sm font-semibold capitalize" style={{ color: '#111827' }}>
              {user.department}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
