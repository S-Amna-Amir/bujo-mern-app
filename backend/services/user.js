const User = require("../models/user");

async function getUsers()
{
    const users = await User.find({});
    return users;
};

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

module.exports = { getUsers, deleteUserById};