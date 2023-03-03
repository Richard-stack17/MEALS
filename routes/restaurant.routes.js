const { Router } = require('express');
const { check } = require('express-validator');
const {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  updateReview,
  deleteReview,
  createReview,
} = require('../controllers/restaurant.controller');
const {
  protectAccountOwner,
  protect,
  restrictTo,
} = require('../middlewares/auth.middleware');
const {
  validRating,
  validIfRestaurantExistsById,
} = require('../middlewares/resturant.middleware');
const { validExistReview } = require('../middlewares/review.middleware');
const { validateFields } = require('../middlewares/validations.middleware');

const router = Router();

router.get('/', getRestaurants);

router.get('/:id', validIfRestaurantExistsById, getRestaurant);

router.use(protect);

router.patch(
  '/:id',
  [
    check('name', 'the name is required').not().isEmpty(),
    check('address', 'the name is required').not().isEmpty(),
    validateFields,
    validIfRestaurantExistsById,
    restrictTo('admin'),
  ],
  updateRestaurant
);

router.delete(
  '/:id',
  validIfRestaurantExistsById,
  restrictTo('admin'),
  deleteRestaurant
);

router.post(
  '/',
  [
    check('name', 'the name is required').not().isEmpty(),
    check('address', 'the name is required').not().isEmpty(),
    check('rating', 'the price is required').not().isEmpty(),
    check('rating', 'the price must be a number').isNumeric(),
    validateFields,
    validRating,
    restrictTo('admin'),
  ],
  createRestaurant
);

//review
router.post(
  '/reviews/:id',
  [
    check('comment', 'the comment is required').not().isEmpty(),
    check('rating', 'the rating is required').not().isEmpty(),
    check('rating', 'the rating must be a number').isNumeric(),
    validateFields,
    validIfRestaurantExistsById,
  ],
  createReview
);

router.patch(
  '/reviews/:restaurantId/:id',
  [
    check('comment', 'the comment is required').not().isEmpty(),
    check('rating', 'the rating is required').not().isEmpty(),
    check('rating', 'the rating must be a number').isNumeric(),
    validateFields,
    validIfRestaurantExistsById,
    validExistReview,
    protectAccountOwner,
  ],
  updateReview
);
router.delete(
  '/reviews/:restaurantId/:id',
  validIfRestaurantExistsById,
  validExistReview,
  protectAccountOwner,
  deleteReview
);
module.exports = {
  restaurantRouter: router,
};
