// backend/services/login.js
const bcrypt = require("bcrypt");
const User   = require("../models/user");           // your Mongoose (or other) user model
const { generateToken } = require("../utils/jwtUtils");

async function login(email, password) {
  // 1. Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  // 2. Compare submitted password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Wrong password");
  }

  // 3. Generate a JWT
  const token = generateToken(user);

  // 4. Return both the token and the user object
  return { token, user };
}

module.exports = { login };
