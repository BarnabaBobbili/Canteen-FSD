const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
// CORS Configuration - Allow frontend access from multiple origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/canteen_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Import Routes
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const menuRoutes = require('./routes/menu');
const inventoryRoutes = require('./routes/inventory');
const suppliersRoutes = require('./routes/suppliers');
const discountsRoutes = require('./routes/discounts');
const feedbackRoutes = require('./routes/feedback');
const paymentsRoutes = require('./routes/payments');
const paymentRoutes = require('./routes/payment');
const activitiesRoutes = require('./routes/activities');
const dishRatingsRoutes = require('./routes/dishRatings');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/suppliers', suppliersRoutes);
app.use('/api/discounts', discountsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/dish-ratings', dishRatingsRoutes);

// Root Route
app.get('/', (req, res) => {
  res.json({ message: 'Smart Canteen Management API is running!' });
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});