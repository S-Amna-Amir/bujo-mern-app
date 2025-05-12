require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const physicalHealthRoutes = require('./routes/physicalHealthRoutes');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const bodyParser = require('body-parser');
const createAdminAccount = require("./scripts/admin");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/physicalHealth', physicalHealthRoutes);

app.get('/api/test', (req, res) => 
{
  res.json({ message: 'Backend is working!' });
});

app.use((err, req, res, next) => 
{
  res.status(500).json({ error: err.message });
});

createAdminAccount();

app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", userRoute); 
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
{
  console.log(`Server running on port ${PORT}`);
});