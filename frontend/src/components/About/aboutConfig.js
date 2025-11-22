/**
 * About Page Configuration
 * Contains sidebar navigation structure and section metadata
 */

export const sidebarItems = [
  {
    category: 'Getting Started',
    emoji: '🚀',
    items: [
      { id: 'welcome', label: 'Welcome' },
      { id: 'about', label: 'About CanteenDelight' },
      { id: 'quick-start', label: 'Quick Start Guide' },
      { id: 'account-setup', label: 'Account Setup' },
    ]
  },
  {
    category: 'Using CanteenDelight',
    emoji: '☁️',
    items: [
      { id: 'dashboard', label: 'Dashboard Overview' },
      { id: 'menu-management', label: 'Menu Management' },
      { id: 'order-processing', label: 'Order Processing' },
      { id: 'inventory', label: 'Inventory Tracking' },
    ]
  },
  {
    category: 'Features',
    emoji: '✨',
    items: [
      { id: 'analytics', label: 'Analytics & Reports' },
      { id: 'staff', label: 'Staff Management' },
      { id: 'discounts', label: 'Discounts & Offers' },
      { id: 'payments', label: 'Payment Tracking' },
      { id: 'security', label: 'Security Features' },
      { id: 'api-docs', label: 'API Documentation' },
      { id: 'integrations', label: 'Integrations' },
      { id: 'search-filters', label: 'Advanced Search & Filters' },
    ]
  },
  {
    category: 'Billing & Plans',
    emoji: '💎',
    items: [
      { id: 'pricing', label: 'Pricing Plans' },
      { id: 'subscription', label: 'Subscription Management' },
    ]
  },
  {
    category: 'Support',
    emoji: '🔧',
    items: [
      { id: 'faq', label: 'FAQ' },
      { id: 'contact', label: 'Contact Support' },
    ]
  },
  {
    category: 'Legal',
    emoji: '📜',
    items: [
      { id: 'terms', label: 'Terms & Conditions' },
      { id: 'privacy', label: 'Privacy Policy' },
    ]
  },
  {
    category: 'Contribute',
    emoji: '🤝',
    items: [
      { id: 'contribute', label: 'Contributing Guide' },
    ]
  },
  {
    category: 'Technical Documentation',
    emoji: '📖',
    items: [
      { id: 'whitepaper', label: 'White Paper Overview' },
      { id: 'system-architecture', label: 'System Architecture' },
      { id: 'database-schema', label: 'Database Schema' },
      { id: 'feature-modules', label: 'Feature Modules' },
      { id: 'api-architecture', label: 'API Architecture' },
      { id: 'security-architecture', label: 'Security' },
      { id: 'implementation', label: 'Implementation Guide' },
      { id: 'code-examples', label: 'Code Examples' },
    ]
  },
];

/**
 * All valid section IDs
 */
export const allSectionIds = [
  'welcome', 'about', 'quick-start', 'account-setup',
  'dashboard', 'menu-management', 'order-processing', 'inventory',
  'analytics', 'staff', 'discounts', 'payments', 'security', 'api-docs', 'integrations', 'search-filters',
  'pricing', 'subscription', 'faq', 'contact', 'terms', 'privacy', 'contribute',
  'whitepaper', 'system-architecture', 'database-schema', 'feature-modules', 'api-architecture', 'security-architecture', 'implementation', 'code-examples'
];
