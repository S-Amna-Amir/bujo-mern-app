const User = require("../models/user");

// GET /api/users/pending
async function getPendingUsers(req, res) {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admins only" });

  const pending = await User.find({ approved: false }).select("-password");
  res.json(pending);
}

// PATCH /api/users/:id/approve
async function approveUser(req, res) {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admins only" });

  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id,
    { approved: true },
    { new: true }
  ).select("-password");

  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
}

module.exports = { getPendingUsers, approveUser };
