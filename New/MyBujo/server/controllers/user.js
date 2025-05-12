const userService = require("../services/user");

async function getUsers(req, res) {
    try {
        const users = await userService.getUsers();
        res.json(users);
    }
    catch (error){
        res.status(500).json({message: error});
    }
};

async function deleteUser(req, res) {
    const { id } = req.params;
  
    // only admins can delete
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
  
    try {
      await userService.deleteUserById(id);
      res.status(204).end();              // 204 No Content
    } catch (err) {
      console.error("deleteUser error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async function getUserById(req, res) {
    const { id } = req.params;
    // only allow self or admin
    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      const user = await userService.getUserById(id);
      if (!user) return res.status(404).json({ message: "Not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // in controllers/user.js → updateUser
async function updateUser(req, res) {
  const { id } = req.params;
  if (req.user.id !== id && req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });

  // whitelist incoming fields
  const updates = {};
  ["name", "email", "password"].forEach((f) => {
    if (req.body[f] != null) {
      // skip empty passwords
      if (f === "password" && req.body.password === "") return;
      updates[f] = req.body[f];
    }
  });

  try {
    const updated = await userService.updateUserById(id, updates);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {getUsers, deleteUser, getUserById, updateUser,};