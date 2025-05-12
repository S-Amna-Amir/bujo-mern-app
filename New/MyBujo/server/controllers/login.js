// backend/controllers/login.js
const authService = require("../services/login");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (err) {
    console.error("Login error:", err);
    const status = err.status || 500;
    const message = err.userMessage || "An unexpected error occurred.";
    res.status(status).json({ message });
  }
}

module.exports = { login };
