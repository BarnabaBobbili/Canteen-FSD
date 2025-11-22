import React from 'react';
import AboutNavbar from './components/AboutNavbar';
import AboutSearchModal from './components/AboutSearchModal';
import AboutSidebar from './components/AboutSidebar';
import AboutContentArea from './components/AboutContentArea';
import AboutFooter from './components/AboutFooter';

/**
 * AboutLayout Component
 * Main layout wrapper for About/Documentation page
 */
const AboutLayout = ({
  darkMode,
  setDarkMode,
  sidebarOpen,
  setSidebarOpen,
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  activeSection,
  setActiveSection,
  category,
  currentItem,
  navigation,
  children
}) => {
  return (
    <div className={`about-page ${darkMode ? 'dark' : 'light'}`}>
      <AboutNavbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setSearchOpen={setSearchOpen}
        setActiveSection={setActiveSection}
      />

      <AboutSearchModal
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setActiveSection={setActiveSection}
      />

      <div className="about-layout">
        <AboutSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          darkMode={darkMode}
        />

        <AboutContentArea
          category={category}
          currentItem={currentItem}
          navigation={navigation}
          setActiveSection={setActiveSection}
          darkMode={darkMode}
        >
          {children}
        </AboutContentArea>
      </div>

      <AboutFooter darkMode={darkMode} />
    </div>
  );
};

export default AboutLayout;
