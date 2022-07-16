const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');
const JwT = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');
const { Order } = require('../Models/order.model');

dotenv.config('./config.env');

const inValidRole = catchAsync(async (req, res, next) => {
  const { role = 'normal' } = req.body;

  if (role !== 'admin' && role !== 'normal') {
    return next(new AppError('The role is not allowed', 400));
  }
  next();
});

const protectAdmin = catchAsync(async (req, res, next) => {
  if (req.sessionUser.role !== 'admin') {
    return next(new AppError('Access no granted', 403));
  }
  next();
});

const protectSession = catchAsync(async (req, res, next) => {
  //console.log(req.headers);
  let token;

  //extract the token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Invalid token', 403));
  }

  // Ask JWT (library), if the token is still volid
  const decoded = await JwT.verify(token, process.env.JWT_SECRET);

  //Check in db that user have status active and exist
  const user = await User.findOne({
    where: { id: decoded.id, status: 'true' }
  });

  if (!user) {
    return next(
      new AppError('the owner of this token doesnt exist anymore', 403)
    );
  }
  req.sessionUser = user;
  next();
});

const protectUserAccount = (req, res, next) => {
  // const { id } = req.params -> Alternative
  const { sessionUser, callUser } = req;

  // If the id's don't match, return error (403)
  if (sessionUser.id !== callUser.id) {
    return next(new AppError('You do not own this account', 403));
  }
  next();
};

const existOrderForUser = catchAsync(async (req, res = response, next) => {
  const { id } = req.params;

  const { sessionUser } = req;

  const order = await Order.findOne({
    where: {
      id,
      userId: sessionUser.id
    }
  });

  if (!order) {
    return next(new AppError('Order not found', 404));
  }

  req.order = order;
  next();
});

const existUserForId = catchAsync(async (req, res = response, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: true
    }
  });
  if (!user) {
    return next(new AppError('The user is not registered', 400));
  }
  req.user = user;
  next();
});

module.exports = {
  existOrderForUser,
  existUserForId,
  protectSession,
  protectUserAccount,
  inValidRole,
  protectAdmin
};
