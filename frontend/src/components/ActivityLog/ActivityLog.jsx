import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../Layout/DashboardLayout';
import { Activity } from 'lucide-react';

// Import ActivityLog components
import ActivityFilters from './ActivityFilters';
import ActivityTable from './ActivityTable';
import ActivityDetailModal from './ActivityDetailModal';
import ActivityPagination from './ActivityPagination';

// Import service functions
import {
  fetchActivities as fetchActivitiesAPI,
  fetchActivityById
} from './activityService';

const ActivityLog = () => {
  const { t } = useTranslation();
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
      const data = await fetchActivitiesAPI({
        page: pagination.page,
        limit: pagination.limit,
        filters: filters,
        search: searchTerm
      }, token);

      setActivities(data.activities);
      setPagination(prev => ({ ...prev, ...data.pagination }));
    } catch (error) {
      console.error(`${t('activities.fetchError')}:`, error);
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
      const data = await fetchActivityById(activityId, token);
      setSelectedActivity(data);
      setShowDetailModal(true);
    } catch (error) {
      console.error(`${t('activities.fetchDetailsError')}:`, error);
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
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="w-8 h-8" style={{ color: '#1570EF' }} />
          <h1 className="text-3xl font-bold text-gray-800">{t('activities.title')}</h1>
        </div>
        <p className="text-gray-600">{t('activities.description')}</p>
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#1570EF' }}></div>
        </div>
      ) : activities.length === 0 ? (
        <div className="macos-card macos-animate-sm p-8 text-center">
          <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">{t('activities.noActivities')}</p>
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
    </DashboardLayout>
  );
};

export default ActivityLog;
