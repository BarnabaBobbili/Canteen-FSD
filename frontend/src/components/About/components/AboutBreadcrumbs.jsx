import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

/**
 * AboutBreadcrumbs Component
 * Breadcrumb navigation showing current location
 */
const AboutBreadcrumbs = ({
  category,
  currentItem,
  setActiveSection,
  darkMode
}) => {
  return (
    <div className="breadcrumbs" style={{ color: darkMode ? '#b4b4b4' : '#606770' }}>
      <button
        onClick={() => setActiveSection('welcome')}
        className="breadcrumb-link"
        style={{ color: darkMode ? '#b4b4b4' : '#606770' }}
      >
        <Home size={16} />
      </button>
      <ChevronRight size={16} />
      <span>{category?.category || 'Documentation'}</span>
      <ChevronRight size={16} />
      <span style={{ color: darkMode ? '#e3e3e3' : '#1c1e21' }}>
        {currentItem?.label || 'Welcome'}
      </span>
    </div>
  );
};

export default AboutBreadcrumbs;
