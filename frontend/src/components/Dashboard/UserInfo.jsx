import React from 'react';

const UserInfo = ({ user }) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
        Your Information
      </h3>
      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between items-center gap-2 p-2 sm:p-3 bg-blue-50 rounded-lg">
          <span className="text-xs sm:text-sm font-medium text-gray-700 flex-shrink-0">
            Email
          </span>
          <span className="text-xs sm:text-sm text-gray-900 font-semibold truncate">
            {user?.email}
          </span>
        </div>
        <div className="flex justify-between items-center gap-2 p-2 sm:p-3 bg-sky-50 rounded-lg">
          <span className="text-xs sm:text-sm font-medium text-gray-700">Role</span>
          <span className="text-xs sm:text-sm text-gray-900 font-semibold capitalize">
            {user?.role}
          </span>
        </div>
        {user?.employeeId && (
          <div className="flex justify-between items-center gap-2 p-2 sm:p-3 bg-green-50 rounded-lg">
            <span className="text-xs sm:text-sm font-medium text-gray-700 flex-shrink-0">
              Employee ID
            </span>
            <span className="text-xs sm:text-sm text-gray-900 font-semibold">
              {user.employeeId}
            </span>
          </div>
        )}
        {user?.department && user.department !== 'none' && (
          <div className="flex justify-between items-center gap-2 p-2 sm:p-3 bg-purple-50 rounded-lg">
            <span className="text-xs sm:text-sm font-medium text-gray-700 flex-shrink-0">
              Department
            </span>
            <span className="text-xs sm:text-sm text-gray-900 font-semibold capitalize">
              {user.department}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
