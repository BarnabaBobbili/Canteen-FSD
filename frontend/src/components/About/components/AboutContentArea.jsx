import React from 'react';
import AboutBreadcrumbs from './AboutBreadcrumbs';
import AboutPagination from './AboutPagination';

/**
 * AboutContentArea Component
 * Main content wrapper with breadcrumbs, article, and pagination
 */
const AboutContentArea = ({
  category,
  currentItem,
  children,
  navigation,
  setActiveSection,
  darkMode
}) => {
  return (
    <main className="about-content">
      <div className="content-inner">
        <AboutBreadcrumbs
          category={category}
          currentItem={currentItem}
          setActiveSection={setActiveSection}
          darkMode={darkMode}
        />

        <article
          className="article-content"
          style={{
            backgroundColor: darkMode ? '#242526' : '#ffffff',
            color: darkMode ? '#e3e3e3' : '#1c1e21'
          }}
        >
          {children}
        </article>

        <AboutPagination
          navigation={navigation}
          setActiveSection={setActiveSection}
          darkMode={darkMode}
        />
      </div>
    </main>
  );
};

export default AboutContentArea;
