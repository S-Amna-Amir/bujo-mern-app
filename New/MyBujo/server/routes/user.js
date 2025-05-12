const express = require("express");
const cors = require("cors");
const userController = require("../controllers/user");
const authMiddleware = require("../utils/authMiddleware");

const router = express.Router();
router.use(authenticateToken);
router.use(cors());
router.get("/", authMiddleware.authenticateToken, userController.getUsers);
router.get("/:id", authMiddleware.authenticateToken, userController.getUserById);
router.put("/:id", authMiddleware.authenticateToken, userController.updateUser);

router.delete("/:id", authMiddleware.authenticateToken, userController.deleteUser);

// update user by ID (self or admin)

module.exports = router;