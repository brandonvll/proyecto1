const JwT = require('jsonwebtoken');

const { catchAsync } = require('../utils/catchAsync.util');

const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');
const { Order } = require('../Models/order.model');

const createOrder = catchAsync(async (req, res = response, next) => {
  const { quantity } = req.body;
  const { meal } = req;
  const { sessionUser } = req;

  const totalPrice = quantity * meal.price;

  const newOrder = await Order.create({
    mealId: meal.id,
    userId: sessionUser.id,
    totalPrice,
    quantity
  });

  res.json({
    status: 'success',
    newOrder
  });
});
const getOrdersUser = catchAsync(async (req, res = response, next) => {
  const { sessionUser } = req;

  const order = await Order.findAll({
    where: {
      userId: sessionUser.id
    },
    include: [
      {
        model: Meal,
        attributes: {
          exclude: ['status']
        },
        include: [
          {
            model: Restaurant,
            attributes: {
              exclude: ['status']
            }
          }
        ]
      }
    ]
  });

  res.json({
    status: 'success',
    order
  });
});
const updateOrder = catchAsync(async (req, res = response, next) => {
  const { order } = req;

  await Order.update({ status: 'completed' });

  res.json({
    status: 'success',
    order
  });
});
const deleteOrder = catchAsync(async (req, res = response, next) => {
  const { order } = req;

  await Order.update({ status: 'cancelled' });

  res.json({
    status: 'success'
  });
});

module.exports = {
  createOrder,
  getOrdersUser,
  updateOrder,
  deleteOrder
};
