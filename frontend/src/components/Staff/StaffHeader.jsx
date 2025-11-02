import React from 'react';
import { Search, Plus, X, Shield } from 'lucide-react';

const StaffHeader = ({ searchTerm, onSearchChange, onAddClick }) => {
  return (
    <>
      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-blue-800 font-semibold mb-1">Staff Account Creation</h3>
            <p className="text-blue-700 text-sm">
              Only Admins can create Staff, Manager, and Cashier accounts. Public signup is restricted to Customer accounts only.
              Use the "Add Staff" button below to create new employee accounts.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Add Controls */}
      <div className="bg-white rounded-xl shadow-lg mb-6 p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
          >
            <Plus size={20} />
            Add Staff
          </button>
        </div>
      </div>
    </>
  );
};

export default StaffHeader;
