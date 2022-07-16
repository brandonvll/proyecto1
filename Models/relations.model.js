const { Meal } = require('./meal.model');
const { Order } = require('./order.model');
const { Restaurant } = require('./restaurant.model');
const { Review } = require('./rewiev.model');
const { User } = require('./user.model');

const relationModel = () => {
  //1 USER <--- ----> M ORDERS
  User.hasMany(Order);
  Order.belongsTo(User);

  //1 USER <--- ----> M REVIEWS
  User.hasMany(Review);
  Review.belongsTo(User);

  //1 RESTAURANT <--- ----> M REVIEWS
  Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
  Review.belongsTo(Restaurant);

  //1 RESTAURANT <--- ----> M MEAL
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  //1 MEALS <--- ----> 1 ORDER
  Meal.hasOne(Order);
  Order.belongsTo(Meal);
};

module.exports = { relationModel };
