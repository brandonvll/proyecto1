const JwT = require('jsonwebtoken');

const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const { Restaurant } = require('../Models/restaurant.model');
const { Review } = require('../models/rewiev.model');
const { User } = require('../models/user.model');

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating
  });

  res.status(201).json({
    status: 'success',
    newRestaurant
  });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: { status: true },
    attributes: { exclude: ['status'] },
    include: [
      {
        model: Review,
        attributes: {
          exclude: ['status', 'restaurantId', 'userId']
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password', 'role', 'status']
            }
          }
        ]
      }
    ]
  });

  res.status(200).json({
    restaurants
  });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    restaurant
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;

  const { restaurant } = req;

  await restaurant.update({ name, address });

  res.status(200).json({
    status: 'success'
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: false });

  res.status(200).json({
    status: 'success'
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;

  const restaurantId = +req.params.id;

  const userId = req.sessionUser.id;

  const review = await new Review.create({ userId, comment, restaurantId, rating });

  res.status(201).json({
    status: 'success',
    review
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  const { comment, rating } = req.body;

  await review.update({
    comment,
    rating
  });

  res.status(200).json({
    status: 'success'
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({
    status: false
  });

  res.status(200).json({
    status: 'success'
  });
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview
};
