const express = require('express');

const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getOrderForUser,
  getOrderForId
} = require('../Controllers/user.controller');

const {
  protectSession,
  protectUserAccount,
  inValidRole,
  existUserForId,
  existOrderForUser
} = require('../Middlewares/auth.middleware');
const { userExists } = require('../Middlewares/user.middleware');
const {
  createUserValidators,
  loginValidation,
  UpdateUserValidation
} = require('../Middlewares/validator.middlewares');

const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidators, inValidRole, createUser);

usersRouter.post('/login', loginValidation, loginUser);

usersRouter.patch(
  '/:id',
  userExists,
  UpdateUserValidation,
  protectSession,
  existUserForId,
  protectUserAccount,
  updateUser,
);

usersRouter.delete(
  '/:id',
  userExists,
  protectSession,
  existUserForId,
  protectUserAccount,
  deleteUser
);

usersRouter.get('/orders', getOrderForUser);

usersRouter.get('/orders/:id', existOrderForUser, getOrderForId);

module.exports = { usersRouter };
