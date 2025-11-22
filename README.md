# Canteen Management System

A comprehensive full-stack canteen management application built with **React**, **Node.js**, **Express**, and **MongoDB**. This system provides complete management of orders, menu items, inventory, suppliers, staff, and analytics with role-based access control.

---

## Table of Contents

- [⚠️ For Developers - READ FIRST](#️-for-developers---read-first)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Seeding Sample Data](#seeding-sample-data)
- [User Roles and Access](#user-roles-and-access)
- [Default Login Credentials](#default-login-credentials)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Features Guide](#features-guide)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## ⚠️ For Developers - READ FIRST

### 📚 Essential Documentation

**Before writing ANY code, you MUST read these documents in order:**

1. **[`CODING_STANDARDS.md`](./CODING_STANDARDS.md)** ⚠️ **MANDATORY** - Coding rules and best practices
   - File size limits (<250 lines)
   - Feature folder structure
   - Separation of concerns (UI/Logic/API)
   - Service layer patterns
   - Helper function patterns
   - Anti-patterns to avoid

2. **[`CODEBASE_SUMMARY.md`](./CODEBASE_SUMMARY.md)** - Architecture and refactoring status
   - Current codebase structure
   - Established patterns
   - Refactoring history
   - Examples to follow

3. **[`CLAUDE.md`](./CLAUDE.md)** - Project-specific guidance
   - Development workflow
   - Key architectural decisions
   - Common patterns
   - File locations

### 🎯 Quick Rules

```
✅ DO:
- Keep components <250 lines (main) or <150 lines (sub)
- Put API calls in *Service.js files
- Put business logic in *Helpers.js files
- Use feature folder structure
- Document all functions with JSDoc
- Handle errors at every layer

❌ DON'T:
- Write monolithic 500+ line components
- Inline API calls in components
- Duplicate code across files
- Skip error handling
- Ignore coding standards
```

**Not following these standards = PR rejection**

---

## Features

### Core Functionality
- **Order Management**: Create, track, and manage customer orders with multiple statuses
- **Menu Management**: Add, edit, and manage menu items across categories
- **Inventory Management**: Track stock levels, suppliers, and expiry dates
- **Supplier Management**: Manage supplier information, ratings, and payment terms
- **Staff Management**: User management with role-based access control
- **Activity Logging**: Comprehensive audit trail of all system activities
- **Analytics Dashboard**: Visual insights with charts and statistics
- **Payment Processing**: Handle multiple payment methods and track transactions
- **Discount Management**: Create and manage discount codes
- **Feedback System**: Collect and respond to customer feedback

### Technical Features
- JWT-based authentication
- Google OAuth integration
- Role-based authorization (Admin, Manager, Cashier, Staff, Customer)
- Real-time data updates
- Responsive design with Tailwind CSS
- RESTful API architecture
- MongoDB Atlas cloud database
- Activity logging for audit trails
- Password encryption with bcryptjs

---

## Tech Stack

### Frontend
- **React** 18.x - UI framework
- **React Router DOM** 7.9.5 - Navigation and routing
- **Tailwind CSS** 3.3.3 - Utility-first CSS framework
- **Lucide React** - Icon library
- **Recharts** 2.15.4 - Data visualization
- **Google OAuth** - Social authentication

### Backend
- **Node.js** - Runtime environment
- **Express.js** 4.18.2 - Web framework
- **MongoDB** with **Mongoose** 7.6.3 - Database and ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

---

## Project Structure

```
CanteenNew/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components (modular architecture)
│   │   │   ├── Dashboard/           # Dashboard module
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── WelcomeCard.jsx
│   │   │   │   ├── QuickAccessModules.jsx
│   │   │   │   ├── DashboardStats.jsx
│   │   │   │   ├── RecentActivities.jsx
│   │   │   │   ├── UserInfo.jsx
│   │   │   │   ├── OrderAnalyticsSection.jsx
│   │   │   │   ├── ActivityModal.jsx
│   │   │   │   ├── dashboardHelpers.js
│   │   │   │   ├── useDashboardAnalytics.js
│   │   │   │   └── useDashboardActivities.js
│   │   │   │
│   │   │   ├── Discount/            # Discount module
│   │   │   │   ├── DiscountManagement.jsx
│   │   │   │   ├── DiscountForm.jsx
│   │   │   │   ├── DiscountTabs.jsx
│   │   │   │   ├── ActiveDiscountsTab.jsx
│   │   │   │   ├── AllMenuItemsTab.jsx
│   │   │   │   ├── MostOrderedTab.jsx
│   │   │   │   ├── DiscountHeader.jsx
│   │   │   │   ├── DiscountActionButtons.jsx
│   │   │   │   ├── DiscountFilters.jsx
│   │   │   │   ├── LowStockModal.jsx
│   │   │   │   ├── ExpiringItemsModal.jsx
│   │   │   │   ├── discountHelpers.js
│   │   │   │   ├── discountService.js
│   │   │   │   └── useDiscountFilters.js
│   │   │   │
│   │   │   ├── Staff/               # Staff module
│   │   │   │   ├── StaffManagement.jsx
│   │   │   │   ├── StaffHeader.jsx
│   │   │   │   ├── StaffAnalytics.jsx
│   │   │   │   ├── StaffTable.jsx
│   │   │   │   ├── StaffForm.jsx
│   │   │   │   └── staffHelpers.js
│   │   │   │
│   │   │   ├── Activity/            # Activity Log module
│   │   │   │   ├── ActivityLog.jsx
│   │   │   │   ├── ActivityFilters.jsx
│   │   │   │   ├── ActivityTable.jsx
│   │   │   │   ├── ActivityDetailModal.jsx
│   │   │   │   ├── ActivityPagination.jsx
│   │   │   │   └── activityHelpers.js
│   │   │   │
│   │   │   ├── Supplier/            # Supplier module
│   │   │   │   ├── SupplierManagement.jsx
│   │   │   │   ├── SupplierHeader.jsx
│   │   │   │   ├── SupplierStats.jsx
│   │   │   │   ├── SupplierTable.jsx
│   │   │   │   ├── SupplierForm.jsx
│   │   │   │   └── supplierHelpers.js
│   │   │   │
│   │   │   ├── Menu/                # Menu module
│   │   │   │   ├── MenuManagement.jsx
│   │   │   │   ├── MenuForm.jsx
│   │   │   │   └── MenuAnalytics.jsx
│   │   │   │
│   │   │   ├── Orders/              # Orders module
│   │   │   │   ├── OrderManagement.jsx
│   │   │   │   ├── OrderForm.jsx
│   │   │   │   └── OrderAnalytics.jsx
│   │   │   │
│   │   │   ├── Inventory/           # Inventory module
│   │   │   │   ├── InventoryManagement.jsx
│   │   │   │   ├── InventoryForm.jsx
│   │   │   │   └── InventoryAnalytics.jsx
│   │   │   │
│   │   │   ├── Shared/              # Shared/Reusable components
│   │   │   │   ├── ConfirmationModal.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   ├── OrderFilterBar.jsx
│   │   │   │   ├── MenuFilterBar.jsx
│   │   │   │   └── InventoryFilterBar.jsx
│   │   │   │
│   │   │   ├── DashboardLayout.jsx  # Main layout wrapper
│   │   │   ├── HomePage.jsx         # Public homepage
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Signup.jsx           # Signup page
│   │   │   ├── ProtectedRoute.jsx   # Route guard
│   │   │   └── AccessDeniedPage.jsx # 403 page
│   │   │
│   │   ├── context/         # React Context for state
│   │   │   └── AuthContext.jsx
│   │   ├── config/          # Configuration files
│   │   │   └── api.js       # API base URL config
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── .env                 # Frontend environment variables
│   ├── .gitignore
│   └── package.json
│
├── backend/                  # Node.js backend application
│   ├── models/              # Mongoose schemas
│   │   ├── ActivityLog.js
│   │   ├── Discount.js
│   │   ├── Feedback.js
│   │   ├── Inventory.js
│   │   ├── Menu.js
│   │   ├── Order.js
│   │   ├── Payment.js
│   │   ├── Supplier.js
│   │   └── User.js
│   ├── routes/              # API routes
│   │   ├── activities.js
│   │   ├── auth.js
│   │   ├── discounts.js
│   │   ├── feedback.js
│   │   ├── inventory.js
│   │   ├── menu.js
│   │   ├── orders.js
│   │   ├── payments.js
│   │   ├── suppliers.js
│   │   └── users.js
│   ├── middleware/          # Custom middleware
│   │   ├── auth.js
│   │   └── activityLogger.js
│   ├── seed.js              # Basic seed data
│   ├── seedWeeklyData.js    # Comprehensive weekly data
│   ├── server.js            # Express server entry point
│   ├── .env                 # Backend environment variables
│   ├── .gitignore
│   └── package.json
│
├── .gitignore               # Root gitignore
└── README.md                # This file
```

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB Atlas Account** (free tier available) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

---

## Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd CanteenNew
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## Environment Variables

### Backend Environment Variables

Create `backend/.env` file:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Server Port
PORT=5001

# JWT Secret (use a strong random string)
JWT_SECRET=your_jwt_secret_key

# Google OAuth Client ID (optional)
GOOGLE_CLIENT_ID=your_google_client_id
```

### Frontend Environment Variables

Create `frontend/.env` file:

```env
# Google OAuth Client ID (optional)
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id

# API Base URL (optional, defaults to http://localhost:5001/api)
REACT_APP_API_URL=http://localhost:5001/api
```

### Getting MongoDB URI

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string and replace `<password>` with your database user password
6. Paste into `MONGODB_URI` in `backend/.env`

### Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized JavaScript origins: `http://localhost:3000`
6. Copy Client ID to both backend and frontend `.env` files

---

## Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:5001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App opens on http://localhost:3000
```

### Option 2: Development Mode (with nodemon)

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

---

## Seeding Sample Data

The project includes two seed scripts:

### 1. Basic Seed Data (`scripts/seed.js`)

```bash
cd backend
node scripts/seed.js
```

Creates:
- 5 users (admin, manager, cashier, staff, customer)
- 14 menu items
- 10 inventory items
- 8 sample orders
- 4 suppliers
- 4 discount codes

### 2. Weekly Sample Data (`scripts/seedWeeklyData.js`) - Recommended

```bash
cd backend
node scripts/seedWeeklyData.js
```

Creates:
- 4 users
- 30 menu items (across all categories)
- 22 inventory items
- 4 suppliers
- 4 discount codes
- **150+ orders** spread across 7 days
- **100+ payment records**

**Note:** This will clear existing data before seeding. Use for development/testing only.

---

## User Roles and Access

The system has 5 role types with different access levels:

| Role | Dashboard | Orders | Menu | Inventory | Staff | Suppliers | Activities | Discounts | Feedback | Payments |
|------|-----------|--------|------|-----------|-------|-----------|------------|-----------|----------|----------|
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Manager** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Cashier** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Staff** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Customer** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## Default Login Credentials

After running the seed script, use these credentials to login:

```
Admin:
Email: admin@canteen.com
Password: admin123

Manager:
Email: manager@canteen.com
Password: manager123

Cashier:
Email: cashier@canteen.com
Password: cashier123

Staff:
Email: staff@canteen.com
Password: staff123
```

**⚠️ Important:** Change these passwords in production!

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/verify` - Verify JWT token

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Menu
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Add menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item

### Inventory
- `GET /api/inventory` - Get all inventory items
- `POST /api/inventory` - Add inventory item
- `PUT /api/inventory/:id` - Update inventory item
- `DELETE /api/inventory/:id` - Delete inventory item

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `POST /api/suppliers` - Add supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Users (Staff Management)
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Activities
- `GET /api/activities` - Get activity logs
- `POST /api/activities` - Create activity log

### Payments
- `GET /api/payments` - Get all payments
- `POST /api/payments` - Create payment
- `PUT /api/payments/:id` - Update payment

### Discounts
- `GET /api/discounts` - Get all discounts
- `POST /api/discounts` - Create discount
- `PUT /api/discounts/:id` - Update discount
- `DELETE /api/discounts/:id` - Delete discount

### Feedback
- `GET /api/feedback` - Get all feedback
- `POST /api/feedback` - Submit feedback
- `PUT /api/feedback/:id` - Respond to feedback

**Note:** Most endpoints require JWT authentication via `Authorization: Bearer <token>` header.

---

## Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  googleId: String,
  role: enum ['admin', 'manager', 'cashier', 'staff', 'customer'],
  status: enum ['active', 'inactive'],
  employeeId: String,
  department: enum ['kitchen', 'counter', 'management', 'inventory', 'none']
}
```

### Menu Schema
```javascript
{
  itemName: String,
  category: enum ['snacks', 'beverages', 'meals', 'desserts', 'breakfast'],
  price: Number,
  description: String,
  allergens: String,
  available: Boolean
}
```

### Inventory Schema
```javascript
{
  itemName: String,
  quantity: Number,
  unit: enum ['kg', 'g', 'l', 'ml', 'pcs', 'packets', 'boxes'],
  supplier: String,
  expiryDate: Date,
  batchNumber: String
}
```

### Order Schema
```javascript
{
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  items: [{
    itemName: String,
    quantity: Number,
    price: Number
  }],
  orderType: enum ['online', 'counter', 'dine-in'],
  status: enum ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
  totalAmount: Number
}
```

### Supplier Schema
```javascript
{
  supplierName: String,
  contactPerson: String,
  email: String,
  phone: String,
  address: String,
  supplierType: enum ['food', 'beverages', 'raw-materials', 'packaging', 'equipment', 'other'],
  status: enum ['active', 'inactive'],
  gstNumber: String,
  paymentTerms: enum ['immediate', 'net-7', 'net-15', 'net-30', 'net-60'],
  rating: Number (1-5),
  notes: String
}
```

For complete schemas, see `backend/models/` directory.

---

## Features Guide

### 1. Dashboard
- View key metrics and statistics
- Visual charts for orders, revenue, and inventory
- Quick access to recent activities
- Role-specific widgets

### 2. Order Management
- Create new orders with multiple items
- Track order status (pending → preparing → ready → completed)
- Support for online, counter, and dine-in orders
- Search and filter orders
- Real-time order updates

### 3. Menu Management
- Add/edit/delete menu items
- Organize by categories (breakfast, meals, snacks, beverages, desserts)
- Set prices and descriptions
- Manage allergen information
- Toggle item availability

### 4. Inventory Management
- Track stock levels with units (kg, g, l, ml, pcs, packets, boxes)
- Monitor expiry dates
- Batch number tracking
- Supplier linking (dynamic dropdown)
- Low stock alerts

### 5. Supplier Management
- Comprehensive supplier information
- Contact management
- Rating system (1-5 stars)
- Payment terms tracking
- Supplier type categorization
- Active/inactive status
- Search and filter capabilities

### 6. Staff Management
- User creation with role assignment
- Department allocation
- Employee ID management
- Active/inactive status
- Password management

### 7. Activity Logging
- Comprehensive audit trail
- Track all system changes
- Filter by activity type, user, date
- Detailed activity descriptions
- IP address and metadata tracking

### 8. Analytics
- Visual charts (pie charts, bar charts)
- Revenue tracking
- Order statistics
- Inventory insights
- Supplier distribution

---

## Deployment

### Backend Deployment (e.g., Heroku, Render, Railway)

1. **Prepare for deployment:**
   ```bash
   # Ensure all dependencies are in package.json
   # Set NODE_ENV to production
   ```

2. **Set environment variables** on your hosting platform:
   - `MONGODB_URI`
   - `PORT`
   - `JWT_SECRET`
   - `GOOGLE_CLIENT_ID`

3. **Deploy:**
   ```bash
   git push heroku main
   # or use your platform's deployment method
   ```

### Frontend Deployment (e.g., Vercel, Netlify)

1. **Build the production version:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Set environment variables:**
   - `REACT_APP_GOOGLE_CLIENT_ID`
   - `REACT_APP_API_URL` (your backend URL)

3. **Deploy:**
   - For **Vercel**: `vercel --prod`
   - For **Netlify**: Drag and drop `build/` folder or use CLI

### Important Notes for Production

- ✅ Change default passwords
- ✅ Update JWT_SECRET to a strong random string
- ✅ Enable HTTPS
- ✅ Set up proper CORS origins
- ✅ Configure Google OAuth authorized domains
- ✅ Set up database backups
- ✅ Monitor error logs
- ✅ Implement rate limiting
- ✅ Add security headers

---

## Troubleshooting

### Common Issues

#### "Cannot connect to MongoDB"
- Check if `MONGODB_URI` is correct in `.env`
- Verify MongoDB Atlas whitelist includes your IP
- Ensure database user has proper permissions

#### "Google Login not working"
- Verify `GOOGLE_CLIENT_ID` matches in both frontend and backend
- Check authorized JavaScript origins in Google Cloud Console
- Ensure domain is whitelisted

#### "Port already in use"
- Change `PORT` in `backend/.env`
- Kill process using the port: `npx kill-port 5001`

#### "Module not found"
- Run `npm install` in both backend and frontend directories
- Delete `node_modules` and `package-lock.json`, then reinstall

#### "CORS errors"
- Check backend CORS configuration in `server.js`
- Ensure frontend is accessing correct backend URL

#### "Token expired/invalid"
- Clear browser localStorage
- Login again to get fresh token

### Debug Mode

**Backend:**
```bash
cd backend
DEBUG=* npm start
```

**Frontend:**
```bash
cd frontend
REACT_APP_DEBUG=true npm start
```

---

## Contributing

We welcome contributions! Please follow these steps:

1. **Read the coding standards first:** [`CODING_STANDARDS.md`](./CODING_STANDARDS.md) ⚠️ **MANDATORY**
2. Read the architecture overview: [`CODEBASE_SUMMARY.md`](./CODEBASE_SUMMARY.md)
3. Read the project guidance: [`CLAUDE.md`](./CLAUDE.md)
4. Fork the repository
5. Create a feature branch (`git checkout -b feature/AmazingFeature`)
6. Write code following our standards (components <250 lines, use feature folders)
7. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
8. Push to the branch (`git push origin feature/AmazingFeature`)
9. Open a Pull Request

### 🚨 Code Standards (MANDATORY)

**Before writing ANY code, read [`CODING_STANDARDS.md`](./CODING_STANDARDS.md)**

This document contains:
- ✅ File size limits (<250 lines for components, <150 for sub-components)
- ✅ Feature folder structure patterns
- ✅ Separation of concerns (UI, Logic, API layers)
- ✅ Service layer requirements (all API calls in `*Service.js` files)
- ✅ Helper function patterns (business logic in `*Helpers.js` files)
- ✅ Naming conventions (PascalCase, camelCase rules)
- ✅ Documentation requirements (JSDoc for all functions)
- ✅ Anti-patterns to avoid (what NOT to do)
- ✅ Code review checklist

**PRs that don't follow these standards will be rejected.**

### Quick Standards Summary

```
Component Size:      <250 lines (main), <150 lines (sub)
API Calls:           All in *Service.js files
Business Logic:      All in *Helpers.js files
Documentation:       JSDoc for all functions
Zero Duplication:    Check existing code first
Feature Folders:     Group related files together
Error Handling:      At every layer (UI, Service, API)
```

### Before Submitting PR

- [ ] Read `CODING_STANDARDS.md` completely
- [ ] All components are <250 lines
- [ ] API calls are in service files
- [ ] Business logic is in helper files
- [ ] All functions have JSDoc documentation
- [ ] No code duplication
- [ ] Error handling implemented
- [ ] Build passes without errors
- [ ] Code follows established patterns (see Dashboard/, Staff/, Discount/)

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Contact: your-email@example.com

---

## Acknowledgments

- React Team for the amazing framework
- MongoDB for the database solution
- Tailwind CSS for the utility-first CSS framework
- Lucide for beautiful icons
- All contributors and users

---

## Roadmap

Future enhancements planned:
- [ ] Mobile app (React Native)
- [ ] Real-time notifications (WebSocket)
- [ ] Advanced reporting and analytics
- [ ] Multi-language support
- [ ] QR code ordering
- [ ] Integration with payment gateways
- [ ] Email notifications
- [ ] SMS alerts for orders
- [ ] Advanced inventory forecasting
- [ ] Employee attendance tracking

---

**Built with ❤️ for efficient canteen management**
