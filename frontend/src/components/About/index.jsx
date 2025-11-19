import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  UtensilsCrossed,
  Home,
  ChevronRight,
  Sun,
  Moon,
  Search,
  Menu as MenuIcon,
  X,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import './about.css';

const About = () => {
  const navigate = useNavigate();
  const { section } = useParams();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const activeSection = section || 'welcome';

  // Redirect to welcome if no section or invalid section
  useEffect(() => {
    const allSectionIds = [
      'welcome', 'about', 'quick-start', 'account-setup',
      'dashboard', 'menu-management', 'order-processing', 'inventory',
      'analytics', 'staff', 'discounts', 'payments', 'security', 'api-docs', 'integrations', 'search-filters',
      'pricing', 'subscription', 'faq', 'contact', 'terms', 'privacy', 'contribute'
    ];
    if (!section) {
      navigate('/docs/welcome', { replace: true });
    } else if (!allSectionIds.includes(section)) {
      navigate('/docs/welcome', { replace: true });
    }
  }, [section, navigate]);

  const setActiveSection = (sectionId) => {
    navigate(`/docs/${sectionId}`);
  };

  const sidebarItems = [
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
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'welcome':
        return (
          <>
            <header>
              <h1>Welcome to CanteenDelight</h1>
            </header>
            <p>Congratulations on choosing CanteenDelight for your canteen management needs!<br />
            Click 🔍 <strong>Search</strong> at the top right corner of this page to find what you're looking for.</p>

            <h2>Getting Started</h2>
            <p>Not sure what to do first? Follow these steps to get your canteen up and running:</p>

            <p>🔹 <strong><code>Step 1</code>: Understand the Platform</strong> - <span className="link" onClick={() => setActiveSection('about')}>Learn more about CanteenDelight</span> and discover how it can transform your canteen operations. Understanding the full capabilities will help you maximize your investment.</p>

            <p>🔹 <strong><code>Step 2</code>: Complete Account Setup</strong> - <span className="link" onClick={() => setActiveSection('account-setup')}>Configure your account settings</span>, add your business details, and customize the platform to match your canteen's branding and requirements.</p>

            <p>🔹 <strong><code>Step 3</code>: Build Your Menu</strong> - <span className="link" onClick={() => setActiveSection('menu-management')}>Add your menu items</span> with detailed descriptions, prices, categories, and high-quality images. A well-organized menu is the foundation of efficient operations.</p>

            <p>🔹 <strong><code>Step 4</code>: Set Up Inventory</strong> - <span className="link" onClick={() => setActiveSection('inventory')}>Configure your inventory system</span> with all ingredients and supplies. Set up low-stock alerts to ensure you never run out of essential items during peak hours.</p>

            <p>🔹 <strong><code>Step 5</code>: Onboard Your Team</strong> - <span className="link" onClick={() => setActiveSection('staff')}>Add staff members</span> and assign appropriate roles. Train them on using the system for their specific responsibilities.</p>

            <p>🔹 <strong><code>Step 6</code>: Start Operations</strong> - Use the <span className="link" onClick={() => setActiveSection('dashboard')}>dashboard</span> to manage orders, track payments, monitor inventory, and analyze your business performance in real-time.</p>

            <h2>Best Practices</h2>
            <p>There's no one-size-fits-all way to use CanteenDelight. The best system is the one you stick with. Here are some tips for success:</p>
            <ul>
              <li><strong>Start Simple</strong> - Begin with basic features and gradually explore advanced capabilities</li>
              <li><strong>Regular Updates</strong> - Keep your menu and inventory updated daily for accurate tracking</li>
              <li><strong>Review Analytics</strong> - Check your reports weekly to identify trends and opportunities</li>
              <li><strong>Train Your Team</strong> - Ensure all staff members are comfortable with their modules</li>
              <li><strong>Seek Feedback</strong> - Use customer feedback to continuously improve your service</li>
            </ul>

            <h2>Need Help?</h2>
            <p>Explore this Help Center for detailed guides on every feature. If you have any questions at all, <span className="link" onClick={() => setActiveSection('contact')}>contact our support team</span>. We're happy to help any time and typically respond within 24 hours.</p>

            <p>You can also check our <span className="link" onClick={() => setActiveSection('faq')}>FAQ section</span> for quick answers to common questions.</p>
          </>
        );

      case 'about':
        return (
          <>
            <header>
              <h1>About CanteenDelight</h1>
            </header>
            <p><strong>CanteenDelight</strong> is a comprehensive, cloud-based canteen management solution designed to help canteen owners and food service operators streamline their operations, reduce waste, enhance customer satisfaction, and increase profitability.</p>

            <h2>Our Mission</h2>
            <p>We believe that running a successful canteen shouldn't require juggling multiple spreadsheets, manual calculations, and disconnected systems. Our mission is to provide food service operators with an all-in-one platform that simplifies daily operations while providing powerful insights for business growth.</p>

            <h2>Why Choose CanteenDelight?</h2>
            <p>Managing a canteen involves juggling multiple complex tasks simultaneously - from inventory management and order processing to staff scheduling, financial tracking, and customer satisfaction. Traditional methods using paper records, spreadsheets, and disconnected tools lead to inefficiencies, errors, and missed opportunities.</p>

            <p>CanteenDelight brings all these functions together in one intuitive, integrated platform that's accessible from any device. Whether you're at the counter, in the kitchen, or reviewing reports from home, you have complete control over your canteen operations.</p>

            <h2>Key Benefits</h2>
            <ul>
              <li><strong>Centralized Management</strong> - Control all aspects of your canteen from a single, unified dashboard. No more switching between different apps or losing track of information across multiple systems.</li>
              <li><strong>Real-time Analytics</strong> - Make data-driven decisions with comprehensive reports and visualizations. Understand your sales patterns, identify top-selling items, and spot trends before they become problems.</li>
              <li><strong>Inventory Optimization</strong> - Reduce waste with smart stock tracking, automatic low-stock alerts, expiration date monitoring, and intelligent reorder suggestions based on your sales patterns.</li>
              <li><strong>Seamless Order Processing</strong> - Process orders quickly and accurately with an intuitive interface. Support for multiple order types including counter service, dine-in, and online orders.</li>
              <li><strong>Staff Coordination</strong> - Manage roles, permissions, schedules, and performance metrics. Ensure the right people have access to the right information at the right time.</li>
              <li><strong>Financial Tracking</strong> - Monitor revenue, expenses, and profits in real-time. Track payments, manage discounts, and generate financial reports for accounting and tax purposes.</li>
              <li><strong>Customer Insights</strong> - Understand customer preferences, collect feedback, and build loyalty through personalized service and targeted promotions.</li>
              <li><strong>Mobile Accessibility</strong> - Access your canteen data from anywhere using our responsive web application. Check reports, update menu items, or monitor orders on the go.</li>
            </ul>

            <h2>Who is CanteenDelight For?</h2>
            <p>CanteenDelight is designed for any food service operation that wants to modernize their management approach:</p>
            <ul>
              <li><strong>School and College Canteens</strong> - Manage high-volume, time-sensitive operations during breaks. Handle student accounts, dietary restrictions, and parent notifications.</li>
              <li><strong>Corporate Cafeterias</strong> - Serve employees efficiently with pre-orders, subsidized meals, and department billing. Integrate with employee ID systems.</li>
              <li><strong>Hospital Food Services</strong> - Manage patient meals, dietary requirements, staff cafeteria, and visitor services. Track nutritional information and allergens.</li>
              <li><strong>Factory and Industrial Canteens</strong> - Handle shift-based operations, bulk ordering, and worker meal programs. Support for multiple serving locations.</li>
              <li><strong>Sports Facilities and Event Venues</strong> - Manage high-volume periods during events, multiple service points, and varied menu offerings.</li>
              <li><strong>Residential Complexes</strong> - Provide meal services for apartments, retirement communities, or hostels with resident accounts and subscription models.</li>
            </ul>

            <h2>Technology Stack</h2>
            <p>CanteenDelight is built using modern, reliable technologies:</p>
            <ul>
              <li><strong>Cloud-Based</strong> - No installation required. Access from any browser on any device.</li>
              <li><strong>Secure</strong> - Enterprise-grade security with encrypted data transmission and storage.</li>
              <li><strong>Scalable</strong> - Grows with your business from a single location to multiple outlets.</li>
              <li><strong>Regular Updates</strong> - Continuous improvements and new features without downtime.</li>
            </ul>

            <h2>Our Commitment</h2>
            <p>We're committed to your success. Our dedicated support team is available to help you get the most out of CanteenDelight. We regularly release updates based on customer feedback and industry best practices. When you choose CanteenDelight, you're not just getting software – you're gaining a partner in your canteen's success.</p>
          </>
        );

      case 'quick-start':
        return (
          <>
            <header>
              <h1>Quick Start Guide</h1>
            </header>
            <p>Get your canteen operational with CanteenDelight in under 30 minutes. This guide walks you through the essential setup steps to start processing orders today.</p>

            <h2>Prerequisites</h2>
            <p>Before you begin, make sure you have:</p>
            <ul>
              <li>A valid email address for account verification</li>
              <li>Basic information about your canteen (name, address, contact details)</li>
              <li>A list of your menu items with prices</li>
              <li>Details of staff members who will use the system</li>
            </ul>

            <h2>Step 1: Create Your Account (2 minutes)</h2>
            <p>Visit our signup page and create your account:</p>
            <ul>
              <li>Click "Get Started" on the landing page</li>
              <li>Enter your email address and create a secure password (minimum 8 characters with letters and numbers)</li>
              <li>Alternatively, sign up with your Google account for faster access</li>
              <li>Check your email and click the verification link to activate your account</li>
              <li>Complete your profile with your name and contact number</li>
            </ul>

            <h2>Step 2: Configure Business Settings (3 minutes)</h2>
            <p>Set up your canteen's basic information:</p>
            <ul>
              <li>Navigate to Settings from the sidebar menu</li>
              <li>Enter your canteen name, address, and contact information</li>
              <li>Set your operating hours for each day of the week</li>
              <li>Configure your currency and tax settings</li>
              <li>Upload your canteen logo for branding (optional but recommended)</li>
              <li>Set your receipt footer message</li>
            </ul>

            <h2>Step 3: Add Menu Items (10 minutes)</h2>
            <p>Build your menu with all available items:</p>
            <ul>
              <li>Go to Menu Management from the sidebar</li>
              <li>Click "Add New Item" to create your first menu item</li>
              <li>For each item, enter:
                <ul>
                  <li>Item name (e.g., "Chicken Sandwich")</li>
                  <li>Description (ingredients, preparation method)</li>
                  <li>Category (Breakfast, Lunch, Snacks, Beverages, Desserts)</li>
                  <li>Price</li>
                  <li>Preparation time (helps with kitchen management)</li>
                  <li>Upload an appetizing photo (recommended for customer-facing menus)</li>
                </ul>
              </li>
              <li>Set availability status (available/unavailable)</li>
              <li>Add any dietary tags (vegetarian, vegan, gluten-free, etc.)</li>
              <li>Repeat for all menu items - you can use the "Duplicate" feature for similar items</li>
            </ul>
            <p><strong>Pro Tip:</strong> Start with your top 20 best-selling items first, then add others later.</p>

            <h2>Step 4: Set Up Inventory (5 minutes)</h2>
            <p>Configure inventory tracking for better stock management:</p>
            <ul>
              <li>Navigate to Inventory Management</li>
              <li>Add your key ingredients and supplies</li>
              <li>For each item, specify:
                <ul>
                  <li>Item name</li>
                  <li>Current quantity</li>
                  <li>Unit of measurement (kg, liters, pieces, etc.)</li>
                  <li>Low stock threshold (when to receive alerts)</li>
                  <li>Supplier information (optional)</li>
                  <li>Cost per unit (for profit calculations)</li>
                </ul>
              </li>
              <li>Set up expiration date tracking for perishables</li>
            </ul>

            <h2>Step 5: Add Staff Members (5 minutes)</h2>
            <p>Invite your team to the platform:</p>
            <ul>
              <li>Go to Staff Management</li>
              <li>Click "Add Staff Member"</li>
              <li>Enter their email address and assign a role:
                <ul>
                  <li><strong>Manager</strong> - Full access to operations, reports, and staff management</li>
                  <li><strong>Cashier</strong> - Order processing, payments, and basic reports</li>
                  <li><strong>Kitchen Staff</strong> - View orders, update preparation status</li>
                </ul>
              </li>
              <li>They'll receive an email invitation to create their password</li>
              <li>Conduct a brief training session for each role</li>
            </ul>

            <h2>Step 6: Process Your First Order (2 minutes)</h2>
            <p>You're ready to start operations:</p>
            <ul>
              <li>Go to Orders from the sidebar or use the Cashier Dashboard</li>
              <li>Click "New Order"</li>
              <li>Select menu items and quantities</li>
              <li>Apply any discounts if applicable</li>
              <li>Choose payment method (cash, card, UPI, etc.)</li>
              <li>Complete the order and print/send receipt</li>
              <li>Monitor the order status as it moves through preparation</li>
            </ul>

            <h2>What's Next?</h2>
            <p>Now that you're operational, explore these features to optimize your canteen:</p>
            <ul>
              <li><span className="link" onClick={() => setActiveSection('analytics')}>Set up reports</span> to track your daily performance</li>
              <li><span className="link" onClick={() => setActiveSection('discounts')}>Create discounts</span> for promotions and special offers</li>
              <li><span className="link" onClick={() => setActiveSection('payments')}>Configure payment methods</span> you accept</li>
              <li>Review the <span className="link" onClick={() => setActiveSection('dashboard')}>dashboard features</span> for daily monitoring</li>
            </ul>

            <p><strong>Need help?</strong> Our support team is ready to assist you. <span className="link" onClick={() => setActiveSection('contact')}>Contact us</span> anytime!</p>
          </>
        );

      case 'account-setup':
        return (
          <>
            <header>
              <h1>Account Setup</h1>
            </header>
            <p>Properly configuring your account ensures smooth operations and accurate reporting. This guide covers all account settings and customization options.</p>

            <h2>Profile Settings</h2>
            <p>Your personal profile information:</p>
            <ul>
              <li><strong>Full Name</strong> - Your name as displayed in the system</li>
              <li><strong>Email Address</strong> - Used for login and notifications (verified during signup)</li>
              <li><strong>Phone Number</strong> - For account recovery and optional SMS notifications</li>
              <li><strong>Profile Picture</strong> - Helps team members identify accounts</li>
              <li><strong>Password</strong> - Change periodically for security (minimum 8 characters)</li>
              <li><strong>Two-Factor Authentication</strong> - Add extra security with SMS or authenticator app</li>
            </ul>

            <h2>Business Information</h2>
            <p>Configure your canteen's details:</p>
            <ul>
              <li><strong>Canteen Name</strong> - Displayed on receipts, reports, and customer-facing pages</li>
              <li><strong>Business Address</strong> - Full address including city, state, and postal code</li>
              <li><strong>Contact Numbers</strong> - Primary and secondary phone numbers</li>
              <li><strong>Email Address</strong> - Business email for customer communications</li>
              <li><strong>Website/Social Media</strong> - Links displayed on receipts (optional)</li>
              <li><strong>Business Registration</strong> - Tax ID, GST number, or other registration details</li>
              <li><strong>Logo</strong> - Upload your canteen logo (recommended size: 200x200 pixels)</li>
            </ul>

            <h2>Operating Hours</h2>
            <p>Set your service hours for each day:</p>
            <ul>
              <li>Configure opening and closing times for each day of the week</li>
              <li>Set different hours for different services (breakfast, lunch, dinner)</li>
              <li>Mark holidays and special closures in advance</li>
              <li>Enable/disable ordering outside operating hours</li>
              <li>Set preparation cutoff times for advance orders</li>
            </ul>

            <h2>Regional Settings</h2>
            <p>Localize the platform for your region:</p>
            <ul>
              <li><strong>Currency</strong> - Select your local currency (INR, USD, EUR, etc.)</li>
              <li><strong>Date Format</strong> - DD/MM/YYYY or MM/DD/YYYY</li>
              <li><strong>Time Format</strong> - 12-hour or 24-hour</li>
              <li><strong>Timezone</strong> - Ensures accurate timestamps on all records</li>
              <li><strong>Language</strong> - Interface language preference</li>
              <li><strong>First Day of Week</strong> - Sunday or Monday (affects weekly reports)</li>
            </ul>

            <h2>Tax Configuration</h2>
            <p>Set up tax calculations:</p>
            <ul>
              <li>Enable/disable tax on orders</li>
              <li>Configure tax percentage (GST, VAT, sales tax)</li>
              <li>Set up multiple tax rates if needed (e.g., different rates for food vs. beverages)</li>
              <li>Choose whether prices are inclusive or exclusive of tax</li>
              <li>Configure tax display on receipts</li>
              <li>Set up tax exemptions for specific items or customer types</li>
            </ul>

            <h2>Receipt Customization</h2>
            <p>Customize how receipts appear:</p>
            <ul>
              <li>Add custom header message (e.g., "Welcome to [Canteen Name]!")</li>
              <li>Add footer message (e.g., "Thank you for dining with us!")</li>
              <li>Include/exclude specific fields (order number, date, time, server name)</li>
              <li>Add promotional messages or upcoming offers</li>
              <li>Configure receipt format (thermal printer, A4, digital)</li>
              <li>Set up automatic email receipts for customers</li>
            </ul>

            <h2>Notification Preferences</h2>
            <p>Control how you receive alerts:</p>
            <ul>
              <li><strong>Email Notifications</strong> - Daily summaries, low stock alerts, large orders</li>
              <li><strong>In-App Notifications</strong> - Real-time alerts within the dashboard</li>
              <li><strong>SMS Alerts</strong> - Critical notifications like payment issues (if enabled)</li>
              <li>Set quiet hours when notifications are muted</li>
              <li>Choose notification frequency (immediate, hourly digest, daily summary)</li>
            </ul>

            <h2>Security Settings</h2>
            <p>Protect your account and data:</p>
            <ul>
              <li>Enable two-factor authentication (highly recommended)</li>
              <li>Review active sessions and sign out from unused devices</li>
              <li>Set session timeout duration</li>
              <li>Configure IP restrictions (enterprise feature)</li>
              <li>Review login history for suspicious activity</li>
              <li>Set up account recovery options</li>
            </ul>

            <h2>Data Management</h2>
            <p>Control your canteen data:</p>
            <ul>
              <li>Export data in various formats (CSV, Excel, PDF)</li>
              <li>Configure automatic backups</li>
              <li>Set data retention policies</li>
              <li>Download complete data archive</li>
              <li>Transfer ownership (for business changes)</li>
            </ul>
          </>
        );

      case 'dashboard':
        return (
          <>
            <header>
              <h1>Dashboard Overview</h1>
            </header>
            <p>The dashboard is your command center for monitoring all canteen activities at a glance. It provides real-time insights, quick actions, and alerts to help you stay on top of your operations throughout the day.</p>

            <h2>Dashboard Layout</h2>
            <p>The dashboard is organized into several key sections:</p>
            <ul>
              <li><strong>Top Navigation</strong> - Quick access to notifications, settings, and your profile</li>
              <li><strong>Key Metrics Cards</strong> - At-a-glance view of important numbers</li>
              <li><strong>Charts and Graphs</strong> - Visual representation of trends and patterns</li>
              <li><strong>Quick Actions</strong> - Buttons for common tasks</li>
              <li><strong>Recent Activity</strong> - Latest orders, activities, and alerts</li>
              <li><strong>Alerts Panel</strong> - Low stock warnings, expiring items, pending tasks</li>
            </ul>

            <h2>Key Metrics</h2>
            <p>The metrics cards display crucial information updated in real-time:</p>
            <ul>
              <li><strong>Today's Revenue</strong> - Total sales amount for the current day, with comparison to yesterday and same day last week. Click to see hourly breakdown.</li>
              <li><strong>Total Orders</strong> - Number of orders processed today, categorized by status (completed, pending, cancelled). Shows average order value.</li>
              <li><strong>Popular Items</strong> - Top 5 best-selling items today with quantities. Helps you anticipate demand and manage inventory.</li>
              <li><strong>Active Staff</strong> - Currently logged-in staff members and their roles. Shows their current activity status.</li>
              <li><strong>Low Stock Items</strong> - Count of inventory items below threshold. Click to view full list and reorder.</li>
              <li><strong>Pending Payments</strong> - Unpaid orders or delayed payments requiring attention.</li>
            </ul>

            <h2>Analytics Charts</h2>
            <p>Visual insights to understand your business:</p>
            <ul>
              <li><strong>Sales Trend</strong> - Line chart showing sales over the past 7 days, 30 days, or custom period</li>
              <li><strong>Order Distribution</strong> - Pie chart breaking down orders by type (dine-in, takeaway, delivery)</li>
              <li><strong>Peak Hours</strong> - Bar chart showing busiest times of day, helping with staff scheduling</li>
              <li><strong>Category Performance</strong> - Revenue breakdown by menu category</li>
              <li><strong>Payment Methods</strong> - Distribution of cash, card, UPI, and other payment types</li>
            </ul>

            <h2>Quick Actions</h2>
            <p>Access common tasks directly from the dashboard with one click:</p>
            <ul>
              <li><strong>New Order</strong> - Open the order creation screen</li>
              <li><strong>Update Menu</strong> - Quickly toggle item availability</li>
              <li><strong>Add Inventory</strong> - Record incoming stock</li>
              <li><strong>View Reports</strong> - Access the reports section</li>
              <li><strong>Process Payment</strong> - Handle pending payments</li>
              <li><strong>Send Notification</strong> - Broadcast message to staff</li>
            </ul>

            <h2>Recent Activity Feed</h2>
            <p>Stay informed with a chronological list of recent events:</p>
            <ul>
              <li>New orders placed with customer details and items</li>
              <li>Order status changes (preparing, ready, completed)</li>
              <li>Payments received with method and amount</li>
              <li>Menu updates (price changes, availability)</li>
              <li>Inventory adjustments (stock in, stock out, wastage)</li>
              <li>Staff login/logout activities</li>
              <li>System alerts and notifications</li>
            </ul>

            <h2>Alerts and Notifications</h2>
            <p>Critical items requiring your attention:</p>
            <ul>
              <li><strong>Low Stock Alerts</strong> - Items below minimum threshold with reorder suggestions</li>
              <li><strong>Expiring Items</strong> - Inventory approaching expiration dates</li>
              <li><strong>Pending Orders</strong> - Orders waiting longer than expected</li>
              <li><strong>Failed Payments</strong> - Transactions that need resolution</li>
              <li><strong>Staff Alerts</strong> - Clock-in reminders, overtime warnings</li>
              <li><strong>System Updates</strong> - New features, maintenance windows</li>
            </ul>

            <h2>Customizing Your Dashboard</h2>
            <p>Personalize the dashboard to show what matters most:</p>
            <ul>
              <li>Rearrange widgets by dragging and dropping</li>
              <li>Show/hide specific metrics cards</li>
              <li>Set default date ranges for charts</li>
              <li>Configure refresh intervals</li>
              <li>Save multiple dashboard layouts for different purposes</li>
              <li>Set up dashboard as your browser homepage</li>
            </ul>

            <h2>Role-Based Dashboards</h2>
            <p>Different users see relevant information for their role:</p>
            <ul>
              <li><strong>Admin/Owner</strong> - Full dashboard with all metrics, financial data, and staff performance</li>
              <li><strong>Manager</strong> - Operational metrics, inventory alerts, staff activities</li>
              <li><strong>Cashier</strong> - Order queue, payment summary, quick order creation</li>
              <li><strong>Kitchen Staff</strong> - Pending orders, preparation queue, item availability</li>
            </ul>
          </>
        );

      case 'menu-management':
        return (
          <>
            <header>
              <h1>Menu Management</h1>
            </header>
            <p>The Menu Management module is the heart of your canteen operations. Here you'll create, organize, and maintain all the items you offer to customers. A well-structured menu ensures smooth ordering, accurate reporting, and better customer experience.</p>

            <h2>Understanding Menu Structure</h2>
            <p>CanteenDelight organizes your menu hierarchically:</p>
            <ul>
              <li><strong>Categories</strong> - Top-level groupings (Breakfast, Lunch, Snacks, Beverages, Desserts)</li>
              <li><strong>Items</strong> - Individual products within categories</li>
              <li><strong>Variants</strong> - Size or type options for an item (Small/Medium/Large)</li>
              <li><strong>Add-ons</strong> - Optional extras customers can add (Extra cheese, toppings)</li>
            </ul>

            <h2>Adding Menu Items</h2>
            <p>Create comprehensive menu items with all necessary details:</p>

            <h3>Basic Information</h3>
            <ul>
              <li><strong>Item Name</strong> - Clear, descriptive name (e.g., "Grilled Chicken Sandwich")</li>
              <li><strong>Short Code</strong> - Quick identifier for POS entry (e.g., "GCS")</li>
              <li><strong>Description</strong> - Appetizing description with key ingredients and preparation method</li>
              <li><strong>Category</strong> - Select the appropriate category for organization</li>
            </ul>

            <h3>Pricing</h3>
            <ul>
              <li><strong>Base Price</strong> - Standard selling price</li>
              <li><strong>Cost Price</strong> - Your cost to prepare (for profit calculations)</li>
              <li><strong>Tax Rate</strong> - Applicable tax percentage (or use default)</li>
              <li><strong>Variant Prices</strong> - Different prices for different sizes/options</li>
            </ul>

            <h3>Media</h3>
            <ul>
              <li><strong>Primary Image</strong> - High-quality photo of the item (recommended 800x600 pixels)</li>
              <li><strong>Gallery</strong> - Additional images showing different angles or variants</li>
              <li>Images should be well-lit, appetizing, and accurately represent the item</li>
            </ul>

            <h3>Availability Settings</h3>
            <ul>
              <li><strong>Available Status</strong> - Toggle on/off based on current availability</li>
              <li><strong>Time-based Availability</strong> - Available only during specific hours (e.g., breakfast items until 11 AM)</li>
              <li><strong>Day-based Availability</strong> - Available only on certain days (e.g., weekend specials)</li>
              <li><strong>Stock-based</strong> - Automatically mark unavailable when linked inventory is depleted</li>
            </ul>

            <h3>Additional Details</h3>
            <ul>
              <li><strong>Preparation Time</strong> - Estimated time to prepare (helps manage customer expectations)</li>
              <li><strong>Dietary Tags</strong> - Vegetarian, Vegan, Gluten-free, Dairy-free, Nut-free, Halal, Kosher</li>
              <li><strong>Allergen Information</strong> - Contains nuts, dairy, gluten, shellfish, etc.</li>
              <li><strong>Nutritional Info</strong> - Calories, protein, carbs, fat (optional)</li>
              <li><strong>Spice Level</strong> - Mild, Medium, Hot, Extra Hot</li>
              <li><strong>Serving Size</strong> - Portion description (e.g., "Serves 1", "350ml")</li>
            </ul>

            <h2>Managing Categories</h2>
            <p>Organize your menu logically for easy navigation:</p>
            <ul>
              <li>Create custom categories that match your menu structure</li>
              <li>Set display order to control how categories appear</li>
              <li>Assign category colors for quick visual identification</li>
              <li>Add category images for customer-facing menus</li>
              <li>Set category-level availability (e.g., disable entire breakfast category after 11 AM)</li>
              <li>Suggested categories: Breakfast, Lunch, Dinner, Snacks, Beverages, Desserts, Combos, Specials</li>
            </ul>

            <h2>Variants and Modifiers</h2>
            <p>Handle item variations without creating duplicate entries:</p>

            <h3>Size Variants</h3>
            <ul>
              <li>Small, Medium, Large, Extra Large</li>
              <li>Each variant can have different prices</li>
              <li>Set default variant for quick ordering</li>
            </ul>

            <h3>Add-ons and Extras</h3>
            <ul>
              <li>Create optional add-ons (extra cheese, bacon, avocado)</li>
              <li>Set add-on prices</li>
              <li>Limit number of add-ons if needed</li>
              <li>Group add-ons by type</li>
            </ul>

            <h3>Customizations</h3>
            <ul>
              <li>Allow special instructions</li>
              <li>Required choices (e.g., bread type for sandwich)</li>
              <li>Multiple selection options</li>
            </ul>

            <h2>Bulk Operations</h2>
            <p>Save time by updating multiple items at once:</p>
            <ul>
              <li><strong>Bulk Price Update</strong> - Increase/decrease prices by percentage or fixed amount</li>
              <li><strong>Bulk Availability</strong> - Toggle availability for multiple items</li>
              <li><strong>Bulk Category Change</strong> - Move items between categories</li>
              <li><strong>Bulk Delete</strong> - Remove multiple items (with confirmation)</li>
              <li><strong>Import from CSV</strong> - Add many items from a spreadsheet</li>
              <li><strong>Export Menu</strong> - Download your full menu for backup or analysis</li>
            </ul>

            <h2>Menu Analytics</h2>
            <p>Understand how your menu performs:</p>
            <ul>
              <li>View sales by item (quantity and revenue)</li>
              <li>Identify top performers and underperformers</li>
              <li>Analyze profit margins by item</li>
              <li>Track price change impacts</li>
              <li>See item combinations frequently ordered together</li>
              <li>Monitor seasonal trends</li>
            </ul>

            <h2>Best Practices</h2>
            <ul>
              <li>Keep item names clear and consistent</li>
              <li>Use high-quality images that accurately represent items</li>
              <li>Update availability in real-time to avoid customer disappointment</li>
              <li>Review menu performance monthly and adjust offerings</li>
              <li>Consider seasonal items and limited-time offers</li>
              <li>Ensure accurate allergen and dietary information</li>
              <li>Price items strategically based on cost and demand</li>
            </ul>
          </>
        );

      case 'order-processing':
        return (
          <>
            <header>
              <h1>Order Processing</h1>
            </header>
            <p>Efficient order processing is critical to customer satisfaction and operational success. CanteenDelight provides a streamlined workflow from order placement to completion, ensuring accuracy and speed during peak hours.</p>

            <h2>Order Types</h2>
            <p>CanteenDelight supports multiple order types to match your service model:</p>
            <ul>
              <li><strong>Counter Orders</strong> - Customers order directly at the counter, ideal for quick-service canteens</li>
              <li><strong>Dine-in Orders</strong> - Table service with table number tracking and split bill support</li>
              <li><strong>Takeaway Orders</strong> - Pre-packaged orders for customers to take with them</li>
              <li><strong>Pre-orders</strong> - Orders placed in advance for a specific pickup time</li>
              <li><strong>Online Orders</strong> - Orders placed through your customer-facing portal</li>
            </ul>

            <h2>Creating a New Order</h2>
            <p>Step-by-step process for creating orders:</p>

            <h3>Step 1: Start New Order</h3>
            <ul>
              <li>Click "New Order" from dashboard or Orders page</li>
              <li>Select order type (counter, dine-in, takeaway)</li>
              <li>For dine-in, enter table number</li>
              <li>Add customer details if available (optional for counter orders)</li>
            </ul>

            <h3>Step 2: Add Items</h3>
            <ul>
              <li>Browse categories or use search to find items</li>
              <li>Click item to add to order</li>
              <li>Select variants if available (size, options)</li>
              <li>Add any extras or add-ons</li>
              <li>Adjust quantity using +/- buttons</li>
              <li>Add special instructions if needed</li>
              <li>Use item codes for faster entry (trained staff)</li>
            </ul>

            <h3>Step 3: Review Order</h3>
            <ul>
              <li>Verify all items and quantities</li>
              <li>Check subtotal and taxes</li>
              <li>Apply discounts if applicable</li>
              <li>Confirm total amount with customer</li>
            </ul>

            <h3>Step 4: Process Payment</h3>
            <ul>
              <li>Select payment method (Cash, Card, UPI, Wallet)</li>
              <li>For cash, enter amount received and calculate change</li>
              <li>For digital payments, wait for confirmation</li>
              <li>Split payment across multiple methods if needed</li>
            </ul>

            <h3>Step 5: Complete Order</h3>
            <ul>
              <li>Confirm payment received</li>
              <li>Print receipt (or send digital receipt)</li>
              <li>Give token number to customer</li>
              <li>Order is automatically sent to kitchen display</li>
            </ul>

            <h2>Order Status Workflow</h2>
            <p>Orders progress through defined statuses:</p>
            <ul>
              <li><strong>Pending</strong> - Order placed, waiting for kitchen acknowledgment</li>
              <li><strong>Confirmed</strong> - Kitchen has received and accepted the order</li>
              <li><strong>Preparing</strong> - Kitchen is actively preparing the order</li>
              <li><strong>Ready</strong> - Order is complete and ready for pickup/serving</li>
              <li><strong>Completed</strong> - Order delivered to customer</li>
              <li><strong>Cancelled</strong> - Order cancelled (with reason logged)</li>
            </ul>

            <h2>Order Queue Management</h2>
            <p>Manage multiple orders efficiently:</p>
            <ul>
              <li>View all active orders in a queue or grid view</li>
              <li>Filter by status, order type, or time</li>
              <li>Sort by oldest first to ensure FIFO processing</li>
              <li>Color-coded status indicators for quick scanning</li>
              <li>Time elapsed indicators to spot delayed orders</li>
              <li>Priority flagging for urgent orders</li>
            </ul>

            <h2>Kitchen Display System (KDS)</h2>
            <p>Paperless order management for kitchen staff:</p>
            <ul>
              <li>Orders appear automatically on kitchen screens</li>
              <li>Large, clear display of items and quantities</li>
              <li>Special instructions highlighted</li>
              <li>One-touch status updates (start, complete)</li>
              <li>Timer shows how long order has been in progress</li>
              <li>Bump orders when complete</li>
              <li>Recall completed orders if needed</li>
            </ul>

            <h2>Modifying Orders</h2>
            <p>Handle changes to existing orders:</p>
            <ul>
              <li><strong>Add Items</strong> - Add more items to pending/preparing orders</li>
              <li><strong>Remove Items</strong> - Remove items before preparation starts</li>
              <li><strong>Modify Quantities</strong> - Increase or decrease item counts</li>
              <li><strong>Change Variants</strong> - Switch size or options</li>
              <li><strong>Update Instructions</strong> - Add or modify special requests</li>
              <li>All modifications are logged for accountability</li>
            </ul>

            <h2>Cancelling Orders</h2>
            <p>Process when an order needs to be cancelled:</p>
            <ul>
              <li>Select order and click "Cancel Order"</li>
              <li>Choose cancellation reason (customer request, out of stock, etc.)</li>
              <li>Specify refund method if payment was made</li>
              <li>Notification sent to kitchen if preparation started</li>
              <li>Cancellation logged with timestamp and user</li>
              <li>Inventory is restored if items were reserved</li>
            </ul>

            <h2>Handling Special Requests</h2>
            <p>Accommodate customer preferences:</p>
            <ul>
              <li>Free-text special instructions field</li>
              <li>Common modifications as quick buttons</li>
              <li>Allergy warnings prominently displayed</li>
              <li>Dietary requirement filters</li>
              <li>Kitchen receives all notes clearly</li>
            </ul>

            <h2>Order Notifications</h2>
            <p>Keep everyone informed:</p>
            <ul>
              <li><strong>Kitchen alerts</strong> - New order notification with sound</li>
              <li><strong>Customer notification</strong> - SMS/email when order is ready (if enabled)</li>
              <li><strong>Delay alerts</strong> - Notification if order exceeds expected time</li>
              <li><strong>Cashier alerts</strong> - Payment and pickup notifications</li>
            </ul>

            <h2>Order History</h2>
            <p>Access past orders for reference:</p>
            <ul>
              <li>Search orders by number, customer, date, or item</li>
              <li>View complete order details and timeline</li>
              <li>Reorder functionality for repeat customers</li>
              <li>Print duplicate receipts</li>
              <li>Export order data for analysis</li>
            </ul>

            <h2>Best Practices for Efficient Order Processing</h2>
            <ul>
              <li>Train staff thoroughly on the POS system</li>
              <li>Use keyboard shortcuts for common actions</li>
              <li>Keep popular items accessible in quick-select</li>
              <li>Monitor queue length during peak hours</li>
              <li>Clear completed orders promptly from displays</li>
              <li>Review cancelled orders to identify patterns</li>
              <li>Set realistic preparation times</li>
            </ul>
          </>
        );

      case 'inventory':
        return (
          <>
            <header>
              <h1>Inventory Tracking</h1>
            </header>
            <p>Effective inventory management is crucial for controlling costs, reducing waste, and ensuring you never run out of popular items. CanteenDelight provides comprehensive tools to track, manage, and optimize your inventory.</p>

            <h2>Inventory Overview</h2>
            <p>The inventory dashboard shows:</p>
            <ul>
              <li>Total inventory value at cost</li>
              <li>Number of items tracked</li>
              <li>Low stock alerts count</li>
              <li>Expiring soon items</li>
              <li>Recent stock movements</li>
              <li>Top consumed items this week</li>
            </ul>

            <h2>Adding Inventory Items</h2>
            <p>Create detailed records for each inventory item:</p>

            <h3>Basic Information</h3>
            <ul>
              <li><strong>Item Name</strong> - Clear, searchable name (e.g., "Chicken Breast - Boneless")</li>
              <li><strong>SKU/Code</strong> - Unique identifier for tracking</li>
              <li><strong>Category</strong> - Group by type (Proteins, Vegetables, Dairy, Dry Goods, Beverages, Packaging)</li>
              <li><strong>Description</strong> - Additional details, specifications</li>
            </ul>

            <h3>Stock Details</h3>
            <ul>
              <li><strong>Current Quantity</strong> - Amount currently in stock</li>
              <li><strong>Unit of Measurement</strong> - kg, g, L, mL, pieces, packets, boxes, etc.</li>
              <li><strong>Minimum Stock Level</strong> - Threshold for low stock alerts</li>
              <li><strong>Maximum Stock Level</strong> - Upper limit to prevent over-ordering</li>
              <li><strong>Reorder Quantity</strong> - Suggested amount to order when low</li>
            </ul>

            <h3>Cost Information</h3>
            <ul>
              <li><strong>Purchase Price</strong> - Cost per unit from supplier</li>
              <li><strong>Last Purchase Date</strong> - When you last bought this item</li>
              <li><strong>Price History</strong> - Track price changes over time</li>
            </ul>

            <h3>Supplier Details</h3>
            <ul>
              <li><strong>Primary Supplier</strong> - Link to supplier record</li>
              <li><strong>Alternative Suppliers</strong> - Backup options</li>
              <li><strong>Lead Time</strong> - Days between order and delivery</li>
              <li><strong>Minimum Order Quantity</strong> - Supplier's minimum</li>
            </ul>

            <h3>Expiration Tracking</h3>
            <ul>
              <li><strong>Expiration Date</strong> - For perishable items</li>
              <li><strong>Shelf Life</strong> - Typical duration item stays fresh</li>
              <li><strong>Alert Days Before</strong> - When to receive expiration warning</li>
              <li><strong>Storage Instructions</strong> - Refrigerate, freeze, room temperature</li>
            </ul>

            <h2>Stock Movements</h2>
            <p>Track all inventory changes:</p>

            <h3>Stock In (Receiving)</h3>
            <ul>
              <li>Record incoming inventory from suppliers</li>
              <li>Enter quantity, unit cost, and expiration dates</li>
              <li>Link to purchase orders if created</li>
              <li>Note quality issues or discrepancies</li>
              <li>Update running stock automatically</li>
            </ul>

            <h3>Stock Out (Usage)</h3>
            <ul>
              <li><strong>Sales Consumption</strong> - Automatic deduction based on orders (if recipe configured)</li>
              <li><strong>Manual Consumption</strong> - Record usage not linked to orders</li>
              <li><strong>Wastage</strong> - Record spoilage, damage, or expired items with reasons</li>
              <li><strong>Transfer</strong> - Move stock between locations (if multi-location)</li>
            </ul>

            <h3>Stock Adjustments</h3>
            <ul>
              <li>Correct discrepancies found during stock takes</li>
              <li>Record reasons for adjustments</li>
              <li>Adjustment history maintained for auditing</li>
            </ul>

            <h2>Stock Takes (Physical Inventory)</h2>
            <p>Regularly verify physical stock against system:</p>
            <ul>
              <li>Schedule stock takes (daily, weekly, monthly)</li>
              <li>Generate stock take sheets</li>
              <li>Enter actual counts</li>
              <li>System calculates variances automatically</li>
              <li>Review and approve adjustments</li>
              <li>Identify shrinkage patterns</li>
            </ul>

            <h2>Low Stock Management</h2>
            <p>Never run out of essential items:</p>
            <ul>
              <li><strong>Automatic Alerts</strong> - Notification when stock falls below minimum</li>
              <li><strong>Alert Dashboard</strong> - View all low stock items in one place</li>
              <li><strong>Quick Reorder</strong> - Generate purchase order with suggested quantities</li>
              <li><strong>Supplier Auto-notify</strong> - Send reorder requests to suppliers (if configured)</li>
              <li><strong>Menu Impact</strong> - See which menu items are affected by low stock</li>
            </ul>

            <h2>Expiration Management</h2>
            <p>Minimize waste from expired items:</p>
            <ul>
              <li>View items expiring in next 7 days</li>
              <li>FIFO (First In, First Out) tracking</li>
              <li>Receive advance alerts based on your settings</li>
              <li>Create discounts on expiring items to promote sales</li>
              <li>Record expired items as wastage</li>
              <li>Analyze expiration patterns to adjust ordering</li>
            </ul>

            <h2>Recipe Management</h2>
            <p>Link menu items to inventory for automatic tracking:</p>
            <ul>
              <li>Create recipes with ingredient quantities</li>
              <li>When order is placed, ingredients are reserved/deducted</li>
              <li>Calculate accurate food costs</li>
              <li>Auto-detect when you can't fulfill orders due to stock</li>
              <li>Plan production based on ingredient availability</li>
            </ul>

            <h2>Inventory Reports</h2>
            <p>Gain insights into your inventory:</p>
            <ul>
              <li><strong>Stock Value Report</strong> - Total inventory value by category</li>
              <li><strong>Movement Report</strong> - All stock ins/outs for a period</li>
              <li><strong>Consumption Report</strong> - Usage patterns and trends</li>
              <li><strong>Wastage Report</strong> - Losses by reason and category</li>
              <li><strong>Variance Report</strong> - Differences between system and physical counts</li>
              <li><strong>Reorder Report</strong> - Items needing replenishment</li>
              <li><strong>Supplier Report</strong> - Purchase history by supplier</li>
            </ul>

            <h2>Best Practices</h2>
            <ul>
              <li>Conduct regular stock takes (at least weekly for perishables)</li>
              <li>Set realistic minimum stock levels based on lead times and sales velocity</li>
              <li>Use FIFO method for all perishables</li>
              <li>Record wastage immediately with accurate reasons</li>
              <li>Review consumption reports to optimize ordering</li>
              <li>Train all staff on proper inventory handling</li>
              <li>Keep storage areas organized and labeled</li>
              <li>Build relationships with reliable suppliers</li>
              <li>Monitor price trends and negotiate better rates</li>
            </ul>
          </>
        );

      case 'analytics':
        return (
          <>
            <header>
              <h1>Analytics & Reports</h1>
            </header>
            <p>Data-driven decisions lead to better business outcomes. CanteenDelight's analytics and reporting tools provide comprehensive insights into every aspect of your canteen operations, from sales performance to staff productivity.</p>

            <h2>Analytics Dashboard</h2>
            <p>Your data at a glance with interactive visualizations:</p>
            <ul>
              <li>Customizable date ranges (today, this week, this month, custom)</li>
              <li>Compare periods (this week vs. last week)</li>
              <li>Drill-down capability on all charts</li>
              <li>Export charts as images for presentations</li>
              <li>Scheduled report delivery via email</li>
            </ul>

            <h2>Sales Reports</h2>
            <p>Understand your revenue and sales patterns:</p>

            <h3>Daily Sales Report</h3>
            <ul>
              <li>Total revenue with tax breakdown</li>
              <li>Number of transactions</li>
              <li>Average order value</li>
              <li>Hourly sales breakdown</li>
              <li>Comparison with previous days</li>
              <li>Peak hour identification</li>
            </ul>

            <h3>Weekly/Monthly Sales</h3>
            <ul>
              <li>Revenue trends over time</li>
              <li>Day-of-week patterns (busiest/slowest days)</li>
              <li>Growth rate calculations</li>
              <li>Target achievement tracking</li>
            </ul>

            <h3>Sales by Category</h3>
            <ul>
              <li>Revenue breakdown by menu category</li>
              <li>Category contribution percentages</li>
              <li>Category growth trends</li>
              <li>Identify underperforming categories</li>
            </ul>

            <h3>Sales by Item</h3>
            <ul>
              <li>Top selling items by quantity and revenue</li>
              <li>Bottom performers to consider removing</li>
              <li>Item profit margins</li>
              <li>Sales velocity (units per day)</li>
            </ul>

            <h2>Order Analytics</h2>
            <p>Deep dive into order patterns:</p>
            <ul>
              <li><strong>Order Volume</strong> - Orders per hour, day, week</li>
              <li><strong>Order Type Distribution</strong> - Dine-in vs. takeaway vs. online</li>
              <li><strong>Average Basket Size</strong> - Items per order trends</li>
              <li><strong>Order Completion Time</strong> - From placed to completed</li>
              <li><strong>Cancellation Rate</strong> - Cancelled orders with reasons</li>
              <li><strong>Peak Time Analysis</strong> - Busiest periods for staffing</li>
              <li><strong>Customer Wait Time</strong> - Average time in queue</li>
            </ul>

            <h2>Inventory Reports</h2>
            <p>Control costs and reduce waste:</p>
            <ul>
              <li><strong>Stock Valuation</strong> - Total inventory value at cost</li>
              <li><strong>Stock Turnover</strong> - How quickly inventory sells</li>
              <li><strong>Dead Stock</strong> - Items not moving</li>
              <li><strong>Consumption Analysis</strong> - Usage patterns by item</li>
              <li><strong>Wastage Report</strong> - Losses with breakdown by reason</li>
              <li><strong>Cost of Goods Sold (COGS)</strong> - Direct costs for sold items</li>
              <li><strong>Gross Profit Margin</strong> - Revenue minus COGS</li>
            </ul>

            <h2>Financial Reports</h2>
            <p>Track your financial health:</p>
            <ul>
              <li><strong>Revenue Report</strong> - All income sources</li>
              <li><strong>Payment Method Analysis</strong> - Cash, card, UPI breakdowns</li>
              <li><strong>Discount Summary</strong> - Total discounts given and impact</li>
              <li><strong>Tax Report</strong> - Collected taxes for filing</li>
              <li><strong>Refund Report</strong> - All refunds processed</li>
              <li><strong>Cash Flow</strong> - Daily cash in/out tracking</li>
              <li><strong>Profit & Loss Summary</strong> - Revenue minus all costs</li>
            </ul>

            <h2>Staff Performance</h2>
            <p>Evaluate team productivity:</p>
            <ul>
              <li><strong>Orders Processed</strong> - By staff member</li>
              <li><strong>Sales Generated</strong> - Revenue by cashier</li>
              <li><strong>Average Transaction Value</strong> - Per staff comparison</li>
              <li><strong>Speed Metrics</strong> - Order processing time</li>
              <li><strong>Attendance</strong> - Hours worked, punctuality</li>
              <li><strong>Error Rate</strong> - Voids, corrections, cancellations</li>
              <li><strong>Upselling Performance</strong> - Add-ons sold per order</li>
            </ul>

            <h2>Customer Insights</h2>
            <p>Understand your customers better:</p>
            <ul>
              <li><strong>Customer Count</strong> - Unique vs. repeat customers</li>
              <li><strong>Order Frequency</strong> - How often customers return</li>
              <li><strong>Customer Lifetime Value</strong> - Total revenue per customer</li>
              <li><strong>Popular Items</strong> - Most ordered by customers</li>
              <li><strong>Feedback Scores</strong> - Average ratings and trends</li>
              <li><strong>Preferred Payment Methods</strong> - By customer segment</li>
            </ul>

            <h2>Custom Reports</h2>
            <p>Build reports for your specific needs:</p>
            <ul>
              <li>Select metrics and dimensions</li>
              <li>Apply filters (date, category, staff, etc.)</li>
              <li>Choose visualization type (table, chart)</li>
              <li>Save report templates for reuse</li>
              <li>Schedule automatic generation and delivery</li>
            </ul>

            <h2>Export Options</h2>
            <p>Take your data where you need it:</p>
            <ul>
              <li><strong>PDF</strong> - Formatted reports for printing or sharing</li>
              <li><strong>Excel/CSV</strong> - Raw data for further analysis</li>
              <li><strong>Email</strong> - Scheduled delivery to stakeholders</li>
              <li><strong>Print</strong> - Direct printing for physical records</li>
            </ul>

            <h2>Scheduled Reports</h2>
            <p>Automate report delivery:</p>
            <ul>
              <li>Daily sales summary sent every evening</li>
              <li>Weekly performance review on Mondays</li>
              <li>Monthly financial reports on the 1st</li>
              <li>Low stock alerts in real-time</li>
              <li>Multiple recipients support</li>
            </ul>

            <h2>Best Practices</h2>
            <ul>
              <li>Review daily sales report before closing</li>
              <li>Analyze weekly trends to spot issues early</li>
              <li>Compare periods to understand growth</li>
              <li>Use insights to adjust menu pricing</li>
              <li>Share relevant reports with your team</li>
              <li>Set up alerts for anomalies</li>
              <li>Make decisions based on data, not gut feel</li>
            </ul>
          </>
        );

      case 'staff':
        return (
          <>
            <header>
              <h1>Staff Management</h1>
            </header>
            <p>Your team is the backbone of your canteen operations. CanteenDelight's staff management features help you onboard team members, assign appropriate roles, track performance, and ensure smooth coordination across all shifts.</p>

            <h2>User Roles and Permissions</h2>
            <p>CanteenDelight uses role-based access control to ensure staff members only see what they need:</p>

            <h3>Admin (Owner)</h3>
            <ul>
              <li>Full access to all features and settings</li>
              <li>Manage staff accounts and roles</li>
              <li>View all financial data and reports</li>
              <li>Configure system settings</li>
              <li>Access audit logs</li>
              <li>Delete data and accounts</li>
            </ul>

            <h3>Manager</h3>
            <ul>
              <li>Access to operational management</li>
              <li>View and manage orders, menu, inventory</li>
              <li>View reports and analytics</li>
              <li>Manage discounts and promotions</li>
              <li>Cannot access system settings or staff management</li>
            </ul>

            <h3>Cashier</h3>
            <ul>
              <li>Create and process orders</li>
              <li>Handle payments and refunds</li>
              <li>View their own sales summary</li>
              <li>Limited menu visibility (availability only)</li>
              <li>Cannot access reports or settings</li>
            </ul>

            <h3>Kitchen Staff</h3>
            <ul>
              <li>View order queue (Kitchen Display System)</li>
              <li>Update order status (preparing, ready)</li>
              <li>View menu items and recipes</li>
              <li>Mark items as unavailable</li>
              <li>No access to payments or reports</li>
            </ul>

            <h2>Adding Staff Members</h2>
            <p>Onboard new team members:</p>
            <ul>
              <li>Navigate to Staff Management</li>
              <li>Click "Add Staff Member"</li>
              <li>Enter their details:
                <ul>
                  <li>Full name</li>
                  <li>Email address (for login)</li>
                  <li>Phone number</li>
                  <li>Role selection</li>
                  <li>Employment details (start date, type)</li>
                </ul>
              </li>
              <li>They receive an email invitation to set up their password</li>
              <li>Guide them through initial training for their role</li>
            </ul>

            <h2>Staff Profile Management</h2>
            <p>Maintain complete staff records:</p>
            <ul>
              <li><strong>Personal Information</strong> - Name, contact details, address, emergency contact</li>
              <li><strong>Employment Details</strong> - Start date, contract type, hourly rate/salary</li>
              <li><strong>Role and Permissions</strong> - Current role assignment</li>
              <li><strong>Documents</strong> - Store ID copies, contracts (optional)</li>
              <li><strong>Status</strong> - Active, on leave, terminated</li>
            </ul>

            <h2>Activity Tracking</h2>
            <p>Monitor staff actions for accountability:</p>
            <ul>
              <li>Login/logout times</li>
              <li>Orders created and processed</li>
              <li>Payments handled</li>
              <li>Menu or inventory changes made</li>
              <li>Voids, cancellations, and refunds</li>
              <li>All activities timestamped and logged</li>
            </ul>

            <h2>Performance Metrics</h2>
            <p>Evaluate staff productivity objectively:</p>
            <ul>
              <li><strong>Orders Processed</strong> - Total orders handled</li>
              <li><strong>Sales Generated</strong> - Revenue attributed to staff</li>
              <li><strong>Average Order Value</strong> - Upselling effectiveness</li>
              <li><strong>Order Speed</strong> - Average time to complete orders</li>
              <li><strong>Accuracy</strong> - Error rate (voids, mistakes)</li>
              <li><strong>Customer Ratings</strong> - If feedback includes staff</li>
              <li><strong>Attendance</strong> - Punctuality and hours worked</li>
            </ul>

            <h2>Access Control</h2>
            <p>Fine-tune permissions beyond basic roles:</p>
            <ul>
              <li>Grant/restrict specific features</li>
              <li>Set transaction limits (max refund amount)</li>
              <li>Require manager approval for certain actions</li>
              <li>Time-based access (only during shifts)</li>
              <li>Location-based restrictions (if multi-location)</li>
            </ul>

            <h2>Account Security</h2>
            <p>Keep staff accounts secure:</p>
            <ul>
              <li>Strong password requirements</li>
              <li>Automatic logout after inactivity</li>
              <li>Session management (view active sessions)</li>
              <li>Force password reset if compromised</li>
              <li>Two-factor authentication (optional)</li>
              <li>Login attempt monitoring</li>
            </ul>

            <h2>Deactivating Staff</h2>
            <p>When staff members leave:</p>
            <ul>
              <li>Deactivate account (maintains history for records)</li>
              <li>Transfer any pending tasks</li>
              <li>Revoke all access immediately</li>
              <li>Historical data preserved for reporting</li>
              <li>Can reactivate if they return</li>
            </ul>

            <h2>Communication</h2>
            <p>Keep your team informed:</p>
            <ul>
              <li>Send announcements to all staff</li>
              <li>Role-specific notifications</li>
              <li>Task assignments</li>
              <li>Shift reminders</li>
              <li>Policy updates</li>
            </ul>

            <h2>Best Practices</h2>
            <ul>
              <li>Assign minimum necessary permissions</li>
              <li>Regularly review access levels</li>
              <li>Train staff thoroughly on their modules</li>
              <li>Use performance data for constructive feedback</li>
              <li>Deactivate accounts promptly when staff leave</li>
              <li>Encourage staff to keep passwords secure</li>
              <li>Document processes for each role</li>
            </ul>
          </>
        );

      case 'discounts':
        return (
          <>
            <header>
              <h1>Discounts & Offers</h1>
            </header>
            <p>Strategic discounts can drive sales, move inventory, reward loyal customers, and attract new business. CanteenDelight provides flexible discount management tools to create, control, and track various promotional offers.</p>

            <h2>Types of Discounts</h2>
            <p>Create different discount types for various purposes:</p>

            <h3>Percentage Discount</h3>
            <ul>
              <li>Reduce price by a percentage (e.g., 10% off)</li>
              <li>Apply to entire order or specific items</li>
              <li>Set maximum discount amount cap</li>
              <li>Good for: General promotions, category sales</li>
            </ul>

            <h3>Fixed Amount Discount</h3>
            <ul>
              <li>Reduce price by fixed amount (e.g., ₹50 off)</li>
              <li>Can require minimum order value</li>
              <li>Good for: Specific price reductions, coupons</li>
            </ul>

            <h3>Buy One Get One (BOGO)</h3>
            <ul>
              <li>Free or discounted item with purchase</li>
              <li>Same item or different item</li>
              <li>Good for: Moving inventory, increasing order size</li>
            </ul>

            <h3>Combo/Bundle Deals</h3>
            <ul>
              <li>Special price for item combinations</li>
              <li>Preset bundles (meal deals)</li>
              <li>Good for: Increasing average order value, lunch combos</li>
            </ul>

            <h2>Creating a Discount</h2>
            <p>Set up a new discount offer:</p>

            <h3>Basic Details</h3>
            <ul>
              <li><strong>Discount Name</strong> - Internal reference (e.g., "Summer Special 20%")</li>
              <li><strong>Display Name</strong> - What customers see (e.g., "Summer Sale!")</li>
              <li><strong>Description</strong> - Terms and conditions</li>
              <li><strong>Discount Type</strong> - Percentage, fixed, BOGO</li>
              <li><strong>Value</strong> - Amount or percentage</li>
            </ul>

            <h3>Validity Period</h3>
            <ul>
              <li><strong>Start Date</strong> - When discount becomes active</li>
              <li><strong>End Date</strong> - When discount expires</li>
              <li><strong>Time Restrictions</strong> - Valid only during certain hours (e.g., happy hour)</li>
              <li><strong>Day Restrictions</strong> - Valid only on certain days (e.g., Weekend Special)</li>
            </ul>

            <h3>Applicability</h3>
            <ul>
              <li><strong>All Items</strong> - Applies to everything</li>
              <li><strong>Specific Categories</strong> - Only certain categories (e.g., all beverages)</li>
              <li><strong>Specific Items</strong> - Only selected items</li>
              <li><strong>Minimum Order Value</strong> - Required spending threshold</li>
              <li><strong>Minimum Quantity</strong> - Required number of items</li>
            </ul>

            <h3>Usage Limits</h3>
            <ul>
              <li><strong>Total Usage Limit</strong> - Maximum times discount can be used overall</li>
              <li><strong>Per Customer Limit</strong> - Maximum times one customer can use it</li>
              <li><strong>One-time Use Codes</strong> - Single use coupon codes</li>
            </ul>

            <h3>Coupon Codes</h3>
            <ul>
              <li>Generate unique coupon codes</li>
              <li>Single codes for mass distribution</li>
              <li>Unique codes for tracking (one per customer)</li>
              <li>Import bulk codes</li>
            </ul>

            <h2>Automatic Discounts</h2>
            <p>Discounts that apply without codes:</p>
            <ul>
              <li>Apply automatically when conditions met</li>
              <li>Show savings to customer at checkout</li>
              <li>Priority rules when multiple discounts qualify</li>
              <li>Stackable vs. non-stackable settings</li>
            </ul>

            <h2>Staff Discounts</h2>
            <p>Special pricing for employees:</p>
            <ul>
              <li>Automatic discount for staff accounts</li>
              <li>Percentage off all items</li>
              <li>Daily/monthly limits</li>
              <li>Track staff discount usage</li>
            </ul>

            <h2>Inventory-Based Discounts</h2>
            <p>Move aging or excess inventory:</p>
            <ul>
              <li>Discount items approaching expiration</li>
              <li>Reduce prices on overstocked items</li>
              <li>Auto-apply based on inventory rules</li>
              <li>End-of-day specials</li>
            </ul>

            <h2>Managing Active Discounts</h2>
            <p>Control your ongoing promotions:</p>
            <ul>
              <li>View all active discounts in one dashboard</li>
              <li>Pause/resume discounts instantly</li>
              <li>Modify terms (extend dates, change value)</li>
              <li>Duplicate successful discounts for reuse</li>
              <li>Archive expired discounts</li>
            </ul>

            <h2>Discount Analytics</h2>
            <p>Measure promotion effectiveness:</p>
            <ul>
              <li><strong>Usage Count</strong> - How many times used</li>
              <li><strong>Total Discount Given</strong> - Revenue impact</li>
              <li><strong>Revenue Generated</strong> - Sales from discounted orders</li>
              <li><strong>Average Order Value</strong> - Compare with non-discounted orders</li>
              <li><strong>Items Sold</strong> - Quantity moved due to discount</li>
              <li><strong>Customer Acquisition</strong> - New customers from promotions</li>
              <li><strong>ROI Calculation</strong> - Returns vs. discount cost</li>
            </ul>

            <h2>Discount Stacking Rules</h2>
            <p>Control how multiple discounts interact:</p>
            <ul>
              <li>Allow/disallow stacking with other discounts</li>
              <li>Set priority order for automatic discounts</li>
              <li>Choose best discount for customer option</li>
              <li>Exclusions (certain discounts can't combine)</li>
            </ul>

            <h2>Best Practices</h2>
            <ul>
              <li>Set clear start and end dates</li>
              <li>Use minimum order values to maintain margins</li>
              <li>Track performance and adjust strategies</li>
              <li>Don't over-discount (devalues your offerings)</li>
              <li>Use urgency (limited time, limited quantity)</li>
              <li>Target discounts to specific goals (new customers, slow days)</li>
              <li>Communicate discounts clearly to staff</li>
              <li>Review discount impact on profitability regularly</li>
            </ul>
          </>
        );

      case 'payments':
        return (
          <>
            <header>
              <h1>Payment Tracking</h1>
            </header>
            <p>Accurate payment tracking is essential for financial control and reconciliation. CanteenDelight supports multiple payment methods and provides detailed tracking of all transactions, making daily closing and accounting seamless.</p>

            <h2>Supported Payment Methods</h2>
            <p>Accept payments in ways your customers prefer:</p>
            <ul>
              <li><strong>Cash</strong> - Traditional cash transactions with change calculation</li>
              <li><strong>Credit/Debit Cards</strong> - Swipe, chip, or contactless cards</li>
              <li><strong>UPI</strong> - Google Pay, PhonePe, Paytm, BHIM, and others</li>
              <li><strong>Digital Wallets</strong> - Various mobile wallet apps</li>
              <li><strong>Net Banking</strong> - Direct bank transfers</li>
              <li><strong>Credit Account</strong> - For corporate accounts or trusted customers</li>
              <li><strong>Gift Cards/Vouchers</strong> - Prepaid cards</li>
            </ul>

            <h2>Processing Payments</h2>
            <p>Handle transactions smoothly:</p>

            <h3>Cash Payments</h3>
            <ul>
              <li>Enter amount received from customer</li>
              <li>System calculates change automatically</li>
              <li>Quick buttons for common denominations</li>
              <li>Cash drawer opens automatically (if integrated)</li>
              <li>Record partial payments</li>
            </ul>

            <h3>Digital Payments</h3>
            <ul>
              <li>Select payment method (Card/UPI/Wallet)</li>
              <li>Enter transaction reference number</li>
              <li>Verification before completing order</li>
              <li>Handle failed transactions gracefully</li>
            </ul>

            <h3>Split Payments</h3>
            <ul>
              <li>Accept multiple payment methods for one order</li>
              <li>Common scenarios: partial cash, partial UPI</li>
              <li>All payment parts tracked separately</li>
              <li>Receipt shows payment breakdown</li>
            </ul>

            <h2>Payment Dashboard</h2>
            <p>Monitor all payment activities:</p>
            <ul>
              <li>Total collections today by method</li>
              <li>Pending payments list</li>
              <li>Failed transaction alerts</li>
              <li>Cash vs. digital ratio</li>
              <li>Hourly payment trends</li>
              <li>Large transaction highlights</li>
            </ul>

            <h2>Refunds and Voids</h2>
            <p>Handle returns and cancellations:</p>

            <h3>Voiding Transactions</h3>
            <ul>
              <li>Cancel payment before shift close</li>
              <li>No money exchanged yet (card not charged)</li>
              <li>Requires reason selection</li>
              <li>Manager approval for large amounts</li>
            </ul>

            <h3>Processing Refunds</h3>
            <ul>
              <li>Full or partial refunds</li>
              <li>Refund to original payment method</li>
              <li>Cash refunds with receipt</li>
              <li>Digital refunds initiated through gateway</li>
              <li>Linked to original transaction</li>
              <li>Requires reason and approval</li>
            </ul>

            <h2>Cash Management</h2>
            <p>Track cash flow accurately:</p>
            <ul>
              <li><strong>Opening Balance</strong> - Cash in drawer at shift start</li>
              <li><strong>Cash Sales</strong> - Total cash received</li>
              <li><strong>Cash Refunds</strong> - Cash returned to customers</li>
              <li><strong>Payouts</strong> - Cash paid out for supplies, etc.</li>
              <li><strong>Expected Balance</strong> - Calculated cash in drawer</li>
              <li><strong>Actual Count</strong> - Physical cash count</li>
              <li><strong>Variance</strong> - Difference (over/short)</li>
            </ul>

            <h2>End of Day Reconciliation</h2>
            <p>Close out daily transactions:</p>
            <ul>
              <li>Review all transactions for the day</li>
              <li>Count physical cash and compare</li>
              <li>Verify digital payments against gateway reports</li>
              <li>Document any variances</li>
              <li>Generate end-of-day report</li>
              <li>Prepare bank deposit</li>
              <li>Sign off on shift</li>
            </ul>

            <h2>Payment Reports</h2>
            <p>Detailed payment analysis:</p>
            <ul>
              <li><strong>Collections Report</strong> - Total by payment method</li>
              <li><strong>Daily Settlement</strong> - Summary for accounting</li>
              <li><strong>Refund Report</strong> - All refunds with reasons</li>
              <li><strong>Variance Report</strong> - Cash overs and shorts</li>
              <li><strong>Staff Collections</strong> - Payments handled by each staff</li>
              <li><strong>Payment Gateway Report</strong> - Digital payment reconciliation</li>
            </ul>

            <h2>Tax Management</h2>
            <p>Handle tax correctly:</p>
            <ul>
              <li>Automatic tax calculation on orders</li>
              <li>Tax-inclusive or exclusive pricing</li>
              <li>Multiple tax rates support</li>
              <li>Tax breakdown on receipts</li>
              <li>Tax reports for filing</li>
              <li>GST/VAT compliant</li>
            </ul>

            <h2>Credit Account Management</h2>
            <p>For trusted customers or corporate accounts:</p>
            <ul>
              <li>Assign credit limits to customers</li>
              <li>Track outstanding balances</li>
              <li>Send periodic statements</li>
              <li>Record payments against credit</li>
              <li>Aging reports for overdue accounts</li>
            </ul>

            <h2>Security and Compliance</h2>
            <p>Keep payments secure:</p>
            <ul>
              <li>No card data stored locally</li>
              <li>Secure payment gateway integration</li>
              <li>Audit trail for all transactions</li>
              <li>Role-based access to payment functions</li>
              <li>Approval workflows for refunds</li>
              <li>Regular reconciliation reminders</li>
            </ul>

            <h2>Best Practices</h2>
            <ul>
              <li>Reconcile cash at every shift change</li>
              <li>Investigate variances immediately</li>
              <li>Keep digital payment proofs</li>
              <li>Process refunds promptly and document well</li>
              <li>Review payment mix trends</li>
              <li>Encourage digital payments for accuracy</li>
              <li>Deposit cash daily</li>
              <li>Train staff on fraud prevention</li>
            </ul>
          </>
        );

      case 'security':
        return (
          <>
            <header>
              <h1>Security Features</h1>
            </header>
            <p>CanteenDelight takes security seriously. We implement enterprise-grade security measures to protect your data, your customers' information, and your business operations.</p>

            <h2>Authentication & Access Control</h2>
            <p>Secure user authentication and authorization:</p>
            <ul>
              <li><strong>JWT Authentication</strong> - Industry-standard JSON Web Tokens for secure session management</li>
              <li><strong>Password Hashing</strong> - Bcrypt encryption with salt rounds for secure password storage</li>
              <li><strong>Two-Factor Authentication</strong> - Optional 2FA for enhanced account security</li>
              <li><strong>Role-Based Access Control (RBAC)</strong> - Granular permissions for Admin, Manager, Cashier, and Kitchen staff</li>
              <li><strong>Session Management</strong> - Automatic session timeout and concurrent login controls</li>
              <li><strong>Account Lockout</strong> - Protection against brute force attacks</li>
            </ul>

            <h2>Data Encryption</h2>
            <p>Your data is protected at rest and in transit:</p>
            <ul>
              <li><strong>HTTPS/TLS</strong> - All data transmitted over encrypted connections</li>
              <li><strong>Database Encryption</strong> - Sensitive data encrypted at rest</li>
              <li><strong>Secure API Communication</strong> - Encrypted API calls between frontend and backend</li>
              <li><strong>Payment Data Security</strong> - No card data stored locally; processed through secure gateways</li>
            </ul>

            <h2>Activity Logging & Audit Trail</h2>
            <p>Complete visibility into system activities:</p>
            <ul>
              <li><strong>Comprehensive Logging</strong> - Every action logged with timestamp and user ID</li>
              <li><strong>Login History</strong> - Track all login attempts and sessions</li>
              <li><strong>Change History</strong> - Record of all data modifications</li>
              <li><strong>Failed Access Attempts</strong> - Alerts for suspicious activities</li>
              <li><strong>Export Audit Logs</strong> - Download logs for compliance and investigation</li>
            </ul>

            <h2>Data Protection</h2>
            <p>Safeguards for your business data:</p>
            <ul>
              <li><strong>Automatic Backups</strong> - Regular automated backups of all data</li>
              <li><strong>Point-in-Time Recovery</strong> - Restore data to any specific moment</li>
              <li><strong>Data Redundancy</strong> - Multiple copies across secure servers</li>
              <li><strong>Disaster Recovery</strong> - Business continuity plans in place</li>
            </ul>

            <h2>Infrastructure Security</h2>
            <p>Enterprise-grade cloud infrastructure:</p>
            <ul>
              <li><strong>Cloud Hosting</strong> - Hosted on secure, certified cloud platforms</li>
              <li><strong>Firewall Protection</strong> - Network-level security barriers</li>
              <li><strong>DDoS Protection</strong> - Defense against denial-of-service attacks</li>
              <li><strong>Regular Security Updates</strong> - Continuous patching and updates</li>
              <li><strong>Intrusion Detection</strong> - Monitoring for unauthorized access attempts</li>
            </ul>

            <h2>Compliance & Standards</h2>
            <p>Adherence to security best practices:</p>
            <ul>
              <li><strong>OWASP Guidelines</strong> - Following top security recommendations</li>
              <li><strong>Input Validation</strong> - Protection against SQL injection and XSS</li>
              <li><strong>Secure Development</strong> - Security-first coding practices</li>
              <li><strong>Regular Audits</strong> - Periodic security assessments</li>
              <li><strong>Privacy Compliance</strong> - GDPR-friendly data handling</li>
            </ul>

            <h2>User Security Features</h2>
            <p>Tools for users to protect their accounts:</p>
            <ul>
              <li>Strong password requirements</li>
              <li>Password change reminders</li>
              <li>Active session viewing and management</li>
              <li>Login notification alerts</li>
              <li>Account recovery options</li>
              <li>IP-based access restrictions (Enterprise)</li>
            </ul>

            <h2>Security Best Practices</h2>
            <p>Recommendations for maintaining security:</p>
            <ul>
              <li>Use strong, unique passwords</li>
              <li>Enable two-factor authentication</li>
              <li>Regularly review user access levels</li>
              <li>Deactivate accounts when staff leave</li>
              <li>Monitor audit logs for anomalies</li>
              <li>Keep browsers and devices updated</li>
              <li>Train staff on security awareness</li>
            </ul>
          </>
        );

      case 'api-docs':
        return (
          <>
            <header>
              <h1>API Documentation</h1>
            </header>
            <p>CanteenDelight provides a comprehensive RESTful API for integrations, custom development, and automation. Access your canteen data programmatically and build custom solutions.</p>

            <h2>API Overview</h2>
            <p>Key characteristics of the CanteenDelight API:</p>
            <ul>
              <li><strong>RESTful Architecture</strong> - Standard HTTP methods (GET, POST, PUT, DELETE)</li>
              <li><strong>JSON Format</strong> - All requests and responses in JSON</li>
              <li><strong>JWT Authentication</strong> - Secure token-based authentication</li>
              <li><strong>Rate Limiting</strong> - Fair usage policies to ensure stability</li>
              <li><strong>Versioning</strong> - API versioning for backward compatibility</li>
            </ul>

            <h2>Authentication</h2>
            <p>Secure your API requests:</p>
            <ul>
              <li>Obtain API token from Settings → API Access</li>
              <li>Include token in Authorization header: <code>Bearer YOUR_TOKEN</code></li>
              <li>Tokens expire after 24 hours (configurable)</li>
              <li>Refresh tokens available for long-running applications</li>
              <li>Separate tokens for production and testing</li>
            </ul>

            <h2>Available Endpoints</h2>

            <h3>Menu Management</h3>
            <ul>
              <li><code>GET /api/menu</code> - List all menu items</li>
              <li><code>GET /api/menu/:id</code> - Get specific menu item</li>
              <li><code>POST /api/menu</code> - Create new menu item</li>
              <li><code>PUT /api/menu/:id</code> - Update menu item</li>
              <li><code>DELETE /api/menu/:id</code> - Delete menu item</li>
              <li><code>PATCH /api/menu/:id/availability</code> - Toggle availability</li>
            </ul>

            <h3>Orders</h3>
            <ul>
              <li><code>GET /api/orders</code> - List orders (with filters)</li>
              <li><code>GET /api/orders/:id</code> - Get order details</li>
              <li><code>POST /api/orders</code> - Create new order</li>
              <li><code>PATCH /api/orders/:id/status</code> - Update order status</li>
              <li><code>GET /api/orders/analytics</code> - Order analytics</li>
            </ul>

            <h3>Inventory</h3>
            <ul>
              <li><code>GET /api/inventory</code> - List inventory items</li>
              <li><code>POST /api/inventory</code> - Add inventory item</li>
              <li><code>PUT /api/inventory/:id</code> - Update inventory</li>
              <li><code>POST /api/inventory/:id/stock-in</code> - Record stock receipt</li>
              <li><code>POST /api/inventory/:id/stock-out</code> - Record stock usage</li>
            </ul>

            <h3>Users & Staff</h3>
            <ul>
              <li><code>GET /api/users</code> - List staff members</li>
              <li><code>POST /api/users</code> - Create staff account</li>
              <li><code>GET /api/users/:id</code> - Get user details</li>
              <li><code>PUT /api/users/:id</code> - Update user</li>
              <li><code>POST /api/auth/login</code> - Authenticate user</li>
            </ul>

            <h3>Reports</h3>
            <ul>
              <li><code>GET /api/reports/sales</code> - Sales report</li>
              <li><code>GET /api/reports/inventory</code> - Inventory report</li>
              <li><code>GET /api/reports/orders</code> - Order analytics</li>
              <li><code>GET /api/dashboard/stats</code> - Dashboard statistics</li>
            </ul>

            <h2>Request Examples</h2>

            <h3>Create an Order</h3>
            <pre><code>{`POST /api/orders
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "orderType": "counter",
  "items": [
    {
      "menuItem": "item_id",
      "quantity": 2,
      "specialInstructions": "No onions"
    }
  ],
  "paymentMethod": "cash",
  "customerName": "John Doe"
}`}</code></pre>

            <h3>Get Orders with Filters</h3>
            <pre><code>{`GET /api/orders?status=pending&startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer YOUR_TOKEN`}</code></pre>

            <h2>Response Format</h2>
            <p>Standard response structure:</p>
            <pre><code>{`{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}`}</code></pre>

            <h2>Error Handling</h2>
            <p>Error responses include:</p>
            <ul>
              <li>HTTP status code (400, 401, 403, 404, 500)</li>
              <li>Error message describing the issue</li>
              <li>Error code for programmatic handling</li>
              <li>Validation errors array (for 400 responses)</li>
            </ul>

            <h2>Rate Limits</h2>
            <ul>
              <li><strong>Standard:</strong> 100 requests per minute</li>
              <li><strong>Enterprise:</strong> 1000 requests per minute</li>
              <li>Headers indicate remaining quota</li>
              <li>429 status when limit exceeded</li>
            </ul>

            <h2>Webhooks</h2>
            <p>Receive real-time notifications (Enterprise):</p>
            <ul>
              <li>Order created/updated/completed</li>
              <li>Low stock alerts</li>
              <li>Payment received</li>
              <li>Staff clock in/out</li>
            </ul>

            <h2>SDKs & Libraries</h2>
            <p>Coming soon:</p>
            <ul>
              <li>JavaScript/Node.js SDK</li>
              <li>Python SDK</li>
              <li>Postman Collection</li>
            </ul>
          </>
        );

      case 'integrations':
        return (
          <>
            <header>
              <h1>Integrations</h1>
            </header>
            <p>Connect CanteenDelight with your existing tools and services. Our integrations help you streamline workflows, automate tasks, and get more value from your canteen management system.</p>

            <h2>Payment Gateways</h2>
            <p>Accept payments through multiple providers:</p>
            <ul>
              <li><strong>Razorpay</strong> - UPI, cards, wallets, net banking</li>
              <li><strong>Stripe</strong> - International card payments</li>
              <li><strong>PayU</strong> - Multi-payment options</li>
              <li><strong>Paytm Business</strong> - QR and wallet payments</li>
              <li><strong>PhonePe Business</strong> - UPI payments</li>
              <li>Automatic payment reconciliation</li>
              <li>Real-time payment status updates</li>
            </ul>

            <h2>Accounting Software</h2>
            <p>Sync financial data automatically:</p>
            <ul>
              <li><strong>Tally</strong> - Export sales and purchase data</li>
              <li><strong>QuickBooks</strong> - Automatic journal entries</li>
              <li><strong>Zoho Books</strong> - Invoice and expense sync</li>
              <li><strong>Busy</strong> - Daily transaction export</li>
              <li>Customizable account mapping</li>
              <li>Scheduled sync options</li>
            </ul>

            <h2>POS Hardware</h2>
            <p>Compatible point-of-sale equipment:</p>
            <ul>
              <li><strong>Receipt Printers</strong> - Epson, Star, Bixolon thermal printers</li>
              <li><strong>Cash Drawers</strong> - Automatic open on payment</li>
              <li><strong>Barcode Scanners</strong> - Quick item entry</li>
              <li><strong>Card Terminals</strong> - EDC machine integration</li>
              <li><strong>Kitchen Display</strong> - Order display screens</li>
              <li><strong>Customer Displays</strong> - Show order totals</li>
            </ul>

            <h2>Communication Tools</h2>
            <p>Send notifications and alerts:</p>
            <ul>
              <li><strong>SMS Gateways</strong> - MSG91, Twilio, TextLocal</li>
              <li><strong>Email Services</strong> - SendGrid, Mailgun</li>
              <li><strong>WhatsApp Business</strong> - Order updates (coming soon)</li>
              <li><strong>Push Notifications</strong> - Browser notifications</li>
              <li>Customizable message templates</li>
              <li>Delivery status tracking</li>
            </ul>

            <h2>Employee Management</h2>
            <p>Integrate with HR systems:</p>
            <ul>
              <li><strong>Biometric Devices</strong> - Attendance tracking</li>
              <li><strong>HRMS Systems</strong> - Employee data sync</li>
              <li><strong>Payroll Software</strong> - Work hours export</li>
              <li><strong>ID Card Systems</strong> - Staff identification</li>
            </ul>

            <h2>Delivery Platforms</h2>
            <p>Connect with food delivery services:</p>
            <ul>
              <li><strong>Swiggy</strong> - Order aggregation</li>
              <li><strong>Zomato</strong> - Menu and order sync</li>
              <li><strong>Custom Delivery</strong> - Your own delivery management</li>
              <li>Automatic menu updates</li>
              <li>Unified order management</li>
            </ul>

            <h2>Analytics & BI Tools</h2>
            <p>Advanced data analysis:</p>
            <ul>
              <li><strong>Google Analytics</strong> - Website tracking</li>
              <li><strong>Power BI</strong> - Custom dashboards</li>
              <li><strong>Tableau</strong> - Data visualization</li>
              <li><strong>Google Sheets</strong> - Automated exports</li>
              <li>Scheduled data exports</li>
              <li>Custom report building</li>
            </ul>

            <h2>E-commerce Platforms</h2>
            <p>Online ordering integration:</p>
            <ul>
              <li><strong>WordPress/WooCommerce</strong> - Menu sync</li>
              <li><strong>Shopify</strong> - Online store connection</li>
              <li><strong>Custom Websites</strong> - API integration</li>
              <li>Real-time inventory sync</li>
              <li>Unified order processing</li>
            </ul>

            <h2>Future Integrations</h2>
            <p>Coming soon:</p>
            <ul>
              <li><strong>QR Code Ordering</strong> - Table-side ordering</li>
              <li><strong>Digital Menu Boards</strong> - Auto-updating displays</li>
              <li><strong>IoT Sensors</strong> - Temperature monitoring</li>
              <li><strong>Smart Kitchen</strong> - Equipment integration</li>
              <li><strong>Loyalty Programs</strong> - Points and rewards</li>
            </ul>

            <h2>Custom Integrations</h2>
            <p>Need something specific?</p>
            <ul>
              <li>Use our API for custom development</li>
              <li>Webhook support for real-time events</li>
              <li>Professional services for complex integrations</li>
              <li>Enterprise support for custom connectors</li>
              <li><span className="link" onClick={() => setActiveSection('contact')}>Contact us</span> for integration requests</li>
            </ul>
          </>
        );

      case 'search-filters':
        return (
          <>
            <header>
              <h1>Advanced Search & Filters</h1>
            </header>
            <p>Quickly find exactly what you need with CanteenDelight's powerful search and filtering capabilities. Whether you're looking for a specific order, tracking inventory, or analyzing data, our search tools help you get there fast.</p>

            <h2>Global Search</h2>
            <p>Search across your entire canteen data:</p>
            <ul>
              <li>Press <code>Ctrl + K</code> or <code>Cmd + K</code> to open search</li>
              <li>Search orders by number, customer name, or items</li>
              <li>Find menu items by name or category</li>
              <li>Locate inventory by name or SKU</li>
              <li>Search staff by name or role</li>
              <li>Recent searches saved for quick access</li>
              <li>Instant results as you type</li>
            </ul>

            <h2>Order Search & Filters</h2>
            <p>Find any order quickly:</p>
            <ul>
              <li><strong>Order Number</strong> - Direct lookup by order ID</li>
              <li><strong>Date Range</strong> - Filter by specific dates or periods</li>
              <li><strong>Order Status</strong> - Pending, preparing, ready, completed, cancelled</li>
              <li><strong>Order Type</strong> - Counter, dine-in, takeaway, online</li>
              <li><strong>Payment Method</strong> - Cash, card, UPI, etc.</li>
              <li><strong>Payment Status</strong> - Paid, unpaid, refunded</li>
              <li><strong>Customer Name</strong> - Search by customer details</li>
              <li><strong>Item Name</strong> - Find orders containing specific items</li>
              <li><strong>Amount Range</strong> - Filter by order value</li>
              <li><strong>Staff Member</strong> - Orders processed by specific staff</li>
            </ul>

            <h2>Menu Search & Filters</h2>
            <p>Manage menu items efficiently:</p>
            <ul>
              <li><strong>Item Name</strong> - Search by full or partial name</li>
              <li><strong>Category</strong> - Filter by food category</li>
              <li><strong>Price Range</strong> - Find items within budget</li>
              <li><strong>Availability</strong> - Available or unavailable items</li>
              <li><strong>Dietary Tags</strong> - Vegetarian, vegan, gluten-free</li>
              <li><strong>Popularity</strong> - Sort by most ordered</li>
              <li><strong>Recently Added</strong> - New menu items</li>
              <li><strong>Low Stock</strong> - Items with ingredient shortages</li>
            </ul>

            <h2>Inventory Search & Filters</h2>
            <p>Track stock effectively:</p>
            <ul>
              <li><strong>Item Name/SKU</strong> - Quick item lookup</li>
              <li><strong>Category</strong> - Proteins, vegetables, packaging, etc.</li>
              <li><strong>Stock Level</strong> - Low stock, out of stock, overstocked</li>
              <li><strong>Supplier</strong> - Items from specific supplier</li>
              <li><strong>Expiration</strong> - Expiring soon, expired</li>
              <li><strong>Location</strong> - Storage location (if applicable)</li>
              <li><strong>Last Updated</strong> - Recent stock changes</li>
              <li><strong>Price Range</strong> - Cost per unit</li>
            </ul>

            <h2>Staff & User Filters</h2>
            <p>Find team members:</p>
            <ul>
              <li><strong>Name/Email</strong> - Direct search</li>
              <li><strong>Role</strong> - Admin, manager, cashier, kitchen</li>
              <li><strong>Status</strong> - Active, inactive, on leave</li>
              <li><strong>Join Date</strong> - Filter by employment period</li>
              <li><strong>Performance</strong> - Sort by orders processed</li>
            </ul>

            <h2>Report Filters</h2>
            <p>Customize your analytics:</p>
            <ul>
              <li><strong>Date Range</strong> - Today, this week, this month, custom</li>
              <li><strong>Compare Periods</strong> - This month vs. last month</li>
              <li><strong>Category</strong> - Filter by menu category</li>
              <li><strong>Order Type</strong> - Segment by order type</li>
              <li><strong>Payment Method</strong> - Analyze by payment type</li>
              <li><strong>Staff Member</strong> - Individual performance</li>
              <li><strong>Time of Day</strong> - Peak hours analysis</li>
            </ul>

            <h2>Saved Filters</h2>
            <p>Save time with presets:</p>
            <ul>
              <li>Save frequently used filter combinations</li>
              <li>Quick access from filter dropdown</li>
              <li>Share saved filters with team</li>
              <li>Set default filters for each page</li>
              <li>Export filtered results</li>
            </ul>

            <h2>Bulk Actions</h2>
            <p>Act on filtered results:</p>
            <ul>
              <li>Select all filtered items</li>
              <li>Bulk update status</li>
              <li>Bulk delete (with confirmation)</li>
              <li>Export selected items</li>
              <li>Print filtered lists</li>
            </ul>

            <h2>Search Tips</h2>
            <p>Get better results:</p>
            <ul>
              <li>Use quotes for exact matches: "Chicken Biryani"</li>
              <li>Use partial words: "chick" finds chicken items</li>
              <li>Combine multiple filters for precise results</li>
              <li>Clear filters to reset view</li>
              <li>Check "Include archived" for old records</li>
            </ul>
          </>
        );

      case 'pricing':
        return (
          <>
            <header>
              <h1>Pricing Plans</h1>
            </header>
            <p>Choose the plan that best fits your canteen's size and needs. All plans include core features with options to scale as your business grows.</p>

            <h2>Free Trial</h2>
            <p>Try CanteenDelight risk-free:</p>
            <ul>
              <li>14-day full-featured trial</li>
              <li>No credit card required</li>
              <li>Access to all Professional features</li>
              <li>Up to 100 orders during trial</li>
              <li>Full support and onboarding help</li>
              <li>Data transfers to paid plan seamlessly</li>
            </ul>

            <h2>Starter Plan - ₹999/month</h2>
            <p>Perfect for small canteens and food stalls just getting started with digital management.</p>

            <h3>What's Included:</h3>
            <ul>
              <li>Up to 50 menu items</li>
              <li>Up to 500 orders per month</li>
              <li>3 staff accounts</li>
              <li>Basic dashboard and reporting</li>
              <li>Order management</li>
              <li>Basic inventory tracking</li>
              <li>Receipt printing</li>
              <li>Email support (response within 48 hours)</li>
              <li>Mobile-responsive access</li>
            </ul>

            <h3>Limitations:</h3>
            <ul>
              <li>Basic analytics only</li>
              <li>No advanced reports</li>
              <li>No custom integrations</li>
              <li>Single location only</li>
            </ul>

            <h3>Best For:</h3>
            <ul>
              <li>Small tea/coffee stalls</li>
              <li>Food trucks</li>
              <li>Home-based food businesses</li>
              <li>Testing operations before scaling</li>
            </ul>

            <h2>Professional Plan - ₹2,499/month</h2>
            <p>For established canteens that need comprehensive management and insights.</p>

            <h3>Everything in Starter, plus:</h3>
            <ul>
              <li>Unlimited menu items</li>
              <li>Unlimited orders</li>
              <li>10 staff accounts</li>
              <li>Advanced analytics and custom reports</li>
              <li>Complete inventory management with recipes</li>
              <li>Staff performance tracking</li>
              <li>Discount and promotion management</li>
              <li>Customer feedback collection</li>
              <li>Kitchen Display System (KDS)</li>
              <li>Supplier management</li>
              <li>Activity logs and audit trail</li>
              <li>Priority email support (response within 24 hours)</li>
              <li>Chat support during business hours</li>
              <li>Monthly check-in call with success team</li>
            </ul>

            <h3>Best For:</h3>
            <ul>
              <li>School and college canteens</li>
              <li>Corporate cafeterias</li>
              <li>Small restaurants</li>
              <li>Sports club canteens</li>
            </ul>

            <h2>Enterprise Plan - Custom Pricing</h2>
            <p>For large operations with complex requirements and multiple locations.</p>

            <h3>Everything in Professional, plus:</h3>
            <ul>
              <li>Unlimited staff accounts</li>
              <li>Multi-location support</li>
              <li>Central management dashboard</li>
              <li>Custom integrations (ERP, accounting)</li>
              <li>API access for custom development</li>
              <li>Advanced user permissions</li>
              <li>Custom reports and dashboards</li>
              <li>White-labeling options</li>
              <li>Dedicated account manager</li>
              <li>Phone support</li>
              <li>On-site training (additional cost)</li>
              <li>SLA guarantees</li>
              <li>Data migration assistance</li>
              <li>Priority feature requests</li>
            </ul>

            <h3>Best For:</h3>
            <ul>
              <li>Large corporate campuses</li>
              <li>Hospital food services</li>
              <li>University dining halls</li>
              <li>Factory canteen chains</li>
              <li>Franchise operations</li>
            </ul>

            <h2>Add-Ons (Available on Professional and Enterprise)</h2>
            <ul>
              <li><strong>Additional Staff Accounts</strong> - ₹199/user/month</li>
              <li><strong>Online Ordering Portal</strong> - ₹999/month</li>
              <li><strong>SMS Notifications</strong> - Pay per use</li>
              <li><strong>Custom Domain</strong> - ₹499/month</li>
              <li><strong>Advanced Integrations</strong> - Custom pricing</li>
            </ul>

            <h2>Annual Billing Discount</h2>
            <p>Save 20% with annual billing:</p>
            <ul>
              <li>Starter: ₹9,590/year (saves ₹2,398)</li>
              <li>Professional: ₹23,990/year (saves ₹5,998)</li>
              <li>Enterprise: Custom annual pricing available</li>
            </ul>

            <h2>Payment Methods</h2>
            <ul>
              <li>Credit/Debit cards</li>
              <li>Net banking</li>
              <li>UPI</li>
              <li>Bank transfer (Enterprise)</li>
            </ul>

            <h2>Frequently Asked Questions</h2>

            <h3>Can I change plans later?</h3>
            <p>Yes, you can upgrade or downgrade at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the credit applies to future invoices.</p>

            <h3>What happens if I exceed my plan limits?</h3>
            <p>We'll notify you when approaching limits. You can upgrade anytime. We won't cut off service abruptly.</p>

            <h3>Is there a setup fee?</h3>
            <p>No setup fees for Starter and Professional plans. Enterprise may have implementation fees for complex setups.</p>

            <h3>What's your cancellation policy?</h3>
            <p>Cancel anytime. Monthly plans end at billing cycle. Annual plans can be cancelled but are not refunded for unused months.</p>

            <h3>Do you offer discounts for NGOs or educational institutions?</h3>
            <p>Yes, we offer special pricing for registered non-profits and educational institutions. Contact us for details.</p>
          </>
        );

      case 'subscription':
        return (
          <>
            <header>
              <h1>Subscription Management</h1>
            </header>
            <p>Manage your CanteenDelight subscription, billing information, and payment history all in one place.</p>

            <h2>Viewing Your Subscription</h2>
            <p>Access your subscription details:</p>
            <ul>
              <li>Go to Settings &gt; Subscription</li>
              <li>View current plan and features</li>
              <li>See billing cycle and next payment date</li>
              <li>Check usage against plan limits</li>
              <li>View active add-ons</li>
            </ul>

            <h2>Upgrading Your Plan</h2>
            <p>Move to a higher plan for more features:</p>
            <ul>
              <li>Click "Upgrade Plan" in subscription settings</li>
              <li>Compare plans and features</li>
              <li>Select your new plan</li>
              <li>Review prorated charges</li>
              <li>Confirm payment method</li>
              <li>New features available immediately</li>
            </ul>

            <h2>Downgrading Your Plan</h2>
            <p>Switch to a lower plan if needed:</p>
            <ul>
              <li>Click "Change Plan" in subscription settings</li>
              <li>Select lower plan</li>
              <li>Review what features you'll lose</li>
              <li>Confirm your decision</li>
              <li>Change takes effect at next billing cycle</li>
              <li>Data is retained but some features become inaccessible</li>
            </ul>

            <h2>Updating Payment Method</h2>
            <p>Keep your payment information current:</p>
            <ul>
              <li>Go to Settings &gt; Billing</li>
              <li>Click "Update Payment Method"</li>
              <li>Enter new card details or select UPI/Net Banking</li>
              <li>Old payment method removed after verification</li>
              <li>Receipts sent to your email</li>
            </ul>

            <h2>Billing History</h2>
            <p>Access your payment records:</p>
            <ul>
              <li>View all past invoices</li>
              <li>Download invoices as PDF</li>
              <li>See payment status (paid, pending, failed)</li>
              <li>Track refunds and credits</li>
              <li>Filter by date range</li>
            </ul>

            <h2>Invoice Details</h2>
            <p>Customize invoices for your records:</p>
            <ul>
              <li>Add business name and address</li>
              <li>Include GST/Tax registration number</li>
              <li>Specify billing email</li>
              <li>All invoices include tax breakdown</li>
            </ul>

            <h2>Handling Failed Payments</h2>
            <p>What happens if payment fails:</p>
            <ul>
              <li>Email notification sent immediately</li>
              <li>3-day grace period to update payment</li>
              <li>Second attempt after 3 days</li>
              <li>Account restricted after 7 days</li>
              <li>Data preserved for 30 days</li>
              <li>Contact support for assistance</li>
            </ul>

            <h2>Cancelling Your Subscription</h2>
            <p>If you need to cancel:</p>
            <ul>
              <li>Go to Settings &gt; Subscription &gt; Cancel</li>
              <li>Tell us why (helps us improve)</li>
              <li>Access continues until end of billing period</li>
              <li>Data available for export</li>
              <li>Account becomes read-only after expiry</li>
              <li>Reactivate anytime within 90 days</li>
            </ul>

            <h2>Data Export Before Cancellation</h2>
            <p>Take your data with you:</p>
            <ul>
              <li>Export all menu items</li>
              <li>Download order history</li>
              <li>Export customer data</li>
              <li>Download all reports</li>
              <li>Inventory records</li>
              <li>Staff information</li>
            </ul>

            <h2>Reactivating Your Account</h2>
            <p>Come back anytime:</p>
            <ul>
              <li>Within 90 days: All data preserved</li>
              <li>Login and update payment method</li>
              <li>Select plan</li>
              <li>Immediate access restored</li>
              <li>After 90 days: Fresh start required</li>
            </ul>

            <h2>Enterprise Billing</h2>
            <p>For Enterprise customers:</p>
            <ul>
              <li>Custom billing cycles</li>
              <li>Purchase orders accepted</li>
              <li>Bank transfers available</li>
              <li>Consolidated multi-location billing</li>
              <li>Custom payment terms</li>
              <li>Dedicated billing contact</li>
            </ul>
          </>
        );

      case 'faq':
        return (
          <>
            <header>
              <h1>Frequently Asked Questions</h1>
            </header>
            <p>Find quick answers to common questions about CanteenDelight.</p>

            <h2>Getting Started</h2>

            <h3>How do I create an account?</h3>
            <p>Click "Get Started" on our website, enter your email and create a password, or sign up with Google. You'll receive a verification email to activate your account.</p>

            <h3>Is there a free trial?</h3>
            <p>Yes! We offer a 14-day free trial with full access to Professional features. No credit card required to start.</p>

            <h3>How long does setup take?</h3>
            <p>Basic setup takes about 30 minutes. You can add your menu, inventory, and start taking orders the same day.</p>

            <h3>Do I need special hardware?</h3>
            <p>No! CanteenDelight works in any modern web browser. For printing, any standard receipt printer works. A tablet or computer is recommended for the best experience.</p>

            <h2>Features & Functionality</h2>

            <h3>Can I access CanteenDelight on my phone?</h3>
            <p>Yes, CanteenDelight is fully responsive and works on smartphones, tablets, and computers. Access from any device with a browser.</p>

            <h3>Does it work offline?</h3>
            <p>CanteenDelight requires an internet connection for full functionality. For areas with unstable connectivity, contact us about our offline capabilities (Enterprise).</p>

            <h3>How many menu items can I add?</h3>
            <p>Starter plan: 50 items. Professional and Enterprise: Unlimited items.</p>

            <h3>Can I customize receipt format?</h3>
            <p>Yes, you can add your logo, customize header/footer messages, and choose which fields to display on receipts.</p>

            <h3>Does it support multiple languages?</h3>
            <p>Currently, the interface is in English. Multi-language support is on our roadmap. You can add menu items in any language.</p>

            <h2>Payments & Billing</h2>

            <h3>What payment methods are supported?</h3>
            <p>Cash, credit/debit cards, UPI, digital wallets, and net banking. Enterprise plans can add custom payment methods.</p>

            <h3>Can I split payments?</h3>
            <p>Yes, you can split a single order across multiple payment methods (e.g., part cash, part UPI).</p>

            <h3>How do refunds work?</h3>
            <p>Process refunds from the order screen. For cash, provide cash back. For digital payments, initiate refund through the original method. All refunds are logged.</p>

            <h3>Is there a transaction fee?</h3>
            <p>CanteenDelight doesn't charge transaction fees. However, your payment gateway or bank may have their own fees for digital payments.</p>

            <h2>Data & Security</h2>

            <h3>Is my data secure?</h3>
            <p>Yes, we use industry-standard encryption for all data in transit and at rest. We're hosted on secure cloud infrastructure with regular security audits.</p>

            <h3>Who owns my data?</h3>
            <p>You own all your data. We only process it to provide our service. You can export all data anytime.</p>

            <h3>How often is data backed up?</h3>
            <p>Data is backed up continuously with point-in-time recovery available. We maintain backups for disaster recovery.</p>

            <h3>Can I export my data?</h3>
            <p>Yes, export any report to PDF, Excel, or CSV. You can also request a complete data export from settings.</p>

            <h2>Subscription & Support</h2>

            <h3>Can I cancel anytime?</h3>
            <p>Yes, cancel anytime from your account settings. No cancellation fees. Access continues until the end of your billing period.</p>

            <h3>Can I change plans?</h3>
            <p>Yes, upgrade or downgrade anytime. Changes are prorated for upgrades and applied at next billing for downgrades.</p>

            <h3>What support is available?</h3>
            <p>All plans include email support. Professional adds chat support. Enterprise includes phone support and dedicated account manager.</p>

            <h3>Do you provide training?</h3>
            <p>Yes, we provide documentation, video tutorials, and webinars. Enterprise plans include personalized training sessions.</p>

            <h2>Technical</h2>

            <h3>What browsers are supported?</h3>
            <p>Latest versions of Chrome, Firefox, Safari, and Edge. We recommend Chrome for the best experience.</p>

            <h3>Can I integrate with other software?</h3>
            <p>Professional plan supports standard integrations. Enterprise plan includes API access for custom integrations with your accounting, ERP, or other systems.</p>

            <h3>How do I connect a receipt printer?</h3>
            <p>Most USB and network receipt printers work. Configure in Settings &gt; Printing. We support ESC/POS and Star protocols.</p>
          </>
        );

      case 'contact':
        return (
          <>
            <header>
              <h1>Contact Support</h1>
            </header>
            <p>We're here to help! Our support team is dedicated to ensuring your success with CanteenDelight. Reach out through any of these channels.</p>

            <h2>Email Support</h2>
            <p>For detailed inquiries and issues that require investigation:</p>
            <ul>
              <li><strong>Email:</strong> support@canteendelight.com</li>
              <li><strong>Response Time:</strong>
                <ul>
                  <li>Starter Plan: Within 48 hours</li>
                  <li>Professional Plan: Within 24 hours</li>
                  <li>Enterprise Plan: Within 4 hours</li>
                </ul>
              </li>
              <li>Include your account email and detailed description of the issue</li>
              <li>Screenshots or screen recordings help us understand better</li>
            </ul>

            <h2>Live Chat Support</h2>
            <p>For quick questions and real-time assistance:</p>
            <ul>
              <li>Click the chat icon in the bottom right corner of any page</li>
              <li><strong>Availability:</strong> Monday to Friday, 9 AM to 6 PM IST</li>
              <li>Average response time: Under 5 minutes</li>
              <li>Available on Professional and Enterprise plans</li>
              <li>Chat transcripts emailed for your records</li>
            </ul>

            <h2>Phone Support</h2>
            <p>For urgent issues requiring immediate attention:</p>
            <ul>
              <li><strong>Available for:</strong> Enterprise plan customers</li>
              <li><strong>Hours:</strong> Monday to Friday, 9 AM to 6 PM IST</li>
              <li>Emergency line for critical issues (24/7 for Enterprise)</li>
              <li>Contact your dedicated account manager for the number</li>
            </ul>

            <h2>Help Center</h2>
            <p>Self-service resources for quick answers:</p>
            <ul>
              <li>Comprehensive documentation (you're reading it!)</li>
              <li>Step-by-step tutorials</li>
              <li>Video guides</li>
              <li>Searchable FAQ database</li>
              <li>Available 24/7</li>
            </ul>

            <h2>Community Forum</h2>
            <p>Connect with other CanteenDelight users:</p>
            <ul>
              <li>Share tips and best practices</li>
              <li>Get advice from experienced users</li>
              <li>Suggest and vote on new features</li>
              <li>Moderated by our team</li>
              <li>Access via community.canteendelight.com</li>
            </ul>

            <h2>Sales Inquiries</h2>
            <p>For pricing, demos, and enterprise discussions:</p>
            <ul>
              <li><strong>Email:</strong> sales@canteendelight.com</li>
              <li>Request a personalized demo</li>
              <li>Discuss custom requirements</li>
              <li>Get volume pricing for multiple locations</li>
              <li>Learn about partnership opportunities</li>
            </ul>

            <h2>Feedback and Suggestions</h2>
            <p>We love hearing from you:</p>
            <ul>
              <li>Share feature requests</li>
              <li>Report bugs or issues</li>
              <li>Suggest improvements</li>
              <li>Email: feedback@canteendelight.com</li>
              <li>Or use in-app feedback button</li>
            </ul>

            <h2>What to Include When Contacting Support</h2>
            <p>Help us help you faster by including:</p>
            <ul>
              <li>Your account email address</li>
              <li>Clear description of the issue</li>
              <li>Steps to reproduce the problem</li>
              <li>Expected vs. actual behavior</li>
              <li>Screenshots or screen recordings</li>
              <li>Browser and device information</li>
              <li>Any error messages you see</li>
            </ul>

            <h2>Business Hours</h2>
            <p>Our team is available:</p>
            <ul>
              <li><strong>Monday to Friday:</strong> 9:00 AM to 6:00 PM IST</li>
              <li><strong>Saturday:</strong> 10:00 AM to 2:00 PM IST (chat only)</li>
              <li><strong>Sunday:</strong> Closed (help center always available)</li>
              <li>Closed on major Indian national holidays</li>
            </ul>

            <h2>Service Status</h2>
            <p>Check system status and planned maintenance:</p>
            <ul>
              <li>Visit status.canteendelight.com</li>
              <li>Subscribe to status updates via email</li>
              <li>Planned maintenance announced 48 hours in advance</li>
              <li>Real-time incident updates</li>
            </ul>
          </>
        );

      case 'terms':
        return (
          <>
            <header>
              <h1>Terms & Conditions</h1>
            </header>
            <p>Welcome to CanteenDelight. These terms and conditions outline the rules and regulations for the use of our canteen management platform.</p>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using CanteenDelight, you accept and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our service.</p>

            <h2>2. Service Description</h2>
            <p>CanteenDelight provides a comprehensive canteen management solution including:</p>
            <ul>
              <li>Order management and processing</li>
              <li>Inventory tracking and management</li>
              <li>Staff management and role-based access</li>
              <li>Analytics and reporting</li>
              <li>Payment tracking</li>
              <li>Customer feedback collection</li>
            </ul>

            <h2>3. User Accounts</h2>
            <p>When creating an account with us, you must provide accurate and complete information. You are responsible for:</p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Ensuring your account information is up to date</li>
            </ul>

            <h2>4. Acceptable Use</h2>
            <p>You agree not to use CanteenDelight to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon intellectual property rights</li>
              <li>Transmit harmful code or malware</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with other users' access to the service</li>
              <li>Use the service for any fraudulent purposes</li>
            </ul>

            <h2>5. Data and Content</h2>
            <p>You retain ownership of all data you input into CanteenDelight. By using our service, you grant us the right to:</p>
            <ul>
              <li>Store and process your data to provide the service</li>
              <li>Create backups for data protection</li>
              <li>Generate anonymized analytics to improve our service</li>
            </ul>

            <h2>6. Payment Terms</h2>
            <p>For paid subscription plans:</p>
            <ul>
              <li>Fees are billed in advance on a monthly or annual basis</li>
              <li>All fees are non-refundable except as required by law</li>
              <li>We reserve the right to modify pricing with 30 days notice</li>
              <li>Failure to pay may result in service suspension</li>
            </ul>

            <h2>7. Service Availability</h2>
            <p>We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. We may temporarily suspend access for:</p>
            <ul>
              <li>Scheduled maintenance (with advance notice)</li>
              <li>Emergency repairs</li>
              <li>Security threats</li>
              <li>Circumstances beyond our control</li>
            </ul>

            <h2>8. Limitation of Liability</h2>
            <p>CanteenDelight shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service. Our total liability shall not exceed the amount paid by you in the twelve months preceding the claim.</p>

            <h2>9. Termination</h2>
            <p>Either party may terminate the agreement:</p>
            <ul>
              <li>You may cancel your subscription at any time</li>
              <li>We may terminate for violation of these terms</li>
              <li>Upon termination, your access will be revoked</li>
              <li>You may request data export before termination</li>
            </ul>

            <h2>10. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Material changes will be communicated via email or platform notification at least 30 days before taking effect. Continued use after changes constitutes acceptance.</p>

            <h2>11. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</p>

            <h2>12. Contact</h2>
            <p>For questions about these Terms & Conditions, please contact us at <strong>legal@canteendelight.com</strong>.</p>

            <p><em>Last updated: November 2024</em></p>
          </>
        );

      case 'privacy':
        return (
          <>
            <header>
              <h1>Privacy Policy</h1>
            </header>
            <p>At CanteenDelight, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our canteen management platform.</p>

            <h2>1. Information We Collect</h2>

            <h3>Personal Information</h3>
            <p>We may collect the following personal information:</p>
            <ul>
              <li><strong>Account Information:</strong> Name, email address, phone number, organization name</li>
              <li><strong>Authentication Data:</strong> Login credentials (passwords are encrypted)</li>
              <li><strong>Profile Information:</strong> Role, department, profile picture</li>
              <li><strong>Payment Information:</strong> Billing address, payment method details (processed by secure payment providers)</li>
            </ul>

            <h3>Usage Information</h3>
            <p>We automatically collect:</p>
            <ul>
              <li>Device information (browser type, operating system)</li>
              <li>IP address and location data</li>
              <li>Usage patterns and feature interactions</li>
              <li>Activity logs and timestamps</li>
            </ul>

            <h3>Business Data</h3>
            <p>Data you input into the platform:</p>
            <ul>
              <li>Menu items and pricing</li>
              <li>Inventory records</li>
              <li>Order histories</li>
              <li>Customer information</li>
              <li>Staff records</li>
              <li>Financial transactions</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative information and updates</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Analyze usage to improve our platform</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We do not sell your personal information. We may share data with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third parties who assist in operating our platform (hosting, analytics, payment processing)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              <li><strong>With Your Consent:</strong> For any other purpose with your explicit approval</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>We implement industry-standard security measures:</p>
            <ul>
              <li>SSL/TLS encryption for data in transit</li>
              <li>Encrypted database storage</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication</li>
              <li>Secure password hashing with bcrypt</li>
              <li>JWT-based session management</li>
              <li>Regular automated backups</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>We retain your information for as long as:</p>
            <ul>
              <li>Your account is active</li>
              <li>Needed to provide services to you</li>
              <li>Required for legal compliance</li>
              <li>Necessary to resolve disputes</li>
            </ul>
            <p>After account deletion, we may retain anonymized data for analytics purposes.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Export:</strong> Receive your data in a portable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Restrict Processing:</strong> Limit how we use your data</li>
            </ul>

            <h2>7. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies for:</p>
            <ul>
              <li>Session management and authentication</li>
              <li>Remembering user preferences</li>
              <li>Analytics and performance monitoring</li>
              <li>Security and fraud prevention</li>
            </ul>
            <p>You can control cookies through your browser settings, though some features may not function properly without them.</p>

            <h2>8. Third-Party Services</h2>
            <p>Our platform may integrate with third-party services. These services have their own privacy policies, and we encourage you to review them:</p>
            <ul>
              <li>Payment processors</li>
              <li>Analytics providers</li>
              <li>Cloud hosting services</li>
              <li>Email service providers</li>
            </ul>

            <h2>9. Children's Privacy</h2>
            <p>CanteenDelight is not intended for children under 13. We do not knowingly collect personal information from children. If you believe we have collected such information, please contact us immediately.</p>

            <h2>10. International Data Transfers</h2>
            <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.</p>

            <h2>11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. We will notify you of material changes via email or platform notification. The "Last updated" date indicates when the policy was last revised.</p>

            <h2>12. Contact Us</h2>
            <p>For privacy-related questions or to exercise your rights, contact our Data Protection Officer:</p>
            <ul>
              <li><strong>Email:</strong> privacy@canteendelight.com</li>
              <li><strong>Address:</strong> CanteenDelight Privacy Team, [Your Address]</li>
            </ul>

            <p><em>Last updated: November 2024</em></p>
          </>
        );

      case 'contribute':
        return (
          <>
            <header>
              <h1>Contributing Guide</h1>
            </header>
            <p>Thank you for your interest in contributing to CanteenDelight! We welcome contributions from the community to help make this project better. This guide will help you get started.</p>

            <h2>GitHub Repository</h2>
            <p>CanteenDelight is open source and hosted on GitHub:</p>
            <ul>
              <li><strong>Repository:</strong> <a href="https://github.com/BarnabaBobbili/Canteen-FSD" target="_blank" rel="noopener noreferrer" className="link">https://github.com/BarnabaBobbili/Canteen-FSD</a></li>
              <li><strong>License:</strong> MIT License</li>
              <li><strong>Tech Stack:</strong> React.js, Node.js, Express.js, MongoDB</li>
            </ul>

            <h2>Getting Started</h2>

            <h3>Prerequisites</h3>
            <p>Before contributing, ensure you have the following installed:</p>
            <ul>
              <li>Node.js (v16 or higher)</li>
              <li>npm or yarn</li>
              <li>MongoDB (local or Atlas connection)</li>
              <li>Git</li>
            </ul>

            <h3>Fork and Clone</h3>
            <p>Follow these steps to set up your development environment:</p>
            <ol>
              <li>
                <strong>Fork the repository:</strong>
                <ul>
                  <li>Visit <a href="https://github.com/BarnabaBobbili/Canteen-FSD" target="_blank" rel="noopener noreferrer" className="link">https://github.com/BarnabaBobbili/Canteen-FSD</a></li>
                  <li>Click the "Fork" button in the top-right corner</li>
                  <li>This creates a copy of the repository in your GitHub account</li>
                </ul>
              </li>
              <li>
                <strong>Clone your fork:</strong>
                <br />
                <code>git clone https://github.com/YOUR-USERNAME/Canteen-FSD.git</code>
              </li>
              <li>
                <strong>Navigate to the project:</strong>
                <br />
                <code>cd Canteen-FSD</code>
              </li>
              <li>
                <strong>Add upstream remote:</strong>
                <br />
                <code>git remote add upstream https://github.com/BarnabaBobbili/Canteen-FSD.git</code>
              </li>
              <li>
                <strong>Install dependencies:</strong>
                <br />
                <code>cd backend && npm install</code>
                <br />
                <code>cd ../frontend && npm install</code>
              </li>
              <li>
                <strong>Set up environment variables:</strong>
                <ul>
                  <li>Copy <code>.env.example</code> to <code>.env</code> in both frontend and backend folders</li>
                  <li>Fill in your MongoDB URI, JWT secret, and other required variables</li>
                </ul>
              </li>
              <li>
                <strong>Start development servers:</strong>
                <br />
                Backend: <code>cd backend && npm run dev</code>
                <br />
                Frontend: <code>cd frontend && npm start</code>
              </li>
            </ol>

            <h2>Making Contributions</h2>

            <h3>Creating a Branch</h3>
            <p>Always create a new branch for your work:</p>
            <ol>
              <li>
                <strong>Sync with upstream:</strong>
                <br />
                <code>git fetch upstream</code>
                <br />
                <code>git checkout main</code>
                <br />
                <code>git merge upstream/main</code>
              </li>
              <li>
                <strong>Create a new branch:</strong>
                <br />
                <code>git checkout -b feature/your-feature-name</code>
                <br />
                Or for bug fixes: <code>git checkout -b fix/bug-description</code>
              </li>
            </ol>

            <h3>Coding Standards</h3>
            <p>Please follow these guidelines:</p>
            <ul>
              <li><strong>Code Style:</strong> Follow the existing code style in the project</li>
              <li><strong>Components:</strong> Keep components under 250 lines (main) or 150 lines (sub-components)</li>
              <li><strong>Documentation:</strong> Use JSDoc comments for all helper functions</li>
              <li><strong>No Duplication:</strong> Check for existing components/helpers before creating new ones</li>
              <li><strong>Testing:</strong> Test your changes thoroughly before submitting</li>
              <li><strong>Commit Messages:</strong> Write clear, descriptive commit messages</li>
            </ul>

            <h3>Submitting a Pull Request</h3>
            <ol>
              <li>
                <strong>Push your changes:</strong>
                <br />
                <code>git push origin feature/your-feature-name</code>
              </li>
              <li>
                <strong>Create a Pull Request:</strong>
                <ul>
                  <li>Go to the original repository on GitHub</li>
                  <li>Click "Pull requests" → "New pull request"</li>
                  <li>Click "compare across forks"</li>
                  <li>Select your fork and branch</li>
                  <li>Click "Create pull request"</li>
                </ul>
              </li>
              <li>
                <strong>Fill out the PR template:</strong>
                <ul>
                  <li>Describe what changes you made</li>
                  <li>Explain why these changes are needed</li>
                  <li>List any related issues</li>
                  <li>Include screenshots if applicable</li>
                </ul>
              </li>
              <li>
                <strong>Wait for review:</strong> Maintainers will review your PR and may request changes
              </li>
            </ol>

            <h2>Requesting New Features</h2>
            <p>Have an idea for a new feature? Here's how to request it:</p>

            <h3>Before Requesting</h3>
            <ul>
              <li>Search existing issues to see if it's already been requested</li>
              <li>Check the project roadmap for planned features</li>
              <li>Consider if it fits the project's scope and goals</li>
            </ul>

            <h3>Creating a Feature Request</h3>
            <ol>
              <li>
                <strong>Go to GitHub Issues:</strong>
                <br />
                <a href="https://github.com/BarnabaBobbili/Canteen-FSD/issues" target="_blank" rel="noopener noreferrer" className="link">https://github.com/BarnabaBobbili/Canteen-FSD/issues</a>
              </li>
              <li>
                <strong>Click "New issue"</strong>
              </li>
              <li>
                <strong>Select "Feature request" template</strong> (if available)
              </li>
              <li>
                <strong>Provide detailed information:</strong>
                <ul>
                  <li><strong>Title:</strong> Clear, concise description of the feature</li>
                  <li><strong>Problem:</strong> What problem does this feature solve?</li>
                  <li><strong>Solution:</strong> Describe your proposed solution</li>
                  <li><strong>Alternatives:</strong> Any alternative solutions you've considered</li>
                  <li><strong>Use Case:</strong> Who would benefit from this feature?</li>
                  <li><strong>Mockups:</strong> Include wireframes or mockups if applicable</li>
                </ul>
              </li>
              <li>
                <strong>Add labels:</strong> Tag with "enhancement" or "feature request"
              </li>
              <li>
                <strong>Submit and engage:</strong> Respond to any questions from maintainers
              </li>
            </ol>

            <h2>Reporting Bugs</h2>
            <p>Found a bug? Help us fix it by reporting it properly:</p>

            <h3>Before Reporting</h3>
            <ul>
              <li>Check if the bug has already been reported in existing issues</li>
              <li>Make sure you're using the latest version</li>
              <li>Try to reproduce the bug consistently</li>
            </ul>

            <h3>Creating a Bug Report</h3>
            <ol>
              <li>
                <strong>Go to GitHub Issues:</strong>
                <br />
                <a href="https://github.com/BarnabaBobbili/Canteen-FSD/issues" target="_blank" rel="noopener noreferrer" className="link">https://github.com/BarnabaBobbili/Canteen-FSD/issues</a>
              </li>
              <li>
                <strong>Click "New issue"</strong>
              </li>
              <li>
                <strong>Select "Bug report" template</strong> (if available)
              </li>
              <li>
                <strong>Provide detailed information:</strong>
                <ul>
                  <li><strong>Title:</strong> Brief description of the bug</li>
                  <li><strong>Description:</strong> Clear explanation of what's happening</li>
                  <li><strong>Steps to Reproduce:</strong>
                    <ol>
                      <li>Go to '...'</li>
                      <li>Click on '...'</li>
                      <li>Scroll down to '...'</li>
                      <li>See error</li>
                    </ol>
                  </li>
                  <li><strong>Expected Behavior:</strong> What should happen</li>
                  <li><strong>Actual Behavior:</strong> What actually happens</li>
                  <li><strong>Screenshots/Videos:</strong> Visual evidence of the bug</li>
                  <li><strong>Environment:</strong>
                    <ul>
                      <li>OS: (e.g., Windows 11, macOS 14)</li>
                      <li>Browser: (e.g., Chrome 119, Firefox 120)</li>
                      <li>Node.js version: (e.g., 18.17.0)</li>
                    </ul>
                  </li>
                  <li><strong>Console Errors:</strong> Any error messages from browser console</li>
                  <li><strong>Additional Context:</strong> Any other relevant information</li>
                </ul>
              </li>
              <li>
                <strong>Add labels:</strong> Tag with "bug"
              </li>
            </ol>

            <h2>Types of Contributions</h2>
            <p>There are many ways to contribute:</p>
            <ul>
              <li><strong>Code:</strong> New features, bug fixes, performance improvements</li>
              <li><strong>Documentation:</strong> Improve README, add code comments, create tutorials</li>
              <li><strong>Testing:</strong> Write tests, test on different environments</li>
              <li><strong>Design:</strong> UI/UX improvements, icons, graphics</li>
              <li><strong>Translation:</strong> Help translate the app to other languages</li>
              <li><strong>Bug Reports:</strong> Report issues you find</li>
              <li><strong>Feature Ideas:</strong> Suggest new features</li>
              <li><strong>Code Review:</strong> Review other people's pull requests</li>
            </ul>

            <h2>Code of Conduct</h2>
            <p>By participating in this project, you agree to:</p>
            <ul>
              <li>Be respectful and inclusive</li>
              <li>Give and accept constructive feedback gracefully</li>
              <li>Focus on what's best for the community</li>
              <li>Show empathy towards other community members</li>
            </ul>

            <h2>Getting Help</h2>
            <p>Need help with your contribution?</p>
            <ul>
              <li><strong>GitHub Discussions:</strong> Ask questions about the project</li>
              <li><strong>Issue Comments:</strong> Ask for clarification on specific issues</li>
              <li><strong>Email:</strong> Contact maintainers at support@canteendelight.com</li>
            </ul>

            <h2>Recognition</h2>
            <p>We appreciate all contributions! Contributors will be:</p>
            <ul>
              <li>Listed in the project's CONTRIBUTORS file</li>
              <li>Credited in release notes for significant contributions</li>
              <li>Thanked in our community announcements</li>
            </ul>

            <p><strong>Thank you for contributing to CanteenDelight!</strong></p>
          </>
        );

      default:
        return (
          <>
            <header>
              <h1>{sidebarItems.flatMap(cat => cat.items).find(item => item.id === activeSection)?.label || 'Coming Soon'}</h1>
            </header>
            <p>This section is under development. Check back soon for more detailed information!</p>
            <p>In the meantime, feel free to <span className="link" onClick={() => setActiveSection('contact')}>contact our support team</span> if you have questions about this topic.</p>
          </>
        );
    }
  };

  const getCurrentCategory = () => {
    for (const category of sidebarItems) {
      if (category.items.find(item => item.id === activeSection)) {
        return category;
      }
    }
    return sidebarItems[0];
  };

  const getCurrentItem = () => {
    return sidebarItems.flatMap(cat => cat.items).find(item => item.id === activeSection);
  };

  const getNavigation = () => {
    const allItems = sidebarItems.flatMap(cat => cat.items);
    const currentIndex = allItems.findIndex(item => item.id === activeSection);
    return {
      prev: currentIndex > 0 ? allItems[currentIndex - 1] : null,
      next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null
    };
  };

  const nav = getNavigation();

  return (
    <div className={`about-page ${darkMode ? 'dark' : 'light'}`}>
      {/* Navbar */}
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

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[1001] flex items-start justify-center pt-20"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl mx-4 rounded-lg shadow-2xl"
            style={{ backgroundColor: darkMode ? '#242526' : '#ffffff' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b" style={{ borderColor: darkMode ? '#3e3e3e' : '#e3e3e3' }}>
              <div className="flex items-center gap-3">
                <Search size={20} style={{ color: darkMode ? '#b4b4b4' : '#606770' }} />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent border-none outline-none text-lg"
                  style={{ color: darkMode ? '#e3e3e3' : '#1c1e21' }}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded hover:bg-gray-100"
                  style={{ color: darkMode ? '#b4b4b4' : '#606770' }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto p-2">
              {searchQuery.trim() === '' ? (
                <p className="p-4 text-center" style={{ color: darkMode ? '#b4b4b4' : '#606770' }}>
                  Start typing to search...
                </p>
              ) : (
                <>
                  {sidebarItems.flatMap(cat =>
                    cat.items.filter(item =>
                      item.label.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map(item => ({
                      ...item,
                      category: cat.category
                    }))
                  ).length === 0 ? (
                    <p className="p-4 text-center" style={{ color: darkMode ? '#b4b4b4' : '#606770' }}>
                      No results found for "{searchQuery}"
                    </p>
                  ) : (
                    sidebarItems.flatMap(cat =>
                      cat.items.filter(item =>
                        item.label.toLowerCase().includes(searchQuery.toLowerCase())
                      ).map(item => (
                        <button
                          key={item.id}
                          className="w-full text-left p-3 rounded-md transition-colors"
                          style={{
                            color: darkMode ? '#e3e3e3' : '#1c1e21',
                            backgroundColor: 'transparent'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          onClick={() => {
                            setActiveSection(item.id);
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                        >
                          <div className="font-medium">{item.label}</div>
                          <div className="text-sm" style={{ color: darkMode ? '#b4b4b4' : '#606770' }}>
                            {cat.category}
                          </div>
                        </button>
                      ))
                    )
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="about-main">
        {/* Sidebar */}
        <aside className={`about-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <nav className="sidebar-nav">
            <ul className="sidebar-menu">
              {sidebarItems.map((category, catIndex) => (
                <li key={catIndex} className="sidebar-category">
                  <div className="category-header">
                    <span className="category-title">{category.emoji} {category.category}</span>
                  </div>
                  <ul className="category-items">
                    {category.items.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`/docs/${item.id}`}
                          className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveSection(item.id);
                            setSidebarOpen(false);
                          }}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="about-content">
          <div className="content-container">
            {/* Breadcrumbs */}
            <nav className="breadcrumbs" aria-label="Breadcrumbs">
              <ul>
                <li>
                  <a href="/docs/welcome" onClick={(e) => { e.preventDefault(); navigate('/docs/welcome'); }}>
                    <Home size={16} />
                  </a>
                </li>
                <li>
                  <ChevronRight size={14} />
                  <span>{getCurrentCategory().emoji} {getCurrentCategory().category}</span>
                </li>
                <li>
                  <ChevronRight size={14} />
                  <span className="current">{getCurrentItem()?.label}</span>
                </li>
              </ul>
            </nav>

            {/* Article Content */}
            <article className="doc-content">
              {renderContent()}
            </article>

            {/* Pagination */}
            <nav className="pagination-nav">
              {nav.prev && (
                <a
                  href={`/docs/${nav.prev.id}`}
                  className="pagination-link prev"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(nav.prev.id);
                  }}
                >
                  <ArrowLeft size={16} />
                  <div>
                    <div className="sublabel">Previous</div>
                    <div className="label">{nav.prev.label}</div>
                  </div>
                </a>
              )}
              {nav.next && (
                <a
                  href={`/docs/${nav.next.id}`}
                  className="pagination-link next"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(nav.next.id);
                  }}
                >
                  <div>
                    <div className="sublabel">Next</div>
                    <div className="label">{nav.next.label}</div>
                  </div>
                  <ArrowRight size={16} />
                </a>
              )}
            </nav>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="about-footer">
        <div className="footer-container">
          <p>© 2024 - 2025 CanteenDelight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
