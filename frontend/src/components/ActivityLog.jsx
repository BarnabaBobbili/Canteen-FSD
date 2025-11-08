import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from './DashboardLayout';
import API_BASE_URL from '../config/api';
import { Activity } from 'lucide-react';

// Import ActivityLog components
import ActivityFilters from './ActivityLog/ActivityFilters';
import ActivityTable from './ActivityLog/ActivityTable';
import ActivityDetailModal from './ActivityLog/ActivityDetailModal';
import ActivityPagination from './ActivityLog/ActivityPagination';

const ActivityLog = () => {
  const { token } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    activityType: '',
    resourceType: '',
    severity: '',
    startDate: '',
    endDate: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, filters]);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''))
      });

      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`${API_BASE_URL}/activities?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setActivities(data.activities);
      setPagination(prev => ({ ...prev, ...data.pagination }));
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchActivities();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      activityType: '',
      resourceType: '',
      severity: '',
      startDate: '',
      endDate: ''
    });
    setSearchTerm('');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const openDetailModal = async (activityId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/activities/${activityId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setSelectedActivity(data);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Failed to fetch activity details:', error);
    }
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedActivity(null);
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Activity Log</h1>
          </div>
          <p className="text-gray-600">Track all system activities and changes</p>
        </div>

        {/* Search and Filter Section */}
        <ActivityFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
          filters={filters}
          onFilterChange={handleFilterChange}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          onClearFilters={clearFilters}
        />

        {/* Activities List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : activities.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No activities found</p>
          </div>
        ) : (
          <>
            <ActivityTable
              activities={activities}
              onViewDetails={openDetailModal}
            />

            <ActivityPagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {/* Detail Modal */}
        <ActivityDetailModal
          show={showDetailModal}
          activity={selectedActivity}
          onClose={closeDetailModal}
        />
      </div>
    </DashboardLayout>
  );
};

export default ActivityLog;
