import {body} from 'express-validator'


const registerValidator = [
    body('username')
        .notEmpty().withMessage("Username is required")
        .bail()
        .isLength({min : 3}).withMessage("Username must have at least 3 letters"),

    body("useremail")
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Enter valid email bro"),

    body("userpass")
        .notEmpty().withMessage("Password is required")
        .bail()
        .isLength({min : 6}).withMessage("passwords should contain at least 6 letters")

]

const loginValidator = [

  body("useremail")
    .notEmpty().withMessage("Email is required")
    .bail()
    .isEmail().withMessage("Enter a valid email"),

  body("userpass")
    .notEmpty().withMessage("Password is required")


]

export {registerValidator,loginValidator}