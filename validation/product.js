const { body } = require("express-validator");

exports.add = () => {
  return [
    body("title")
    .trim()
    .isString()
      .withMessage("title is required")
      .isEmpty()
      .not()
      .withMessage("title is required"),
      body("price")
      .trim()
    .isString()
      .withMessage("price is required")
      .isEmpty()
      .not()
      .withMessage("price is required"),
  ];
};
