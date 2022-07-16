const express = require('express');
const rateLimit = require('express-rate-limit');

const { globalErrorHandler } = require('./Controllers/error.controller');

//routes
const { usersRouter } = require('./Routes/user.routes');
const { restaurantRouter } = require('./Routes/restaurant.routes');
const { mealRouter } = require('./Routes/meal.routes');
const { orderRouter } = require('./Routes/order.routes');

const app = express();

app.use(express.json());

const limiter = rateLimit({
  max: 500,
  windowMs: 30 * 1000 * 60, //30 min
  message: 'Number of requests have been exceeded'
});

app.use(limiter);

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/orders', orderRouter);

app.use(globalErrorHandler);

module.exports = { app };
