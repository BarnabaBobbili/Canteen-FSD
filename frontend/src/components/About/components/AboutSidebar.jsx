import React from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { sidebarItems } from '../aboutConfig';

/**
 * AboutSidebar Component
 * Navigation sidebar with categories and section links
 */
const AboutSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeSection,
  setActiveSection,
  darkMode
}) => {
  return (
    <aside
      className={`about-sidebar ${sidebarOpen ? 'open' : ''}`}
      style={{
        backgroundColor: darkMode ? '#18191a' : '#f5f6f7',
        borderRight: `1px solid ${darkMode ? '#3e3e3e' : '#dadde1'}`
      }}
    >
      <div className="sidebar-header">
        <button
          className="home-button"
          onClick={() => setActiveSection('welcome')}
          style={{ color: darkMode ? '#e3e3e3' : '#1c1e21' }}
        >
          <Home size={20} />
          <span>Documentation</span>
        </button>
      </div>
      <nav className="sidebar-nav">
        {sidebarItems.map((category, idx) => (
          <div key={idx} className="sidebar-category">
            <div
              className="category-title"
              style={{ color: darkMode ? '#b4b4b4' : '#606770' }}
            >
              <span className="category-emoji">{category.emoji}</span>
              {category.category}
            </div>
            <div className="category-items">
              {category.items.map(item => (
                <button
                  key={item.id}
                  className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  style={{
                    color: activeSection === item.id
                      ? darkMode ? '#2d88ff' : '#1877f2'
                      : darkMode ? '#e3e3e3' : '#1c1e21',
                    backgroundColor: activeSection === item.id
                      ? darkMode ? 'rgba(45, 136, 255, 0.1)' : 'rgba(24, 119, 242, 0.1)'
                      : 'transparent'
                  }}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={16} className="chevron-icon" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AboutSidebar;
