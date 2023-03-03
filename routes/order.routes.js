const { Router } = require('express');
const { check } = require('express-validator');
const {
  createOrder,
  getOrders,
  markOrderCompleted,
  deleteOrder,
} = require('../controllers/order.controller');
const { protect } = require('../middlewares/auth.middleware');
const { validMealExists } = require('../middlewares/order.middlware');
const { validateFields } = require('../middlewares/validations.middleware');

const router = Router();

router.use(protect);

router.post(
  '/',
  [
    check('quantity', 'the name is required').not().isEmpty(),
    check('quantity', 'the name must be a number').isNumeric(),
    check('mealId', 'the email is required').not().isEmpty(),
    check('mealId', 'the mealId must be a number').isNumeric(),
    validateFields,
    validMealExists,
  ],
  createOrder
);

router.get('/me', getOrders);

router.patch('/:id', markOrderCompleted);

router.delete('/:id', deleteOrder);

module.exports = {
  orderRouter: router,
};
