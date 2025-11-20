import React from 'react';
import { UtensilsCrossed, Eye, LogOut } from 'lucide-react';

/**
 * CashierHeader Component
 * Header bar with branding, user info, and action buttons
 */
const CashierHeader = ({ user, onViewOrders, onLogout }) => {
  return (
    <div className="bg-sky-600 text-white shadow">
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-sky-700 p-2 rounded">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Canteen POS System</h1>
              <p className="text-xs text-sky-100">
                {user?.name} • {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onViewOrders}
              className="flex items-center gap-2 px-4 py-2 bg-white text-sky-600 rounded hover:bg-gray-100 font-medium text-sm"
            >
              <Eye size={18} />
              Today's Orders
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-sky-700 border border-sky-500 rounded hover:bg-sky-800 text-sm"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierHeader;
