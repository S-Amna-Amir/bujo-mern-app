// backend/services/login.js
const bcrypt = require("bcrypt");
const User   = require("../models/user");
const { generateToken } = require("../utils/jwtUtils");

async function login(email, password) {
  // 1. Find the user
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Invalid email or password");
    err.userMessage = "Invalid email or password";
    err.status = 401;
    throw err;
  }

  // 2. Approval check for non-admins
  if (user.role !== "admin" && !user.approved) {
    const err = new Error("Account pending approval");
    err.userMessage = "Your account is awaiting admin approval.";
    err.status = 403;
    throw err;
  }

  // 3. Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid email or password");
    err.userMessage = "Invalid email or password";
    err.status = 401;
    throw err;
  }

  // 4. Generate token
  const token = generateToken(user);
  return { token, user };
}

module.exports = { login };
