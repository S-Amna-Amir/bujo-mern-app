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
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  return updatedUser;
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