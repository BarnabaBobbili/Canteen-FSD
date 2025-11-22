import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * AboutPagination Component
 * Previous/Next navigation buttons
 */
const AboutPagination = ({
  navigation,
  setActiveSection,
  darkMode
}) => {
  const { prev, next } = navigation;

  return (
    <div className="pagination">
      {prev && (
        <button
          className="pagination-button prev"
          onClick={() => setActiveSection(prev.id)}
          style={{
            color: darkMode ? '#e3e3e3' : '#1c1e21',
            borderColor: darkMode ? '#3e3e3e' : '#dadde1'
          }}
        >
          <ArrowLeft size={20} />
          <div className="pagination-text">
            <div className="pagination-label" style={{ color: darkMode ? '#b4b4b4' : '#606770' }}>
              Previous
            </div>
            <div className="pagination-title">{prev.label}</div>
          </div>
        </button>
      )}
      {next && (
        <button
          className="pagination-button next"
          onClick={() => setActiveSection(next.id)}
          style={{
            color: darkMode ? '#e3e3e3' : '#1c1e21',
            borderColor: darkMode ? '#3e3e3e' : '#dadde1'
          }}
        >
          <div className="pagination-text">
            <div className="pagination-label" style={{ color: darkMode ? '#b4b4b4' : '#606770' }}>
              Next
            </div>
            <div className="pagination-title">{next.label}</div>
          </div>
          <ArrowRight size={20} />
        </button>
      )}
    </div>
  );
};

export default AboutPagination;
