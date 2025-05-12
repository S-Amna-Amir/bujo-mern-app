const express = require("express");
const cors = require("cors");
const { login } = require("../controllers/login");
const { body, validationResult } = require("express-validator");

const router = express.Router();

router.use(cors());

const validateLogin = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 5, max: 128 }).withMessage("Password must be 5-128 characters long")
        .escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

router.post("/login", validateLogin, login);

module.exports = router;
