const express = require("express");
const { body, validationResult } = require("express-validator");
const signupController = require("../controllers/signup");

const router = express.Router();

const validateRegistration = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters")
        .escape(),

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

router.post("/register", validateRegistration, signupController.createUser);

module.exports = router;
