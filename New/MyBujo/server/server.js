require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");

const physicalHealthRoutes = require('./routes/physicalHealthRoutes');
const signupRoute          = require('./routes/signup');
const loginRoute           = require('./routes/login');
const userRoute            = require('./routes/user');
const adminRoutes          = require('./routes/admin');
const createAdminAccount   = require('./scripts/admin');

const app = express();

// Body parsing & CORS
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Seed an admin account if needed
createAdminAccount();

// Public / miscellaneous routes
app.use('/api/physicalHealth', physicalHealthRoutes);
app.get('/api/test', (req, res) => res.json({ message: 'Backend is working!' }));

// Auth routes (no token required)
app.use('/user', signupRoute);    // POST /user/register
app.use('/auth', loginRoute);     // POST /auth/login



// Admin-only endpoints (mounted at /api)
//   GET   /api/users/pending
//   PATCH /api/users/:id/approve
app.use('/api', adminRoutes);

// Protected user routes
//   GET  /api/users           → list all users (admin)
//   GET  /api/users/:id       → get one user
//   PUT  /api/users/:id       → update (self or admin)
//   DELETE /api/users/:id     → delete (admin)
app.use('/api/users', userRoute);

// Global error handler (after all routes)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const apiLimiter = rateLimit({
  windowMs: 60*1000,  // 1 minute
  max: 100,           // 100 requests per IP per minute
});
app.use("/api/", apiLimiter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


