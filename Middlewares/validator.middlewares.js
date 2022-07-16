const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResault = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //Array has errors
    const errorMsgs = errors.array().map((err) => err.msg);

    const message = errorMsgs.join('. ');

    return next(new AppError(message, 400));
  }
  next();
};

const createUserValidators = [
  body('username').notEmpty().withMessage('username cannot be emty'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters')
    .isAlphanumeric()
    .withMessage('the password must contend leters and numbers'),
  checkResault
];

const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('the email does not have a correct format'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('The password must have at least 8 characters')
];

const UpdateUserValidation = [
  body('name').notEmpty().withMessage('the name is mandatory'),
  body('email')
    .isEmail()
    .withMessage('the email does not have a correct format')
];

const createRestaurantValidation = [
  body('name').notEmpty().withMessage('The name is mandatory'),
  body('address').notEmpty().withMessage('The address is mandatory')
];

const updateRestaurantValidation = [
  body('name').notEmpty().withMessage('The name is mandatory'),
  body('address').notEmpty().withMessage('The address is mandatory')
];

const commentReview = [
  body('comment').notEmpty().withMessage('The comment is mandatory')
];

const createOrderValidation = [
  body('quantity').notEmpty().withMessage('the quantity is mandatory'),
  body('quantity').not().isString().withMessage('the quantity must be a number'),
  body('mealId').not().notEmpty().withMessage('the mealId is mandatory'),
  body('mealId', ).not().isString().withMessage('the mealId must be a number')
]

module.exports = {
  createOrderValidation,
  commentReview,
  updateRestaurantValidation,
  createRestaurantValidation,
  createUserValidators,
  loginValidation,
  UpdateUserValidation
};
