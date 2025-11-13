import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import {
  ShoppingCart, UtensilsCrossed, Package, Users, Truck, Tag,
  MessageSquare, CreditCard, LogOut, Menu, LayoutDashboard, Activity,
  AlertCircle, Bell, ChevronDown, Settings, ChevronLeft, ChevronRight,
  Lock, Unlock, Calendar, Clock
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { settings } = useSettings();
  const [sidebarOpen, setSidebarOpen] = useState(false); // Expanded/collapsed state
  const [sidebarVisible, setSidebarVisible] = useState(false); // Visible/hidden state
  const [sidebarLocked, setSidebarLocked] = useState(() => {
    // Load locked state from localStorage
    return localStorage.getItem('sidebarLocked') === 'true';
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const sidebarRef = useRef(null);
  const triggerRef = useRef(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Show sidebar when locked
  useEffect(() => {
    if (sidebarLocked) {
      setSidebarVisible(true);
    }
  }, [sidebarLocked]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date and time using dynamic settings - recalculates when currentDateTime or settings change
  const { date, time } = useMemo(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    try {
      // Get current time in the selected timezone
      const timeInZone = new Date().toLocaleString('en-US', {
        timeZone: settings?.system?.timezone || 'Asia/Kolkata'
      });
      const dateInZone = new Date(timeInZone);

      const dayName = days[dateInZone.getDay()];
      const day = dateInZone.getDate();
      const month = months[dateInZone.getMonth()];
      const year = dateInZone.getFullYear();

      const hours = String(dateInZone.getHours()).padStart(2, '0');
      const minutes = String(dateInZone.getMinutes()).padStart(2, '0');
      const seconds = String(dateInZone.getSeconds()).padStart(2, '0');

      return {
        date: `${dayName}, ${day} ${month} ${year}`,
        time: `${hours}:${minutes}:${seconds}`
      };
    } catch (error) {
      // Fallback to local time if timezone conversion fails
      const dayName = days[currentDateTime.getDay()];
      const day = currentDateTime.getDate();
      const month = months[currentDateTime.getMonth()];
      const year = currentDateTime.getFullYear();

      const hours = String(currentDateTime.getHours()).padStart(2, '0');
      const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
      const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');

      return {
        date: `${dayName}, ${day} ${month} ${year}`,
        time: `${hours}:${minutes}:${seconds}`
      };
    }
  }, [currentDateTime, settings?.system?.timezone]);

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

  // Helper function to get path with role-based prefix
  const getPath = (basePath) => {
    if (user?.role === 'admin') {
      return `/admin${basePath === '/dashboard' ? '' : basePath}`;
    } else if (user?.role === 'manager') {
      return `/manager${basePath === '/dashboard' ? '' : basePath}`;
    }
    return basePath;
  };

  // Navigation items with role-based access - uses translations
  const navItems = [
    { name: t('common.dashboard'), path: getPath('/dashboard'), icon: LayoutDashboard, roles: ['admin', 'manager', 'cashier', 'staff', 'customer'] },
    { name: t('common.orders'), path: getPath('/orders'), icon: ShoppingCart, roles: ['admin', 'manager', 'cashier', 'staff'] },
    { name: t('common.menu'), path: getPath('/menu'), icon: UtensilsCrossed, roles: ['admin', 'manager', 'staff'] },
    { name: t('common.inventory'), path: getPath('/inventory'), icon: Package, roles: ['admin', 'manager', 'staff'] },
    { name: t('common.staff'), path: getPath('/staff'), icon: Users, roles: ['admin'] }, // Admin only
    { name: t('common.activities'), path: getPath('/activities'), icon: Activity, roles: ['admin'] }, // Admin only
    { name: t('common.suppliers'), path: getPath('/suppliers'), icon: Truck, roles: ['admin', 'manager'] },
    { name: t('common.discounts'), path: getPath('/discounts'), icon: Tag, roles: ['admin', 'manager'] },
    { name: t('common.feedback'), path: getPath('/feedback'), icon: MessageSquare, roles: ['admin', 'manager'] },
    { name: t('common.payments'), path: getPath('/payments'), icon: CreditCard, roles: ['admin', 'manager', 'cashier'] }
  ];

  const accessibleNavItems = navItems.filter(item => item.roles.includes(user?.role));

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

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Hover Trigger Zone - Only show when not locked */}
      {!sidebarLocked && (
        <>
          <div
            ref={triggerRef}
            className="fixed left-0 top-0 bottom-0 w-1 z-40 hidden lg:block"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={() => setSidebarVisible(true)}
          />

          {/* Visual Indicator - Subtle line at left edge */}
          <div
            className={`fixed left-0 top-0 bottom-0 w-1 transition-opacity duration-300 hidden lg:block ${
              sidebarVisible ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              backgroundColor: '#1570EF',
              zIndex: 30
            }}
          />
        </>
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`${sidebarLocked ? 'relative' : 'fixed left-0 top-0'} h-full ${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 transition-all duration-300 shadow-xl hidden lg:flex flex-col ${
          sidebarLocked || sidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={sidebarLocked ? {} : { zIndex: 50 }}
      >
        {/* Logo */}
        <div className="h-16 px-4 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E0F2FE' }}>
              <UtensilsCrossed className="w-6 h-6" style={{ color: '#1570EF' }} />
            </div>
            {sidebarOpen && (
              <span className="ml-3 text-xl font-bold text-gray-900 whitespace-nowrap">Canteen</span>
            )}
          </div>
          {/* Lock and Collapse buttons - only show when expanded */}
          {sidebarOpen && (
            <div className="flex items-center gap-1">
              {/* Lock/Unlock Button */}
              <button
                onClick={toggleLock}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                title={sidebarLocked ? 'Unlock sidebar' : 'Lock sidebar in place'}
                style={{ color: sidebarLocked ? '#1570EF' : '#9CA3AF' }}
              >
                {sidebarLocked ? (
                  <Lock className="w-5 h-5" />
                ) : (
                  <Unlock className="w-5 h-5" />
                )}
              </button>

              {/* Collapse Button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 flex flex-col justify-evenly overflow-hidden">
          {accessibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <div key={item.path} className="relative">
                <button
                  onClick={() => navigate(item.path)}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full flex items-center ${
                    sidebarOpen ? 'px-4' : 'px-3 justify-center'
                  } py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={isActive ? { backgroundColor: '#1570EF' } : {}}
                  title={!sidebarOpen ? item.name : ''}
                >
                  <Icon className={`w-5 h-5 ${sidebarOpen ? 'mr-3' : ''} flex-shrink-0`} />
                  {sidebarOpen && <span className="truncate">{item.name}</span>}
                </button>
              </div>
            );
          })}
        </nav>

        {/* Toggle and Lock Buttons (when collapsed) */}
        {!sidebarOpen && (
          <div className="px-3 py-2 border-t border-gray-100 space-y-1">
            {/* Lock/Unlock Button */}
            <button
              onClick={toggleLock}
              onMouseEnter={() => setHoveredItem('lock')}
              onMouseLeave={() => setHoveredItem(null)}
              className="w-full flex items-center justify-center px-3 py-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
              title={sidebarLocked ? 'Unlock sidebar' : 'Lock sidebar in place'}
              style={{ color: sidebarLocked ? '#1570EF' : '#6B7280' }}
            >
              {sidebarLocked ? (
                <Lock className="w-5 h-5" />
              ) : (
                <Unlock className="w-5 h-5" />
              )}
            </button>

            {/* Expand Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-full flex items-center justify-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
              title="Expand sidebar"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* User Section (when expanded) */}
        {sidebarOpen && (
          <div className="px-3 py-2 border-t border-gray-100">
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              {t('common.logout')}
            </button>
          </div>
        )}

        {/* Logout icon only (when collapsed) */}
        {!sidebarOpen && (
          <div className="px-3 py-2 border-t border-gray-100">
            <button
              onClick={handleLogoutClick}
              onMouseEnter={() => setHoveredItem('logout')}
              onMouseLeave={() => setHoveredItem(null)}
              className="w-full flex items-center justify-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}

      </aside>

      {/* Tooltips Portal - Rendered outside sidebar for proper z-index */}
      {sidebarVisible && !sidebarOpen && hoveredItem && hoveredItem !== 'logout' && hoveredItem !== 'lock' && (
        <div
          className="fixed px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none shadow-lg"
          style={{
            left: '92px', // 80px sidebar + 12px spacing
            top: (() => {
              const index = accessibleNavItems.findIndex(item => item.path === hoveredItem);
              const totalHeight = window.innerHeight;
              const navStartY = 64; // Logo height
              const navEndY = totalHeight - 140; // Subtract bottom sections
              const itemHeight = (navEndY - navStartY) / accessibleNavItems.length;
              return `${navStartY + (index * itemHeight) + (itemHeight / 2) - 20}px`;
            })(),
            zIndex: 99999
          }}
        >
          {accessibleNavItems.find(item => item.path === hoveredItem)?.name}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900" style={{ left: '-6px' }}></div>
        </div>
      )}

      {/* Lock Button Tooltip */}
      {sidebarVisible && !sidebarOpen && hoveredItem === 'lock' && (
        <div
          className="fixed px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none shadow-lg"
          style={{
            left: '92px',
            bottom: '100px',
            zIndex: 99999
          }}
        >
          {sidebarLocked ? 'Unlock sidebar' : 'Lock sidebar'}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900" style={{ left: '-6px' }}></div>
        </div>
      )}

      {/* Logout Tooltip */}
      {sidebarVisible && !sidebarOpen && hoveredItem === 'logout' && (
        <div
          className="fixed px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none shadow-lg"
          style={{
            left: '92px',
            bottom: '52px',
            zIndex: 99999
          }}
        >
          {t('common.logout')}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900" style={{ left: '-6px' }}></div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarVisible(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-50 lg:hidden ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-full'
        } shadow-xl`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-18 px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E0F2FE' }}>
                <UtensilsCrossed className="w-6 h-6" style={{ color: '#1570EF' }} />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Canteen</span>
            </div>
            <button
              onClick={() => setSidebarVisible(false)}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {accessibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarVisible(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={isActive ? { backgroundColor: '#1570EF' } : {}}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="px-4 py-4 border-t border-gray-100">
            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              {t('common.logout')}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-18 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
          {/* Left: Mobile Menu + Date/Time */}
          <div className="flex items-center flex-1 gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarVisible(!sidebarVisible)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Date and Time Display */}
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
          </div>

          {/* Right: Notifications, Profile */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                className="relative p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-xs font-medium px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                        style={{ color: '#1570EF' }}
                      >
                        Mark all read
                      </button>
                      <button className="text-xs font-medium text-red-600 px-2 py-1 rounded hover:bg-red-50 transition-colors">
                        Clear all
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E0F2FE' }}>
                          <Bell className="w-5 h-5" style={{ color: '#1570EF' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">New order received</p>
                          <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                        </div>
                        <div className="flex-shrink-0 w-2 h-2 rounded-full mt-1" style={{ backgroundColor: '#1570EF' }}></div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFF7ED' }}>
                          <Bell className="w-5 h-5" style={{ color: '#F59E0B' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">Low stock alert</p>
                          <p className="text-xs text-gray-500 mt-1">Rice stock is running low</p>
                          <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ECFDF5' }}>
                          <Bell className="w-5 h-5" style={{ color: '#10B981' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-700">Payment received</p>
                          <p className="text-xs text-gray-500 mt-1">₹500 received for Order #1233</p>
                          <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Only show "See all notifications" for admin */}
                  {user?.role === 'admin' && (
                    <div className="p-3 text-center border-t border-gray-100">
                      <button
                        onClick={() => {
                          navigate('/admin/notifications');
                          setShowNotifications(false);
                        }}
                        className="text-sm font-medium hover:underline transition-all"
                        style={{ color: '#1570EF' }}
                      >
                        See all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundColor: '#1570EF' }}
                >
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    {/* Only show settings for admin */}
                    {user?.role === 'admin' && (
                      <button
                        onClick={() => {
                          navigate('/admin/settings');
                          setShowProfile(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                      >
                        <Settings className="w-4 h-4 mr-3 text-gray-400" />
                        Settings
                      </button>
                    )}
                    <button
                      onClick={handleLogoutClick}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: '#F4F5FA' }}>
          {children}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-center w-14 h-14 mx-auto bg-red-100 rounded-full">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900 text-center">
                Confirm Logout
              </h3>
              <p className="mt-2 text-sm text-gray-600 text-center leading-relaxed">
                Are you sure you want to logout? You will need to sign in again to access the dashboard.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors shadow-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
