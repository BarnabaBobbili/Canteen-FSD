/**
 * Getting Started Content
 * Static content for welcome, about, quick-start, and account-setup sections
 */

export const welcomeContent = [
  {
    type: 'header',
    content: 'Welcome to CanteenDelight'
  },
  {
    type: 'paragraph',
    content: 'Congratulations on choosing CanteenDelight for your canteen management needs!<br />Click 🔍 <strong>Search</strong> at the top right corner of this page to find what you\'re looking for.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Getting Started'
  },
  {
    type: 'paragraph',
    content: 'Not sure what to do first? Follow these steps to get your canteen up and running:'
  },
  {
    type: 'steps',
    items: [
      {
        emoji: '🔹',
        code: 'Step 1',
        label: 'Understand the Platform',
        linkText: 'Learn more about CanteenDelight',
        linkTarget: 'about',
        description: 'and discover how it can transform your canteen operations. Understanding the full capabilities will help you maximize your investment.'
      },
      {
        emoji: '🔹',
        code: 'Step 2',
        label: 'Complete Account Setup',
        linkText: 'Configure your account settings',
        linkTarget: 'account-setup',
        description: ', add your business details, and customize the platform to match your canteen\'s branding and requirements.'
      },
      {
        emoji: '🔹',
        code: 'Step 3',
        label: 'Build Your Menu',
        linkText: 'Add your menu items',
        linkTarget: 'menu-management',
        description: ' with detailed descriptions, prices, categories, and high-quality images. A well-organized menu is the foundation of efficient operations.'
      },
      {
        emoji: '🔹',
        code: 'Step 4',
        label: 'Set Up Inventory',
        linkText: 'Configure your inventory system',
        linkTarget: 'inventory',
        description: ' with all ingredients and supplies. Set up low-stock alerts to ensure you never run out of essential items during peak hours.'
      },
      {
        emoji: '🔹',
        code: 'Step 5',
        label: 'Onboard Your Team',
        linkText: 'Add staff members',
        linkTarget: 'staff',
        description: ' and assign appropriate roles. Train them on using the system for their specific responsibilities.'
      },
      {
        emoji: '🔹',
        code: 'Step 6',
        label: 'Start Operations',
        description: 'Use the ',
        linkText: 'dashboard',
        linkTarget: 'dashboard',
        suffix: ' to manage orders, track payments, monitor inventory, and analyze your business performance in real-time.'
      }
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Best Practices'
  },
  {
    type: 'paragraph',
    content: 'There\'s no one-size-fits-all way to use CanteenDelight. The best system is the one you stick with. Here are some tips for success:'
  },
  {
    type: 'list',
    items: [
      '<strong>Start Simple</strong> - Begin with basic features and gradually explore advanced capabilities',
      '<strong>Regular Updates</strong> - Keep your menu and inventory updated daily for accurate tracking',
      '<strong>Review Analytics</strong> - Check your reports weekly to identify trends and opportunities',
      '<strong>Train Your Team</strong> - Ensure all staff members are comfortable with their modules',
      '<strong>Seek Feedback</strong> - Use customer feedback to continuously improve your service'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Need Help?'
  },
  {
    type: 'paragraph',
    content: 'Explore this Help Center for detailed guides on every feature. If you have any questions at all, <span class="link" data-section="contact">contact our support team</span>. We\'re happy to help any time and typically respond within 24 hours.'
  },
  {
    type: 'paragraph',
    content: 'You can also check our <span class="link" data-section="faq">FAQ section</span> for quick answers to common questions.'
  }
];

export const aboutContent = [
  {
    type: 'header',
    content: 'About CanteenDelight'
  },
  {
    type: 'paragraph',
    content: '<strong>CanteenDelight</strong> is a comprehensive, cloud-based canteen management solution designed to help canteen owners and food service operators streamline their operations, reduce waste, enhance customer satisfaction, and increase profitability.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Our Mission'
  },
  {
    type: 'paragraph',
    content: 'We believe that running a successful canteen shouldn\'t require juggling multiple spreadsheets, manual calculations, and disconnected systems. Our mission is to provide food service operators with an all-in-one platform that simplifies daily operations while providing powerful insights for business growth.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Why Choose CanteenDelight?'
  },
  {
    type: 'paragraph',
    content: 'Managing a canteen involves juggling multiple complex tasks simultaneously - from inventory management and order processing to staff scheduling, financial tracking, and customer satisfaction. Traditional methods using paper records, spreadsheets, and disconnected tools lead to inefficiencies, errors, and missed opportunities.'
  },
  {
    type: 'paragraph',
    content: 'CanteenDelight brings all these functions together in one intuitive, integrated platform that\'s accessible from any device. Whether you\'re at the counter, in the kitchen, or reviewing reports from home, you have complete control over your canteen operations.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Key Benefits'
  },
  {
    type: 'list',
    items: [
      '<strong>Centralized Management</strong> - Control all aspects of your canteen from a single, unified dashboard. No more switching between different apps or losing track of information across multiple systems.',
      '<strong>Real-time Analytics</strong> - Make data-driven decisions with comprehensive reports and visualizations. Understand your sales patterns, identify top-selling items, and spot trends before they become problems.',
      '<strong>Inventory Optimization</strong> - Reduce waste with smart stock tracking, automatic low-stock alerts, expiration date monitoring, and intelligent reorder suggestions based on your sales patterns.',
      '<strong>Seamless Order Processing</strong> - Process orders quickly and accurately with an intuitive interface. Support for multiple order types including counter service, dine-in, and online orders.',
      '<strong>Staff Coordination</strong> - Manage roles, permissions, schedules, and performance metrics. Ensure the right people have access to the right information at the right time.',
      '<strong>Financial Tracking</strong> - Monitor revenue, expenses, and profits in real-time. Track payments, manage discounts, and generate financial reports for accounting and tax purposes.',
      '<strong>Customer Insights</strong> - Understand customer preferences, collect feedback, and build loyalty through personalized service and targeted promotions.',
      '<strong>Mobile Accessibility</strong> - Access your canteen data from anywhere using our responsive web application. Check reports, update menu items, or monitor orders on the go.'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Who is CanteenDelight For?'
  },
  {
    type: 'paragraph',
    content: 'CanteenDelight is designed for any food service operation that wants to modernize their management approach:'
  },
  {
    type: 'list',
    items: [
      '<strong>School and College Canteens</strong> - Manage high-volume, time-sensitive operations during breaks. Handle student accounts, dietary restrictions, and parent notifications.',
      '<strong>Corporate Cafeterias</strong> - Serve employees efficiently with pre-orders, subsidized meals, and department billing. Integrate with employee ID systems.',
      '<strong>Hospital Food Services</strong> - Manage patient meals, dietary requirements, staff cafeteria, and visitor services. Track nutritional information and allergens.',
      '<strong>Factory and Industrial Canteens</strong> - Handle shift-based operations, bulk ordering, and worker meal programs. Support for multiple serving locations.',
      '<strong>Sports Facilities and Event Venues</strong> - Manage high-volume periods during events, multiple service points, and varied menu offerings.',
      '<strong>Residential Complexes</strong> - Provide meal services for apartments, retirement communities, or hostels with resident accounts and subscription models.'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Technology Stack'
  },
  {
    type: 'paragraph',
    content: 'CanteenDelight is built using modern, reliable technologies:'
  },
  {
    type: 'list',
    items: [
      '<strong>Cloud-Based</strong> - No installation required. Access from any browser on any device.',
      '<strong>Secure</strong> - Enterprise-grade security with encrypted data transmission and storage.',
      '<strong>Scalable</strong> - Grows with your business from a single location to multiple outlets.',
      '<strong>Regular Updates</strong> - Continuous improvements and new features without downtime.'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Our Commitment'
  },
  {
    type: 'paragraph',
    content: 'We\'re committed to your success. Our dedicated support team is available to help you get the most out of CanteenDelight. We regularly release updates based on customer feedback and industry best practices. When you choose CanteenDelight, you\'re not just getting software – you\'re gaining a partner in your canteen\'s success.'
  }
];

export const quickStartContent = [
  {
    type: 'header',
    content: 'Quick Start Guide'
  },
  {
    type: 'paragraph',
    content: 'Get your canteen operational with CanteenDelight in under 30 minutes. This guide walks you through the essential setup steps to start processing orders today.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Prerequisites'
  },
  {
    type: 'paragraph',
    content: 'Before you begin, make sure you have:'
  },
  {
    type: 'list',
    items: [
      'A valid email address for account verification',
      'Basic information about your canteen (name, address, contact details)',
      'A list of your menu items with prices',
      'Details of staff members who will use the system'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Step 1: Create Your Account (2 minutes)'
  },
  {
    type: 'paragraph',
    content: 'Visit our signup page and create your account:'
  },
  {
    type: 'list',
    items: [
      'Click "Get Started" on the landing page',
      'Enter your email address and create a secure password (minimum 8 characters with letters and numbers)',
      'Alternatively, sign up with your Google account for faster access',
      'Check your email and click the verification link to activate your account',
      'Complete your profile with your name and contact number'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Step 2: Configure Business Settings (3 minutes)'
  },
  {
    type: 'paragraph',
    content: 'Set up your canteen\'s basic information:'
  },
  {
    type: 'list',
    items: [
      'Navigate to Settings from the sidebar menu',
      'Enter your canteen name, address, and contact information',
      'Set your operating hours for each day of the week',
      'Configure your currency and tax settings',
      'Upload your canteen logo for branding (optional but recommended)',
      'Set your receipt footer message'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Step 3: Add Menu Items (10 minutes)'
  },
  {
    type: 'paragraph',
    content: 'Build your menu with all available items:'
  },
  {
    type: 'list',
    items: [
      'Go to Menu Management from the sidebar',
      'Click "Add New Item" to create your first menu item',
      'For each item, enter:<ul><li>Item name (e.g., "Chicken Sandwich")</li><li>Description (ingredients, preparation method)</li><li>Category (Breakfast, Lunch, Snacks, Beverages, Desserts)</li><li>Price</li><li>Preparation time (helps with kitchen management)</li><li>Upload an appetizing photo (recommended for customer-facing menus)</li></ul>',
      'Set availability status (available/unavailable)',
      'Add any dietary tags (vegetarian, vegan, gluten-free, etc.)',
      'Repeat for all menu items - you can use the "Duplicate" feature for similar items'
    ]
  },
  {
    type: 'paragraph',
    content: '<strong>Pro Tip:</strong> Start with your top 20 best-selling items first, then add others later.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Step 4: Set Up Inventory (5 minutes)'
  },
  {
    type: 'paragraph',
    content: 'Configure inventory tracking for better stock management:'
  },
  {
    type: 'list',
    items: [
      'Navigate to Inventory Management',
      'Add your key ingredients and supplies',
      'For each item, specify:<ul><li>Item name</li><li>Current quantity</li><li>Unit of measurement (kg, liters, pieces, etc.)</li><li>Low stock threshold (when to receive alerts)</li><li>Supplier information (optional)</li><li>Cost per unit (for profit calculations)</li></ul>',
      'Set up expiration date tracking for perishables'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Step 5: Add Staff Members (5 minutes)'
  },
  {
    type: 'paragraph',
    content: 'Invite your team to the platform:'
  },
  {
    type: 'list',
    items: [
      'Go to Staff Management',
      'Click "Add Staff Member"',
      'Enter their email address and assign a role:<ul><li><strong>Manager</strong> - Full access to operations, reports, and staff management</li><li><strong>Cashier</strong> - Order processing, payments, and basic reports</li><li><strong>Kitchen Staff</strong> - View orders, update preparation status</li></ul>',
      'They\'ll receive an email invitation to create their password',
      'Conduct a brief training session for each role'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Step 6: Process Your First Order (2 minutes)'
  },
  {
    type: 'paragraph',
    content: 'You\'re ready to start operations:'
  },
  {
    type: 'list',
    items: [
      'Go to Orders from the sidebar or use the Cashier Dashboard',
      'Click "New Order"',
      'Select menu items and quantities',
      'Apply any discounts if applicable',
      'Choose payment method (cash, card, UPI, etc.)',
      'Complete the order and print/send receipt',
      'Monitor the order status as it moves through preparation'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'What\'s Next?'
  },
  {
    type: 'paragraph',
    content: 'Now that you\'re operational, explore these features to optimize your canteen:'
  },
  {
    type: 'list',
    items: [
      '<span class="link" data-section="analytics">Set up reports</span> to track your daily performance',
      '<span class="link" data-section="discounts">Create discounts</span> for promotions and special offers',
      '<span class="link" data-section="payments">Configure payment methods</span> you accept',
      'Review the <span class="link" data-section="dashboard">dashboard features</span> for daily monitoring'
    ]
  },
  {
    type: 'paragraph',
    content: '<strong>Need help?</strong> Our support team is ready to assist you. <span class="link" data-section="contact">Contact us</span> anytime!'
  }
];

export const accountSetupContent = [
  {
    type: 'header',
    content: 'Account Setup'
  },
  {
    type: 'paragraph',
    content: 'Properly configuring your account ensures smooth operations and accurate reporting. This guide covers all account settings and customization options.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Profile Settings'
  },
  {
    type: 'paragraph',
    content: 'Your personal profile information:'
  },
  {
    type: 'list',
    items: [
      '<strong>Full Name</strong> - Your name as displayed in the system',
      '<strong>Email Address</strong> - Used for login and notifications (verified during signup)',
      '<strong>Phone Number</strong> - For account recovery and optional SMS notifications',
      '<strong>Profile Picture</strong> - Helps team members identify accounts',
      '<strong>Password</strong> - Change periodically for security (minimum 8 characters)',
      '<strong>Two-Factor Authentication</strong> - Add extra security with SMS or authenticator app'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Business Information'
  },
  {
    type: 'paragraph',
    content: 'Configure your canteen\'s details:'
  },
  {
    type: 'list',
    items: [
      '<strong>Canteen Name</strong> - Displayed on receipts, reports, and customer-facing pages',
      '<strong>Business Address</strong> - Full address including city, state, and postal code',
      '<strong>Contact Numbers</strong> - Primary and secondary phone numbers',
      '<strong>Email Address</strong> - Business email for customer communications',
      '<strong>Website/Social Media</strong> - Links displayed on receipts (optional)',
      '<strong>Business Registration</strong> - Tax ID, GST number, or other registration details',
      '<strong>Logo</strong> - Upload your canteen logo (recommended size: 200x200 pixels)'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Operating Hours'
  },
  {
    type: 'paragraph',
    content: 'Set your service hours for each day:'
  },
  {
    type: 'list',
    items: [
      'Configure opening and closing times for each day of the week',
      'Set different hours for different services (breakfast, lunch, dinner)',
      'Mark holidays and special closures in advance',
      'Enable/disable ordering outside operating hours',
      'Set preparation cutoff times for advance orders'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Regional Settings'
  },
  {
    type: 'paragraph',
    content: 'Localize the platform for your region:'
  },
  {
    type: 'list',
    items: [
      '<strong>Currency</strong> - Select your local currency (INR, USD, EUR, etc.)',
      '<strong>Date Format</strong> - DD/MM/YYYY or MM/DD/YYYY',
      '<strong>Time Format</strong> - 12-hour or 24-hour',
      '<strong>Timezone</strong> - Ensures accurate timestamps on all records',
      '<strong>Language</strong> - Interface language preference',
      '<strong>First Day of Week</strong> - Sunday or Monday (affects weekly reports)'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Tax Configuration'
  },
  {
    type: 'paragraph',
    content: 'Set up tax calculations:'
  },
  {
    type: 'list',
    items: [
      'Enable/disable tax on orders',
      'Configure tax percentage (GST, VAT, sales tax)',
      'Set up multiple tax rates if needed (e.g., different rates for food vs. beverages)',
      'Choose whether prices are inclusive or exclusive of tax',
      'Configure tax display on receipts',
      'Set up tax exemptions for specific items or customer types'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Receipt Customization'
  },
  {
    type: 'paragraph',
    content: 'Customize how receipts appear:'
  },
  {
    type: 'list',
    items: [
      'Add custom header message (e.g., "Welcome to [Canteen Name]!")',
      'Add footer message (e.g., "Thank you for dining with us!")',
      'Include/exclude specific fields (order number, date, time, server name)',
      'Add promotional messages or upcoming offers',
      'Configure receipt format (thermal printer, A4, digital)',
      'Set up automatic email receipts for customers'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Notification Preferences'
  },
  {
    type: 'paragraph',
    content: 'Control how you receive alerts:'
  },
  {
    type: 'list',
    items: [
      '<strong>Email Notifications</strong> - Daily summaries, low stock alerts, large orders',
      '<strong>In-App Notifications</strong> - Real-time alerts within the dashboard',
      '<strong>SMS Alerts</strong> - Critical notifications like payment issues (if enabled)',
      'Set quiet hours when notifications are muted',
      'Choose notification frequency (immediate, hourly digest, daily summary)'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Security Settings'
  },
  {
    type: 'paragraph',
    content: 'Protect your account and data:'
  },
  {
    type: 'list',
    items: [
      'Enable two-factor authentication (highly recommended)',
      'Review active sessions and sign out from unused devices',
      'Set session timeout duration',
      'Configure IP restrictions (enterprise feature)',
      'Review login history for suspicious activity',
      'Set up account recovery options'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Data Management'
  },
  {
    type: 'paragraph',
    content: 'Control your canteen data:'
  },
  {
    type: 'list',
    items: [
      'Export data in various formats (CSV, Excel, PDF)',
      'Configure automatic backups',
      'Set data retention policies',
      'Download complete data archive',
      'Transfer ownership (for business changes)'
    ]
  }
];
