import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';

/**
 * Custom macOS-styled DatePicker Component
 * Wrapper around react-datepicker with macOS theme styling
 */
const MacOSDatePicker = ({
  selected,
  onChange,
  placeholderText = 'Select date',
  dateFormat = 'yyyy-MM-dd',
  minDate,
  maxDate,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <div className="relative w-full" style={{ zIndex: 1 }}>
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        className={`macos-input text-sm w-full pr-10 ${className}`}
        calendarClassName="macos-calendar"
        popperClassName="macos-calendar-popper"
        wrapperClassName="w-full"
        showPopperArrow={false}
        popperPlacement="bottom-start"
        withPortal
        portalId="root-portal"
        {...props}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Calendar className="w-4 h-4" style={{ color: '#9CA3AF' }} />
      </div>
    </div>
  );
};

export default MacOSDatePicker;
