import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

/**
 * Shared footer component for user-facing pages
 */
const Footer = () => {
  const { theme } = useTheme();

  const linkStyle = {
    color: theme === 'dark' ? '#a0aec0' : '#4a5568',
    textDecoration: 'none',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'color 0.2s',
    display: 'block',
    marginBottom: '0.5rem'
  };

  const headingStyle = {
    color: theme === 'dark' ? '#f7fafc' : '#1a202c',
    fontSize: '0.875rem',
    fontWeight: '700',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  return (
    <footer
      className="relative border-t-4 border-gray-900 py-12"
      style={{
        fontFamily: '"Comic Sans MS", "Marker Felt", cursive',
        backgroundColor: theme === 'dark' ? '#1a1a2e' : '#f8f9fa',
        color: theme === 'dark' ? '#e0e0e0' : '#4a5568'
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <UtensilsCrossed size={28} style={{ color: theme === 'dark' ? '#a0aec0' : '#000', opacity: 0.8 }} />
              <span
                className="font-black text-xl"
                style={{ color: theme === 'dark' ? '#f7fafc' : '#1a202c', opacity: 0.8 }}
              >
                CanteenDelight
              </span>
            </div>
            <p className="text-sm" style={{ color: theme === 'dark' ? '#a0aec0' : '#4a5568', lineHeight: '1.6' }}>
              Complete Canteen Management Solution
            </p>
          </div>

          {/* Column 2 - Product */}
          <div>
            <h3 style={headingStyle}>Product</h3>
            <a href="/docs/analytics" style={linkStyle} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#a0aec0' : '#4a5568'}>
              Features
            </a>
            <a href="/docs/pricing" style={linkStyle} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#a0aec0' : '#4a5568'}>
              Pricing
            </a>
            <a href="/demo" style={linkStyle} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#a0aec0' : '#4a5568'}>
              Demo
            </a>
            <a href="/signup" style={linkStyle} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#a0aec0' : '#4a5568'}>
              Get Started
            </a>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h3 style={headingStyle}>Company</h3>
            <a href="/docs/about" style={linkStyle} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#a0aec0' : '#4a5568'}>
              About Us
            </a>
            <a href="/docs/contact" style={linkStyle} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#a0aec0' : '#4a5568'}>
              Contact Sales
            </a>
            <a href="/docs/contribute" style={linkStyle} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#a0aec0' : '#4a5568'}>
              Contribute
            </a>
          </div>

          {/* Column 4 - Support */}
          <div>
            <h3 style={headingStyle}>Support</h3>
            <a href="/docs/welcome" style={linkStyle} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#a0aec0' : '#4a5568'}>
              Help Center
            </a>
            <a href="/docs/faq" style={linkStyle} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#a0aec0' : '#4a5568'}>
              FAQ
            </a>
            <a href="https://github.com/BarnabaBobbili/Canteen-FSD" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#a0aec0' : '#4a5568'}>
              GitHub
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 border-t"
          style={{
            borderColor: theme === 'dark' ? '#3e3e3e' : '#e2e8f0'
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm" style={{ color: theme === 'dark' ? '#a0aec0' : '#4a5568' }}>
              © 2024 - 2025 CanteenDelight. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="/docs/terms" className="text-sm" style={linkStyle} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#a0aec0' : '#4a5568'}>
                Terms
              </a>
              <a href="/docs/privacy" className="text-sm" style={linkStyle} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#a0aec0' : '#4a5568'}>
                Privacy
              </a>
              <a href="/docs/contact" className="text-sm" style={linkStyle} onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#e2e8f0' : '#1a202c'} onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#a0aec0' : '#4a5568'}>
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
