import React from 'react';
import { X, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { getSeverityColor, getSeverityIcon, formatActivityType, formatDate } from './activityHelpers';

const ActivityDetailModal = ({ show, activity, onClose }) => {
  if (!show || !activity) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Activity Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Activity Type</label>
                <p className="text-gray-900 font-medium">{formatActivityType(activity.activityType)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Resource Type</label>
                <p className="text-gray-900 font-medium">{activity.resourceType}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Timestamp</label>
                <p className="text-gray-900">{formatDate(activity.timestamp)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Severity</label>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(activity.severity)}`}>
                  {getSeverityIcon(activity.severity, AlertCircle, AlertTriangle, Info)}
                  {activity.severity}
                </span>
              </div>
            </div>

            {/* Performed By */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Performed By</label>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-gray-900 font-medium">{activity.performedBy?.name || 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{activity.performedBy?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="text-gray-900">{activity.performedBy?.role || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="text-gray-900">{activity.performedBy?.department || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
              <p className="text-gray-900">{activity.description}</p>
            </div>

            {/* Details */}
            {activity.details && Object.keys(activity.details).length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Additional Details</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-900 whitespace-pre-wrap font-mono">
                    {JSON.stringify(activity.details, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailModal;
