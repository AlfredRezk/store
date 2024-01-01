const { body } = require("express-validator");

exports.register = () => {
  return [
    body("firstName")
      .isString()
      .not()
      .isEmpty()
      .withMessage("First Name is required"),
      body("lastName")
      .isString()
      .not()
      .isEmpty()
      .withMessage("Last Name is required"),
      body("username")
      .isString()
      .not()
      .isEmpty()
      .withMessage("Username is required")
      .isLength({min:3})
      .withMessage('Username is minimum 3 characters'), 
     
      body("email")
      .isString()
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage('Please provide a valid email'), 
      body("password")
      .trim()
      .isString()
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({min:5})
      .withMessage('Password is minimum 5 characters'), 
      body("password2")
      .trim()
      .isString()
      .not()
      .isEmpty()
      .withMessage("Confirm Password is required")
      .custom((value, {req})=>{
        if(value !==req.body.password)
            throw new Error('Password is not matching')
        else 
        return true;
      }),
  ];
};

exports.login = () => {
    return [
       
          body("username")
          .isString()
          .not()
          .isEmpty()
          .withMessage("Username is required")
          .isLength({min:3})
          .withMessage('Username is minimum 3 characters'), 
          body("password")
          .isString()
          .not()
          .isEmpty()
          .withMessage("Password is required")
          .isLength({min:5})
          .withMessage('Password is minimum 5 characters'), 
    
      ];
};
