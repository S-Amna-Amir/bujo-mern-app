const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
    try {
        const existingAdmin = await User.findOne({ email: "admin@test.com"});
        if(!existingAdmin)
        {
            const newAdmin = new User({
                email: "admin@test.com",
                name: "Admin",
                password: await bcrypt.hash("admin1", 10),
                role: "admin",
                approved: true,
            })
            await newAdmin.save();
            console.log("Admin account created successfully");
        }
        else{
            console.log("Admin exists");
        }
    }
    catch (error)
    {
        console.error(error.message);
    }
}

module.exports = createAdminAccount;