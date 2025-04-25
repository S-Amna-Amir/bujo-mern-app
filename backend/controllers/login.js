// backend/controllers/login.js
const authService = require("../services/login");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    // authService.login now returns both token and user
    const { token, user } = await authService.login(email, password);

    // send back token AND minimal user info
    res.json({
      token,
      user: { email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid email or password" });
  }
}

module.exports = { login };
