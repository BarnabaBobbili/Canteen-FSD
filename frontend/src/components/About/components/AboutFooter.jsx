import React from 'react';

/**
 * AboutFooter Component
 * Footer section with copyright
 */
const AboutFooter = ({ darkMode }) => {
  return (
    <footer
      className="about-footer"
      style={{
        backgroundColor: darkMode ? '#18191a' : '#f5f6f7',
        borderTop: `1px solid ${darkMode ? '#3e3e3e' : '#dadde1'}`,
        color: darkMode ? '#b4b4b4' : '#606770'
      }}
    >
      <div className="footer-content">
        <p>© 2024 CanteenDelight. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/BarnabaBobbili/Canteen-FSD" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span>•</span>
          <a href="/docs/privacy">Privacy</a>
          <span>•</span>
          <a href="/docs/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default AboutFooter;
