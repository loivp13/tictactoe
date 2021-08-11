const { check } = require("express-validator");

exports.userRegisterValidator = [
  check("firstName").not().isEmail().withMessage("First name is required"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("lastName").not().isEmpty().withMessage("Last name is required"),
  check("username").not().isEmpty().withMessage("Username is required"),
  check("username")
    .isLength({ min: 6 })
    .withMessage("Username must be at least 6 characters long"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.userLoginValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password").not().isEmpty().withMessage("Password cannot be empty"),
];

exports.userForgotPasswordValidator = [
  check("email").isEmail().withMessage("Must be valid email address"),
];

exports.userResetPasswordValidator = [
  check("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("token").not().isEmpty().withMessage("Token is required"),
];

exports.userUpdateValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
];
