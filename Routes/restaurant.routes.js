const express = require('express');

const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview
} = require('../Controllers/restaurant.controller');

const {
  isValidRating,
  existRestaurantById,
  existRestaurantByRestId,
  existReview
} = require('../middlewares/restaurant.middleware');

const {
  protectAdmin,
  protectUserAccount,
  protectSession
} = require('../Middlewares/auth.middleware');
const {
  updateRestaurantValidation,
  createRestaurantValidation,
  commentReview
} = require('../Middlewares/validator.middlewares');

const restaurantRouter = express.Router();

restaurantRouter.get('/', getAllRestaurants);

restaurantRouter.get('/:id', existRestaurantById, getRestaurantById);

restaurantRouter.use(protectSession);

restaurantRouter.post(
  '/',
  createRestaurantValidation,
  isValidRating,
  protectAdmin,
  createRestaurant
);

restaurantRouter.patch(
  '/:id',
  updateRestaurantValidation,
  existRestaurantById,
  protectAdmin,
  updateRestaurant
);

restaurantRouter.delete(
  '/:id',
  existRestaurantById,
  protectAdmin,
  deleteRestaurant
);

restaurantRouter.post(
  '/reviews/:id',
  commentReview,
  isValidRating,
  existRestaurantById,
  createReview
);

restaurantRouter.patch(
  '/reviews/:restaurantId/:id',
  commentReview,
  isValidRating,
  existRestaurantByRestId,
  existReview,
  protectUserAccount,
  updateReview
);

restaurantRouter.delete(
  '/reviews/:restaurantId/:id',
  existRestaurantByRestId,
  existReview,
  protectUserAccount,
  deleteReview
);

module.exports = { restaurantRouter };
