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

module.exports = {getUsers, deleteUser};