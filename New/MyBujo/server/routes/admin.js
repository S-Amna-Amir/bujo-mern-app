const express = require("express");
const { authenticateToken } = require("../utils/authMiddleware");
const { getPendingUsers, approveUser } = require("../controllers/admin");
const router = express.Router();
router.use(authenticateToken);


router.use(authenticateToken);

// list all pending sign-ups
router.get("/users/pending", getPendingUsers);

// approve one
router.patch("/users/:id/approve", approveUser);

module.exports = router;
