import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

// Import extracted components
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import MobileSidebar from './Sidebar/MobileSidebar';
import SidebarTrigger from './Sidebar/SidebarTrigger';
import SidebarTooltips from './Sidebar/SidebarTooltips';
import LogoutConfirmModal from './LogoutConfirmModal';

// Import helper functions
import { getPath, getNavigationItems, filterNavigationByRole } from './layoutHelpers';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { settings } = useSettings();

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false); // Expanded/collapsed state
  const [sidebarVisible, setSidebarVisible] = useState(false); // Visible/hidden state
  const [sidebarLocked, setSidebarLocked] = useState(() => {
    // Load locked state from localStorage
    return localStorage.getItem('sidebarLocked') === 'true';
  });

  // Dropdown and modal state
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Refs
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);
  const triggerRef = useRef(null);

  // Show sidebar when locked
  useEffect(() => {
    if (sidebarLocked) {
      setSidebarVisible(true);
    }
  }, [sidebarLocked]);

  // Handle lock toggle
  const toggleLock = () => {
    const newLockState = !sidebarLocked;
    setSidebarLocked(newLockState);
    localStorage.setItem('sidebarLocked', newLockState.toString());
    if (!newLockState) {
      setSidebarVisible(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle sidebar visibility with mouse position (only when not locked)
  useEffect(() => {
    if (sidebarLocked) return; // Don't handle mouse if locked

    const handleMouseMove = (e) => {
      // Show sidebar when mouse is within 20px of left edge (desktop only)
      if (window.innerWidth >= 1024) {
        if (e.clientX <= 20) {
          setSidebarVisible(true);
        }
      }
    };

    const handleMouseLeave = (e) => {
      // Hide sidebar when mouse leaves the sidebar area (only if not locked)
      if (sidebarRef.current && !sidebarRef.current.contains(e.relatedTarget)) {
        const sidebarWidth = sidebarOpen ? 256 : 80;
        if (e.clientX > sidebarWidth) {
          setSidebarVisible(false);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    if (sidebarRef.current) {
      sidebarRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (sidebarRef.current) {
        sidebarRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [sidebarOpen, sidebarLocked]);

  // Navigation items with role-based access
  const navItems = useMemo(() => {
    const items = getNavigationItems(t);
    return items.map(item => ({
      ...item,
      path: getPath(item.path, user?.role)
    }));
  }, [t, user?.role]);

  const accessibleNavItems = useMemo(() => {
    return filterNavigationByRole(navItems, user?.role);
  }, [navItems, user?.role]);

  const handleLogoutClick = () => {
    if (user?.role === 'admin') {
      setShowLogoutConfirm(true);
    } else {
      logout();
      navigate('/login', { replace: true, state: null });
    }
  };

  const confirmLogout = () => {
    logout();
    navigate('/login', { replace: true, state: null });
  };

  const handleMobileMenuToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex h-screen macos-bg overflow-hidden">
      {/* Hover Trigger Zone - Only show when not locked */}
      <SidebarTrigger
        sidebarLocked={sidebarLocked}
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        triggerRef={triggerRef}
      />

      {/* Desktop Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarLocked={sidebarLocked}
        sidebarVisible={sidebarVisible}
        toggleLock={toggleLock}
        sidebarRef={sidebarRef}
        navItems={accessibleNavItems}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        onLogoutClick={handleLogoutClick}
      />

      {/* Tooltips Portal - Rendered outside sidebar for proper z-index */}
      <SidebarTooltips
        sidebarVisible={sidebarVisible}
        sidebarOpen={sidebarOpen}
        hoveredItem={hoveredItem}
        sidebarLocked={sidebarLocked}
        navItems={accessibleNavItems}
      />

      {/* Mobile Sidebar */}
      <MobileSidebar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        navItems={accessibleNavItems}
        onLogoutClick={handleLogoutClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          onMobileMenuToggle={handleMobileMenuToggle}
          timezone={settings?.system?.timezone || 'Asia/Kolkata'}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          notificationRef={notificationRef}
          profileRef={profileRef}
          user={user}
          onLogoutClick={handleLogoutClick}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6" style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        show={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default DashboardLayout;
