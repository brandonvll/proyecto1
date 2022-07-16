const express = require('express');
const {
  createOrder,
  getOrdersUser,
  updateOrder,
  deleteOrder
} = require('../controllers/order.controller');
const {
  protectAdmin,
  protectUserAccount,
  protectSession
} = require('../Middlewares/auth.middleware');
const { createOrderValidation } = require('../Middlewares/validator.middlewares');

const orderRouter = express.Router();

orderRouter.use(protectSession);

orderRouter.post('/', createOrderValidation, protectAdmin, createOrder);

orderRouter.get('/me', getOrdersUser);

orderRouter.patch('/:id', protectUserAccount, updateOrder);

orderRouter.delete('/:id', protectUserAccount, deleteOrder);

module.exports = { orderRouter };
