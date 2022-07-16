const JwT = require('jsonwebtoken');

const { catchAsync } = require('../utils/catchAsync.util');

const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

const getMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: true
    },
    attributes: { exclude: ['status'] },
    include: [
      {
        model: Restaurant,
        attributes: {
          exclude: ['status']
        }
      }
    ]
  });

  res.json({
    status: 'success',
    meals
  });
});
const getMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.json({
    status: 'success',
    meal
  });
});
const createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;

  const restaurantId = req.restaurant.id;

  const newMeal = await Meal.create({ name, price, restaurantId });

  res.status(201).json({
    status: 'success',
    newMeal
  });
});
const updateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;

  const { meal } = req;

  await Meal.update({ name, price });

  res.json({
    status: 'success',
    meal
  });
});
const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await Meal.update({ status: false });

  res.status(200).json({
    status: 'success'
  });
});

module.exports = {
  getMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal
};
