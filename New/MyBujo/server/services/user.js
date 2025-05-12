const User = require("../models/user");
const bcrypt = require("bcrypt");

async function getUsers()
{
    const users = await User.find({});
    return users;
};

async function getUserById(id) {
  return User.findById(id).select("-password").lean();
}

async function updateUserById(id, updates) {
  // if password is being changed, hash it
  if (updates.password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(updates.password, salt);
  }
  return User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
}

async function deleteUserById(id) {
    // you might want to check existence first
    const user = await User.findById(id);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    await User.findByIdAndDelete(id);
  }

module.exports = { getUsers, deleteUserById, getUserById, updateUserById,};