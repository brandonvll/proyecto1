const bcryptjs = require('bcryptjs');
const JwT = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../Models/user.model');
const { Order } = require('../Models/order.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  //encrypt Password
  const salt = await bcryptjs.genSalt(12);
  const hashPassword = await bcryptjs.hash(password, salt); // salt

  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
    role
  });

  //Remove password from response
  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    newUser
  });
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email
  const user = await User.findOne({
    where: {
      email,
      status: 'true'
    }
  });

  if (!user) {
    return next(new AppError('Credencials Invalid', 400));
  }

  const isPasswordValid = await bcryptjs.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new AppError('Credencials Invalid', 400));
  }

  //JwT = JsonWebToken
  const token = await JwT.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  res.status(200).json({
    status: 'success',
    token
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { callUser } = req;
  const { username, email } = req.body;

  await callUser.update({ username, email });

  res.status(201).json({
    status: 'success'
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { callUser } = req;
  //await user.destroy();
  await callUser.update({ status: 'false' });

  res.status(201).json({
    status: 'success'
  });
});

const getOrderForUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    where: {
      userId: sessionUser.id
    }
  });

  res.json({
    status: 'success',
    orders
  });
});

const getOrderForId = catchAsync(async (req, res, next) => {
  const { order } = req;

  res.json({
    ok: true,
    order
  });
});

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getOrderForUser,
  getOrderForId
};
