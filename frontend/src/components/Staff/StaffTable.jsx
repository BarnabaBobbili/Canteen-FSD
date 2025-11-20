import React from 'react';
import { useTranslation } from 'react-i18next';
import { Edit2, Trash2, UserCheck, UserX } from 'lucide-react';
import { getRoleBadgeClass, getStatusBadgeClass } from './staffHelpers';

const StaffTable = ({
  staff,
  loading,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="macos-card macos-animate overflow-hidden">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="macos-card macos-animate overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="macos-table-header">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('common.name')}</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('common.email')}</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('common.phone')}</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('staff.staffRole')}</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('staff.staffDepartment')}</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('common.status')}</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">{t('common.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member, index) => (
              <tr key={member._id || index} className="border-b macos-table-row">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{member.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{member.phone}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRoleBadgeClass(member.role)}`}>
                    {t(`staff.${member.role}`)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 capitalize">{member.department ? t(`staff.departments.${member.department}`) : t('common.notAvailable')}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => onToggleStatus(member._id, member.status)}
                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusBadgeClass(member.status)}`}
                  >
                    {member.status === 'active' ? <UserCheck size={14} /> : <UserX size={14} />}
                    {t(`common.${member.status}`)}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(member)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      aria-label={t('common.edit')}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(member._id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      aria-label={t('common.delete')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {staff.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {t('staff.noStaff')}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffTable;
