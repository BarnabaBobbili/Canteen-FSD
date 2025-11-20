import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { formatDateTime } from '../layoutHelpers';

/**
 * DateTimeDisplay Component
 * Displays current date and time with timezone support
 */
const DateTimeDisplay = ({ timezone }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date and time using settings
  const { date, time } = useMemo(
    () => formatDateTime(currentDateTime, timezone),
    [currentDateTime, timezone]
  );

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{date}</span>
      </div>
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg border" style={{ backgroundColor: '#E0F2FE', borderColor: '#1570EF' }}>
        <Clock className="w-4 h-4" style={{ color: '#1570EF' }} />
        <span className="text-sm font-bold" style={{ color: '#1570EF' }}>{time}</span>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
