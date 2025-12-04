import { body } from "express-validator";

const registerValidator = [
    body("userName")
        .trim()
        .notEmpty().withMessage("Username is required")
        .bail()
        .isLength({ min: 3, max: 20 }).withMessage("Username must be 3-20 characters long")
        .bail()
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can contain only letters, numbers, and underscores"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("email not valid")
        .normalizeEmail(),

    body("userpass")
        .notEmpty().withMessage("Password is required")
        .bail()
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character (@$!%*?&)"),
];

const loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Enter a valid email")
        .normalizeEmail(),

    body("userpass")
        .notEmpty().withMessage("Password is required")
]

const adminAddUserValidator = [
    body("userName")
        .trim()
        .notEmpty().withMessage("Username is required")
        .bail()
        .isLength({ min: 3, max: 20 }).withMessage("Username must be 3-20 characters long")
        .bail()
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can contain only letters, numbers, and underscores"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required")
        .bail()
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character (@$!%*?&)")
]

export {registerValidator,adminAddUserValidator,loginValidator}