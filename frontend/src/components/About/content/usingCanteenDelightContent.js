/**
 * Using CanteenDelight Content
 * Static content for dashboard, menu-management, order-processing, and inventory sections
 */

export const dashboardContent = [
  {
    type: 'header',
    content: 'Dashboard Overview'
  },
  {
    type: 'paragraph',
    content: 'The dashboard is your command center for monitoring all canteen activities at a glance. It provides real-time insights, quick actions, and alerts to help you stay on top of your operations throughout the day.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Dashboard Layout'
  },
  {
    type: 'paragraph',
    content: 'The dashboard is organized into several key sections:'
  },
  {
    type: 'list',
    items: [
      '<strong>Top Navigation</strong> - Quick access to notifications, settings, and your profile',
      '<strong>Key Metrics Cards</strong> - At-a-glance view of important numbers',
      '<strong>Charts and Graphs</strong> - Visual representation of trends and patterns',
      '<strong>Quick Actions</strong> - Buttons for common tasks',
      '<strong>Recent Activity</strong> - Latest orders, activities, and alerts',
      '<strong>Alerts Panel</strong> - Low stock warnings, expiring items, pending tasks'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Key Metrics'
  },
  {
    type: 'paragraph',
    content: 'The metrics cards display crucial information updated in real-time:'
  },
  {
    type: 'list',
    items: [
      '<strong>Today\'s Revenue</strong> - Total sales amount for the current day, with comparison to yesterday and same day last week. Click to see hourly breakdown.',
      '<strong>Total Orders</strong> - Number of orders processed today, categorized by status (completed, pending, cancelled). Shows average order value.',
      '<strong>Popular Items</strong> - Top 5 best-selling items today with quantities. Helps you anticipate demand and manage inventory.',
      '<strong>Active Staff</strong> - Currently logged-in staff members and their roles. Shows their current activity status.',
      '<strong>Low Stock Items</strong> - Count of inventory items below threshold. Click to view full list and reorder.',
      '<strong>Pending Payments</strong> - Unpaid orders or delayed payments requiring attention.'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Analytics Charts'
  },
  {
    type: 'paragraph',
    content: 'Visual insights to understand your business:'
  },
  {
    type: 'list',
    items: [
      '<strong>Sales Trend</strong> - Line chart showing sales over the past 7 days, 30 days, or custom period',
      '<strong>Order Distribution</strong> - Pie chart breaking down orders by type (dine-in, takeaway, delivery)',
      '<strong>Peak Hours</strong> - Bar chart showing busiest times of day, helping with staff scheduling',
      '<strong>Category Performance</strong> - Revenue breakdown by menu category',
      '<strong>Payment Methods</strong> - Distribution of cash, card, UPI, and other payment types'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Quick Actions'
  },
  {
    type: 'paragraph',
    content: 'Access common tasks directly from the dashboard with one click:'
  },
  {
    type: 'list',
    items: [
      '<strong>New Order</strong> - Open the order creation screen',
      '<strong>Update Menu</strong> - Quickly toggle item availability',
      '<strong>Add Inventory</strong> - Record incoming stock',
      '<strong>View Reports</strong> - Access the reports section',
      '<strong>Process Payment</strong> - Handle pending payments',
      '<strong>Send Notification</strong> - Broadcast message to staff'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Recent Activity Feed'
  },
  {
    type: 'paragraph',
    content: 'Stay informed with a chronological list of recent events:'
  },
  {
    type: 'list',
    items: [
      'New orders placed with customer details and items',
      'Order status changes (preparing, ready, completed)',
      'Payments received with method and amount',
      'Menu updates (price changes, availability)',
      'Inventory adjustments (stock in, stock out, wastage)',
      'Staff login/logout activities',
      'System alerts and notifications'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Alerts and Notifications'
  },
  {
    type: 'paragraph',
    content: 'Critical items requiring your attention:'
  },
  {
    type: 'list',
    items: [
      '<strong>Low Stock Alerts</strong> - Items below minimum threshold with reorder suggestions',
      '<strong>Expiring Items</strong> - Inventory approaching expiration dates',
      '<strong>Pending Orders</strong> - Orders waiting longer than expected',
      '<strong>Failed Payments</strong> - Transactions that need resolution',
      '<strong>Staff Alerts</strong> - Clock-in reminders, overtime warnings',
      '<strong>System Updates</strong> - New features, maintenance windows'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Customizing Your Dashboard'
  },
  {
    type: 'paragraph',
    content: 'Personalize the dashboard to show what matters most:'
  },
  {
    type: 'list',
    items: [
      'Rearrange widgets by dragging and dropping',
      'Show/hide specific metrics cards',
      'Set default date ranges for charts',
      'Configure refresh intervals',
      'Save multiple dashboard layouts for different purposes',
      'Set up dashboard as your browser homepage'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Role-Based Dashboards'
  },
  {
    type: 'paragraph',
    content: 'Different users see relevant information for their role:'
  },
  {
    type: 'list',
    items: [
      '<strong>Admin/Owner</strong> - Full dashboard with all metrics, financial data, and staff performance',
      '<strong>Manager</strong> - Operational metrics, inventory alerts, staff activities',
      '<strong>Cashier</strong> - Order queue, payment summary, quick order creation',
      '<strong>Kitchen Staff</strong> - Pending orders, preparation queue, item availability'
    ]
  }
];

export const menuManagementContent = [
  {
    type: 'header',
    content: 'Menu Management'
  },
  {
    type: 'paragraph',
    content: 'The Menu Management module is the heart of your canteen operations. Here you\'ll create, organize, and maintain all the items you offer to customers. A well-structured menu ensures smooth ordering, accurate reporting, and better customer experience.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Understanding Menu Structure'
  },
  {
    type: 'paragraph',
    content: 'CanteenDelight organizes your menu hierarchically:'
  },
  {
    type: 'list',
    items: [
      '<strong>Categories</strong> - Top-level groupings (Breakfast, Lunch, Snacks, Beverages, Desserts)',
      '<strong>Items</strong> - Individual products within categories',
      '<strong>Variants</strong> - Size or type options for an item (Small/Medium/Large)',
      '<strong>Add-ons</strong> - Optional extras customers can add (Extra cheese, toppings)'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Adding Menu Items'
  },
  {
    type: 'paragraph',
    content: 'Create comprehensive menu items with all necessary details:'
  },
  {
    type: 'heading',
    level: 3,
    content: 'Basic Information'
  },
  {
    type: 'list',
    items: [
      '<strong>Item Name</strong> - Clear, descriptive name (e.g., "Grilled Chicken Sandwich")',
      '<strong>Short Code</strong> - Quick identifier for POS entry (e.g., "GCS")',
      '<strong>Description</strong> - Appetizing description with key ingredients and preparation method',
      '<strong>Category</strong> - Select the appropriate category for organization'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Pricing'
  },
  {
    type: 'list',
    items: [
      '<strong>Base Price</strong> - Standard selling price',
      '<strong>Cost Price</strong> - Your cost to prepare (for profit calculations)',
      '<strong>Tax Rate</strong> - Applicable tax percentage (or use default)',
      '<strong>Variant Prices</strong> - Different prices for different sizes/options'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Media'
  },
  {
    type: 'list',
    items: [
      '<strong>Primary Image</strong> - High-quality photo of the item (recommended 800x600 pixels)',
      '<strong>Gallery</strong> - Additional images showing different angles or variants',
      'Images should be well-lit, appetizing, and accurately represent the item'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Availability Settings'
  },
  {
    type: 'list',
    items: [
      '<strong>Available Status</strong> - Toggle on/off based on current availability',
      '<strong>Time-based Availability</strong> - Available only during specific hours (e.g., breakfast items until 11 AM)',
      '<strong>Day-based Availability</strong> - Available only on certain days (e.g., weekend specials)',
      '<strong>Stock-based</strong> - Automatically mark unavailable when linked inventory is depleted'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Additional Details'
  },
  {
    type: 'list',
    items: [
      '<strong>Preparation Time</strong> - Estimated time to prepare (helps manage customer expectations)',
      '<strong>Dietary Tags</strong> - Vegetarian, Vegan, Gluten-free, Dairy-free, Nut-free, Halal, Kosher',
      '<strong>Allergen Information</strong> - Contains nuts, dairy, gluten, shellfish, etc.',
      '<strong>Nutritional Info</strong> - Calories, protein, carbs, fat (optional)',
      '<strong>Spice Level</strong> - Mild, Medium, Hot, Extra Hot',
      '<strong>Serving Size</strong> - Portion description (e.g., "Serves 1", "350ml")'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Managing Categories'
  },
  {
    type: 'paragraph',
    content: 'Organize your menu logically for easy navigation:'
  },
  {
    type: 'list',
    items: [
      'Create custom categories that match your menu structure',
      'Set display order to control how categories appear',
      'Assign category colors for quick visual identification',
      'Add category images for customer-facing menus',
      'Set category-level availability (e.g., disable entire breakfast category after 11 AM)',
      'Suggested categories: Breakfast, Lunch, Dinner, Snacks, Beverages, Desserts, Combos, Specials'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Variants and Modifiers'
  },
  {
    type: 'paragraph',
    content: 'Handle item variations without creating duplicate entries:'
  },
  {
    type: 'heading',
    level: 3,
    content: 'Size Variants'
  },
  {
    type: 'list',
    items: [
      'Small, Medium, Large, Extra Large',
      'Each variant can have different prices',
      'Set default variant for quick ordering'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Add-ons and Extras'
  },
  {
    type: 'list',
    items: [
      'Create optional add-ons (extra cheese, bacon, avocado)',
      'Set add-on prices',
      'Limit number of add-ons if needed',
      'Group add-ons by type'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Customizations'
  },
  {
    type: 'list',
    items: [
      'Allow special instructions',
      'Required choices (e.g., bread type for sandwich)',
      'Multiple selection options'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Bulk Operations'
  },
  {
    type: 'paragraph',
    content: 'Save time by updating multiple items at once:'
  },
  {
    type: 'list',
    items: [
      '<strong>Bulk Price Update</strong> - Increase/decrease prices by percentage or fixed amount',
      '<strong>Bulk Availability</strong> - Toggle availability for multiple items',
      '<strong>Bulk Category Change</strong> - Move items between categories',
      '<strong>Bulk Delete</strong> - Remove multiple items (with confirmation)',
      '<strong>Import from CSV</strong> - Add many items from a spreadsheet',
      '<strong>Export Menu</strong> - Download your full menu for backup or analysis'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Menu Analytics'
  },
  {
    type: 'paragraph',
    content: 'Understand how your menu performs:'
  },
  {
    type: 'list',
    items: [
      'View sales by item (quantity and revenue)',
      'Identify top performers and underperformers',
      'Analyze profit margins by item',
      'Track price change impacts',
      'See item combinations frequently ordered together',
      'Monitor seasonal trends'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Best Practices'
  },
  {
    type: 'list',
    items: [
      'Keep item names clear and consistent',
      'Use high-quality images that accurately represent items',
      'Update availability in real-time to avoid customer disappointment',
      'Review menu performance monthly and adjust offerings',
      'Consider seasonal items and limited-time offers',
      'Ensure accurate allergen and dietary information',
      'Price items strategically based on cost and demand'
    ]
  }
];

export const orderProcessingContent = [
  {
    type: 'header',
    content: 'Order Processing'
  },
  {
    type: 'paragraph',
    content: 'Efficient order processing is critical to customer satisfaction and operational success. CanteenDelight provides a streamlined workflow from order placement to completion, ensuring accuracy and speed during peak hours.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Order Types'
  },
  {
    type: 'paragraph',
    content: 'CanteenDelight supports multiple order types to match your service model:'
  },
  {
    type: 'list',
    items: [
      '<strong>Counter Orders</strong> - Customers order directly at the counter, ideal for quick-service canteens',
      '<strong>Dine-in Orders</strong> - Table service with table number tracking and split bill support',
      '<strong>Takeaway Orders</strong> - Pre-packaged orders for customers to take with them',
      '<strong>Pre-orders</strong> - Orders placed in advance for a specific pickup time',
      '<strong>Online Orders</strong> - Orders placed through your customer-facing portal'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Creating a New Order'
  },
  {
    type: 'paragraph',
    content: 'Step-by-step process for creating orders:'
  },
  {
    type: 'heading',
    level: 3,
    content: 'Step 1: Start New Order'
  },
  {
    type: 'list',
    items: [
      'Click "New Order" from dashboard or Orders page',
      'Select order type (counter, dine-in, takeaway)',
      'For dine-in, enter table number',
      'Add customer details if available (optional for counter orders)'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Step 2: Add Items'
  },
  {
    type: 'list',
    items: [
      'Browse categories or use search to find items',
      'Click item to add to order',
      'Select variants if available (size, options)',
      'Add any extras or add-ons',
      'Adjust quantity using +/- buttons',
      'Add special instructions if needed',
      'Use item codes for faster entry (trained staff)'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Step 3: Review Order'
  },
  {
    type: 'list',
    items: [
      'Verify all items and quantities',
      'Check subtotal and taxes',
      'Apply discounts if applicable',
      'Confirm total amount with customer'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Step 4: Process Payment'
  },
  {
    type: 'list',
    items: [
      'Select payment method (Cash, Card, UPI, Wallet)',
      'For cash, enter amount received and calculate change',
      'For digital payments, wait for confirmation',
      'Split payment across multiple methods if needed'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Step 5: Complete Order'
  },
  {
    type: 'list',
    items: [
      'Confirm payment received',
      'Print receipt (or send digital receipt)',
      'Give token number to customer',
      'Order is automatically sent to kitchen display'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Order Status Workflow'
  },
  {
    type: 'paragraph',
    content: 'Orders progress through defined statuses:'
  },
  {
    type: 'list',
    items: [
      '<strong>Pending</strong> - Order placed, waiting for kitchen acknowledgment',
      '<strong>Confirmed</strong> - Kitchen has received and accepted the order',
      '<strong>Preparing</strong> - Kitchen is actively preparing the order',
      '<strong>Ready</strong> - Order is complete and ready for pickup/serving',
      '<strong>Completed</strong> - Order delivered to customer',
      '<strong>Cancelled</strong> - Order cancelled (with reason logged)'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Order Queue Management'
  },
  {
    type: 'paragraph',
    content: 'Manage multiple orders efficiently:'
  },
  {
    type: 'list',
    items: [
      'View all active orders in a queue or grid view',
      'Filter by status, order type, or time',
      'Sort by oldest first to ensure FIFO processing',
      'Color-coded status indicators for quick scanning',
      'Time elapsed indicators to spot delayed orders',
      'Priority flagging for urgent orders'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Kitchen Display System (KDS)'
  },
  {
    type: 'paragraph',
    content: 'Paperless order management for kitchen staff:'
  },
  {
    type: 'list',
    items: [
      'Orders appear automatically on kitchen screens',
      'Large, clear display of items and quantities',
      'Special instructions highlighted',
      'One-touch status updates (start, complete)',
      'Timer shows how long order has been in progress',
      'Bump orders when complete',
      'Recall completed orders if needed'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Modifying Orders'
  },
  {
    type: 'paragraph',
    content: 'Handle changes to existing orders:'
  },
  {
    type: 'list',
    items: [
      '<strong>Add Items</strong> - Add more items to pending/preparing orders',
      '<strong>Remove Items</strong> - Remove items before preparation starts',
      '<strong>Modify Quantities</strong> - Increase or decrease item counts',
      '<strong>Change Variants</strong> - Switch size or options',
      '<strong>Update Instructions</strong> - Add or modify special requests',
      'All modifications are logged for accountability'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Cancelling Orders'
  },
  {
    type: 'paragraph',
    content: 'Process when an order needs to be cancelled:'
  },
  {
    type: 'list',
    items: [
      'Select order and click "Cancel Order"',
      'Choose cancellation reason (customer request, out of stock, etc.)',
      'Specify refund method if payment was made',
      'Notification sent to kitchen if preparation started',
      'Cancellation logged with timestamp and user',
      'Inventory is restored if items were reserved'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Handling Special Requests'
  },
  {
    type: 'paragraph',
    content: 'Accommodate customer preferences:'
  },
  {
    type: 'list',
    items: [
      'Free-text special instructions field',
      'Common modifications as quick buttons',
      'Allergy warnings prominently displayed',
      'Dietary requirement filters',
      'Kitchen receives all notes clearly'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Order Notifications'
  },
  {
    type: 'paragraph',
    content: 'Keep everyone informed:'
  },
  {
    type: 'list',
    items: [
      '<strong>Kitchen alerts</strong> - New order notification with sound',
      '<strong>Customer notification</strong> - SMS/email when order is ready (if enabled)',
      '<strong>Delay alerts</strong> - Notification if order exceeds expected time',
      '<strong>Cashier alerts</strong> - Payment and pickup notifications'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Order History'
  },
  {
    type: 'paragraph',
    content: 'Access past orders for reference:'
  },
  {
    type: 'list',
    items: [
      'Search orders by number, customer, date, or item',
      'View complete order details and timeline',
      'Reorder functionality for repeat customers',
      'Print duplicate receipts',
      'Export order data for analysis'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Best Practices for Efficient Order Processing'
  },
  {
    type: 'list',
    items: [
      'Train staff thoroughly on the POS system',
      'Use keyboard shortcuts for common actions',
      'Keep popular items accessible in quick-select',
      'Monitor queue length during peak hours',
      'Clear completed orders promptly from displays',
      'Review cancelled orders to identify patterns',
      'Set realistic preparation times'
    ]
  }
];

export const inventoryContent = [
  {
    type: 'header',
    content: 'Inventory Tracking'
  },
  {
    type: 'paragraph',
    content: 'Effective inventory management is crucial for controlling costs, reducing waste, and ensuring you never run out of popular items. CanteenDelight provides comprehensive tools to track, manage, and optimize your inventory.'
  },
  {
    type: 'heading',
    level: 2,
    content: 'Inventory Overview'
  },
  {
    type: 'paragraph',
    content: 'The inventory dashboard shows:'
  },
  {
    type: 'list',
    items: [
      'Total inventory value at cost',
      'Number of items tracked',
      'Low stock alerts count',
      'Expiring soon items',
      'Recent stock movements',
      'Top consumed items this week'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Adding Inventory Items'
  },
  {
    type: 'paragraph',
    content: 'Create detailed records for each inventory item:'
  },
  {
    type: 'heading',
    level: 3,
    content: 'Basic Information'
  },
  {
    type: 'list',
    items: [
      '<strong>Item Name</strong> - Clear, searchable name (e.g., "Chicken Breast - Boneless")',
      '<strong>SKU/Code</strong> - Unique identifier for tracking',
      '<strong>Category</strong> - Group by type (Proteins, Vegetables, Dairy, Dry Goods, Beverages, Packaging)',
      '<strong>Description</strong> - Additional details, specifications'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Stock Details'
  },
  {
    type: 'list',
    items: [
      '<strong>Current Quantity</strong> - Amount currently in stock',
      '<strong>Unit of Measurement</strong> - kg, g, L, mL, pieces, packets, boxes, etc.',
      '<strong>Minimum Stock Level</strong> - Threshold for low stock alerts',
      '<strong>Maximum Stock Level</strong> - Upper limit to prevent over-ordering',
      '<strong>Reorder Quantity</strong> - Suggested amount to order when low'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Cost Information'
  },
  {
    type: 'list',
    items: [
      '<strong>Purchase Price</strong> - Cost per unit from supplier',
      '<strong>Last Purchase Date</strong> - When you last bought this item',
      '<strong>Price History</strong> - Track price changes over time'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Supplier Details'
  },
  {
    type: 'list',
    items: [
      '<strong>Primary Supplier</strong> - Link to supplier record',
      '<strong>Alternative Suppliers</strong> - Backup options',
      '<strong>Lead Time</strong> - Days between order and delivery',
      '<strong>Minimum Order Quantity</strong> - Supplier\'s minimum'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Expiration Tracking'
  },
  {
    type: 'list',
    items: [
      '<strong>Expiration Date</strong> - For perishable items',
      '<strong>Shelf Life</strong> - Typical duration item stays fresh',
      '<strong>Alert Days Before</strong> - When to receive expiration warning',
      '<strong>Storage Instructions</strong> - Refrigerate, freeze, room temperature'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Stock Movements'
  },
  {
    type: 'paragraph',
    content: 'Track all inventory changes:'
  },
  {
    type: 'heading',
    level: 3,
    content: 'Stock In (Receiving)'
  },
  {
    type: 'list',
    items: [
      'Record incoming inventory from suppliers',
      'Enter quantity, unit cost, and expiration dates',
      'Link to purchase orders if created',
      'Note quality issues or discrepancies',
      'Update running stock automatically'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Stock Out (Usage)'
  },
  {
    type: 'list',
    items: [
      '<strong>Sales Consumption</strong> - Automatic deduction based on orders (if recipe configured)',
      '<strong>Manual Consumption</strong> - Record usage not linked to orders',
      '<strong>Wastage</strong> - Record spoilage, damage, or expired items with reasons',
      '<strong>Transfer</strong> - Move stock between locations (if multi-location)'
    ]
  },
  {
    type: 'heading',
    level: 3,
    content: 'Stock Adjustments'
  },
  {
    type: 'list',
    items: [
      'Correct discrepancies found during stock takes',
      'Record reasons for adjustments',
      'Adjustment history maintained for auditing'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Stock Takes (Physical Inventory)'
  },
  {
    type: 'paragraph',
    content: 'Regularly verify physical stock against system:'
  },
  {
    type: 'list',
    items: [
      'Schedule stock takes (daily, weekly, monthly)',
      'Generate stock take sheets',
      'Enter actual counts',
      'System calculates variances automatically',
      'Review and approve adjustments',
      'Identify shrinkage patterns'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Low Stock Management'
  },
  {
    type: 'paragraph',
    content: 'Never run out of essential items:'
  },
  {
    type: 'list',
    items: [
      '<strong>Automatic Alerts</strong> - Notification when stock falls below minimum',
      '<strong>Alert Dashboard</strong> - View all low stock items in one place',
      '<strong>Quick Reorder</strong> - Generate purchase order with suggested quantities',
      '<strong>Supplier Auto-notify</strong> - Send reorder requests to suppliers (if configured)',
      '<strong>Menu Impact</strong> - See which menu items are affected by low stock'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Expiration Management'
  },
  {
    type: 'paragraph',
    content: 'Minimize waste from expired items:'
  },
  {
    type: 'list',
    items: [
      'View items expiring in next 7 days',
      'FIFO (First In, First Out) tracking',
      'Receive advance alerts based on your settings',
      'Create discounts on expiring items to promote sales',
      'Record expired items as wastage',
      'Analyze expiration patterns to adjust ordering'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Recipe Management'
  },
  {
    type: 'paragraph',
    content: 'Link menu items to inventory for automatic tracking:'
  },
  {
    type: 'list',
    items: [
      'Create recipes with ingredient quantities',
      'When order is placed, ingredients are reserved/deducted',
      'Calculate accurate food costs',
      'Auto-detect when you can\'t fulfill orders due to stock',
      'Plan production based on ingredient availability'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Inventory Reports'
  },
  {
    type: 'paragraph',
    content: 'Gain insights into your inventory:'
  },
  {
    type: 'list',
    items: [
      '<strong>Stock Value Report</strong> - Total inventory value by category',
      '<strong>Movement Report</strong> - All stock ins/outs for a period',
      '<strong>Consumption Report</strong> - Usage patterns and trends',
      '<strong>Wastage Report</strong> - Losses by reason and category',
      '<strong>Variance Report</strong> - Differences between system and physical counts',
      '<strong>Reorder Report</strong> - Items needing replenishment',
      '<strong>Supplier Report</strong> - Purchase history by supplier'
    ]
  },
  {
    type: 'heading',
    level: 2,
    content: 'Best Practices'
  },
  {
    type: 'list',
    items: [
      'Conduct regular stock takes (at least weekly for perishables)',
      'Set realistic minimum stock levels based on lead times and sales velocity',
      'Use FIFO method for all perishables',
      'Record wastage immediately with accurate reasons',
      'Review consumption reports to optimize ordering',
      'Train all staff on proper inventory handling',
      'Keep storage areas organized and labeled',
      'Build relationships with reliable suppliers',
      'Monitor price trends and negotiate better rates'
    ]
  }
];
