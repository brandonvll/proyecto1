const express = require('express');
const {
  getMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal
} = require('../Controllers/meal.controller');
const mealRouter = express.Router();

mealRouter.get('/', getMeals);

mealRouter.get('/:id', getMealById);

mealRouter.post('/:id', createMeal);

mealRouter.patch('/:id', updateMeal);

mealRouter.delete('/:id', deleteMeal);

module.exports = { mealRouter };
