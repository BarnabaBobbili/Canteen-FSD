import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Sun, Moon, Search, Menu as MenuIcon, X } from 'lucide-react';

/**
 * AboutNavbar Component
 * Top navigation bar with brand, links, theme toggle, and search
 */
const AboutNavbar = ({
  darkMode,
  setDarkMode,
  sidebarOpen,
  setSidebarOpen,
  setSearchOpen,
  setActiveSection
}) => {
  const navigate = useNavigate();

  return (
    <nav className="about-navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
          <a href="/" className="navbar-brand" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <UtensilsCrossed size={28} />
            <strong>CanteenDelight</strong>
          </a>
          <a href="/docs/welcome" className="navbar-link" onClick={(e) => { e.preventDefault(); navigate('/docs/welcome'); }}>Docs</a>
          <a href="https://github.com/BarnabaBobbili/Canteen-FSD" target="_blank" rel="noopener noreferrer" className="navbar-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 1c-4.972 0-9 4.027-9 9a8.995 8.995 0 0 0 6.154 8.54c.45.077.619-.193.619-.43 0-.213-.012-.92-.012-1.675-2.261.417-2.846-.55-3.026-1.058-.102-.259-.54-1.057-.922-1.271-.315-.169-.765-.585-.012-.596.709-.012 1.215.652 1.384.922.81 1.361 2.104.979 2.62.743.08-.585.316-.978.575-1.203-2.002-.225-4.095-1.002-4.095-4.445 0-.979.348-1.788.923-2.419-.09-.225-.405-1.147.09-2.385 0 0 .753-.236 2.475.924a8.352 8.352 0 0 1 2.25-.305c.765 0 1.53.101 2.25.304 1.72-1.17 2.475-.922 2.475-.922.495 1.238.18 2.16.09 2.385.573.63.922 1.428.922 2.418 0 3.455-2.103 4.22-4.106 4.445.326.28.608.82.608 1.665 0 1.203-.012 2.17-.012 2.475 0 .235.17.516.62.426A9.014 9.014 0 0 0 19 10c0-4.973-4.027-9-9-9z"></path>
            </svg>
            GitHub
          </a>
          <a href="#" className="contact-link" onClick={() => setActiveSection('contact')}>Contact us</a>
        </div>
        <div className="navbar-right">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="search-button" onClick={() => setSearchOpen(true)}>
            <Search size={18} />
            <span>Search</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AboutNavbar;
