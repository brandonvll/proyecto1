const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');
const { Restaurant } = require('../Models/restaurant.model');
const { Review } = require('../Models/rewiev.model');
const { User } = require('../Models/user.model');

const isValidRating = (req, res, next) => {
  const { rating = 0 } = req.body;

  if (rating < 1 || rating > 5) {
    return next(new AppError('The rating is not valid', 400));
  }

  next();
};

const existRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { id, status: true },
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

  if (!restaurant) {
    return next(new AppError('The restaurant is not registered', 400));
  }

  req.restaurant = restaurant;
  next();
});

const existRestaurantByRestId = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findOne({
    where: {
      id: restaurantId,
      status: true
    }
  });

  if (!restaurant) {
    return next(new AppError('The restaurant is not registered', 400));
  }

  req.restaurant = restaurant;

  next();
});

const existReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findOne({
    where: {
      id,
      status: true
    },
    include: [{ model: User, attributes: { exclude: ['password'] } }]
  });

  if (!review) {
    return next(new AppError('The review is not found', 404));
  }

  req.review = review;
  req.user = review.user;

  next();
});

module.exports = {
  isValidRating,
  existRestaurantById,
  existRestaurantByRestId,
  existReview
};
