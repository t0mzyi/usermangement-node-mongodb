import {body} from 'express-validator'


const registerValidator = [
    body('userName')
        .notEmpty().withMessage("userName is required")
        .bail()
        .isLength({min : 3}).withMessage("userName must have at least 3 letters"),

    body("email")
        .notEmpty().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("Enter valid email bro"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .bail()
        .isLength({min : 6}).withMessage("passwords should contain at least 6 letters")

]

const loginValidator = [

  body("email")
    .notEmpty().withMessage("Email is required")
    .bail()
    .isEmail().withMessage("Enter a valid email"),

  body("password")
    .notEmpty().withMessage("Password is required")


]

export {registerValidator,loginValidator}