// backend/controllers/login.js
const authService = require("../services/login");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    // authService.login now returns both token and user
    const { token, user } = await authService.login(email, password);
    res.json({ token, user: { email: user.email, role: user.role } });
  } catch (err) {
    const status = err.status || 401;
    res.status(status).json({ message: err.message });
  }
}

module.exports = { login };
